import mongoose from "mongoose"

// moi lan dang nhap hoac logout se truyen len toa do X Y de luu len server 

const User = mongoose.model('User', {   
    username: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    position: { type: { lat: String, lng: String } }
})

export default User