import type { Metadata } from "next";
import ReduxProvider from "./_lib/redux/provider";
import "./globals.css";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Cinem-app",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Toaster richColors />
        <ReduxProvider>
          <div>{children}</div>
        </ReduxProvider>
      </body>
    </html>
  );
}
