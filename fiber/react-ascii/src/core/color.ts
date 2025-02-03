/* eslint-disable @typescript-eslint/no-explicit-any */

import { Jimp } from 'jimp'
import { JimpImage } from './image'
import { Vec2 } from '@/fiber/types'

export interface ColorParams {
  color: string
  size: Vec2
  position: Vec2
}

export class Color {
  /** UUID */
  public id: string
  /** Color */
  private _color: string
  /** Position */
  public position: Vec2
  /** Size */
  public size: Vec2

  private _image: JimpImage | null = null
  /** Is the image loaded. */
  public loaded: boolean = false

  constructor(params: ColorParams) {
    this.id = crypto.randomUUID()
    this._color = params.color
    this.position = params.position
    this.size = params.size

    this._image = new Jimp({
      width: this.size.x,
      height: this.size.y,
      color: this._color
    }) as JimpImage

    this.loaded = true
  }

  set color(color: string) {
    this._color = color
    this._image = new Jimp({
      width: this.size.x,
      height: this.size.y,
      color: this._color
    }) as JimpImage
  }

  get color(): string {
    return this._color
  }

  /** Get the image data, will throw an error if the image is not loaded */
  /** Get the image data, will throw an error if the image is not loaded */
  get image(): JimpImage {
    if (!this.loaded) {
      throw new Error('Image not loaded')
    }

    return this._image as JimpImage
  }
}
