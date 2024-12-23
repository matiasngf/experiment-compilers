export interface JimpElements {
  group: {
    x?: number
    y?: number
    scale?: number
    rotation?: number
    children?: React.ReactNode
  }

  jimpFigure: {
    src: string
    x?: number
    y?: number
    scale?: number
    rotation?: number
  }
}

declare global {
  namespace JSX {
    interface IntrinsicElements extends JimpElements {}
  }
}
