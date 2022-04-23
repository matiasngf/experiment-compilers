declare module '*.hbs' {
  const generator: (...args: any[]) => string;
  export default generator;
}