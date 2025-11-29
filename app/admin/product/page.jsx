"use client";
import Breadcrumbs from "@/components/adminComponents/Breadcrumb";
import DataTableWrapper from "@/components/adminComponents/DataTableWrapper";
import DeleteAction from "@/components/adminComponents/deleteAction";
import EditAction from "@/components/adminComponents/editAction";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {  DT_PRODUCT_COLUMN } from "@/lib/colomn";
import { colomnConfig } from "@/lib/helperFuncation";
import {
  ADMIN_DASHBOARD,
  ADMIN_PRODUCT_ADD,
  ADMIN_PRODUCT_EDIT,
  ADMIN_PRODUCT_SHOW,
  ADMIN_TRASH,
} from "@/routes/AdminPanelRoutes";
import { FilePlus } from "lucide-react";
import Link from "next/link";
import React, { useCallback, useMemo } from "react";

const breadCrumbData = [
  { href: ADMIN_DASHBOARD, label: "Home" },
  { href: ADMIN_PRODUCT_SHOW, label: "Product" },
 ];

const ShowProduct = () => {
  const column = useMemo(() => {
    return colomnConfig(DT_PRODUCT_COLUMN);
  }, []);

  const action = useCallback((row, deleteType, handleDelete) => {
      let actionMenu = [];
      actionMenu.push(
        <EditAction key="edit" href={ADMIN_PRODUCT_EDIT(row.original._id)} />
      );
      actionMenu.push(
        <DeleteAction
          key="delete"
          handleDelete={handleDelete}
          row={row}
          deleteType={deleteType}
        />
      );
      return actionMenu;
    },
    []);

  return (
    <div>
      <Breadcrumbs breadCrumbData={breadCrumbData}></Breadcrumbs>

      <Card className="py-3 rounded shadow-md">
        <CardHeader className="border-b-1 pb-4 ">
          <div className="flex justify-between items-center">
            <h4 className="font-semibold text-xl">Show Product</h4>
            <Button>
              <FilePlus />
              <Link href={ADMIN_PRODUCT_ADD}>New Product </Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent className="mb-2 px-0">
          <DataTableWrapper
            queryKey="product-data"
            fetchUrl="/api/product"
            initialPageSize={10}
            columnsConfig={column}
            exportEndPoint="/api/product/export"
            deleteEndPoint="/api/product/delete"
            deleteType="SD"
            trashView={`${ADMIN_TRASH}?trashof=product`}
            createAction={action}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default ShowProduct;
