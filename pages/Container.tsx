import React, { useCallback, useState } from 'react'
import { useDrop } from 'react-dnd'
import { ItemTypes } from './ItemTypes'
import { DraggableItem } from './DraggableItem'
import { snapToGrid as doSnapToGrid } from './snapToGrid'
import update from 'immutability-helper'
import { DragItem } from './interfaces'
import styled from '@emotion/styled'
import { Dustbin } from './Dustbin'
import { Nest } from './Nest'
import { Grid } from '@material-ui/core'


const styles: React.CSSProperties = {
    width: 550,
    height: 550,
    border: 'none', //'1px solid black',
    position: 'relative',
    margin: 'auto',
    // paddingBottom: '100px',
    backgroundImage: `url(${"/icons/Rosette.svg"})`,
    opacity: 0.9,
}


export interface ContainerProps {
    snapToGrid: boolean
}

interface BoxMap {
    [key: string]: { top: number; left: number; title: string; src: string }
}

function renderBox(item: any, key: any) {
    return <DraggableItem key={key} id={key} {...item} />
}

export const Container: React.FC<ContainerProps> = ({ snapToGrid }) => {
    const [boxes, setBoxes] = useState<BoxMap>({
        a: { top: 420, left: 380, title: 'Кит', src: './icons/whale.svg' },
        b: { top: 180, left: 420, title: 'Жираф', src: './icons/giraffe.svg' },
        c: { top: 450, left: 560, title: 'Краб', src: './icons/crab.svg' },
        d: { top: 380, left: 190, title: 'Ящерица', src: './icons/lizard.png'  },
        e: { top: 240, left: 580, title: 'Кошка', src: './icons/cat.svg' },
        f: { top: 180, left: 320, title: 'Тукан', src: './icons/puffin.svg' },
        g: { top: 190, left: 190, title: 'Слон', src: './icons/elefant.svg' },
        h: { top: 140, left: 390, title: 'Осьминог', src: './icons/octopus.svg' },
        i: { top: 290, left: 380, title: 'Тигр', src: './icons/tiger.svg' },
        j: { top: 510, left: 230, title: 'Корова', src: './icons/cow.svg' },
        k: { top: 170, left: 210, title: 'Крокодил', src: './icons/cayman.png' },
        l: { top: 100, left: 80, title: 'Птица', src: './icons/kraska.svg' },
        m: { top: 140, left: 190, title: 'Собака', src: './icons/shiba.svg' },
        n: { top: 190, left: 110, title: 'Альпака', src: './icons/alpaca.svg' },
        o: { top: 340, left: 400, title: 'Бабочка', src: './icons/butterfly1.png' },
        p: { top: 340, left: 400, title: 'Бабочка', src: './icons/butterfly.png' },
    })

    const moveBox = useCallback(
        (id: string, left: number, top: number) => {
            setBoxes(
                update(boxes, {
                    [id]: {
                        $merge: { left, top },
                    },
                }),
            )
        },
        [boxes],
    )

    const [, drop] = useDrop({
        accept: ItemTypes.BOX,
        drop(item: DragItem, monitor) {
            const delta = monitor.getDifferenceFromInitialOffset() as {
                x: number
                y: number
            }

            let left = Math.round(item.left + delta.x)
            let top = Math.round(item.top + delta.y)
            if (snapToGrid) {
                ;[left, top] = doSnapToGrid(left, top)
            }

            moveBox(item.id, left, top)
            return undefined
        },
    })

    return (
    <>
    <Playground container item xs={12} flex-direction={'row'}>
                <Grid container item xs={3} justify={'center'} alignItems={'center'} flex-direction={'column'}>
                    <House src={'img/nest.png'} accepts={ItemTypes.BOX} />
                    <House src={'img/farm1.png'} accepts={ItemTypes.OCEAN} />
                    <House src={'img/glacier.png'} accepts={ItemTypes.BOX} />
                </Grid>
                <Grid container item xs={6} justify={'center'} alignItems={'center'} flex-direction={'column'}>
                    <House src={'img/budka.png'} accepts={ItemTypes.BOX} />
                    <div ref={drop} style={styles}>
                        {Object.keys(boxes).map((key) => renderBox(boxes[key], key))}
                    </div>
                    <House src={'img/sea.png'} accepts={ItemTypes.OCEAN} />
                </Grid>
                <Grid container item xs={3} justify={'center'} alignItems={'center'} flex-direction={'column'}>
                    <House src={'img/farm.png'} accepts={ItemTypes.OCEAN} />
                    <House src={'img/alpaca-land.jpg'} accepts={ItemTypes.BOX} />
                    <House src={'img/desert1.png'} accepts={ItemTypes.BOX} />
                </Grid>
            </Playground>

    </>
  )
};

//     justify-content: center;
// align-items: center;

const House = styled(Dustbin)`
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
`;

const Playground = styled(Grid)`
    :after {
        content: "";
        background-image: url(/img/leaves.png);
        opacity: 0.1;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        position: absolute;
        z-index: -1;   
    }
    
`;


