import Router from 'koa-router'
import Scale from '../../models/Scale'

function createPoint (ctx: Router.IRouterContext) {
  const { _id } = ctx.user
  const { value, scaleName } = ctx.request.body

  return Scale.findOneAndUpdate(
    { name: scaleName, _creator: _id },
    { $push: { points: { value } } },
    { upsert: true, new: true }
  )
}

export default createPoint
