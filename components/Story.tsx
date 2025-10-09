"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ChoiceButton } from "@/components/ChoiceButton";

export type StoryChoice = {
  label: string;
  next: string;
  feedback?: string;
};

export type StoryScene = {
  id: string;
  title?: string;
  text: string;
  bg: string;
  imageAlt?: string;
  choices: StoryChoice[];
};

type StoryProps = {
  story: StoryScene[];
  initialSceneId: string;
};

const STORAGE_KEY = "light-heart-tales-progress";
const HISTORY_KEY = "light-heart-tales-history";
const CLEANUP_FLAG = "light-heart-tales-storage-cleaned";
const FEEDBACK_DELAY = 1500;

export function Story({ story, initialSceneId }: StoryProps) {
  const router = useRouter();
  const pathname = usePathname();
  const scenesById = useMemo(() => {
    const map = new Map<string, StoryScene>();
    story.forEach((scene) => map.set(scene.id, scene));
    return map;
  }, [story]);

  const firstSceneId = story[0]?.id ?? "";

  const resolveSceneId = useCallback(
    (candidate: string | null | undefined) => {
      if (!candidate) {
        return firstSceneId;
      }
      return scenesById.has(candidate) ? candidate : firstSceneId;
    },
    [firstSceneId, scenesById]
  );

  const [currentSceneId, setCurrentSceneId] = useState(
    resolveSceneId(initialSceneId)
  );
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isLocked, setIsLocked] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hydratedRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    try {
      const alreadyCleaned = window.localStorage.getItem(CLEANUP_FLAG);
      if (!alreadyCleaned) {
        window.localStorage.removeItem(HISTORY_KEY);
        window.localStorage.removeItem(STORAGE_KEY);
        window.localStorage.setItem(CLEANUP_FLAG, "true");
      }
    } catch (error) {
      console.warn("Failed to clean legacy story storage", error);
    }
  }, []);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    setCurrentSceneId(resolveSceneId(initialSceneId));
  }, [initialSceneId, resolveSceneId]);

  useEffect(() => {
    if (!hydratedRef.current) {
      hydratedRef.current = true;
      const stored = window.localStorage.getItem(STORAGE_KEY);
      const storedScene = resolveSceneId(stored ?? undefined);
      const initialResolved = resolveSceneId(initialSceneId);

      if (stored && storedScene !== initialResolved) {
        setCurrentSceneId(storedScene);
        const nextPath = storedScene === firstSceneId ? "/" : `/scene/${storedScene}`;
        if (nextPath !== pathname) {
          router.replace(nextPath);
        }
      }
    }
  }, [firstSceneId, initialSceneId, pathname, resolveSceneId, router]);

  useEffect(() => {
    if (currentSceneId) {
      window.localStorage.setItem(STORAGE_KEY, currentSceneId);
    }
  }, [currentSceneId]);

  const currentScene = scenesById.get(currentSceneId) ?? story[0];
  const isFirstScene = currentScene?.id === firstSceneId;
  const headingId = currentScene ? `scene-heading-${currentScene.id}` : "scene-heading";
  const descriptionId = `${headingId}-description`;
  const currentSceneTitle = currentScene?.title ?? "光之心森林冒险互动故事";

  const narrativeParagraphs = useMemo(() => {
    const raw = currentScene?.text ?? "";
    return raw
      .split(/(?<=[。！？!?])/u)
      .map((segment) => segment.trim())
      .filter(Boolean);
  }, [currentScene?.text]);

  const handleChoice = useCallback(
    (choice: StoryChoice) => {
      if (!choice || isLocked) {
        return;
      }

      setIsLocked(true);
      setFeedback(choice.feedback ?? null);
      const nextSceneId = resolveSceneId(choice.next);
      const targetPath =
        nextSceneId === firstSceneId ? "/" : `/scene/${nextSceneId}`;

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        setFeedback(null);
        setIsLocked(false);
        setCurrentSceneId(nextSceneId);
        router.push(targetPath);
        timeoutRef.current = null;
      }, FEEDBACK_DELAY);
    },
    [firstSceneId, isLocked, resolveSceneId, router]
  );

  if (!currentScene) {
    return (
      <div className="content">
        <p className="scene-text">故事内容加载中…</p>
      </div>
    );
  }

  return (
    <section
      className="story-shell"
      role="region"
      aria-labelledby={headingId}
      aria-describedby={descriptionId}
    >
      <figure className="background-image" aria-hidden="true">
        <Image
          key={currentScene.bg}
          src={`/${currentScene.bg}`}
          alt={currentScene.imageAlt ?? `${currentSceneTitle}场景插画`}
          fill
          sizes="100vw"
          priority={isFirstScene}
          loading={isFirstScene ? "eager" : "lazy"}
        />
      </figure>
      <div className="overlay" />
      <article className="content" key={currentScene.id}>
        <header className="scene-header">
          <p className="scene-kicker">光之心森林冒险</p>
          <h1 id={headingId} className="scene-heading">
            {currentSceneTitle}
          </h1>
        </header>
        <div id={descriptionId} className="scene-text">
          {narrativeParagraphs.length > 0 ? (
            narrativeParagraphs.map((paragraph, index) => (
              <p key={`${currentScene.id}-paragraph-${index}`}>{paragraph}</p>
            ))
          ) : (
            <p>{currentScene?.text}</p>
          )}
        </div>
        <div className="feedback" aria-live="polite">
          {feedback}
        </div>
        <nav className="choices" aria-label="故事分支选择">
          {currentScene.choices.length > 0 ? (
            currentScene.choices.map((choice) => (
              <ChoiceButton
                key={`${currentScene.id}-${choice.label}`}
                label={choice.label}
                ariaLabel={`选择动作：${choice.label}`}
                onClick={() => handleChoice(choice)}
                disabled={isLocked}
              />
            ))
          ) : (
            <div className="scene-text" role="status">
              冒险暂时告一段落啦，请期待下一集！
            </div>
          )}
        </nav>
        <footer className="story-footer" aria-label="延伸阅读">
          <p className="story-footer__title">想了解故事背后的教育理念？</p>
          <div className="story-footer__links">
            <Link href="/parents-guide">阅读家长指南</Link>
            <Link href="/about">认识创作团队</Link>
          </div>
        </footer>
      </article>
    </section>
  );
}
