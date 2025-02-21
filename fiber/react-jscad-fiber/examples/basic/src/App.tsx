import { Canvas } from 'react-jscad-fiber'

export default function App() {
  return (
    <Canvas>
      <subtract color={[0.2, 0.2, 0.2]} smoothNormals>
        <sphere color={[0.2, 0.2, 0.2]} radius={130} />
        <sphere color={[0.2, 0.2, 0.2]} center={[70, 0, 70]} radius={100} />
      </subtract>
    </Canvas>
  )
}
