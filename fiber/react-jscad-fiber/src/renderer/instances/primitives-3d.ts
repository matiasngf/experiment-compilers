import { primitives } from '@jscad/modeling'
import { CadSolid, CadSolidParams } from '../solid'
import { Geom3 } from '@jscad/modeling/src/geometries/types'
interface CreatePrimitiveSolidParams<T> extends CadSolidParams {
  type: PrimitiveType
  primitiveParams: T
}

export class PrimitiveSolid<T extends CadSolidParams> extends CadSolid {
  private type: PrimitiveType
  private primitiveParams: T
  public solid: Geom3

  private builder: (props: T) => Geom3

  constructor({ type, primitiveParams, ...solidParams }: CreatePrimitiveSolidParams<T>) {
    super(solidParams)

    this.type = type
    this.primitiveParams = primitiveParams

    // select the creation class function
    this.builder = primitives[this.type] as (props: T) => Geom3
    this.solid = this.builder(this.primitiveParams)
    this.needsUpdate = true
  }

  public updateProps({ color, smoothNormals, ...props }: T) {
    this.color = color
    this.smoothNormals = smoothNormals

    this.primitiveParams = { ...this.primitiveParams, ...props }
    const prev = this.solid
    this.solid = this.builder(this.primitiveParams)
    // gc
    const namespace = { prev } as Record<string, unknown>
    delete namespace.prev

    this.needsUpdate = true
  }
}

export type PrimitiveType = keyof Omit<
  typeof primitives,
  | 'arc'
  | 'circle'
  | 'ellipse'
  | 'line'
  | 'polygon'
  | 'polyhedron'
  | 'rectangle'
  | 'roundedCuboid'
  | 'roundedCylinder'
  | 'roundedRectangle'
  | 'star'
  | 'torus'
  | 'triangle'
>

export function createPrimitive3dFiber(
  type: PrimitiveType,
  { color, smoothNormals, ...props }: CadSolidParams & unknown
) {
  return new PrimitiveSolid<CadSolidParams>({
    type,
    primitiveParams: props,
    color,
    smoothNormals
  })
}

export const isPrimitiveType = (type: string): type is PrimitiveType => {
  return type in primitives
}
