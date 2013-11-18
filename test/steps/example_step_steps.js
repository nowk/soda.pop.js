/* jshint laxcomma: true */

var step = require(__dirname+'/../../index').step
  ;

step('a step from step', function() {
  return 'foo';
});

step('another step from step', function() {
  return 'bar';
});

