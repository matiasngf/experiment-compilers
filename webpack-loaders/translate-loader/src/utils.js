import defaultKeywords from "./defaultKeywords";

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
  }
  return [ match[0], str.replace(regexp, replace) ];
}

export const mergeTokens = (tokens) => {
  let source = '';
  for(const token of tokens) {
    source += token.value;
  }
  return source;
}

