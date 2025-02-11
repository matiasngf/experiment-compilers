import playerImage from './assets/player.png'

import { create } from 'zustand'
import { useState, useRef } from 'react'
import { useFrame, useInput, Sensor, SensorInterface } from 'react-ascii'
import {
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  CANVAS_PADDING_X,
  PLAYER_WIDTH,
  PLAYER_HEIGHT,
  COLLIDERS
} from './constants'
import { useEnemies } from './enemies'

export interface PlayerStore {
  gameOver: boolean
  projectiles: Record<string, PlayerProjectileProps>
  addProjectile: (id: string, x: number, y: number) => void
  removeProjectile: (id: string) => void
}

export const usePlayer = create<PlayerStore>()(set => ({
  gameOver: false,
  projectiles: {},
  addProjectile: (id, x, y) => {
    set(state => ({ projectiles: { ...state.projectiles, [id]: { id, x, y } } }))
  },
  removeProjectile: id => {
    set(state => {
      const { [id]: _, ...rest } = state.projectiles
      return { projectiles: rest }
    })
  }
}))

export function Player() {
  const projectiles = usePlayer(state => state.projectiles)
  const addProjectile = usePlayer(state => state.addProjectile)

  const [position, setPosition] = useState({
    x: CANVAS_WIDTH / 2 - PLAYER_WIDTH / 2,
    y: CANVAS_HEIGHT - PLAYER_HEIGHT - 2
  })

  const MOVE_SPEED = 1

  useInput(event => {
    if (event.name === 'left') {
      const newX = Math.max(CANVAS_PADDING_X - 1, position.x - MOVE_SPEED)
      setPosition(pos => ({
        ...pos,
        x: newX
      }))
    } else if (event.name === 'right') {
      const newX = Math.min(
        CANVAS_WIDTH - PLAYER_WIDTH - CANVAS_PADDING_X + 1,
        position.x + MOVE_SPEED
      )
      setPosition(pos => ({
        ...pos,
        x: newX
      }))
    } else if (event.name === 'space') {
      addProjectile(crypto.randomUUID(), Math.floor(position.x + PLAYER_WIDTH / 2), position.y - 1)
    }
  })

  const interceptCallback = (intercepted: SensorInterface[]) => {
    intercepted.forEach(sensor => {
      if (sensor.data.type === COLLIDERS.ENEMY_PROJECTILE) {
        process.exit(0)
      }
    })
  }

  return (
    <>
      <asciiImage src={playerImage} position={position} />
      {Object.entries(projectiles).map(([id, { x, y }]) => (
        <PlayerProjectile key={id} id={id} x={x} y={y} />
      ))}
      <Sensor
        position={{ x: position.x, y: position.y + 3 }}
        size={{ x: PLAYER_WIDTH, y: 2 }}
        onIntersect={interceptCallback}
      />
      <Sensor
        position={{ x: position.x + 3, y: position.y }}
        size={{ x: 1, y: 1 }}
        onIntersect={interceptCallback}
      />
      <Sensor
        position={{ x: position.x + 2, y: position.y + 1 }}
        size={{ x: 3, y: 4 }}
        onIntersect={interceptCallback}
      />
    </>
  )
}

interface PlayerProjectileProps {
  id: string
  x: number
  y: number
}
function PlayerProjectile({ id, x, y }: PlayerProjectileProps) {
  const frameRef = useRef(0)

  const [projectilePosY, setProjectilePosY] = useState(0)
  const removeProjectile = usePlayer(state => state.removeProjectile)
  const removeEnemyProjectile = useEnemies(state => state.removeProjectile)

  useFrame(() => {
    frameRef.current++
    setProjectilePosY(Math.floor(frameRef.current / 4))
  })

  const removeEnemy = useEnemies(state => state.remove)

  return (
    <>
      <Sensor
        onIntersect={intercepted => {
          intercepted.forEach(sensor => {
            if (sensor.data.type === COLLIDERS.ENEMY) {
              removeEnemy(sensor.data.id as string)
              removeProjectile(id)
            } else if (sensor.data.type === COLLIDERS.ENEMY_PROJECTILE) {
              removeEnemyProjectile(sensor.data.id as string)
              removeProjectile(id)
            }
          })
        }}
        data={{
          type: COLLIDERS.PLAYER_PROJECTILE
        }}
        position={{ x, y: y - projectilePosY }}
        size={{ x: 1, y: 2 }}
      />
      <asciiColor color="white" position={{ x, y: y - projectilePosY }} size={{ x: 1, y: 1 }} />
    </>
  )
}
