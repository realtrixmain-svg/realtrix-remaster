import React from 'react'
import LegalLayout from './LegalLayout'

const AcceptableUsePolicy: React.FC = () => (
  <LegalLayout
    title="Acceptable Use Policy"
    description="What you can and cannot do with our platform and infrastructure."
    canonical="/legal/aup"
    lastUpdated="July 1, 2026"
  >
    <h3>1. Purpose</h3>
    <p>This Acceptable Use Policy ("AUP") defines the acceptable use of Realtrix's cold email infrastructure, sending platforms, and related services. By using our services, you agree to comply with this policy. Violations may result in suspension or termination of your access.</p>
    <p>This policy exists to protect all users of our infrastructure and to ensure compliance with applicable laws. Our infrastructure reputation affects every client — so enforcement is strict and consistent.</p>

    <h3>2. Prohibited Content</h3>
    <p>You may not send emails containing:</p>
    <ul>
      <li>Content that is false, misleading, or deceptive</li>
      <li>Content that is defamatory, abusive, harassing, or threatening</li>
      <li>Pornographic, sexually explicit, or graphically violent content</li>
      <li>Content that promotes discrimination based on race, religion, gender, national origin, disability, or any other protected characteristic</li>
      <li>Content that violates the intellectual property rights of others</li>
      <li>Content that promotes illegal activities or substances</li>
      <li>Malware, viruses, or other malicious code</li>
    </ul>

    <h3>3. Prohibited Practices</h3>
    <p>You may not:</p>
    <ul>
      <li><strong>Purchase or use purchased email lists:</strong> All contacts must be sourced through compliant methods with legitimate business interest</li>
      <li><strong>Send to individuals who have opted out:</strong> Any person who has unsubscribed or requested removal must be immediately suppressed</li>
      <li><strong>Use misleading sender identities:</strong> From names, email addresses, and domains must accurately represent your business</li>
      <li><strong>Send without proper unsubscribe mechanisms:</strong> Every email must include a clear, functional way to opt out</li>
      <li><strong>Rotate domains to evade spam complaints:</strong> Domain rotation for legitimate deliverability is fine; rotating to escape complaints is prohibited</li>
      <li><strong>Send to role-based addresses at scale:</strong> Addresses like info@, admin@, support@ are not appropriate targets for cold outreach</li>
      <li><strong>Use our infrastructure for non-email purposes:</strong> Our domains and mailboxes are for email sending only</li>
      <li><strong>Attempt to manipulate engagement metrics:</strong> Opening your own emails, using bots, or any other form of engagement manipulation is prohibited</li>
    </ul>

    <h3>4. Compliance Requirements</h3>
    <p>All campaigns must comply with applicable laws including but not limited to:</p>
    <ul>
      <li><strong>CAN-SPAM Act (US):</strong> Include valid physical address, clear identification as an ad, functional unsubscribe mechanism, and honor opt-out requests within 10 business days</li>
      <li><strong>GDPR (EU/EEA):</strong> For recipients in the EU/EEA, ensure a lawful basis for processing (legitimate interest), provide clear privacy information, and honor data subject rights</li>
      <li><strong>CCPA (California):</strong> Provide notice of collection, honor opt-out requests, and do not sell personal information</li>
      <li><strong>CASL (Canada):</strong> Obtain express consent before sending commercial electronic messages to Canadian recipients</li>
    </ul>
    <p>Realtrix provides guidance on compliance, but ultimate responsibility for legal compliance rests with you as the sender.</p>

    <h3>5. Volume and Sending Limits</h3>
    <p>Your daily sending volume is defined in your service agreement and is calibrated for your infrastructure size. Exceeding your allocated volume without approval may trigger automatic throttling and could result in service suspension. Volume adjustments must be requested through your account manager and are subject to infrastructure capacity and warm-up requirements.</p>

    <h3>6. Monitoring and Enforcement</h3>
    <p>Realtrix monitors campaign metrics for compliance with this policy. We may:</p>
    <ul>
      <li>Flag campaigns with abnormally high spam complaint rates (exceeding 0.1%)</li>
      <li>Pause sending if bounce rates exceed 3%</li>
      <li>Investigate reports of policy violations from recipients or email providers</li>
      <li>Require campaign modifications if metrics indicate potential policy violations</li>
    </ul>
    <p>Violations result in a warning for first offenses, temporary suspension for repeated violations, and permanent termination for severe or persistent violations. We may bypass the warning stage for severe violations such as sending prohibited content or deliberately evading spam controls.</p>

    <h3>7. Reporting Violations</h3>
    <p>If you become aware of any violation of this policy, report it to <a href="mailto:abuse@realtrix.io">abuse@realtrix.io</a>. All reports are investigated promptly and confidentially.</p>
  </LegalLayout>
)

export default AcceptableUsePolicy
