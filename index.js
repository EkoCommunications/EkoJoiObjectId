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

  const modifiedJoi = Joi.extend({
    name: 'ObjectId',
    language: {
      ObjectId: 'value need to be a valid ObjectId, a String of 12 bytes or a string of 24 hex characters'
    },
    pre(value, state, options) {
      if (options.convert) {
        try {
          return ObjectId(value);
        } catch(error) {
          return value;
        }
      }

      return value;
    },
    rules: [{
      name: 'ObjectId',
      validate(params, value, state, options) {
        try {
          if (value.toString() !== ObjectId(value).toString()) {
            throw new Error('invalid value');
          }
        } catch(error) {
          return this.createError('ObjectId.ObjectId', { v: value }, state, options);          
        }

        return value;
      }
    }]
  });

  return () => {
    return modifiedJoi.ObjectId().ObjectId();
  }
};
