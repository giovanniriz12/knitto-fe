import type { Metadata } from "next";
import "./globals.css";
import BootstrapClient from "@/js/bootstrapClient";
import "bootstrap/dist/css/bootstrap.css";
import RootProvider from "./_redux/Provider";

export const metadata: Metadata = {
  title: "Knitto Test",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <RootProvider>
          {children}
          <BootstrapClient />
        </RootProvider>
      </body>
    </html>
  );
}
