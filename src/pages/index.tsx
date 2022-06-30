import dynamic from 'next/dynamic'
// Step 5 - delete Instructions components
import Instructions from '@/components/dom/Instructions'
// import Shader from '@/components/canvas/Shader/Shader'
import { Canvas } from '@react-three/fiber'
import {
  Bounds,
  Cloud,
  Html,
  MeshReflectorMaterial,
  Scroll,
  ScrollControls,
  useBounds,
} from '@react-three/drei'
import { Physics, usePlane } from '@react-three/cannon'
import React from 'react'
import { Chair, Table, Lamp } from '@/components/canvas/Furniture/Furniture'
import { Cursor } from '@/components/canvas/Furniture/helpers/Drag'
import { LoboMarino } from '@/components/canvas/models/LoboMarino'
import { useCameraEffect } from '@/components/canvas/hooks'
import { Camera } from '@/components/canvas'
import styled from 'styled-components'
import { theme } from '@/styles'
import { Section } from '@/sections/Section'
import Landing from '@/sections/Landing'
import { Text } from '@/components'
import WhyUs from '@/sections/Whyus'
import { Works, Contact } from '@/sections'

// Dynamic import is used to prevent a payload when the website start that will include threejs r3f etc..
// WARNING ! errors might get obfuscated by using dynamic import.
// If something goes wrong go back to a static import to show the error.
// https://github.com/pmndrs/react-three-next/issues/49
const Shader = dynamic(() => import('@/components/canvas/Shader/Shader'), {
  ssr: false,
})

// dom components goes here
const Page = (props) => {
  return <></>
}

function Floor(props) {
  const [ref] = usePlane(() => ({ type: 'Static', ...props }))
  return (
    <mesh ref={ref} receiveShadow>
      <planeGeometry args={[100, 100]} />
      <MeshReflectorMaterial
        color='#878790'
        blur={[400, 400]}
        resolution={1024}
        mixBlur={1}
        mixStrength={3}
        depthScale={1}
        minDepthThreshold={0.85}
        metalness={0}
        roughness={1}
      />
    </mesh>
  )
}

Page.canvasProps = {
  dpr: [1, 2],
  shadows: true,
  shake: true,
  camera: { position: [0, 0, 40], zoom: 0.5, fov: 25, near: 1, far: 100 },
}

function SelectToZoom({ children }) {
  const api = useBounds()
  return (
    <group
      onClick={(e) => (
        e.stopPropagation(), e.delta <= 2 && api.refresh(e.object).fit()
      )}
      onPointerMissed={(e) => e.button === 0 && api.refresh().fit()}
    >
      {children}
    </group>
  )
}

Page.r3f = (props) => {
  return (
    <>
      <Cloud position={[-4, -2, -25]} speed={0.2} opacity={0.01} />
      <Cloud position={[4, 2, -15]} speed={0.2} opacity={0.01} />
      <Cloud position={[-4, 2, -10]} speed={0.2} opacity={0.01} />
      <Cloud position={[4, -2, -5]} speed={0.2} opacity={0.01} />
      <Cloud position={[4, 2, 0]} speed={0.2} opacity={0.09} />
      <color attach='background' args={['#171720']} />
      <fog attach='fog' args={['#171720', 60, 90]} />
      <ambientLight intensity={0.2} />
      <pointLight position={[-20, -5, -20]} color='#FF7A00' />
      <Physics allowSleep={false} iterations={15} gravity={[0, -200, 0]}>
        <Cursor />
        {/* <Floor position={[0, -5, 0]} rotation={[-Math.PI / 2, 0, 0]} /> */}
        {/* <Chair position={[0, 0, -2.52]} /> */}
        <Chair position={[10, 0, -2.52]} />
        {/* <Table position={[8, 0, 0]} /> */}
        <Lamp position={[0, 15, 0]} />
      </Physics>
      <Bounds fit clip observe margin={1.2}>
        <SelectToZoom>
          <LoboMarino position={[0, -2, -2]} scale={0.06} />
        </SelectToZoom>
      </Bounds>
      <ScrollControls damping={6} pages={5}>
        <Scroll html style={{ width: '100%' }}>
          <Section index={0} content={<Landing />} />
          {/* <Section index={1} content={<WhyUs />} />
          <Section index={2} content={<Works />} />
          <Section index={3} content={<Contact />} /> */}
          <Section
            index={4}
            content={
              <h1>
                her
                <br />
                mes.
              </h1>
            }
          />
        </Scroll>
      </ScrollControls>
      {/* <Camera /> */}
    </>
  )
}

export default Page

export async function getStaticProps() {
  return {
    props: {
      title: 'Index',
    },
  }
}
