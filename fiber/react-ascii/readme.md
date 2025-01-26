# react-ascii

A react renderer to compose ascii art into the CLI.

## Usage

```tsx
import { createRoot } from 'react-ascii'

const App = () => {
  return (
    <image src="/pathToImage.png" width={100} height={100} />
  )
}

const root = createRoot(process.stdout)

root.render(<App />)
```

## Compositing

You can compose multiple images into a single one by using the `image` component.

```tsx
const App = () => {
  <>
    <image src="/asteroid.png" origin="center" position={{ x: 10, y: 10 }} width={30} height={30} />
    <image src="/asteroid.png" origin="center" position={{ x: 0, y: 0 }} width={30} height={30} />
    <image src="/background.png" width={200} height={200} />
  </>
}
```

## Groups

You can apply transformations to multiple images at once by using the `group` component.


```tsx
const App = () => {
  return (
    <group>
      <image src="/asteroid.png" origin="center" position={{ x: 10, y: 10 }} width={30} height={30} />
      <image src="/asteroid.png" origin="center" position={{ x: '50%', y: '50%' }} width={30} height={30} />
    </group>
    <image src="/background.png" width={200} height={200} />
  )
}
```

## Hooks

### useFrame

You can use the `useFrame` hook to animate your components.

```tsx
const App = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useFrame(({ time }) => {
    setPosition({ x: Math.sin(time), y: Math.cos(time) })
  })

  return <Ship position={position} />
}
```

You can also avoid re-renders by modifying the instance using references.

```tsx
const App = () => {
  const ref = useRef(null)

  useFrame(({ time }) => {
    ref.current.position = { x: Math.sin(time), y: Math.cos(time) }
  })

  return <image src="/ship.png" ref={ref} />
}
```

### useViewport

You can use the `useViewport` hook to get the current viewport size.

```tsx
const App = () => {
  const width = useViewport(state => state.width)
  const height = useViewport(state => state.height)
  return <text>{width}x{height}</text>
}
```

## Baking

To optimize performance, you can bake transforms and re-use them.

```tsx

const Ship = (props) => {
  return (
    <bake id="ship" {...props}>
      <image src="/ship.png" origin="center" position={{ x: 10, y: 10 }} width={30} height={30} />
    </bake>
  )
}

const App = () => {
  return (
    <Ship position={{ x: 10, y: 10 }} />
    <Ship position={{ x: 0, y: 0 }} />
    <image src="/background.png" width={200} height={200} />
  )
}