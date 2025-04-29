import { lexend } from "@/assets/fonts";
import { SidebarProvider } from "@/context/SidebarContext";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import type { Metadata } from "next";
import { Toaster } from "sonner";
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
    <html lang="en" suppressHydrationWarning>
      <body className={` ${lexend.className} bg-[#F9FAFB] antialiased`}>
        <ReactQueryProvider>
          {/* <ThemeProvider> */}
          <SidebarProvider>{children}</SidebarProvider>
          {/* </ThemeProvider> */}
        </ReactQueryProvider>
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}
