"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Filter } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MasonryGrid } from "@/components/masonry-grid"
import { PostCard } from "@/components/post-card"

export default function DiscoverPage() {
  const [selectedFilter, setSelectedFilter] = useState("全部")
  const [posts, setPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const filters = ["全部", "双眼皮", "鼻综合", "热玛吉", "水光针", "脂肪填充", "激光美容"]

  // 模拟数据加载
  useEffect(() => {
    const loadPosts = async () => {
      setLoading(true)
      // 模拟API调用延迟
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const mockPosts = [
        {
          id: 1,
          title: "双眼皮恢复第30天记录",
          excerpt:
            "分享我的双眼皮手术恢复过程，从肿胀到自然的完整记录，希望能帮到准备做手术的姐妹们。整个过程虽然有些辛苦，但看到最终效果还是很满意的。",
          image: "/images/post1.png",
          author: "小美",
          avatar: "/images/avatar1.png",
          likes: 128,
          comments: 23,
          tags: ["双眼皮", "恢复记录"],
          time: "2小时前",
        },
        {
          id: 2,
          title: "热玛吉术后护理心得",
          excerpt: "做完热玛吉已经3个月了，效果很满意，分享一些护理经验和注意事项。",
          image: "/images/post2.png",
          author: "恢复小达人",
          avatar: "/images/avatar2.png",
          likes: 89,
          comments: 15,
          tags: ["热玛吉", "护理心得"],
          time: "5小时前",
        },
        {
          id: 3,
          title: "鼻综合手术6个月变化",
          excerpt:
            "从术后第一天到现在6个月的完整记录，包括肿胀期、恢复期的详细变化。每个阶段都有不同的感受和注意事项。",
          image: "/images/post3.png",
          author: "勇敢的小仙女",
          avatar: "/images/avatar3.png",
          likes: 256,
          comments: 42,
          tags: ["鼻综合", "恢复日记"],
          time: "1天前",
        },
        {
          id: 4,
          title: "水光针初体验分享",
          excerpt: "第一次尝试水光针，记录真实感受和效果变化。",
          image: "/images/post4.png",
          author: "护肤小白",
          avatar: "/images/avatar4.png",
          likes: 67,
          comments: 18,
          tags: ["水光针", "初体验"],
          time: "2天前",
        },
        {
          id: 5,
          title: "脂肪填充恢复全程记录",
          excerpt:
            "面部脂肪填充术后3个月，从肿胀期到稳定期的详细记录，包括护理要点和注意事项。分享给有需要的姐妹们参考。",
          image: "/images/post5.png",
          author: "小确幸",
          avatar: "/images/avatar5.png",
          likes: 145,
          comments: 31,
          tags: ["脂肪填充", "恢复过程"],
          time: "3天前",
        },
        {
          id: 6,
          title: "激光祛斑后护理指南",
          excerpt: "激光祛斑术后的护理要点和注意事项，避免踩雷，让效果更好。",
          image: "/images/post6.png",
          author: "斑点拜拜",
          avatar: "/images/avatar6.png",
          likes: 92,
          comments: 27,
          tags: ["激光祛斑", "护理指南"],
          time: "4天前",
        },
        {
          id: 7,
          title: "玻尿酸填充唇部经验",
          excerpt: "第一次做唇部玻尿酸，分享选择、过程和恢复的真实体验。",
          image: "/images/post4.png",
          author: "甜甜圈",
          avatar: "/images/avatar1.png",
          likes: 78,
          comments: 12,
          tags: ["玻尿酸", "唇部填充"],
          time: "5天前",
        },
        {
          id: 8,
          title: "肉毒素瘦脸针体验",
          excerpt: "打瘦脸针已经2个月了，效果和副作用的真实分享。",
          image: "/images/post2.png",
          author: "小脸蛋",
          avatar: "/images/avatar2.png",
          likes: 134,
          comments: 29,
          tags: ["肉毒素", "瘦脸针"],
          time: "1周前",
        },
        {
          id: 9,
          title: "线雕提升术后感受",
          excerpt: "做完线雕提升一个月了，分享真实的感受和效果变化。过程比想象中轻松一些。",
          image: "/images/post3.png",
          author: "紧致小仙女",
          avatar: "/images/avatar3.png",
          likes: 103,
          comments: 19,
          tags: ["线雕", "面部提升"],
          time: "1周前",
        },
        {
          id: 10,
          title: "超声刀初体验记录",
          excerpt: "第一次做超声刀，从咨询到术后的完整记录。",
          image: "/images/post5.png",
          author: "抗衰小达人",
          avatar: "/images/avatar4.png",
          likes: 87,
          comments: 16,
          tags: ["超声刀", "抗衰老"],
          time: "1周前",
        },
      ]

      setPosts(mockPosts)
      setLoading(false)
    }

    loadPosts()
  }, [selectedFilter])

  // 根据筛选条件过滤帖子
  const filteredPosts = posts.filter((post) => {
    if (selectedFilter === "全部") return true
    return post.tags.includes(selectedFilter)
  })

  if (loading) {
    return (
      <div className="min-h-screen animated-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-medium text-gray-800">发现</h1>
          </div>
          <MasonryGrid>
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="loading-shimmer rounded-2xl h-64 w-full"></div>
            ))}
          </MasonryGrid>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen animated-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Filter Bar */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-medium text-gray-800">发现</h1>
            <div className="hidden md:flex items-center space-x-2">
              {filters.map((filter) => (
                <Button
                  key={filter}
                  variant={selectedFilter === filter ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedFilter(filter)}
                  className={`rounded-full px-4 py-1.5 text-sm font-normal transition-all ${
                    selectedFilter === filter
                      ? "premium-button text-white shadow-sm"
                      : "glass-effect border-white/30 text-gray-600 hover:text-rose-600 hover:border-rose-200/80"
                  }`}
                >
                  {filter}
                </Button>
              ))}
            </div>
          </div>

          {/* Mobile Filter */}
          <div className="md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-full glass-effect border-white/30 bg-transparent"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  {selectedFilter}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {filters.map((filter) => (
                  <DropdownMenuItem key={filter} onClick={() => setSelectedFilter(filter)}>
                    {filter}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Posts Grid */}
        <MasonryGrid>
          {filteredPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </MasonryGrid>

        {/* 无结果提示 */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">暂无相关内容</p>
            <Button onClick={() => setSelectedFilter("全部")} variant="outline" className="rounded-full">
              查看全部内容
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
