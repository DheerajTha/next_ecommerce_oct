import React, { Suspense } from "react";
import AddProductPage from "./AddProductpageCompo";

const page = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <AddProductPage />
      </Suspense>
    </div>
  );
};

export default page;
