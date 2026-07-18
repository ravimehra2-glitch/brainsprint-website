import { useEffect } from "react";

interface SeoProps {
  title: string;
  description: string;
  path: string;
}

const SITE_URL = "https://www.brainsprint.online";

function setMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setCanonical(href: string) {
  let el = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

/**
 * Sets document title, meta description, canonical URL, and Open Graph /
 * Twitter tags for the current route. Note: since this is a client-rendered
 * SPA, these updates are visible to Googlebot (which executes JS) but not
 * to crawlers that don't render JavaScript (some social-media link
 * previewers). See README for details and the recommended fix.
 */
export default function Seo({ title, description, path }: SeoProps) {
  useEffect(() => {
    const url = `${SITE_URL}${path}`;
    document.title = title;
    setMeta("name", "description", description);
    setCanonical(url);

    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", url);

    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", description);
  }, [title, description, path]);

  return null;
}
