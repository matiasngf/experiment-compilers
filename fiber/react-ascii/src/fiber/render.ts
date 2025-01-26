/* eslint-disable @typescript-eslint/no-explicit-any */
import { Renderer } from '@/core/renderer'
import { createRenderer } from './create-renderer'
import { startRafRunner } from '@/core/raf'
import type React from 'react'
// import { ConcurrentRoot } from 'react-reconciler/constants'

let root: any = null

export function render(element: React.ReactNode) {
  const containerObject = new Renderer()

  const reconciler = createRenderer()

  if (!root) {
    root = reconciler.createContainer(
      containerObject,
      1,
      null,
      false,
      null,
      '',
      error => console.error('Reconciler error:', error),
      null
    )
  }

  reconciler.updateContainer(element as any, root, null, () => {
    // render complete, start frame loop
    startRafRunner(() => {
      // Render ascii to the console
      const ascii = containerObject.render()
      console.clear()
      console.log(ascii)
      containerObject.clear()
    })
  })

  return () => {
    reconciler.updateContainer(null, root, null, () => {})
  }
}
