import fs from 'fs'
import { useEffect } from 'react'
import { useState } from 'react'
import { render } from 'react-ascii'

const carImage = fs.readFileSync('./src/car.png')

const App = () => {
  const limitMax = 70
  const limitMin = 18

  const [x, setX] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setX(x => x + 2)
    }, 100)

    return () => {
      clearInterval(interval)
    }
  }, [])

  const realX = (x % (limitMax + limitMin)) - limitMin

  return <asciiImage src={carImage} position={{ x: realX, y: 0 }} />
}

render(<App />, {
  height: 30,
  width: 70
})
