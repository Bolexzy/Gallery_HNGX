"use client";
import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import styles from "./AuthForm.module.css";
import { signIn } from "next-auth/react";
import Image from "next/image";
import wavingHand from "../../../public/waving-hand.png";

const AuthForm = () => {
  const validation = Yup.object().shape({
    email: Yup.string()
      .required("Email is a required field")
      .email("Invalid email format"),
    password: Yup.string()
      .required("Password is a required field")
      .min(8, "Password must be at least 8 characters"),
  });

  const handleLogin = async (email, password) => {
    try {
      console.log(email);
      console.log(password);
      await signIn("credentials", {
        username: email,
        password: password,
        callbackUrl: "/",
      });
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <Formik
      validationSchema={validation}
      initialValues={{ email: "", password: "" }}
      onSubmit={(values) => {
        // Alert the input values of the form that we filled
        handleLogin(values.email, values.password);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
      }) => (
        <div className="w-1/2 h-3/7 p-4 flex justify-center justify-items-center font-sans">
          <form
            onSubmit={handleSubmit}
            className="relative bg-[#FFFFFF] flex justify-center justify-items-center w-7/12 space-y-5 p-4 rounded font-sans flex-col text-center"
          >
            <span className="text-xl text-green-500 text-shadow font-bold tracking-widest mb-4">
              Login
            </span>
            <Image
              src={wavingHand}
              alt="waving hand"
              width={50}
              height={50}
              className="animate-bounce mx-auto mt-2"
            />
            {/* Username and Password Fields */}
            {/* <!--E-mail input--> */}
            <input
              className=" rounded border border-slate-300  p-2 shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
              "
              type="email "
              name="email"
              placeholder="Enter your email address"
              id="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
            ></input>
            {/* If validation is not passed show errors */}
            <p
              className={`${styles.error} italic mb-2 ml-2 my-0 text-left	 text-rose-900	 text-xs`}
            >
              {errors.email && touched.email && errors.email}
            </p>
            <input
              className=" rounded border border-slate-300 p-2 shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
              type="password"
              name="password"
              placeholder="Enter password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
            ></input>
            {/* If validation is not passed show errors */}
            <p
              className={`${styles.error} italic mb-2 ml-2 my-0 text-left	 text-rose-900	 text-xs`}
            >
              {errors.password && touched.password && errors.password}
            </p>
            {/* Click on submit button to submit the form */}
            <button
              type="submit"
              className="text-white bg-cyan-700 p-2 focus:ring-2 rounded hover:ring-green-300 active:ring-green-500 focus:outline-none  "
            >
              Login
            </button>
          </form>
        </div>
      )}
    </Formik>
  );
};

export default AuthForm;
