export const getKeywordsRegex = (keywords = {}) => {
  let keywordsRegRaw = '';
  const finalKeywords = {
    ...defaultKeywords,
    ...keywords,
  }
  Object.values(finalKeywords).forEach((keyword, i) => {
    if(i !== 0) {
      keywordsRegRaw += `|(?:${keyword})`;
    } else {
      keywordsRegRaw += `(?:${keyword})`;
    }
  });
  keywordsRegRaw = `^(?:${keywordsRegRaw})`;
  const keywordsRegex = new RegExp(keywordsRegRaw);
  return keywordsRegex
}

export const matchReplace = (regexp, str, replace = '') => {
  const match = regexp.exec(str);
  if(!match) {
    return null;
  } else {
    return [ match[0], str.replace(regexp, replace) ];
  }
}

export const mergeTokens = (tokens) => {
  let source = '';
  for(const token of tokens) {
    source += token.value;
  }
  return source;
}

const defaultKeywords = {
  'abstract': 'abstract',
  'arguments': 'arguments',
  'await': 'await',
  'boolean': 'boolean',
  'break': 'break',
  'byte': 'byte',
  'case': 'case',
  'catch': 'catch',
  'char': 'char',
  'class': 'class',
  'const': 'const',
  'continue': 'continue',
  'debugger': 'debugger',
  'default': 'default',
  'delete': 'delete',
  'do': 'do',
  'double': 'double',
  'else': 'else',
  'enum': 'enum',
  'eval': 'eval',
  'export': 'export',
  'extends': 'extends',
  'false': 'false',
  'final': 'final',
  'finally': 'finally',
  'float': 'float',
  'for': 'for',
  'function': 'function',
  'goto': 'goto',
  'if': 'if',
  'implements': 'implements',
  'import': 'import',
  'in': 'in',
  'instanceof': 'instanceof',
  'int': 'int',
  'interface': 'interface',
  'let': 'let',
  'long': 'long',
  'native': 'native',
  'new': 'new',
  'null': 'null',
  'package': 'package',
  'private': 'private',
  'protected': 'protected',
  'public': 'public',
  'return': 'return',
  'short': 'short',
  'static': 'static',
  'super': 'super',
  'switch': 'switch',
  'synchronized': 'synchronized',
  'this': 'this',
  'throw': 'throw',
  'throws': 'throws',
  'transient': 'transient',
  'true': 'true',
  'try': 'try',
  'typeof': 'typeof',
  'var': 'var',
  'void': 'void',
  'volatile': 'volatile',
  'while': 'while',
  'with': 'with',
  'yield': 'yield'
}