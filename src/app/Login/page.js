import React from "react";
import AuthForm from "../components/AuthForm";

const page = () => {
  
  return (
    <div
      style={{ width: "100%", height: "100vh" }}
      className="flex items-center	justify-center justify-items-center font-sans"
    >
      <AuthForm />
    </div>
  );
};

export default page;
