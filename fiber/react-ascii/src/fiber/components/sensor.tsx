/* eslint-disable @typescript-eslint/ban-ts-comment */

import { PropsWithChildren, useMemo, useEffect } from 'react'

import { SensorDetector, type SensorOptions } from '@/core/utils/sensor'
import { useAfterRender } from '../hooks/use-after-render'
import type { Vec2 } from '../types'

interface SensorProps extends SensorOptions {
  position: Vec2
  size: Vec2
  debug?: boolean
}

export const Sensor = ({
  children,
  debug,
  size,
  position,
  onIntersect,
  ...params
}: PropsWithChildren<SensorProps>) => {
  // const interceptedRef = useRef<SensorInterface[]>([])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const detector = useMemo(
    () =>
      new SensorDetector({
        ...params,
        onIntersect,
        position,
        size
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  useEffect(() => {
    position && detector.setPosition(position)
  }, [detector, position])

  useEffect(() => {
    size && detector.setSize(size)
  }, [detector, size])

  useEffect(() => {
    return () => {
      detector.destroy()
    }
  }, [detector])

  useAfterRender(() => {
    detector.update()
  })

  return (
    <>
      {debug && (
        // @ts-expect-error
        <asciiColor color={'red'} position={position} size={size} />
      )}
      {children}
    </>
  )
}
