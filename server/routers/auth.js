import { Router } from "express"
import User from "../models/users.js"

const auth = Router()

auth.post("/register", async (req, res) => {
    const { username, password, lat, lng } = req.body
    console.log(lat, lng)
    try {
        const newUser = new User ({ username, password, position: { lat, lng } })
        await newUser.save()

        return res.status(200).json({
            msg: `User ${username} has been registered`,
            data: { username: newUser.username, _id: newUser._id.toString() }
        })
    } catch (error) {
        console.log(error)
        return res.status(400).json(`Can not register`)
    }
})

auth.post("/login", async (req, res) => {
    const { username, password, lat, lng } = req.body
    try {
        const user = await User.findOne({ username, password })
        user.position = { lat, lng }
        await user.save()

        if (user) {
            return res.status(200).json({ username: user.username, _id: user._id.toString() })
        }

    } catch (error) {
        console.log(error)
        return res.status(400).json(`Can not login`)
    }
})

export default auth