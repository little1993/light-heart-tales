import type { Metadata } from "next";
import Link from "next/link";
import {
  absoluteUrl,
  canonicalUrl,
  defaultAuthor,
  jsonLd
} from "@/src/lib/seo";

const pageTitle = "关于光之心教育工作室";
const pageDescription =
  "我们是一支专注儿童共情力培养的互动故事创作团队，融合教育心理与游戏化设计，为孩子打造安全有趣的学习体验。";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: canonicalUrl("/about")
  },
  keywords: [
    "儿童教育",
    "互动故事团队",
    "情绪管理",
    "共情能力",
    "亲子共读"
  ],
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: canonicalUrl("/about"),
    type: "website",
    images: [
      {
        url: "/bg/scene3.png",
        width: 1200,
        height: 630,
        alt: "光之心教育工作室团队介绍"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
    images: ["/bg/scene3.png"],
    creator: "@lightheartstories"
  }
};

export default function AboutPage() {
  const aboutSchema = jsonLd({
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "光之心教育工作室",
    url: canonicalUrl("/about"),
    logo: absoluteUrl("/bg/scene1.png"),
    founders: [defaultAuthor],
    sameAs: ["https://www.linkedin.com", "https://weibo.com"],
    description: pageDescription
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: aboutSchema }}
      />
      <article className="marketing-page">
        <section className="marketing-page__intro">
          <h1>关于光之心教育工作室</h1>
          <p>
            我们结合教育心理学、儿童文学与互动设计经验，致力于通过故事陪伴孩子探索情绪与友谊。团队成员来自教育科技、幼教课程与插画领域，希望用温柔的内容帮助家庭建立更有力量的沟通方式。
          </p>
        </section>

        <section className="marketing-page__grid">
          <div className="marketing-card">
            <h2>我们的创作原则</h2>
            <ul className="marketing-list">
              <li>以儿童发展心理学为底层逻辑，设计循序渐进的同理心训练。</li>
              <li>与一线幼教老师共创故事分支，确保选择贴近孩子日常处境。</li>
              <li>坚持正向叙事与多元角色，鼓励孩子尊重差异、勇敢表达。</li>
            </ul>
          </div>

          <div className="marketing-card">
            <h2>团队背景</h2>
            <p>
              核心成员拥有教育科技产品、儿童心理辅导与故事叙事设计经验，曾服务超过 50
              家幼教机构与社群。我们持续收集家长反馈，迭代互动机制与引导语言。
            </p>
          </div>

          <div className="marketing-card">
            <h2>合作方式</h2>
            <ul className="marketing-list">
              <li>为学校与机构定制共情力主题课程与互动式故事工作坊。</li>
              <li>提供家庭版阅读计划与情绪对话引导工具。</li>
              <li>欢迎教育研究者提出共创议题，一起验证故事对孩子成长的影响。</li>
            </ul>
          </div>
        </section>

        <section className="marketing-card">
          <h2>下一步行动</h2>
          <p>
            如果你希望引入《光之心森林冒险》到课堂或家庭社群，欢迎直接联系团队。我们会提供使用指南、学习单以及持续的效果评估支持。
          </p>
          <div className="story-footer__links">
            <Link href="mailto:hello@lightheartstories.com">预约交流</Link>
            <Link href="/parents-guide">查看家长指南</Link>
            <Link href="/">体验第一章</Link>
          </div>
        </section>
      </article>
    </>
  );
}
