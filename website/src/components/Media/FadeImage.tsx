'use client'

import NextImage, { type ImageProps } from 'next/image'
import React, { useState } from 'react'

/** next/image with a soft fade-in once the file has arrived. Priority images show immediately. */
export const FadeImage: React.FC<ImageProps> = (props) => {
  const [loaded, setLoaded] = useState(Boolean(props.priority))
  return (
    <NextImage
      {...props}
      data-fade={loaded ? 'loaded' : ''}
      onLoad={(e) => {
        setLoaded(true)
        props.onLoad?.(e)
      }}
    />
  )
}
