import { module, test } from 'qunit';
import { find, currentURL, visit } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | index', function(hooks) {
  setupApplicationTest(hooks);

  test('visiting /', async function(assert) {
    await visit('/');
    assert.equal(currentURL(), '/');
    assert.equal(find('h1').textContent, 'test');
  });
});
