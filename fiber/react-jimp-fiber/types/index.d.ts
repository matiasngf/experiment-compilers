declare global {
  namespace JSX {
    interface IntrinsicElements {
      group: {
        x?: number
        y?: number
        scale?: number
        rotation?: number
        children?: React.ReactNode
      }

      image: {
        src: string
        x?: number
        y?: number
        scale?: number
      }
    }
  }
}

export { }