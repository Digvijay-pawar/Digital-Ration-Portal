import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/global.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ToastContainer from "@/components/ToastContainer";
import { UserProvider } from "@/context/UserContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ration Card Management System",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light">
      <body className={`${inter.className} bg-white`}>
        <UserProvider>
          <Header />
          <ToastContainer />
          {children}
          <Footer />
        </UserProvider>
      </body>
    </html>
  );
}