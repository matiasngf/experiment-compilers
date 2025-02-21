/* eslint-disable @typescript-eslint/no-explicit-any */
import { Container } from '@/renderer/container'
import { createRenderer } from './create-renderer'
import type React from 'react'
import { FiberRoot } from 'react-reconciler'
import { version } from 'react'

const __DEV__ = /* @__PURE__ */ (() =>
  typeof process !== 'undefined' && process.env.NODE_ENV !== 'production')()

const reconciler = createRenderer()

const instances = new Map<
  HTMLElement,
  {
    fiberRoot: FiberRoot
    container: Container
  }
>()

/**
 * Render a React component into a DOM element.
 * @param element - The React component to render.
 * @param target - The DOM element to render into.
 */
export function render(element: React.ReactNode, target: HTMLElement) {
  let root = instances.get(target)

  if (!root) {
    const containerObject = new Container({ canvasContainer: target })
    const fiberRoot = reconciler.createContainer(
      containerObject,
      0, // LegacyRoot
      null, // hostContext
      false, // isHydrating
      null, // hydrationCallback
      '', // identifierPrefix
      error => console.error(error), // onRecoverableError
      null // transitionCallbacks
    )
    containerObject.startRaf()
    root = {
      container: containerObject,
      fiberRoot: fiberRoot
    }
    instances.set(target, root)
  }

  reconciler.updateContainer(element, root.fiberRoot, null, () => undefined)
  reconciler.injectIntoDevTools({
    bundleType: __DEV__ ? 1 : 0,
    // Reporting React DOM's version
    // See https://github.com/facebook/react/issues/16666#issuecomment-532639905
    version: version,
    rendererPackageName: 'react-jscad-fiber'
  })
}

export function unmountComponentAtNode(target: HTMLElement) {
  const root = instances.get(target)
  if (root) {
    // stop frame loop
    root.container.stopRaf()
    // unmount component
    reconciler.updateContainer(<></>, root.fiberRoot, null, () => {
      instances.delete(target)
    })
  }
}
