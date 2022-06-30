import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
@font-face {
  font-family: 'Akira';
  src: url('/fonts/AkiraBold.otf');
  font-weight: 400;
  font-style: bold;
}

  html,
  body,
  #__next {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
  }

  h1 {
    font-family: 'Akira';
    font-size: 15rem;
    color: #a0a0a0;
  }

  body {
    font-family: 'Akira', sans-serif;
  }
`
