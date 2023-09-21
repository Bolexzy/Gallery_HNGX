"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { signOut, useSession } from "next-auth/react";
import SignIn from "./components/SignIn";
import ImageGallery from "./components/ImageGallery";

export default function Home() {
  const { data } = useSession();
  // console.log(JSON.stringify(data));

  if (data) {
    return (
      <div className="p-4 flex flex-col justify-center justify-items-center">
        <div className="flex flex-row justify-between shadow p-4">
          <span className="text-xl text-green-100 font-semibold tracking-widest">
            Welcome, {data.user?.email}
          </span>
          <button
            type="button"
            onClick={() => {
              signOut();
            }}
            className="text-white bg-cyan-700 p-2 ring-2 rounded ring-rose-300  hover:ring-rose-400 active:ring-rose-500 focus:outline-none"
          >
            Sign Out
          </button>
        </div>
        <br />

        <ImageGallery />
      </div>
    );
  }
  return (
    <main className={styles.main}>
      <SignIn />
    </main>
  );
}
