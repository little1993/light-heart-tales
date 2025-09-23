"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ChoiceButton } from "@/components/ChoiceButton";

export type StoryChoice = {
  label: string;
  next: string;
  feedback?: string;
};

export type StoryScene = {
  id: string;
  text: string;
  bg: string;
  choices: StoryChoice[];
};

type StoryProps = {
  story: StoryScene[];
  initialSceneId: string;
};

const STORAGE_KEY = "light-heart-tales-progress";
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
    <div className="story-shell">
      <div
        key={currentScene.bg}
        className="background-image"
        style={{ backgroundImage: `url(/${currentScene.bg})` }}
        aria-hidden="true"
      />
      <div className="overlay" />
      <div className="content" key={currentScene.id}>
        <div className="scene-text">{currentScene.text}</div>
        <div className="feedback" aria-live="polite">
          {feedback}
        </div>
        <div className="choices">
          {currentScene.choices.length > 0 ? (
            currentScene.choices.map((choice) => (
              <ChoiceButton
                key={`${currentScene.id}-${choice.label}`}
                label={choice.label}
                onClick={() => handleChoice(choice)}
                disabled={isLocked}
              />
            ))
          ) : (
            <div className="scene-text">
              冒险暂时告一段落啦，请期待下一集！
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
