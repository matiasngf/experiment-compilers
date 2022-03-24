import { getKeywordsRegex, matchReplace } from "./utils.js";

export const parse = (source, keywords = {}) => {
  const result = [];

  const matchers = {
    space: /(^[\s\t\n\r]+)/,
    multiLineComment: /^\/\*(?:(?!\*\/).|[\n\r])+\*\//,
    singleLineComment: /^\/\/.*/,
    stringDobleQuote: /^"(?:[^"\\]|\\.)*"/,
    stringSingleQuote: /^'(?:[^'\\]|\\.)*'/,
    templateLiteral: /^`(?:[^'\\]|\\.)*`/,
    keyword: getKeywordsRegex(keywords),
    identifier: /^[_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*/,
  }

  const matchersEntries = Object.entries(matchers);
  while (source.length) {
    let foundToken = false
    for( const [type, matcher] of matchersEntries ) {
      const extractedMatch = matchReplace(matcher, source);
      if(!extractedMatch) {continue;}
      source = extractedMatch[1];
      result.push({
        type,
        value: extractedMatch[0],
      })
      foundToken = true;
      break;
    }
    if(!foundToken) {
      const token = source.charAt(0);
      source = source.slice(1);
      result.push({
        type: 'puntctuator',
        value: token,
      })
    }
  }
  return result;
}