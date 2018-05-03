'use strict';

const marked = require('marked');
const highlightjs = require('highlightjs');
const HBSRenderer = require('./renderers/hbs-renderer');
const compactParagraphs = require('./utils/compact-paragraphs');

module.exports = function compileMarkdown(source, config) {
  let tokens = marked.lexer(source);
  let markedOptions = {
    highlight,
    renderer: new HBSRenderer(config)
  };

  if (config && config.targetHandlebars) {
    tokens = compactParagraphs(tokens);
  }

  return `<div class="md">${marked.parser(tokens, markedOptions).trim()}</div>`;
};

function highlight(code, lang) {
  if (lang) {
    return highlightjs.highlight(lang, code).value;
  } else {
    return highlightjs.highlightAuto(code).value;
  }
}
