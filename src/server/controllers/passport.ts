import Router from 'koa-router'
import koaPassport from 'koa-passport'
import { Strategy as LocalStrategy } from 'passport-local'
import User from '../models/User'
import jwt from 'jsonwebtoken'
import config from '../../../config/server'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { IUser } from '../interfaces/schemas'
import { ControllerResponse, UserJWT } from '../interfaces/controllers'
import { baseResponse } from '../helpers'

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.secret
}

koaPassport.use(new Strategy(jwtOptions, (jwtPayload: any, done: any) => {
  if (jwtPayload) return done(false, jwtPayload)
  return done()
}))

koaPassport.use(new LocalStrategy(
  {
    usernameField: 'username',
    passwordField: 'password',
    session: false
  },
  ((username: string, password: string, done: Function) => {
    User.findOne({ username }, (err: Error, user: IUser) => {
      if (err) {
        return done(err)
      }

      if (!user || !user.checkPassword(password)) {
        return done(null, false, { message: "user doesn't exist" })
      }
      return done(null, user)
    })
  })
))

function generateJWT (username: string) {
  const today = new Date()
  const exp = new Date(today)
  const time: number = exp.getTime()
  exp.setDate(today.getDate() + 60)

  return jwt.sign({
    username,
    exp: time / 1000
  }, config.secret)
}

async function checkAuth (ctx: Router.RouterContext, next: () => Promise<any>) {
  await koaPassport.authenticate('jwt', { session: false }, async (error: Error, { username }: UserJWT, jwtError: Error) => {
    if (error) ctx.throw(error, 500)
    if (jwtError) ctx.throw(jwtError, 500)
    const user = await User.findOne({ username })
    ctx.user = user
    await next()
  })(ctx, next)
}

const localAuthHandler = (ctx: Router.RouterContext, next: () => Promise<any>) => koaPassport.authenticate(
  'local',
  async (err: Error, user: any, info: any) => {
    let token
    if (user === false || err) {
      ctx.status = 200
      ctx.body = baseResponse(info.message, null, 401)
      return
    }
    try {
      token = await generateJWT(user.username)
    } catch (error) {
      ctx.status = 200
      ctx.body = baseResponse(error.message, null, 500)
      return
    }

    ctx.status = 200
    ctx.body = baseResponse(null, { token })
  }
)(ctx, next)

const registrationController = async (body: any): Promise<ControllerResponse> => {
  const { username, password } = body
  const user = await User.findOne({ username })
  let token
  if (user) {
    return {
      error: 'User already exists',
      status: 401
    }
  }
  try {
    token = await generateJWT(username)
  } catch (e) {
    return {
      error: e,
      status: 500
    }
  }

  const newuser = new User({ username, password })

  await newuser.save()
  return { token }
}

export { localAuthHandler, registrationController, checkAuth }
