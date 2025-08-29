"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/shared/components/ui/button"
import { Sparkles, Play, Target } from "lucide-react"

export function CTASection() {
    const router = useRouter()

    return (
        <section className="py-20 px-4 bg-gradient-to-br from-primary via-primary to-accent text-primary-foreground relative overflow-hidden">
            <div className="container mx-auto max-w-5xl text-center relative z-10">
                <div className="animate-float">
                    <Sparkles className="h-16 w-16 mx-auto mb-8 text-primary-foreground/80" />
                </div>
                <h2 className="text-4xl md:text-6xl font-bold mb-8 text-balance">
                    Ready to Transform Your
                    <span className="block">Influencer Strategy?</span>
                </h2>
                <p className="text-xl text-muted-foreground mb-12 opacity-90 max-w-3xl mx-auto leading-relaxed">
                    Join thousands of brands and agencies using InfluencerHub to discover, connect, and collaborate with the
                    world&apos;s top creators
                </p>
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                    <Button
                        size="lg"
                        variant="secondary"
                        className="text-lg px-10 py-4 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl bg-white text-primary hover:bg-white/90 group"
                        onClick={() => router.push("/login")}
                    >
                        <Play className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
                        Start Free Trial
                    </Button>
                    <Button
                        size="lg"
                        variant="outline"
                        className="text-lg px-10 py-4 rounded-xl transition-all duration-300 hover:scale-105 border-2 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 group bg-transparent"
                        onClick={() => router.push("/login")}
                    >
                        <Target className="mr-2 h-5 w-5 transition-transform group-hover:rotate-12" />
                        Schedule Demo
                    </Button>
                </div>
            </div>
        </section>
    )
}
