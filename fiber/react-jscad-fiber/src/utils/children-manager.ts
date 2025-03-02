import { subscribable } from '@/utils/subscribable'

interface ChildrenManagerParams<T> {
  /**
   * If provided, the children manager will validate the type of the children.
   * If the child is not of the correct type, an error will be thrown.
   */
  validator?: (child: unknown) => child is T
}

export class ChildrenManager<T> {
  private children: T[] = []

  private validator?: (child: unknown) => child is T

  constructor(params: ChildrenManagerParams<T> = {}) {
    this.validator = params.validator
  }

  public add(child: T) {
    if (this.validator && !this.validator(child)) {
      throw new Error(`Invalid child: ${typeof child} is not accepted by parent.`)
    }
    this.children.push(child)
    this.onAddSubscriptions.runCallbacks(child, this.children.length - 1)
  }

  public remove(child: T) {
    this.children = this.children.filter(c => c !== child)
    this.onRemoveSubscriptions.runCallbacks(child)
    this.onChangeSubscriptions.runCallbacks({
      type: ChildChangeEvent.Remove,
      child
    })
  }

  public insertBefore(child: T, before: T) {
    if (this.validator && !this.validator(child)) {
      throw new Error(`Invalid child: ${typeof child} is not accepted by parent.`)
    }
    if (this.children.includes(child)) {
      // remove the child from the array
      this.children = this.children.filter(c => c !== child)
    }

    const index = this.children.indexOf(before)
    if (index === -1) {
      throw new Error('Before child not found')
    }
    this.children.splice(index, 0, child)
    this.onAddSubscriptions.runCallbacks(child, index)
    this.onChangeSubscriptions.runCallbacks({
      type: ChildChangeEvent.Add,
      child,
      index
    })
  }

  public get array() {
    return this.children
  }

  public get length() {
    return this.children.length
  }

  public clear() {
    this.children.splice(0, this.children.length)
    this.onClearSubscriptions.runCallbacks()
    this.onChangeSubscriptions.runCallbacks({
      type: ChildChangeEvent.Clear
    })
  }

  // Event subscriptions
  private onChangeSubscriptions = subscribable<OnChangeChildCallback<T>>()
  public onChange(callback: () => void) {
    this.onChangeSubscriptions.addCallback(callback)
    return () => this.removeOnChange(callback)
  }

  public removeOnChange(callback: () => void) {
    this.onChangeSubscriptions.removeCallback(callback)
  }

  private onAddSubscriptions = subscribable<OnAddChildCallback<T>>()
  private onRemoveSubscriptions = subscribable<OnRemoveChildCallback<T>>()
  private onClearSubscriptions = subscribable<OnClearChildrenCallback>()
}

export enum ChildChangeEvent {
  Add = 'add',
  Remove = 'remove',
  Clear = 'clear'
}

type OnAddChildCallback<T> = (child: T, index: number) => void
type OnRemoveChildCallback<T> = (child: T) => void
type OnClearChildrenCallback = () => void

interface ChildrenAddedParams<T> {
  type: ChildChangeEvent.Add
  child: T
  index: number
}

interface ChildrenRemovedParams<T> {
  type: ChildChangeEvent.Remove
  child: T
}

interface ChildrenClearedParams {
  type: ChildChangeEvent.Clear
}

type OnChangeChildCallback<T> = (
  params: ChildrenAddedParams<T> | ChildrenRemovedParams<T> | ChildrenClearedParams
) => void
