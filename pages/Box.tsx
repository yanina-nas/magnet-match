import styled from '@emotion/styled'
import React from 'react'
import IconWrapper from '../public/icons/IconWrapper'


const styles: React.CSSProperties = {
  border: '1px dashed gray',
  padding: '0.5rem 1rem',
  cursor: 'move',
}

export interface BoxProps {
  title: string
  yellow?: boolean
  src: string
}

export const Box: React.FC<BoxProps> = ({ title, yellow, src }) => {
  const backgroundColor = yellow ? 'yellow' : 'white'
  return <div draggable style={{ ...styles, backgroundColor }}>{title}
            {/* <IconWrapper draggable > */}
                <StrappedImg draggable src={src}></StrappedImg>
            {/* </IconWrapper> */}
        </div>
};

export const LightBox: React.FC<BoxProps> = ({ title, yellow, src }) => {
    const backgroundColor = yellow ? 'yellow' : 'white'
    return <div draggable style={{ ...styles, backgroundColor }}>{title}
    {/* <IconWrapper draggable > */}
                  <StrappedImg draggable src={src}></StrappedImg>
                  {/* </IconWrapper> */}
          </div>
};

const StrappedImg = styled.img`
    min-width: 70px;
    max-width: 100px;
`;


