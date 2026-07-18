import React from 'react'
import LegalLayout from './LegalLayout'

const BillingPolicy: React.FC = () => (
  <LegalLayout
    title="Billing & Refund Policy"
    description="Transparent details on pricing, billing cycles, and refund procedures."
    canonical="/legal/billing"
    lastUpdated="July 1, 2026"
  >
    <h3>1. Pricing Model</h3>
    <p>Realtrix operates on a transparent, two-part pricing model:</p>
    <ul>
      <li><strong>Infrastructure (at cost):</strong> Domains, mailboxes, warm-up, sending platform, sourcing, verification, and AI reply processing — passed through at cost with zero markup. Costs vary by plan (Base or Growth) and are detailed in your service agreement.</li>
      <li><strong>Performance fees (per reply):</strong> You pay a fee only when a qualified human reply lands and is classified by our AI system. Fees vary by reply category: Meeting Request ($100), Interested ($60), Info Request ($40), Contact Later ($30). OOO and Not Interested replies incur no fee.</li>
    </ul>
    <p>No fee is owed for auto-replies, out-of-office messages, bounce-backs, or negative replies. You pay for results, not attempts.</p>

    <h3>2. Billing Cycles</h3>
    <p><strong>Infrastructure costs</strong> are billed monthly in advance on the 1st of each month, covering the upcoming month's infrastructure usage. First month's infrastructure is prorated based on your start date.</p>
    <p><strong>Performance fees</strong> are calculated and billed monthly in arrears on the 15th of each month, covering all qualifying replies received during the previous calendar month. A detailed breakdown of classified replies and associated fees is provided with each invoice.</p>

    <h3>3. Payment Methods and Terms</h3>
    <p>We accept payment via credit card (Visa, Mastercard, American Express) and ACH bank transfer. Payment is due within 15 calendar days of invoice date.</p>
    <p>For credit card payments, you authorize us to charge your card on file for all fees incurred. For ACH payments, you authorize us to initiate debit entries from your designated bank account.</p>

    <h3>4. Late Payments</h3>
    <p>Invoices unpaid after the 15-day payment window incur a late fee of 1.5% per month on the outstanding balance, calculated daily. After 30 days of non-payment, we may suspend your access to the Services until payment is received. After 60 days of non-payment, we may terminate your account.</p>
    <p>Suspended accounts retain access to data and reporting but cannot send new campaigns or receive new replies through our infrastructure.</p>

    <h3>5. Refund Policy</h3>
    <p><strong>Infrastructure fees:</strong> Infrastructure costs are non-refundable once incurred, as they represent third-party costs (domain registration, mailbox provisioning, platform fees) that have already been paid. If you cancel mid-month, you will not be charged for the following month, but the current month's infrastructure fee remains due.</p>
    <p><strong>Performance fees:</strong> Performance fees may be refunded if a classified reply is later determined to be misclassified (e.g., an auto-reply classified as Interested). Refund requests must be submitted within 30 days of the reply date with an explanation of the misclassification. We review all requests within 5 business days.</p>
    <p><strong>No refunds for:</strong> Replies that were correctly classified but did not convert to meetings, campaigns that underperformed expectations, or services already delivered.</p>

    <h3>6. Price Changes</h3>
    <p>We may adjust performance fee rates with 30 days' written notice. Infrastructure costs may fluctuate based on third-party provider pricing, and we will pass through any changes at cost with transparency. We will never markup third-party cost increases.</p>

    <h3>7. Disputed Invoices</h3>
    <p>If you dispute any portion of an invoice, you must notify us in writing within 30 days of the invoice date. Undisputed portions remain due per normal terms. We will work with you in good faith to resolve any disputed amounts. If the dispute cannot be resolved informally, either party may invoke the dispute resolution process outlined in the Terms of Service.</p>

    <h3>8. Taxes</h3>
    <p>All fees are exclusive of applicable taxes. You are responsible for paying any sales tax, VAT, GST, or other taxes imposed by your jurisdiction. If we are required to collect taxes on your behalf, they will be itemized on your invoice.</p>
  </LegalLayout>
)

export default BillingPolicy
