"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/shared/components/ui/button"
import { Users, ArrowRight, LogOut, User } from "lucide-react"
import { useAuth, useAuthActions } from "@/shared/hooks"

export function Header() {
    const router = useRouter()
    const { isAuthenticated, user } = useAuth()
    const { handleLogout } = useAuthActions()

    const handleLogoutClick = async () => {
        try {
            await handleLogout()
            router.push('/')
        } catch (error) {
            console.error('Logout failed:', error)
        }
    }

    return (
        <header className="fixed top-0 w-full z-50 glassmorphism bg-background/80 border-b border-border/50">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <div className="flex items-center space-x-3 group">
                    <div className="relative">
                        <Users className="h-7 w-7 text-primary transition-transform group-hover:scale-110" />
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full animate-pulse"></div>
                    </div>
                    <span className="font-bold text-xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                        InfluencerHub
                    </span>
                </div>

                <div className="flex items-center space-x-3">
                    {isAuthenticated ? (
                        <>
                            <div className="flex items-center space-x-2 text-sm">
                                <User className="h-4 w-4" />
                                <span className="hidden sm:inline">{user?.email}</span>
                            </div>
                            <Button
                                onClick={() => router.push("/dashboard")}
                                variant="outline"
                                size="sm"
                            >
                                Dashboard
                            </Button>
                            <Button
                                onClick={handleLogoutClick}
                                variant="outline"
                                size="sm"
                                className="flex items-center gap-1"
                            >
                                <LogOut className="h-4 w-4" />
                                Logout
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button
                                onClick={() => router.push("/login")}
                                variant="outline"
                                size="sm"
                            >
                                Sign In
                            </Button>
                            <Button
                                onClick={() => router.push("/signup")}
                                className="bg-primary hover:bg-primary/90 transition-all duration-300 hover:scale-105 hover:shadow-lg group"
                                size="sm"
                            >
                                Get Started
                                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </header>
    )
}
