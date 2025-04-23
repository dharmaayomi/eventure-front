import {
  be_Vietnam_Pro,
  dm_sans,
  lato,
  manrope,
  montserrat,
  poppins,
  raleway,
  roboto,
  rubik,
  urbanist,
} from "@/assets/fonts";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Eventure",
  description: "Escaping from reality",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` ${roboto.className} antialiased`}>
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
}
