import { Image } from '@/core/image'
import { Color } from '@/core/color'
import { ColorProps, ImageProps, InstanceType, ReconcilerConfig } from './types'

export const createInstance: ReconcilerConfig['createInstance'] = (type, props) => {
  switch (type) {
    case InstanceType.AsciiImage: {
      const imageProps = props as ImageProps
      return new Image({
        src: imageProps.src,
        position: imageProps.position
      })
    }
    case InstanceType.AsciiColor: {
      const colorProps = props as ColorProps
      return new Color({
        color: colorProps.color,
        position: colorProps.position,
        size: colorProps.size
      })
    }

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
    const imagePrevProps = prevProps as ImageProps
    const imageNextProps = nextProps as ImageProps

    if (imagePrevProps.src !== imageNextProps.src) instance.src = imageNextProps.src
    if (
      imagePrevProps.position.x !== imageNextProps.position.x ||
      imagePrevProps.position.y !== imageNextProps.position.y
    ) {
      instance.position.x = imageNextProps.position.x
      instance.position.y = imageNextProps.position.y
    }
  }

  if (instance instanceof Color) {
    const colorPrevProps = prevProps as ColorProps
    const colorNextProps = nextProps as ColorProps

    if (colorPrevProps.color !== colorNextProps.color) instance.color = colorNextProps.color
    if (
      colorPrevProps.position.x !== colorNextProps.position.x ||
      colorPrevProps.position.y !== colorNextProps.position.y
    ) {
      instance.position.x = colorNextProps.position.x
      instance.position.y = colorNextProps.position.y
    }
  }
}
