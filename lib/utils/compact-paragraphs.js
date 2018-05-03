'use strict';

/**
 * Whitespace can imply paragraphs in Markdown, which can result
 * in interleaving between <p> tags and block component invocations,
 * so this scans the Marked tokens to turn things like this:
 *    <p>{{#my-component}}<p>
 *    <p>{{/my-component}}</p>
 * Into this:
 *    <p>{{#my-component}} {{/my-component}}</p>
 */
module.exports = function compactParagraphs(tokens) {
  let compacted = [];

  compacted.links = tokens.links;

  let balance = 0;
  for (let token of tokens) {
    if (balance === 0) {
      compacted.push(token);
    } else if (token.text) {
      let last = compacted[compacted.length - 1];
      last.text = `${last.text} ${token.text}`;
    }

    balance += count(/\{\{#/g, token.text);
    balance -= count(/\{\{\//g, token.text);
  }

  return compacted;
};

function count(regex, string) {
  let total = 0;
  while (regex.exec(string)) total++;
  return total;
}
