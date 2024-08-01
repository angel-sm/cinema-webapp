"use client";
import { useRouter } from "next/navigation";
import React from "react";

function Page() {
  const route = useRouter();
  route.push("/home");
  return <></>;
}

export default Page;
