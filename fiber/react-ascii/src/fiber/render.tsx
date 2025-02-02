/* eslint-disable @typescript-eslint/no-explicit-any */
import { Renderer } from '@/core/renderer'
import { createRenderer } from './create-renderer'
// import { startRafRunner } from '@/core/raf'
import type React from 'react'
// import instances from './instances'
import { FiberRoot } from 'react-reconciler'
import { startRafRunner } from '@/core/raf'
// import { ConcurrentRoot } from 'react-reconciler/constants'

// TODO add a ton of logs to understand what's happening
const reconciler = createRenderer()

const instances = {} as any

const instanceKey = 'main'

export function render(element: React.ReactNode) {
  const containerObject = new Renderer()

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

  reconciler.updateContainer(element, root, null, () => {
    // render complete, start frame loop
  })
  // reconciler.injectIntoDevTools({
  //   bundleType: 0,
  //   // Reporting React DOM's version, not Ink's
  //   // See https://github.com/facebook/react/issues/16666#issuecomment-532639905
  //   version: '0.0.1',
  //   rendererPackageName: 'react-ascii'
  // })
  startRafRunner(() => {
    // Render ascii to the console
    const ascii = containerObject.render()
    console.clear()
    console.log(ascii)
    containerObject.clear()
  })
}
