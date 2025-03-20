import { render, useInput, useFrame } from 'react-ascii'
import puppeteer, { KeyInput, Page } from 'puppeteer'
import { useRef, useState } from 'react'
import { useEffect } from 'react'
import { startServer } from './start-server'

const App = () => {
  const [page, setPage] = useState<Page | null>(null)
  const [image, setImage] = useState<Buffer | null>(null)
  const isRendering = useRef(false)

  useFrame(async () => {
    if (!page) return
    if (isRendering.current) return

    isRendering.current = true
    page
      .screenshot({
        encoding: 'base64',
        type: 'png'
      })
      .then(data => {
        const buffer = Buffer.from(data, 'base64')

        isRendering.current = false
        setImage(buffer)
      })
  })

  useInput(event => {
    if (!page) return
    if (!event.name) return

    if (event.name === 'space') {
      page.keyboard.press('Space')
    }
    // Handle other common keys
    else if (['w', 'a', 's', 'd'].includes(event.name)) {
      page.keyboard.press(event.name.toUpperCase() as KeyInput)
    }

    const keyMap = {
      left: 'ArrowLeft',
      right: 'ArrowRight',
      up: 'ArrowUp',
      down: 'ArrowDown',
      enter: 'Enter',
      return: 'Enter'
    } as const

    if (event.name in keyMap) {
      page.keyboard.press(keyMap[event.name as keyof typeof keyMap])
    }
  })

  useOnce(async () => {
    const [_server, port] = await startServer()
    const browser = await puppeteer.launch({
      headless: true
    })
    const page = await browser.newPage()
    page.setViewport({
      height: 40 * 30,
      width: 70 * 30,
      deviceScaleFactor: 1
    })
    await page.goto(`http://localhost:${port}/`)
    await page.waitForSelector('.dosbox-start', {})
    const button = await page.$('.dosbox-start')

    if (button) {
      await button.click()
    }
    setPage(page)
  })

  if (!image) return null

  return <asciiImage src={image} position={{ x: 0, y: 0 }} scale={1 / 30} />
}

render(<App />, {
  height: 40,
  width: 70
})

function useOnce(fn: () => void) {
  const called = useRef(false)

  useEffect(() => {
    if (!called.current) {
      called.current = true
      fn()
    }
  }, [fn])
}
