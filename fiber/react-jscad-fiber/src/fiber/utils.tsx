// Utils from https://github.com/pmndrs/react-three-fiber/blob/master/packages/fiber/src/core/utils.ts

import * as React from 'react'

export type SetBlock = false | Promise<null> | null
export type UnblockProps = {
  set: React.Dispatch<React.SetStateAction<SetBlock>>
  children: React.ReactNode
}

export function Block({ set }: Omit<UnblockProps, 'children'>) {
  useIsomorphicLayoutEffect(() => {
    set(new Promise(() => null))
    return () => set(false)
  }, [set])
  return null
}

/**
 * An SSR-friendly useLayoutEffect.
 *
 * React currently throws a warning when using useLayoutEffect on the server.
 * To get around it, we can conditionally useEffect on the server (no-op) and
 * useLayoutEffect elsewhere.
 *
 * @see https://github.com/facebook/react/issues/14927
 */
export const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' &&
  (window.document?.createElement || window.navigator?.product === 'ReactNative')
    ? React.useLayoutEffect
    : React.useEffect

export class ErrorBoundary extends React.Component<
  { set: React.Dispatch<Error | undefined>; children: React.ReactNode },
  { error: boolean }
> {
  state = { error: false }
  static getDerivedStateFromError = () => ({ error: true })
  componentDidCatch(err: Error) {
    this.props.set(err)
  }
  render() {
    return this.state.error ? null : this.props.children
  }
}
