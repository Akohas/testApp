import Router from 'koa-router'
import Scale from '../../models/Scale'
import { baseResponse } from '../../helpers'

async function createPoint (ctx: Router.IRouterContext) {
  const { _id } = ctx.user
  const { value, scaleName } = ctx.request.body

  try {
    const scale = await Scale.findOneAndUpdate(
    { name: scaleName, _creator: _id },
    { $push: { points: { value } } },
    { upsert: true, new: true }
  )
    return baseResponse(null, scale)
  } catch ({ message }) {
    return baseResponse(message, null, 500)
  }
}

export default createPoint
