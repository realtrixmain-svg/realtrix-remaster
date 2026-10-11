import React from 'react'
import LegalLayout from './LegalLayout'

const PrivacyPolicy: React.FC = () => (
  <LegalLayout
    title="Privacy Policy"
    description="How we collect, use, protect, and handle your personal data."
    canonical="/legal/privacy"
    lastUpdated="October 11, 2026"
  >
    <h3>1. Information We Collect</h3>
    <p>We collect information you provide directly to us and information collected automatically through your use of our services.</p>
    <h4>Information You Provide</h4>
    <p>When you book a call, fill out a form, or use our services, we collect: your name, email address, company name, job title, phone number, and any other information you choose to provide in communications with us.</p>
    <h4>Information Collected Automatically</h4>
    <p>When you visit our website, we automatically collect certain information including your IP address, browser type, operating system, referring URLs, pages viewed, links clicked, and the time and duration of your visits. With your consent only, we use Google Analytics (cookies) to collect usage information such as pages viewed and approximate location. If you decline, no analytics cookies are set. See our <a href="/legal/cookies">Cookie Policy</a>.</p>
    <h4>Readiness Quiz and Diagnostic</h4>
    <p>If you complete our Cold Email Readiness Quiz, we collect your name, email, company, and your answers. These are sent to our automation provider (Make.com) to generate your report and email it to you, and are used to follow up about our services. The diagnostic pop-up opens an email draft to us and sends nothing until you send it.</p>
    <h4>Information from Third Parties</h4>
    <p>We may receive information about you from third-party sources, including business databases, social media platforms, and data enrichment services. This information is used to supplement the data you provide and improve the accuracy of our outreach.</p>

    <h3>2. How We Use Your Information</h3>
    <p>We use the information we collect to:</p>
    <ul>
      <li>Provide, operate, and maintain our services</li>
      <li>Process your transactions and send related information (confirmations, invoices, reminders)</li>
      <li>Send administrative information (changes to our terms, policies, security alerts)</li>
      <li>Respond to your comments, questions, and customer service requests</li>
      <li>Send you marketing and promotional communications (with your consent where required by law)</li>
      <li>Personalize your experience and deliver content relevant to your interests</li>
      <li>Monitor and analyze trends, usage, and activities in connection with our services</li>
      <li>Detect, investigate, and prevent fraudulent transactions and other illegal activities</li>
      <li>Comply with legal obligations and enforce our terms</li>
    </ul>

    <h3>3. How We Share Your Information</h3>
    <p>We do not sell your personal information. We may share your information in the following circumstances:</p>
    <ul>
      <li><strong>Service Providers:</strong> We share data with third-party vendors who perform services on our behalf (Google Analytics for website analytics, Make.com for form and quiz automation, and email delivery providers), bound by contractual obligations to protect your data.</li>
      <li><strong>Business Transfers:</strong> If we are involved in a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction.</li>
      <li><strong>Legal Requirements:</strong> We may disclose your information if required by law, regulation, or legal process, or if we believe disclosure is necessary to protect our rights, your safety, or the safety of others.</li>
      <li><strong>With Your Consent:</strong> We may share your information for any other purpose with your explicit consent.</li>
    </ul>

    <h3>4. Data Security</h3>
    <p>We implement commercially reasonable technical, administrative, and organizational measures to protect your personal information from unauthorized access, use, disclosure, alteration, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.</p>

    <h3>5. Data Retention</h3>
    <p>We retain your personal information only for as long as necessary to fulfill the purposes for which it was collected, including to satisfy legal, accounting, or reporting requirements. When we no longer need your personal information, we will securely delete or anonymize it.</p>

    <h3>6. Your Rights</h3>
    <p>Depending on your location, you may have the following rights regarding your personal information:</p>
    <ul>
      <li>Access and receive a copy of your personal data</li>
      <li>Correct inaccurate or incomplete personal data</li>
      <li>Request deletion of your personal data</li>
      <li>Object to or restrict the processing of your personal data</li>
      <li>Data portability — receive your data in a structured, machine-readable format</li>
      <li>Withdraw consent at any time (where processing is based on consent)</li>
    </ul>
    <p>To exercise any of these rights, contact us at <a href="mailto:trevor@realtrix.org">trevor@realtrix.org</a>.</p>

    <h3>7. International Data Transfers</h3>
    <p>Your information may be transferred to and processed in countries other than your own. We ensure that such transfers are protected by appropriate safeguards, including Standard Contractual Clauses where required by applicable law.</p>

    <h3>8. Changes to This Policy</h3>
    <p>We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on this page and updating the "Last Updated" date. We encourage you to review this policy periodically.</p>

    <h3>9. Contact Us</h3>
    <p>If you have questions about this Privacy Policy, please contact us at <a href="mailto:trevor@realtrix.org">trevor@realtrix.org</a>.</p>
  </LegalLayout>
)

export default PrivacyPolicy
