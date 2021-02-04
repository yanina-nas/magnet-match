import styled from "@emotion/styled";

interface Props {
    isFullWidth?: boolean;
    height?: number;
    width?: number;
    color?: string;
    draggable?: boolean;
}
  
const IconWrapper = styled.div<Props>`
    width: ${props => props.width}px;
    height: ${props => props.height}px;
    max-width: 100px;
    svg {
        width: ${props => props.width}px;
        height: ${props => props.height}px;
        fill: ${props => props.color};
        path {
            stroke: ${props => props.color};;
        }
    }
`;

export default IconWrapper;
