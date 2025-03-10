import "@/styles/global.css";
import { Metadata } from "next";
import MainComponent from "./(home)/components/(layout)/main";

export const metadata: Metadata = {
  title: {
    template: "%s | Next.js",
    default: "Loading...",
  },
  description: "Generated by Next.js",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-mono">
        <MainComponent>{children}</MainComponent>
      </body>
    </html>
  );
}
