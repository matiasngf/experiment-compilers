import type { Entity } from '@jscad/regl-renderer/types/geometry-utils-V2/entity'
import type { Geom3, Geom2 } from '@jscad/modeling/src/geometries/types'
import { entitiesFromSolids } from '@jscad/regl-renderer'
import { ChildrenManager } from './children-manager'

/** This class will transform jscad operations into renderable entities */

export interface CadSolidParams {
  smoothNormals?: boolean
  color?: number[]
}

export abstract class CadSolid {
  public id: string
  public smoothNormals?: boolean
  public color?: number[]

  public needsUpdate = false
  public entities: Entity[] = []

  public children?: ChildrenManager<unknown>

  abstract solid: Geom3 | Geom2

  constructor(params: CadSolidParams) {
    this.id = crypto.randomUUID()
    this.smoothNormals = params.smoothNormals
    this.color = params.color
  }

  getEntity(): Entity[] {
    if (this.needsUpdate) {
      this.entities = entitiesFromSolids(
        {
          smoothNormals: this.smoothNormals || false,
          color: this.color || [0, 0, 0]
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.solid as any
      )
      this.needsUpdate = false
    }

    return this.entities
  }
}
