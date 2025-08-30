"use client"

import { useEffect, useState } from "react"
import { Header, HeroSection, FeaturesSection, CTASection, Footer } from "../@components"

export default function HomePage() {
    const [showLanding, setShowLanding] = useState(false)

    useEffect(() => {
        setShowLanding(true)
    }, [])

    if (!showLanding) {
        return null
    }

    return (
        <div className="min-h-screen bg-background overflow-hidden">
            <Header />
            <HeroSection />
            <FeaturesSection />
            <CTASection />
            <Footer />
        </div>
    )
}