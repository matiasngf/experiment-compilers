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
ðĪ max(a, b) {
  ðĪ(ðĶī a !== 'number' || ðĶī b !== 'number') {
    ðĨ "Values Must be numbers!";
  }

  ðĪ (a > b) {
    ð a;
  } ðĪ·ðžââïļ {
    ð b;
  }
}
// test the function and log the result!
ðĢ( max(10, 30) );
`
const emogiKeywords = {
  'function': 'ðĪ',
  'return': 'ð',
  'if': 'ðĪ',
  'true': 'ð',
  'false': 'ð',
  'else': 'ðĪ·ðžââïļ',
  'throw': 'ðĨ',
  'console\.log': 'ðĢ',
  'typeof': 'ðĶī'
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