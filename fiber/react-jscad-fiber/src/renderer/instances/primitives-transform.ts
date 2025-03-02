import { CadSolid, CadSolidParams, isCadSolid } from '../solid'
import { ChildrenManager } from '../../utils/children-manager'
import { Geom3 } from '@jscad/modeling/src/geometries/types'
import { Entity } from '@jscad/regl-renderer/types/geometry-utils-V2/entity'
import { vec3 } from '@jscad/modeling/src/maths'
import { geometries, transforms } from '@jscad/modeling'
import { union } from '@jscad/modeling/src/operations/booleans'

export interface TransformParams extends CadSolidParams {
  // Transform specific parameters
  position?: [number, number, number]
  rotation?: [number, number, number]
  scale?: [number, number, number] | number
  matrix?: number[] // For direct matrix manipulation
}

export class PrimitiveTransform extends CadSolid<CadSolid> {
  private transformParams: TransformParams
  public solid: Geom3 = geometries.geom3.create()

  public children = new ChildrenManager<CadSolid>({
    validator: isCadSolid
  })

  constructor(params: TransformParams) {
    super(params)

    this.transformParams = params

    this.children.onChange(() => {
      this.needsUpdate = true
      this.updateSolid()
    })

    this.updateSolid()
  }

  public updateProps({ color, smoothNormals, ...transformParams }: TransformParams) {
    this.color = color
    this.smoothNormals = smoothNormals
    this.transformParams = { ...this.transformParams, ...transformParams }
    this.updateSolid()
  }

  private updateSolid() {
    if (this.children.array.length === 0) {
      this.solid = geometries.geom3.create()
      this.needsUpdate = true
      return
    }
    this.solid = union(...(this.children.array.map(c => c.solid) as Geom3[]))

    const { position, rotation, scale, matrix: customMatrix } = this.transformParams

    // If custom matrix is provided, use it directly
    if (customMatrix) {
      return customMatrix
    }

    // Apply rotation (in degrees)
    if (rotation) {
      const [rx, ry, rz] = rotation
      this.solid = transforms.rotateX((rx * Math.PI) / 180, this.solid)
      this.solid = transforms.rotateY((ry * Math.PI) / 180, this.solid)
      this.solid = transforms.rotateZ((rz * Math.PI) / 180, this.solid)
    }

    // Apply translation
    if (position) {
      this.solid = transforms.translate(position, this.solid)
    }

    // Apply scaling
    if (scale !== undefined) {
      const scaleVec =
        typeof scale === 'number'
          ? vec3.fromValues(scale, scale, scale)
          : vec3.fromValues(scale[0], scale[1], scale[2])

      this.solid = transforms.scale(scaleVec, this.solid)
    }

    this.needsUpdate = true
  }

  getEntity(): Entity[] {
    const childrenNeedsUpdate = this.children.array.some(c => c.needsUpdate)
    // This is not performant, the getEntity and solid updates logic should be separated
    this.children.array.forEach(c => (c as CadSolid).getEntity())
    if (childrenNeedsUpdate) {
      this.updateSolid()
    }
    return super.getEntity()
  }
}

export function createTransformFiber(params: TransformParams) {
  return new PrimitiveTransform(params)
}

export const isTransformType = (type: string): type is 'transform' => {
  return type === 'transform'
}
