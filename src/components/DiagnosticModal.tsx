import React, { useState, useEffect } from 'react'
import { X, ChevronRight, CheckCircle, ArrowRight, BarChart3, Target, Zap, ShieldAlert, BookOpen, Minimize2, Maximize2, Loader2, TrendingUp, Rocket, Search, Download, Mail } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

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

type ViewMode = 'hidden' | 'floating' | 'modal'

const DiagnosticModal: React.FC = () => {
    const navigate = useNavigate()
    const [viewMode, setViewMode] = useState<ViewMode>('hidden')
    const [step, setStep] = useState(0)
    const [tags, setTags] = useState<Set<string>>(new Set())
    const [score, setScore] = useState(0)
    const [budgetScore, setBudgetScore] = useState(0)
    const [answers, setAnswers] = useState<Record<string, string>>({})
    const [hasSeen, setHasSeen] = useState(false)
    const [isAnalyzing, setIsAnalyzing] = useState(false)
    const [analysisProgress, setAnalysisProgress] = useState(0)
    const [isDownloading, setIsDownloading] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const reportRef = React.useRef<HTMLDivElement>(null)

    const questions: Question[] = [
        { id: 'role', text: 'What is your primary role?', options: [
            { label: 'Founder / CEO', value: 'founder', tags: ['decision_maker'], score: 5, budgetVal: 10 },
            { label: 'Co-Founder', value: 'co-founder', tags: ['decision_maker'], score: 5, budgetVal: 10 },
            { label: 'Chief Revenue Officer (CRO)', value: 'cro', tags: ['decision_maker', 'scale_focus'], score: 5, budgetVal: 10 },
            { label: 'VP of Sales / Marketing', value: 'vp_sales', tags: ['decision_maker', 'scale_focus'], score: 5, budgetVal: 10 },
            { label: 'Sales Director / Manager', value: 'sales_manager', tags: ['scale_focus'], score: 4, budgetVal: 8 },
            { label: 'Account Executive (AE)', value: 'ae', tags: ['execution_focus'], score: 2, budgetVal: 5 },
            { label: 'SDR / BDR', value: 'sdr', tags: ['execution_focus'], score: 1, budgetVal: 2 },
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
            { label: 'B2C / E-commerce', value: 'b2c', tags: ['bad_fit'], score: 0, budgetVal: 0 },
        ] },
        { id: 'revenue', text: 'Current Monthly Recurring Revenue (MRR)?', options: [
            { label: 'Pre-revenue / Early Stage', value: '0', tags: ['early_stage'], score: 1, budgetVal: 2 },
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
            { label: 'Spreadsheets / Manual', value: 'manual', tags: ['needs_infra'], score: 2, budgetVal: 5 },
            { label: 'Not yet', value: 'none', tags: ['not_ready'], score: 0, budgetVal: 0 },
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

    useEffect(() => {
        const openModalHandler = () => {
            setViewMode('modal')
            setHasSeen(true)
            setStep(1)
        }
        window.addEventListener('open-diagnostic-modal', openModalHandler)

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting && !hasSeen && !sessionStorage.getItem('realtrix_diagnostic_dismissed')) {
                    if (viewMode === 'hidden') {
                        setViewMode('floating')
                        setHasSeen(true)
                    }
                }
            })
        }, { threshold: 0.2 })

        const target = document.getElementById('how')
        if (target) observer.observe(target)

        return () => {
            window.removeEventListener('open-diagnostic-modal', openModalHandler)
            if (target) observer.unobserve(target)
        }
    }, [hasSeen, viewMode])

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
            setIsAnalyzing(true)
            setStep(99)
            let progress = 0
            const interval = setInterval(() => {
                progress += Math.random() * 15
                if (progress >= 100) {
                    progress = 100
                    clearInterval(interval)
                    setTimeout(() => {
                        setIsAnalyzing(false)
                        setStep(100)
                    }, 500)
                }
                setAnalysisProgress(progress)
            }, 150)
        }
    }

    const closeAndSuppress = () => {
        setViewMode('hidden')
        sessionStorage.setItem('realtrix_diagnostic_dismissed', 'true')
    }

    const toggleMode = () => setViewMode((prev) => (prev === 'floating' ? 'modal' : 'floating'))

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

        let headline = 'Optimization Required'
        let summary = 'Your fundamentals are in place, but specific bottlenecks are throttling growth.'
        let recommendation = 'Audit & Tune'

        const qualified = budgetScore >= 50 && !tags.has('low_budget') && !tags.has('diy_focus')

        if (tags.has('bad_fit')) {
            headline = 'Inbound Strategy Recommended'
            summary = 'Your business model typically struggles with cold outbound. We recommend content-led inbound over cold email.'
            recommendation = 'Pivot to Inbound'
        } else if (tags.has('no_pmf')) {
            headline = 'Offer Validation Needed'
            summary = 'Before scaling outbound, your core offer needs more market validation to ensure positive ROI.'
            recommendation = 'Validate First'
        } else if (qualified) {
            headline = 'Scale Ready: High Intent'
            summary = 'Your economics and infrastructure are prime for automated outbound. You are leaving money on the table without a managed system.'
            recommendation = 'Aggressive Scale'
        } else {
            headline = 'Efficiency Rebuild Needed'
            summary = 'Your model works, but your current setup is likely inefficient. Start by fixing foundational unit economics.'
            recommendation = 'Foundational Fix'
        }

        const fix = tags.has('pain_deliverability') ? 'Isolate sending domains from corporate inbox immediately.' :
            tags.has('no_pmf') ? "Narrow your ICP and run a 'smoke test' offer." :
                tags.has('pain_time') ? 'Hire or automate the manual lead research step to free up closing time.' :
                    'Implement multi-provider waterfall enrichment to fix data decay.'

        let articlePath = '/outreach'
        let articleTitle = 'Explore Intelligence Hub'

        if (tags.has('pain_deliverability') || tags.has('fresh_start') || tags.has('needs_migration')) {
            articlePath = '/outreach/tips/inbox-placement'
            articleTitle = 'Read: Inbox Placement Survival'
        } else if (tags.has('bad_data') || tags.has('standard_data')) {
            articlePath = '/outreach/tips/bad-data-silent-killer'
            articleTitle = 'Read: Fixing Bad Data'
        } else if (tags.has('pain_quality') || tags.has('pain_volume')) {
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

    if (viewMode === 'hidden') return null

    const report = generateReport()
    const isModal = viewMode === 'modal'

    return (
        <div className={`fixed z-[100] transition-all duration-300 ${isModal ? 'inset-0 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md' : 'bottom-6 right-6 w-full max-w-[420px]'}`}>
            <div className={`bg-[#0a0a0a] border border-white/10 rounded-3xl shadow-[0_0_80px_rgba(0,0,0,1)] overflow-hidden flex flex-col relative transition-all duration-300 ${isModal ? 'w-full max-w-5xl max-h-[92vh]' : 'max-h-[640px]'}`}>
                <div className="px-8 pt-8 pb-4 flex justify-between items-start border-b border-white/5 bg-[#0d0d0d]">
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-accent/20 rounded-lg text-accent animate-pulse">
                                <Rocket size={isModal ? 22 : 18} />
                            </div>
                            <span className={`font-black text-white uppercase tracking-[0.2em] ${isModal ? 'text-sm' : 'text-[10px]'}`}>
                                {step === 100 ? 'Intelligence Report' : 'System Readiness Audit'}
                            </span>
                        </div>
                        {step > 0 && step <= questions.length && (
                            <div className="flex items-center gap-4">
                                <div className="bg-white/5 h-1.5 rounded-full overflow-hidden flex-1">
                                    <div className="bg-gradient-to-r from-accent to-accent h-full transition-all duration-700 ease-out" style={{ width: `${(step / questions.length) * 100}%` }} />
                                </div>
                                <span className="text-gray-500 text-[10px] font-mono tabular-nums">{step}/{questions.length}</span>
                            </div>
                        )}
                    </div>
                    <div className="flex gap-2 ml-4">
                        <button onClick={toggleMode} className="text-gray-500 hover:text-white transition-all p-2 hover:bg-white/5 rounded-full">
                            {isModal ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
                        </button>
                        <button onClick={closeAndSuppress} className="text-gray-500 hover:text-white transition-all p-2 hover:bg-white/5 rounded-full">
                            <X size={18} />
                        </button>
                    </div>
                </div>

                <div className="overflow-y-auto custom-scrollbar flex-1 bg-[#0a0a0a]">
                    {step === 0 && (
                        <div className="p-12 text-center flex flex-col items-center justify-center h-full">
                            <div className="relative mb-8">
                                <div className="absolute inset-0 bg-accent/20 blur-3xl rounded-full" />
                                <div className="relative w-24 h-24 bg-gradient-to-br from-accent to-accent rounded-[2rem] flex items-center justify-center shadow-2xl transform rotate-12 hover:rotate-0 transition-transform duration-500">
                                    <BarChart3 size={48} className="text-black" />
                                </div>
                            </div>
                            <h3 className="text-4xl font-black text-white mb-4 tracking-tight leading-tight">Quantify Your <span className="text-accent underline decoration-accent/20 underline-offset-8">Growth Potential</span></h3>
                            <p className="text-gray-400 mb-10 text-lg leading-relaxed max-w-md mx-auto">
                                Complete our 20-point diagnostic to uncover hidden bottlenecks and see if you're ready for automated hyper-scale.
                            </p>
                            <button
                                onClick={() => setStep(1)}
                                className="w-full max-w-sm bg-white text-black font-black py-5 rounded-2xl hover:bg-accent transition-all flex items-center justify-center gap-3 transform hover:-translate-y-1 hover:shadow-2xl active:scale-95 group"
                            >
                                Start Diagnostic <ArrowRight size={22} className="group-hover:translate-x-2 transition-transform" />
                            </button>
                            <p className="mt-6 text-gray-600 text-xs font-medium uppercase tracking-widest">Takes ~3 minutes • Full Revenue Projection included</p>
                        </div>
                    )}

                    {step === 99 && (
                        <div className="p-12 text-center flex flex-col items-center justify-center h-full min-h-[400px]">
                            <div className="relative w-24 h-24 mb-10">
                                <svg className="w-full h-full transform -rotate-90">
                                    <circle cx="48" cy="48" r="44" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-white/5" />
                                    <circle cx="48" cy="48" r="44" stroke="currentColor" strokeWidth="4" fill="transparent" strokeDasharray={276} strokeDashoffset={276 - (276 * analysisProgress) / 100} className="text-accent transition-all duration-300 ease-out" strokeLinecap="round" />
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-xl font-black text-white font-mono">{Math.round(analysisProgress)}%</span>
                                </div>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4 animate-pulse">Running Intelligence Models...</h3>
                            <div className="space-y-3 max-w-xs w-full">
                                <div className={`flex justify-between text-xs transition-opacity duration-300 ${analysisProgress > 20 ? 'opacity-100' : 'opacity-0'}`}>
                                    <span className="text-gray-500">Checking Deliverability Vectors</span>
                                    <CheckCircle size={14} className="text-accent" />
                                </div>
                                <div className={`flex justify-between text-xs transition-opacity duration-300 ${analysisProgress > 50 ? 'opacity-100' : 'opacity-0'}`}>
                                    <span className="text-gray-500">Modeling ROI Projections</span>
                                    <CheckCircle size={14} className="text-accent" />
                                </div>
                                <div className={`flex justify-between text-xs transition-opacity duration-300 ${analysisProgress > 80 ? 'opacity-100' : 'opacity-0'}`}>
                                    <span className="text-gray-500">Synthesizing Strategy Audit</span>
                                    <CheckCircle size={14} className="text-accent" />
                                </div>
                            </div>
                        </div>
                    )}

                    {step > 0 && step <= questions.length && (
                        <div className={`p-10 ${isModal ? 'max-w-3xl mx-auto py-16' : ''} animate-in fade-in slide-in-from-bottom-8 duration-500`}>
                            <div className="mb-10">
                                <h3 className={`${isModal ? 'text-4xl' : 'text-2xl'} font-black text-white mb-4 leading-tight tracking-tight`}>{questions[step - 1].text}</h3>
                                {questions[step - 1].subtext && <p className="text-gray-500 text-lg leading-relaxed">{questions[step - 1].subtext}</p>}
                            </div>

                            {questions[step - 1].id === 'role' ? (
                                <div className="space-y-4">
                                    <div className="relative">
                                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                                        <input
                                            type="text"
                                            placeholder="Search for your role..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="w-full bg-[#111] border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all placeholder:text-gray-600"
                                            autoFocus
                                        />
                                    </div>
                                    <div className="space-y-3 max-h-[30vh] overflow-y-auto pr-2 custom-scrollbar">
                                        {questions[step - 1].options
                                            .filter((opt) => opt.label.toLowerCase().includes(searchQuery.toLowerCase()))
                                            .map((opt, idx) => (
                                                <button
                                                    key={idx}
                                                    onClick={() => { setSearchQuery(''); handleAnswer(opt, questions[step - 1].id) }}
                                                    className="w-full text-left p-4 md:p-6 rounded-2xl border border-white/5 bg-white/[0.03] hover:bg-white/[0.08] hover:border-accent/30 transition-all group flex justify-between items-center relative overflow-hidden"
                                                >
                                                    <div className="relative z-10 flex flex-col">
                                                        <span className="font-bold text-gray-200 group-hover:text-white transition-colors text-lg">{opt.label}</span>
                                                    </div>
                                                </button>
                                            ))}
                                    </div>
                                </div>
                            ) : (
                                <div className={`grid gap-4 ${isModal ? 'grid-cols-2' : 'grid-cols-1'}`}>
                                    {questions[step - 1].options.map((opt, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => handleAnswer(opt, questions[step - 1].id)}
                                            className={`text-left p-6 rounded-2xl border border-white/5 bg-white/[0.03] hover:bg-white/[0.08] hover:border-accent/30 transition-all group flex justify-between items-center relative overflow-hidden ${isModal ? 'h-32' : ''}`}
                                        >
                                            <div className="relative z-10 flex flex-col">
                                                <span className="font-bold text-gray-200 group-hover:text-white transition-colors text-lg">{opt.label}</span>
                                            </div>
                                            <ChevronRight size={24} className="text-gray-700 group-hover:text-accent transform group-hover:translate-x-2 transition-all" />
                                            <div className="absolute inset-x-0 bottom-0 h-1 bg-accent transform translate-y-full group-hover:translate-y-0 transition-transform" />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {step === 100 && (
                        <div className={`p-10 animate-in fade-in zoom-in-95 duration-700 ${isModal ? 'grid grid-cols-1 lg:grid-cols-5 gap-10' : 'space-y-8'}`}>
                            <div className={`${isModal ? 'lg:col-span-3' : ''}`}>
                                <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full text-xs font-black uppercase mb-8 bg-accent text-black shadow-[0_0_20px_rgba(255,212,0,0.4)]">
                                    <Rocket size={14} /> {report.recommendation}
                                </div>

                                <h3 className={`${isModal ? 'text-6xl' : 'text-3xl'} font-black text-white mb-6 leading-[1.1] tracking-tighter`}>
                                    {report.headline}
                                </h3>
                                <p className="text-gray-400 mb-10 text-xl leading-relaxed rounded-2xl bg-white/[0.03] border border-white/8 pl-6 pr-6 py-5">
                                    {report.summary}
                                </p>

                                <div className="space-y-6 mb-12">
                                    <div className="flex items-center gap-3">
                                        <div className="h-px bg-white/10 flex-1" />
                                        <h4 className="text-gray-500 font-black text-xs uppercase tracking-[0.2em]">Strategy Recommendation</h4>
                                        <div className="h-px bg-white/10 flex-1" />
                                    </div>

                                    <div className="p-8 bg-white/[0.03] border border-white/10 rounded-3xl flex gap-6 items-start relative overflow-hidden group">
                                        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                        <ShieldAlert className="text-accent flex-shrink-0 mt-1" size={28} />
                                        <div className="relative z-10">
                                            <p className="text-white text-lg font-bold mb-2">Priority Fix</p>
                                            <p className="text-gray-400 text-base leading-relaxed">{report.fix}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                                    {report.qualified ? (
                                        <button
                                            onClick={() => window.open('https://cal.com/trevorryan/30min', '_blank')}
                                            className="bg-accent text-black px-10 py-5 rounded-2xl font-black hover:bg-[#FFDE59] transition-all flex items-center justify-center gap-4 text-lg hover:scale-[1.02] shadow-2xl"
                                        >
                                            <Zap size={24} fill="currentColor" /> Book Execution Call
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => { setViewMode('hidden'); navigate(report.articlePath) }}
                                            className="bg-white/10 text-white px-10 py-5 rounded-2xl font-black hover:bg-white/20 transition-all flex items-center justify-center gap-4 text-lg border border-white/10"
                                        >
                                            <BookOpen size={24} /> {report.articleTitle}
                                        </button>
                                    )}
                                </div>

                                <div className="flex flex-col sm:flex-row gap-3 pt-6 mt-6 border-t border-white/10" data-html2canvas-ignore="true">
                                    <button
                                        onClick={handleFreeAuditEmail}
                                        className="flex-1 bg-white/5 text-white px-6 py-4 rounded-2xl font-bold hover:bg-white/10 transition-all flex items-center justify-center gap-2 text-sm border border-transparent hover:border-white/10"
                                    >
                                        <Mail size={16} /> Request Free Audit
                                    </button>
                                    <button
                                        onClick={handleDownloadPDF}
                                        disabled={isDownloading}
                                        className="flex-1 bg-white/5 text-white px-6 py-4 rounded-2xl font-bold hover:bg-white/10 transition-all flex items-center justify-center gap-2 text-sm border border-transparent hover:border-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isDownloading ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
                                        {isDownloading ? 'Generating PDF...' : 'Download PDF Report'}
                                    </button>
                                </div>
                            </div>

                            <div ref={reportRef} className={`${isModal ? 'lg:col-span-2' : ''} bg-[#0f0f0f] border border-white/10 rounded-[3rem] p-8 relative overflow-hidden flex flex-col justify-between`}>
                                <div className="absolute top-0 right-0 w-80 h-80 bg-accent/10 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/2" />

                                <div>
                                    <h4 className="text-gray-600 text-xs font-black uppercase tracking-[0.3em] mb-10 flex items-center gap-3">
                                        <div className="w-8 h-px bg-gray-800" /> Economic Projection
                                    </h4>

                                    <div className="space-y-10 relative z-10">
                                        <div className="group">
                                            <div className="flex items-center gap-2 mb-2">
                                                <TrendingUp size={14} className="text-accent" />
                                                <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">Monthly Growth Potential</p>
                                            </div>
                                            <p className="text-6xl font-black text-white group-hover:text-accent transition-colors tracking-tighter">
                                                <span className="text-2xl text-accent mr-1">$</span>{report.potentialRevenue}
                                            </p>
                                        </div>

                                        <div className="group">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Target size={14} className="text-accent" />
                                                <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">Annual Revenue Gap</p>
                                            </div>
                                            <p className="text-4xl font-black text-white group-hover:text-accent transition-colors tracking-tighter">
                                                <span className="text-xl text-accent mr-1">$</span>{report.annualRevenue}
                                            </p>
                                        </div>

                                        <div className="py-8 space-y-4">
                                            <div className="flex justify-between items-center text-sm">
                                                <span className="text-gray-500 font-medium">System Readiness</span>
                                                <span className="text-white font-bold">{report.readinessScore}%</span>
                                            </div>
                                            <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                                                <div className="h-full bg-gradient-to-r from-accent to-accent transition-all duration-1000" style={{ width: `${report.readinessScore}%` }} />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-6 pt-6 border-t border-white/5">
                                            <div>
                                                <p className="text-[10px] text-gray-600 font-black uppercase tracking-widest mb-1">Recommended Stack</p>
                                                <p className="text-white font-bold text-xs">Enrichment + Sending</p>
                                            </div>
                                            <div>
                                                <p className="text-[10px] text-gray-600 font-black uppercase tracking-widest mb-1">Implementation</p>
                                                <p className="text-white font-bold text-xs">{report.qualified ? 'Managed (Done-for-you)' : 'Self-Service (Hub Content)'}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {!isModal && !report.qualified && (
                                    <button
                                        onClick={() => navigate('/outreach')}
                                        className="mt-10 w-full bg-white/10 text-white font-black py-4 rounded-2xl hover:bg-white/20 transition-all text-sm uppercase tracking-widest"
                                    >
                                        Access Outreach Hub
                                    </button>
                                )}

                                {!isModal && report.qualified && (
                                    <button
                                        onClick={() => window.open('https://cal.com/trevorryan/30min', '_blank')}
                                        className="mt-10 w-full bg-accent text-black font-black py-4 rounded-2xl hover:bg-[#FFDE59] transition-all text-sm uppercase tracking-widest shadow-lg"
                                    >
                                        Secure Booking
                                    </button>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default DiagnosticModal
