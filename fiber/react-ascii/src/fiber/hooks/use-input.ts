import { useEffect } from 'react'
import { useStateToRef } from './use-state-to-ref'
import { parseKeypress } from '@/core/utils/parse-keypress'

interface KeyboardEvent {
  sequence: string
  name: string | undefined
  ctrl: boolean
  meta: boolean
  shift: boolean
}

type KeyHandler = (event: KeyboardEvent) => void

export function useInput(handler: KeyHandler) {
  const handlerRef = useStateToRef(handler)

  useEffect(() => {
    // Configure stdin
    if (!process.stdin || !process.stdin.setRawMode)
      throw new Error('**** You used useInput but process.stdin is not available ****')

    process.stdin.setRawMode(true)
    process.stdin.resume()
    process.stdin.setEncoding('utf8')

    // Handle input data
    function handleInput(data: Buffer) {
      const keypress = parseKeypress(data)

      // Create keyboard event from keypress data
      const event: KeyboardEvent = {
        sequence: keypress.sequence,
        name: keypress.name || undefined,
        ctrl: keypress.ctrl,
        meta: keypress.meta,
        shift: keypress.shift
      }

      const input = keypress.ctrl ? keypress.name : keypress.sequence

      if (event.ctrl && input === 'c') {
        process.exit()
      }

      // Call the handler
      handlerRef.current(event)
    }

    process.stdin.on('data', handleInput)

    // Cleanup
    return () => {
      process.stdin.removeListener('data', handleInput)
      process.stdin.setRawMode(false)
      process.stdin.pause()
    }
  }, [handlerRef])
}
