import { Sora, JetBrains_Mono } from "next/font/google";
import { JsonLd } from "@/components/JsonLd";
import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-display"
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono"
});

export const metadata = {
  title: "Monarch Portfolio System",
  description: "A progression-driven full-stack developer portfolio with a built-in CMS and premium motion design."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${sora.variable} ${jetbrainsMono.variable}`}>
        <JsonLd />
        {children}
      </body>
    </html>
  );
}
