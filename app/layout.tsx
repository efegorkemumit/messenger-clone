import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthContext from "./context/AuthContext";
import ToasterContex from "./context/ToasterContex";
import ActiveStatus from "@/components/ActiveStatus";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "messenger-clone",
  description: "Youtube Efe Görkem Ümit",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
       <AuthContext>
        <ToasterContex/>
        <ActiveStatus></ActiveStatus>

        {children}


       </AuthContext>
        </body>
    </html>
  );
}
