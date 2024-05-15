import styled from '@emotion/styled'
import { Colors, colors } from '@/styles/colorPalette'

interface SpacingProps {
  size: number
  direction?: 'vertical' | 'horizontal'
  backgroundColor?: Colors
}

// <Spacing size={16} />

const Spacing = styled.div<SpacingProps>`
  ${({ size, direction = 'vertical' }) =>
    direction === 'vertical'
      ? `
        height: ${size}px;
      `
      : `
        width: ${size}px;
      `}

  ${({ backgroundColor }) =>
    backgroundColor && `background-color: ${colors[backgroundColor]}`}
`
// backgroundColor가 넘어왔을 때만 확장!
export default Spacing
