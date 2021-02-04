import React from 'react'
import { XYCoord, useDragLayer } from 'react-dnd'
import { ItemTypes } from './ItemTypes'
import { BoxDragPreview } from './BoxDragPreview'
import { snapToGrid } from './snapToGrid'
import styled from '@emotion/styled'

const layerStyles: React.CSSProperties = {
  position: 'fixed',
  pointerEvents: 'none',
  zIndex: 100,
  left: 0,
  top: 0,
  width: '100%',
  height: '100%',
}

function getItemStyles(
  initialOffset: XYCoord | null,
  currentOffset: XYCoord | null,
  isSnapToGrid: boolean,
) {
  if (!initialOffset || !currentOffset) {
    return {
      display: 'none',
    }
  }

  let { x, y } = currentOffset

  if (isSnapToGrid) {
    x -= initialOffset.x
    y -= initialOffset.y
    ;[x, y] = snapToGrid(x, y)
    x += initialOffset.x
    y += initialOffset.y
  }

  const transform = `translate(${x}px, ${y}px)`
  return {
    transform,
    WebkitTransform: transform,
  }
}

export interface CustomDragLayerProps {
  snapToGrid: boolean
}

export const CustomDragLayer: React.FC<CustomDragLayerProps> = (props) => {
  const {
    itemType,
    isDragging,
    item,
    initialOffset,
    currentOffset,
  } = useDragLayer((monitor) => ({
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    initialOffset: monitor.getInitialSourceClientOffset(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging(),
  }))

  function renderItem() {
    switch (itemType) {
      case ItemTypes.BOX:
        return <BoxDragPreview src={item.src} title={item.title} />
      case ItemTypes.OCEAN:
        return <BoxDragPreview src={item.src} title={item.title} />
      case ItemTypes.FARM:
        return <BoxDragPreview src={item.src} title={item.title} />
      default:
        return null
    }
  }

  if (!isDragging) {
    return null
  }
  return (
    <div style={layerStyles}>
      <div
        style={getItemStyles(initialOffset, currentOffset, props.snapToGrid)}
      >
        {renderItem()}
      </div>
    </div>
  )
};


const Playground = styled.div`
    margin: 30 auto;
    background-image: '/img/paper.jpg';
    opacity: 0.9,
`;
