import alienIamge from './assets/alien-smol.png'

import {
  ENEMY_COUNT_X,
  ENEMY_COUNT_Y,
  ENEMY_HEIGHT,
  CANVAS_PADDING_X,
  ENEMY_SPACING_X,
  ENEMY_SPACING_Y,
  CANVAS_PADDING_Y,
  COLLIDERS
} from './constants'

import { Sensor, useFrame } from 'react-ascii'
import { ENEMY_WIDTH } from './constants'
import { useCallback, useEffect, useRef } from 'react'
import { useState } from 'react'
import { create } from 'zustand'

interface ProjectileProps {
  id: string
  x: number
  y: number
}

interface EnemyProps {
  id: string
  x: number
  y: number
}

export interface EnemiesStore {
  enemies: Record<string, EnemyProps>
  remove: (id: string) => void
  projectiles: Record<string, ProjectileProps>
  addProjectile: (projectile: ProjectileProps) => void
  removeProjectile: (id: string) => void
}

export const useEnemies = create<EnemiesStore>(set => ({
  enemies: {},
  projectiles: {},
  addProjectile: ({ id, x, y }) => {
    set(state => ({
      projectiles: { ...state.projectiles, [id]: { id, x, y } }
    }))
  },
  removeProjectile: (id: string) => {
    set(state => {
      const projectiles = { ...state.projectiles }
      delete projectiles[id]
      return { projectiles }
    })
  },
  remove: (id: string) => {
    set(state => {
      const enemies = { ...state.enemies }
      delete enemies[id]
      return { enemies }
    })
  }
}))

export function useTimeout(callback: () => void, delay: number) {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const callbackRef = useRef(callback)
  callbackRef.current = callback

  useEffect(() => {
    timeoutRef.current = setTimeout(() => callbackRef.current(), delay)
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [delay])
}

function useInterval(callback: () => void, delay: number) {
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const callbackRef = useRef(callback)
  callbackRef.current = callback

  useEffect(() => {
    intervalRef.current = setInterval(() => callbackRef.current(), delay)
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [delay])
}

export function Enemies() {
  const enemies = useEnemies(state => state.enemies)
  const projectiles = useEnemies(state => state.projectiles)
  const addProjectile = useEnemies(state => state.addProjectile)

  useEffect(() => {
    if (!Object.keys(enemies).length) {
      const newEnemies: Record<string, { id: string; x: number; y: number }> = {}
      Array.from({ length: ENEMY_COUNT_Y }, (_, row) =>
        Array.from({ length: ENEMY_COUNT_X }, (_, col) => {
          newEnemies[crypto.randomUUID()] = {
            id: crypto.randomUUID(),
            x: col * (ENEMY_WIDTH + ENEMY_SPACING_X) + CANVAS_PADDING_X,
            y: row * (ENEMY_HEIGHT + ENEMY_SPACING_Y) + CANVAS_PADDING_Y
          }
        })
      )
      useEnemies.setState(() => ({
        enemies: newEnemies
      }))
    }
  }, [enemies])

  const enemiesRef = useRef(enemies)
  enemiesRef.current = enemies

  const addProjectileCallback = useCallback(() => {
    if (Object.keys(enemiesRef.current).length) {
      const randomEnemy = Object.keys(enemiesRef.current)[
        Math.floor(Math.random() * Object.keys(enemiesRef.current).length)
      ]
      const enemy = enemiesRef.current[randomEnemy]
      addProjectile({
        id: crypto.randomUUID(),
        x: Math.floor(enemy.x + ENEMY_WIDTH / 2),
        y: enemy.y + ENEMY_HEIGHT
      })
    }
  }, [])

  useInterval(addProjectileCallback, 1000)

  return (
    <>
      {Object.entries(enemies).map(([id, enemy]) => (
        <Alien key={id} id={id} x={enemy.x} y={enemy.y} />
      ))}
      {Object.entries(projectiles).map(([id, projectile]) => (
        <Projectile key={id} id={id} x={projectile.x} y={projectile.y} />
      ))}
    </>
  )
}

function Alien({ id, x, y }: { id: string; x: number; y: number }) {
  return (
    <>
      <Sensor
        data={{
          type: COLLIDERS.ENEMY,
          id
        }}
        position={{ x, y }}
        size={{ x: ENEMY_WIDTH, y: ENEMY_HEIGHT }}
      />
      <asciiImage src={alienIamge} position={{ x, y }} />
    </>
  )
}

interface ProjectileProps {
  x: number
  y: number
}
const Projectile = ({ id, x, y }: ProjectileProps) => {
  const frameRef = useRef(0)

  const [projectilePosY, setProjectilePosY] = useState(0)

  useFrame(() => {
    frameRef.current++
    setProjectilePosY(Math.floor(frameRef.current / 4))
  })

  const projectileX = x
  const projectileY = y + projectilePosY
  const projectileWidth = 1
  const projectileHeight = 1

  return (
    <>
      <asciiColor
        color="green"
        position={{ x: projectileX, y: projectileY }}
        size={{ x: projectileWidth, y: projectileHeight }}
      />
      <Sensor
        data={{
          type: COLLIDERS.ENEMY_PROJECTILE,
          id
        }}
        position={{ x: projectileX, y: projectileY }}
        size={{ x: projectileWidth, y: projectileHeight }}
      />
    </>
  )
}
