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
  >({
    getRootHostContext: () => ({}),
    getChildHostContext: () => ({}),
    prepareForCommit: () => null,
    resetAfterCommit: () => {},

    createInstance,

    shouldSetTextContent: () => false,

    clearContainer(container: any) {
      container.children.forEach((child: any) => {
        container.removeChild(child)
      })
    },

    removeChildFromContainer(container: any, child: any) {
      if (child instanceof Image) {
        container.removeChild(child)
      }
    },

    appendInitialChild(parent: any, child: any) {
      if ('addChild' in parent && child instanceof Image) (parent as any).addChild(child)
    },

    appendChild(parent: any, child: any) {
      if ('addChild' in parent) (parent as any).addChild(child)
    },

    appendChildToContainer(container: any, child: any) {
      if (child instanceof Image) container.addChild(child)
    },

    prepareUpdate() {
      return true
    },

    commitUpdate(instance: any, _updatePayload: any, _type: any, oldProps: any, newProps: any) {
      if (instance instanceof Image) {
        if (oldProps.src !== newProps.src) instance.src = newProps.src
        if (
          oldProps.position.x !== newProps.position.x ||
          oldProps.position.y !== newProps.position.y
        ) {
          instance.position.x = newProps.position.x
          instance.position.y = newProps.position.y
        }
      }
    },

    removeChild() {},

    supportsMutation: true,
    finalizeInitialChildren: () => false
  } as any)

  return reconciler
}
