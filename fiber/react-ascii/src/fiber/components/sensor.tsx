/* eslint-disable @typescript-eslint/ban-ts-comment */

import { PropsWithChildren, useMemo, useEffect } from 'react'

import { SensorDetector, type SensorOptions } from '@/core/utils/sensor'

import { vec3 } from 'gl-matrix'
import { useAfterRender } from '../hooks/use-after-render'

interface SensorProps extends SensorOptions {
  debug?: boolean
  size: vec3
}

vec3

export const Sensor = ({
  children,
  debug,
  size,
  position,
  onIntersect,
  ...params
}: PropsWithChildren<SensorProps>) => {
  // const interceptedRef = useRef<SensorInterface[]>([])

  // const interceptCallback = useMemo(() => {
  //   if (typeof onIntersect === 'function') {
  //     return (intercepted: SensorInterface[]) => {
  //       interceptedRef.current = intercepted
  //     }
  //   } else {
  //     return undefined
  //   }
  // }, [onIntersect])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const detector = useMemo(
    () =>
      new SensorDetector({
        ...params,
        onIntersect,
        position: vec3.fromValues(
          (position?.[0] || 0) + size[0] / 2,
          (position?.[1] || 0) + size[1] / 2,
          0
        ),
        halfSize: vec3.fromValues(size[0] / 2, size[1] / 2, 1)
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  useEffect(() => {
    detector.setPosition(
      vec3.fromValues((position?.[0] || 0) + size[0] / 2, (position?.[1] || 0) + size[1] / 2, 0)
    )
  }, [detector, position, size])

  useEffect(() => {
    detector.setHalfSize(vec3.fromValues(size[0] / 2, size[1] / 2, 1))
  }, [detector, size])

  useEffect(() => {
    return () => {
      detector.destroy()
    }
  }, [detector])

  useAfterRender(() => {
    // delay intercept callback to the next frame to avoid calling it before it's visible
    // if (interceptedRef.current.length > 0) {
    //   onIntersect?.(interceptedRef.current)
    //   interceptedRef.current = []
    // }
    // detector.setPosition(
    //   vec3.fromValues((position?.[0] || 0) + size[0] / 2, (position?.[1] || 0) + size[1] / 2, 0)
    // )
    // detector.setHalfSize(vec3.fromValues(size[0] / 2, size[1] / 2, 1))
    detector.update()
  })

  return (
    <>
      {debug && (
        // @ts-expect-error
        <asciiColor
          color={'red'}
          position={{ x: position?.[0] || 0, y: position?.[1] || 0 }}
          size={{ x: size?.[0] || 0, y: size?.[1] || 0 }}
        />
      )}
      {children}
    </>
  )
}
