import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const Breadcrumbs = ({breadCrumbData}) => {
  return (
    <Breadcrumb>
      <BreadcrumbList className="mb-6">
          {breadCrumbData.length > 0 && breadCrumbData.map((data, index) => {
            return (
                index !== breadCrumbData.length -1 ?
                  <div key={index} className="flex item-center">
                    <BreadcrumbItem >
                    <BreadcrumbLink href={data.href}>{data.label}</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="ms-2 mt-1" />

                  </div> :
                  <div key={index}>
                    <BreadcrumbItem >
                    <BreadcrumbLink href={data.href}>{data.label}</BreadcrumbLink>
                   </BreadcrumbItem>

                  </div>
                    
            )
          }) }       
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default React.memo(Breadcrumbs);
