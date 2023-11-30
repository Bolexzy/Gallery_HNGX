import "./globals.css";
import { Montserrat } from "next/font/google";
import Provider from "@/app/context/client-provider";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata = {
  title: "Gallery App",
  description: "A Drag-and-Drop Image gallery ",
};

export default async function RootLayout({ children }) {
  // const session = await getServerSession(authOptions);
  // console.log("Session", JSON.stringify(session, null, 2));
  return (
    <html lang="en">
      <body className={`${montserrat.className} min-h-screen min-w-screen`}>
        <main>
          <Provider>{children}</Provider>
        </main>
      </body>
    </html>
  );
}
