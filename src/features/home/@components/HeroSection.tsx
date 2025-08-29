"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Badge } from "@/shared/components/ui/badge"
import { Button } from "@/shared/components/ui/button"
import { Sparkles, ArrowRight, Play } from "lucide-react"

interface AnimatedStats {
    influencers: number
    categories: number
    countries: number
    accuracy: number
}

export function HeroSection() {
    const router = useRouter()
    const [animatedStats, setAnimatedStats] = useState<AnimatedStats>({
        influencers: 0,
        categories: 0,
        countries: 0,
        accuracy: 0
    })

    useEffect(() => {
        const timer = setTimeout(() => {
            const duration = 2000
            const steps = 60
            const stepDuration = duration / steps

            let step = 0
            const interval = setInterval(() => {
                step++
                const progress = step / steps
                setAnimatedStats({
                    influencers: Math.floor(200 * progress),
                    categories: Math.floor(15 * progress),
                    countries: Math.floor(50 * progress),
                    accuracy: Math.floor(99 * progress),
                })

                if (step >= steps) clearInterval(interval)
            }, stepDuration)
        }, 500)

        return () => clearTimeout(timer)
    }, [])

    return (
        <section className="pt-32 pb-24 px-4 text-center relative overflow-hidden">
            <div className="absolute inset-0 gradient-mesh"></div>
            <div className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full animate-float"></div>
            <div
                className="absolute top-40 right-20 w-16 h-16 bg-accent/10 rounded-full animate-float"
                style={{ animationDelay: "1s" }}
            ></div>

            <div className="container mx-auto max-w-4xl relative z-10">
                <div className="animate-slide-up">
                    <Badge
                        variant="secondary"
                        className="mb-8 px-6 py-3 text-sm font-medium bg-accent/10 text-accent border-accent/20"
                    >
                        <Sparkles className="w-4 h-4 mr-2" />
                        {animatedStats.influencers}+ Verified Creators
                    </Badge>

                    <h1 className="text-5xl md:text-7xl font-bold mb-8 text-balance leading-tight">
                        Discover & Connect with
                        <span className="block bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent">
                            Top Influencers
                        </span>
                    </h1>

                    <p className="text-xl md:text-2xl text-muted-foreground mb-12 text-pretty max-w-3xl mx-auto leading-relaxed">
                        The most comprehensive influencer directory with AI-powered search and smart matching tools.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
                        <Button
                            size="lg"
                            className="relative bg-gradient-to-r from-primary via-primary to-accent hover:from-primary/90 hover:via-primary/90 hover:to-accent/90 font-semibold text-lg px-10 py-5 rounded-2xl transition-all duration-500 hover:scale-110 hover:shadow-2xl hover:shadow-primary/50 group overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/20 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500"
                            onClick={() => router.push("/login")}
                        >
                            <div className="relative z-10 flex items-center">
                                <Play className="mr-3 h-6 w-6 transition-all duration-300 group-hover:scale-125 group-hover:rotate-12" />
                                Get Started
                                <ArrowRight className="ml-3 h-6 w-6 transition-all duration-300 group-hover:translate-x-2 group-hover:scale-125" />
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
                        </Button>

                        <Button
                            size="lg"
                            variant="outline"
                            className="relative text-lg px-10 py-5 rounded-2xl font-semibold transition-all duration-500 hover:scale-110 border-2 border-primary/50 hover:border-primary hover:bg-primary/5 hover:shadow-xl hover:shadow-accent/30 group backdrop-blur-sm bg-white/5"
                            onClick={() => router.push("/login")}
                        >
                            <div className="flex items-center">
                                <Sparkles className="mr-3 h-6 w-6 transition-all duration-300 group-hover:rotate-180 group-hover:scale-125 text-accent" />
                                View Demo
                                <div className="ml-3 w-2 h-2 bg-accent rounded-full animate-pulse group-hover:animate-bounce"></div>
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-r from-accent/10 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
                        </Button>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <div>
                            <div className="text-3xl font-bold text-primary">{animatedStats.influencers}</div>
                            <div className="text-sm text-muted-foreground">Influencers</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-accent">{animatedStats.categories}</div>
                            <div className="text-sm text-muted-foreground">Categories</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-primary">{animatedStats.countries}</div>
                            <div className="text-sm text-muted-foreground">Countries</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-accent">{animatedStats.accuracy}%</div>
                            <div className="text-sm text-muted-foreground">Accuracy</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
