import fs from 'fs'
import { render } from 'react-ascii'

const carImage = fs.readFileSync('./src/car.png')

const App = () => {
  return <asciiImage src={carImage} position={{ x: 0, y: 0 }} />
}

render(<App />, {
  height: 30,
  width: 70
})

// import { useEffect, useState } from 'react'
// const limitMax = 70
// const limitMin = 18

// const [x, setX] = useState(0)

// useEffect(() => {
//   const interval = setInterval(() => {
//     setX(x => x + 2)
//   }, 100)

//   return () => {
//     clearInterval(interval)
//   }
// }, [])
// const realX = (x % (limitMax + limitMin)) - limitMin
