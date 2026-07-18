import React from 'react'
import LegalLayout from './LegalLayout'

const AIPolicy: React.FC = () => (
  <LegalLayout
    title="AI Usage & Disclaimer"
    description="How our AI systems work, their limitations, and your responsibilities."
    canonical="/legal/ai-policy"
    lastUpdated="July 1, 2026"
  >
    <h3>1. AI Systems in Our Platform</h3>
    <p>Realtrix uses artificial intelligence across several components of its service:</p>
    <ul>
      <li><strong>Reply Classification:</strong> AI reads and categorizes incoming email replies into actionable categories (Meeting, Interested, Info Request, Not Now, Not Interested). This classification drives routing, billing, and follow-up automation.</li>
      <li><strong>Personalization Assistance:</strong> AI generates contextual first lines and personalization elements for email sequences based on prospect data and enrichment.</li>
      <li><strong>Deliverability Optimization:</strong> AI monitors sending patterns, engagement metrics, and domain health to optimize inbox placement.</li>
      <li><strong>Campaign Optimization:</strong> AI analyzes campaign performance data to recommend targeting, timing, and messaging adjustments.</li>
    </ul>

    <h3>2. How Our AI Works</h3>
    <p>Our AI classification system uses natural language processing to analyze the content, sentiment, and intent of incoming email replies. The system is trained on millions of email interactions and is continuously updated to improve accuracy.</p>
    <p>Personalization AI analyzes publicly available information about prospects — company news, LinkedIn profiles, published content, and technology stack — to generate relevant, contextual opening lines for email sequences.</p>
    <p>Neither system makes autonomous decisions about your campaigns. AI outputs serve as recommendations and classifications that you review and approve. Human oversight is built into every AI-powered workflow.</p>

    <h3>3. AI Limitations and Accuracy</h3>
    <p>While our AI systems achieve high accuracy rates, they are not perfect. Important limitations to understand:</p>
    <ul>
      <li><strong>Reply classification accuracy:</strong> Our AI correctly classifies approximately 90-95% of replies. The remaining 5-10% may require human review. We implement a human-in-the-loop process to catch and correct misclassifications.</li>
      <li><strong>Personalization quality:</strong> AI-generated personalization is based on publicly available data and may not capture nuance, context, or emerging developments. Human review and editing of AI-generated content is strongly recommended before sending.</li>
      <li><strong>Sarcasm and tone:</strong> AI may misinterpret sarcasm, irony, or nuanced tone in email replies. A reply that appears negative may actually be positive, and vice versa. Human review catches these edge cases.</li>
      <li><strong>Multilingual content:</strong> AI performance varies across languages. For campaigns targeting non-English speakers, human review of classification and personalization is essential.</li>
      <li><strong>Evolving language:</strong> New slang, industry jargon, or communication patterns may temporarily reduce classification accuracy until the model is updated.</li>
    </ul>

    <h3>4. Your Responsibilities</h3>
    <p>When using AI-powered features, you are responsible for:</p>
    <ul>
      <li>Reviewing AI-generated personalization before it is sent to prospects</li>
      <li>Verifying reply classifications when making business decisions based on them</li>
      <li>Providing feedback on misclassifications to help improve AI accuracy</li>
      <li>Ensuring that AI-assisted campaigns comply with applicable laws and your own standards</li>
      <li>Not relying solely on AI outputs for critical business decisions without human oversight</li>
    </ul>

    <h3>5. Data Used to Train and Improve AI</h3>
    <p>We use anonymized, aggregated interaction data to improve our AI models. This data is stripped of personally identifiable information and cannot be used to identify individual recipients or senders. You may opt out of having your campaign data used for model training by contacting <a href="mailto:ai@realtrix.io">ai@realtrix.io</a>.</p>
    <p>We do not use your specific campaign data, prospect lists, or email content to train models for other clients. Your data stays yours.</p>

    <h3>6. No Guarantee of Outcomes</h3>
    <p>AI-powered features are tools that enhance your outreach — they do not guarantee specific outcomes. Reply rates, meeting conversion rates, and campaign performance depend on many factors beyond AI, including targeting, messaging quality, market conditions, and timing.</p>
    <p>We do not warrant that AI outputs will be error-free, that campaigns will achieve specific metrics, or that AI classifications will be 100% accurate at all times. Our liability for AI-related outcomes is governed by the Limitation of Liability section in our Terms of Service.</p>

    <h3>7. Updates to AI Systems</h3>
    <p>We continuously improve our AI systems through model updates, training data refreshes, and algorithm improvements. These updates may temporarily affect classification accuracy as the model adjusts. We communicate significant AI updates through release notes and will notify you in advance of changes that may materially affect your campaigns.</p>

    <h3>8. Contact</h3>
    <p>For questions about our AI systems, accuracy concerns, or to report a classification error, contact <a href="mailto:ai@realtrix.io">ai@realtrix.io</a>.</p>
  </LegalLayout>
)

export default AIPolicy
