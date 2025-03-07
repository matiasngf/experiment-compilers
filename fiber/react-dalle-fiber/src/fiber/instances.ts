/* eslint-disable @typescript-eslint/no-explicit-any */
import { Instance, ReconcilerConfig } from './types'

export const createInstance: ReconcilerConfig['createInstance'] = (type, props, rootContainer) => {
  const instance: Instance = {
    type,
    props,
    children: [],
    container: rootContainer,
    getJson: () => {
      const hasChildren = instance.children.length > 0
      return {
        ...instance.props,
        objectType: instance.type,
        children: hasChildren ? instance.children.map(c => c.getJson()) : undefined
      }
    }
  }

  return instance
}

export const commitUpdate: ReconcilerConfig['commitUpdate'] = (
  instance,
  _updatePayload,
  _type,
  _prevProps,
  nextProps,
  _internalHandle
) => {
  if (typeof instance === 'string') {
    return
  }
  instance.props = nextProps
}

export const appendChild: ReconcilerConfig['appendChild'] = (instance, child) => {
  instance.children.push(child)
}

export const removeChild: ReconcilerConfig['removeChild'] = (instance, child) => {
  instance.children = instance.children.filter(c => c !== child)
}

export const insertBefore: ReconcilerConfig['insertBefore'] = (instance, child, before) => {
  if (typeof instance === 'string') {
    return
  }
  instance.children.splice(instance.children.indexOf(before), 0, child)
}

export const appendInitialChild: ReconcilerConfig['appendInitialChild'] = (instance, child) => {
  instance.children.push(child)
}
