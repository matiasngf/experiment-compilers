import fs from 'fs'
import React from 'react'

const imageData = fs.readFileSync('./src/character.png')

export function App() {
  return <Character />
}

function Character() {
  const [x] = React.useState(0)
  const y = 0
  return <asciiImage src={imageData} position={{ x, y }} />
}
