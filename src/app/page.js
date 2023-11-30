"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { signOut, useSession } from "next-auth/react";
import SignIn from "./login_error/SignIn";
import ImageGallery from "./components/ImageGallery";
import Footer from "./components/Footer";

export default function Home() {
  const { data } = useSession();
  // console.log(JSON.stringify(data));

  if (data) {
    return (
      <div className="flex flex-col justify-center justify-items-center bg-sky-200">
        <div
          className="flex flex-row justify-between items-center shadow p-4 w-full h-32 bg-cyan-800"
          // style={{
          //   background: "#4E5273",
          // }}
        >
          <span className="text-sm md:text-xl text-slate-200 font-semibold tracking-normal text-left md:tracking-widest">
            Welcome, {data.user?.email}
          </span>
          <button
            type="button"
            onClick={() => {
              signOut();
            }}
            className="text-sm text-white bg-cyan-700 shadow-inner p-1 md:p-2 ring-2 rounded ring-rose-600  hover:ring-rose-400 active:ring-rose-500 focus:outline-none"
          >
            Sign Out
          </button>
        </div>
        <br />

        <ImageGallery />
        <Footer />
      </div>
    );
  }
  return (
    // #4E5273
    <main
      className="w-full min-h-screen p-28 flex flex-col items-center justify-around"
      style={{
        background:
          "linear-gradient(to bottom, rgba(245, 246, 252, 0.52), rgba(13, 116, 144, 0.52)), url('/Collage-Aesthetic-Summer-ipad-wallpaper.jpg') no-repeat",
        backdropFilter: "blur(2px)",
      }}
    >
      <SignIn />
      <Footer />
    </main>
  );
}
