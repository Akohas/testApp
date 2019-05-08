import mongoose from 'mongoose'

const {
  Schema
} = mongoose

const PointSchema = new Schema({
  scaleName: {
    type: String,
    required: true,
    unique: true
  },
  createdAt: {
    type: Array,
    default: new Date().toUTCString()
  },
  value: {
    type: Number,
    required: true
  }
})

export default mongoose.model('Scale', PointSchema)
