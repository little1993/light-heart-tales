import type { Metadata } from "next";
import { Story, type StoryScene } from "@/components/Story";
import storyData from "@/src/story.json";
import {
  absoluteUrl,
  canonicalUrl,
  defaultAuthor,
  defaultPublisher,
  jsonLd
} from "@/src/lib/seo";

const story = storyData as StoryScene[];
const firstScene = story[0];

export const metadata: Metadata = {
  title: "儿童教育互动小说：镜之森林开启冒险",
  description:
    "儿童教育互动小说《光之心森林冒险》第一章：莱恩与米拉在镜之森林里遇见被黑雾包围的小鸟，培养孩子的共情与合作力。",
  alternates: {
    canonical: canonicalUrl("/")
  },
  keywords: [
    "儿童互动故事",
    "亲子共读",
    "情绪教育",
    "儿童共情训练",
    "光之心森林冒险"
  ],
  openGraph: {
    title: "儿童教育互动小说：镜之森林开启冒险",
    description:
      "沉浸式儿童教育互动小说《光之心森林冒险》，第一场景讲述莱恩与米拉面对黑雾小鸟的故事。",
    url: canonicalUrl("/"),
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
    title: "儿童教育互动小说：镜之森林开启冒险",
    description:
      "沉浸式儿童教育互动小说《光之心森林冒险》，第一场景讲述莱恩与米拉面对黑雾小鸟的故事。",
    images: ["/bg/scene1.png"],
    creator: "@lightheartstories"
  }
};

export const dynamic = "force-static";

export default function HomePage() {
  if (!firstScene) {
    return null;
  }

  const pageDescription =
    metadata.description ??
    "儿童教育互动小说《光之心森林冒险》，陪伴孩子学会同理与合作。";

  const storySchema = jsonLd({
    "@context": "https://schema.org",
    "@type": "InteractiveExperience",
    name: "光之心森林冒险：镜之森林开启冒险",
    url: canonicalUrl("/"),
    image: absoluteUrl(`/${firstScene.bg}`),
    description: pageDescription,
    inLanguage: "zh-CN",
    genre: ["儿童教育", "互动故事"],
    educationalUse: ["共情训练", "合作练习"],
    typicalAgeRange: "5-10",
    author: defaultAuthor,
    publisher: defaultPublisher,
    hasPart: story.map((scene) => ({
      "@type": "CreativeWork",
      name: scene.title ?? `光之心森林冒险 - ${scene.id}`,
      headline: scene.title ?? scene.text.slice(0, 20),
      url:
        scene.id === firstScene.id
          ? canonicalUrl("/")
          : canonicalUrl(`/scene/${scene.id}`),
      text: scene.text,
      image: absoluteUrl(`/${scene.bg}`)
    }))
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: storySchema }}
      />
      <Story story={story} initialSceneId={firstScene.id} />
    </>
  );
}
