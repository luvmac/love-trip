import { colors } from '@styles/colorPalette'
import styled from '@emotion/styled'

const Input = styled.input`
  padding: 0 16px;
  font-size: 15px;
  height: 48px;
  border: 1px solid ${colors.gray300};
  background-color: ${colors.gray20};
  border-radius: 6px;
  width: 100%;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: ${colors.blue};
  }

  &[aria-invalid='true'] {
    border-color: ${colors.red};
  }
  &::placeholder {
    color: ${colors.gray400};
  }
`

export default Input
