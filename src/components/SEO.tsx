import React from 'react'
import { Helmet } from 'react-helmet-async'

interface SEOProps {
  title?: string
  description?: string
  canonical?: string
  noindex?: boolean
  ogImage?: string
  schema?: Record<string, unknown>
  keywords?: string
  type?: string
}

const SITE = 'https://realtrix.org'
const DEFAULT_TITLE = 'Realtrix — Cold Email Infrastructure & AI Reply Classification'
const DEFAULT_DESC = 'Realtrix runs your entire cold email operation — infrastructure, sourcing, sequencing, and AI-qualified replies. Pay infra at cost, and a fee only when a real reply lands.'
const DEFAULT_OG = '/og-default.png'

const SEO: React.FC<SEOProps> = ({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESC,
  canonical,
  noindex = false,
  ogImage = DEFAULT_OG,
  schema,
  keywords = 'cold email, email infrastructure, deliverability, lead generation, B2B outreach',
  type = 'website',
}) => {
  const fullTitle = title === DEFAULT_TITLE ? title : `${title} | Realtrix`
  const url = canonical ? `${SITE}${canonical}` : SITE
  // No default schema here — index.html already ships one static Organization block.
  // Only render page-specific schema when a page explicitly passes one, to avoid duplicates.
  const schemaData = schema

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      <link rel="canonical" href={url} />

      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={ogImage.startsWith('http') ? ogImage : `${SITE}${ogImage}`} />
      <meta property="og:site_name" content="Realtrix" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage.startsWith('http') ? ogImage : `${SITE}${ogImage}`} />

      {schemaData && <script type="application/ld+json">{JSON.stringify(schemaData)}</script>}
    </Helmet>
  )
}

export default SEO
