/* eslint-disable @typescript-eslint/no-explicit-any */
import { Container } from '@/renderer/container'
import { PrimitiveSolid } from '@/renderer/primitives-3d'
import { PrimitiveBoolean } from '@/renderer/primitives-boolean'
import { CadSolidParams } from '@/renderer/solid'
import {
  ArcOptions,
  CircleOptions,
  CubeOptions,
  CuboidOptions,
  CylinderOptions,
  CylinderEllipticOptions,
  EllipseOptions,
  EllipsoidOptions,
  GeodesicSphereOptions,
  PolygonOptions,
  PolyhedronOptions,
  RectangleOptions,
  RoundedCuboidOptions,
  RoundedCylinderOptions,
  RoundedRectangleOptions,
  SphereOptions,
  SquareOptions,
  StarOptions,
  TorusOptions,
  TriangleOptions
} from '@jscad/modeling/src/primitives'
import { PropsWithChildren } from 'react'
import type Reconciler from 'react-reconciler'
import type { HostConfig } from 'react-reconciler'

export type Root = { fiber: Reconciler.FiberRoot }

export type SolidElements = {
  arc: ArcOptions & CadSolidParams
  circle: CircleOptions & CadSolidParams
  cube: CubeOptions & CadSolidParams
  cuboid: CuboidOptions & CadSolidParams
  cylinder: CylinderOptions & CadSolidParams
  cylinderElliptic: CylinderEllipticOptions & CadSolidParams
  ellipse: EllipseOptions & CadSolidParams
  ellipsoid: EllipsoidOptions & CadSolidParams
  geodesicSphere: GeodesicSphereOptions & CadSolidParams
  polygon: PolygonOptions & CadSolidParams
  polyhedron: PolyhedronOptions & CadSolidParams
  rectangle: RectangleOptions & CadSolidParams
  roundedCuboid: RoundedCuboidOptions & CadSolidParams
  roundedCylinder: RoundedCylinderOptions & CadSolidParams
  roundedRectangle: RoundedRectangleOptions & CadSolidParams
  sphere: SphereOptions & CadSolidParams
  square: SquareOptions & CadSolidParams
  star: StarOptions & CadSolidParams
  torus: TorusOptions & CadSolidParams
  triangle: TriangleOptions & CadSolidParams
}

export type BooleanElements = {
  intersect: PropsWithChildren<CadSolidParams>
  subtract: PropsWithChildren<CadSolidParams>
  union: PropsWithChildren<CadSolidParams>
  scission: PropsWithChildren<CadSolidParams>
}

export type AsciiElements = SolidElements & BooleanElements

export type InstanceProps = AsciiElements[keyof AsciiElements]
export type InstanceType = keyof AsciiElements

export type SolidInstance = PrimitiveSolid<InstanceProps>
export type BooleanInstance = PrimitiveBoolean

export type Instance = SolidInstance | BooleanInstance

export interface ReconcilierArgs {
  type: keyof AsciiElements
  props: InstanceProps
  container: Container
  instance: Instance
  textInstance: never
  suspenseInstance: never
  hydratableInstance: never
  publicInstance: Instance
  hostContext: never
  updatePayload: any
  childSet: never
  timeoutHandle: number | undefined
  noTimeout: -1
}

export type AsciiReconciler = typeof Reconciler<
  ReconcilierArgs['type'],
  ReconcilierArgs['props'],
  ReconcilierArgs['container'],
  ReconcilierArgs['instance'],
  ReconcilierArgs['textInstance'],
  ReconcilierArgs['suspenseInstance'],
  ReconcilierArgs['hydratableInstance'],
  ReconcilierArgs['publicInstance'],
  ReconcilierArgs['hostContext'],
  ReconcilierArgs['updatePayload'],
  ReconcilierArgs['childSet'],
  ReconcilierArgs['timeoutHandle'],
  ReconcilierArgs['noTimeout']
>

/** The types of the config object passed to the Reconciler */
export type ReconcilerConfig = HostConfig<
  ReconcilierArgs['type'],
  ReconcilierArgs['props'],
  ReconcilierArgs['container'],
  ReconcilierArgs['instance'],
  ReconcilierArgs['textInstance'],
  ReconcilierArgs['suspenseInstance'],
  ReconcilierArgs['hydratableInstance'],
  ReconcilierArgs['publicInstance'],
  ReconcilierArgs['hostContext'],
  ReconcilierArgs['updatePayload'],
  ReconcilierArgs['childSet'],
  ReconcilierArgs['timeoutHandle'],
  ReconcilierArgs['noTimeout']
>

/** Type the global elements */
// export interface AsciiElements {
//   cuboid: CuboidProps
//   sphere: SphereProps
// }

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements extends AsciiElements {}
  }
}
