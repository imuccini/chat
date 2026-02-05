import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Local - Connettiti con chi ti sta intorno",
    description: "La chat locale istantanea per treni, aeroporti e spazi pubblici.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="it" suppressHydrationWarning>
            <body className="antialiased bg-white text-gray-900 font-sans">
                {children}
            </body>
        </html>
    );
}
