import LegalPageLayout from "../components/LegalPageLayout";

export default function Cookies() {
  return (
    <LegalPageLayout
      title="Cookie Policy"
      updated="July 2026 · Beta"
      description="How BrainSprint uses cookies and similar technologies, and how to manage them."
      path="/cookies"
    >
      <p>
        This Cookie Policy explains how BrainSprint uses cookies and similar
        technologies on our website and app, and the choices available to
        you.
      </p>

      <h2 className="font-display text-xl text-[var(--color-gray-900)]">
        Essential cookies
      </h2>
      <p>
        These cookies are required for the Service to function — keeping
        you signed in, remembering your session, and maintaining basic
        security. They can't be switched off, since the Service won't work
        properly without them.
      </p>

      <h2 className="font-display text-xl text-[var(--color-gray-900)]">
        Analytics cookies
      </h2>
      <p>
        We use limited analytics cookies to understand, in aggregate, how
        people use BrainSprint — which pages are visited, roughly how long
        sessions take, and where people run into trouble. This helps us
        improve the product without identifying you individually.
      </p>

      <h2 className="font-display text-xl text-[var(--color-gray-900)]">
        Preference cookies
      </h2>
      <p>
        These remember small choices you make on the site — like whether
        you've dismissed a notice — so we don't ask you again unnecessarily.
      </p>

      <h2 className="font-display text-xl text-[var(--color-gray-900)]">
        Managing cookies
      </h2>
      <p>
        Most browsers let you view, delete, or block cookies through their
        settings. Blocking essential cookies may prevent parts of
        BrainSprint from working correctly. Where analytics cookies require
        consent under applicable law, we'll ask before setting them.
      </p>

      <p>
        Questions about this policy can be sent to{" "}
        <a
          href="mailto:privacy@brainsprint.online"
          className="text-[var(--color-growth)] underline underline-offset-2"
        >
          privacy@brainsprint.online
        </a>
        .
      </p>
    </LegalPageLayout>
  );
}
