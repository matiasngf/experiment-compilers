import { Vec2 } from '@/fiber/types'

export interface SensorInterface {
  id: string
  active: boolean
  position: Vec2
  size: Vec2
  data: Record<string | number | symbol, unknown>
}

export type OnIntersectCallback = (sensors: SensorInterface[]) => void

const sensorsStore: Record<string, SensorInterface> = {}

export interface SensorOptions {
  position?: Vec2
  size?: Vec2
  active?: boolean
  onIntersect?: OnIntersectCallback
  data?: Record<string | number | symbol, unknown>
}

export class SensorDetector implements SensorInterface {
  id: string
  active: boolean
  position: Vec2
  size: Vec2
  data: Record<string | number | symbol, unknown>
  onIntersect?: OnIntersectCallback

  constructor({
    position = { x: 0, y: 0 },
    size = { x: 100, y: 100 },
    active = true,
    data = {},
    onIntersect
  }: SensorOptions) {
    this.id = crypto.randomUUID()
    this.active = active
    this.position = position
    this.size = size
    this.data = data
    this.onIntersect = onIntersect

    sensorsStore[this.id] = this
  }

  setPosition(position: Vec2) {
    this.position = position
  }

  setSize(size: Vec2) {
    this.size = size
  }

  private intersects(other: SensorInterface): boolean {
    return (
      this.position.x < other.position.x + other.size.x &&
      this.position.x + this.size.x > other.position.x &&
      this.position.y < other.position.y + other.size.y &&
      this.position.y + this.size.y > other.position.y
    )
  }

  public update() {
    if (!this.active || !this.onIntersect) return

    const intersectedSensors = Object.values(sensorsStore).filter(toTest => {
      if (!toTest.active) return false
      if (toTest.id === this.id) return false
      return this.intersects(toTest)
    })

    if (intersectedSensors.length) this.onIntersect(intersectedSensors)
  }

  destroy() {
    delete sensorsStore[this.id]
  }
}
