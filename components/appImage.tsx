'use client'

import Image from 'next/image'
import { useState } from 'react'

interface AppImageProps {
  src?: string
  alt?: string
  className?: string
}

export function AppImage({ src, alt = 'pro tech engineering', className }: AppImageProps) {
  const [imgSrc, setImgSrc] = useState(src || '/fallback.png')

  return (
    <Image
      src={imgSrc}
      alt={alt}
      fill
      className={className}
      onError={() => setImgSrc('/fallback.png')}
      priority
      unoptimized
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    />
  )
}
