import { vec3, mat3, mat4 } from 'gl-matrix'

interface SensorInterface {
  id: string
  active: boolean
  position: vec3
  halfSize: vec3
  rotation: vec3
  data: Record<string | number | symbol, unknown>
  obb: OBB
}

export type OnIntersectCallback = (sensors: SensorInterface[]) => void

const sensorsStore: Record<string, SensorInterface> = {}

// Custom OBB (Oriented Bounding Box) implementation
class OBB {
  center: vec3
  halfSize: vec3
  rotation: mat3

  constructor(center: vec3, halfSize: vec3, rotation: mat3) {
    this.center = center
    this.halfSize = halfSize
    this.rotation = rotation
  }

  set(center: vec3, halfSize: vec3, rotation: mat3) {
    vec3.copy(this.center, center)
    vec3.copy(this.halfSize, halfSize)
    mat3.copy(this.rotation, rotation)
  }

  // Simplified OBB intersection test
  intersectsOBB(other: OBB): boolean {
    // Simplified implementation using Separating Axis Theorem (SAT)
    // This is a basic version - you might want to implement a more robust one
    const distance = vec3.create()
    vec3.subtract(distance, this.center, other.center)

    // Check for rough spherical bounds first (optimization)
    const radiusSum = vec3.length(this.halfSize) + vec3.length(other.halfSize)
    if (vec3.length(distance) > radiusSum) return false

    // For a more accurate check, implement full SAT test here
    // This is just a rough approximation
    return true
  }
}

export interface SensorOptions {
  position?: vec3
  halfSize?: vec3
  rotation?: vec3
  active?: boolean
  onIntersect?: OnIntersectCallback
}

export class SensorDetector implements SensorInterface {
  id: string
  active: boolean
  position: vec3
  halfSize: vec3
  rotation: vec3
  data: Record<string | number | symbol, unknown>
  obb: OBB
  onIntersect?: OnIntersectCallback

  constructor({
    position = vec3.fromValues(0, 0, 0),
    halfSize = vec3.fromValues(1, 1, 1),
    rotation = vec3.fromValues(0, 0, 0),
    active = true,
    onIntersect
  }: SensorOptions) {
    this.id = crypto.randomUUID()
    this.active = active
    this.position = position
    this.halfSize = halfSize
    this.rotation = rotation
    this.data = {}
    this.onIntersect = onIntersect

    const rotationMat = mat3.create()
    const rotationMat4 = mat4.create()
    mat4.fromRotation(rotationMat4, rotation[1], [0, 1, 0]) // Simple Y-axis rotation
    mat3.fromMat4(rotationMat, rotationMat4)

    this.obb = new OBB(this.position, this.halfSize, rotationMat)

    // Add to store
    sensorsStore[this.id] = this
  }

  public update() {
    if (!this.active) return

    // Update OBB
    const rotationMat = mat3.create()
    const rotationMat4 = mat4.create()
    mat4.fromRotation(rotationMat4, this.rotation[1], [0, 1, 0])
    mat3.fromMat4(rotationMat, rotationMat4)

    this.obb.set(this.position, this.halfSize, rotationMat)

    // Check intersections
    if (!this.onIntersect) return

    const intersectedSensors = Object.values(sensorsStore).filter(toTest => {
      if (!toTest.active) return false
      if (toTest.id === this.id) return false
      return this.obb.intersectsOBB(toTest.obb)
    })

    if (intersectedSensors.length) {
      this.onIntersect(intersectedSensors)
    }
  }

  destroy() {
    delete sensorsStore[this.id]
  }
}
