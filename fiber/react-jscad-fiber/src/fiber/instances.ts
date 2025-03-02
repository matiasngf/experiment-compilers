/* eslint-disable @typescript-eslint/no-explicit-any */
import { createBooleanFiber, isBooleanType } from '@/renderer/instances/primitives-boolean'
import { ReconcilerConfig } from './types'
import { createPrimitive3dFiber, isPrimitiveType } from '@/renderer/instances/primitives-3d'
import { createTransformFiber, isTransformType } from '@/renderer/instances/primitives-transform'

export const createInstance: ReconcilerConfig['createInstance'] = (type, props) => {
  if (isPrimitiveType(type)) {
    return createPrimitive3dFiber(type, props)
  }
  if (isBooleanType(type)) {
    return createBooleanFiber(type, props)
  }
  if (isTransformType(type)) {
    return createTransformFiber(props)
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
    instance.children.add(child as any)
  }
}

export const removeChild: ReconcilerConfig['removeChild'] = (instance, child) => {
  if (instance.children) {
    instance.children.remove(child as any)
  }
}

export const insertBefore: ReconcilerConfig['insertBefore'] = (instance, child, before) => {
  if (instance.children) {
    instance.children.insertBefore(child as any, before as any)
  }
}

export const appendInitialChild: ReconcilerConfig['appendInitialChild'] = (instance, child) => {
  if (instance.children) {
    instance.children.add(child as any)
  }
}
