const mapKeys = require('lodash/mapKeys');
const isUndefined = require('lodash/isUndefined');
const isObject = require('lodash/isObject');
const S = require('string');

const camelCase = (value, key) => S(key).camelize().s;

const deepMapKeys = (obj, cb) => {
  if (isUndefined(obj)) throw new Error('Expected a value but got `undefined`');

  obj = mapKeys(obj, cb);

  const res = {};
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      const val = obj[key];

      if (isObject(val)) {
        res[key] = deepMapKeys(val, cb);
      } else {
        res[key] = val;
      }
    }
  }

  return res;
};

module.exports = {
  camelCase: camelCase,
  deepMapKeys: deepMapKeys
};
