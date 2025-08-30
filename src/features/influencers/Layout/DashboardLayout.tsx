"use client"

import type React from "react"

import { useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/shared/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/shared/components/ui/sheet"
import { Users, Plus, Menu, Home, Settings,LogOut } from "lucide-react"
import { cn } from "@/shared/lib/utils"
import { ProtectedRoute } from "../../../shared/components/ProtectedRoute"
import { useAuth } from "../../../shared/hooks/useAuth"

const navigation = [
  {
    name: "All Influencers",
    href: "/influencers",
    icon: Users,
    exact: true,
  },
  {
    name: "Add New",
    href: "/influencers/new",
    icon: Plus,
    adminOnly: true,
  },
]

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const { logout, isAdmin } = useAuth()

  const handleLogout = async () => {
    await logout()
    router.push('/login')
  }

  const filteredNavigation = navigation.filter((item) => !item.adminOnly || isAdmin)

  const Sidebar = ({ mobile = false }: { mobile?: boolean }) => (
    <div
      className={cn(
        "flex flex-col bg-gradient-to-b from-white via-white to-slate-50/80 backdrop-blur-xl border-r border-slate-200/60 shadow-xl shadow-slate-900/5",
        mobile ? "w-full h-full" : "w-72 h-screen fixed top-0 z-50",
      )}
    >
      
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {filteredNavigation.map((item) => {
          const isActive = item.exact ? pathname === item.href : pathname.startsWith(item.href)

          return (
            <Button
              key={item.name}
              variant="ghost"
              className={cn(
                "w-full justify-start gap-3 h-12 px-4  font-medium transition-all duration-300 group relative overflow-hidden",
                isActive
                  ? "bg-gradient-to-r from-primary/10 to-accent/10 text-primary "
                  : "text-slate-700 hover:bg-gradient-to-r hover:from-slate-50 hover:to-slate-100/80 hover:text-slate-900 hover:shadow-md",
              )}
              onClick={() => {
                router.push(item.href)
                if (mobile) setSidebarOpen(false)
              }}
            >
              <div className="relative z-10 flex items-center gap-3">
                <item.icon className={cn("h-5 w-5 transition-colors duration-300", isActive ? "text-primary" : "text-slate-500 group-hover:text-primary")} />
                {item.name}
                {isActive && (
                  <div className="ml-auto w-2 h-2 bg-gradient-to-r from-primary to-accent rounded-full animate-pulse" />
                )}
              </div>
              {isActive && (
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl" />
              )}
            </Button>
          )
        })}
      </nav>

      <div className="p-4 border-t border-slate-200/60 bg-gradient-to-t from-slate-50/50 to-white/50">
        <div className="space-y-2">
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 h-11 text-slate-600 hover:text-slate-900 hover:bg-white/80 rounded-xl font-medium transition-all duration-300 group"
            onClick={() => router.push("/")}
          >
            <Home className="h-4 w-4 transition-colors group-hover:text-primary" />
            Back to Home
          </Button>
          {isAdmin && (
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 h-11 text-slate-600 hover:text-slate-900 hover:bg-white/80 rounded-xl font-medium transition-all duration-300 group"
              onClick={() => router.push("/settings")}
            >
              <Settings className="h-4 w-4 transition-colors group-hover:text-primary" />
              Settings
            </Button>
          )}
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 h-11 text-slate-600 hover:bg-red-50 hover:text-red-600 rounded-xl font-medium transition-all duration-300 group"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4 transition-colors group-hover:text-red-600" />
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  )

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100/50 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(59,130,246,0.15)_1px,transparent_0)] bg-[length:20px_20px]" />
        </div>

        <div className="flex relative z-10">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block">
            <Sidebar />
          </aside>

          {/* Mobile Sidebar */}
          <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="lg:hidden fixed top-4 left-4 z-50 bg-white/90 backdrop-blur-xl border-slate-200/60 shadow-xl shadow-slate-900/10 hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 rounded-xl"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-72 bg-white/95 backdrop-blur-xl border-r border-slate-200/60">
              <Sidebar mobile />
            </SheetContent>
          </Sheet>

          {/* Main Content */}
          <main className="flex-1 min-h-screen lg:ml-72">
            <div className="container mx-auto">
              <div className="min-h-screen">
                <div className="p-8 animate-slide-up">
                  {children}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  )
}
