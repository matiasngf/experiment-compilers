/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import { PropsWithChildren } from 'react'

import { useMemo } from 'react'

import { useEffect } from 'react'
import { SensorDetector, type SensorOptions } from '@/core/utils/sensor'
import { useFrame } from '../hooks'

export const Sensor = ({ children, ...params }: PropsWithChildren<SensorOptions>) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const detector = useMemo(() => new SensorDetector(params), [])

  useEffect(() => {
    return () => {
      detector.destroy()
    }
  }, [detector])

  useFrame(() => {
    detector.update()
  })

  return (
    <>
      <asciiColor color={detector.color} position={detector.position} size={detector.size} />
      {children}
    </>
  )
}
