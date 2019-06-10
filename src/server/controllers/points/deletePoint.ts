import Router from 'koa-router'
import Scale from '../../models/Scale'
import { baseResponse } from '../../helpers'

async function deletePoint (ctx: Router.IRouterContext) {
  const { _id } = ctx.user
  const { scaleId, pointId } = ctx.request.body

  try {
    const scale = await Scale.findOne({ _id: scaleId, _creator: _id, 'points._id' : pointId })
    if (!scale) return baseResponse('Such point doesn\'t exist', null, 500)
    await Scale.findOneAndUpdate({ _id: scaleId, _creator: _id }, { $pull: { points:  { _id: pointId } } })
    return baseResponse()
  } catch ({ message }) {
    return baseResponse(message, null, 500)
  }

}

export default deletePoint
