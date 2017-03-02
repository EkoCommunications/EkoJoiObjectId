'use strict';

const assert = require('assert');

/**
 * Extend joi with new ObjectId type and return the new Joi instance
 *
 * @param  {Object} Joi      Joi instance 
 * @param  {Object} ObjectId Mongo or Mongoose ObjectId type object
 * @return {Object}          modified Joi instance
 */
module.exports = (Joi, ObjectId) => {
  assert(Joi && Joi.isJoi, 'you must pass Joi as an argument');

  return Joi.extend({
    name: 'ObjectId',
    pre(value, state, options) {
      if (options.convert) {
        return ObjectId(value);
      }

      return value;
    },
    rules: [{
      name: 'ObjectId',
      validate(params, value, state, options) {
        if (value.toString() !== ObjectId(value).toString()) {
          this.createError('value is not a valid ObjectId', { v: value }, state, options);
        }

        return value;
      }
    }]
  }).ObjectId;
};
