import { useEffect } from 'react'
import { useRenderer } from './use-renderer'
import { useStateToRef } from './use-state-to-ref'
import { RenderFrameCallback } from '@/core/renderer'

/** This function will run right before the render of the scene */
export function useFrame(callback: RenderFrameCallback) {
  const renderer = useRenderer()

  const callbackRef = useStateToRef(callback)

  useEffect(() => {
    const id = renderer.onFrame((...params) => {
      callbackRef.current(...params)
    })
    return () => {
      renderer.removeFrameCallback(id)
    }
  }, [renderer, callbackRef])
}
