import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Treno Chat",
    description: "Chat locale per passeggeri",
    appleWebApp: {
        capable: true,
        statusBarStyle: "default",
        title: "Treno Chat",
    },
    formatDetection: {
        telephone: false,
    },
};

export const viewport = {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="it" suppressHydrationWarning>
            <body className="antialiased bg-gray-50 text-gray-900">
                {children}
            </body>
        </html>
    );
}
