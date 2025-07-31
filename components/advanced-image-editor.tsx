"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import {
  RotateCw,
  RotateCcw,
  FlipHorizontal,
  FlipVertical,
  Palette,
  Contrast,
  Sun,
  Zap,
  Download,
  Undo,
  Redo,
} from "lucide-react"

interface ImageEditState {
  rotation: number
  flipH: boolean
  flipV: boolean
  brightness: number
  contrast: number
  saturation: number
  blur: number
  cropArea: { x: number; y: number; width: number; height: number } | null
}

interface AdvancedImageEditorProps {
  imageUrl: string
  onSave: (editedImageUrl: string) => void
  onCancel: () => void
}

export function AdvancedImageEditor({ imageUrl, onSave, onCancel }: AdvancedImageEditorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [originalImage, setOriginalImage] = useState<HTMLImageElement | null>(null)
  const [editState, setEditState] = useState<ImageEditState>({
    rotation: 0,
    flipH: false,
    flipV: false,
    brightness: 100,
    contrast: 100,
    saturation: 100,
    blur: 0,
    cropArea: null,
  })
  const [history, setHistory] = useState<ImageEditState[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [isCropping, setIsCropping] = useState(false)

  // 加载原始图片
  useEffect(() => {
    const img = new Image()
    img.crossOrigin = "anonymous"
    img.onload = () => {
      setOriginalImage(img)
      const initialState = {
        rotation: 0,
        flipH: false,
        flipV: false,
        brightness: 100,
        contrast: 100,
        saturation: 100,
        blur: 0,
        cropArea: null,
      }
      setEditState(initialState)
      setHistory([initialState])
      setHistoryIndex(0)
    }
    img.src = imageUrl
  }, [imageUrl])

  // 应用编辑效果到画布
  const applyEdits = useCallback(() => {
    if (!originalImage || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // 设置画布尺寸
    canvas.width = originalImage.width
    canvas.height = originalImage.height

    // 清空画布
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // 保存当前状态
    ctx.save()

    // 应用变换
    ctx.translate(canvas.width / 2, canvas.height / 2)
    ctx.rotate((editState.rotation * Math.PI) / 180)
    ctx.scale(editState.flipH ? -1 : 1, editState.flipV ? -1 : 1)

    // 应用滤镜
    const filters = []
    if (editState.brightness !== 100) {
      filters.push(`brightness(${editState.brightness}%)`)
    }
    if (editState.contrast !== 100) {
      filters.push(`contrast(${editState.contrast}%)`)
    }
    if (editState.saturation !== 100) {
      filters.push(`saturate(${editState.saturation}%)`)
    }
    if (editState.blur > 0) {
      filters.push(`blur(${editState.blur}px)`)
    }

    if (filters.length > 0) {
      ctx.filter = filters.join(" ")
    }

    // 绘制图片
    ctx.drawImage(
      originalImage,
      -originalImage.width / 2,
      -originalImage.height / 2,
      originalImage.width,
      originalImage.height,
    )

    // 恢复状态
    ctx.restore()

    // 应用裁剪（如果有）
    if (editState.cropArea) {
      const { x, y, width, height } = editState.cropArea
      const imageData = ctx.getImageData(x, y, width, height)
      canvas.width = width
      canvas.height = height
      ctx.putImageData(imageData, 0, 0)
    }
  }, [originalImage, editState])

  // 当编辑状态改变时重新渲染
  useEffect(() => {
    applyEdits()
  }, [applyEdits])

  // 添加到历史记录
  const addToHistory = (newState: ImageEditState) => {
    const newHistory = history.slice(0, historyIndex + 1)
    newHistory.push(newState)
    setHistory(newHistory)
    setHistoryIndex(newHistory.length - 1)
    setEditState(newState)
  }

  // 撤销
  const undo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1)
      setEditState(history[historyIndex - 1])
    }
  }

  // 重做
  const redo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1)
      setEditState(history[historyIndex + 1])
    }
  }

  // 旋转
  const rotate = (degrees: number) => {
    addToHistory({
      ...editState,
      rotation: (editState.rotation + degrees) % 360,
    })
  }

  // 翻转
  const flip = (direction: "horizontal" | "vertical") => {
    addToHistory({
      ...editState,
      flipH: direction === "horizontal" ? !editState.flipH : editState.flipH,
      flipV: direction === "vertical" ? !editState.flipV : editState.flipV,
    })
  }

  // 调整滤镜
  const adjustFilter = (filter: keyof ImageEditState, value: number) => {
    addToHistory({
      ...editState,
      [filter]: value,
    })
  }

  // 保存编辑后的图片
  const handleSave = () => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    canvas.toBlob(
      (blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob)
          onSave(url)
        }
      },
      "image/jpeg",
      0.9,
    )
  }

  // 重置所有编辑
  const resetAll = () => {
    const resetState = {
      rotation: 0,
      flipH: false,
      flipV: false,
      brightness: 100,
      contrast: 100,
      saturation: 100,
      blur: 0,
      cropArea: null,
    }
    addToHistory(resetState)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
      {/* 预览区域 */}
      <div className="lg:col-span-2">
        <Card className="border-0 soft-shadow rounded-2xl overflow-hidden bg-white/85 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>图片编辑器</span>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={undo}
                  disabled={historyIndex <= 0}
                  className="rounded-full bg-transparent"
                >
                  <Undo className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={redo}
                  disabled={historyIndex >= history.length - 1}
                  className="rounded-full"
                >
                  <Redo className="w-4 h-4" />
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative bg-gray-100 rounded-xl overflow-hidden" style={{ minHeight: "400px" }}>
              <canvas
                ref={canvasRef}
                className="max-w-full max-h-[500px] object-contain mx-auto block"
                style={{
                  imageRendering: "high-quality",
                  filter: "none", // 确保canvas本身不应用额外滤镜
                }}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 控制面板 */}
      <div className="space-y-4">
        {/* 基础变换 */}
        <Card className="border-0 soft-shadow rounded-2xl overflow-hidden bg-white/85 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg">基础变换</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" size="sm" onClick={() => rotate(90)} className="rounded-full">
                <RotateCw className="w-4 h-4 mr-2" />
                右转
              </Button>
              <Button variant="outline" size="sm" onClick={() => rotate(-90)} className="rounded-full">
                <RotateCcw className="w-4 h-4 mr-2" />
                左转
              </Button>
              <Button variant="outline" size="sm" onClick={() => flip("horizontal")} className="rounded-full">
                <FlipHorizontal className="w-4 h-4 mr-2" />
                水平翻转
              </Button>
              <Button variant="outline" size="sm" onClick={() => flip("vertical")} className="rounded-full">
                <FlipVertical className="w-4 h-4 mr-2" />
                垂直翻转
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* 颜色调整 */}
        <Card className="border-0 soft-shadow rounded-2xl overflow-hidden bg-white/85 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <Palette className="w-5 h-5 mr-2" />
              颜色调整
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-gray-700 flex items-center">
                  <Sun className="w-4 h-4 mr-1" />
                  亮度
                </label>
                <span className="text-sm text-gray-500">{editState.brightness}%</span>
              </div>
              <Slider
                value={[editState.brightness]}
                onValueChange={([value]) => adjustFilter("brightness", value)}
                max={200}
                min={0}
                step={1}
                className="w-full"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-gray-700 flex items-center">
                  <Contrast className="w-4 h-4 mr-1" />
                  对比度
                </label>
                <span className="text-sm text-gray-500">{editState.contrast}%</span>
              </div>
              <Slider
                value={[editState.contrast]}
                onValueChange={([value]) => adjustFilter("contrast", value)}
                max={200}
                min={0}
                step={1}
                className="w-full"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-gray-700 flex items-center">
                  <Zap className="w-4 h-4 mr-1" />
                  饱和度
                </label>
                <span className="text-sm text-gray-500">{editState.saturation}%</span>
              </div>
              <Slider
                value={[editState.saturation]}
                onValueChange={([value]) => adjustFilter("saturation", value)}
                max={200}
                min={0}
                step={1}
                className="w-full"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-gray-700">模糊</label>
                <span className="text-sm text-gray-500">{editState.blur}px</span>
              </div>
              <Slider
                value={[editState.blur]}
                onValueChange={([value]) => adjustFilter("blur", value)}
                max={10}
                min={0}
                step={0.1}
                className="w-full"
              />
            </div>
          </CardContent>
        </Card>

        {/* 操作按钮 */}
        <Card className="border-0 soft-shadow rounded-2xl overflow-hidden bg-white/85 backdrop-blur-sm">
          <CardContent className="pt-6">
            <div className="space-y-3">
              <Button onClick={resetAll} variant="outline" className="w-full rounded-full bg-transparent">
                重置所有编辑
              </Button>
              <div className="grid grid-cols-2 gap-3">
                <Button onClick={onCancel} variant="outline" className="rounded-full bg-transparent">
                  取消
                </Button>
                <Button onClick={handleSave} className="bg-rose-400/90 hover:bg-rose-500/90 text-white rounded-full">
                  <Download className="w-4 h-4 mr-2" />
                  保存
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 编辑信息 */}
        <Card className="border-0 soft-shadow rounded-2xl overflow-hidden bg-white/85 backdrop-blur-sm">
          <CardContent className="pt-6">
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>旋转角度:</span>
                <span>{editState.rotation}°</span>
              </div>
              {editState.flipH && (
                <Badge variant="secondary" className="text-xs">
                  水平翻转
                </Badge>
              )}
              {editState.flipV && (
                <Badge variant="secondary" className="text-xs">
                  垂直翻转
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
