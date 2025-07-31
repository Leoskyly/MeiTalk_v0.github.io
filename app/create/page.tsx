"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { ImageProcessor } from "@/components/image-processor"
import { X, ImageIcon, Sparkles } from "lucide-react"

interface ProcessedImage {
  id: string
  originalFile: File
  processedDataUrl: string
  originalSize: number
  compressedSize: number
  compressionRatio: number
}

export default function CreatePostPage() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [processedImages, setProcessedImages] = useState<ProcessedImage[]>([])
  const [showImageProcessor, setShowImageProcessor] = useState(false)

  const availableTags = [
    "双眼皮",
    "鼻综合",
    "热玛吉",
    "水光针",
    "脂肪填充",
    "激光美容",
    "玻尿酸",
    "肉毒素",
    "线雕",
    "超声刀",
    "皮秒激光",
    "光子嫩肤",
    "恢复记录",
    "护理心得",
    "初体验",
    "效果分享",
    "注意事项",
    "医生推荐",
  ]

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }

  const handleImagesProcessed = (images: ProcessedImage[]) => {
    setProcessedImages(images)
    setShowImageProcessor(false)
  }

  const removeProcessedImage = (index: number) => {
    setProcessedImages((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = () => {
    // 处理发布逻辑
    console.log({
      title,
      content,
      tags: selectedTags,
      images: processedImages,
    })
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Card className="border-0 shadow-sm rounded-2xl overflow-hidden bg-white/70 backdrop-blur-sm">
        <CardHeader className="pb-6">
          <CardTitle className="text-2xl font-semibold text-gray-800">分享你的经验</CardTitle>
          <p className="text-gray-600">记录你的恢复过程，帮助更多的人</p>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Title Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">标题 *</label>
            <Input
              placeholder="给你的分享起个标题..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border-gray-200 rounded-xl focus:border-rose-300 focus:ring-rose-200"
            />
          </div>

          {/* Content Editor */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">正文 *</label>
            <Textarea
              placeholder="分享你的经验、感受和建议..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[200px] border-gray-200 rounded-xl focus:border-rose-300 focus:ring-rose-200 resize-none"
            />
          </div>

          {/* Image Upload Section */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <label className="block text-sm font-medium text-gray-700">添加图片</label>
              <Button
                onClick={() => setShowImageProcessor(true)}
                className="bg-rose-400/90 hover:bg-rose-500/90 text-white rounded-full px-4 py-2 text-sm"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                智能处理
              </Button>
            </div>

            {/* Processed Images Display */}
            {processedImages.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                {processedImages.map((image, index) => (
                  <div key={image.id} className="relative group">
                    <div className="relative overflow-hidden rounded-xl">
                      <img
                        src={image.processedDataUrl || "/placeholder.svg"}
                        alt={`处理后图片 ${index + 1}`}
                        className="w-full h-24 object-cover"
                      />
                      <Button
                        size="sm"
                        variant="destructive"
                        className="absolute top-1 right-1 w-6 h-6 p-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => removeProcessedImage(index)}
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                    <div className="mt-1 text-center">
                      <Badge
                        variant="secondary"
                        className={`text-xs ${
                          image.compressionRatio > 0 ? "bg-green-50 text-green-600" : "bg-gray-50 text-gray-600"
                        }`}
                      >
                        {image.compressionRatio > 0 ? `压缩 ${image.compressionRatio}%` : "原图"}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Simple Upload Button */}
            {processedImages.length === 0 && (
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center">
                <ImageIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-500 mb-2">还没有添加图片</p>
                <Button
                  onClick={() => setShowImageProcessor(true)}
                  variant="outline"
                  className="rounded-full border-rose-200 text-rose-600 hover:bg-rose-50"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  开始添加图片
                </Button>
              </div>
            )}

            <p className="text-xs text-gray-500 mt-2">
              使用智能处理工具可以自动压缩、裁剪图片并添加水印，让你的分享更专业
            </p>
          </div>

          {/* Tags Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">选择标签</label>
            <div className="flex flex-wrap gap-2">
              {availableTags.map((tag) => (
                <Badge
                  key={tag}
                  variant={selectedTags.includes(tag) ? "default" : "outline"}
                  className={`cursor-pointer rounded-full transition-colors ${
                    selectedTags.includes(tag)
                      ? "bg-rose-500 hover:bg-rose-600 text-white"
                      : "border-gray-300 text-gray-600 hover:border-rose-300 hover:bg-rose-50"
                  }`}
                  onClick={() => handleTagToggle(tag)}
                >
                  {tag}
                </Badge>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-2">选择相关标签，让更多人发现你的分享</p>
          </div>

          {/* Submit Buttons */}
          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-100">
            <Button variant="outline" className="rounded-full px-6 bg-transparent">
              保存草稿
            </Button>
            <Button
              className="bg-rose-500 hover:bg-rose-600 text-white rounded-full px-6"
              onClick={handleSubmit}
              disabled={!title.trim() || !content.trim()}
            >
              发布分享
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Image Processor Modal */}
      {showImageProcessor && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-100 p-4 flex items-center justify-between rounded-t-2xl">
              <h3 className="text-lg font-semibold text-gray-800">图片智能处理</h3>
              <Button variant="ghost" size="sm" onClick={() => setShowImageProcessor(false)} className="rounded-full">
                <X className="w-4 h-4" />
              </Button>
            </div>
            <div className="p-6">
              <ImageProcessor onImagesProcessed={handleImagesProcessed} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
