import { useEffect } from 'react'
import { useRenderer } from './use-renderer'
import { useStateToRef } from './use-state-to-ref'
import { RenderFrameCallback } from '@/core/renderer'

/** This function will run right after the render of the scene */
export function useAfterRender(callback: RenderFrameCallback) {
  const renderer = useRenderer()

  const callbackRef = useStateToRef(callback)

  useEffect(() => {
    const id = renderer.onAfterFrame((...params) => {
      callbackRef.current(...params)
    })
    return () => {
      renderer.removeAfterFrameCallback(id)
    }
  }, [renderer, callbackRef])
}
