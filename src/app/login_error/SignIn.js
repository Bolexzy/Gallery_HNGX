import React from "react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import errorSvg from "../../../public/error.svg";

const SignIn = () => {
  return (
    <div className="w-full md:w-2/6 h-3/7 p-4 flex flex-col justify-around items-center font-sans rounded ">
      <span className="md:text-xl sm:text-sm text-center text-rose-800 font-bold tracking-widest mb-4">
        Not signed in
      </span>
      <Image
        src={errorSvg}
        alt="SVG Image"
        width={50}
        height={50}
        className="animate-bounce mx-auto mt-2"
      />
      <br />
      <button
        type="button"
        onClick={() => {
          signIn();
        }}
        className="w-48 text-white text-lg bg-cyan-700 shadow-inner p-3 ring-2 rounded-xl ring-rose-500  hover:ring-green-300 active:ring-green-500 focus:outline-none"
      >
        Sign In
      </button>
    </div>
  );
};

export default SignIn;
