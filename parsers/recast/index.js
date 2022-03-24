import { parse } from "recast";

const source = `
function foo(a, b) {
  return a + b;
}
`
const noneSource = `
funcion foo(a, b) {
  retornar a + b;
}
`


console.log(parse(source).tokens);

/**
[
  {
    type: 'Keyword',
    value: 'function',
    loc: { start: [Object], end: [Object] }
  },
  {
    type: 'Identifier',
    value: 'foo',
    loc: { start: [Object], end: [Object] }
  },
  {
    type: 'Punctuator',
    value: '(',
    loc: { start: [Object], end: [Object] }
  },
  {
    type: 'Identifier',
    value: 'a',
    loc: { start: [Object], end: [Object] }
  },
  {
    type: 'Punctuator',
    value: ',',
    loc: { start: [Object], end: [Object] }
  },
  {
    type: 'Identifier',
    value: 'b',
    loc: { start: [Object], end: [Object] }
  },
  {
    type: 'Punctuator',
    value: ')',
    loc: { start: [Object], end: [Object] }
  },
  {
    type: 'Punctuator',
    value: '{',
    loc: { start: [Object], end: [Object] }
  },
  {
    type: 'Keyword',
    value: 'return',
    loc: { start: [Object], end: [Object] }
  },
  {
    type: 'Identifier',
    value: 'a',
    loc: { start: [Object], end: [Object] }
  },
  {
    type: 'Punctuator',
    value: '+',
    loc: { start: [Object], end: [Object] }
  },
  {
    type: 'Identifier',
    value: 'b',
    loc: { start: [Object], end: [Object] }
  },
  {
    type: 'Punctuator',
    value: ';',
    loc: { start: [Object], end: [Object] }
  },
  {
    type: 'Punctuator',
    value: '}',
    loc: { start: [Object], end: [Object] }
  }
]
 */