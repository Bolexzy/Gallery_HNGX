import React from "react";
import AuthForm from "../components/AuthForm";

const page = () => {
  return (
    <div
      className="w-full h-screen flex items-center	justify-center justify-items-center font-sans"
      style={{
        background:
          "linear-gradient(to bottom, rgba(245, 246, 252, 0.52), rgba(13, 116, 144, 0.52)), url('/Collage-Aesthetic-Summer-ipad-wallpaper.jpg') no-repeat",
        backdropFilter: "blur(2px)",
      }}
    >
      <AuthForm />
    </div>
  );
};

export default page;
