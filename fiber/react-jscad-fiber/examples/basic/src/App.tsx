import { useEffect, useState } from 'react'
import { Canvas } from 'react-jscad-fiber'

const useTimeout = (ms: number) => {
  const [value, setValue] = useState(false)
  useEffect(() => {
    const timeout = setTimeout(() => setValue(true), ms)
    return () => clearTimeout(timeout)
  }, [ms])
  return value
}

export default function App() {
  const show = useTimeout(1000)

  return (
    <Canvas>
      <sphere center={[100, 0, 0]} radius={100} color={[0, 1, 0]} />
      {show && <SecondSphere />}
    </Canvas>
  )
}

function SecondSphere() {
  const changeColor = useTimeout(1000)

  return <sphere radius={130} color={[1, changeColor ? 0 : 1, 0]} />
}
