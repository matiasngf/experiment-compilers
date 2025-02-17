import { useEffect, useState } from 'react'
import { Canvas } from './components/Canvas'

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

  console.log(show)

  return (
    <Canvas>
      <sphere center={[100, 0, 0]} radius={100} color={[0, 1, 0]} />
      {show && <sphere radius={130} color={[1, 0, 0]} />}
    </Canvas>
  )
}
