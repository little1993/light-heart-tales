import Link from "next/link";

export default function NotFound() {
  return (
    <div className="content">
      <div className="scene-text">抱歉，没找到这个场景。</div>
      <Link href="/" className="scene-text">
        返回故事开头
      </Link>
    </div>
  );
}
