import LegalPageLayout from "../components/LegalPageLayout";

export default function Privacy() {
  return (
    <LegalPageLayout
      title="Privacy Policy"
      updated="July 2026 · Beta"
      description="How BrainSprint collects, uses, and protects your information."
      path="/privacy"
    >
      <p>
        BrainSprint ("we," "us," "our") operates a cognitive fitness
        platform available through our website and app. This Privacy Policy
        explains what information we collect, how we use it, and the choices
        you have. BrainSprint is currently in beta — this policy will
        continue to be refined as the product evolves, and material changes
        will be communicated before they take effect.
      </p>

      <h2 className="font-display text-xl text-[var(--color-gray-900)]">
        Information we collect
      </h2>
      <p>We collect information in a few ways:</p>
      <ul className="list-disc space-y-2 pl-5">
        <li>
          <strong>Account information</strong> — name, email address, and any
          profile details you choose to provide when you create a
          BrainSprint account.
        </li>
        <li>
          <strong>Training data</strong> — your sprint results, session
          history, and progress trends across the five cognitive pillars,
          used to power your personal dashboard and insights.
        </li>
        <li>
          <strong>Usage analytics</strong> — aggregated, non-identifying data
          about how the website and app are used, to help us understand
          what's working and what isn't.
        </li>
        <li>
          <strong>Device and technical data</strong> — browser type,
          approximate location (city/region level), and device information
          needed to keep the product running smoothly and securely.
        </li>
      </ul>

      <h2 className="font-display text-xl text-[var(--color-gray-900)]">
        Cookies
      </h2>
      <p>
        We use essential cookies to keep you signed in and the site
        functioning, along with limited analytics cookies to understand
        usage patterns. See our{" "}
        <a href="/cookies" className="text-[var(--color-growth)] underline underline-offset-2">
          Cookie Policy
        </a>{" "}
        for full details and how to manage your preferences.
      </p>

      <h2 className="font-display text-xl text-[var(--color-gray-900)]">
        How we use your information
      </h2>
      <ul className="list-disc space-y-2 pl-5">
        <li>To operate, maintain, and improve BrainSprint</li>
        <li>To generate your personal cognitive trends and insights</li>
        <li>To communicate with you about your account or the product</li>
        <li>To maintain the security and integrity of the platform</li>
      </ul>
      <p>
        We do not sell your personal information. Training data is used only
        to power your own dashboard and is not shared with third parties for
        advertising purposes.
      </p>

      <h2 className="font-display text-xl text-[var(--color-gray-900)]">
        Data security
      </h2>
      <p>
        We use industry-standard safeguards — including encryption in
        transit and access controls — to protect your information. No
        method of transmission or storage is completely secure, and we
        continue to invest in strengthening these protections as the
        product matures out of beta.
      </p>

      <h2 className="font-display text-xl text-[var(--color-gray-900)]">
        Your rights
      </h2>
      <p>You can request to:</p>
      <ul className="list-disc space-y-2 pl-5">
        <li>Access the personal information we hold about you.</li>
        <li>Correct inaccurate or outdated information.</li>
        <li>Delete your BrainSprint account and associated personal data.</li>
        <li>Opt out of non-essential analytics and cookies where applicable.</li>
      </ul>

      <h2 className="font-display text-xl text-[var(--color-gray-900)]">
        Contact
      </h2>
      <p>
        Questions about this policy or your data can be sent to{" "}
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
