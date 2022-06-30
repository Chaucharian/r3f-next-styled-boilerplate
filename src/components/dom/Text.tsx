import { theme } from '@/styles'
import styled from 'styled-components'

const Text = styled.h1`
  color: ${theme.colors?.primary ?? 'red'};
  font-size: 90px;
`
export default Text
