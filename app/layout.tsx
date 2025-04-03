import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import "./globals.css";
import { Header, Footer } from './components'

const notoSans = Noto_Sans({
  weight: ["400", "700"],
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: "Fun With Flags",
  description: "Flags of the world",
  icons: {
    icon: "/favicon.svg"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${notoSans.className} antialiased p-8 md:px-16 lg:px-24`}
      >
        <Header />
        <main className="flex flex-col flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
