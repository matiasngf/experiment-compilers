import { useEffect, useRef } from 'react'
import { render } from 'react-jscad-fiber'

interface CanvasProps {
  children: React.ReactNode
}

export function Canvas({ children }: CanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  const started = useRef(false)

  useEffect(() => {
    if (!containerRef.current || started.current) return

    started.current = true

    render(<>{children}</>, {
      canvasContainer: containerRef.current
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div
      ref={containerRef}
      style={{
        width: '100vw',
        height: '100vh'
      }}
    />
  )
}
