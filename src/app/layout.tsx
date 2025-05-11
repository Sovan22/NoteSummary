import type { Metadata } from "next";
import { Inter, Roboto, Roboto_Mono } from "next/font/google";
import { ThemeContextProvider } from './theme/ThemeContext';
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Notes - Smart Note-Taking App",
  description: "An AI-powered note-taking application for students, job seekers, and entrepreneurs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head />
      <body
        className={`${inter.variable} ${roboto.variable} ${robotoMono.variable} antialiased`}
        style={{
          position: 'relative',
          transition: 'background-color 0.3s ease',
          overflowX: 'hidden',
          minHeight: '100vh',
        }}
      >
        <ThemeContextProvider>
        <div 
          style={{
            content: '\'\''as any,
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: -1,
            backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(128, 203, 196, 0.1) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(103, 80, 164, 0.1) 0%, transparent 50%)',
            pointerEvents: 'none',
          }}
        />
        {children}
        </ThemeContextProvider>
      </body>
    </html>
  );
}
