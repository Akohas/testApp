const ajv = require('ajv')();
const schemas = require('./schemas');

function validate(schemaName:any) {
  const schema = schemas[schemaName];

  return (ctx:any, next:any) => {
    const valid = ajv.validate(schema, ctx.request.body);
    if (!valid) ctx.throw(422, JSON.stringify(ajv.errors));
    return next();
  };
}

module.exports = validate;
