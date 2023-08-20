import { Router } from "express"
import auth from "./auth.js"
import map from "./map.js"

const routers = Router()
routers.use("/auth", auth)
routers.use("/map", map)

export default routers