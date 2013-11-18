/* jshint laxcomma: true */

var assert = require('assert')
  ;


var steps = require(__dirname+'/../index')
  , step = steps.step
  ;


after(function() {
  steps.steps = {}; // reset steps
});


describe('.step', function() {
  it('adds a step into the stack', function() {
    step('this is a step', function() {
      return 'foo';
    });

    assert.equal(steps.steps['this is a step'](), 'foo');
  });

  it('warns when an existing step with the same name is stepped');
});

describe('.for', function() {
  it('adds steps in bulk', function() {
    steps.for('grouping name', {
      'this is a step': function() {
        return 'foo';
      },
      'this is another step': function() {
        return 'bar';
      }
    });

    assert.equal(steps.steps['this is a step'](), 'foo');
    assert.equal(steps.steps['this is another step'](), 'bar');
  });
});

describe('.use', function() {
  it('loads steps from file', function() {
    steps.use('example_step_steps');
    steps.use('example_exports_steps');

    assert.equal(steps.steps['a step from step'](), 'foo');
    assert.equal(steps.steps['another step from step'](), 'bar');
    assert.equal(steps.steps['a step from export'](), 'foo');
    assert.equal(steps.steps['another step from export'](), 'bar');
  });
});
