import type { Metadata } from "next";
import storyData from "@/src/story.json";
import { Story, type StoryScene } from "@/components/Story";

const story = storyData as StoryScene[];
const firstScene = story[0];

export const metadata: Metadata = {
  title: "儿童教育互动小说：镜之森林开启冒险",
  description:
    "儿童教育互动小说《光之心森林冒险》第一章：莱恩与米拉在镜之森林里遇见被黑雾包围的小鸟，培养孩子的共情与合作力。",
  openGraph: {
    title: "儿童教育互动小说：镜之森林开启冒险",
    description:
      "沉浸式儿童教育互动小说《光之心森林冒险》，第一场景讲述莱恩与米拉面对黑雾小鸟的故事。",
    type: "website"
  }
};

export const dynamic = "force-static";

export default function HomePage() {
  if (!firstScene) {
    return null;
  }

  return <Story story={story} initialSceneId={firstScene.id} />;
}
