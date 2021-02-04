import React, { useState } from 'react'
import { useDrop } from 'react-dnd'
import IconWrapper from '../public/icons/IconWrapper'
import { ItemTypes } from './ItemTypes'

function getStyle(backgroundColor: string): React.CSSProperties {
    return {
        // border: '1px solid rgba(0,0,0,0.2)',
        minHeight: '8rem',
        minWidth: '8rem',
        // color: 'white',
        backgroundColor,
        padding: '2rem',
        paddingTop: '1rem',
        margin: '1rem',
        textAlign: 'center',
        float: 'left',
        fontSize: '1rem',
        opacity: 1,
    }
}

export interface DustbinProps {
    greedy?: boolean
    accepts: string
    src: string
}

export interface DustbinState {
    hasDropped: boolean
    hasDroppedOnChild: boolean
}

export const Dustbin: React.FC<DustbinProps> = ({ greedy, children, accepts, src }) => {
    const [hasDropped, setHasDropped] = useState(false)
    const [hasDroppedOnChild, setHasDroppedOnChild] = useState(false)

    const [{ isOver, isOverCurrent }, drop] = useDrop({
        accept: accepts,
        drop(item, monitor) {
            const didDrop = monitor.didDrop()
            if (didDrop) {
                return
            }
            setHasDropped(true)
            setHasDroppedOnChild(didDrop)
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            isOverCurrent: monitor.isOver({ shallow: true }),
        }),
    })

    const text = greedy ? 'greedy' : ''
    let backgroundColor = 'rgba(0, 0, 0, .1)'

    if (isOverCurrent || (isOver)) {
        backgroundColor = 'darkgreen'
    }

    return (
        <>
            {text}
            <div ref={drop} style={getStyle('none')}>
                <img draggable width={200} height={200} src={src} ></img>
            </div>
            {hasDropped && <span>Верно! {hasDroppedOnChild && ' on child'}</span>}

        </>
    )
}
