'use strict';

const QUnit = require('qunit'), test = QUnit.test;
const stripIndent = require('common-tags').stripIndent;
const compileMarkdown = require('../lib/compile-markdown');

QUnit.module('Unit | compile-markdown', function(/* hooks */) {
  test('compacting paragraphs', function(assert) {
    let input = stripIndent`
      {{#foo-bar}}
      {{/foo-bar}}
    `;

    let result = compileMarkdown(input, { targetHandlebars: true });
    let expected = stripIndent`
      <div class="docs-md"><p>{{#foo-bar}}\n{{/foo-bar}}</p></div>
    `;

    assert.equal(result, expected);
  });

  test('compacting implicit code blocks', function(assert) {
    // Surrounding whitespace + 4-space indent = code block in MD
    let input = stripIndent`
      {{#foo-bar}}
          hello
      {{/foo-bar}}
    `;

    let result = compileMarkdown(input, { targetHandlebars: true });
    let expected = stripIndent`
      <div class="docs-md"><p>{{#foo-bar}}\n    hello\n{{/foo-bar}}</p></div>
    `;

    assert.equal(result, expected);
  });
});
