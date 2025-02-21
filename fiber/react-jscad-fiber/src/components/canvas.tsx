/** Canvas implemention based on https://github.com/pmndrs/react-three-fiber/blob/master/packages/fiber/src/web/Canvas.tsx */

import { Suspense, useEffect, useState } from 'react'
import { render, unmountComponentAtNode } from '../fiber/render'
import { FiberProvider, useContextBridge } from 'its-fine'
import { Block, ErrorBoundary, SetBlock } from '@/fiber/utils'

interface CanvasProps {
  children: React.ReactNode
}

export function Canvas(props: CanvasProps) {
  return (
    <FiberProvider>
      <CanvasInner {...props} />
    </FiberProvider>
  )
}

function CanvasInner({ children }: CanvasProps) {
  const Bridge = useContextBridge()

  const [container, setContainer] = useState<HTMLDivElement | null>(null)

  const [error, setError] = useState<Error | undefined>(undefined)
  const [block, setBlock] = useState<SetBlock>(false)

  // Suspend this component if block is a promise (2nd run)
  if (block) throw block
  // Throw exception outwards if anything within canvas throws
  if (error) throw error

  if (container) {
    render(
      <Bridge>
        <ErrorBoundary set={setError}>
          <Suspense fallback={<Block set={setBlock} />}>{children}</Suspense>
        </ErrorBoundary>
      </Bridge>,
      container
    )
  }

  useEffect(() => {
    if (!container) return

    return () => {
      unmountComponentAtNode(container)
    }
  }, [container])

  return (
    <div
      ref={setContainer}
      style={{
        width: '100vw',
        height: '100vh'
      }}
    />
  )
}
