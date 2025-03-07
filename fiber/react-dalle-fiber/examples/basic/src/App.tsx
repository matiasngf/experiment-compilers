import { Canvas } from 'react-dalle-fiber'
import { openApiKey } from './key'

export default function App() {
  return (
    <Canvas apiKey={openApiKey}>
      <sky time="sunset" />
      <boat />
      <sea />
      <drawStyle type="photo" />
    </Canvas>
  )
}
