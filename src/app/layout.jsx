import { Providers } from "@/components/providers/Providers";
import "./globals.css";
import { Inter, Sora } from "next/font/google";
import { Toaster } from "react-hot-toast";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-sora",
  display: "swap",
});

export const metadata = {
  title: "Web3 Project",
  description: "Next.js + Tailwind CSS Web3 UI",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${sora.variable}`}
      suppressHydrationWarning="true"
    >
      <body>
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
