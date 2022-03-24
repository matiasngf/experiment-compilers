import { getKeywordsRegex, matchReplace } from "./utils";

const parse = (source, keywords = {}) => {
  const result = [];
  let tmpSource = source

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
  while (tmpSource.length) {
    let foundToken = false
    for( const [type, matcher] of matchersEntries ) {
      const extractedMatch = matchReplace(matcher, tmpSource);
      if(extractedMatch) {
        const [value, newSource] = extractedMatch;
        tmpSource = newSource;
        result.push({
          type,
          value,
        })
        foundToken = true;
        break;
      }
    }
    if(!foundToken) {
      const token = tmpSource.charAt(0);
      tmpSource = tmpSource.slice(1);
      result.push({
        type: 'puntctuator',
        value: token,
      })
    }
  }
  return result;
}

export default parse