/* jshint laxcomma: true */

var soda = require('soda')
  ;


/*
 * add then, when, given methods to soda
 *
 * @api public
 */

['then', 'when', 'given'].forEach(function(meth) {
  soda.prototype[meth] = function(step, args) {
    then(step, args).call(this, this);
    return this;
  };
});


/*
 * call steps on browser
 *
 * @api private
 */

function then(step, args) {
  return function(browser) {
    which(step).call(browser, args);
  };
}


/*
 * returns matched step
 *
 * @api private
 */

function which(step) {
  return Soda.Pop.steps[step];
}


/*
 * step stack
 */

var Soda = {};
Soda.Pop = {steps: {}};


/*
 * build steps stack
 *
 * @api public
 */

Soda.Pop.for = function(key, steps) {
  for(var step in steps) {
    if (steps.hasOwnProperty(step)) {
      this.steps[step] = steps[step];
    }
  }
};


/*
 * load specific steps from file
 *
 * @api public
 */

Soda.Pop.use = function(filename) {
  var steps = require(__dirname+'/../steps/'+filename);
  Soda.Pop.for(steps[0], steps[1]);
};


module.exports = Soda.Pop;

