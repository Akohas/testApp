import Router from 'koa-router'
import Scale from '../../models/Scale'

async function createPoint (ctx: Router.IRouterContext) {
  const { _id } = ctx.user
  const { value, scaleName } = ctx.request.body

  try {
    const scale = await Scale.findOneAndUpdate(
    { name: scaleName, _creator: _id },
    { $push: { points: { value } } },
    { upsert: true, new: true }
  )
    return { status: 'success', result: { scale } }
  } catch ({ message }) {
    return { status: 'error', error: message }
  }
}

export default createPoint
