import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  cartData: {
    type: Object,
  },
  date: {
    type: Date,
    default: Date.now,
  },
})

// The `mongoose.models.Users ||` part prevents "OverwriteModelError"
// if the file gets loaded more than once.
const userModel = mongoose.models.Users || mongoose.model('Users', userSchema)

export default userModel