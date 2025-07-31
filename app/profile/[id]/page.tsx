"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart, MessageCircle, Bookmark, Share2, Settings } from "lucide-react"

export default function ProfilePage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState("posts")

  const user = {
    id: params.id,
    name: "小美",
    avatar: "/placeholder.svg?height=80&width=80",
    bio: "记录我的变美之路 ✨ 分享真实的恢复经验",
    joinDate: "2023年8月",
    postsCount: 12,
    likesCount: 1248,
    followersCount: 89,
  }

  const userPosts = [
    {
      id: 1,
      title: "双眼皮恢复第30天记录",
      excerpt: "分享我的双眼皮手术恢复过程，从肿胀到自然的完整记录...",
      image: "/placeholder.svg?height=200&width=300",
      likes: 128,
      comments: 23,
      tags: ["双眼皮", "恢复记录"],
      time: "2小时前",
    },
    {
      id: 2,
      title: "选择双眼皮医生的经验分享",
      excerpt: "经过多方对比和咨询，最终选择了现在的医生，分享一些选择心得...",
      image: "/placeholder.svg?height=220&width=300",
      likes: 89,
      comments: 15,
      tags: ["双眼皮", "医生选择"],
      time: "3天前",
    },
    {
      id: 3,
      title: "术前准备和心理建设",
      excerpt: "做手术前的各种准备工作和心理调节，希望能帮到准备手术的姐妹们...",
      image: "/placeholder.svg?height=180&width=300",
      likes: 67,
      comments: 18,
      tags: ["术前准备", "心理建设"],
      time: "1周前",
    },
    {
      id: 4,
      title: "双眼皮术后化妆技巧",
      excerpt: "恢复期间如何化妆遮盖肿胀，以及完全恢复后的化妆技巧分享...",
      image: "/placeholder.svg?height=210&width=300",
      likes: 156,
      comments: 31,
      tags: ["化妆技巧", "恢复期"],
      time: "2周前",
    },
  ]

  const savedPosts = [
    {
      id: 5,
      title: "热玛吉术后护理心得",
      excerpt: "做完热玛吉已经3个月了，效果很满意，分享一些护理经验...",
      image: "/placeholder.svg?height=250&width=300",
      author: "恢复小达人",
      likes: 89,
      comments: 15,
      tags: ["热玛吉", "护理心得"],
    },
    {
      id: 6,
      title: "鼻综合手术6个月变化",
      excerpt: "从术后第一天到现在6个月的完整记录，包括肿胀期、恢复期的详细变化...",
      image: "/placeholder.svg?height=220&width=300",
      author: "勇敢的小仙女",
      likes: 256,
      comments: 42,
      tags: ["鼻综合", "恢复日记"],
    },
    {
      id: 7,
      title: "水光针初体验分享",
      excerpt: "第一次尝试水光针，记录真实感受和效果变化...",
      image: "/placeholder.svg?height=180&width=300",
      author: "护肤小白",
      likes: 67,
      comments: 18,
      tags: ["水光针", "初体验"],
    },
  ]

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Profile Header */}
      <Card className="border-0 shadow-sm rounded-2xl overflow-hidden bg-white/70 backdrop-blur-sm mb-8">
        <CardContent className="p-8">
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
            <img src={user.avatar || "/placeholder.svg"} alt={user.name} className="w-20 h-20 rounded-full" />
            <div className="flex-1">
              <div className="flex items-center space-x-4 mb-2">
                <h1 className="text-2xl font-bold text-gray-800">{user.name}</h1>
                {params.id === "me" && (
                  <Button variant="outline" size="sm" className="rounded-full bg-transparent">
                    <Settings className="w-4 h-4 mr-2" />
                    编辑资料
                  </Button>
                )}
              </div>
              <p className="text-gray-600 mb-4">{user.bio}</p>
              <div className="flex items-center space-x-6 text-sm text-gray-500">
                <span>加入于 {user.joinDate}</span>
                <div className="flex items-center space-x-4">
                  <span>
                    <strong className="text-gray-800">{user.postsCount}</strong> 发布
                  </span>
                  <span>
                    <strong className="text-gray-800">{user.likesCount}</strong> 获赞
                  </span>
                  <span>
                    <strong className="text-gray-800">{user.followersCount}</strong> 关注者
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 mb-8 bg-white/70 backdrop-blur-sm rounded-xl">
          <TabsTrigger
            value="posts"
            className="rounded-lg data-[state=active]:bg-rose-500 data-[state=active]:text-white"
          >
            我的发布
          </TabsTrigger>
          <TabsTrigger
            value="saved"
            className="rounded-lg data-[state=active]:bg-rose-500 data-[state=active]:text-white"
          >
            我的收藏
          </TabsTrigger>
        </TabsList>

        <TabsContent value="posts">
          <div className="masonry-grid">
            {userPosts.map((post) => (
              <div className="masonry-item" key={post.id}>
                <Card
                  key={post.id}
                  className="group cursor-pointer border-0 soft-shadow soft-shadow-hover card-hover rounded-2xl overflow-hidden bg-white/85 backdrop-blur-sm"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 right-3">
                      <Button
                        size="sm"
                        variant="secondary"
                        className="rounded-full w-8 h-8 p-0 bg-white/80 hover:bg-white"
                      >
                        <Bookmark className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs text-gray-400">{post.time}</span>
                    </div>
                    <h3 className="font-medium text-gray-800 mb-2 line-clamp-2">{post.title}</h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-3">{post.excerpt}</p>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {post.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="text-xs bg-rose-50 text-rose-600 hover:bg-rose-100 rounded-full"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1 hover:text-rose-500 cursor-pointer">
                          <Heart className="w-3.5 h-3.5" />
                          <span>{post.likes}</span>
                        </div>
                        <div className="flex items-center space-x-1 hover:text-blue-500 cursor-pointer">
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>{post.comments}</span>
                        </div>
                      </div>
                      <Button size="sm" variant="ghost" className="p-1 h-auto hover:text-gray-700">
                        <Share2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="saved">
          <div className="masonry-grid">
            {savedPosts.map((post) => (
              <div className="masonry-item" key={post.id}>
                <Card
                  key={post.id}
                  className="group cursor-pointer border-0 soft-shadow soft-shadow-hover card-hover rounded-2xl overflow-hidden bg-white/85 backdrop-blur-sm"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 right-3">
                      <Button
                        size="sm"
                        variant="secondary"
                        className="rounded-full w-8 h-8 p-0 bg-white/80 hover:bg-white"
                      >
                        <Bookmark className="w-4 h-4 fill-current text-rose-500" />
                      </Button>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2 mb-3">
                      <span className="text-sm text-gray-600">{post.author}</span>
                    </div>
                    <h3 className="font-medium text-gray-800 mb-2 line-clamp-2">{post.title}</h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-3">{post.excerpt}</p>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {post.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="text-xs bg-rose-50 text-rose-600 hover:bg-rose-100 rounded-full"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1 hover:text-rose-500 cursor-pointer">
                          <Heart className="w-3.5 h-3.5" />
                          <span>{post.likes}</span>
                        </div>
                        <div className="flex items-center space-x-1 hover:text-blue-500 cursor-pointer">
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>{post.comments}</span>
                        </div>
                      </div>
                      <Button size="sm" variant="ghost" className="p-1 h-auto hover:text-gray-700">
                        <Share2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
