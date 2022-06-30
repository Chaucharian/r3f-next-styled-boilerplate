import { useThree, useFrame } from '@react-three/fiber'

export const useCameraEffect = () => {
  const camera = useThree((state) => state.camera)
  return useFrame((state) => {
    // camera.position.z =
    //   Math.sin(state.clock.elapsedTime * (state.mouse.x / 4)) * 20
    // camera.position.x = Math.cos(state.mouse.x) * 10
    camera.position.z = Math.sin(state.clock.elapsedTime) * 20
    camera.position.x = Math.cos(state.clock.elapsedTime) * 10
  })
}
