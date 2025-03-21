/* eslint-disable @typescript-eslint/no-explicit-any */
import { Renderer } from '@/core/renderer'
import { createRenderer } from './create-renderer'
import type React from 'react'
import { FiberProvider as FP } from 'its-fine'
import { FiberRoot } from 'react-reconciler'
import { startRafRunner } from '@/core/utils/raf'
import type { RendererOptions } from '@/core/renderer'

const FiberProvider = FP as any

const reconciler = createRenderer()

const instances = {} as any

const instanceKey = 'main'

export function render(element: React.ReactNode, options: RendererOptions = {}) {
  const containerObject = new Renderer(options)

  let root: FiberRoot = instances[instanceKey] as FiberRoot

  if (!root) {
    root = reconciler.createContainer(
      containerObject,
      0, // LegacyRoot
      null, // hostContext
      false, // isHydrating
      null, // hydrationCallback
      '', // identifierPrefix
      error => console.error(error), // onRecoverableError
      null // transitionCallbacks
    )
    instances[instanceKey] = root
  }

  const Element = () => (
    <>
      <FiberProvider>{element}</FiberProvider>
    </>
  )

  reconciler.updateContainer(<Element />, root, null, () => {
    // render complete, start frame loop
  })
  // reconciler.injectIntoDevTools({
  //   bundleType: 0,
  //   // Reporting React DOM's version
  //   // See https://github.com/facebook/react/issues/16666#issuecomment-532639905
  //   version: '0.0.1',
  //   rendererPackageName: 'react-ascii'
  // })
  startRafRunner(() => {
    // Render ascii to the console
    const ascii = containerObject.render()
    process.stdout.write('\x1Bc')
    process.stdout.write(ascii)
    containerObject.clear()
  })
}
