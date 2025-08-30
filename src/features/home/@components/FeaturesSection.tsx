"use client"

import { Card, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card"
import { Users, Filter, BarChart3, Globe } from "lucide-react"

interface Feature {
    icon: React.ComponentType<{ className?: string }>
    title: string
    description: string
    color: string
}

const features: Feature[] = [
    {
        icon: Users,
        title: "Verified Creators",
        description: "Access 200+ verified influencers across all major platforms and niches",
        color: "text-primary",
    },
    {
        icon: Filter,
        title: "Smart Filtering",
        description: "Advanced filtering by platform, followers, engagement rate, and location",
        color: "text-accent",
    },
    {
        icon: BarChart3,
        title: "Analytics Dashboard",
        description: "Comprehensive metrics and performance insights for data-driven decisions",
        color: "text-primary",
    },
    {
        icon: Globe,
        title: "Global Network",
        description: "Access creators worldwide across all major platforms and emerging channels",
        color: "text-accent",
    },
]

export function FeaturesSection() {
    return (
        <section className="py-20 px-4">
            <div className="container mx-auto max-w-6xl text-center">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">Why Choose InfluencerHub?</h2>
                <p className="text-xl text-muted-foreground mb-16 max-w-2xl mx-auto">
                    Everything you need to find and connect with the perfect influencers
                </p>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <Card
                            key={feature.title}
                            className="glassmorphism bg-card/50 border-border/50 hover:border-primary/30 transition-all duration-500 hover:scale-105 hover:shadow-2xl group cursor-pointer"
                            style={{ animationDelay: `${0.1 * index}s` }}
                        >
                            <CardHeader className="pb-4">
                                <div
                                    className={`w-12 h-12 rounded-xl bg-gradient-to-br from-${feature.color.split("-")[1]}/10 to-${feature.color.split("-")[1]}/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                                >
                                    <feature.icon className={`h-6 w-6 ${feature.color}`} />
                                </div>
                                <CardTitle className="text-xl group-hover:text-primary transition-colors duration-300">
                                    {feature.title}
                                </CardTitle>
                                <CardDescription className="text-base leading-relaxed">{feature.description}</CardDescription>
                            </CardHeader>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}
