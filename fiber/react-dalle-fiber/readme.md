# React DALLE Fiber

A React renderer for DALL-E, enabling declarative AI image generation in React applications.

## Installation

```bash
npm install react-dalle-fiber
```

## Usage

React DALLE Fiber uses a declarative component approach to build AI-generated images. Here's a basic example:

```jsx
import { Canvas } from 'react-dalle-fiber';

function App() {
  return (
    <Canvas apiKey={process.env.OPENAI_API_KEY}>
      <sky time="night" />
      <city />
      <drawStyle type="photo" />
    </Canvas>
  );
}
```

## Key Components

### Canvas

The root component that initializes the DALL-E generation context:

```jsx
<Canvas 
  apiKey={yourOpenAIKey} 
>
  {/* Child components that define the image */}
</Canvas>
```

### Image Components

Use declarative components to build your image scene. You can use any JSX you want to express your image.

```jsx
// Weather and time of day
<sky time="sunset" weather="cloudy" />

// Subjects and environments
<city style="futuristic" />
<person action="walking" outfit="casual" />
<landscape type="mountain" />

// Style control
<drawStyle type="photo" /> // Options: photo, painting, sketch, etc.
```
