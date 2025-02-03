import { Image } from '@/core/image'

import { InstanceType, ReconcilerConfig } from './types'

export const createInstance: ReconcilerConfig['createInstance'] = (type, props) => {
  switch (type) {
    case InstanceType.AsciiImage:
      return new Image({
        src: props.src,
        position: props.position
      })

    default:
      throw new Error(`Unknown instance type: ${type}`)
  }
}

export const commitUpdate: ReconcilerConfig['commitUpdate'] = (
  instance,
  _updatePayload,
  _type,
  prevProps,
  nextProps,
  _internalHandle
) => {
  if (instance instanceof Image) {
    if (prevProps.src !== nextProps.src) instance.src = nextProps.src
    if (
      prevProps.position.x !== nextProps.position.x ||
      prevProps.position.y !== nextProps.position.y
    ) {
      instance.position.x = nextProps.position.x
      instance.position.y = nextProps.position.y
    }
  }
}
