import React, { Suspense } from "react";
import TrashComponent from "./TrashComponent";

const page = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <TrashComponent />
      </Suspense>
    </div>
  );
};

export default page;
