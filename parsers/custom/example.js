import { parse } from "./parse.js";
import { translateTokens } from "./translateTokens.js";
import { mergeTokens } from "./utils.js";

// Usage:

const spanishSource = `
/**
 * Una funcion muy simple
*/
funcion foo(a = 'function', b  = 'return') {
  // Las keywords funcion & retornar van a ser reemplazadas por 'function' y 'return' respectivamente.
  retornar a + " " + b + "!";
}
// Los comentarios y strings no son reemplazados!
console.log(foo("hello", "world"));
`;

const spanishKeywords = {
  'function': 'funcion',
  'return': 'retornar',
};

const spanishTranslatedCode = mergeTokens(
  translateTokens(
    parse(spanishSource, spanishKeywords),
    spanishKeywords
  )
)

console.log('############### CODE FROM SPANISH:');
console.log(spanishTranslatedCode);

const emogiSource = `
🤖 max(a, b) {
  🤔(🦴 a !== 'number' || 🦴 b !== 'number') {
    🔥 "Values Must be numbers!";
  }

  🤔 (a > b) {
    👈 a;
  } 🤷🏼‍♂️ {
    👈 b;
  }
}
// test the function and log the result!
📣( max(10, 30) );
`
const emogiKeywords = {
  'function': '🤖',
  'return': '👈',
  'if': '🤔',
  'true': '👍',
  'false': '👎',
  'else': '🤷🏼‍♂️',
  'throw': '🔥',
  'console\.log': '📣',
  'typeof': '🦴'
}

const emogiTranslatedCode = mergeTokens(
  translateTokens(
    parse(emogiSource, emogiKeywords),
    emogiKeywords
  )
)
console.log('############### CODE FROM EMOGI:');
console.log(emogiTranslatedCode);
eval(emogiTranslatedCode);