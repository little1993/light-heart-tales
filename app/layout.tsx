import type { Metadata } from "next";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: {
    default: "儿童教育互动小说 | 光之心森林冒险",
    template: "%s | 光之心森林冒险"
  },
  description:
    "儿童教育互动小说《光之心森林冒险》，陪伴孩子学会同理与合作，沉浸式的互动阅读体验。",
  openGraph: {
    title: "儿童教育互动小说 | 光之心森林冒险",
    description:
      "儿童教育互动小说《光之心森林冒险》，陪伴孩子学会同理与合作，沉浸式的互动阅读体验。",
    type: "website",
    locale: "zh_CN"
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-Hans">
      <body>
        <main className="main-wrapper">{children}</main>
      </body>
    </html>
  );
}
