import type { Metadata } from "next";
import "./globals.css";
import Header from "./ui/header";
import { PT_Sans, PT_Serif } from "next/font/google";
import Footer from "./ui/footer";
import { AuthProvider } from "@/contexts/AuthProvider";

const ptSans = PT_Sans({ weight: ["400"], subsets: ["latin"] });
export const ptSerif = PT_Serif({ weight: ["400"], subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | HR Assistant",
    default: "HR Assistant",
  },
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={ptSans.className}>
        <AuthProvider>
          <Header />
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
