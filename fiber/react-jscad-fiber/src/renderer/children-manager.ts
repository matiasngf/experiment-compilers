import { subscribable } from '@/utils/subscribable'

export class ChildrenManager<T> {
  private children: T[] = []

  constructor() {}

  public add(child: T) {
    this.children.push(child)
    this.onChangeSubscriptions.runCallbacks()
  }

  public remove(child: T) {
    this.children = this.children.filter(c => c !== child)
    this.onChangeSubscriptions.runCallbacks()
  }

  public insertBefore(child: T, before: T) {
    if (this.children.includes(child)) {
      // remove the child from the array
      this.children = this.children.filter(c => c !== child)
    }

    const index = this.children.indexOf(before)
    if (index === -1) {
      throw new Error('Before child not found')
    }
    this.children.splice(index, 0, child)
    this.onChangeSubscriptions.runCallbacks()
  }

  public get array() {
    return this.children
  }

  public get length() {
    return this.children.length
  }

  public clear() {
    this.children.splice(0, this.children.length)
  }

  onChangeSubscriptions = subscribable<() => void>()

  public onChange(callback: () => void) {
    this.onChangeSubscriptions.addCallback(callback)
    return () => this.removeOnChange(callback)
  }

  public removeOnChange(callback: () => void) {
    this.onChangeSubscriptions.removeCallback(callback)
  }
}
