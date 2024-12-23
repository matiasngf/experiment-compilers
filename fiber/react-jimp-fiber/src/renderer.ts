/* eslint-disable @typescript-eslint/no-explicit-any */
import ReactReconciler from 'react-reconciler'
import { HostConfig } from './types'

interface Instance {
  type: string
  props: any
  children: Instance[]
}

const hostConfig: HostConfig = {
  now: Date.now,
  getRootHostContext: () => ({}),
  getChildHostContext: () => ({}),
  prepareForCommit: () => null,
  resetAfterCommit: () => {},

  createInstance(type: string, props: any): Instance {
    return { type, props, children: [] }
  },

  appendInitialChild(parent: Instance, child: Instance) {
    if (parent.children) {
      parent.children.push(child)
    }
  },

  finalizeInitialChildren() {
    return false
  },

  prepareUpdate() {
    return true
  },

  commitUpdate(instance: Instance, updatePayload: any, type: string, oldProps: any, newProps: any) {
    instance.props = newProps
  },

  appendChild(parent: Instance, child: Instance) {
    parent.children.push(child)
  },

  appendChildToContainer(container: Instance, child: Instance) {
    container.children.push(child)
  },

  removeChild() {},
  removeChildFromContainer() {},
  commitTextUpdate() {},
  clearContainer(container: Instance) {
    container.children = []
  },
  shouldSetTextContent: () => false,
  createTextInstance: (text: string) => text,
  supportsMutation: true,
  isPrimaryRenderer: false,
  supportsPersistence: false,
  supportsHydration: false,
  getPublicInstance: (instance: any) => instance,
  scheduleTimeout: setTimeout,
  cancelTimeout: clearTimeout,
  noTimeout: -1,
  scheduleMicrotask:
    typeof queueMicrotask === 'function'
      ? queueMicrotask
      : typeof Promise !== 'undefined'
        ? (callback: () => void) => Promise.resolve(null).then(callback).catch(console.error)
        : setTimeout
}

const Renderer = ReactReconciler(hostConfig as any)

export default Renderer
