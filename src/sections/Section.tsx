import styled from 'styled-components'

const Wrapper = styled.div`
  ${({ top }) => `
  position: absolute;
  right: 0;
  top: ${top}vh;
  width: 100%;
`}
`
export const Section = ({ index, content }) => {
  return <Wrapper top={index * 100}>{content}</Wrapper>
}
