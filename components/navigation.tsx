"use client"

import type React from "react"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"
import { Home, Compass, PlusCircle, User, Search, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Navigation() {
  const pathname = usePathname()
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")

  const navItems = [
    { href: "/", label: "首页", icon: Home },
    { href: "/discover", label: "发现", icon: Compass },
    { href: "/create", label: "发帖", icon: PlusCircle },
    { href: "/profile/me", label: "我的", icon: User },
  ]

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  return (
    <nav className="sticky top-0 z-50 premium-nav">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-rose-400 via-pink-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 pulse-glow">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
            </div>
            <span className="text-2xl font-bold gradient-text">MeiTalk</span>
          </Link>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="relative w-full">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 z-10" />
              <Input
                placeholder="搜索经验分享..."
                value={searchQuery}
                onChange={handleSearchInputChange}
                className="pl-12 pr-4 py-3 premium-input rounded-2xl border-0 text-gray-700 placeholder-gray-500"
              />
            </form>
          </div>

          {/* Navigation Items */}
          <div className="flex items-center space-x-2">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`flex items-center space-x-2 rounded-2xl px-4 py-2 transition-all duration-300 ${
                      isActive
                        ? "glass-effect text-rose-600 shadow-lg"
                        : "text-gray-600 hover:text-gray-800 hover:glass-effect"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="hidden sm:inline font-medium">{item.label}</span>
                  </Button>
                </Link>
              )
            })}
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden pb-4">
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 z-10" />
            <Input
              placeholder="搜索经验分享..."
              value={searchQuery}
              onChange={handleSearchInputChange}
              className="pl-12 pr-4 py-3 premium-input rounded-2xl border-0 text-gray-700 placeholder-gray-500"
            />
          </form>
        </div>
      </div>
    </nav>
  )
}
