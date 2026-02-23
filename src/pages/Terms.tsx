import LegalPageLayout from "@/components/LegalPageLayout";

const sections = [
  {
    id: "agreement",
    title: "Agreement to Terms",
    content: (
      <>
        <p>By accessing or using the FYNX Funded platform ("Platform"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, you must not access or use the Platform. These Terms constitute a legally binding agreement between you ("User," "you") and FYNX Funded LLC ("Company," "we," "us").</p>
        <p>We reserve the right to modify these Terms at any time. Continued use of the Platform following any changes constitutes acceptance of the revised Terms.</p>
      </>
    ),
  },
  {
    id: "eligibility",
    title: "Eligibility",
    content: (
      <>
        <p>You must be at least 18 years of age (or the age of majority in your jurisdiction) to use the Platform. By registering, you represent that you meet this requirement.</p>
        <p>The Platform may not be available in all jurisdictions. It is your responsibility to ensure that your use of the Platform complies with all applicable laws and regulations in your jurisdiction. We reserve the right to restrict access from certain regions without prior notice.</p>
      </>
    ),
  },
  {
    id: "registration",
    title: "Account Registration & Security",
    content: (
      <>
        <p>To access the Platform, you must create an account with accurate and complete information. You are responsible for maintaining the confidentiality of your login credentials and for all activities under your account.</p>
        <p>You agree to notify us immediately of any unauthorized use. We are not liable for losses arising from unauthorized access to your account where such access was not caused by our negligence.</p>
        <p>Multi-accounting (operating more than one account per person) is strictly prohibited unless explicitly authorized in writing.</p>
      </>
    ),
  },
  {
    id: "services",
    title: "Services Overview",
    content: (
      <>
        <p>FYNX Funded provides evaluation and challenge programs designed to assess trading skill and discipline. Upon successful completion, users may be eligible for funded trading accounts or profit-sharing arrangements as described in the applicable challenge terms.</p>
        <p>Dashboard access, analytics, trade tracking, and educational resources are provided as part of the Platform. Certain features may be simulated or operate in demo environments as applicable.</p>
        <p>The specific terms of each challenge (including account size, targets, drawdown limits, and payout structure) are set forth in the challenge description at the time of purchase.</p>
      </>
    ),
  },
  {
    id: "challenge-rules",
    title: "Challenge Rules & Parameters",
    content: (
      <>
        <p>Each challenge is governed by specific rules including but not limited to:</p>
        <ul className="list-disc list-inside space-y-1 ml-2">
          <li>Maximum daily loss limits</li>
          <li>Maximum overall drawdown limits</li>
          <li>Profit targets for each phase</li>
          <li>Minimum trading day requirements</li>
          <li>Leverage restrictions</li>
          <li>Consistency rules (where applicable)</li>
          <li>Prohibited trading strategies (e.g., latency arbitrage, high-frequency tick scalping, copy trading across multiple accounts for rule circumvention)</li>
        </ul>
        <p>Violating any challenge rule may result in immediate disqualification without refund. The Company reserves the right to modify challenge parameters with reasonable notice.</p>
      </>
    ),
  },
  {
    id: "fees",
    title: "Fees, Billing, and Taxes",
    content: (
      <>
        <p>Challenge fees are displayed at the time of purchase and are charged in the currency indicated. All fees are exclusive of applicable taxes unless stated otherwise.</p>
        <p>You are responsible for all applicable taxes related to your use of the Platform, including any income tax on payouts received. We may be required to collect tax information and report to relevant authorities.</p>
        <p>Payment processing is handled by third-party providers. We do not store full payment card details on our servers.</p>
      </>
    ),
  },
  {
    id: "payouts",
    title: "Payouts",
    content: (
      <>
        <p>Payout eligibility is subject to successful completion of the applicable challenge and compliance with all rules and these Terms. Payouts are processed according to the schedule described in the challenge terms.</p>
        <p>We may require identity verification (KYC) and/or anti-money laundering (AML) documentation before processing any payout. Failure to provide requested documentation may result in delayed or withheld payouts.</p>
        <p>Minimum payout thresholds may apply. Payout methods and processing times are described on the Platform and are subject to change.</p>
      </>
    ),
  },
  {
    id: "acceptable-use",
    title: "Acceptable Use",
    content: (
      <>
        <p>You agree not to:</p>
        <ul className="list-disc list-inside space-y-1 ml-2">
          <li>Use the Platform for any unlawful purpose</li>
          <li>Attempt to exploit, manipulate, or abuse Platform systems or trading infrastructure</li>
          <li>Operate multiple accounts without authorization</li>
          <li>Use automated tools, bots, or scripts not explicitly permitted</li>
          <li>Engage in fraudulent activity, identity misrepresentation, or chargeback abuse</li>
          <li>Share, sell, or transfer your account to third parties</li>
          <li>Use VPNs or similar tools to circumvent geographic restrictions or mask identity for abusive purposes</li>
        </ul>
      </>
    ),
  },
  {
    id: "market-data",
    title: "Market Data & Third-Party Services",
    content: (
      <p>Market data, charting, and execution services may be provided through third-party partners. We make no representations regarding the accuracy, completeness, or timeliness of third-party data. Third-party services are governed by their own terms and privacy policies.</p>
    ),
  },
  {
    id: "no-advice",
    title: "No Investment Advice",
    content: (
      <p>Nothing on this Platform constitutes financial, investment, tax, or legal advice. All content is for informational and educational purposes only. You are solely responsible for your trading decisions. We do not recommend specific trades, strategies, or financial products.</p>
    ),
  },
  {
    id: "risk",
    title: "Risk Acknowledgment",
    content: (
      <>
        <p>Trading financial instruments involves significant risk of loss. You acknowledge that you understand these risks and accept full responsibility for your trading decisions. For a detailed risk overview, please review our <a href="/risk-disclosure" className="text-foreground underline hover:no-underline">Risk Disclosure</a>.</p>
      </>
    ),
  },
  {
    id: "ip",
    title: "Intellectual Property",
    content: (
      <p>All content, branding, software, and materials on the Platform are the intellectual property of FYNX Funded LLC or its licensors. You may not reproduce, distribute, modify, or create derivative works without prior written consent.</p>
    ),
  },
  {
    id: "disclaimers",
    title: "Disclaimers",
    content: (
      <p>The Platform is provided "as is" and "as available" without warranties of any kind, express or implied. We do not guarantee uninterrupted or error-free operation. We disclaim all warranties including merchantability, fitness for a particular purpose, and non-infringement to the fullest extent permitted by law.</p>
    ),
  },
  {
    id: "liability",
    title: "Limitation of Liability",
    content: (
      <p>To the maximum extent permitted by applicable law, FYNX Funded LLC shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits, revenue, data, or goodwill, arising out of or related to your use of the Platform, regardless of the theory of liability.</p>
    ),
  },
  {
    id: "indemnification",
    title: "Indemnification",
    content: (
      <p>You agree to indemnify, defend, and hold harmless FYNX Funded LLC, its officers, directors, employees, and agents from any claims, damages, losses, liabilities, and expenses (including reasonable attorneys' fees) arising out of your use of the Platform, violation of these Terms, or infringement of any third-party rights.</p>
    ),
  },
  {
    id: "termination",
    title: "Termination",
    content: (
      <p>We may suspend or terminate your account at any time for violation of these Terms, suspected fraud, or any other reason at our discretion. Upon termination, your right to access the Platform ceases immediately. Provisions that by their nature should survive termination shall remain in effect.</p>
    ),
  },
  {
    id: "changes",
    title: "Changes to Terms",
    content: (
      <p>We reserve the right to update these Terms at any time. Material changes will be communicated via email or Platform notification. Your continued use after such notice constitutes acceptance. We recommend reviewing these Terms periodically.</p>
    ),
  },
  {
    id: "governing-law",
    title: "Governing Law",
    content: (
      <p>[Placeholder: These Terms shall be governed by and construed in accordance with the laws of [Jurisdiction], without regard to conflict of law principles. Any disputes shall be resolved in the courts of [Jurisdiction].]</p>
    ),
  },
  {
    id: "contact",
    title: "Contact",
    content: (
      <p>For questions about these Terms, please contact us at <span className="text-foreground">support@fynxfunded.com</span>.</p>
    ),
  },
];

export default function Terms() {
  return (
    <LegalPageLayout
      title="Terms of Service"
      lastUpdated="February 2026"
      disclaimer="This is a template for informational purposes and does not constitute legal advice. Consult a qualified attorney before using this document."
      sections={sections}
    />
  );
}
