import LegalPageLayout from "@/components/LegalPageLayout";

const sections = [
  {
    id: "overview",
    title: "Overview",
    content: (
      <p>This Refund Policy outlines the conditions under which refunds may be granted for purchases made on the FYNX Funded platform. By purchasing any challenge or service, you agree to this policy.</p>
    ),
  },
  {
    id: "eligible",
    title: "When Refunds May Be Granted",
    content: (
      <>
        <p>Refunds may be considered in the following circumstances:</p>
        <ul className="list-disc list-inside space-y-1 ml-2">
          <li><strong>Duplicate Charges:</strong> If you were charged more than once for the same purchase due to a payment processing error.</li>
          <li><strong>Platform Fault:</strong> If payment was processed but challenge access was not delivered due to a verified technical failure on our end.</li>
          <li><strong>Within 24 Hours (No Activity):</strong> If you request a refund within 24 hours of purchase and have not started the challenge (no trades placed, no account credentials used).</li>
        </ul>
        <p>All refund requests are reviewed on a case-by-case basis. Meeting the above criteria does not guarantee a refund.</p>
      </>
    ),
  },
  {
    id: "not-eligible",
    title: "When Refunds Are Not Granted",
    content: (
      <>
        <p>Refunds will not be issued in the following situations:</p>
        <ul className="list-disc list-inside space-y-1 ml-2">
          <li><strong>Challenge Started or Used:</strong> Once you have accessed your challenge account, placed any trades, or otherwise used the service.</li>
          <li><strong>Rule Violations:</strong> If your account was terminated due to violation of challenge rules or Terms of Service.</li>
          <li><strong>Failed Evaluation:</strong> Failing to meet challenge targets or performance outcomes is not grounds for a refund.</li>
          <li><strong>Chargeback Abuse:</strong> Filing a chargeback or payment dispute without first contacting our support team. Chargeback abuse may result in permanent account suspension and forfeiture of any pending payouts.</li>
          <li><strong>User Error:</strong> Purchasing the wrong plan or account size is generally not eligible for refund, though support may approve exchanges on a case-by-case basis.</li>
          <li><strong>Change of Mind:</strong> General dissatisfaction or change of mind after purchase is not grounds for refund once the service has been accessed.</li>
        </ul>
      </>
    ),
  },
  {
    id: "how-to-request",
    title: "How to Request a Refund",
    content: (
      <>
        <p>To request a refund, contact our support team with the following information:</p>
        <ul className="list-disc list-inside space-y-1 ml-2">
          <li>Email address associated with your account</li>
          <li>Order ID or transaction reference</li>
          <li>Date of purchase</li>
          <li>Reason for refund request</li>
          <li>Screenshots or documentation (if applicable)</li>
        </ul>
        <p>Contact: <span className="text-foreground">support@fynxfunded.com</span></p>
      </>
    ),
  },
  {
    id: "processing",
    title: "Processing Time",
    content: (
      <>
        <p>Approved refunds are typically processed within 5–10 business days. The refund will be issued to the original payment method used at the time of purchase.</p>
        <p>Processing times may vary depending on your payment provider or financial institution. We are not responsible for delays caused by third-party payment processors.</p>
      </>
    ),
  },
  {
    id: "changes",
    title: "Changes to This Policy",
    content: (
      <p>We reserve the right to modify this Refund Policy at any time. Changes will be posted on this page with an updated "Last updated" date. Continued use of the Platform after changes constitutes acceptance of the revised policy.</p>
    ),
  },
  {
    id: "contact",
    title: "Contact",
    content: (
      <p>For refund inquiries, please contact <span className="text-foreground">support@fynxfunded.com</span>.</p>
    ),
  },
];

export default function RefundPolicy() {
  return (
    <LegalPageLayout
      title="Refund Policy"
      lastUpdated="February 2026"
      sections={sections}
    />
  );
}
