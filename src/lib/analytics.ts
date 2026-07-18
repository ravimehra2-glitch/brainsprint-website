/**
 * Analytics loader — prepared for GA4 and Microsoft Clarity, not wired to
 * real tracking IDs. Nothing loads unless the corresponding environment
 * variable is set to a real ID.
 *
 * To enable before launch:
 *   1. Copy .env.example to .env
 *   2. Set VITE_GA4_MEASUREMENT_ID to your real GA4 ID (format: G-XXXXXXXXXX)
 *   3. Set VITE_CLARITY_PROJECT_ID to your real Clarity project ID
 *   4. Call initAnalytics() once, e.g. in src/main.tsx after the app mounts
 *
 * No tracking ID has been invented or hardcoded here — both are left
 * undefined until you supply real values via environment variables.
 */

declare global {
  interface Window {
    dataLayer?: unknown[];
    clarity?: (...args: unknown[]) => void;
  }
}

const GA4_ID = import.meta.env.VITE_GA4_MEASUREMENT_ID as string | undefined;
const CLARITY_ID = import.meta.env.VITE_CLARITY_PROJECT_ID as string | undefined;

function loadGA4(id: string) {
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag(...args: unknown[]) {
    window.dataLayer!.push(args);
  }
  gtag("js", new Date());
  gtag("config", id);
}

function loadClarity(id: string) {
  (function (c: Window, l: Document, a: string, r: string, i: string) {
    (c as unknown as Record<string, unknown>)[a] =
      (c as unknown as Record<string, unknown>)[a] ||
      function (...args: unknown[]) {
        ((c as unknown as Record<string, unknown[]>)[a + "q"] =
          (c as unknown as Record<string, unknown[]>)[a + "q"] || []).push(args);
      };
    const t = l.createElement(r) as HTMLScriptElement;
    t.async = true;
    t.src = "https://www.clarity.ms/tag/" + i;
    const y = l.getElementsByTagName(r)[0];
    y.parentNode?.insertBefore(t, y);
  })(window, document, "clarity", "script", id);
}

export function initAnalytics() {
  if (GA4_ID) loadGA4(GA4_ID);
  if (CLARITY_ID) loadClarity(CLARITY_ID);

  if (!GA4_ID && !CLARITY_ID && import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.info(
      "[analytics] No GA4/Clarity IDs set — see src/lib/analytics.ts for setup."
    );
  }
}
