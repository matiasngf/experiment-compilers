import fs from 'fs'
import { useEffect, useState } from 'react'

const imageData = fs.readFileSync('./src/character.png')

export function App() {
  return <Character />
}

const limitMax = 26
const limitMin = 18

function Character() {
  // const [x, setX] = useState(0)

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setX(x => x + 2)
  //   }, 200)

  //   return () => {
  //     clearInterval(interval)
  //   }
  // }, [])

  // const realX = (x % (limitMax + limitMin)) - limitMin

  return <asciiImage src={imageData} position={{ x: 0, y: 0 }} />
}
