// import fs from 'fs'
import { useEffect, useState } from 'react'

import imageData from './assets/alien-smol.png'

export function App() {
  return <Character />
}

const limitMax = 10
const limitMin = 2

function Character() {
  const [x, setX] = useState(0)
  const y = 0

  useEffect(() => {
    const interval = setInterval(() => {
      setX(x => x + 2)
    }, 200)

    return () => {
      clearInterval(interval)
    }
  }, [])

  const realX = (x % (limitMax + limitMin)) - limitMin

  return <asciiImage src={imageData} position={{ x: realX, y }} />
}
