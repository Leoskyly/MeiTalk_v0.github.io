import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Heart, MessageCircle, Bookmark, Share2, Send, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function PostDetailPage({ params }: { params: { id: string } }) {
  const post = {
    id: params.id,
    title: "双眼皮恢复第30天记录 - 从肿胀到自然的完整过程",
    content: [
      {
        type: "text",
        content: "大家好，今天是我双眼皮手术后的第30天，想和大家分享一下这一个月来的恢复过程。",
      },
      {
        type: "image",
        src: "/images/post1.png",
        caption: "术后第1天 - 肿胀比较明显",
      },
      {
        type: "heading",
        content: "手术当天（第0天）",
      },
      {
        type: "text",
        content:
          "手术很顺利，医生技术很好，整个过程大概1小时左右。术后眼部有些肿胀，但疼痛感不强。医生给开了消炎药和眼药水。",
      },
      {
        type: "image",
        src: "/images/post2.png",
        caption: "术后第7天 - 开始消肿",
      },
      {
        type: "heading",
        content: "术后第1-7天（肿胀期）",
      },
      {
        type: "text",
        content:
          "这一周是最难熬的，眼部肿胀比较明显，看起来像香肠眼。每天都在冰敷，按医生要求服用消炎药。期间不能化妆，出门都要戴墨镜。",
      },
      {
        type: "list",
        items: ["每天冰敷3-4次，每次15分钟", "按时服用消炎药", "保持伤口干燥清洁", "避免用眼过度"],
      },
      {
        type: "image",
        src: "/images/post3.png",
        caption: "术后第15天 - 形状逐渐显现",
      },
      {
        type: "heading",
        content: "术后第8-15天（消肿期）",
      },
      {
        type: "text",
        content:
          "肿胀开始明显消退，双眼皮的形状逐渐显现。这个时候开始热敷，促进血液循环。可以开始淡妆了，但还是要小心护理。",
      },
      {
        type: "image",
        src: "/images/post4.png",
        caption: "术后第30天 - 基本恢复自然",
      },
      {
        type: "heading",
        content: "术后第16-30天（稳定期）",
      },
      {
        type: "text",
        content: "现在基本消肿了，双眼皮形状很自然，朋友们都说很好看。疤痕也在慢慢淡化，可以正常化妆了。",
      },
      {
        type: "heading",
        content: "护理心得总结",
      },
      {
        type: "list",
        items: [
          "前期一定要坚持冰敷，后期热敷",
          "不要用手揉眼睛，容易感染",
          "保持充足睡眠，有助恢复",
          "饮食清淡，避免辛辣刺激",
          "按时复查，听医生建议",
        ],
      },
      {
        type: "text",
        content: "希望我的经验能帮到准备做手术的姐妹们！有问题可以在评论区问我，我会尽量回复的～",
      },
    ],
    author: "小美",
    avatar: "/images/avatar1.png",
    publishTime: "2024-01-15 14:30",
    likes: 128,
    comments: 23,
    bookmarks: 45,
    tags: ["双眼皮", "恢复记录", "护理心得"],
  }

  const recommendedPosts = [
    {
      id: 2,
      title: "双眼皮术后化妆技巧",
      image: "/images/post2.png",
      author: "美妆达人",
      likes: 89,
    },
    {
      id: 3,
      title: "选择双眼皮医生的经验",
      image: "/images/post3.png",
      author: "过来人",
      likes: 156,
    },
    {
      id: 4,
      title: "双眼皮疤痕护理方法",
      image: "/images/post4.png",
      author: "护理小能手",
      likes: 67,
    },
  ]

  const comments = [
    {
      id: 1,
      author: "恢复小仙女",
      avatar: "/images/avatar2.png",
      content: "恢复得真好！我也是刚做完，现在第10天，还在肿胀期，看到你的分享很有信心了",
      time: "2小时前",
      likes: 12,
    },
    {
      id: 2,
      author: "美美哒",
      avatar: "/images/avatar3.png",
      content: "请问你是在哪里做的呀？医生技术真的很好，形状很自然",
      time: "5小时前",
      likes: 8,
    },
    {
      id: 3,
      author: "准备变美",
      avatar: "/images/avatar4.png",
      content: "谢谢分享！我正在考虑做双眼皮，你的记录很详细，很有参考价值",
      time: "1天前",
      likes: 15,
    },
  ]

  const renderContent = (item: any, index: number) => {
    switch (item.type) {
      case "heading":
        return (
          <h3 key={index} className="text-xl font-semibold text-gray-800 mt-8 mb-4">
            {item.content}
          </h3>
        )
      case "text":
        return (
          <p key={index} className="text-gray-700 leading-relaxed mb-4">
            {item.content}
          </p>
        )
      case "image":
        return (
          <div key={index} className="my-6">
            <div className="relative overflow-hidden rounded-2xl">
              <img src={item.src || "/placeholder.svg"} alt={item.caption} className="w-full object-cover" />
            </div>
            {item.caption && <p className="text-sm text-gray-500 text-center mt-2">{item.caption}</p>}
          </div>
        )
      case "list":
        return (
          <ul key={index} className="list-disc list-inside space-y-2 mb-4 text-gray-700">
            {item.items.map((listItem: string, listIndex: number) => (
              <li key={listIndex}>{listItem}</li>
            ))}
          </ul>
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen animated-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Back Button */}
        <div className="mb-6">
          <Link href="/discover">
            <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-800 rounded-full glass-effect">
              <ArrowLeft className="w-4 h-4 mr-2" />
              返回发现
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Card className="glass-card premium-shadow rounded-3xl overflow-hidden border-0">
              <CardContent className="p-8">
                {/* Author Info */}
                <div className="flex items-center space-x-4 mb-6">
                  <div className="relative">
                    <img
                      src={post.avatar || "/placeholder.svg"}
                      alt={post.author}
                      className="w-12 h-12 rounded-full ring-2 ring-white shadow-sm"
                    />
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full border-2 border-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{post.author}</h3>
                    <p className="text-sm text-gray-500">{post.publishTime}</p>
                  </div>
                </div>

                {/* Title */}
                <h1 className="text-3xl font-bold text-gray-800 mb-6 leading-relaxed">{post.title}</h1>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {post.tags.map((tag, index) => (
                    <Badge
                      key={tag}
                      className={`premium-badge text-sm rounded-full px-4 py-2 font-medium border-0 ${
                        index === 0
                          ? "bg-gradient-to-r from-rose-50 to-pink-50 text-rose-600"
                          : index === 1
                            ? "bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-600"
                            : "bg-gradient-to-r from-purple-50 to-violet-50 text-purple-600"
                      }`}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Content */}
                <div className="prose prose-gray max-w-none mb-8">
                  {post.content.map((item, index) => renderContent(item, index))}
                </div>

                {/* Actions */}
                <div className="premium-divider mb-6" />
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-6">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex items-center space-x-2 text-gray-600 hover:text-rose-500 rounded-2xl px-6 py-3 glass-effect"
                    >
                      <Heart className="w-5 h-5" />
                      <span className="font-medium">{post.likes}</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex items-center space-x-2 text-gray-600 hover:text-blue-500 rounded-2xl px-6 py-3 glass-effect"
                    >
                      <MessageCircle className="w-5 h-5" />
                      <span className="font-medium">{post.comments}</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex items-center space-x-2 text-gray-600 hover:text-yellow-500 rounded-2xl px-6 py-3 glass-effect"
                    >
                      <Bookmark className="w-5 h-5" />
                      <span className="font-medium">{post.bookmarks}</span>
                    </Button>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-600 hover:text-gray-800 rounded-2xl p-3 glass-effect"
                  >
                    <Share2 className="w-5 h-5" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Comments Section */}
            <Card className="mt-8 glass-card premium-shadow rounded-3xl overflow-hidden border-0">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-6">评论 ({comments.length})</h3>

                {/* Comment Input */}
                <div className="flex space-x-4 mb-8">
                  <img
                    src="/images/avatar5.png"
                    alt="我的头像"
                    className="w-10 h-10 rounded-full ring-2 ring-white shadow-sm"
                  />
                  <div className="flex-1">
                    <Textarea
                      placeholder="分享你的想法..."
                      className="min-h-[80px] premium-input rounded-2xl resize-none border-0"
                    />
                    <div className="flex justify-end mt-3">
                      <Button size="sm" className="premium-button text-white rounded-2xl px-6">
                        <Send className="w-4 h-4 mr-2" />
                        发布
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Comments List */}
                <div className="space-y-6">
                  {comments.map((comment) => (
                    <div key={comment.id} className="flex space-x-4">
                      <img
                        src={comment.avatar || "/placeholder.svg"}
                        alt={comment.author}
                        className="w-10 h-10 rounded-full ring-2 ring-white shadow-sm"
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <span className="font-semibold text-gray-800 text-sm">{comment.author}</span>
                          <span className="text-xs text-gray-400">{comment.time}</span>
                        </div>
                        <p className="text-gray-700 text-sm mb-3 leading-relaxed">{comment.content}</p>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-xs text-gray-500 hover:text-rose-500 p-0 h-auto"
                        >
                          <Heart className="w-3 h-3 mr-1" />
                          {comment.likes}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="glass-card premium-shadow rounded-3xl overflow-hidden border-0 sticky top-24">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">推荐阅读</h3>
                <div className="space-y-4">
                  {recommendedPosts.map((recPost) => (
                    <div key={recPost.id} className="flex space-x-3 cursor-pointer group">
                      <img
                        src={recPost.image || "/placeholder.svg"}
                        alt={recPost.title}
                        className="w-16 h-16 rounded-2xl object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-800 text-sm mb-1 line-clamp-2 group-hover:text-rose-600 leading-relaxed">
                          {recPost.title}
                        </h4>
                        <div className="flex items-center space-x-2 text-xs text-gray-500">
                          <span>{recPost.author}</span>
                          <span>•</span>
                          <div className="flex items-center space-x-1">
                            <Heart className="w-3 h-3" />
                            <span>{recPost.likes}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
