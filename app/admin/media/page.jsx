import React, { Suspense } from "react";
import MediaClient from "./MediaClient";

const Media = () => {
  return (
    <div>
      <Suspense fallback={<div className="p-6">Loading media...</div>}>
        <MediaClient />
      </Suspense>
    </div>
  );
};

export default Media;
