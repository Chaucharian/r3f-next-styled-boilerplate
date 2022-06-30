import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import lerp from 'lerp'

export const useRotate = (factor = 0.01) => {
  const ref: any = useRef()
  useFrame((state) => {
    const nextY = state.clock.getElapsedTime() * Math.PI * factor
    ref.current.rotation.y = lerp(nextY, ref.current?.rotation.y, 0.4)
  })
  return ref
}

export function LoboMarino(props) {
  // const group = useRef()
  const group = useRotate()
  const { nodes, materials } = useGLTF('models/lobo_marino.glb')
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.mesh_0.geometry}
        material={nodes.mesh_0.material}
        rotation={[-Math.PI / 2, 0, 0]}
        color='white'
      />
    </group>
  )
}
