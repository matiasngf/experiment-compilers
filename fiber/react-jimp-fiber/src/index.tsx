// @ts-check

import { render } from "./render";

const App = () => (
  <>
    <image src="background.jpg" x={0} y={0} scale={4} />
    <group>
      <image src="asteroid.png" x={50} y={50} scale={0.5} />
      <image src="asteroid.png" x={200} y={600} scale={0.8} rotate={15} />
      <group x={900} y={400}>
        <image src="spaceship.png" x={-200} y={200} scale={1} />
        <image src="spaceship.png" x={200} y={-200} scale={0.5} />
      </group>
    </group>
  </>
);

render(<App />, "./build/output_scene.png");
