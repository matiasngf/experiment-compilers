# React JSCAD Fiber

A React renderer for JSCAD, enabling declarative 3D modeling in React applications.

## Installation

```bash
npm install react-jscad-fiber
```

## Basic Usage

```tsx
import { Canvas } from 'react-jscad-fiber'

function App() {
  return (
    <Canvas>
      <sphere radius={50} color={[0.2, 0.2, 0.8]} />
    </Canvas>
  )
}
```


## Examples

### Basic Primitives

```tsx
// Sphere
<sphere 
  radius={50} 
  color={[0.2, 0.2, 0.8]} 
  center={[0, 0, 0]} 
  smoothNormals 
/>

// Cube
<cube 
  size={30} 
  center={[0, 0, 0]} 
  color={[0.8, 0.2, 0.2]} 
/>

// Cylinder
<cylinder 
  height={50} 
  radius={20} 
  segments={32} 
  color={[0.2, 0.8, 0.2]} 
/>
```

### Boolean Operations

```tsx
// Subtract spheres
<subtract color={[0.2, 0.2, 0.2]} smoothNormals>
  <sphere radius={130} />
  <sphere center={[70, 0, 0]} radius={100} />
</subtract>

// Intersect shapes
<intersect color={[0.2, 0.2, 0.8]}>
  <cube size={50} />
  <sphere radius={40} />
</intersect>

// Union shapes
<union color={[0.8, 0.2, 0.2]}>
  <cylinder height={50} radius={20} />
  <sphere radius={25} center={[0, 0, 50]} />
</union>
```



## Available Primitives

The library supports the following JSCAD primitives:

### 3D Primitives
- `<cube>` - Creates a cube
- `<cuboid>` - Creates a rectangular cuboid
- `<cylinder>` - Creates a cylinder
- `<cylinderElliptic>` - Creates an elliptical cylinder
- `<ellipsoid>` - Creates an ellipsoid
- `<geodesicSphere>` - Creates a geodesic sphere
- `<polyhedron>` - Creates a polyhedron
- `<roundedCuboid>` - Creates a cuboid with rounded edges
- `<roundedCylinder>` - Creates a cylinder with rounded edges
- `<sphere>` - Creates a sphere
- `<torus>` - Creates a torus

### Boolean Operations

- `<union>` - Combines multiple shapes
- `<subtract>` - Subtracts subsequent shapes from the first shape
- `<intersect>` - Creates shape from overlapping areas
- `<scission>` - Splits shapes into separate parts
