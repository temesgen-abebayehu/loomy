"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { User, LogOut, Wallet } from "lucide-react"

export function Navbar() {
  const { isAuthenticated, user, logout } = useAuth()
  const pathname = usePathname()

  const getDashboardLink = () => {
    if (!user) return "/profile"
    if (user.role === "admin") return "/admin/dashboard"
    if (user.role === "organizer") return "/organizer/dashboard"
    return "/profile"
  }

  const isActive = (path: string) => pathname === path

  return (
    <nav className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="text-2xl font-bold text-primary">
              Loomy
            </Link>
            <div className="hidden md:flex items-center gap-6">
              <Link
                href="/events"
                className={`text-sm font-medium transition-colors ${isActive("/events") ? "text-primary" : "text-muted-foreground hover:text-foreground"
                  }`}
              >
                Events
              </Link>
              <Link
                href="/about"
                className={`text-sm font-medium transition-colors ${isActive("/about") ? "text-primary" : "text-muted-foreground hover:text-foreground"
                  }`}
              >
                About
              </Link>
              <Link
                href="/contact"
                className={`text-sm font-medium transition-colors ${isActive("/contact") ? "text-primary" : "text-muted-foreground hover:text-foreground"
                  }`}
              >
                Contact
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {isAuthenticated && user ? (
              <>
                <div className="flex items-center gap-2 rounded-full bg-secondary px-3 py-1.5 text-sm font-medium">
                  <Wallet className="h-4 w-4 text-muted-foreground" />
                  <span>{user.walletBalance.toLocaleString()} Birr</span>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10">
                      <User className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <div className="px-2 py-1.5 text-sm font-medium">{user?.name}</div>
                    <div className="px-2 py-1.5 text-xs text-muted-foreground">{user?.email}</div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href={getDashboardLink()}>Dashboard</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/profile">Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout} className="text-destructive">
                      <LogOut className="mr-2 h-4 w-4" />
                      Log Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Button variant="ghost" asChild className="hover:text-primary">
                  <Link href="/auth">Log In</Link>
                </Button>
                <Button asChild className="btn-glow bg-primary hover:bg-primary/90 text-primary-foreground">
                  <Link href="/auth">Sign Up</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
