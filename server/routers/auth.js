import { Router } from "express"
import User from "../models/users.js"

const auth = Router()

auth.post("/register", async (req, res) => {
    const { username, password } = req.body
    try {
        const newUser = new User ({ username, password })
        await newUser.save()

        return res.status(200).json(`User ${username} has been registered`)
    } catch (error) {
        return res.status(400).json(`Can not register`)
    }
})

auth.post("/login", async (req, res) => {
    const { username, password } = req.body
    try {
        const user = await User.findOne({ username, password })

        if (user) {
            return res.status(200).json({ username: user.username, _id: user._id.toString() })
        }

    } catch (error) {
        return res.status(400).json(`Can not login`)
    }
})

export default auth