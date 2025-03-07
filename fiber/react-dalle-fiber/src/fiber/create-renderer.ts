/* eslint-disable @typescript-eslint/no-explicit-any */
import ReactReconciler from 'react-reconciler'
import { DefaultEventPriority } from 'react-reconciler/constants'

import { AsciiReconciler } from './types'
import {
  createInstance,
  commitUpdate,
  appendChild,
  appendInitialChild,
  removeChild,
  insertBefore
} from './instances'

export function createRenderer() {
  const reconciler = (ReactReconciler as AsciiReconciler)({
    // --------- General config ---------
    isPrimaryRenderer: false,
    supportsMutation: true,
    supportsHydration: false,
    supportsPersistence: false,

    // --------- Context and global state ---------
    getRootHostContext: (rootContainer) => ({container: rootContainer}),
    getChildHostContext: parentHostContext => parentHostContext,

    // --------- Instance operations ---------
    createInstance,
    commitUpdate,
    getPublicInstance: instance => instance, // refs
    insertBefore,
    removeChild,
    appendInitialChild,
    appendChild,
    prepareUpdate: (_instance, _type, _oldProps, _newProps, _rootContainer, _hostContext) => {
      // optionally intercept props when changing
      return true
    },
    prepareForCommit: () => null,
    resetAfterCommit: (rootContainer) => {
      rootContainer.render()
    },

    // --------- Container operations ---------
    appendChildToContainer(rootContainer, childInstance) {
      rootContainer.children.add(childInstance)
    },

    clearContainer(rootContainer) {
      rootContainer.children.array.forEach(child => {
        rootContainer.children.remove(child)
      })
    },
    removeChildFromContainer(rootContainer, childInstance) {
      rootContainer.children.remove(childInstance)
    },
    detachDeletedInstance: () => {},
    insertInContainerBefore: (rootContainer, child, beforeChild) => {
      rootContainer.children.insertBefore(child, beforeChild)
    },

    // --------- Text instances ---------
    createTextInstance: (text: string, rootContainer) => {
      return { text, container: rootContainer, getJson: () => text }
    },
    shouldSetTextContent: () => false,

    // --------- Timeout ---------
    scheduleTimeout: setTimeout,
    cancelTimeout: clearTimeout,
    noTimeout: -1,

    // --------- Other configs ---------
    getInstanceFromNode: () => null,
    finalizeInitialChildren: () => false,
    getCurrentEventPriority: () => DefaultEventPriority,
    beforeActiveInstanceBlur: () => {},
    afterActiveInstanceBlur: () => {},
    prepareScopeUpdate: () => {},
    getInstanceFromScope: () => null,
    preparePortalMount: () => {}
  })

  return reconciler
}
