import {Renderer, Image, startRafRunner} from 'react-ascii'

import fs from 'fs'

const imageBuffer = fs.readFileSync('./src/character.png')

const renderer = new Renderer({
  height: 50,
  width: 80
})

const character = new Image({
  src: imageBuffer,
  position: {x: 0, y: 0},
  onError: (error) => {
    console.error('ERROR LOADING IMAGE:')
    console.error(error)
    process.exit(1)
  }
})



const characterShadow = new Image({
  src: imageBuffer,
  position: { x: 0, y: 0 },
  scale: 1,
  onLoad: () => {
    characterShadow.image.blur(2)
  }
})

renderer.addChild(characterShadow)
renderer.addChild(character)


startRafRunner(({time}) => {
  if(!character.loaded) return
  if(!characterShadow.loaded) return
  character.position.x = (Math.sin(time / 1000) * 10) + renderer.width / 2 - character.image.width / 2
  character.position.y = 10
  
  characterShadow.position.x = character.position.x
  characterShadow.position.y = character.position.y
  
  renderer.clear()
  const ascii = renderer.render()
  console.clear()
  console.log(ascii)
})

