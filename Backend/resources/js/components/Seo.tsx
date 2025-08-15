import React from 'react'
import { Helmet } from 'react-helmet'
import { SERVER_URL } from '@/constants/domain'

interface SeoProps {
    title: string
    description: string
    keywords?: string
    canonicalUrl?: string
    image?: string
}

const Seo: React.FC<SeoProps> = ({ title, description, keywords, canonicalUrl, image }) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={description} />
            {keywords && <meta name="keywords" content={keywords} />}
            {canonicalUrl && <link rel="canonical" href={`${SERVER_URL}/` + canonicalUrl} />}
            {image && <meta property="og:image" content={image} />}
            {/* Open Graph Tags */}
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:type" content="website" />
            {canonicalUrl && <meta property="og:url" content={`${SERVER_URL}/` + canonicalUrl} />}
        </Helmet>
    )
}

export default Seo
