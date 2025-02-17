import { InstanceType, ReconcilerConfig } from './types'
import {
  createCuboidFiber,
  createSphereFiber,
  CuboidProps,
  SphereProps
} from '@/renderer/primitives-3d'

export const createInstance: ReconcilerConfig['createInstance'] = (type, props) => {
  switch (type) {
    case InstanceType.Sphere: {
      const sphereProps = props as SphereProps
      return createSphereFiber(sphereProps)
    }
    case InstanceType.Cuboid: {
      const cuboidProps = props as CuboidProps
      return createCuboidFiber(cuboidProps)
    }

    default:
      throw new Error(`Unknown instance type: ${type}`)
  }
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
