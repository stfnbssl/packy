export function getContents(markdown) {
  /*
    This .dot members concatenation is not correctly wizzified
  */
  return markdown
    .replace(headerRegExp, '') // Remove header information
    .split(/^{{|}}$/gm) // Split markdown into an array, separating demos
    .filter(content => !emptyRegExp.test(content)); // Remove empty lines
}
