"use client";

import React, { Suspense } from "react";
import LoginClient from "./LoginClient";

const LoginPage = () => {
  return (
    <div>
      <Suspense fallback={<div className="text-center">Loading...</div>}>
        <LoginClient />
      </Suspense>
    </div>
  );
};

export default LoginPage;
