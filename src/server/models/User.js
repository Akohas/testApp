const mongoose = require('mongoose');
const crypto = require('crypto');

const {
  Schema,
} = mongoose;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  hashedPassword: {
    type: String,
    required: true,
    unique: true,
  },
  salt: {
    type: String,
    required: true,
  },
});

UserSchema.methods.encryptPassword = function (password) {
  return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
};

UserSchema.virtual('password')
  .set(function (password) {
    this.plainPassowrd = password;
    this.salt = Math.random().toString();
    this.hashedPassword = this.encryptPassword(password);
  })
  .get(function () { return this.plainPassword; });

UserSchema.methods.checkPassword = function (password) {
  return this.encryptPassword(password) === this.hashedPassword;
};

module.exports = mongoose.model('User', UserSchema);
