import React, { useEffect, useState, memo } from 'react'
import { Box, LightBox } from './Box'

const styles = {
  display: 'inline-block',
  transform: 'rotate(-7deg)',
  WebkitTransform: 'rotate(-7deg)',
}

export interface BoxDragPreviewProps {
  title: string
  src: string
}

export interface BoxDragPreviewState {
  tickTock: any
}

export const BoxDragPreview: React.FC<BoxDragPreviewProps> = memo(
  ({ title, src }) => {
    const [tickTock, setTickTock] = useState(false)

    useEffect(
      function subscribeToIntervalTick() {
        const interval = setInterval(() => setTickTock(!tickTock), 500)
        return () => clearInterval(interval)
      },
      [tickTock],
    )

    return (
      <div style={styles}>
        <LightBox src={src} title={title} yellow={tickTock} />
      </div>
    )
  },
)
