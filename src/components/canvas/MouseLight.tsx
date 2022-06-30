import { useEffect, useState } from 'react'

const MouseLight = ({ position: initialPosition, ...props }) => {
  const [position, setPosition] = useState(initialPosition ?? [0, 0, 0])

  useEffect(() => {
    document.addEventListener('mousemove', ({ clientX, clientY }) => {
      setPosition([-10, clientY, 2])
    })
  }, [])

  //   return <pointLight  position={position} {...props} />
  return (
    <>
      <directionalLight position={position} intensity={3} />
      <directionalLight
        position={[1, 10, -2]}
        intensity={1}
        shadow-camera-far={70}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
        shadow-mapSize={[512, 512]}
        castShadow
      />
    </>
  )
}

export default MouseLight
