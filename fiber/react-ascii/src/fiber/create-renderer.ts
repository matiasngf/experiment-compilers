/* eslint-disable @typescript-eslint/no-explicit-any */
import ReactReconciler from 'react-reconciler'
import { HostConfig, ImageProps, Instance, InstanceProps, InstanceType } from './types'
import { Image } from '@/core/image'

function createInstance(type: InstanceType, props: InstanceProps): Instance {
  if (type === InstanceType.AsciiImage) {
    const imageProps = props as ImageProps
    return new Image({
      src: imageProps.src,
      position: imageProps.position
    })
  }
  throw new Error(`Unknown instance type: ${type}`)
}

function applyProps(instance: Instance, _oldProps: InstanceProps, props: InstanceProps) {
  if (instance instanceof Image) {
    if (_oldProps.src !== props.src) {
      instance.src = props.src
    }
    if (_oldProps.position.x !== props.position.x || _oldProps.position.y !== props.position.y) {
      instance.position.x = props.position.x
      instance.position.y = props.position.y
    }
  }
}

function traceWrap<T = unknown>(hostConfig: T): T {
  const traceWrappedHostConfig: any = {}
  Object.keys(hostConfig as any).map(key => {
    const func = (hostConfig as any)[key]
    traceWrappedHostConfig[key] = (...args: any[]) => {
      console.trace(key)
      return func(...args)
    }
  })
  return traceWrappedHostConfig
}

const hostContext = {}
const childHostContext = {}

export function createRenderer() {
  const reconciler = ReactReconciler<
    HostConfig['type'],
    HostConfig['props'],
    HostConfig['container'],
    HostConfig['instance'],
    HostConfig['textInstance'],
    HostConfig['suspenseInstance'],
    HostConfig['hydratableInstance'],
    HostConfig['publicInstance'],
    HostConfig['hostContext'],
    HostConfig['updatePayload'],
    HostConfig['childSet'],
    HostConfig['timeoutHandle'],
    HostConfig['noTimeout']
  >(
    traceWrap({
      supportsMutation: true,
      isPrimaryRenderer: true,
      supportsPersistence: false,
      supportsHydration: false,
      getRootHostContext: () => hostContext,
      getChildHostContext: () => childHostContext,
      prepareForCommit: () => null,
      resetAfterCommit: () => {},

      createInstance,

      appendInitialChild(parent, child) {
        if ('addChild' in parent) {
          if (child instanceof Image) {
            ;(parent as any).addChild(child)
          }
        }
      },

      finalizeInitialChildren() {
        return true
      },

      prepareUpdate() {
        return true
      },

      commitUpdate(instance, _updatePayload, _type, _oldProps, newProps) {
        applyProps(instance, _oldProps, newProps)
      },

      appendChild(a, b) {
        if ('addChild' in a) {
          ;(a as any).addChild(b)
        }

        return
      },

      appendChildToContainer(container, child) {
        if (child instanceof Image) {
          container.addChild(child)
        }
      },

      removeChild() {},
      removeChildFromContainer(container, child) {
        if (child instanceof Image) {
          container.removeChild(child)
        }
      },
      clearContainer(container) {
        container.children.forEach(child => {
          container.removeChild(child)
        })
      },
      shouldSetTextContent: () => false,
      createTextInstance: () => {
        throw new Error('createTextInstance is not supported')
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      getPublicInstance: instance => instance as any,
      scheduleTimeout: setTimeout,
      cancelTimeout: clearTimeout,
      noTimeout: -1,
      // scheduleMicrotask:
      //   typeof queueMicrotask === 'function'
      //     ? queueMicrotask
      //     : typeof Promise !== 'undefined'
      //       ? (callback: () => void) =>
      //           Promise.resolve(null)
      //             .then(callback)
      //             .catch(error => {
      //               console.error('Microtask error:', error)
      //             })
      //       : setTimeout,

      preparePortalMount: () => null,
      getCurrentEventPriority: () => 1,
      getInstanceFromNode: () => null,
      beforeActiveInstanceBlur: () => null,
      afterActiveInstanceBlur: () => null,
      prepareScopeUpdate: () => null,
      getInstanceFromScope: () => null,
      detachDeletedInstance: () => null
    })
  )

  return reconciler
}
