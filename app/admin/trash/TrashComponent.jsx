"use client";
import Breadcrumbs from "@/components/adminComponents/Breadcrumb";
import DataTableWrapper from "@/components/adminComponents/DataTableWrapper";
import DeleteAction from "@/components/adminComponents/deleteAction";
import EditAction from "@/components/adminComponents/editAction";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { DT_CATEGORY_COLUMN, DT_PRODUCT_COLUMN, DT_PRODUCT_VARIATION_COLUMN } from "@/lib/colomn";
import { colomnConfig } from "@/lib/helperFuncation";
import { ADMIN_DASHBOARD, ADMIN_TRASH } from "@/routes/AdminPanelRoutes";
import { useSearchParams } from "next/navigation";
import React, { useCallback, useMemo } from "react";

const breadCrumbData = [
  { href: ADMIN_DASHBOARD, label: "Home" },
  { href: ADMIN_TRASH, label: "Trash" },
];

const TRASH_CONFIG = {
  category: {
    title: "Category Trash",
    columns: DT_CATEGORY_COLUMN,
    fetchUrl: "/api/category",
    exportUrl: "/api/category/export",
    deleteUrl: "/api/category/delete",
  },
  product: {
    title: "Product Trash",
    columns: DT_PRODUCT_COLUMN,
    fetchUrl: "/api/product",
    exportUrl: "/api/product/export",
    deleteUrl: "/api/product/delete",
  },
  "product-variant": {
    title: "Product Variant Trash",
    columns: DT_PRODUCT_VARIATION_COLUMN,
    fetchUrl: "/api/product-variant",
    exportUrl: "/api/product-variant/export",
    deleteUrl: "/api/product-variant/delete",
  },
};

const TrashComponent = () => {
  const searchPararms = useSearchParams();
  const trashOf = searchPararms.get("trashof") || "category";

  const config = TRASH_CONFIG[trashOf] || null;
  if (!config) {
    return (
      <div className="p-5 text-center text-red-500">
        Invalid or missing <strong>trashof</strong> parameter.
        <br />
        Example: /admin/trash?trashof=category
      </div>
    );
  }

  const column = useMemo(() => {
    return colomnConfig(config?.columns || [], false, false, true);
  }, [config]);

  const action = useCallback((row, deleteType, handleDelete) => {
    return [
      <DeleteAction
        key="delete"
        handleDelete={handleDelete}
        row={row}
        deleteType={deleteType}
      />,
    ];
  }, []);

  return (
    <div>
      <Breadcrumbs breadCrumbData={breadCrumbData}></Breadcrumbs>

      <Card className="py-3 rounded shadow-md">
        <CardHeader className="border-b-1 pb-4 ">
          <div className="flex justify-between items-center">
            <h4 className="font-semibold text-xl"> {config?.title} </h4>
          </div>
        </CardHeader>
        <CardContent className="mb-2 px-0">
          <DataTableWrapper
            queryKey={`${trashOf}-data-deleted`}
            fetchUrl={config?.fetchUrl}
            initialPageSize={10}
            columnsConfig={column}
            exportEndPoint={config?.exportUrl}
            deleteEndPoint={config?.deleteUrl}
            deleteType="PD"
            createAction={action}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default TrashComponent;