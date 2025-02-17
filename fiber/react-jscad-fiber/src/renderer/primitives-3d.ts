import { primitives } from '@jscad/modeling'
import { CadSolid, CadSolidParams } from './solid'
import type { CuboidOptions } from '@jscad/modeling/src/primitives/cuboid'
import { Geom3 } from '@jscad/modeling/src/geometries/types'
import { SphereOptions } from '@jscad/modeling/src/primitives'

interface CreatePrimitiveSolidParams<T> extends CadSolidParams {
  type: keyof typeof primitives
  primitiveParams: T
}

export class PrimitiveSolid<T extends CadSolidParams> extends CadSolid {
  private type: keyof typeof primitives
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
    this.needsUpdate = true
    this.solid = this.builder({ ...this.primitiveParams, ...props, color, smoothNormals })
  }
}

export type SphereProps = CadSolidParams & SphereOptions

export function createSphereFiber({ color, smoothNormals, ...props }: SphereProps) {
  return new PrimitiveSolid<SphereProps>({
    type: 'sphere',
    primitiveParams: props,
    color,
    smoothNormals
  })
}

export type CuboidProps = CadSolidParams & CuboidOptions

export function createCuboidFiber({ color, smoothNormals, ...props }: CuboidProps) {
  return new PrimitiveSolid<CuboidProps>({
    type: 'cuboid',
    primitiveParams: props,
    color,
    smoothNormals
  })
}
