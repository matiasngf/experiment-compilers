import type { Renderer } from '@/core/renderer'

const instances = new WeakMap<NodeJS.WriteStream, Renderer>()
export default instances
