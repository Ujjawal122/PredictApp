// src/app/resetPassword/page.tsx
import React, { Suspense } from "react";
import ResetPasswordForm from "./ResetPasswordForm";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading reset page...</div>}>
      <ResetPasswordForm />
    </Suspense>
  );
}
