import { drawScene, OutputPath } from "./draw-scene";
import Renderer from "./renderer";


export const render = (element: React.ReactNode, outputPath: OutputPath) => {
  const container = { children: [] };

  const node = Renderer.createContainer(
    container,         // containerInfo
    0,                // tag (0 = legacy)
    null,             // parentComponent
    false,            // isServer
    false,            // renderCompleted
    '',               // identifierPrefix
    (error) => {      // onRecoverableError
      console.error(error)
    },
    null              // globalContext
  )
  Renderer.updateContainer(element as any, node, null, () => {
    drawScene(container.children, outputPath);
  });
};