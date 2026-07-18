import { Link } from "react-router-dom";

const columns = [
  {
    heading: "Product",
    links: [
      { label: "The Framework", href: "/#pillars" },
      { label: "Dashboard", href: "/#dashboard" },
      { label: "FAQ", href: "/#faq" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms & Conditions", href: "/terms" },
      { label: "Cookie Policy", href: "/cookies" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-[var(--color-ink-soft)] px-6 py-16 text-white/60">
      <div className="mx-auto max-w-[1440px]">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <p className="font-display text-xl text-white">BrainSprint</p>
            <p className="mt-3 max-w-xs text-sm">
              A daily cognitive fitness platform, helping people train focus,
              memory, and mental sharpness — ten minutes at a time.
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.heading}>
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-white/40">
                {col.heading}
              </p>
              <ul className="mt-4 space-y-3">
                {col.links.map((l) =>
                  l.href.startsWith("/#") || l.href.startsWith("mailto:") ? (
                    <li key={l.label}>
                      <a href={l.href} className="text-sm transition-colors hover:text-white">
                        {l.label}
                      </a>
                    </li>
                  ) : (
                    <li key={l.label}>
                      <Link to={l.href} className="text-sm transition-colors hover:text-white">
                        {l.label}
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 border-t border-white/10 pt-8 text-xs leading-relaxed text-white/35">
          <p>
            BrainSprint is a cognitive fitness platform intended for general
            wellness and self-directed practice. It is not a medical device,
            diagnostic tool, or treatment for any condition, and does not
            replace professional medical or mental health care.
          </p>
          <p className="mt-3">© {new Date().getFullYear()} BrainSprint. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
