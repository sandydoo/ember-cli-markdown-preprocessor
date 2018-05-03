'use strict';

const marked = require('marked');

module.exports = class HBSRenderer extends marked.Renderer {
  constructor(config) {
    super();
    this.config = config || {};
  }

  codespan() {
    return this._processCode(super.codespan.apply(this, arguments));
  }

  code() {
    let code = this._processCode(super.code.apply(this, arguments));
    return code.replace(/^<pre>/, '<pre class="md__code">');
  }

  // Unescape quotes in text, as they may be part of a Handlebars statement
  text() {
    let text = super.text.apply(this, arguments);
    if (this.config.targetHandlebars) {
      text = text
        .replace(/&quot;|&#34;/g, `"`)
        .replace(/&apos;|&#39;/g, `'`);
    }
    return text;
  }

  heading(text, level) {
    let id = text.toLowerCase().replace(/<\/?.*?>/g, '').replace(/[^\w]+/g, '-');
    return `<h${level} id='${id}' class='md__h${level}'>${text}</h${level}>`;
  }

  hr() {
    return `<hr class='md__hr'>`;
  }

  blockquote(text) {
    return `<blockquote class='md__blockquote'>${text}</blockquote>`;
  }

  link(href, title, text) {
    return `<a href="${href}" title="${title}" class="md__a">${text}</a>`;
  }

  // Escape curlies in code spans/blocks to avoid treating them as Handlebars
  _processCode(string) {
    if (this.config.targetHandlebars) {
      string = this._escapeCurlies(string);
    }

    return string;
  }

  _escapeCurlies(string) {
    return string
      .replace(/{{/g, '&#123;&#123;')
      .replace(/}}/g, '&#125;&#125;');
  }
};
