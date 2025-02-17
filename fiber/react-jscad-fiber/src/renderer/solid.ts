import type { Entity } from '@jscad/regl-renderer/types/geometry-utils-V2/entity'
import type { Geom3, Geom2 } from '@jscad/modeling/src/geometries/types'
import { entitiesFromSolids } from '@jscad/regl-renderer'

/** This class will transform jscad operations into renderable entities */

export interface CadSolidParams {
  smoothNormals?: boolean
  color?: number[]
}

export abstract class CadSolid {
  public id: string
  private smoothNormals?: boolean
  private color?: number[]

  abstract solid: Geom3 | Geom2

  constructor(params: CadSolidParams) {
    this.id = crypto.randomUUID()
    this.smoothNormals = params.smoothNormals ?? false
    this.color = params.color ?? [0, 0, 0]
  }

  getEntity(): Entity[] {
    return entitiesFromSolids(
      {
        smoothNormals: this.smoothNormals,
        color: this.color
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this.solid as any
    )
  }
}
