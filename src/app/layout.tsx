import { lexend, manrope } from "@/assets/fonts";
import { SidebarProvider } from "@/context/SidebarContext";
import NextAuthProviders from "@/providers/NextAuthProviders";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import TokenProvider from "@/providers/TokenProviders";
import type { Metadata } from "next";
import { Toaster } from "sonner";
import "./globals.css";
import NuqsProvider from "@/providers/NuqsProviders";

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
      <body className={` ${manrope.className} bg-[#F9FAFB] antialiased`}>
        <ReactQueryProvider>
          {/* <ThemeProvider> */}
          <NuqsProvider>
            <NextAuthProviders>
              <TokenProvider>
                <SidebarProvider>{children}</SidebarProvider>
              </TokenProvider>
            </NextAuthProviders>
            {/* </ThemeProvider> */}
          </NuqsProvider>
        </ReactQueryProvider>
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}
