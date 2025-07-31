"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heart, MessageCircle, Bookmark, Share2 } from "lucide-react"
import Link from "next/link"

interface PostCardProps {
  post: {
    id: number
    title: string
    excerpt: string
    image: string
    author: string
    avatar: string
    likes: number
    comments: number
    tags: string[]
    time: string
  }
  searchQuery?: string
}

export function PostCard({ post, searchQuery }: PostCardProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [likeCount, setLikeCount] = useState(post.likes)

  // 随机生成卡片高度，模拟真实内容的不同长度
  const getRandomHeight = () => {
    const heights = [200, 240, 280, 320, 360, 400]
    return heights[Math.floor(Math.random() * heights.length)]
  }

  const [imageHeight] = useState(getRandomHeight())

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsLiked(!isLiked)
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1))
  }

  const handleBookmark = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsBookmarked(!isBookmarked)
  }

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    // 分享逻辑
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: `/post/${post.id}`,
      })
    } else {
      // 复制链接到剪贴板
      navigator.clipboard.writeText(`${window.location.origin}/post/${post.id}`)
    }
  }

  // 高亮搜索关键词
  const highlightText = (text: string, query?: string) => {
    if (!query) return text

    const regex = new RegExp(`(${query})`, "gi")
    const parts = text.split(regex)

    return parts.map((part, index) =>
      regex.test(part) ? (
        <span key={index} className="search-highlight">
          {part}
        </span>
      ) : (
        part
      ),
    )
  }

  return (
    <Link href={`/post/${post.id}`}>
      <Card className="group glass-card card-hover rounded-3xl overflow-hidden border-0 premium-shadow premium-shadow-hover">
        <div className="relative overflow-hidden">
          <img
            src={post.image || "/placeholder.svg"}
            alt={post.title}
            className="w-full object-cover image-hover"
            style={{ height: `${imageHeight}px` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
            <Button
              size="sm"
              onClick={handleBookmark}
              className={`rounded-2xl w-10 h-10 p-0 glass-effect shadow-lg transition-all duration-300 ${
                isBookmarked
                  ? "bg-gradient-to-r from-rose-500 to-pink-600 text-white shadow-rose-500/25"
                  : "text-gray-600 hover:text-rose-500"
              }`}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? "fill-current" : ""}`} />
            </Button>
          </div>
          {/* 高级装饰元素 */}
          <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">
            <div className="w-2 h-2 bg-gradient-to-r from-rose-400 to-pink-500 rounded-full animate-pulse" />
          </div>
        </div>

        <CardContent className="p-5">
          <h3 className="font-semibold text-gray-800 mb-3 line-clamp-2 text-base leading-snug group-hover:text-rose-600 transition-colors duration-300">
            {highlightText(post.title, searchQuery)}
          </h3>
          <p className="text-sm text-gray-600/90 mb-4 line-clamp-3 leading-relaxed">
            {highlightText(post.excerpt, searchQuery)}
          </p>

          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag, index) => (
              <Badge
                key={tag}
                className={`premium-badge text-xs rounded-full px-3 py-1 font-medium border-0 ${
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

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <img
                  src={post.avatar || "/placeholder.svg"}
                  alt={post.author}
                  className="w-7 h-7 rounded-full ring-2 ring-white shadow-sm"
                />
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full border-2 border-white" />
              </div>
              <div>
                <span className="block text-sm text-gray-700 font-medium">{post.author}</span>
                <span className="text-xs text-gray-400">{post.time}</span>
              </div>
            </div>
          </div>

          <div className="premium-divider mb-4" />

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleLike}
                className={`flex items-center space-x-2 transition-all duration-300 group/like ${
                  isLiked ? "text-rose-500" : "text-gray-500 hover:text-rose-500"
                }`}
              >
                <div className="relative">
                  <Heart
                    className={`w-4 h-4 transition-all duration-300 ${isLiked ? "fill-current scale-110" : "group-hover/like:scale-110"}`}
                  />
                  {isLiked && (
                    <div className="absolute inset-0 w-4 h-4 bg-rose-500 rounded-full animate-ping opacity-20" />
                  )}
                </div>
                <span className="text-sm font-medium">{likeCount}</span>
              </button>
              <div className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 cursor-pointer transition-colors duration-300 group/comment">
                <MessageCircle className="w-4 h-4 group-hover/comment:scale-110 transition-transform duration-300" />
                <span className="text-sm font-medium">{post.comments}</span>
              </div>
            </div>
            <Button
              size="sm"
              variant="ghost"
              onClick={handleShare}
              className="p-2 h-auto text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-xl transition-all duration-300 group/share"
            >
              <Share2 className="w-4 h-4 group-hover/share:scale-110 transition-transform duration-300" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
