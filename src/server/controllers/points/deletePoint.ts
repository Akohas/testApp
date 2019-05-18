import Router from 'koa-router'
import Scale from '../../models/Scale'

async function deletePoint (ctx: Router.IRouterContext) {
  const { _id } = ctx.user
  const { scaleId, pointId } = ctx.request.body

  return Scale.findOneAndUpdate(
    { _id: scaleId, _creator: _id },
    { $pull: { points:  { _id: pointId } } }
  )

}

export default deletePoint
