const DEFAULT_SITE_URL = "https://light-heart-tales.vercel.app";

const sanitizedEnvUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

export const siteUrl = sanitizedEnvUrl
  ? sanitizedEnvUrl.replace(/\/$/, "")
  : DEFAULT_SITE_URL;

export function absoluteUrl(path = "/") {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${siteUrl}${normalizedPath}`;
}

export function canonicalUrl(path = "/") {
  return absoluteUrl(path);
}

export function jsonLd<T>(schema: T) {
  return JSON.stringify(schema, null, 2);
}

export const defaultAuthor = {
  "@type": "Person",
  name: "光之心故事团队",
  url: siteUrl
};

export const defaultPublisher = {
  "@type": "Organization",
  name: "光之心教育工作室",
  url: siteUrl,
  logo: {
    "@type": "ImageObject",
    url: absoluteUrl("/bg/scene1.png")
  }
};
