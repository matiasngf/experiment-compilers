// ********************
// The design to render.
// ********************
import {
  prepareRender,
  drawCommands,
  cameras,
  entitiesFromSolids,
  controls
} from '@jscad/regl-renderer'
import { colors, primitives, booleans } from '@jscad/modeling'

const { intersect, subtract } = booleans
const { colorize } = colors
const { cube, cuboid, line, sphere, star } = primitives

const demo = parameters => {
  const logo = [
    colorize([1.0, 0.4, 1.0], subtract(cube({ size: 300 }), sphere({ radius: 200 }))),
    colorize([1.0, 1.0, 0], intersect(sphere({ radius: 130 }), cube({ size: 210 })))
  ]

  const transpCube = colorize(
    [1, 0, 0, 0.75],
    cuboid({ size: [100 * parameters.scale, 100, 210 + 200 * parameters.scale] })
  )
  const star2D = star({ vertices: 8, innerRadius: 300, outerRadius: 400 })
  const line2D = colorize(
    [1.0, 0, 0],
    line([
      [260, 260],
      [-260, 260],
      [-260, -260],
      [260, -260],
      [260, 260]
    ])
  )
  // some colors are intentionally without alpha channel to test geom2ToGeometries will add alpha channel
  const colorChange = [
    [1, 0, 0, 1],
    [1, 0.5, 0],
    [1, 0, 1],
    [0, 1, 0],
    [0, 0, 0.7]
  ]
  star2D.sides.forEach((side, i) => {
    if (i >= 2) side.color = colorChange[i % colorChange.length]
  })

  return [transpCube, star2D, line2D, ...logo]
}

const perspectiveCamera = cameras.perspective
const orbitControls = controls.orbit

const containerElement = document.getElementById('canvas-container')

if (!containerElement) {
  throw new Error('Container not found')
}

const width = containerElement.clientWidth
const height = containerElement.clientHeight

const state: {
  camera: typeof cameras.perspective.defaults
  controls?: any
} = {
  camera: perspectiveCamera.defaults
}

// prepare the camera
perspectiveCamera.setProjection(state.camera, state.camera, { width, height })
perspectiveCamera.update(state.camera, state.camera)

// prepare the controls
state.controls = orbitControls.defaults

// prepare the renderer
const setupOptions = {
  glOptions: { container: containerElement }
}
const renderer = prepareRender(setupOptions)

const gridOptions = {
  visuals: {
    drawCmd: 'drawGrid',
    show: true
  },
  size: [500, 500],
  ticks: [25, 5]
  // color: [0, 0, 1, 1],
  // subColor: [0, 0, 1, 0.5]
}

const axisOptions = {
  visuals: {
    drawCmd: 'drawAxis',
    show: true
  },
  size: 300
  // alwaysVisible: false,
  // xColor: [0, 0, 1, 1],
  // yColor: [1, 0, 1, 1],
  // zColor: [0, 0, 0, 1]
}

const entities = entitiesFromSolids({}, demo({ scale: 1 }))

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
  entities: [gridOptions, axisOptions, ...entities]
}

// the heart of rendering, as themes, controls, etc change
let updateView = true

const doRotatePanZoom = () => {
  if (rotateDelta[0] || rotateDelta[1]) {
    const updated = orbitControls.rotate(
      { controls: state.controls, camera: state.camera, speed: rotateSpeed },
      rotateDelta
    )
    state.controls = { ...state.controls, ...updated.controls }
    updateView = true
    rotateDelta = [0, 0]
  }

  if (panDelta[0] || panDelta[1]) {
    const updated = orbitControls.pan(
      { controls: state.controls, camera: state.camera, speed: panSpeed },
      panDelta
    )
    state.controls = { ...state.controls, ...updated.controls }
    panDelta = [0, 0]
    state.camera.position = updated.camera.position
    state.camera.target = updated.camera.target
    updateView = true
  }

  if (zoomDelta) {
    const updated = orbitControls.zoom(
      { controls: state.controls, camera: state.camera, speed: zoomSpeed },
      zoomDelta
    )
    state.controls = { ...state.controls, ...updated.controls }
    zoomDelta = 0
    updateView = true
  }
}

let windowSizeChanged = false

const updateAndRender = timestamp => {
  doRotatePanZoom()

  const shouldRender = updateView || windowSizeChanged

  if (updateView) {
    const updates = orbitControls.update({ controls: state.controls, camera: state.camera })
    state.controls = { ...state.controls, ...updates.controls }
    updateView = state.controls.changed // for elasticity in rotate / zoom

    state.camera.position = updates.camera.position
    perspectiveCamera.update(state.camera)
  }

  if (shouldRender) {
    renderer(renderOptions)
  }
  window.requestAnimationFrame(updateAndRender)
}
window.requestAnimationFrame(updateAndRender)

// convert HTML events (mouse movement) to viewer changes
let lastX = 0
let lastY = 0

const rotateSpeed = 0.002
const panSpeed = 1
const zoomSpeed = 0.08
let rotateDelta = [0, 0]
let panDelta = [0, 0]
let zoomDelta = 0
let pointerDown = false

const moveHandler = ev => {
  if (!pointerDown) return
  const dx = lastX - ev.pageX
  const dy = ev.pageY - lastY

  const shiftKey = ev.shiftKey === true || (ev.touches && ev.touches.length > 2)
  if (shiftKey) {
    panDelta[0] += dx
    panDelta[1] += dy
  } else {
    rotateDelta[0] -= dx
    rotateDelta[1] -= dy
  }

  lastX = ev.pageX
  lastY = ev.pageY

  ev.preventDefault()
}
const downHandler = ev => {
  pointerDown = true
  lastX = ev.pageX
  lastY = ev.pageY
  containerElement.setPointerCapture(ev.pointerId)
}

const upHandler = ev => {
  pointerDown = false
  containerElement.releasePointerCapture(ev.pointerId)
}

const wheelHandler = ev => {
  zoomDelta += ev.deltaY
  ev.preventDefault()
}

containerElement.onpointermove = moveHandler
containerElement.onpointerdown = downHandler
containerElement.onpointerup = upHandler
containerElement.onwheel = wheelHandler

const resizeHandler = () => {
  const newWidth = containerElement.clientWidth
  const newHeight = containerElement.clientHeight

  // Update camera projection with new dimensions
  perspectiveCamera.setProjection(state.camera, state.camera, {
    width: newWidth,
    height: newHeight
  })
  perspectiveCamera.update(state.camera, state.camera)

  windowSizeChanged = true
}

window.addEventListener('resize', resizeHandler)
