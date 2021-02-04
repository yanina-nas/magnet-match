import React, { useEffect } from 'react'
import { useDrag, DragSourceMonitor } from 'react-dnd'
import { ItemTypes } from './ItemTypes'
import { getEmptyImage } from 'react-dnd-html5-backend'
import { Box } from './Box'
import styled from '@emotion/styled'

function getStyles(
  left: number,
  top: number,
  isDragging: boolean,
): React.CSSProperties {
  const transform = `translate3d(${left}px, ${top}px, 0)`
  return {
    position: 'absolute',
    transform,
    WebkitTransform: transform,
    // IE fallback: hide the real node using CSS when dragging
    // because IE will ignore our custom "empty image" drag preview.
    opacity: isDragging ? 0 : 1,
    height: isDragging ? 0 : '',
  }
}

export interface DraggableItemProps {
  id: string
  title: string
  left: number
  top: number
  isSorted?: boolean
  type: string
  src: string
}

export const DraggableItem: React.FC<DraggableItemProps> = (props) => {
  const { id, title, left, top, src } = props
  const [{ isDragging }, drag, preview] = useDrag({
    item: { type: ItemTypes.BOX, id, left, top, title, src },
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true })
  }, [])


  return (
    <div ref={drag} style={getStyles(left, top, isDragging)}>
      <Box title={title} src={src}/>
    </div>
  )
};


