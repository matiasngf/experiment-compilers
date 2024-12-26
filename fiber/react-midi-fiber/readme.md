# react-jimp-fiber

*A React renderer for jimp.*

The objetive of this experiment is to learn how to use fiber to create a custom renderer for react.

## Usage

```tsx
import { render } from 'react-jimp-fiber'

const App = () => (
  <>
    <jimpFigure src="background.jpg" x={0} y={0} scale={4} />
    <group>
      <jimpFigure src="asteroid.png" x={50} y={50} scale={0.5} />
    </group>
    <jimpFigure src="spaceship.png" x={200} y={600} scale={0.8} rotation={15} />
  </>
)

render(<App />, './build/output_scene.png')
```

## Components

### jimpFigure

Renders an image using jimp. The asset of the image will be loaded from the `src/assets` folder.

### props

- `src`: The path to the image file.
- `x`: The x position of the image.
- `y`: The y position of the image.
- `scale`: The scale of the image.
- `rotation`: The rotation of the image.

### group

Groups are usefull to apply transformations to multiple jimpFigures.

### props

- `x`: The x position of the group.
- `y`: The y position of the group.
- `rotation`: The rotation of the group.
- `scale`: The scale of the group.
- `children`: The children of the group.