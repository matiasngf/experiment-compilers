declare module '*.generator' {
  const generator: (...args: any[]) => string;
  export default generator;
}