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
    getRootHostContext: () => null,
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
    resetAfterCommit: () => {},

    // --------- Container operations ---------
    appendChildToContainer(rootContainer, childInstance) {
      rootContainer.children.add(childInstance as any)
    },

    clearContainer(rootContainer) {
      rootContainer.children.array.forEach(child => {
        rootContainer.children.remove(child as any)
      })
    },
    removeChildFromContainer(rootContainer, childInstance) {
      rootContainer.children.remove(childInstance as any)
    },
    detachDeletedInstance: () => {},
    insertInContainerBefore: (parent, child, beforeChild) => {
      parent.children.insertBefore(child as any, beforeChild as any)
    },

    // --------- Text instances ---------
    createTextInstance: () => {
      throw new Error('Text instances are not supported in ASCII mode')
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
