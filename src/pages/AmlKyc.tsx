import LegalPageLayout from "@/components/LegalPageLayout";

const sections = [
  { id: "overview", title: "1. Overview" },
  { id: "definitions", title: "2. Definitions" },
  { id: "kyc-requirements", title: "3. KYC Requirements" },
  { id: "when-kyc", title: "4. When KYC Is Required" },
  { id: "aml-program", title: "5. AML Program" },
  { id: "prohibited-activities", title: "6. Prohibited Activities" },
  { id: "monitoring", title: "7. Transaction Monitoring" },
  { id: "reporting", title: "8. Reporting Obligations" },
  { id: "data-handling", title: "9. Data Handling & Privacy" },
  { id: "non-compliance", title: "10. Non-Compliance" },
  { id: "updates", title: "11. Policy Updates" },
  { id: "contact", title: "12. Contact" },
];

export default function AmlKyc() {
  return (
    <LegalPageLayout
      title="AML/KYC Policy"
      lastUpdated="February 25, 2026"
      sections={sections}
    >
      <div className="bg-secondary/50 border border-border rounded-md p-4 mb-8">
        <p className="text-sm text-muted-foreground">
          <strong className="text-foreground">Disclaimer:</strong> This is a template for informational purposes and does not constitute legal advice. Consult a qualified attorney for compliance with applicable laws and regulations.
        </p>
      </div>

      <section id="overview">
        <h2 className="text-xl font-semibold mt-10 mb-4">1. Overview</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          FYNX Funded LLC ("Company," "we," "us") is committed to preventing the use of our platform for money laundering, terrorist financing, or any other illicit financial activity. This Anti-Money Laundering (AML) and Know Your Customer (KYC) Policy outlines the procedures we follow to verify user identities and monitor transactions in accordance with applicable laws and industry best practices.
        </p>
      </section>

      <section id="definitions">
        <h2 className="text-xl font-semibold mt-10 mb-4">2. Definitions</h2>
        <ul className="list-disc list-inside text-sm text-muted-foreground space-y-2 leading-relaxed">
          <li><strong className="text-foreground">KYC (Know Your Customer):</strong> The process of verifying the identity of our users to ensure they are who they claim to be.</li>
          <li><strong className="text-foreground">AML (Anti-Money Laundering):</strong> A set of procedures, laws, and regulations designed to prevent the generation of income through illegal actions.</li>
          <li><strong className="text-foreground">PEP (Politically Exposed Person):</strong> An individual who holds or has held a prominent public function.</li>
          <li><strong className="text-foreground">Suspicious Activity:</strong> Any transaction or behavior that appears unusual, lacks economic rationale, or indicates potential money laundering or fraud.</li>
        </ul>
      </section>

      <section id="kyc-requirements">
        <h2 className="text-xl font-semibold mt-10 mb-4">3. KYC Requirements</h2>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
          Users may be required to provide the following documentation as part of our KYC verification process:
        </p>
        <ul className="list-disc list-inside text-sm text-muted-foreground space-y-2 leading-relaxed">
          <li><strong className="text-foreground">Government-Issued Photo ID:</strong> Passport, national identity card, or driver's license.</li>
          <li><strong className="text-foreground">Proof of Address:</strong> Utility bill, bank statement, or government correspondence dated within the last 3 months.</li>
          <li><strong className="text-foreground">Selfie Verification:</strong> A live photo or video for facial comparison with the submitted ID.</li>
          <li><strong className="text-foreground">Source of Funds:</strong> In certain cases, documentation demonstrating the origin of funds used for purchases.</li>
        </ul>
      </section>

      <section id="when-kyc">
        <h2 className="text-xl font-semibold mt-10 mb-4">4. When KYC Is Required</h2>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
          KYC verification may be required at the following stages:
        </p>
        <ul className="list-disc list-inside text-sm text-muted-foreground space-y-2 leading-relaxed">
          <li><strong className="text-foreground">Before Payout Processing:</strong> All users requesting a payout must complete KYC verification before funds are released.</li>
          <li><strong className="text-foreground">Account Registration:</strong> We may request verification during or after account creation at our discretion.</li>
          <li><strong className="text-foreground">Suspicious Activity Detection:</strong> If our monitoring systems flag unusual patterns, we may require additional verification.</li>
          <li><strong className="text-foreground">High-Value Transactions:</strong> Purchases or payouts exceeding certain thresholds may trigger enhanced due diligence.</li>
          <li><strong className="text-foreground">Periodic Re-Verification:</strong> We may periodically request updated documentation to maintain compliance.</li>
        </ul>
      </section>

      <section id="aml-program">
        <h2 className="text-xl font-semibold mt-10 mb-4">5. AML Program</h2>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
          Our AML program includes the following components:
        </p>
        <ul className="list-disc list-inside text-sm text-muted-foreground space-y-2 leading-relaxed">
          <li><strong className="text-foreground">Risk Assessment:</strong> Ongoing evaluation of money laundering and terrorist financing risks associated with our services.</li>
          <li><strong className="text-foreground">Customer Due Diligence (CDD):</strong> Standard verification procedures for all users.</li>
          <li><strong className="text-foreground">Enhanced Due Diligence (EDD):</strong> Additional scrutiny for high-risk users, PEPs, and users from high-risk jurisdictions.</li>
          <li><strong className="text-foreground">Sanctions Screening:</strong> Screening against international sanctions lists (OFAC, EU, UN, and other applicable lists).</li>
          <li><strong className="text-foreground">Staff Training:</strong> Regular training for team members on AML/KYC compliance procedures.</li>
        </ul>
      </section>

      <section id="prohibited-activities">
        <h2 className="text-xl font-semibold mt-10 mb-4">6. Prohibited Activities</h2>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
          The following activities are strictly prohibited on our platform:
        </p>
        <ul className="list-disc list-inside text-sm text-muted-foreground space-y-2 leading-relaxed">
          <li>Using the platform for money laundering or terrorist financing</li>
          <li>Providing false, misleading, or fraudulent identity information</li>
          <li>Using stolen payment methods or third-party accounts without authorization</li>
          <li>Circumventing or attempting to circumvent KYC/AML controls</li>
          <li>Operating accounts on behalf of sanctioned individuals or entities</li>
          <li>Any activity that violates applicable anti-money laundering laws</li>
        </ul>
      </section>

      <section id="monitoring">
        <h2 className="text-xl font-semibold mt-10 mb-4">7. Transaction Monitoring</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          We employ automated and manual monitoring systems to detect suspicious transactions and patterns. This includes monitoring for unusual purchase patterns, rapid account cycling, multiple accounts linked to the same identity or payment method, and transactions that appear to have no legitimate business purpose. We reserve the right to freeze accounts, delay payouts, or terminate services pending investigation.
        </p>
      </section>

      <section id="reporting">
        <h2 className="text-xl font-semibold mt-10 mb-4">8. Reporting Obligations</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Where required by law, we will file Suspicious Activity Reports (SARs) or equivalent reports with the relevant authorities. We are prohibited from disclosing to any user that a report has been filed (tipping off). We cooperate fully with law enforcement and regulatory bodies in the investigation of potential financial crimes.
        </p>
      </section>

      <section id="data-handling">
        <h2 className="text-xl font-semibold mt-10 mb-4">9. Data Handling & Privacy</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          All personal data collected for KYC/AML purposes is handled in accordance with our <a href="/privacy" className="text-foreground underline">Privacy Policy</a>. We retain KYC documentation for the period required by applicable law (typically 5–7 years after the end of the business relationship). Data is stored securely with appropriate encryption and access controls.
        </p>
      </section>

      <section id="non-compliance">
        <h2 className="text-xl font-semibold mt-10 mb-4">10. Non-Compliance</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Failure to provide requested KYC documentation or comply with our AML procedures may result in account suspension, termination of services, forfeiture of pending payouts, and/or reporting to relevant authorities. We reserve the right to refuse service to any individual or entity at our discretion.
        </p>
      </section>

      <section id="updates">
        <h2 className="text-xl font-semibold mt-10 mb-4">11. Policy Updates</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          This AML/KYC Policy may be updated at any time to reflect changes in regulations, industry standards, or our internal procedures. Users will be notified of material changes. Continued use of the platform after changes constitutes acceptance of the updated policy.
        </p>
      </section>

      <section id="contact">
        <h2 className="text-xl font-semibold mt-10 mb-4">12. Contact</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          For questions about our AML/KYC procedures or to submit verification documents, please contact us at{" "}
          <span className="text-foreground font-medium">compliance@fynxfunded.com</span>.
        </p>
      </section>
    </LegalPageLayout>
  );
}
