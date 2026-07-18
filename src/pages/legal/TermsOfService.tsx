import React from 'react'
import LegalLayout from './LegalLayout'

const TermsOfService: React.FC = () => (
  <LegalLayout
    title="Terms of Service"
    description="The agreement governing your use of Realtrix services and platform."
    canonical="/legal/terms"
    lastUpdated="July 1, 2026"
  >
    <h3>1. Acceptance of Terms</h3>
    <p>By accessing or using Realtrix services ("Services"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, do not use our Services. These Terms constitute a legally binding agreement between you ("Client," "you," or "your") and Realtrix, Inc. ("Realtrix," "we," "us," or "our").</p>
    <p>We reserve the right to modify these Terms at any time. Material changes will be communicated via email or through the Services. Continued use of the Services after changes take effect constitutes acceptance of the revised Terms.</p>

    <h3>2. Description of Services</h3>
    <p>Realtrix provides managed cold email outreach services including but not limited to: email infrastructure management (domains, mailboxes, warm-up), contact sourcing and verification, email sequence creation and management, AI-powered reply classification, and CRM/inbox integration. The specific scope of services is defined in your service agreement.</p>
    <p>Realtrix operates on a cost-plus-performance model: clients pay infrastructure costs at cost with no markup, plus a performance fee for qualified replies. Pricing details are provided in your service agreement and are subject to change with 30 days' notice.</p>

    <h3>3. Client Responsibilities</h3>
    <p>You are responsible for:</p>
    <ul>
      <li>Providing accurate and complete information about your business, target audience, and ideal customer profile</li>
      <li>Reviewing and approving campaign targeting, messaging, and sequence content before launch</li>
      <li>Responding to qualified replies within a reasonable timeframe to maintain meeting conversion rates</li>
      <li>Ensuring your use of the Services complies with all applicable laws and regulations, including CAN-SPAM, GDPR, and CCPA</li>
      <li>Maintaining the confidentiality of your account credentials and access information</li>
    </ul>

    <h3>4. Acceptable Use</h3>
    <p>You agree not to use the Services to:</p>
    <ul>
      <li>Send emails that violate CAN-SPAM, GDPR, or any other applicable anti-spam or data protection laws</li>
      <li>Target individuals who have explicitly opted out of receiving communications from you</li>
      <li>Send content that is defamatory, harassing, threatening, or otherwise objectionable</li>
      <li>Impersonate any person or entity, or falsely represent your affiliation with any person or entity</li>
      <li>Interfere with or disrupt the Services or servers connected to the Services</li>
      <li>Attempt to gain unauthorized access to any portion of the Services or related systems</li>
    </ul>
    <p>Violation of these acceptable use provisions may result in immediate suspension or termination of your access to the Services.</p>

    <h3>5. Payment Terms</h3>
    <p>Infrastructure costs are billed monthly in advance. Performance fees are billed monthly in arrears based on qualified replies received during the billing period. Payment is due within 15 days of invoice date. Late payments may incur a 1.5% monthly interest charge.</p>
    <p>All fees are exclusive of taxes, which you are responsible for paying as required by law. We reserve the right to suspend services if payment is overdue by more than 30 days.</p>

    <h3>6. Intellectual Property</h3>
    <p>All content created by Realtrix specifically for your campaigns (email copy, sequences, targeting strategies) is licensed to you for use in connection with the Services. Realtrix retains ownership of all tools, methodologies, AI models, and platform technology used to deliver the Services.</p>
    <p>You retain ownership of your brand, trademarks, and any proprietary business information you provide to us. We will not use your brand or proprietary information for any purpose other than delivering the Services.</p>

    <h3>7. Limitation of Liability</h3>
    <p>To the maximum extent permitted by law, Realtrix shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses resulting from your use of the Services.</p>
    <p>Our total aggregate liability for any claims arising from or related to the Services shall not exceed the total fees paid by you to Realtrix in the twelve (12) months preceding the claim.</p>

    <h3>8. Termination</h3>
    <p>Either party may terminate this agreement with 30 days' written notice. Realtrix may terminate immediately if you breach these Terms, fail to make payment, or engage in activities that harm our reputation or infrastructure. Upon termination, we will provide reasonable cooperation in transitioning your data and campaigns.</p>

    <h3>9. Governing Law</h3>
    <p>These Terms are governed by the laws of the State of Delaware, United States, without regard to conflict of law principles. Any disputes arising under these Terms shall be resolved in the courts of Delaware.</p>
  </LegalLayout>
)

export default TermsOfService
