import { Button } from "@/components/ui/button"
import { MasonryGrid } from "@/components/masonry-grid"
import { PostCard } from "@/components/post-card"
import { Sparkles, TrendingUp, Users, Heart } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const featuredPosts = [
    {
      id: 1,
      title: "双眼皮恢复第30天记录",
      excerpt:
        "分享我的双眼皮手术恢复过程，从肿胀到自然的完整记录，每天的变化都有详细记录，希望能帮到准备做手术的姐妹们。",
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
      excerpt: "做完热玛吉已经3个月了，效果很满意，分享一些护理经验和注意事项，包括日常护肤步骤。",
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
      excerpt: "从术后第一天到现在6个月的完整记录，包括肿胀期、恢复期的详细变化，希望能帮到大家做参考。",
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
      title: "水光针体验分享",
      excerpt: "第一次尝试水光针，记录真实感受和效果变化，包括术前准备和术后护理的完整攻略。",
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
      title: "脂肪填充恢复全程",
      excerpt: "面部脂肪填充术后3个月，从肿胀期到稳定期的详细记录，分享护理心得和注意事项。",
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
      title: "激光祛斑后护理",
      excerpt: "激光祛斑术后的护理要点和注意事项，避免踩雷，让效果更好更持久。",
      image: "/images/post6.png",
      author: "斑点拜拜",
      avatar: "/images/avatar6.png",
      likes: 92,
      comments: 27,
      tags: ["激光祛斑", "护理指南"],
      time: "4天前",
    },
  ]

  return (
    <div className="min-h-screen animated-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Banner */}
        <div className="relative overflow-hidden rounded-3xl glass-effect mb-12 grid-background">
          {/* 背景图片 */}
          <div className="absolute inset-0">
            <img src="/images/hero-bg.png" alt="Hero Background" className="w-full h-full object-cover opacity-20" />
            <div className="absolute inset-0 bg-gradient-to-r from-rose-500/10 via-pink-500/5 to-purple-500/10" />
          </div>

          <div className="relative px-8 py-16 sm:px-12 sm:py-20">
            <div className="max-w-3xl">
              <div className="flex items-center space-x-3 mb-6">
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-6 h-6 text-rose-500 animate-pulse" />
                  <span className="text-sm font-medium text-rose-600 bg-rose-50/80 backdrop-blur-sm px-3 py-1 rounded-full border border-rose-200/50">
                    真实分享社区
                  </span>
                </div>
              </div>

              <h1 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight">
                <span className="gradient-text">分享真实的</span>
                <br />
                <span className="text-gray-800">恢复经验</span>
              </h1>

              <p className="text-xl text-gray-600/90 mb-8 leading-relaxed max-w-2xl">
                在这里，每一个恢复故事都值得被倾听。我们创造一个温柔、真实的空间，让你安心分享术后恢复的点点滴滴。
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link href="/discover">
                  <Button
                    size="lg"
                    className="premium-button text-white rounded-2xl px-8 py-4 text-lg font-semibold shadow-lg"
                  >
                    <Sparkles className="w-5 h-5 mr-2" />
                    开始探索
                  </Button>
                </Link>
                <Link href="/create">
                  <Button
                    variant="outline"
                    size="lg"
                    className="rounded-2xl px-8 py-4 text-lg font-semibold glass-effect border-white/30 text-gray-700 hover:text-rose-600 hover:border-rose-300 bg-white/20 backdrop-blur-sm"
                  >
                    <Heart className="w-5 h-5 mr-2" />
                    分享经验
                  </Button>
                </Link>
              </div>

              {/* 统计数据 */}
              <div className="flex items-center space-x-8 text-sm">
                <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-3 py-2">
                  <Users className="w-4 h-4 text-blue-500" />
                  <span className="text-gray-600">
                    <span className="font-semibold text-gray-800">10,000+</span> 用户
                  </span>
                </div>
                <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-3 py-2">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  <span className="text-gray-600">
                    <span className="font-semibold text-gray-800">50,000+</span> 分享
                  </span>
                </div>
                <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-3 py-2">
                  <Heart className="w-4 h-4 text-rose-500" />
                  <span className="text-gray-600">
                    <span className="font-semibold text-gray-800">200,000+</span> 点赞
                  </span>
                </div>
              </div>
            </div>

            {/* 装饰元素 */}
            <div className="absolute top-8 right-8 w-32 h-32 bg-gradient-to-br from-rose-400/20 to-pink-500/20 rounded-full blur-3xl float-animation" />
            <div
              className="absolute bottom-8 right-16 w-24 h-24 bg-gradient-to-br from-purple-400/20 to-blue-500/20 rounded-full blur-2xl float-animation"
              style={{ animationDelay: "2s" }}
            />
          </div>
        </div>

        {/* Featured Posts */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <h2 className="text-3xl font-bold text-gray-800">精选分享</h2>
              <div className="w-2 h-2 bg-gradient-to-r from-rose-400 to-pink-500 rounded-full animate-pulse" />
            </div>
            <Link href="/discover">
              <Button
                variant="ghost"
                className="text-rose-600 hover:text-rose-700 hover:bg-rose-50/80 rounded-2xl px-6 py-2 font-semibold glass-effect"
              >
                查看更多
                <TrendingUp className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>

          <MasonryGrid>
            {featuredPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </MasonryGrid>
        </div>
      </div>
    </div>
  )
}
