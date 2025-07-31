"use client"

import type React from "react"

import { useEffect, useState, useRef } from "react"

interface MasonryGridProps {
  children: React.ReactNode[]
  className?: string
}

export function MasonryGrid({ children, className = "" }: MasonryGridProps) {
  const [columns, setColumns] = useState(2)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const updateColumns = () => {
      if (typeof window !== "undefined") {
        const width = window.innerWidth
        if (width >= 1280) setColumns(4)
        else if (width >= 1024) setColumns(4)
        else if (width >= 768) setColumns(3)
        else setColumns(2)
      }
    }

    updateColumns()
    window.addEventListener("resize", updateColumns)
    return () => window.removeEventListener("resize", updateColumns)
  }, [])

  // 将子元素分配到不同的列
  const columnItems = Array.from({ length: columns }, () => [] as React.ReactNode[])

  children.forEach((child, index) => {
    const columnIndex = index % columns
    columnItems[columnIndex].push(child)
  })

  return (
    <div ref={containerRef} className={`masonry-container ${className}`}>
      {columnItems.map((columnChildren, columnIndex) => (
        <div key={columnIndex} className="flex flex-col">
          {columnChildren.map((child, itemIndex) => (
            <div key={`${columnIndex}-${itemIndex}`} className="masonry-item">
              {child}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
