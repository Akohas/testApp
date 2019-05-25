import Router from 'koa-router'
import Scale from '../../models/Scale'

async function deletePoint (ctx: Router.IRouterContext) {
  const { _id } = ctx.user
  const { scaleId, pointId } = ctx.request.body

  try {
    const scale = await Scale.findOne({ _id: scaleId, _creator: _id, 'points._id' : pointId })
    if (!scale) throw new Error('Such point doesn\'t exist')
    await Scale.findOneAndUpdate({ _id: scaleId, _creator: _id }, { $pull: { points:  { _id: pointId } } })
    return { status: 'success' }
  } catch ({ message }) {
    return { status: 'error', error: message }
  }

}

export default deletePoint
