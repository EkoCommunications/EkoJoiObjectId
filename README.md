[![Build Status](https://travis-ci.org/EkoCommunications/EkoJoiObjectId.svg?branch=master)](https://travis-ci.org/EkoCommunications/EkoQueue)
[![npm version](https://badge.fury.io/js/eko-joi-objectid.svg)](https://badge.fury.io/js/eko-joi-objectid)
[![Code Climate](https://codeclimate.com/github/EkoCommunications/EkoJoiObjectId/badges/gpa.svg)](https://codeclimate.com/github/EkoCommunications/EkoJoiObjectId)

# EkoJoiObjectId
Extending Joi to validate and convert mongo/mongoose ObjectId

## Installation

```
$ npm install eko-joi-objectid --save
```


## Usage Example

```
var Joi = require('joi');
var ObjectId = require('mongoose').Types.ObjectId;
Joi.objectId = require('eko-joi-objectid')(Joi, ObjectId);

var someObjectId = (new ObjectId()).toString();
var result = Joi.attempt(someObjectId, Joi.ObjectId());

result instanceof ObjectId; // => true
```