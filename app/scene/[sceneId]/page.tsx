import type { Metadata } from "next";
import { notFound } from "next/navigation";
import storyData from "@/src/story.json";
import { Story, type StoryScene } from "@/components/Story";

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
      description: "抱歉，您访问的儿童教育互动小说场景不存在。"
    };
  }

  const previewText = scene.text.slice(0, 90);
  const titleSnippet = scene.text.slice(0, 16);
  const formattedTitle = `儿童教育互动小说：${titleSnippet}${
    scene.text.length > 16 ? "..." : ""
  }`;

  return {
    title: formattedTitle,
    description: `${previewText}${scene.text.length > 90 ? "..." : ""}`,
    openGraph: {
      title: formattedTitle,
      description: `${previewText}${scene.text.length > 90 ? "..." : ""}`,
      type: "article"
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

  return <Story story={story} initialSceneId={scene.id} />;
}
