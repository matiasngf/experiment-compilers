import { useEffect, useRef, useState, useTransition } from 'react'
import { Canvas } from 'react-jscad-fiber'

function useInterval(callback: () => void, delay: number) {
  const savedCallback = useRef<() => void>(callback)
  savedCallback.current = callback

  useEffect(() => {
    const id = setInterval(() => savedCallback.current(), delay)
    return () => clearInterval(id)
  }, [delay])
}

export default function App() {
  const [x, setX] = useState(0)
  const [_isPending, startTransition] = useTransition()

  useInterval(() => {
    const sin = Math.sin(Date.now() / 1000)
    startTransition(() => {
      setX(sin * 70)
    })
  }, 1000 / 24)

  return (
    <Canvas>
      <subtract color={[0.2, 0.2, 0.2]} smoothNormals>
        <sphere color={[0.2, 0.2, 0.2]} radius={130} />
        <sphere color={[0.2, 0.2, 0.2]} center={[x, 0, 70]} radius={100} />
      </subtract>
    </Canvas>
  )
}
