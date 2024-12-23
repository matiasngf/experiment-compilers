import path from 'path'
import { Jimp } from 'jimp'

export type OutputPath = `${string}.${string}`

type JimpImage = Awaited<ReturnType<typeof Jimp.read>>

export const drawScene = async (elements: any[], outputPath: OutputPath) => {
  // Create a new hsl(0, 0%, 0%) background image
  const background = new Jimp({
    width: 1920,
    height: 1080,
    color: 0x000000ff
  })

  // Process elements recursively
  for (const element of elements) {
    await applyTransforms(element, background as JimpImage)
  }

  // Save the final image
  await background.write(outputPath)
  console.log('Scene rendered to', outputPath)
}

interface Transforms {
  x?: number
  y?: number
  rotation?: number
  scale?: number
}

const applyTransforms = async (element: React.JSX.Element, targetImage: JimpImage, parentTransforms: Transforms = {}) => {
  const { x = 0, y = 0, rotation = 0, scale = 1 } = element.props || {}

  const finalX = (parentTransforms.x || 0) + x
  const finalY = (parentTransforms.y || 0) + y
  const finalScale = (parentTransforms.scale || 1) * scale
  const finalRotation = (parentTransforms.rotation || 0) + rotation

  if (element.type === 'image') {
    try {
      // Load the image
      const sourceImage = await Jimp.read(path.join('./src/assets', element.props.src))

      // Apply transformations if needed
      if (finalScale !== 1) {
        sourceImage.scale(finalScale)
      }
      if (finalRotation !== 0) {
        sourceImage.rotate(finalRotation)
      }

      targetImage.composite(sourceImage, finalX, finalY)
    } catch (error) {
      console.error("Error reading image", element.props.src);
      console.log("ERROR DETAILS:\n----------------");
      console.log(error);
    }

    // Composite the image onto the target
    // targetImage.composite(sourceImage, finalX, finalY)
  } else if (element.type === 'group') {
    if (!('children' in element)) return
    // Process all children with updated transforms
    for (const child of (element as any).children || []) {
      await applyTransforms(child, targetImage, {
        x: finalX,
        y: finalY,
        rotation: finalRotation,
        scale: finalScale
      })
    }
  }
}
