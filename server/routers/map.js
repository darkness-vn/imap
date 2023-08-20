import { Router } from "express"

const map = Router()
map.get("/", (req, res) => {
    res.send(`Map`)
})

export default map