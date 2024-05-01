import React from 'react'
import Head from 'next/head'
import favicon from 'logo/LimoviaFavicon.png'

export default function SEO({ title, description, type, image }) {

    const siteName = 'Limovia'
    const siteURL = 'https://www.limovia.se'
    const separator = ' | '
    const titleStructure = siteName + separator + title
    const defaultDesc = 'Limovia grundad 2024, är ett lokalt företag som erbjuder privata chaufförer dygnet runt.'

    let finalDesc

    if (!description) {
        finalDesc = defaultDesc
    } else {
        finalDesc = description
    }

    return (
        <Head>
            {/* Favicon */}
            <link rel="icon" href={favicon.src} type="image/x-icon" />

            {/* Meta tags */}
            {/*<meta name="viewport" content="width=device-width, initial-scale=1" />*/}
            <meta name="theme-color" content="#000000" />
            <meta charSet="utf-8" />

            {/* Title */}
            <title>{titleStructure}</title>

            {/* Metadata */}
            <meta name="description"        content={finalDesc} />
            <meta name="image"              content={image} />
            <meta name="type"               content={type} />

            {/* Open Graph (OG) */}
            <meta property="og:title"       content={titleStructure} />
            <meta property="og:type"        content={type} />
            <meta property="og:description" content={finalDesc} />
            <meta property="og:image"       content={image} />
            <meta property="og:url"         content={siteURL} />
            <meta property="og:site_name"   content={siteName} />

            {/* Additional OG metadata */}
            <meta property="og:image:type"      content="image/jpeg" />
            <meta property="og:image:width"     content="1920" />
            <meta property="og:image:height"    content="1080" />
            <meta property="og:locale"          content="en_US" />

            {/*
            // Twitter Card
            <meta name="twitter:card"           content="summary_large_image" />
            <meta name="twitter:title"          content={titleStructure} />
            <meta name="twitter:description"    content={finalDesc} />
            <meta name="twitter:image"          content={image} />

            // Additional Twitter metadata
            <meta name="twitter:site"       content={twitterCreator} />
            <meta name="twitter:domain"     content={siteURL} />
            */}
            
            {/* Temporary JS 
            <script defer src="JS/smallMenu.js"></script>
            <script defer src="JS/index.js"></script>
            <script defer src="JS/quoteSlide.js"></script>
            <script defer src="JS/fleetSlide.js"></script>
            <script defer src="JS/scroll.js"></script>*/}
        </Head>
    )
}