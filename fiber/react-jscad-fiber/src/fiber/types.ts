/* eslint-disable @typescript-eslint/no-explicit-any */
import { Container } from '@/renderer/container'
import { CuboidProps, PrimitiveSolid, SphereProps } from '@/renderer/primitives-3d'
import type Reconciler from 'react-reconciler'
import type { HostConfig } from 'react-reconciler'

export type Root = { fiber: Reconciler.FiberRoot }

export enum InstanceType {
  Sphere = 'sphere',
  Cuboid = 'cuboid'
}

export type InstanceProps = SphereProps | CuboidProps

export type Instance = PrimitiveSolid<SphereProps | CuboidProps>

export interface ReconcilierArgs {
  type: InstanceType
  props: InstanceProps
  container: Container
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
  cuboid: CuboidProps
  sphere: SphereProps
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements extends AsciiElements {}
  }
}
