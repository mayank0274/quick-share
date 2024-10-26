import type { Metadata } from "next";
import localFont from "next/font/local";
import { ChakraUiProvider } from "./ChakraUiProvider";
import Navbar from "@/components/Navbar";
import { AppContextProvider } from "@/context/contextProvider";
import { Footer } from "@/components/Footer";
import "./style.css";
import { Box } from "@chakra-ui/react";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "QuickShare",
  description: "Quick share : share files securely",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        className={`${geistSans.variable} ${geistMono.variable}`}
        suppressHydrationWarning={true}
      >
        <ChakraUiProvider>
          <AppContextProvider>
            <Navbar />
            <Box
              minH={{ base: "97vh", sm: "97vh", md: "85vh", lg: "85vh" }}
              sx={{ height: "auto !important" }}
            >
              {children}
            </Box>
            <Footer />
          </AppContextProvider>
        </ChakraUiProvider>
      </body>
    </html>
  );
}
