import { Canvas } from 'react-jscad-fiber'

export default function App() {
  return (
    <Canvas>
      <intersect color={[0.2, 0.2, 0.2]}>
        <sphere radius={130} />
        <sphere center={[-70, 0, 70]} radius={100} />
      </intersect>
    </Canvas>
  )
}
