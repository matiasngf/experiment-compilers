export interface HostConfig {
  now: () => number
  getRootHostContext: () => any
  getChildHostContext: () => any
  prepareForCommit: () => null
  resetAfterCommit: () => void
  createInstance: (type: string, props: any) => any
  appendInitialChild: (parent: any, child: any) => void
  finalizeInitialChildren: () => boolean
  prepareUpdate: () => boolean
  commitUpdate: (
    instance: any,
    updatePayload: any,
    type: string,
    oldProps: any,
    newProps: any
  ) => void
  appendChild: (parent: any, child: any) => void
  appendChildToContainer: (container: any, child: any) => void
  removeChild: () => void
  removeChildFromContainer: () => void
  commitTextUpdate: () => void
  clearContainer: (container: any) => void
  shouldSetTextContent: (type: string, props: any) => boolean
  createTextInstance: (text: string) => string
  supportsMutation: boolean
  isPrimaryRenderer: boolean
  supportsPersistence: boolean
  supportsHydration: boolean
  getPublicInstance: (instance: any) => any
  scheduleTimeout: typeof setTimeout
  cancelTimeout: typeof clearTimeout
  noTimeout: number
  scheduleMicrotask: (callback: () => void) => void
}