import mongoose from "mongoose"

const User = mongoose.model('User', {
    username: { type: String, require: true, unique: true },
    password: { type: String, require: true }
})

export default User