import { render } from './render'

const App = () => (
  <>
    <jimpFigure src="background.jpg" x={0} y={0} scale={3} />
    <group x={400} y={200}>
      <jimpFigure src="asteroid.png" scale={0.5} rotation={15} />
      <jimpFigure src="asteroid.png" x={250} y={50} scale={0.2} />
    </group>
    <jimpFigure src="spaceship.png" x={100} y={400} scale={1} />
  </>
)

render(<App />, './build/output_scene.png')
