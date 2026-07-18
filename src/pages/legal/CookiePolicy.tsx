import React from 'react'
import LegalLayout from './LegalLayout'

const CookiePolicy: React.FC = () => (
  <LegalLayout
    title="Cookie Policy"
    description="What cookies we use, why, and how you can manage your preferences."
    canonical="/legal/cookies"
    lastUpdated="July 1, 2026"
  >
    <h3>1. What Are Cookies</h3>
    <p>Cookies are small text files placed on your device when you visit a website. They are widely used to make websites work efficiently, provide a better user experience, and give website owners information about how their site is used.</p>
    <p>Cookies can be "session cookies" (deleted when you close your browser) or "persistent cookies" (remaining on your device until they expire or are deleted). We use both types across our website.</p>

    <h3>2. How We Use Cookies</h3>
    <p>We use cookies for the following purposes:</p>
    <ul>
      <li><strong>Essential cookies:</strong> Required for the website to function properly. These enable core features like page navigation, form submissions, and access to secure areas. The website cannot function properly without these cookies, and they cannot be disabled.</li>
      <li><strong>Analytics cookies:</strong> Help us understand how visitors interact with our website by collecting and reporting information anonymously. We use this data to improve our website and user experience.</li>
      <li><strong>Preference cookies:</strong> Allow the website to remember choices you make (such as language preferences or region selection) and provide enhanced, personalized features.</li>
      <li><strong>Marketing cookies:</strong> Used to track visitors across websites to display relevant advertisements. These cookies are set by third-party advertising partners and may be used to build a profile of your interests and show relevant ads on other sites.</li>
    </ul>

    <h3>3. Specific Cookies We Use</h3>
    <p>The following table lists the specific cookies used on our website:</p>
    <ul>
      <li><strong>Session ID:</strong> Essential. Maintains your session state across page requests. Expires when you close your browser.</li>
      <li><strong>CSRF Token:</strong> Essential. Protects against cross-site request forgery attacks. Expires when you close your browser.</li>
      <li><strong>Cookie Consent:</strong> Essential. Stores your cookie preference selections. Persistent, expires after 365 days.</li>
      <li><strong>Google Analytics (_ga, _gid):</strong> Analytics. Distinguishes unique users and tracks page views. Expires after 2 years (_ga) and 24 hours (_gid).</li>
      <li><strong>HubSpot (__hs_opt_in):</strong> Marketing. Stores your cookie consent preference for HubSpot tracking. Persistent, expires after 180 days.</li>
    </ul>

    <h3>4. Third-Party Cookies</h3>
    <p>Some cookies are placed by third-party services that appear on our pages. We do not control these third-party cookies. The third parties that may set cookies on our site include:</p>
    <ul>
      <li><strong>Google Analytics:</strong> Provides website analytics. Google's privacy policy: <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">https://policies.google.com/privacy</a></li>
      <li><strong>HubSpot:</strong> Provides marketing automation and CRM functionality. HubSpot's privacy policy: <a href="https://legal.hubspot.com/privacy-policy" target="_blank" rel="noopener noreferrer">https://legal.hubspot.com/privacy-policy</a></li>
      <li><strong>Calendly:</strong> Powers our booking widget. Calendly's privacy policy: <a href="https://calendly.com/privacy" target="_blank" rel="noopener noreferrer">https://calendly.com/privacy</a></li>
    </ul>

    <h3>5. Managing Your Cookie Preferences</h3>
    <p>You can control and manage cookies in several ways:</p>
    <ul>
      <li><strong>Browser settings:</strong> Most browsers allow you to block or delete cookies. Check your browser's help documentation for instructions. Note that blocking essential cookies may impair website functionality.</li>
      <li><strong>Cookie consent banner:</strong> When you first visit our site, you can choose which categories of cookies to accept. You can change these preferences at any time by clicking the "Cookie Settings" link in our website footer.</li>
      <li><strong>Opt-out tools:</strong> You can opt out of Google Analytics by installing the <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">Google Analytics Opt-out Browser Add-on</a>.</li>
      <li><strong>Do Not Track:</strong> Our website honors Do Not Track signals sent by your browser. When we detect a DNT signal, we disable non-essential tracking.</li>
    </ul>

    <h3>6. Impact of Disabling Cookies</h3>
    <p>If you disable or block cookies, some features of our website may not function properly. Specifically:</p>
    <ul>
      <li>Form submissions may not work correctly</li>
      <li>Cookie consent preferences will not be remembered</li>
      <li>Analytics tracking will be disabled, which limits our ability to improve the website</li>
      <li>Marketing cookies will not track your activity, which means fewer relevant advertisements (this may be a benefit for some users)</li>
    </ul>

    <h3>7. Updates to This Policy</h3>
    <p>We may update this Cookie Policy to reflect changes in the cookies we use or for other operational, legal, or regulatory reasons. Please revisit this policy regularly to stay informed about our use of cookies and related technologies.</p>

    <h3>8. Contact</h3>
    <p>For questions about our use of cookies, contact us at <a href="mailto:privacy@realtrix.io">privacy@realtrix.io</a>.</p>
  </LegalLayout>
)

export default CookiePolicy
