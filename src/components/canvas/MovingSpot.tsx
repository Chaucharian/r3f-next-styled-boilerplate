import { useThree, useFrame } from '@react-three/fiber'
import { Vector3 } from 'three'
import React, { useRef } from 'react'
import { useGLTF, SpotLight, useDepthBuffer } from '@react-three/drei'

function MovingSpot({ vec = new Vector3(), ...props }) {
  const light: any = useRef()
  const viewport = useThree((state) => state.viewport)
  useFrame((state) => {
    light.current.target.position.lerp(
      vec.set(
        // (state.mouse.x * viewport.width) / 2,
        state.mouse.x,
        state.mouse.y,
        // (state.mouse.y * viewport.height) / 2,
        0
      ),
      0.1
    )
    light.current.target.updateMatrixWorld()
  })
  return (
    <SpotLight
      castShadow
      ref={light}
      penumbra={1}
      distance={6}
      angle={0.35}
      attenuation={5}
      anglePower={4}
      intensity={2}
      {...props}
    />
  )
}

export default MovingSpot
