import Link from "next/link";
import type { Metadata } from "next";
import {
  canonicalUrl,
  defaultAuthor,
  defaultPublisher,
  siteUrl
} from "@/src/lib/seo";
import "@/app/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "儿童教育互动小说 | 光之心森林冒险",
    template: "%s | 光之心森林冒险"
  },
  description:
    "儿童教育互动小说《光之心森林冒险》，陪伴孩子学会同理与合作，沉浸式的互动阅读体验。",
  alternates: {
    canonical: canonicalUrl()
  },
  keywords: [
    "儿童互动小说",
    "儿童教育故事",
    "亲子阅读",
    "情绪教育",
    "儿童共情能力"
  ],
  authors: [defaultAuthor],
  creator: defaultAuthor.name,
  publisher: defaultPublisher.name,
  applicationName: "光之心森林冒险",
  openGraph: {
    title: "儿童教育互动小说 | 光之心森林冒险",
    description:
      "儿童教育互动小说《光之心森林冒险》，陪伴孩子学会同理与合作，沉浸式的互动阅读体验。",
    url: siteUrl,
    siteName: "光之心森林冒险",
    locale: "zh_CN",
    type: "website",
    images: [
      {
        url: "/bg/scene1.png",
        width: 1200,
        height: 630,
        alt: "莱恩与米拉在镜之森林开启冒险的插画"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    creator: "@lightheartstories",
    title: "儿童教育互动小说 | 光之心森林冒险",
    description:
      "互动式儿童教育小说，陪伴孩子学会同理与合作，沉浸式的故事体验。",
    images: ["/bg/scene1.png"]
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const currentYear = new Date().getFullYear();

  return (
    <html lang="zh-Hans">
      <body>
        <header className="site-header">
          <div className="site-header__inner">
            <Link href="/" className="site-brand">
              光之心森林冒险
            </Link>
            <nav className="site-nav" aria-label="主要导航">
              <Link href="/about">关于我们</Link>
              <Link href="/parents-guide">家长指南</Link>
            </nav>
          </div>
        </header>
        <main className="main-wrapper">{children}</main>
        <footer className="site-footer">
          <div className="site-footer__inner">
            <p>
              © {currentYear} 光之心教育工作室 · 互动故事陪伴孩子成长
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
