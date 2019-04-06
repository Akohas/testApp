const koaPassport = require('koa-passport');
const { Strategy: LocalStrategy } = require('passport-local');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { secret } = require('../../../config/server');

const { ExtractJwt, Strategy } = require('passport-jwt');

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secret,
};

koaPassport.use(new Strategy(jwtOptions, (jwtPayload:any, done:any) => {
  if (jwtPayload) return done(false, jwtPayload);
  return done();
}));

koaPassport.use(new LocalStrategy(
  {
    usernameField: 'username',
    passwordField: 'password',
    session: false,
  },
  ((username:any, password:any, done:any) => {
    User.findOne({ username }, (err:any, user:any) => {
      if (err) {
        return done(err);
      }

      if (!user || !user.checkPassword(password)) {
        return done(null, false, { message: 'Нет такого пользователя или пароль неверен.' });
      }
      return done(null, user);
    });
  }),
));

function generateJWT(username:any) {
  const today = new Date();
  const exp = new Date(today);
  const time:number = exp.getTime();
  exp.setDate(today.getDate() + 60);

  return jwt.sign({
    username,
    exp: time / 1000,
  }, secret);
}

async function checkAuth(ctx:any, next:any) {
  await koaPassport.authenticate('jwt', { session: false }, (error:any, decryptToken:any, jwtError:any) => {
    if (error) ctx.throw(error, 500);
    if (jwtError) ctx.throw(jwtError, 500);
    ctx.user = decryptToken;
    next();
  })(ctx, next);
}

const localAuthHandler = (ctx:any, next:any) => koaPassport.authenticate(
  'local',
  async (err:any, user:any, info:any) => {
    let token;
    if (user === false) {
      ctx.throw(info.message, 401);
    }
    try {
      token = await generateJWT(user.username);
    } catch (error) {
      ctx.throw(error, 500);
    }

    ctx.status = 200;
    ctx.body = { token };
  },
)(ctx, next);


const registrationController = async (body:any) => {
  const { username, password } = body;
  const user = await User.findOne({ username });
  let token;
  if (user) {
    return {
      error: 'User already exists',
      status: 401,
    };
  }
  try {
    token = await generateJWT(username);
  } catch (e) {
    return {
      error: e,
      status: 500,
    };
  }

  const newuser = new User({ username, password });

  await newuser.save();
  return { token };
};

export { localAuthHandler, registrationController, checkAuth };
