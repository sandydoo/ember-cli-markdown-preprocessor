'use strict';

const path = require('path');
const MergeTrees = require('broccoli-merge-trees');
const Funnel = require('broccoli-funnel');

module.exports = {
  name: 'ember-cli-markdown-preprocessor',

  isDevelopingAddon() {
    return true;
  },

  options: {
    nodeAssets: {
      'highlight.js': {
        public: {
          include: [ 'styles/monokai.css' ]
        },
        vendor: {
          include: [ 'styles/monokai.css' ]
        }
      }
    }
  },

  init(parent) {
    this._super.init && this._super.init.apply(this, arguments);

    let options = parent.options;
    this.addonOptions = Object.assign({}, options && options['ember-cli-markdown-processor']);
  },

  setupPreprocessorRegistry(type, registry) {
    if (type === 'parent') {
      let MarkdownPreprocessor = this.addonOptions.MarkdownPreprocessor || require('./lib/preprocessors/markdown-preprocessor');
      registry.add('template', new MarkdownPreprocessor());
    }
  },

  treeForVendor(vendor) {
    return new MergeTrees([
      vendor,
      this._highlightJSTree(),
    ].filter(Boolean));
  },

  _highlightJSTree() {
    return new Funnel(path.dirname(require.resolve('highlightjs/package.json')), {
      srcDir: 'styles',
      destDir: 'highlightjs-styles'
    });
  }
};
