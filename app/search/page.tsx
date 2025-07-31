"use client"

import React from "react"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, TrendingUp, Clock, Users, ArrowUpDown } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useSearchParams, useRouter } from "next/navigation"
import { MasonryGrid } from "@/components/masonry-grid"
import { PostCard } from "@/components/post-card"
import Link from "next/link"
import { NoResultsRecommendations } from "@/components/no-results-recommendations"

export default function SearchPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("全部")
  const [sortBy, setSortBy] = useState("最新")
  const [isSearching, setIsSearching] = useState(false)
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [hasSearched, setHasSearched] = useState(false)

  const categories = ["全部", "双眼皮", "鼻综合", "热玛吉", "水光针", "脂肪填充", "激光美容"]
  const sortOptions = ["最新", "最热", "最多点赞", "最多评论"]

  const hotSearches = [
    "双眼皮恢复",
    "热玛吉效果",
    "鼻综合经验",
    "水光针护理",
    "激光祛斑",
    "脂肪填充",
    "术后护理",
    "医生推荐",
  ]

  const recentSearches = ["双眼皮术后化妆", "热玛吉多久见效", "鼻综合恢复期"]

  // 模拟搜索结果数据
  const mockSearchResults = [
    {
      id: 1,
      title: "双眼皮恢复第30天记录",
      excerpt: "分享我的双眼皮手术恢复过程，从肿胀到自然的完整记录，希望能帮到准备做手术的姐妹们...",
      image: "/placeholder.svg?height=200&width=300",
      author: "小美",
      avatar: "/placeholder.svg?height=24&width=24",
      likes: 128,
      comments: 23,
      tags: ["双眼皮", "恢复记录"],
      time: "2小时前",
    },
    {
      id: 2,
      title: "热玛吉术后护理心得",
      excerpt: "做完热玛吉已经3个月了，效果很满意，分享一些护理经验和注意事项...",
      image: "/placeholder.svg?height=240&width=300",
      author: "恢复小达人",
      avatar: "/placeholder.svg?height=24&width=24",
      likes: 89,
      comments: 15,
      tags: ["热玛吉", "护理心得"],
      time: "5小时前",
    },
    {
      id: 3,
      title: "鼻综合手术6个月变化",
      excerpt: "从术后第一天到现在6个月的完整记录，包括肿胀期、恢复期的详细变化...",
      image: "/placeholder.svg?height=280&width=300",
      author: "勇敢的小仙女",
      avatar: "/placeholder.svg?height=24&width=24",
      likes: 256,
      comments: 42,
      tags: ["鼻综合", "恢复日记"],
      time: "1天前",
    },
    {
      id: 4,
      title: "水光针初体验分享",
      excerpt: "第一次尝试水光针，记录真实感受和效果变化，以及一些小贴士...",
      image: "/placeholder.svg?height=220&width=300",
      author: "护肤小白",
      avatar: "/placeholder.svg?height=24&width=24",
      likes: 67,
      comments: 18,
      tags: ["水光针", "初体验"],
      time: "2天前",
    },
    {
      id: 5,
      title: "脂肪填充面部恢复记录",
      excerpt: "面部脂肪填充术后的完整恢复过程，包括肿胀期护理和最终效果...",
      image: "/placeholder.svg?height=260&width=300",
      author: "小确幸",
      avatar: "/placeholder.svg?height=24&width=24",
      likes: 145,
      comments: 31,
      tags: ["脂肪填充", "恢复过程"],
      time: "3天前",
    },
    {
      id: 6,
      title: "激光祛斑完整攻略",
      excerpt: "激光祛斑从选择到恢复的完整攻略，包括术前准备、术后护理等...",
      image: "/placeholder.svg?height=200&width=300",
      author: "斑点拜拜",
      avatar: "/placeholder.svg?height=24&width=24",
      likes: 92,
      comments: 27,
      tags: ["激光祛斑", "护理指南"],
      time: "4天前",
    },
    {
      id: 7,
      title: "玻尿酸唇部填充经验",
      excerpt: "玻尿酸唇部填充的真实体验，从选择医生到术后护理的完整分享...",
      image: "/placeholder.svg?height=240&width=300",
      author: "甜甜圈",
      avatar: "/placeholder.svg?height=24&width=24",
      likes: 78,
      comments: 12,
      tags: ["玻尿酸", "唇部填充"],
      time: "5天前",
    },
    {
      id: 8,
      title: "肉毒素瘦脸针真实效果",
      excerpt: "肉毒素瘦脸针2个月效果记录，包括注射过程、恢复期和最终效果...",
      image: "/placeholder.svg?height=220&width=300",
      author: "小脸蛋",
      avatar: "/placeholder.svg?height=24&width=24",
      likes: 134,
      comments: 29,
      tags: ["肉毒素", "瘦脸针"],
      time: "1周前",
    },
  ]

  // 使用 useCallback 防止重复渲染
  const performSearch = useCallback(async (query: string) => {
    if (!query.trim()) {
      setSearchResults([])
      setHasSearched(false)
      return
    }

    setIsSearching(true)
    setHasSearched(true)

    try {
      // 模拟搜索API调用
      await new Promise((resolve) => setTimeout(resolve, 800))

      // 更智能的搜索匹配
      const searchTerms = query
        .toLowerCase()
        .split(" ")
        .filter((term) => term.length > 0)

      const filtered = mockSearchResults.filter((post) => {
        const searchableText = `${post.title} ${post.excerpt} ${post.tags.join(" ")} ${post.author}`.toLowerCase()

        // 检查是否包含任何搜索词
        return (
          searchTerms.some((term) => searchableText.includes(term)) ||
          // 或者标签完全匹配
          post.tags.some((tag) => searchTerms.some((term) => tag.toLowerCase().includes(term)))
        )
      })

      setSearchResults(filtered)
    } catch (error) {
      console.error("搜索出错:", error)
      setSearchResults([])
    } finally {
      setIsSearching(false)
    }
  }, [])

  const handleSearch = useCallback(
    (query: string = searchQuery) => {
      if (!query.trim()) return

      // 更新URL，但不触发重新搜索
      const newUrl = `/search?q=${encodeURIComponent(query.trim())}`
      if (window.location.pathname + window.location.search !== newUrl) {
        router.push(newUrl, { scroll: false })
      }

      performSearch(query)
    },
    [searchQuery, router, performSearch],
  )

  const handleKeyPress = (e: any) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  const handleHotSearchClick = useCallback(
    (term: string) => {
      setSearchQuery(term)
      setSelectedCategory("全部")
      handleSearch(term)
    },
    [handleSearch],
  )

  // 初始化搜索参数
  useEffect(() => {
    const query = searchParams?.get("q")
    if (query && query !== searchQuery) {
      setSearchQuery(query)
      performSearch(query)
    }
  }, [searchParams, searchQuery, performSearch])

  // 排序和过滤搜索结果
  const processedResults = React.useMemo(() => {
    let results = [...searchResults]

    // 排序
    results.sort((a, b) => {
      switch (sortBy) {
        case "最热":
          return b.likes + b.comments - (a.likes + a.comments)
        case "最多点赞":
          return b.likes - a.likes
        case "最多评论":
          return b.comments - a.comments
        default: // 最新
          return new Date(b.time).getTime() - new Date(a.time).getTime()
      }
    })

    // 按分类过滤
    if (selectedCategory !== "全部") {
      results = results.filter((post) => post.tags.includes(selectedCategory))
    }

    return results
  }, [searchResults, sortBy, selectedCategory])

  // 判断是否显示搜索建议
  const showSearchSuggestions = !searchQuery && !isSearching && !hasSearched

  // 判断是否显示搜索结果区域
  const showSearchResults = searchQuery || isSearching || hasSearched

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Search Header */}
      <div className="mb-8">
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            placeholder="搜索经验分享、护理心得..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            className="pl-12 pr-4 py-3 text-lg border-gray-200/80 rounded-2xl focus:border-rose-300 focus:ring-rose-200 bg-white/70 backdrop-blur-sm"
          />
          <Button
            onClick={() => handleSearch()}
            disabled={!searchQuery.trim() || isSearching}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-rose-400/90 hover:bg-rose-500/90 text-white rounded-xl px-6 disabled:opacity-50"
          >
            {isSearching ? "搜索中..." : "搜索"}
          </Button>
        </div>

        {/* Search Suggestions - Show when no search query */}
        {showSearchSuggestions && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Hot Searches */}
            <Card className="border-0 soft-shadow rounded-2xl overflow-hidden bg-white/85 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <TrendingUp className="w-5 h-5 text-rose-500" />
                  <h3 className="font-semibold text-gray-800">热门搜索</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {hotSearches.map((term) => (
                    <Button
                      key={term}
                      variant="outline"
                      size="sm"
                      onClick={() => handleHotSearchClick(term)}
                      className="rounded-full border-gray-200/80 text-gray-600 hover:bg-rose-50/80 hover:border-rose-200/80 bg-white/60"
                    >
                      {term}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Searches */}
            <Card className="border-0 soft-shadow rounded-2xl overflow-hidden bg-white/85 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <Clock className="w-5 h-5 text-blue-500" />
                  <h3 className="font-semibold text-gray-800">最近搜索</h3>
                </div>
                <div className="space-y-2">
                  {recentSearches.map((term) => (
                    <Button
                      key={term}
                      variant="ghost"
                      size="sm"
                      onClick={() => handleHotSearchClick(term)}
                      className="w-full justify-start text-gray-600 hover:bg-gray-50/80 rounded-lg"
                    >
                      {term}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Filters - Show when searching */}
        {showSearchResults && (
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-700">分类：</span>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className={`rounded-full ${
                      selectedCategory === category
                        ? "bg-rose-400/90 hover:bg-rose-500/90 text-white"
                        : "border-gray-200/80 text-gray-600 hover:bg-gray-50/80 bg-white/60"
                    }`}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-700">排序：</span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="rounded-full bg-white/60 border-gray-200/80">
                    <ArrowUpDown className="w-4 h-4 mr-2" />
                    {sortBy}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {sortOptions.map((option) => (
                    <DropdownMenuItem key={option} onClick={() => setSortBy(option)}>
                      {option}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        )}
      </div>

      {/* Search Results */}
      {showSearchResults && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-800">
              {isSearching ? "搜索中..." : `搜索结果 (${processedResults.length})`}
            </h2>
          </div>

          {isSearching ? (
            <MasonryGrid>
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="loading-shimmer rounded-2xl h-64 w-full"></div>
              ))}
            </MasonryGrid>
          ) : processedResults.length > 0 ? (
            <MasonryGrid>
              {processedResults.map((result) => (
                <PostCard key={result.id} post={result} searchQuery={searchQuery} />
              ))}
            </MasonryGrid>
          ) : hasSearched ? (
            <div>
              {/* 无搜索结果页面 */}
              <div className="text-center py-16">
                <div className="max-w-md mx-auto">
                  {/* 无结果图标 */}
                  <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                    <Search className="w-12 h-12 text-gray-400" />
                  </div>

                  {/* 主要提示信息 */}
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">没有找到相关内容</h3>
                  <p className="text-gray-600 mb-8 leading-relaxed">
                    抱歉，没有找到与 "<span className="font-medium text-gray-800">{searchQuery}</span>" 相关的内容。
                    <br />
                    试试调整搜索词或浏览推荐内容吧～
                  </p>

                  {/* 搜索建议 */}
                  <div className="mb-8">
                    <h4 className="text-sm font-medium text-gray-700 mb-4">搜索建议：</h4>
                    <div className="text-sm text-gray-600 space-y-2 text-left bg-gray-50/80 rounded-xl p-4">
                      <div className="flex items-start space-x-2">
                        <span className="text-rose-500 mt-0.5">•</span>
                        <span>检查搜索词是否拼写正确</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <span className="text-rose-500 mt-0.5">•</span>
                        <span>尝试使用更简单的关键词</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <span className="text-rose-500 mt-0.5">•</span>
                        <span>使用相关的医美项目名称</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <span className="text-rose-500 mt-0.5">•</span>
                        <span>试试搜索"恢复"、"经验"、"分享"等词</span>
                      </div>
                    </div>
                  </div>

                  {/* 热门搜索推荐 */}
                  <div className="mb-8">
                    <h4 className="text-sm font-medium text-gray-700 mb-4">试试这些热门搜索：</h4>
                    <div className="flex flex-wrap justify-center gap-2">
                      {hotSearches.slice(0, 6).map((term) => (
                        <Button
                          key={term}
                          variant="outline"
                          size="sm"
                          onClick={() => handleHotSearchClick(term)}
                          className="rounded-full border-rose-200/80 text-rose-600 hover:bg-rose-50/80 hover:border-rose-300/80 bg-white/60"
                        >
                          {term}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* 操作按钮 */}
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button
                      onClick={() => {
                        setSearchQuery("")
                        setSearchResults([])
                        setSelectedCategory("全部")
                        setHasSearched(false)
                        router.push("/search", { scroll: false })
                      }}
                      variant="outline"
                      className="rounded-full px-6 bg-white/60 border-gray-200/80"
                    >
                      重新搜索
                    </Button>
                    <Link href="/discover">
                      <Button className="bg-rose-400/90 hover:bg-rose-500/90 text-white rounded-full px-6">
                        浏览发现页
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>

              {/* 推荐内容 */}
              <NoResultsRecommendations searchQuery={searchQuery} onSearchClick={handleHotSearchClick} />
            </div>
          ) : null}
        </div>
      )}

      {/* Popular Topics - Show when no search */}
      {showSearchSuggestions && (
        <Card className="border-0 soft-shadow rounded-2xl overflow-hidden bg-white/85 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2 mb-6">
              <Users className="w-5 h-5 text-purple-500" />
              <h3 className="text-lg font-semibold text-gray-800">热门话题</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { topic: "双眼皮恢复日记", count: "1.2k", color: "bg-rose-50 text-rose-600" },
                { topic: "热玛吉真实效果", count: "856", color: "bg-blue-50 text-blue-600" },
                { topic: "鼻综合选择医生", count: "743", color: "bg-purple-50 text-purple-600" },
                { topic: "水光针护理心得", count: "621", color: "bg-green-50 text-green-600" },
                { topic: "激光祛斑经验", count: "534", color: "bg-yellow-50 text-yellow-600" },
                { topic: "脂肪填充恢复", count: "467", color: "bg-pink-50 text-pink-600" },
              ].map((item) => (
                <button
                  key={item.topic}
                  onClick={() => handleHotSearchClick(item.topic)}
                  className="p-4 rounded-xl border border-gray-100/80 hover:bg-gray-50/50 cursor-pointer transition-colors text-left"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-800 text-sm">{item.topic}</span>
                    <Badge className={`${item.color} border-0 text-xs`}>{item.count}</Badge>
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
