import { Router } from "express"
import User from "../models/users.js"
import haversineDistance from "../utils/haversineDistance.js"

const map = Router()
map.get("/", (req, res) => {
    res.send(`Map`)
})

map.post("/arround", async (req, res) => {
    const R = 0.01
    const you = await User.findById(req.body._id)
    /**
     * ket qua phai la 1 danh sach user thoa man dieu kien saU:
     * user.position.lat <= you.position.lat + R
     * user.position.lng <= you.position.lng + R
     */
    const users = await User.find()
    const result = users.filter(user => {
        return user.position.lat <= you.position.lat + R 
            && user.position.lng <= you.position.lng + R && user.username !== you.username
    })
    res.status(200).json(result.map(i => {
        let newItem = {...i}
        delete newItem._doc.password
        newItem.distance = haversineDistance(
            you.position.lat,
            you.position.lng,
            i._doc.position.lat,
            i._doc.position.lng,
        )
        return newItem
    }))
})

export default map