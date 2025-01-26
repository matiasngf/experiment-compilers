export type FrameCallback = (params: { time: number; delta: number; frame: number }) => void

export const startRafRunner = (callback: FrameCallback) => {
  const controller = new AbortController()
  const signal = controller.signal

  // 24fps
  const rafTime = 1000 / 24

  let frame = 0
  let lastTime = performance.now()

  const frameCallback = () => {
    //setup
    if (signal.aborted) return
    const startTime = performance.now()
    // run callback
    callback({ time: startTime, delta: startTime - lastTime, frame: frame })
    frame++
    lastTime = startTime

    // run next frame
    const endTime = performance.now()
    const timeTook = endTime - startTime
    const timeToWait = Math.max(0, rafTime - timeTook)
    setTimeout(frameCallback, timeToWait)
  }

  frameCallback()

  return () => {
    controller.abort()
  }
}
