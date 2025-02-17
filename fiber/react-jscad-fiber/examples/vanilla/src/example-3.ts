/** Minimal example to render a scene */
import { prepareRender, drawCommands, cameras, entitiesFromSolids } from '@jscad/regl-renderer'
import { primitives } from '@jscad/modeling'
const { sphere } = primitives

const getSolids = () => {
  return sphere({ radius: 130 })
}

const perspectiveCamera = cameras.perspective

const containerElement = document.getElementById('canvas-container')

if (!containerElement) {
  throw new Error('Container not found')
}

const width = containerElement.clientWidth
const height = containerElement.clientHeight

const state: {
  camera: typeof cameras.perspective.defaults
} = {
  camera: perspectiveCamera.defaults
}

// prepare the camera
perspectiveCamera.setProjection(state.camera, state.camera, { width, height })
perspectiveCamera.update(state.camera, state.camera)

// prepare the renderer
const setupOptions = {
  glOptions: { container: containerElement }
}
const renderer = prepareRender(setupOptions)

const entities = entitiesFromSolids({}, getSolids())

// assemble the options for rendering
const renderOptions = {
  camera: state.camera,
  drawCommands: {
    drawAxis: drawCommands.drawAxis,
    drawGrid: drawCommands.drawGrid,
    drawLines: drawCommands.drawLines,
    drawMesh: drawCommands.drawMesh
  },
  // define the visual content
  entities: [...entities]
}

/** Render loop */
const updateAndRender = () => {
  renderer(renderOptions)
  window.requestAnimationFrame(updateAndRender)
}
window.requestAnimationFrame(updateAndRender)

const resizeHandler = () => {
  const newWidth = containerElement.clientWidth
  const newHeight = containerElement.clientHeight

  // Update camera projection with new dimensions
  perspectiveCamera.setProjection(state.camera, state.camera, {
    width: newWidth,
    height: newHeight
  })
  perspectiveCamera.update(state.camera, state.camera)
}

window.addEventListener('resize', resizeHandler)
