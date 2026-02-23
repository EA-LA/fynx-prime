import LegalPageLayout from "@/components/LegalPageLayout";

const sections = [
  {
    id: "what-we-collect",
    title: "What We Collect",
    content: (
      <>
        <p>We collect the following types of information:</p>
        <ul className="list-disc list-inside space-y-1 ml-2">
          <li><strong>Account Information:</strong> Name, email address, country of residence, and any identity documents provided for verification.</li>
          <li><strong>Usage Data:</strong> Pages visited, features used, trading activity, timestamps, and interaction patterns.</li>
          <li><strong>Device Information:</strong> Browser type, operating system, IP address, device identifiers, and screen resolution.</li>
          <li><strong>Cookies & Similar Technologies:</strong> We use cookies and local storage to remember preferences, sessions, and analytics.</li>
        </ul>
      </>
    ),
  },
  {
    id: "how-we-use",
    title: "How We Use Your Data",
    content: (
      <ul className="list-disc list-inside space-y-1 ml-2">
        <li>Provide, maintain, and improve our services</li>
        <li>Process transactions and manage your account</li>
        <li>Communicate with you (service updates, support responses, promotional materials with your consent)</li>
        <li>Ensure platform security and prevent fraud</li>
        <li>Analyze usage to improve user experience</li>
        <li>Comply with legal obligations</li>
      </ul>
    ),
  },
  {
    id: "cookies",
    title: "Cookies & Tracking",
    content: (
      <>
        <p>We use cookies for:</p>
        <ul className="list-disc list-inside space-y-1 ml-2">
          <li><strong>Essential Cookies:</strong> Required for authentication and basic functionality.</li>
          <li><strong>Preference Cookies:</strong> Remember your settings such as language and theme.</li>
          <li><strong>Analytics Cookies:</strong> Help us understand how the Platform is used (e.g., page views, popular features).</li>
        </ul>
        <p>You can control cookies through your browser settings. Disabling essential cookies may affect Platform functionality.</p>
      </>
    ),
  },
  {
    id: "sharing",
    title: "How We Share Data",
    content: (
      <>
        <p>We do not sell your personal data. We may share information with:</p>
        <ul className="list-disc list-inside space-y-1 ml-2">
          <li><strong>Service Providers:</strong> Payment processors, hosting providers, analytics services, and customer support tools that help us operate the Platform.</li>
          <li><strong>Legal Requirements:</strong> When required by law, court order, or governmental request.</li>
          <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets, your data may be transferred.</li>
        </ul>
      </>
    ),
  },
  {
    id: "retention",
    title: "Data Retention",
    content: (
      <p>We retain your personal data for as long as your account is active or as needed to provide services. We may retain certain information after account closure for legal, accounting, or fraud prevention purposes. Usage data and analytics may be retained in anonymized form indefinitely.</p>
    ),
  },
  {
    id: "security",
    title: "Security",
    content: (
      <p>We implement industry-standard security measures to protect your data, including encryption in transit and at rest, access controls, and regular security audits. However, no method of electronic storage or transmission is 100% secure. We cannot guarantee absolute security.</p>
    ),
  },
  {
    id: "international",
    title: "International Users",
    content: (
      <p>If you access the Platform from outside the jurisdiction where our servers are located, your data may be transferred internationally. By using the Platform, you consent to such transfers. We take steps to ensure adequate data protection regardless of where data is processed.</p>
    ),
  },
  {
    id: "your-rights",
    title: "Your Rights",
    content: (
      <>
        <p>Depending on your jurisdiction, you may have the right to:</p>
        <ul className="list-disc list-inside space-y-1 ml-2">
          <li>Access the personal data we hold about you</li>
          <li>Request correction of inaccurate data</li>
          <li>Request deletion of your data (subject to legal retention requirements)</li>
          <li>Opt out of marketing communications</li>
          <li>Request data portability</li>
          <li>Withdraw consent where processing is based on consent</li>
        </ul>
        <p>To exercise these rights, contact us at <span className="text-foreground">support@fynxfunded.com</span>.</p>
      </>
    ),
  },
  {
    id: "children",
    title: "Children",
    content: (
      <p>The Platform is not directed at individuals under 18 years of age. We do not knowingly collect personal data from children. If we become aware that a child has provided us with personal data, we will take steps to delete such information.</p>
    ),
  },
  {
    id: "contact",
    title: "Contact",
    content: (
      <p>For privacy-related inquiries, please contact us at <span className="text-foreground">support@fynxfunded.com</span>.</p>
    ),
  },
];

export default function Privacy() {
  return (
    <LegalPageLayout
      title="Privacy Policy"
      lastUpdated="February 2026"
      sections={sections}
    />
  );
}
