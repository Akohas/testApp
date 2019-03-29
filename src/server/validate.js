const ajv = require('ajv')();
const schemas = require('./schemas');

function validate(schemaName) {
  const schema = schemas[schemaName];

  return (ctx, next) => {
    const valid = ajv.validate(schema, ctx.request.body);
    if (!valid) ctx.throw(422, JSON.stringify(ajv.errors));
    return next();
  };
}

module.exports = validate;
