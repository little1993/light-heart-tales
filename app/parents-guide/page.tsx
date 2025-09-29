import type { Metadata } from "next";
import Link from "next/link";
import {
  absoluteUrl,
  canonicalUrl,
  defaultAuthor,
  defaultPublisher,
  jsonLd
} from "@/src/lib/seo";

const pageTitle = "光之心森林冒险家长指南";
const pageDescription =
  "了解如何用《光之心森林冒险》陪伴孩子练习同理心、合作与情绪表达，获取共读技巧与延伸活动建议。";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: canonicalUrl("/parents-guide")
  },
  keywords: [
    "家长指南",
    "共读技巧",
    "情绪教育",
    "儿童共情训练",
    "互动故事"
  ],
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: canonicalUrl("/parents-guide"),
    type: "article",
    images: [
      {
        url: "/bg/scene2.png",
        width: 1200,
        height: 630,
        alt: "光之心森林冒险家长指南封面"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
    images: ["/bg/scene2.png"],
    creator: "@lightheartstories"
  }
};

export default function ParentsGuidePage() {
  const guideSchema = jsonLd({
    "@context": "https://schema.org",
    "@type": "Article",
    headline: pageTitle,
    description: pageDescription,
    author: defaultAuthor,
    publisher: defaultPublisher,
    datePublished: "2024-02-20",
    dateModified: "2024-02-20",
    image: absoluteUrl("/bg/scene2.png"),
    url: canonicalUrl("/parents-guide")
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: guideSchema }}
      />
      <article className="marketing-page">
        <section className="marketing-page__intro">
          <h1>光之心森林冒险家长指南</h1>
          <p>
            用 10 分钟的互动故事，陪伴孩子练习共情与合作。以下建议帮助你把《光之心森林冒险》融入家庭对话，让孩子在选择中感受他人的情绪，并学会用行动传递善意。
          </p>
        </section>

        <section className="marketing-card">
          <h2>共读前的准备</h2>
          <ul className="marketing-list">
            <li>
              营造安静舒服的阅读环境，让孩子可以专注聆听，也能自由表达自己的感受。
            </li>
            <li>
              简单介绍故事主角莱恩和米拉，邀请孩子分享最近一次帮助别人或被帮助的经验。
            </li>
            <li>
              约定“暂停按钮”，当孩子想分享、提问或换一个选择时，可以随时喊停讨论。
            </li>
          </ul>
        </section>

        <section className="marketing-card">
          <h2>共读时的引导语</h2>
          <ul className="marketing-list">
            <li>看到小鸟被黑雾包围时，你觉得它的心情是什么？为什么会这样想？</li>
            <li>如果你是莱恩，你会怎么做？有什么不同的结局可能出现？</li>
            <li>选择之后问问孩子：这个决定会让谁更开心？谁可能会受伤？</li>
          </ul>
        </section>

        <section className="marketing-card">
          <h2>延伸活动建议</h2>
          <ul className="marketing-list">
            <li>动手做：准备纸卡，让孩子画出故事角色的情绪变化，贴在墙上做“情绪温度计”。</li>
            <li>角色转换：复述故事后让孩子扮演小鸟或米拉，用身体语言表现他们的感受。</li>
            <li>生活连结：列出生活中需要帮助的小伙伴，讨论如果是他们遇到困难，我们会怎么做。</li>
          </ul>
        </section>

        <section className="marketing-card">
          <h2>想要更多章节？</h2>
          <p>
            我们正在创作新的冒险篇章与配套学习单，欢迎留下联络方式，第一时间收到上线通知。
          </p>
          <div className="story-footer__links">
            <Link href="mailto:hello@lightheartstories.com?subject=光之心森林冒险订阅">订阅更新</Link>
            <Link href="/about">了解创作团队</Link>
            <Link href="/">立即开始阅读</Link>
          </div>
        </section>
      </article>
    </>
  );
}
