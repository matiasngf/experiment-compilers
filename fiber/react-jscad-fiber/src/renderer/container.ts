/** Renderer container for JSCAD */

import { cameras, drawCommands, prepareRender } from '@jscad/regl-renderer'
import type { Entity } from '@jscad/regl-renderer/types/geometry-utils-V2/entity'
import { CadSolid } from './solid'

const perspectiveCamera = cameras.perspective

export interface RenderOptions {
  camera: typeof perspectiveCamera.defaults
  drawCommands: typeof drawCommands
  entities: Entity[]
}

export type Renderer = (options: RenderOptions) => void

export interface ContainerParams {
  canvasContainer: HTMLElement
}

export class Container {
  public camera: typeof perspectiveCamera.defaults

  private canvasContainer: HTMLElement
  private renderer: Renderer

  private drawCommands = {
    drawAxis: drawCommands.drawAxis,
    drawGrid: drawCommands.drawGrid,
    drawLines: drawCommands.drawLines,
    drawMesh: drawCommands.drawMesh
  }

  private renderOptions: RenderOptions

  constructor(params: ContainerParams) {
    this.canvasContainer = params.canvasContainer
    this.renderer = prepareRender({
      glOptions: { container: this.canvasContainer }
    })

    const width = this.canvasContainer.clientWidth
    const height = this.canvasContainer.clientHeight

    this.camera = perspectiveCamera.defaults
    perspectiveCamera.setProjection(this.camera, this.camera, {
      width,
      height
    })
    perspectiveCamera.update(this.camera, this.camera)

    // set initial render options
    this.renderOptions = {
      camera: this.camera,
      drawCommands: this.drawCommands,
      entities: []
    }

    const resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        if (entry.target === this.canvasContainer) this.resizeHandler()
      }
    })
    resizeObserver.observe(this.canvasContainer)
  }

  private resizeHandler = () => {
    const width = this.canvasContainer.clientWidth
    const height = this.canvasContainer.clientHeight

    perspectiveCamera.setProjection(this.camera, this.camera, {
      width,
      height
    })
    perspectiveCamera.update(this.camera, this.camera)
  }

  public children: CadSolid[] = []

  public addChild(child: CadSolid) {
    this.children.push(child)
  }

  public removeChild(child: CadSolid) {
    this.children = this.children.filter(c => c.id !== child.id)
  }

  public addChildBefore(child: CadSolid, beforeChild: CadSolid) {
    this.children = this.children.filter(c => c !== child)
    this.children.splice(this.children.indexOf(beforeChild), 0, child)
  }

  public render() {
    this.renderOptions.entities = []
    this.children.forEach(child => {
      this.renderOptions.entities.push(...child.getEntity())
    })
    this.renderer(this.renderOptions)
  }
}
