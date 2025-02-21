import { createBooleanFiber, isBooleanType } from '@/renderer/primitives-boolean'
import { ReconcilerConfig } from './types'
import { createPrimitive3dFiber, isPrimitiveType } from '@/renderer/primitives-3d'

export const createInstance: ReconcilerConfig['createInstance'] = (type, props) => {
  if (isPrimitiveType(type)) {
    return createPrimitive3dFiber(type, props)
  }
  if (isBooleanType(type)) {
    return createBooleanFiber(type, props)
  }
  throw new Error(`Unknown instance type: ${type}`)
}

export const commitUpdate: ReconcilerConfig['commitUpdate'] = (
  instance,
  _updatePayload,
  _type,
  _prevProps,
  nextProps,
  _internalHandle
) => {
  if ('updateProps' in instance) {
    instance.updateProps(nextProps)
  }
}

export const appendChild: ReconcilerConfig['appendChild'] = (instance, child) => {
  if (instance.children) {
    instance.children.add(child)
  }
}

export const removeChild: ReconcilerConfig['removeChild'] = (instance, child) => {
  if (instance.children) {
    instance.children.remove(child)
  }
}

export const insertBefore: ReconcilerConfig['insertBefore'] = (instance, child, before) => {
  if (instance.children) {
    instance.children.insertBefore(child, before)
  }
}

export const appendInitialChild: ReconcilerConfig['appendInitialChild'] = (instance, child) => {
  if (instance.children) {
    instance.children.add(child)
  }
}
