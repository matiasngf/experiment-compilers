/* eslint-disable @typescript-eslint/no-explicit-any */
import Reconciler from 'react-reconciler'
import { Image } from '@/core/image'
import { Renderer } from '@/core/renderer'

export type Root = { fiber: Reconciler.FiberRoot }

// export type InstanceType = 'asciiImage'

export enum InstanceType {
  AsciiImage = 'asciiImage'
}

export interface ImageProps {
  src: string | Buffer
  position: {
    x: number
    y: number
  }
}

export interface RendererProps {
  width: number
  height: number
}

export type InstanceProps = ImageProps

export type Instance = Image

export interface HostConfig {
  container: Renderer
  updatePayload: any
  type: InstanceType
  props: InstanceProps
  instance: Instance
  textInstance: void
  suspenseInstance: Instance
  hydratableInstance: Instance
  publicInstance: Instance
  hostContext: Record<string, never>
  childSet: never
  timeoutHandle: number | undefined
  noTimeout: -1
}

interface AsciiElements {
  asciiImage: ImageProps
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements extends AsciiElements {}
  }
}
