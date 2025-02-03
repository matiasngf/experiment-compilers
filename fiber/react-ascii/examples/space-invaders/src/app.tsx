import alienIamge from './assets/alien-smol.png'
import playerImage from './assets/player.png'
import { useInput } from 'react-ascii'

import {
  ENEMY_COUNT_X,
  ENEMY_COUNT_Y,
  ENEMY_HEIGHT,
  ENEMY_WIDTH,
  ENEMY_SPACING_X,
  ENEMY_SPACING_Y,
  CANVAS_PADDING_X,
  CANVAS_PADDING_Y,
  CANVAS_HEIGHT,
  PLAYER_HEIGHT,
  CANVAS_WIDTH,
  PLAYER_WIDTH
} from './constants'
import { useState } from 'react'

export function App() {
  return (
    <>
      {Array.from({ length: ENEMY_COUNT_Y }, (_, row) =>
        Array.from({ length: ENEMY_COUNT_X }, (_, col) => (
          <Alien
            key={`alien-${row}-${col}`}
            x={col * (ENEMY_WIDTH + ENEMY_SPACING_X) + CANVAS_PADDING_X}
            y={row * (ENEMY_HEIGHT + ENEMY_SPACING_Y) + CANVAS_PADDING_Y}
          />
        ))
      )}
      {/* <Sensor /`> */}
      <asciiColor color="red" position={{ x: 0, y: 0 }} size={{ x: 10, y: 10 }} />
      <Player />
    </>
  )
}

function Alien({ x, y }: { x: number; y: number }) {
  return <asciiImage src={alienIamge} position={{ x: x, y: y }} />
}

function Player() {
  const [position, setPosition] = useState({
    x: CANVAS_WIDTH / 2 - PLAYER_WIDTH / 2,
    y: CANVAS_HEIGHT - PLAYER_HEIGHT - 2
  })

  const MOVE_SPEED = 2

  useInput(event => {
    if (event.name === 'left')
      setPosition(pos => ({
        ...pos,
        x: Math.max(CANVAS_PADDING_X, pos.x - MOVE_SPEED)
      }))
    else if (event.name === 'right')
      setPosition(pos => ({
        ...pos,
        x: Math.min(CANVAS_WIDTH - PLAYER_WIDTH - CANVAS_PADDING_X, pos.x + MOVE_SPEED)
      }))
  })

  return <asciiImage src={playerImage} position={position} />
}
