import { booleans, geometries } from '@jscad/modeling'

import { CadSolid, CadSolidParams } from './solid'
import { ChildrenManager } from './children-manager'
import { Geom3 } from '@jscad/modeling/src/geometries/types'
import { Entity } from '@jscad/regl-renderer/types/geometry-utils-V2/entity'

interface CreatePrimitiveBooleanParams extends CadSolidParams {
  type: keyof typeof booleans
}

export class PrimitiveBoolean extends CadSolid {
  private type: keyof typeof booleans
  public solid: Geom3 = geometries.geom3.create()

  private builder: (...props: unknown[]) => Geom3

  public children = new ChildrenManager<CadSolid>()

  constructor({ type, ...solidParams }: CreatePrimitiveBooleanParams) {
    super(solidParams)

    this.type = type

    // select the creation class function
    this.builder = booleans[this.type] as (...props: unknown[]) => Geom3
    this.needsUpdate = true

    this.children.onChange(() => {
      this.updateBuild()
    })
  }

  public updateProps({ color, smoothNormals }: CadSolidParams) {
    this.color = color
    this.smoothNormals = smoothNormals
    this.updateBuild()
  }

  private updateBuild() {
    try {
      const g = this.builder(...this.children.array.map(c => c.solid))
      this.solid = g
      this.needsUpdate = true
    } catch (_error) {
      // ignore
    }
  }

  getEntity(): Entity[] {
    const childrenNeedsUpdate = this.children.array.some(c => c.needsUpdate)
    if (childrenNeedsUpdate) {
      this.updateBuild()
    }

    this.children.array.forEach(c => {
      c.needsUpdate = false
    })
    return super.getEntity()
  }
}

export function createBooleanFiber(type: keyof typeof booleans, params: CadSolidParams) {
  return new PrimitiveBoolean({ type, ...params })
}

export const isBooleanType = (type: string): type is keyof typeof booleans => {
  return type in booleans
}
