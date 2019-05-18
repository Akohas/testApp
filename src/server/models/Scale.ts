import mongoose from '../mongoose'

const {
  Schema
} = mongoose

const PointSchema = {
  createdAt: {
    type: Date,
    default: Date.now
  },
  value: {
    type: Number,
    required: true,
    min: 0,
    max: 10
  }
}

const ScaleSchema = new Schema({
  _creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  name: {
    type: String,
    required: true
  },
  points: [
    PointSchema
  ]
})

export default mongoose.model('Scale', ScaleSchema)
