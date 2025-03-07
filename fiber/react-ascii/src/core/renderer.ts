import { intToRGBA, Jimp } from 'jimp'
import { Image, JimpImage } from './image'
import { Chalk } from 'chalk'
import { Color } from './color'
import { subscribable } from './utils/subscribable'

const ch = new Chalk({
  level: 3
})

const LOWER_BLOCK_CHAR = '▄'

export type RenderFrameCallback = (renderer: Renderer, delta: number) => void

type RendererChild = Image | Color

export interface RendererOptions {
  clearColor?: number
  width?: number
  height?: number
}

export class Renderer {
  public children: RendererChild[] = []

  public buffer: JimpImage

  private clearBuffer: JimpImage
  public width: number
  public height: number

  constructor({ clearColor = 0x000000ff, width = 30, height = 30 }: RendererOptions = {}) {
    this.width = width
    this.height = height

    this.buffer = new Jimp({
      width,
      height,
      color: clearColor
    }) as JimpImage

    this.clearBuffer = new Jimp({
      width,
      height,
      color: clearColor
    }) as JimpImage

    this.clearColor = clearColor
  }

  private renderBuffer() {
    for (const child of this.children) {
      if (child.loaded) {
        this.buffer.composite(child.image, child.position.x, child.position.y)
      }
    }
  }

  private _onFrameCallbacks = subscribable<RenderFrameCallback>()

  public onFrame(callback: RenderFrameCallback) {
    return this._onFrameCallbacks.addCallback(callback)
  }

  /** Removes subscription to frame callback
   * @param id - The id or callback function of the callback to remove
   */
  public removeFrameCallback(id: string | RenderFrameCallback) {
    this._onFrameCallbacks.removeCallback(id)
  }

  private _onAfterFrameCallbacks = subscribable<RenderFrameCallback>()

  public onAfterFrame(callback: RenderFrameCallback) {
    return this._onAfterFrameCallbacks.addCallback(callback)
  }

  public removeAfterFrameCallback(id: string | RenderFrameCallback) {
    this._onAfterFrameCallbacks.removeCallback(id)
  }

  public intToHex(color: number) {
    const rgb = intToRGBA(color)
    return (
      '#' +
      rgb.r.toString(16).padStart(2, '0') +
      rgb.g.toString(16).padStart(2, '0') +
      rgb.b.toString(16).padStart(2, '0')
    )
  }

  public addChild(child: RendererChild) {
    this.children.push(child)
  }

  public removeChild(child: RendererChild) {
    this.children = this.children.filter(c => c.id !== child.id)
  }

  public addChildBefore(child: RendererChild, beforeChild: RendererChild) {
    this.children = this.children.filter(c => c !== child)

    this.children.splice(this.children.indexOf(beforeChild), 0, child)
  }

  private getAscii() {
    let ascii = ''

    for (let j = 0; j < this.buffer.bitmap.height / 2; j++) {
      for (let i = 0; i < this.buffer.bitmap.width; i++) {
        const upperPixelPos = [i, j * 2] as const
        const lowerPixelPos = [i, j * 2 + 1] as const

        let nextChar = LOWER_BLOCK_CHAR

        const clrUpper = this.intToHex(this.buffer.getPixelColor(...upperPixelPos))
        const clrLower = this.intToHex(this.buffer.getPixelColor(...lowerPixelPos))

        nextChar = ch.bgHex(clrUpper)(nextChar)
        nextChar = ch.hex(clrLower)(nextChar)

        ascii += nextChar
      }

      ascii += '\n'
    }

    return ascii
  }

  private _frameLastCalled = 0

  public render() {
    const now = performance.now()
    const delta = now - this._frameLastCalled
    this._frameLastCalled = now
    this._onFrameCallbacks.runCallbacks(this, delta)

    this.renderBuffer()
    const ascii = this.getAscii()

    this._onAfterFrameCallbacks.runCallbacks(this, delta)
    return ascii
  }

  public clearColor: number

  public clear() {
    this.buffer.bitmap.data.set(this.clearBuffer.bitmap.data, 0)
  }
}
