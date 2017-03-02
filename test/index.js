'use strict';

const ObjectId = require('mongoose').Types.ObjectId;
const Joi = require('joi');

Joi.ObjectId = require('../')(Joi, ObjectId);

describe('JoiObjectId', function () {

  it('validate correct objectid and convert to Mongoose.ObjectId', function* () {
    const objectId = new ObjectId();
    const result = Joi.attempt(objectId, Joi.ObjectId());

    expect(result instanceof ObjectId).to.be.true;
    expect(result.toString()).to.equal(objectId.toString());
  });

  it('validate correct objectid given as string and convert to Mongoose.ObjectId', function* () {
    const objectIdString = (new ObjectId()).toString();
    const result = Joi.attempt(objectIdString, Joi.ObjectId());

    expect(result instanceof ObjectId).to.be.true;
    expect(result.toString()).to.equal(objectIdString);
  });

  it('reject invalid object id', function* () {
    function test() {
      const objectIdString = "123";
      const result = Joi.attempt(objectIdString, Joi.ObjectId());
    }

    expect(test).to.throw(Error);
  });
});
