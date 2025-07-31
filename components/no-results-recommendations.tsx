"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Users, Sparkles } from "lucide-react"
import Link from "next/link"

interface NoResultsRecommendationsProps {
  searchQuery: string
  onSearchClick: (term: string) => void
}

export function NoResultsRecommendations({ searchQuery, onSearchClick }: NoResultsRecommendationsProps) {
  const recommendedTopics = [
    { name: "双眼皮恢复", count: "1.2k", category: "双眼皮" },
    { name: "热玛吉效果", count: "856", category: "热玛吉" },
    { name: "鼻综合经验", count: "743", category: "鼻综合" },
    { name: "水光针护理", count: "621", category: "水光针" },
    { name: "激光祛斑", count: "534", category: "激光美容" },
    { name: "脂肪填充", count: "467", category: "脂肪填充" },
  ]

  const popularPosts = [
    {
      id: 1,
      title: "新手必看：医美项目选择指南",
      author: "美丽顾问",
      likes: 892,
      category: "指南",
    },
    {
      id: 2,
      title: "术后护理的10个关键要点",
      author: "护理专家",
      likes: 756,
      category: "护理",
    },
    {
      id: 3,
      title: "如何选择靠谱的医美机构",
      author: "经验分享者",
      likes: 634,
      category: "选择",
    },
  ]

  return (
    <div className="mt-12 space-y-8">
      {/* 推荐话题 */}
      <Card className="border-0 soft-shadow rounded-2xl overflow-hidden bg-white/85 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-lg">
            <TrendingUp className="w-5 h-5 text-rose-500" />
            <span>热门话题推荐</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recommendedTopics.map((topic) => (
              <button
                key={topic.name}
                onClick={() => onSearchClick(topic.name)}
                className="p-4 rounded-xl border border-gray-100/80 hover:bg-rose-50/50 hover:border-rose-200/80 cursor-pointer transition-all text-left group"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-800 group-hover:text-rose-600 transition-colors">
                      {topic.name}
                    </h4>
                    <p className="text-sm text-gray-500 mt-1">{topic.category}</p>
                  </div>
                  <Badge className="bg-rose-50 text-rose-600 border-0 text-xs">{topic.count}</Badge>
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 推荐阅读 */}
      <Card className="border-0 soft-shadow rounded-2xl overflow-hidden bg-white/85 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-lg">
            <Sparkles className="w-5 h-5 text-blue-500" />
            <span>推荐阅读</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {popularPosts.map((post) => (
              <Link key={post.id} href={`/post/${post.id}`}>
                <div className="p-4 rounded-xl border border-gray-100/80 hover:bg-gray-50/50 hover:border-gray-200/80 cursor-pointer transition-all group">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-800 group-hover:text-rose-600 transition-colors mb-1">
                        {post.title}
                      </h4>
                      <div className="flex items-center space-x-3 text-sm text-gray-500">
                        <span>{post.author}</span>
                        <span>•</span>
                        <span>{post.likes} 点赞</span>
                        <Badge variant="secondary" className="text-xs">
                          {post.category}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 社区统计 */}
      <Card className="border-0 soft-shadow rounded-2xl overflow-hidden bg-gradient-to-r from-rose-50/60 via-pink-25/40 to-blue-50/30">
        <CardContent className="p-8 text-center">
          <Users className="w-12 h-12 text-rose-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">加入 MeiTalk 社区</h3>
          <p className="text-gray-600 mb-6 leading-relaxed">
            已有 <span className="font-semibold text-rose-600">10,000+</span> 位用户分享了她们的恢复经验
            <br />
            <span className="font-semibold text-rose-600">50,000+</span> 篇真实的恢复记录等你发现
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/create">
              <Button className="bg-rose-400/90 hover:bg-rose-500/90 text-white rounded-full px-6">分享我的经验</Button>
            </Link>
            <Link href="/discover">
              <Button
                variant="outline"
                className="rounded-full px-6 bg-white/60 border-rose-200/80 text-rose-600 hover:bg-rose-50/80"
              >
                浏览更多内容
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
