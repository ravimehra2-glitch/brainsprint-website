import LegalPageLayout from "../components/LegalPageLayout";

export default function Terms() {
  return (
    <LegalPageLayout
      title="Terms & Conditions"
      updated="July 2026 · Beta"
      description="The terms that govern your use of the BrainSprint website and app."
      path="/terms"
    >
      <p>
        These Terms & Conditions ("Terms") govern your use of BrainSprint's
        website and app (together, the "Service"). By creating an account or
        using the Service, you agree to these Terms. BrainSprint is
        currently in beta, and functionality may change as we refine the
        product ahead of general availability.
      </p>

      <p>
        BrainSprint is currently in beta. Features and functionality may
        evolve as we continue improving the experience based on user
        feedback.
      </p>

      <h2 className="font-display text-xl text-[var(--color-gray-900)]">
        1. Acceptance of Terms
      </h2>
      <p>
        By accessing or using BrainSprint, you confirm that you accept these
        Terms and agree to comply with them. If you don't agree, please
        don't use the Service.
      </p>

      <h2 className="font-display text-xl text-[var(--color-gray-900)]">
        2. User Accounts
      </h2>
      <p>
        You're responsible for maintaining the confidentiality of your
        account credentials and for all activity under your account.
        You must provide accurate information when creating an account and
        keep it up to date.
      </p>

      <h2 className="font-display text-xl text-[var(--color-gray-900)]">
        3. Acceptable Use
      </h2>
      <p>You agree not to:</p>
      <ul className="list-disc space-y-2 pl-5">
        <li>Use the Service for any unlawful purpose</li>
        <li>Attempt to reverse-engineer, scrape, or disrupt the Service</li>
        <li>Share your account with others or resell access to it</li>
        <li>Upload harmful code or attempt to compromise platform security</li>
      </ul>

      <h2 className="font-display text-xl text-[var(--color-gray-900)]">
        4. Intellectual Property
      </h2>
      <p>
        BrainSprint, the BrainSprint name, the Cognitive Fitness Framework™,
        and all associated branding, content, and software are the property
        of BrainSprint and its licensors. Nothing in these Terms grants you
        any ownership rights in the Service.
      </p>

      <h2 className="font-display text-xl text-[var(--color-gray-900)]">
        5. Health & Wellness Disclaimer
      </h2>
      <p>
        BrainSprint is a cognitive fitness and wellness product. It is not a
        medical device, diagnostic tool, or treatment for any medical or
        mental health condition, and it does not replace professional
        medical or mental health care. Consult a qualified professional for
        any health concerns.
      </p>

      <h2 className="font-display text-xl text-[var(--color-gray-900)]">
        6. Limitation of Liability
      </h2>
      <p>
        To the fullest extent permitted by law, BrainSprint is not liable
        for any indirect, incidental, or consequential damages arising from
        your use of the Service. The Service is provided "as is" during
        this beta period without warranties of any kind.
      </p>

      <h2 className="font-display text-xl text-[var(--color-gray-900)]">
        7. Service Availability
      </h2>
      <p>
        As a beta product, BrainSprint may experience downtime, changes, or
        interruptions as we continue development. We'll do our best to
        communicate significant changes in advance where possible.
      </p>

      <h2 className="font-display text-xl text-[var(--color-gray-900)]">
        8. Contact
      </h2>
      <p>
        Questions about these Terms can be sent to{" "}
        <a
          href="mailto:legal@brainsprint.online"
          className="text-[var(--color-growth)] underline underline-offset-2"
        >
          legal@brainsprint.online
        </a>
        .
      </p>
    </LegalPageLayout>
  );
}
