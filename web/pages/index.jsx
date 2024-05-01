/* Modules */
import React from 'react'
import SEO from 'ui/SEO'

/* Style */
import styles from 'css/main.module.css'

/* Base UI */
import Navigation from 'ui/nav'
import Footer from 'ui/footer'

/* Sections */
import Hero from 'ui/sections/hero'
import NumInfo from 'ui/sections/numInfo'
import AboutLimovia from 'ui/sections/aboutLimovia'
import OurServices from 'ui/sections/ourServices'
import CommonQuestions from 'ui/sections/commonQuestions'
import CarFleet from 'ui/sections/carFleet'
import Map from 'ui/sections/map'
import Contact from 'ui/sections/contactUs'

/* Static */
import ImgCover from 'logo/LimoviaLogo2x.png'

export default function HomePage() {
    return (
        <>
            {/* Search Engine Optimization */}
            <SEO
                title="Officiella Hemsida"
                description=""
                type=""
                image={ImgCover.src}
            />

            {/* Content */}
            <div className={`${styles.lvWrapper} ${styles.lvFontMontserrat}`}>
                <Navigation/>
                <main>
                    {/* Sections */}
                    <Hero/>
                    <NumInfo/>
                    <AboutLimovia/>
                    <OurServices/>
                    <CommonQuestions/>
                    <CarFleet/>
                    <Map/>
                    <Contact/>
                </main>
                <Footer/>
            </div>
        </>
    )
}