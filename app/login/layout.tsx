"use client";
import Navbar from "../_components/navbar";
import "../globals.css";
import { useSelector } from "react-redux";

export default function PagesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isAuthenticated = useSelector(
    (state: any) => state.auth.isAuthenticated
  );

  return (
    <>
      <Navbar isAuthenticated={isAuthenticated} />
      <div className="p-10">{children}</div>
    </>
  );
}
