import { IconButton, Tooltip } from "@mui/material";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  MaterialReactTable,
  MRT_ShowHideColumnsButton,
  MRT_ToggleDensePaddingButton,
  MRT_ToggleFiltersButton,
  MRT_ToggleFullScreenButton,
  useMaterialReactTable,
} from "material-react-table";
import Link from "next/link";
import React, { useState } from "react";
import RecyclingIcon from "@mui/icons-material/Recycling";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import RestoreFromTrashOutlinedIcon from "@mui/icons-material/RestoreFromTrashOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import useDeleteMutation from "@/hooks/useDeleteMutation";
import CustomButton from "../Application/customButton";
import SaveAltOutlinedIcon from "@mui/icons-material/SaveAltOutlined";
import { showToast } from "@/lib/showToast";
import { download, generateCsv, mkConfig } from "export-to-csv";

const DataTable = ({
  queryKey,
  fetchUrl,
  columnsConfig,
  isRefetching,
  initialPageSize = 10,
  exportEndPoint,
  deleteEndPoint,
  deleteType,
  trashView,
  createAction,
}) => {
  // Filter, sorting, pagination
  const [columnFilters, setColumnFilters] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: initialPageSize,
  });

  // row selection state

  const [rowSelection, setRowSelection] = useState({});

  // export loading state
  const [exportLoading, setExportLoading] = useState(false);

  // data fetching logic

  const {
    data: { data = [], meta } = {},
    isError,
    isLoading,
  } = useQuery({
    queryKey: [queryKey, { columnFilters, globalFilter, sorting, pagination }],
    queryFn: async () => {
      const url = new URL(fetchUrl, process.env.NEXT_PUBLIC_BASE_URL);
      url.searchParams.set(
        "start",
        `${pagination.pageIndex * pagination.pageSize}`
      );
      url.searchParams.set("size", `${pagination.pageSize}`);
      url.searchParams.set("filters", JSON.stringify(columnFilters ?? []));
      url.searchParams.set("globalFilter", globalFilter ?? "");
      url.searchParams.set("sorting", JSON.stringify(sorting ?? []));
      url.searchParams.set("deleteType", deleteType);

      const { data: response } = await axios.get(url.href);
      return response;
    },
    placeholderData: keepPreviousData,
  });

  // delete method
  const deleteMutation = useDeleteMutation(queryKey, deleteEndPoint);
  const handleDelete = (ids, deleteType) => {
    let c;
    if (deleteType === "PD") {
      c = confirm("Are you sure to want to delete the data permanently");
    } else {
      c = confirm("Are you sure to want to move into trash?");
    }
    if (c) {
      deleteMutation.mutate({ ids, deleteType });
      setRowSelection({});
    }
  };

  //   export method

  const handleExport = async (selectedRow) => {
    setExportLoading(true);
    try {
      const csvConfig = mkConfig({
        fieldSeparator: ",",
        decimalSeparator: ".",
        useKeysAsHeaders: true,
        filename: "csv-data",
      });
      let csv;

      if (Object.keys(rowSelection).length > 0) {
        const rowData = selectedRow.map((row) => row.original);
        csv = generateCsv(csvConfig)(rowData);
      } else {
        const { data: response } = await axios.get(exportEndPoint);
        if (!response.success) {
          throw new Error(response.message);
        }

        const rowData = response.data;
        csv = generateCsv(csvConfig)(rowData);
      }

      download(csvConfig)(csv);
    } catch (error) {
      console.log(error);
      showToast("error", error.message);
    } finally {
      setExportLoading(false);
    }
  };

  // init table

  const table = useMaterialReactTable({
    columns: columnsConfig,
    data,
    enableGlobalFilter: true,
    enableGlobalFilterModes: true,
    enableRowSelection: true,
    colomnFilterDisplayMode: "popover",
    paginationDisplayMode: "pages",
    enableColumnOrdering: true,
    enableStickyHeader: true,
    enableStickyFooter: true,
    initialState: { showGlobalFilter: true, showColumnFilters: false },

    manualFiltering: true,
    manualPagination: true,
    manualSorting: true,
    muiToolbarAlertBannerProps: isError
      ? {
          color: "error",
          children: "Error loading data",
        }
      : undefined,

    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    rowCount: meta?.totalRowCount ?? 0,
    onRowSelectionChange: setRowSelection,
    state: {
      columnFilters,
      globalFilter,
      isLoading,
      pagination,
      showAlertBanner: isError,
      showProgressBars: isRefetching,
      sorting,
      rowSelection,
    },
    getRowId: (originalRow) => originalRow._id,

    renderToolbarInternalActions: ({ table }) => (
      <>
        {/* built in button  */}
        <Tooltip title="Search">
          <IconButton onClick={() => setShowSearch(!showSearch)}>
            <i className="ri-search-line"></i>
          </IconButton>
        </Tooltip>
        <MRT_ToggleFiltersButton table={table} />
        <MRT_ShowHideColumnsButton table={table} />
        <MRT_ToggleFullScreenButton table={table} />
        <MRT_ToggleDensePaddingButton table={table} />

        {deleteType !== "PD" && (
          <Tooltip title="Recycle Bin">
            <Link href={trashView}>
              <IconButton>
                <RecyclingIcon />
              </IconButton>
            </Link>
          </Tooltip>
          
        )}

        {deleteType === "SD" && (
          <Tooltip title="delete All ">
            <IconButton
              disabled={
                !table.getIsSomeRowsSelected() &&
                !table.getIsAllPageRowsSelected()
              }
              onClick={() =>
                handleDelete(Object.keys(rowSelection), deleteType)
              }
            >
              <DeleteOutlineOutlinedIcon />
            </IconButton>
          </Tooltip>
        )}

        {deleteType === "PD" && (
          <>
            <Tooltip title=" Restore Data ">
              <IconButton
                disabled={
                  !table.getIsSomeRowsSelected() &&
                  !table.getIsAllPageRowsSelected()
                }
                onClick={() => handleDelete(Object.keys(rowSelection), "RSD")}
              >
                <RestoreFromTrashOutlinedIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title=" Permanently delete ">
              <IconButton
                disabled={
                  !table.getIsSomeRowsSelected() &&
                  !table.getIsAllPageRowsSelected()
                }
                onClick={() =>
                  handleDelete(Object.keys(rowSelection), deleteType)
                }
              >
                <DeleteForeverOutlinedIcon />
              </IconButton>
            </Tooltip>
          </>
        )}
      </>
    ),

    enableRowActions: true,
    positionActionsColumn: "last",
    renderRowActionMenuItems: ({ row }) =>
      createAction(row, deleteType, handleDelete),

    renderTopToolbarCustomActions: ({ table }) => (
      <Tooltip>
        <CustomButton
          type="button"
          text={
            <>
              <SaveAltOutlinedIcon sx={{ fontSize: 22 }} />
              Export
            </>
          }
          className='cursor-pointer'
          loading={exportLoading}
          onClick={() => handleExport(table.getSelectedRowModel().rows)}
        />
      </Tooltip>
    ),
  });

  return <MaterialReactTable table={table} />;
};

export default DataTable;
