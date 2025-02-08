import ReactReconciler from 'react-reconciler'
import { DefaultEventPriority } from 'react-reconciler/constants'

import { AsciiReconciler } from './types'
import { createInstance, commitUpdate } from './instances'

export function createRenderer() {
  const reconciler = (ReactReconciler as AsciiReconciler)({
    // --------- General config ---------
    isPrimaryRenderer: true,
    supportsMutation: true,
    supportsHydration: false,
    supportsPersistence: false, // 👀

    // --------- Context and global state ---------
    getRootHostContext: () => null,
    getChildHostContext: parentHostContext => parentHostContext,

    // --------- Instance operations ---------
    createInstance,
    commitUpdate,
    getPublicInstance: instance => instance, // refs
    insertBefore: () => {
      // Empty for now
    },
    removeChild(_parentInstance, _childInstance) {
      /** For now, no instances can have children
       * Furure implementation:
       */
      // if ('removeChild' in parent) {
      //   _parentInstance.removeChild(_childInstance)
      // } else {
      //   throw new Error('Parent does not support removeChild')
      // }
    },
    appendInitialChild(_parentInstance, _childInstance) {
      return null
      /** For now, no instances can have children
       * Possible implementation:
       */
      // if ('addChild' in parent) {
      //   _parentInstance.addChild(_childInstance)
      // } else {
      //   throw new Error('Parent does not support addChild')
      // }
    },
    appendChild(_parentInstance, _childInstance) {
      return null
      /** For now, no instances can have children
       * Possible implementation:
       */
      // if ('addChild' in _parentInstance) {
      //   _parentInstance.addChild(_childInstance)
      // } else {
      //   throw new Error('Parent does not support addChild')
      // }
    },
    prepareUpdate: (_instance, _type, _oldProps, _newProps, _rootContainer, _hostContext) => {
      // optionally intercept props when changing
      return true
    },
    prepareForCommit: () => null,
    resetAfterCommit: () => {},

    // --------- Container operations ---------
    appendChildToContainer(rootContainer, childInstance) {
      rootContainer.addChild(childInstance)
    },

    clearContainer(rootContainer) {
      rootContainer.children.forEach(child => {
        rootContainer.removeChild(child)
      })
    },
    removeChildFromContainer(rootContainer, childInstance) {
      rootContainer.removeChild(childInstance)
    },
    detachDeletedInstance: () => {},
    insertInContainerBefore: (parent, child, beforeChild) => {
      parent.addChildBefore(child, beforeChild)
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
