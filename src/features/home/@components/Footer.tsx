"use client"

import { Users, Heart, Twitter, Instagram, Youtube, Linkedin } from "lucide-react"

export function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="py-8 px-4 border-t border-border/30 bg-gradient-to-r from-primary/5 to-accent/5">
            <div className="container mx-auto max-w-6xl">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="flex items-center space-x-3 mb-4 md:mb-0 group">
                        <div className="relative">
                            <Users className="h-8 w-8 text-primary transition-transform group-hover:scale-110" />
                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full animate-pulse"></div>
                        </div>
                        <span className="font-bold text-2xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                            InfluencerHub
                        </span>
                    </div>

                    <div className="flex items-center space-x-6 mb-4 md:mb-0">
                        <a
                            href="https://twitter.com/influencerhub"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-primary transition-colors duration-200 hover:scale-110"
                            aria-label="Follow us on Twitter"
                        >
                            <Twitter className="w-5 h-5" />
                        </a>
                        <a
                            href="https://instagram.com/influencerhub"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-primary transition-colors duration-200 hover:scale-110"
                            aria-label="Follow us on Instagram"
                        >
                            <Instagram className="w-5 h-5" />
                        </a>
                        <a
                            href="https://youtube.com/influencerhub"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-primary transition-colors duration-200 hover:scale-110"
                            aria-label="Subscribe to our YouTube channel"
                        >
                            <Youtube className="w-5 h-5" />
                        </a>
                        <a
                            href="https://linkedin.com/company/influencerhub"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-primary transition-colors duration-200 hover:scale-110"
                            aria-label="Connect with us on LinkedIn"
                        >
                            <Linkedin className="w-5 h-5" />
                        </a>
                    </div>

                    <div className="text-muted-foreground text-center md:text-right">
                        <p className="flex items-center justify-center md:justify-end space-x-2">
                            <span>© {currentYear} InfluencerHub.</span>
                            <span>Made with</span>
                            <Heart className="w-4 h-4 text-red-500 animate-pulse" />
                            <span>for creators worldwide</span>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    )
}
