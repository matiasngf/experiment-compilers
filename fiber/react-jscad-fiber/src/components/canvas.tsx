import { useEffect, useState } from 'react'
import { render, unmountComponentAtNode } from '../fiber/render'

interface CanvasProps {
  children: React.ReactNode
}

export function Canvas({ children }: CanvasProps) {
  const [container, setContainer] = useState<HTMLDivElement | null>(null)

  if (container) {
    render(<>{children}</>, container)
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
