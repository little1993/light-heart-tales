import type { Metadata } from "next";
import { notFound } from "next/navigation";
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

const findScene = (sceneId: string) => story.find((scene) => scene.id === sceneId);

export const dynamic = "force-static";
export const dynamicParams = false;
export const revalidate = false;

export function generateStaticParams() {
  return story.map((scene) => ({ sceneId: scene.id }));
}

export function generateMetadata({
  params
}: {
  params: { sceneId: string };
}): Metadata {
  const scene = findScene(params.sceneId);
  if (!scene) {
    return {
      title: "儿童教育互动小说：场景未找到",
      description: "抱歉，您访问的儿童教育互动小说场景不存在。",
      alternates: {
        canonical: canonicalUrl(`/scene/${params.sceneId}`)
      }
    };
  }

  const previewText = scene.text.slice(0, 90);
  const formattedTitle = scene.title
    ? `儿童教育互动小说：${scene.title}`
    : `儿童教育互动小说：${scene.text.slice(0, 16)}${
        scene.text.length > 16 ? "..." : ""
      }`;
  const canonicalPath = scene.id === story[0]?.id ? "/" : `/scene/${scene.id}`;
  const canonical = canonicalUrl(canonicalPath);
  const imageUrl = absoluteUrl(`/${scene.bg}`);
  const description = `${previewText}${scene.text.length > 90 ? "..." : ""}`;

  return {
    title: formattedTitle,
    description,
    alternates: {
      canonical
    },
    keywords: [
      "儿童互动故事",
      "儿童共情能力",
      "亲子教育",
      "光之心森林冒险"
    ],
    openGraph: {
      title: formattedTitle,
      description,
      url: canonical,
      type: "article",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: scene.imageAlt ?? `${scene.title ?? "故事场景"}插画`
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: formattedTitle,
      description,
      images: [imageUrl],
      creator: "@lightheartstories"
    }
  };
}

export default function ScenePage({
  params
}: {
  params: { sceneId: string };
}) {
  const scene = findScene(params.sceneId);

  if (!scene) {
    notFound();
  }

  const canonicalPath = scene.id === story[0]?.id ? "/" : `/scene/${scene.id}`;
  const sceneSchema = jsonLd({
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: scene.title ?? `光之心森林冒险 - ${scene.id}`,
    headline: scene.title ?? scene.text.slice(0, 20),
    url: canonicalUrl(canonicalPath),
    image: absoluteUrl(`/${scene.bg}`),
    author: defaultAuthor,
    publisher: defaultPublisher,
    description: scene.text,
    about: {
      "@type": "Thing",
      name: "儿童共情与合作",
      description:
        "通过互动式选择，让孩子学习如何同理他人、提升合作与情绪管理能力。"
    }
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: sceneSchema }}
      />
      <Story story={story} initialSceneId={scene.id} />
    </>
  );
}
