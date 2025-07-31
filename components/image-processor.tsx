"use client"

import { useState, useRef, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, Download, Crop, Palette, FileArchiveIcon as Compress, Type, X, Check, RefreshCw } from "lucide-react"

interface ProcessedImage {
  id: string
  originalFile: File
  processedDataUrl: string
  originalSize: number
  compressedSize: number
  compressionRatio: number
}

interface CropArea {
  x: number
  y: number
  width: number
  height: number
}

export function ImageProcessor({ onImagesProcessed }: { onImagesProcessed: (images: ProcessedImage[]) => void }) {
  const [images, setImages] = useState<ProcessedImage[]>([])
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)

  // 压缩设置
  const [quality, setQuality] = useState([0.8])
  const [maxWidth, setMaxWidth] = useState([1200])
  const [maxHeight, setMaxHeight] = useState([1200])

  // 裁剪设置
  const [cropArea, setCropArea] = useState<CropArea>({ x: 0, y: 0, width: 100, height: 100 })
  const [isCropping, setIsCropping] = useState(false)

  // 水印设置
  const [watermarkText, setWatermarkText] = useState("MeiTalk")
  const [watermarkOpacity, setWatermarkOpacity] = useState([0.3])
  const [watermarkPosition, setWatermarkPosition] = useState("bottom-right")

  const fileInputRef = useRef<HTMLInputElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // 文件上传处理
  const handleFileUpload = useCallback(async (files: FileList) => {
    setIsProcessing(true)
    const newImages: ProcessedImage[] = []

    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      if (file.type.startsWith("image/")) {
        const processedImage = await processImage(file)
        if (processedImage) {
          newImages.push(processedImage)
        }
      }
    }

    setImages((prev) => [...prev, ...newImages])
    setIsProcessing(false)
  }, [])

  // 图片处理核心函数
  const processImage = async (file: File): Promise<ProcessedImage | null> => {
    return new Promise((resolve) => {
      const img = new Image()
      const canvas = document.createElement("canvas")
      const ctx = canvas.getContext("2d")

      img.onload = () => {
        if (!ctx) {
          resolve(null)
          return
        }

        // 计算新尺寸
        const { width, height } = calculateNewDimensions(img.width, img.height, maxWidth[0], maxHeight[0])

        canvas.width = width
        canvas.height = height

        // 绘制图片
        ctx.drawImage(img, 0, 0, width, height)

        // 添加水印
        if (watermarkText) {
          addWatermark(ctx, canvas, watermarkText, watermarkOpacity[0], watermarkPosition)
        }

        // 转换为blob并计算压缩比
        canvas.toBlob(
          (blob) => {
            if (blob) {
              const reader = new FileReader()
              reader.onload = () => {
                const processedImage: ProcessedImage = {
                  id: Math.random().toString(36).substr(2, 9),
                  originalFile: file,
                  processedDataUrl: reader.result as string,
                  originalSize: file.size,
                  compressedSize: blob.size,
                  compressionRatio: Math.round((1 - blob.size / file.size) * 100),
                }
                resolve(processedImage)
              }
              reader.readAsDataURL(blob)
            } else {
              resolve(null)
            }
          },
          "image/jpeg",
          quality[0],
        )
      }

      img.src = URL.createObjectURL(file)
    })
  }

  // 计算新尺寸
  const calculateNewDimensions = (originalWidth: number, originalHeight: number, maxW: number, maxH: number) => {
    let width = originalWidth
    let height = originalHeight

    if (width > maxW) {
      height = (height * maxW) / width
      width = maxW
    }

    if (height > maxH) {
      width = (width * maxH) / height
      height = maxH
    }

    return { width: Math.round(width), height: Math.round(height) }
  }

  // 添加水印
  const addWatermark = (
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    text: string,
    opacity: number,
    position: string,
  ) => {
    ctx.save()

    // 设置水印样式
    const fontSize = Math.max(canvas.width * 0.03, 16)
    ctx.font = `${fontSize}px Arial`
    ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`
    ctx.strokeStyle = `rgba(0, 0, 0, ${opacity * 0.5})`
    ctx.lineWidth = 1

    // 计算文字尺寸
    const textMetrics = ctx.measureText(text)
    const textWidth = textMetrics.width
    const textHeight = fontSize

    // 计算位置
    let x = 20
    let y = canvas.height - 20

    switch (position) {
      case "top-left":
        x = 20
        y = textHeight + 20
        break
      case "top-right":
        x = canvas.width - textWidth - 20
        y = textHeight + 20
        break
      case "bottom-left":
        x = 20
        y = canvas.height - 20
        break
      case "bottom-right":
        x = canvas.width - textWidth - 20
        y = canvas.height - 20
        break
      case "center":
        x = (canvas.width - textWidth) / 2
        y = canvas.height / 2
        break
    }

    // 绘制水印
    ctx.strokeText(text, x, y)
    ctx.fillText(text, x, y)
    ctx.restore()
  }

  // 重新处理图片
  const reprocessImage = async (index: number) => {
    const image = images[index]
    if (!image) return

    setIsProcessing(true)
    const reprocessed = await processImage(image.originalFile)
    if (reprocessed) {
      const newImages = [...images]
      newImages[index] = reprocessed
      setImages(newImages)
    }
    setIsProcessing(false)
  }

  // 删除图片
  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index))
    if (selectedImageIndex === index) {
      setSelectedImageIndex(null)
    }
  }

  // 格式化文件大小
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  // 导出处理后的图片
  const handleExport = () => {
    onImagesProcessed(images)
  }

  return (
    <div className="space-y-6">
      {/* 上传区域 */}
      <Card className="border-0 soft-shadow rounded-2xl overflow-hidden bg-white/85 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Upload className="w-5 h-5 text-rose-500" />
            <span>图片处理工具</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div
            className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-rose-300 transition-colors cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
            onDrop={(e) => {
              e.preventDefault()
              const files = e.dataTransfer.files
              if (files.length > 0) {
                handleFileUpload(files)
              }
            }}
            onDragOver={(e) => e.preventDefault()}
          >
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-2">点击上传或拖拽图片到此处</p>
            <p className="text-sm text-gray-400">支持 JPG、PNG、WebP 格式，最大 10MB</p>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              if (e.target.files) {
                handleFileUpload(e.target.files)
              }
            }}
          />
        </CardContent>
      </Card>

      {/* 处理设置 */}
      {images.length > 0 && (
        <Card className="border-0 soft-shadow rounded-2xl overflow-hidden bg-white/85 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Palette className="w-5 h-5 text-blue-500" />
              <span>处理设置</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="compress" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-gray-100/50">
                <TabsTrigger value="compress" className="data-[state=active]:bg-white">
                  <Compress className="w-4 h-4 mr-2" />
                  压缩
                </TabsTrigger>
                <TabsTrigger value="crop" className="data-[state=active]:bg-white">
                  <Crop className="w-4 h-4 mr-2" />
                  裁剪
                </TabsTrigger>
                <TabsTrigger value="watermark" className="data-[state=active]:bg-white">
                  <Type className="w-4 h-4 mr-2" />
                  水印
                </TabsTrigger>
              </TabsList>

              <TabsContent value="compress" className="space-y-4 mt-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    图片质量: {Math.round(quality[0] * 100)}%
                  </label>
                  <Slider value={quality} onValueChange={setQuality} max={1} min={0.1} step={0.1} className="w-full" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">最大宽度: {maxWidth[0]}px</label>
                    <Slider
                      value={maxWidth}
                      onValueChange={setMaxWidth}
                      max={2000}
                      min={300}
                      step={50}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">最大高度: {maxHeight[0]}px</label>
                    <Slider
                      value={maxHeight}
                      onValueChange={setMaxHeight}
                      max={2000}
                      min={300}
                      step={50}
                      className="w-full"
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="crop" className="space-y-4 mt-6">
                <div className="text-sm text-gray-600 mb-4">裁剪功能将在选择图片后可用</div>
                <div className="grid grid-cols-2 gap-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCropArea({ x: 0, y: 0, width: 100, height: 100 })}
                    className="rounded-full"
                  >
                    1:1 正方形
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCropArea({ x: 0, y: 0, width: 100, height: 75 })}
                    className="rounded-full"
                  >
                    4:3 横向
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="watermark" className="space-y-4 mt-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">水印文字</label>
                  <input
                    type="text"
                    value={watermarkText}
                    onChange={(e) => setWatermarkText(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-rose-300 focus:ring-rose-200"
                    placeholder="输入水印文字"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    透明度: {Math.round(watermarkOpacity[0] * 100)}%
                  </label>
                  <Slider
                    value={watermarkOpacity}
                    onValueChange={setWatermarkOpacity}
                    max={1}
                    min={0.1}
                    step={0.1}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">位置</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { value: "top-left", label: "左上" },
                      { value: "top-right", label: "右上" },
                      { value: "center", label: "居中" },
                      { value: "bottom-left", label: "左下" },
                      { value: "bottom-right", label: "右下" },
                    ].map((pos) => (
                      <Button
                        key={pos.value}
                        variant={watermarkPosition === pos.value ? "default" : "outline"}
                        size="sm"
                        onClick={() => setWatermarkPosition(pos.value)}
                        className={`rounded-full ${
                          watermarkPosition === pos.value ? "bg-rose-400/90 hover:bg-rose-500/90 text-white" : ""
                        }`}
                      >
                        {pos.label}
                      </Button>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex justify-end space-x-3 mt-6 pt-6 border-t border-gray-100">
              <Button
                onClick={() => {
                  images.forEach((_, index) => reprocessImage(index))
                }}
                disabled={isProcessing}
                className="bg-blue-500 hover:bg-blue-600 text-white rounded-full px-6"
              >
                {isProcessing ? (
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <RefreshCw className="w-4 h-4 mr-2" />
                )}
                重新处理
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* 图片预览 */}
      {images.length > 0 && (
        <Card className="border-0 soft-shadow rounded-2xl overflow-hidden bg-white/85 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Download className="w-5 h-5 text-green-500" />
                <span>处理结果 ({images.length})</span>
              </div>
              <Button
                onClick={handleExport}
                className="bg-rose-400/90 hover:bg-rose-500/90 text-white rounded-full px-6"
              >
                <Check className="w-4 h-4 mr-2" />
                确认使用
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {images.map((image, index) => (
                <div key={image.id} className="relative group">
                  <div className="relative overflow-hidden rounded-xl bg-gray-100">
                    <img
                      src={image.processedDataUrl || "/placeholder.svg"}
                      alt={`处理后图片 ${index + 1}`}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => removeImage(index)}
                        className="w-6 h-6 p-0 rounded-full"
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>

                  <div className="mt-3 space-y-2">
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>原始: {formatFileSize(image.originalSize)}</span>
                      <span>压缩: {formatFileSize(image.compressedSize)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <Badge
                        variant="secondary"
                        className={`text-xs ${
                          image.compressionRatio > 0 ? "bg-green-50 text-green-600" : "bg-gray-50 text-gray-600"
                        }`}
                      >
                        {image.compressionRatio > 0 ? `压缩 ${image.compressionRatio}%` : "无压缩"}
                      </Badge>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => reprocessImage(index)}
                        className="text-xs px-2 py-1 h-auto rounded-full"
                      >
                        重新处理
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* 隐藏的canvas用于图片处理 */}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  )
}
