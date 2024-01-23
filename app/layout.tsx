import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthContext from "./context/AuthContext";
import ToasterContex from "./context/ToasterContex";

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

        {children}


       </AuthContext>
        </body>
    </html>
  );
}
