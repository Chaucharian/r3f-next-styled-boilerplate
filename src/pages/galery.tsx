import Instructions from '@/components/dom/Instructions'
import { Galery } from '@/components/canvas/Galery'
import {
  Select,
  Environment,
  ContactShadows,
  Edges,
  useCursor,
  Sky,
  useSelect,
} from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import dynamic from 'next/dynamic'
import React, { Suspense, useEffect, useState } from 'react'
import useStore from '@/helpers/store'

const Box = dynamic(() => import('@/components/canvas/Box'), {
  ssr: false,
})

function Overlay() {
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        width: '100%',
        height: '100%',
      }}
    >
      <a
        href='https://pmnd.rs/'
        style={{ position: 'absolute', bottom: 40, left: 90, fontSize: '13px' }}
      >
        pmnd.rs
        <br />
        dev collective
      </a>
      <div
        style={{ position: 'absolute', top: 40, left: 40, fontSize: '13px' }}
      >
        bad —
      </div>
      <div
        style={{
          position: 'absolute',
          bottom: 40,
          right: 40,
          fontSize: '13px',
        }}
      >
        10/17/2021
      </div>
    </div>
  )
}

// Step 5 - delete Instructions components
const Page = (props) => {
  return (
    <>
      <div style={{ width: '100%', justifyContent: 'center' }}>
        <h1>Galery</h1>
        <Overlay />
      </div>
    </>
  )
}

Page.canvasProps = { gl: { antialias: false }, dpr: [1, 1.5] }

Page.r3f = (props) => {
  return (
    <>
      <Galery />
      <Sky />
    </>
  )
}

export default Page

export async function getStaticProps() {
  return {
    props: {
      title: 'Box',
    },
  }
}
