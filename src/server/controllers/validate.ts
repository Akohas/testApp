import Ajv from 'ajv'
import schemas from '../schemas'
import Router from 'koa-router'

const ajv = new Ajv()

function validate (schemaName: string) {
  const schema = schemas[schemaName]

  return (ctx: Router.IRouterContext, next: () => Promise<any>) => {
    const valid = ajv.validate(schema, ctx.request.body)
    if (!valid) ctx.throw(422, JSON.stringify(ajv.errors))
    return next()
  }
}

module.exports = validate
