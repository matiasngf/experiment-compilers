import { ExampleInterface } from "./types";

const exampleFunction = (example: ExampleInterface) => {
  console.log(`Hi ${example.name}!`);
}

exampleFunction({ name: 'Matias' });