import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sunflower Code Studio",
  description: "AI code generation workspace with GitHub auth",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
