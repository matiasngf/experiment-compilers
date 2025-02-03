/* eslint-disable @typescript-eslint/no-explicit-any */
import type Reconciler from 'react-reconciler'
import type { HostConfig } from 'react-reconciler'
import type { Image } from '@/core/image'
import type { Renderer } from '@/core/renderer'

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

export interface ReconcilierArgs {
  type: InstanceType
  props: InstanceProps
  container: Renderer
  instance: Instance
  textInstance: never
  suspenseInstance: never
  hydratableInstance: never
  publicInstance: Instance
  hostContext: never
  updatePayload: any
  childSet: never
  timeoutHandle: number | undefined
  noTimeout: -1
}

export type AsciiReconciler = typeof Reconciler<
  ReconcilierArgs['type'],
  ReconcilierArgs['props'],
  ReconcilierArgs['container'],
  ReconcilierArgs['instance'],
  ReconcilierArgs['textInstance'],
  ReconcilierArgs['suspenseInstance'],
  ReconcilierArgs['hydratableInstance'],
  ReconcilierArgs['publicInstance'],
  ReconcilierArgs['hostContext'],
  ReconcilierArgs['updatePayload'],
  ReconcilierArgs['childSet'],
  ReconcilierArgs['timeoutHandle'],
  ReconcilierArgs['noTimeout']
>

/** The types of the config object passed to the Reconciler */
export type ReconcilerConfig = HostConfig<
  ReconcilierArgs['type'],
  ReconcilierArgs['props'],
  ReconcilierArgs['container'],
  ReconcilierArgs['instance'],
  ReconcilierArgs['textInstance'],
  ReconcilierArgs['suspenseInstance'],
  ReconcilierArgs['hydratableInstance'],
  ReconcilierArgs['publicInstance'],
  ReconcilierArgs['hostContext'],
  ReconcilierArgs['updatePayload'],
  ReconcilierArgs['childSet'],
  ReconcilierArgs['timeoutHandle'],
  ReconcilierArgs['noTimeout']
>

/** Type the global elements */
export interface AsciiElements {
  asciiImage: ImageProps
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements extends AsciiElements {}
  }
}
