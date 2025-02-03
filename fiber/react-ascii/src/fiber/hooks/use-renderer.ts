import { useContainer } from 'its-fine'
import type { ReconcilierArgs } from '../types'

/** This function will return the renderer instance */
export function useRenderer() {
  const container = useContainer<ReconcilierArgs['container']>()
  if (!container) {
    throw new Error('This error should never happen.')
  }
  return container
}
