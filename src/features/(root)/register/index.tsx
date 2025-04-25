import React from "react";
import { RegisterForm2 } from "./_components/registerForm2";
import { RegisterForm } from "./_components/RegisterForm";

const RegisterPage = () => {
  return (
    // <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
    //   <div className="w-full max-w-sm">
    //     <RegisterForm />
    //   </div>
    // </div>

    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-4xl">
        <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterPage;
