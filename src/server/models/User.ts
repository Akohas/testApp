import mongoose from 'mongoose'
import crypto from 'crypto'

const {
  Schema
} = mongoose

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  hashedPassword: {
    type: String,
    required: true,
    unique: true
  },
  salt: {
    type: String,
    required: true
  }
})

UserSchema.methods.encryptPassword = function (password: string) {
  return crypto.createHmac('sha1', this.salt).update(password).digest('hex')
}

UserSchema.virtual('password')
  .set(function (this: any, password: string) {
    this.plainPassowrd = password
    this.salt = Math.random().toString()
    this.hashedPassword = this.encryptPassword(password)
  })
  .get(function (this: any) {
    return this.plainPassword
  })

UserSchema.methods.checkPassword = function (password: string) {
  return this.encryptPassword(password) === this.hashedPassword
}

export default mongoose.model('User', UserSchema)
