/* eslint-disable @typescript-eslint/no-explicit-any */
import { Container } from '@/renderer/container'
import type Reconciler from 'react-reconciler'
import type { HostConfig } from 'react-reconciler'

export type Root = { fiber: Reconciler.FiberRoot }

export interface Instance {
  type: string
  props: Record<string, unknown>
  children: (Instance | TextInstance)[]
  container: Container
  getJson: () => Object
}

export interface TextInstance {
  text: string
  container: Container
  getJson: () => string
}

export interface ReconcilierArgs {
  type: string
  props: Record<string, unknown>
  container: Container
  instance: Instance
  textInstance: TextInstance
  suspenseInstance: never
  hydratableInstance: never
  publicInstance: Instance | TextInstance
  hostContext: {container: Container}
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

export interface DalleElements {
  [key: string]: Record<string, unknown>
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements extends DalleElements {}
  }
}
