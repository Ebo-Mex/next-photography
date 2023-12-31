import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import NavBar from "./components/NavBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Photography portfolio!",
    description: "Generated by create next app",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body suppressHydrationWarning={true} className={inter.className}>
                <NavBar />
                {children}
            </body>
        </html>
    );
}
