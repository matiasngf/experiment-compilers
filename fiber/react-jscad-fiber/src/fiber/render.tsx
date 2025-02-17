/* eslint-disable @typescript-eslint/no-explicit-any */
import { Container } from '@/renderer/container'
import { createRenderer } from './create-renderer'
import type React from 'react'
import { FiberProvider } from 'its-fine'
import { FiberRoot } from 'react-reconciler'
import type { ContainerParams } from '@/renderer/container'

const reconciler = createRenderer()

const instances = {} as any

const instanceKey = 'main'

export function render(element: React.ReactNode, options: ContainerParams) {
  console.log('RENDER')

  const containerObject = new Container(options)

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

  const Element = () => <FiberProvider>{element}</FiberProvider>

  reconciler.updateContainer(<Element />, root, null, () => {
    // render complete, start frame loop
    const frame = () => {
      containerObject.render()
      requestAnimationFrame(frame)
    }

    frame()
  })
  // reconciler.injectIntoDevTools({
  //   bundleType: 0,
  //   // Reporting React DOM's version
  //   // See https://github.com/facebook/react/issues/16666#issuecomment-532639905
  //   version: '0.0.1',
  //   rendererPackageName: 'react-ascii'
  // })
}
