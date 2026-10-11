import React from 'react'
import LegalLayout from './LegalLayout'

const CookiePolicy: React.FC = () => (
  <LegalLayout
    title="Cookie Policy"
    description="What cookies we use, why, and how you can manage your preferences."
    canonical="/legal/cookies"
    lastUpdated="October 11, 2026"
  >
    <h3>1. What Are Cookies</h3>
    <p>Cookies are small text files placed on your device when you visit a website. They are widely used to make websites work efficiently, provide a better user experience, and give website owners information about how their site is used.</p>
    <p>Cookies can be "session cookies" (deleted when you close your browser) or "persistent cookies" (remaining on your device until they expire or are deleted). We use both types across our website.</p>

    <h3>2. How We Use Cookies</h3>
    <p>We keep this to the minimum. Our site sets no advertising or marketing cookies. The only cookies come from Google Analytics, and they are set only after you click Accept in the cookie banner. Until then, Google Analytics runs in a restricted mode with analytics storage denied.</p>

    <h3>3. What Is Stored on Your Device</h3>
    <ul>
      <li><strong>Google Analytics (_ga, _ga_L3FSEFCX8C):</strong> Analytics. Distinguishes unique visitors and records page views. Set only after you accept. Persistent, expires after up to 2 years.</li>
      <li><strong>realtrix_consent (local storage):</strong> Essential. Remembers whether you accepted or declined analytics so we do not ask again. Stays until you clear your browser storage.</li>
      <li><strong>realtrix_diagnostic_dismissed (session storage):</strong> Essential. Remembers that you closed the diagnostic pop-up so it does not reappear. Deleted when you close the tab.</li>
    </ul>

    <h3>4. Third Parties</h3>
    <ul>
      <li><strong>Google Analytics (Google LLC):</strong> Website analytics, with analytics storage only if you accept. Google's privacy policy: <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">https://policies.google.com/privacy</a></li>
      <li><strong>Google Fonts:</strong> Our fonts load from Google's servers, which means Google receives your IP address when a page loads. No cookies are set for this.</li>
    </ul>

    <h3>5. Managing Your Cookie Preferences</h3>
    <ul>
      <li><strong>Cookie banner:</strong> Choose Accept or Decline the first time you visit. Change your mind at any time with the "Cookie Settings" link in the website footer.</li>
      <li><strong>Browser settings:</strong> Most browsers let you block or delete cookies and site storage.</li>
      <li><strong>Opt-out tool:</strong> You can also install the <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">Google Analytics Opt-out Browser Add-on</a>.</li>
    </ul>

    <h3>6. If You Decline</h3>
    <p>The website works the same. No Google Analytics cookies are set and your visit is not recorded in our analytics. Your choice is remembered through the realtrix_consent entry described above.</p>

    <h3>7. Updates to This Policy</h3>
    <p>We may update this Cookie Policy to reflect changes in the cookies we use or for other operational, legal, or regulatory reasons. Please revisit this policy regularly to stay informed about our use of cookies and related technologies.</p>

    <h3>8. Contact</h3>
    <p>For questions about our use of cookies, contact us at <a href="mailto:trevor@realtrix.org">trevor@realtrix.org</a>.</p>
  </LegalLayout>
)

export default CookiePolicy
