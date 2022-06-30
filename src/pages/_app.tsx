import { useRouter } from 'next/router'
import useStore from '@/helpers/store'
import React, { FC, useEffect } from 'react'
import Dom from '@/components/layout/dom'
import dynamic from 'next/dynamic'
import { Props as CanvasProps } from '@react-three/fiber/dist/declarations/src/web/Canvas'
import { GlobalCSS, theme } from '@/styles'
import { ThemeProvider } from 'styled-components'
import Head from 'next/head'

const titleDefault = 'React Three Next Starter'
const url = 'https://react-three-next.vercel.app/'
const description =
  'The easiest and fastest way to create a 3D website using React Three Fiber and NextJS'
const author = 'Author'

const Header = ({ title = titleDefault }) => {
  return (
    <>
      <Head>
        {/* Recommended Meta Tags */}
        <meta charSet='utf-8' />
        <meta name='language' content='english' />
        <meta httpEquiv='content-type' content='text/html' />
        <meta name='author' content={author} />
        <meta name='designer' content={author} />
        <meta name='publisher' content={author} />

        {/* Search Engine Optimization Meta Tags */}
        <title>{title}</title>
        <meta name='description' content={description} />
        <meta
          name='keywords'
          content='Software Engineer,Product Manager,Project Manager,Data Scientist,Computer Scientist'
        />
        <meta name='robots' content='index,follow' />
        <meta name='distribution' content='web' />
        {/* 
      Facebook Open Graph meta tags
        documentation: https://developers.facebook.com/docs/sharing/opengraph */}
        <meta name='og:title' content={title} />
        <meta name='og:type' content='site' />
        <meta name='og:url' content={url} />
        <meta name='og:image' content={'/icons/share.png'} />
        <meta name='og:site_name' content={title} />
        <meta name='og:description' content={description} />

        <link rel='apple-touch-icon' href='/icons/apple-touch-icon.png' />
        <link
          rel='apple-touch-icon'
          sizes='16x16'
          href='/icons/favicon-16x16.png'
        />
        <link
          rel='apple-touch-icon'
          sizes='32x32'
          href='/icons/favicon-32x32.png'
        />
        <link
          rel='apple-touch-icon'
          sizes='180x180'
          href='/icons/apple-touch-icon.png'
        />
        <link rel='manifest' href='/manifest.json' />
        <link
          rel='mask-icon'
          color='#000000'
          href='/icons/safari-pinned-tab.svg'
        />
        <link rel='apple-touch-startup-image' href='/startup.png' />

        {/* Meta Tags for HTML pages on Mobile */}
        {/* <meta name="format-detection" content="telephone=yes"/>
        <meta name="HandheldFriendly" content="true"/>  */}
        <meta
          name='viewport'
          content='width=device-width, minimum-scale=1, initial-scale=1.0'
        />
        <meta name='theme-color' content='#000' />
        <link rel='shortcut icon' href='/icons/favicon.ico' />

        {/* 
      Twitter Summary card
        documentation: https://dev.twitter.com/cards/getting-started
        Be sure validate your Twitter card markup on the documentation site. */}
        <meta name='twitter:card' content='summary' />
        <meta name='twitter:site' content='@onirenaud' />
      </Head>
    </>
  )
}

const LCanvas = dynamic(() => import('@/components/layout/canvas'), {
  ssr: false,
})

export interface R3FComponent {
  canvasProps?: CanvasProps
  r3f?: (props: any) => JSX.Element
}

export type R3FComponentType = React.Component<any> | R3FComponent

interface AppProps {
  Component: R3FComponent
  pageProps: any
}

const App: FC<AppProps> = ({ Component, pageProps = { title: 'index' } }) => {
  const router = useRouter()

  useEffect(() => {
    useStore.setState({ router })
  }, [router])

  return (
    <>
      <Header title={pageProps.title} />
      {/* theme not work inside canvas */}
      <ThemeProvider theme={theme}>
        <Dom>
          {/* @ts-ignore */}
          <Component {...pageProps} />
        </Dom>
        {Component?.r3f && (
          <LCanvas {...Component?.canvasProps}>
            {Component.r3f(pageProps)}
          </LCanvas>
        )}
        <GlobalCSS />
      </ThemeProvider>
    </>
  )
}

export default App
