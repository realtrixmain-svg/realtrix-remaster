import React, { useState, useEffect, useRef } from 'react'
import { ChevronRight, CheckCircle, ArrowRight, BarChart3, Target, Zap, ShieldAlert, BookOpen, Loader2, TrendingUp, Rocket, Search, Download, Mail } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import SEO from '../components/SEO'

interface QuestionOption {
    label: string
    value: string
    tags: string[]
    score: number
    budgetVal?: number
}

interface Question {
    id: string
    text: string
    subtext?: string
    options: QuestionOption[]
}

const ReadinessQuiz: React.FC = () => {
    const navigate = useNavigate()
    const [step, setStep] = useState(0)
    const [tags, setTags] = useState<Set<string>>(new Set())
    const [score, setScore] = useState(0)
    const [budgetScore, setBudgetScore] = useState(0)
    const [answers, setAnswers] = useState<Record<string, string>>({})
    const [analysisProgress, setAnalysisProgress] = useState(0)
    const [isDownloading, setIsDownloading] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const reportRef = useRef<HTMLDivElement>(null)

    const [name, setName] = useState('')
    const [company, setCompany] = useState('')
    const [email, setEmail] = useState('')
    const [submitting, setSubmitting] = useState(false)
    const [agreed, setAgreed] = useState(false)

    useEffect(() => {
        document.title = 'System Readiness Quiz | Realtrix'
    }, [])

    const questions: Question[] = [
        { id: 'role', text: 'What is your primary role?', options: [
            { label: 'Founder / CEO', value: 'founder', tags: ['decision_maker'], score: 5, budgetVal: 10 },
            { label: 'Co-Founder', value: 'co-founder', tags: ['decision_maker'], score: 5, budgetVal: 10 },
            { label: 'Chief Revenue Officer (CRO)', value: 'cro', tags: ['decision_maker', 'scale_focus'], score: 5, budgetVal: 10 },
            { label: 'VP of Sales / Marketing', value: 'vp_sales', tags: ['decision_maker', 'scale_focus'], score: 5, budgetVal: 10 },
            { label: 'Sales Director / Manager', value: 'sales_manager', tags: ['scale_focus'], score: 4, budgetVal: 8 },
            { label: 'Account Executive (AE)', value: 'ae', tags: ['execution_focus'], score: 2, budgetVal: 5 },
            { label: 'SDR / BDR', value: 'sdr', tags: ['execution_focus'], score: 3, budgetVal: 4 },
            { label: 'Agency Owner', value: 'agency_owner', tags: ['agency'], score: 4, budgetVal: 8 },
            { label: 'Consultant / Advisor', value: 'consultant', tags: ['consultant'], score: 3, budgetVal: 5 },
            { label: 'Marketing Manager', value: 'marketing_manager', tags: ['marketing'], score: 3, budgetVal: 5 },
            { label: 'Other', value: 'other', tags: [], score: 2, budgetVal: 5 },
        ] },
        { id: 'business_type', text: 'What is your primary business model?', options: [
            { label: 'B2B SaaS / Software', value: 'saas', tags: ['saas_model'], score: 8, budgetVal: 10 },
            { label: 'Marketing / Lead Gen Agency', value: 'agency', tags: ['service_business'], score: 6, budgetVal: 8 },
            { label: 'Consulting / Professional Services', value: 'consulting', tags: ['service_business'], score: 5, budgetVal: 8 },
            { label: 'Real Estate / Financial Services', value: 'finance_re', tags: ['high_ticket_service'], score: 7, budgetVal: 15 },
            { label: 'E-commerce / D2C', value: 'ecom', tags: ['b2c_model'], score: 2, budgetVal: 5 },
            { label: 'Other B2B Service', value: 'other_b2b', tags: ['b2b_general'], score: 5, budgetVal: 5 },
        ] },
        { id: 'model', text: 'Who is your ideal target audience?', options: [
            { label: 'High-Ticket B2B (>$5k)', value: 'b2b_high', tags: ['perfect_fit', 'high_ticket'], score: 10, budgetVal: 15 },
            { label: 'Mid-Market B2B ($1k-$5k)', value: 'b2b_mid', tags: ['good_fit'], score: 8, budgetVal: 12 },
            { label: 'SMB B2B (<$1k)', value: 'b2b_low', tags: ['volume_needed'], score: 5, budgetVal: 8 },
            { label: 'B2C / E-commerce', value: 'b2c', tags: ['b2c_model'], score: 3, budgetVal: 5 },
        ] },
        { id: 'revenue', text: 'Current Monthly Recurring Revenue (MRR)?', options: [
            { label: 'Pre-revenue / Early Stage', value: '0', tags: ['early_stage'], score: 3, budgetVal: 5 },
            { label: '$5k - $20k', value: '10000', tags: ['growing'], score: 5, budgetVal: 15 },
            { label: '$20k - $100k', value: '50000', tags: ['scaling'], score: 8, budgetVal: 25 },
            { label: '$100k+', value: '150000', tags: ['enterprise'], score: 10, budgetVal: 40 },
        ] },
        { id: 'deal_value', text: 'What is your average Customer LTV?', subtext: 'Used to calculate your potential ROI from outbound.', options: [
            { label: 'Under $1,000', value: '500', tags: ['low_acv'], score: 1, budgetVal: 0 },
            { label: '$1k - $10k', value: '5000', tags: ['mid_acv'], score: 5, budgetVal: 10 },
            { label: '$10k - $50k', value: '25000', tags: ['high_acv'], score: 8, budgetVal: 20 },
            { label: '$50k+', value: '75000', tags: ['enterprise_acv'], score: 10, budgetVal: 30 },
        ] },
        { id: 'marketing_budget', text: 'Current monthly budget for new lead generation?', options: [
            { label: 'Less than $500', value: 'low', tags: ['budget_constrained'], score: 0, budgetVal: 0 },
            { label: '$500 - $1,500', value: 'mid', tags: ['budget_ready'], score: 5, budgetVal: 40 },
            { label: '$1,500 - $5,000', value: 'high', tags: ['budget_healthy'], score: 10, budgetVal: 60 },
            { label: '$5,000+', value: 'enterprise', tags: ['budget_premium'], score: 15, budgetVal: 80 },
        ] },
        { id: 'lead_goal', text: 'How many qualified meetings do you want per month?', options: [
            { label: '1 - 5 Meetings', value: '3', tags: ['low_vol'], score: 2, budgetVal: 5 },
            { label: '5 - 15 Meetings', value: '10', tags: ['mid_vol'], score: 6, budgetVal: 15 },
            { label: '15 - 30 Meetings', value: '22', tags: ['high_vol'], score: 8, budgetVal: 25 },
            { label: '30+ Meetings', value: '50', tags: ['hyper_scale'], score: 10, budgetVal: 40 },
        ] },
        { id: 'bottleneck', text: 'What is your biggest sales bottleneck today?', options: [
            { label: 'Not enough leads/meetings', value: 'leads', tags: ['pain_volume'], score: 5, budgetVal: 10 },
            { label: 'Leads are poor quality', value: 'quality', tags: ['pain_quality'], score: 6, budgetVal: 10 },
            { label: 'Technical setup is broken', value: 'tech', tags: ['pain_deliverability'], score: 8, budgetVal: 15 },
            { label: 'No time to manage outreach', value: 'time', tags: ['pain_time'], score: 7, budgetVal: 20 },
        ] },
        { id: 'team_size', text: 'How many people are on your sales/growth team?', options: [
            { label: 'Just me (Founder)', value: '1', tags: ['solo'], score: 3, budgetVal: 5 },
            { label: '2 - 5 people', value: '3', tags: ['small_team'], score: 7, budgetVal: 15 },
            { label: '5 - 15 people', value: '10', tags: ['mid_team'], score: 9, budgetVal: 30 },
            { label: '15+ people', value: '20', tags: ['large_team'], score: 10, budgetVal: 50 },
        ] },
        { id: 'crm', text: 'Are you currently using a CRM?', options: [
            { label: 'Yes, an enterprise-grade CRM', value: 'pro', tags: ['tech_ready'], score: 8, budgetVal: 15 },
            { label: 'Yes, a smaller CRM', value: 'other', tags: ['tools_ready'], score: 6, budgetVal: 10 },
            { label: 'Spreadsheets / Manual', value: 'manual', tags: ['needs_infra'], score: 4, budgetVal: 6 },
            { label: 'Not yet', value: 'none', tags: ['needs_infra'], score: 2, budgetVal: 3 },
        ] },
        { id: 'previous_outbound', text: 'Have you tried cold email/outbound before?', options: [
            { label: 'Yes, currently doing it', value: 'yes_active', tags: ['experienced'], score: 8, budgetVal: 15 },
            { label: "Yes, but it didn't work", value: 'yes_failed', tags: ['burnt'], score: 6, budgetVal: 10 },
            { label: 'No, never tried', value: 'no', tags: ['newbie'], score: 4, budgetVal: 5 },
            { label: 'Thinking about it', value: 'pondering', tags: ['high_intent'], score: 3, budgetVal: 5 },
        ] },
        { id: 'proven_offer', text: 'Do you have a proven offer that people pay for?', options: [
            { label: 'Yes, we have many happy clients', value: 'proven', tags: ['product_market_fit'], score: 10, budgetVal: 20 },
            { label: 'We have some validation', value: 'some', tags: ['early_traction'], score: 6, budgetVal: 10 },
            { label: 'No, still refining the offer', value: 'refining', tags: ['no_pmf'], score: -5, budgetVal: 0 },
        ] },
        { id: 'case_studies', text: 'Do you have case studies or testimonials?', options: [
            { label: 'Yes, high-quality results', value: 'strong', tags: ['social_proof'], score: 8, budgetVal: 10 },
            { label: 'We have a few names', value: 'basic', tags: ['limited_proof'], score: 4, budgetVal: 5 },
            { label: 'None yet', value: 'none', tags: ['no_proof'], score: 0, budgetVal: 0 },
        ] },
        { id: 'infrastructure', text: 'How many sending domains do you currently own?', options: [
            { label: '0 domains', value: '0', tags: ['fresh_start'], score: 0, budgetVal: 0 },
            { label: '1 - 3 domains', value: 'low', tags: ['needs_migration'], score: 3, budgetVal: 5 },
            { label: '4 - 10 domains', value: 'mid', tags: ['scaling_infra'], score: 7, budgetVal: 15 },
            { label: '10+ domains', value: 'high', tags: ['advanced_infra'], score: 10, budgetVal: 25 },
        ] },
        { id: 'comfort_level', text: 'How comfortable are you with a $850/mo managed service?', subtext: 'For a fully handled, white-glove outbound engine.', options: [
            { label: 'Very comfortable (Looking for ROI)', value: 'yes', tags: ['premium_fit'], score: 15, budgetVal: 100 },
            { label: 'Open to it (If results are clear)', value: 'maybe', tags: ['mid_intent'], score: 10, budgetVal: 60 },
            { label: 'Prefer to DIY for <$300/mo', value: 'diy', tags: ['diy_focus'], score: 0, budgetVal: 10 },
            { label: 'Too expensive right now', value: 'no', tags: ['low_budget'], score: -10, budgetVal: 0 },
        ] },
        { id: 'sales_cycle', text: 'What is your average sales cycle length?', options: [
            { label: 'Under 1 month', value: 'fast', tags: ['fast_revenue'], score: 8, budgetVal: 10 },
            { label: '1 - 3 months', value: 'normal', tags: ['standard_cycle'], score: 6, budgetVal: 10 },
            { label: '3 - 6 months', value: 'long', tags: ['long_cycle'], score: 4, budgetVal: 5 },
            { label: '6+ months / Enterprise', value: 'enterprise', tags: ['enterprise_cycle'], score: 3, budgetVal: 5 },
        ] },
        { id: 'decision_speed', text: 'How soon do you want to launch your next campaign?', options: [
            { label: 'Within 7 days', value: 'immediate', tags: ['high_urgency'], score: 10, budgetVal: 20 },
            { label: 'Next 30 days', value: 'soon', tags: ['normal_urgency'], score: 7, budgetVal: 10 },
            { label: 'Just researching for now', value: 'research', tags: ['low_urgency'], score: 2, budgetVal: 5 },
        ] },
        { id: 'technical_skill', text: "Your team's technical comfort with sales tools?", options: [
            { label: 'Very high (we love APIs & custom enrichment)', value: 'expert', tags: ['tech_savvy'], score: 10, budgetVal: 10 },
            { label: 'Average (We use standard CRM)', value: 'mid', tags: ['standard_tech'], score: 6, budgetVal: 5 },
            { label: 'Low (We want it done for us)', value: 'low', tags: ['dfy_focus'], score: 8, budgetVal: 20 },
        ] },
        { id: 'lead_source', text: 'How do you currently find your lead data?', options: [
            { label: 'Standard data providers', value: 'apollo', tags: ['standard_data'], score: 5, budgetVal: 5 },
            { label: 'Custom enrichment pipeline', value: 'clay', tags: ['pro_data'], score: 10, budgetVal: 15 },
            { label: 'Freelance / purchased lists', value: 'fiverr', tags: ['bad_data'], score: -5, budgetVal: 0 },
            { label: 'Inbound only', value: 'inbound', tags: ['fresh_outbound'], score: 4, budgetVal: 5 },
        ] },
        { id: 'scaling_readiness', text: 'If you got 20 extra meetings next week, could you handle it?', options: [
            { label: 'Yes, ready to rock', value: 'ready', tags: ['capacity_high'], score: 10, budgetVal: 10 },
            { label: 'Yes, but it would be tight', value: 'tight', tags: ['capacity_mid'], score: 7, budgetVal: 5 },
            { label: "No, we'd need to hire/scale", value: 'no', tags: ['capacity_constraint'], score: 3, budgetVal: 0 },
        ] },
        { id: 'primary_goal', text: 'Final goal for your outbound engine?', options: [
            { label: 'Consistent pipeline growth', value: 'pipeline', tags: ['sustainable'], score: 8, budgetVal: 10 },
            { label: 'Aggressive revenue expansion', value: 'revenue', tags: ['aggressive'], score: 10, budgetVal: 20 },
            { label: 'Test new market segments', value: 'test', tags: ['experimental'], score: 6, budgetVal: 10 },
            { label: 'Replace manual ocean-boiling', value: 'replace', tags: ['efficiency'], score: 7, budgetVal: 15 },
        ] },
    ]

    const handleAnswer = (option: QuestionOption, qId: string) => {
        const newTags = new Set(tags)
        option.tags.forEach((t) => newTags.add(t))
        setTags(newTags)
        setScore((prev) => prev + option.score)
        setBudgetScore((prev) => prev + (option.budgetVal || 0))
        setAnswers((prev) => ({ ...prev, [qId]: option.value }))

        if (step < questions.length) {
            setStep((prev) => prev + 1)
        } else {
            setStep(99)
            let progress = 0
            const interval = setInterval(() => {
                progress += Math.random() * 15
                if (progress >= 100) {
                    progress = 100
                    clearInterval(interval)
                    setTimeout(() => {
                        setStep(100)
                    }, 800)
                }
                setAnalysisProgress(progress)
            }, 150)
        }
    }

    const handleDownloadPDF = async () => {
        if (!reportRef.current) return
        setIsDownloading(true)
        try {
            const canvas = await html2canvas(reportRef.current, { scale: 2, backgroundColor: '#0a0a0a', logging: false, useCORS: true })
            const imgData = canvas.toDataURL('image/png')
            const pdf = new jsPDF({ orientation: 'portrait', unit: 'pt', format: [canvas.width, canvas.height] })
            pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height)
            pdf.save('Realtrix_System_Readiness_Report.pdf')
        } catch (error) {
            console.error('Failed to generate PDF', error)
        } finally {
            setIsDownloading(false)
        }
    }

    const handleFreeAuditEmail = () => {
        const dealValue = parseInt(answers['deal_value'] || '0')
        const leadGoal = parseInt(answers['lead_goal'] || '0')
        const annualRevenue = (dealValue * leadGoal * 0.2 * 12).toLocaleString()
        const readinessScore = Math.min(98, Math.max(12, Math.round((score / 150) * 100)))
        const subject = encodeURIComponent('Requesting Free Outbound Audit - Readiness Quiz Results')
        let body = `Hi Trevor,\n\nI just completed the System Readiness Quiz on the Realtrix site and wanted to request a free audit of my outbound systems.\n\nHere are some of my key stats from the quiz:\n`
        body += `- Role: ${answers['role'] || 'N/A'}\n`
        body += `- Business Type: ${answers['business_type'] || 'N/A'}\n`
        body += `- Current MRR: $${answers['revenue'] ? parseInt(answers['revenue']).toLocaleString() : 'N/A'}\n`
        body += `- Avg Deal Value: $${answers['deal_value'] ? parseInt(answers['deal_value']).toLocaleString() : 'N/A'}\n`
        body += `- Biggest Bottleneck: ${answers['bottleneck'] || 'N/A'}\n`
        body += `- Score: ${readinessScore}%\n`
        body += `- Projected Annual Gap: $${annualRevenue}\n\n`
        body += `Looking forward to connecting.\n\nBest,`
        const encodedBody = encodeURIComponent(body)
        window.location.href = `mailto:trevor@realtrix.org?subject=${subject}&body=${encodedBody}`
    }

    const generateReport = () => {
        const dealValue = parseInt(answers['deal_value'] || '0')
        const leadGoal = parseInt(answers['lead_goal'] || '0')

        const potentialRevenue = (dealValue * leadGoal * 0.2).toLocaleString()
        const annualRevenue = (dealValue * leadGoal * 0.2 * 12).toLocaleString()

        let headline = 'Clear Path to Launch'
        let summary = "Your model is a strong fit for outbound. A few foundational pieces need to be in place before we scale — and that's exactly what we build in month one."
        let recommendation = 'Foundation First'

        const qualified = budgetScore >= 40 && !tags.has('diy_focus')

        if (tags.has('no_pmf')) {
            headline = 'Offer Validation Needed'
            summary = "Before scaling outbound, your core offer needs more market validation. Outbound amplifies what's working — let's make sure something is working first."
            recommendation = 'Validate First'
        } else if (qualified) {
            headline = 'Scale Ready: High Intent'
            summary = 'Your economics and infrastructure are prime for automated outbound. You are leaving money on the table without a managed system in place.'
            recommendation = 'Scale Ready'
        } else if (budgetScore >= 25) {
            headline = 'Clear Path to Launch'
            summary = "Your model is a strong fit for outbound. A few foundational pieces need to be in place before we scale — and that's exactly what we build in month one."
            recommendation = 'Foundation First'
        } else {
            headline = 'Not Quite Ready Yet'
            summary = 'Based on your answers, outbound may not be the right investment right now — but that can change fast. Use our free resources to get to the right stage and come back.'
            recommendation = 'Build First'
        }

        const fix = tags.has('pain_deliverability') ? 'Isolate sending domains from corporate inbox immediately.' :
            tags.has('no_pmf') ? "Narrow your ICP and run a 'smoke test' offer." :
                tags.has('pain_time') ? 'Hire or automate the manual lead research step to free up closing time.' :
                    'Implement multi-provider waterfall enrichment to fix data decay.'

        let articlePath = '/outreach'
        let articleTitle = 'Access Full Intelligence Hub'

        if (tags.has('pain_deliverability') || tags.has('fresh_start') || tags.has('needs_migration')) {
            articlePath = '/outreach/tips/inbox-placement'
            articleTitle = 'Read: Inbox Placement Survival'
        } else if (tags.has('bad_data') || tags.has('standard_data')) {
            articlePath = '/outreach/tips/bad-data-silent-killer'
            articleTitle = 'Read: Fixing Bad Data'
        } else if (tags.has('pain_quality') || tags.has('low_intent') || tags.has('pain_volume')) {
            articlePath = '/outreach/tips/cold-email-subject-lines'
            articleTitle = 'Read: Master Subject Lines'
        } else if (tags.has('capacity_constraint') || tags.has('pain_time')) {
            articlePath = '/outreach/tips/authentic-automation'
            articleTitle = 'Read: Authentic Automation'
        } else if (tags.has('experienced')) {
            articlePath = '/outreach/tips/campaign-decay'
            articleTitle = 'Read: Prevent Campaign Decay'
        }

        const readinessScore = Math.min(98, Math.max(12, Math.round((score / 150) * 100)))

        return { potentialRevenue, annualRevenue, headline, summary, recommendation, fix, qualified, articlePath, articleTitle, readinessScore }
    }

    const report = generateReport()

    const handleSubmitCapture = async () => {
        if (!email || !agreed) return
        setSubmitting(true)

        const emailHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="color-scheme" content="light dark">
    <meta name="supported-color-schemes" content="light dark">
    <style>
        :root, body { color-scheme: light dark; }
        @media (prefers-color-scheme: dark) {
            body, table { background-color: #050505 !important; }
            .main-container { background-color: #050505 !important; color: #ffffff !important; border-color: #222 !important; }
            h1, .score-value, .fix-title { color: #FFD400 !important; }
            .greeting { color: #bbb !important; }
            .score-box { background-color: #0a0a0a !important; border-color: #333 !important; }
            .score-label, .pipeline-text { color: #666 !important; }
            h2 { color: #ffffff !important; border-bottom-color: #333 !important; }
            .summary-text { color: #ddd !important; }
            .fix-box { background-color: #0d0d00 !important; border-color: rgba(255,212,0, 0.2) !important; }
            .fix-text { color: #ccc !important; }
            .cta-button { background-color: #FFD400 !important; color: #000000 !important; }
        }
    </style>
</head>
<body style="margin: 0; padding: 0; background-color: #050505;">
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #050505;">
        <tr>
            <td align="center" style="padding: 40px 10px;">
                <div class="main-container" style="font-family: 'DM Mono', 'Courier New', monospace; background-color: #050505; color: #ffffff; padding: 40px; border-radius: 12px; border: 1px solid #222; max-width: 600px; margin: 0 auto; text-align: left;">
                    <h1 style="color: #FFD400; font-size: 24px; margin-bottom: 20px;">System Readiness Results</h1>
                    <p class="greeting" style="color: #bbb; line-height: 1.6; font-size: 16px;">Hi ${name || 'there'}, we've analyzed your responses and here is your readiness projection:</p>
                    <div class="score-box" style="background-color: #0a0a0a; border: 1px solid #333; padding: 20px; border-radius: 8px; margin-top: 20px; text-align: center;">
                        <div class="score-value" style="font-size: 48px; font-weight: bold; color: #FFD400;">${report.readinessScore}%</div>
                        <div class="score-label" style="color: #666; font-size: 12px; text-transform: uppercase; letter-spacing: 2px; margin-top: 5px;">Readiness Score</div>
                    </div>
                    <div style="margin-top: 30px;">
                        <h2 style="font-size: 20px; border-bottom: 1px solid #333; padding-bottom: 10px; margin-bottom: 15px;">${report.headline}</h2>
                        <p class="summary-text" style="color: #ddd; line-height: 1.6;">${report.summary}</p>
                    </div>
                    <div class="fix-box" style="margin-top: 30px; background-color: #0d0d00; border: 1px solid rgba(255,212,0, 0.2); padding: 20px; border-radius: 8px;">
                        <h3 class="fix-title" style="color: #FFD400; margin-top: 0; font-size: 16px;">Priority System Adjustment</h3>
                        <p class="fix-text" style="color: #ccc; margin-bottom: 0;">${report.fix}</p>
                    </div>
                    <p class="pipeline-text" style="color: #666; font-size: 14px; margin-top: 20px;">Potential Monthly Pipeline: $${report.potentialRevenue}</p>
                    <div style="margin-top: 40px; text-align: center;">
                        <a href="https://cal.com/trevorryan/30min" class="cta-button" style="background-color: #FFD400; color: #000; padding: 15px 30px; text-decoration: none; font-weight: bold; border-radius: 30px; display: inline-block;">Discuss Your Strategy</a>
                    </div>
                </div>
            </td>
        </tr>
    </table>
</body>
</html>
        `

        const payload = {
            email,
            name,
            company,
            score: report.readinessScore,
            tier: report.recommendation,
            answers,
            report: {
                headline: report.headline,
                summary: report.summary,
                fix: report.fix,
                potentialRevenue: report.potentialRevenue,
                annualRevenue: report.annualRevenue,
            },
            emailHtml,
            submitted_at: new Date().toISOString(),
            source: 'outreach_readiness_quiz',
        }

        try {
            await fetch('https://hook.eu1.make.com/sbhmcnmvl389npieevs6slmqj1ugdj7z', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            })
        } catch (e) {
            console.error(e)
        }

        setSubmitting(false)
        setStep(101)
    }

    return (
        <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-accent selection:text-black flex flex-col">
            <SEO
                title="Cold Email Readiness Quiz"
                description="Take the 20-question readiness quiz to get a scored report on your cold email infrastructure, deliverability, and outbound process."
                canonical="/readiness-quiz"
            />
            <nav className="px-6 py-6 md:px-12 flex items-center">
                <a href="/" className="font-display text-2xl font-bold text-white">Realtrix</a>
            </nav>

            <main className="flex-1 flex items-center justify-center p-6 pb-24">
                <div className="w-full max-w-6xl">
                    <div className="bg-[#0a0a0a] border border-white/10 rounded-[3rem] shadow-[0_0_100px_rgba(0,0,0,1)] overflow-hidden flex flex-col relative min-h-[700px]">

                        {step > 0 && step <= questions.length && (
                            <div className="px-12 pt-12 flex justify-between items-center">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-4">
                                        <Rocket className="text-accent animate-pulse" size={24} />
                                        <span className="font-black text-white uppercase tracking-[0.3em] text-xs">Diagnostic Progress</span>
                                    </div>
                                    <div className="flex items-center gap-6">
                                        <div className="h-2 bg-white/5 rounded-full overflow-hidden flex-1">
                                            <div
                                                className="bg-gradient-to-r from-accent to-accent h-full transition-all duration-1000 ease-out"
                                                style={{ width: `${(step / questions.length) * 100}%` }}
                                            />
                                        </div>
                                        <span className="text-gray-500 font-mono text-sm tabular-nums">{step}/{questions.length}</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="flex-1 flex flex-col justify-center">
                            {step === 0 && (
                                <div className="p-12 md:p-24 text-center animate-in fade-in zoom-in-95 duration-700">
                                    <div className="relative mb-12 inline-block">
                                        <div className="absolute inset-0 bg-accent/30 blur-[100px] rounded-full" />
                                        <div className="relative w-32 h-32 bg-gradient-to-br from-accent to-accent rounded-[2.5rem] flex items-center justify-center shadow-2xl transform rotate-6 hover:rotate-0 transition-transform duration-700">
                                            <BarChart3 size={64} className="text-black" />
                                        </div>
                                    </div>
                                    <h1 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter leading-none">
                                        Quantify Your <br />
                                        <span className="text-accent underline decoration-accent/20 underline-offset-[12px]">Growth Potential</span>
                                    </h1>
                                    <p className="text-gray-400 mb-12 text-xl leading-relaxed max-w-2xl mx-auto">
                                        Our proprietary 20-point diagnostic analyzes your infrastructure, economics, and market fit to project your outbound ROI.
                                    </p>
                                    <button
                                        onClick={() => setStep(1)}
                                        className="inline-flex bg-white text-black font-black px-12 py-6 rounded-2xl hover:bg-accent transition-all items-center gap-4 text-xl transform hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(255,212,0,0.2)] active:scale-95 group"
                                    >
                                        Start Diagnostic <ArrowRight size={28} className="group-hover:translate-x-2 transition-transform" />
                                    </button>
                                    <div className="mt-12 flex justify-center gap-8 items-center opacity-50 grayscale hover:grayscale-0 transition-all">
                                        <span className="text-[10px] font-black uppercase tracking-[0.3em]">Built for</span>
                                        <div className="h-px w-12 bg-gray-800" />
                                        <span className="text-xs font-bold">Agencies</span>
                                        <span className="text-xs font-bold">SaaS</span>
                                        <span className="text-xs font-bold">High-Ticket B2B</span>
                                    </div>
                                </div>
                            )}

                            {step === 99 && (
                                <div className="p-12 md:p-24 text-center flex flex-col items-center animate-in fade-in duration-500">
                                    <div className="relative w-48 h-48 mb-16">
                                        <svg className="w-full h-full transform -rotate-90">
                                            <circle cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="6" fill="transparent" className="text-white/5" />
                                            <circle
                                                cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="6" fill="transparent"
                                                strokeDasharray={553}
                                                strokeDashoffset={553 - (553 * analysisProgress) / 100}
                                                className="text-accent transition-all duration-300 ease-out"
                                                strokeLinecap="round"
                                            />
                                        </svg>
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <span className="text-4xl font-black text-white font-mono">{Math.round(analysisProgress)}%</span>
                                        </div>
                                    </div>
                                    <h2 className="text-3xl font-black text-white mb-6 tracking-tight">Synthesizing Your Results...</h2>
                                    <div className="space-y-4 max-w-sm w-full">
                                        <div className={`flex justify-between items-center bg-white/5 p-4 rounded-xl transition-all duration-500 ${analysisProgress > 20 ? 'opacity-100' : 'opacity-0 translate-y-4'}`}>
                                            <span className="text-gray-400 font-bold text-sm">Validating Unit Economics</span>
                                            <CheckCircle className="text-accent" size={18} />
                                        </div>
                                        <div className={`flex justify-between items-center bg-white/5 p-4 rounded-xl transition-all duration-500 ${analysisProgress > 50 ? 'opacity-100' : 'opacity-0 translate-y-4'}`}>
                                            <span className="text-gray-400 font-bold text-sm">Modeling ROI Velocity</span>
                                            <CheckCircle className="text-accent" size={18} />
                                        </div>
                                        <div className={`flex justify-between items-center bg-white/5 p-4 rounded-xl transition-all duration-500 ${analysisProgress > 80 ? 'opacity-100' : 'opacity-0 translate-y-4'}`}>
                                            <span className="text-gray-400 font-bold text-sm">Finalizing Strategy Audit</span>
                                            <CheckCircle className="text-accent" size={18} />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {step > 0 && step <= questions.length && (
                                <div className="p-12 md:p-24 max-w-4xl mx-auto w-full animate-in fade-in slide-in-from-bottom-12 duration-700">
                                    <div className="mb-12">
                                        <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-[1.1] tracking-tighter italic">
                                            "{questions[step - 1].text}"
                                        </h2>
                                        {questions[step - 1].subtext && <p className="text-gray-500 text-xl font-medium">{questions[step - 1].subtext}</p>}
                                    </div>

                                    {questions[step - 1].id === 'role' ? (
                                        <div className="space-y-6">
                                            <div className="relative">
                                                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500" size={24} />
                                                <input
                                                    type="text"
                                                    placeholder="Search for your role..."
                                                    value={searchQuery}
                                                    onChange={(e) => setSearchQuery(e.target.value)}
                                                    className="w-full bg-[#111] border border-white/10 rounded-2xl py-6 pl-16 pr-6 text-xl text-white outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all placeholder:text-gray-600"
                                                    autoFocus
                                                />
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
                                                {questions[step - 1].options
                                                    .filter((opt) => opt.label.toLowerCase().includes(searchQuery.toLowerCase()))
                                                    .map((opt, idx) => (
                                                        <button
                                                            key={idx}
                                                            onClick={() => {
                                                                setSearchQuery('')
                                                                handleAnswer(opt, questions[step - 1].id)
                                                            }}
                                                            className="text-left p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.08] hover:border-accent/40 transition-all group flex justify-between items-center relative overflow-hidden"
                                                        >
                                                            <span className="font-bold text-gray-300 group-hover:text-white transition-colors text-lg relative z-10">{opt.label}</span>
                                                        </button>
                                                    ))}
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {questions[step - 1].options.map((opt, idx) => (
                                                <button
                                                    key={idx}
                                                    onClick={() => handleAnswer(opt, questions[step - 1].id)}
                                                    className="text-left p-8 rounded-3xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.08] hover:border-accent/40 transition-all group flex justify-between items-center relative overflow-hidden h-32"
                                                >
                                                    <span className="font-black text-gray-300 group-hover:text-white transition-colors text-xl leading-tight relative z-10">{opt.label}</span>
                                                    <ChevronRight size={32} className="text-gray-800 group-hover:text-accent transform group-hover:translate-x-3 transition-all flex-shrink-0" />
                                                    <div className="absolute inset-x-0 bottom-0 h-1.5 bg-accent transform translate-y-full group-hover:translate-y-0 transition-transform" />
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}

                            {step === 100 && (
                                <div className="p-12 md:p-24 text-center animate-in fade-in duration-700 max-w-2xl mx-auto w-full">
                                    <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full text-sm font-black uppercase mb-8 bg-white/5 text-accent border border-white/10">
                                        Analysis Complete
                                    </div>
                                    <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tighter">
                                        Your results are calculated.
                                    </h2>
                                    <p className="text-gray-400 mb-12 text-lg">
                                        Drop your email and we'll send the full breakdown — plus a custom fix list based on your answers.
                                    </p>
                                    <div className="space-y-4">
                                        <input
                                            className="w-full bg-[#111] border border-white/10 rounded-2xl py-5 px-6 text-xl text-white outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all placeholder:text-gray-600"
                                            placeholder="Your name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                        <input
                                            className="w-full bg-[#111] border border-white/10 rounded-2xl py-5 px-6 text-xl text-white outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all placeholder:text-gray-600"
                                            placeholder="Company name"
                                            value={company}
                                            onChange={(e) => setCompany(e.target.value)}
                                        />
                                        <input
                                            className="w-full bg-[#111] border border-white/10 rounded-2xl py-5 px-6 text-xl text-white outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all placeholder:text-gray-600"
                                            placeholder="Work email *"
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                        <label className="flex items-start gap-3 mt-4 text-sm text-gray-400 cursor-pointer">
                                            <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="mt-1 h-4 w-4 shrink-0 accent-[#FFD400]" />
                                            <span>I agree to Realtrix processing my details to generate my report and follow up about its services, as described in the <a href="/legal/privacy" target="_blank" rel="noopener noreferrer" className="text-white underline">Privacy Policy</a>.</span>
                                        </label>
                                        <button
                                            onClick={handleSubmitCapture}
                                            disabled={!email || !agreed || submitting}
                                            className="w-full mt-4 bg-accent text-black font-black px-12 py-5 rounded-2xl hover:bg-[#FFDE59] transition-all text-xl disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_20px_50px_rgba(255,212,0,0.15)] flex items-center justify-center gap-3"
                                        >
                                            {submitting ? <Loader2 className="animate-spin" size={24} /> : null}
                                            {submitting ? 'Sending...' : 'See My Score →'}
                                        </button>
                                        <p className="text-sm text-gray-600 mt-6">
                                            No spam. Just your results + a fix list. Unsubscribe anytime.
                                        </p>
                                    </div>
                                </div>
                            )}

                            {step === 101 && (
                                <div ref={reportRef} className="grid grid-cols-1 lg:grid-cols-12 gap-1 px-4 lg:px-0 bg-[#0a0a0a]">
                                    <div className="lg:col-span-7 p-8 md:p-16 lg:p-20 animate-in fade-in slide-in-from-left-12 duration-700">
                                        <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full text-sm font-black uppercase mb-12 bg-accent text-black shadow-[0_10px_40px_rgba(255,212,0,0.3)]">
                                            <Rocket size={18} /> {report.recommendation}
                                        </div>

                                        <h2 className="text-5xl md:text-6xl lg:text-8xl font-black text-white mb-6 md:mb-8 leading-[0.9] tracking-tighter">
                                            {report.headline}
                                        </h2>
                                        <p className="text-gray-400 mb-8 md:mb-12 text-lg md:text-2xl leading-relaxed rounded-2xl bg-white/[0.03] border border-white/8 pl-6 pr-6 md:pl-10 md:pr-10 py-6 italic">
                                            {report.summary}
                                        </p>

                                        <div className="space-y-8 mb-16">
                                            <h3 className="text-gray-600 font-black text-xs uppercase tracking-[0.4em] flex items-center gap-4">
                                                <div className="h-px bg-gray-900 flex-1" /> Critical Implementation Focus <div className="h-px bg-gray-900 flex-1" />
                                            </h3>

                                            <div className="p-10 bg-white/[0.02] border border-white/5 rounded-[2.5rem] flex gap-8 items-start relative overflow-hidden group">
                                                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                                                <ShieldAlert className="text-accent flex-shrink-0 animate-bounce" size={40} />
                                                <div className="relative z-10">
                                                    <p className="text-white text-2xl font-black mb-3">Priority System Adjustment</p>
                                                    <p className="text-gray-400 text-lg leading-relaxed">{report.fix}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex flex-col xl:flex-row gap-4">
                                            {report.recommendation === 'Scale Ready' ? (
                                                <button
                                                    onClick={() => window.open('https://cal.com/trevorryan/30min', '_blank')}
                                                    className="bg-accent text-black px-8 py-5 md:px-12 md:py-7 rounded-[2rem] font-black hover:bg-[#FFDE59] transition-all flex items-center justify-center gap-4 text-xl md:text-2xl hover:scale-[1.03] shadow-[0_20px_50px_rgba(255,212,0,0.2)]"
                                                >
                                                    <Zap size={28} className="md:w-8 md:h-8" fill="currentColor" /> Book a Strategy Call
                                                </button>
                                            ) : report.recommendation === 'Foundation First' ? (
                                                <button
                                                    onClick={handleFreeAuditEmail}
                                                    className="bg-white text-black px-8 py-5 md:px-12 md:py-7 rounded-[2rem] font-black hover:bg-gray-200 transition-all flex items-center justify-center gap-4 text-xl md:text-2xl hover:scale-[1.03]"
                                                >
                                                    <Mail size={28} className="md:w-8 md:h-8" /> Request Free Audit
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() => navigate('/outreach')}
                                                    className="bg-white text-black px-8 py-5 md:px-12 md:py-7 rounded-[2rem] font-black hover:bg-gray-200 transition-all flex items-center justify-center gap-4 text-xl md:text-2xl hover:scale-[1.03]"
                                                >
                                                    <BookOpen size={28} className="md:w-8 md:h-8" /> Explore Free Resources
                                                </button>
                                            )}
                                        </div>
                                        <div className="flex flex-col sm:flex-row gap-4 mt-6" data-html2canvas-ignore="true">
                                            <button
                                                onClick={handleFreeAuditEmail}
                                                className="bg-white/5 text-white px-8 py-4 rounded-[2rem] font-bold hover:bg-white/10 transition-all flex items-center justify-center gap-3 border border-white/10"
                                            >
                                                <Mail size={20} /> Request Free Audit via Email
                                            </button>
                                            <button
                                                onClick={handleDownloadPDF}
                                                disabled={isDownloading}
                                                className="bg-white/5 text-white px-8 py-4 rounded-[2rem] font-bold hover:bg-white/10 transition-all flex items-center justify-center gap-3 border border-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                {isDownloading ? <Loader2 size={20} className="animate-spin" /> : <Download size={20} />}
                                                {isDownloading ? 'Generating PDF...' : 'Download PDF Report'}
                                            </button>
                                        </div>
                                    </div>

                                    <div className="lg:col-span-5 bg-[#0d0d0d] p-8 md:p-16 lg:p-20 flex flex-col justify-center relative overflow-hidden border-t lg:border-t-0 lg:border-l border-white/5">
                                        <div className="absolute top-0 right-0 w-full h-full bg-accent/5 rounded-full blur-[150px] pointer-events-none -translate-y-1/2 translate-x-1/2" />

                                        <div className="relative z-10 space-y-16">
                                            <h3 className="text-gray-600 text-xs font-black uppercase tracking-[0.5em] mb-12">Growth Modeling</h3>

                                            <div className="group">
                                                <div className="flex items-center gap-3 mb-4">
                                                    <TrendingUp size={20} className="text-accent" />
                                                    <p className="text-gray-500 text-sm font-black uppercase tracking-widest">Est. Monthly Pipeline</p>
                                                </div>
                                                <p className="text-6xl md:text-8xl font-black text-white group-hover:text-accent transition-colors tracking-tighter">
                                                    <span className="text-2xl md:text-3xl text-accent mr-1 tracking-normal">$</span>{report.potentialRevenue}
                                                </p>
                                            </div>

                                            <div className="group">
                                                <div className="flex items-center gap-3 mb-2 md:mb-4">
                                                    <Target size={20} className="text-accent" />
                                                    <p className="text-gray-500 text-xs md:text-sm font-black uppercase tracking-widest">Annual Revenue Goal</p>
                                                </div>
                                                <p className="text-4xl md:text-6xl font-black text-white group-hover:text-accent transition-colors tracking-tighter">
                                                    <span className="text-xl md:text-2xl text-accent mr-2 tracking-normal">$</span>{report.annualRevenue}
                                                </p>
                                            </div>

                                            <div className="pt-16 space-y-6">
                                                <div className="flex justify-between items-end">
                                                    <span className="text-gray-600 font-black text-xs uppercase tracking-widest">Engine Readiness</span>
                                                    <span className="text-white font-mono text-xl">{report.readinessScore}%</span>
                                                </div>
                                                <div className="h-3 bg-white/5 rounded-full overflow-hidden">
                                                    <div
                                                        className="h-full bg-gradient-to-r from-accent to-accent transition-all duration-1000"
                                                        style={{ width: `${report.readinessScore}%` }}
                                                    />
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-2 gap-10 pt-16 border-t border-white/5">
                                                <div>
                                                    <p className="text-[10px] text-gray-700 font-black uppercase tracking-widest mb-2">Protocol</p>
                                                    <p className="text-white font-bold text-base">Enrichment + Sending</p>
                                                </div>
                                                <div>
                                                    <p className="text-[10px] text-gray-700 font-black uppercase tracking-widest mb-2">Path</p>
                                                    <p className="text-white font-bold text-base">{report.qualified ? 'Managed DFY' : 'Outreach Hub'}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>

            <footer className="px-6 py-10 md:px-12 text-center text-gray-600 text-sm">
                &copy; {new Date().getFullYear()} Realtrix. All rights reserved.
            </footer>
        </div>
    )
}

export default ReadinessQuiz
