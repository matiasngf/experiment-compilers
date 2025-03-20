/* eslint-disable @typescript-eslint/no-explicit-any */

import { Vec2 } from '@/fiber/types'
import { Jimp } from 'jimp'

export type JimpImage = Awaited<ReturnType<typeof Jimp.read>>

export interface ImageParams {
  src: string | Buffer | ArrayBuffer
  position: Vec2
  scale?: number
  onLoad?: () => void
  onError?: (error: Error) => void
}

export class Image {
  /** UUID */
  id: string
  /** Image source */
  src: string | Buffer | ArrayBuffer
  /** Position */
  position: Vec2

  private originalImage: JimpImage | null = null

  private _image: JimpImage | null = null
  /** Is the image loaded. */
  public loaded: boolean = false

  constructor(params: ImageParams) {
    this.id = crypto.randomUUID()
    this.src = params.src
    this.position = params.position
    this._scale = params.scale ?? 1

    Jimp.read(this.src)
      .then(img => {
        const image = img as JimpImage
        this.originalImage = image
        this.applyImage()
        this.loaded = true
        params.onLoad?.()
      })
      .catch(error => {
        params.onError?.(error)
      })
  }

  private applyImage() {
    if (!this.originalImage) {
      return
    }

    const img = this.originalImage.clone()
    img.scale(this._scale)
    this._image = img
  }

  public setSrc(value: string | Buffer | ArrayBuffer) {
    this.src = value
    Jimp.read(this.src).then(img => {
      const image = img as JimpImage
      this.originalImage = image
      this.applyImage()
    })
  }

  /** Get the image data, will throw an error if the image is not loaded */
  get image(): JimpImage {
    if (!this.loaded) {
      throw new Error('Image not loaded')
    }

    return this._image as JimpImage
  }

  private _scale: number

  /** Scale of the image */
  get scale(): number {
    return this._scale
  }

  /** Set the scale of the image */
  set scale(value: number) {
    this._scale = value
    this.applyImage()
  }
}
