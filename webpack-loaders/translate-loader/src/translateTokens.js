export const reverseKeywords = (keywords) => {
  const reversed = {};
  for(const [key, value] of Object.entries(keywords)) {
    reversed[value] = key;
  }
  return reversed;
}

export const translateTokens = (tokens, keywords) => {
  const reversedKeywords = reverseKeywords(keywords);
  return tokens.map( token => {
    if(token.type === 'keyword' && reversedKeywords[token.value]) {
      return {
        type: 'keyword',
        value: reversedKeywords[token.value],
      }
    }
    return token;
  })
}
