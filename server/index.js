import http from "http"
import bodyParser from "body-parser"
import cors from "cors"
import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import routers from "./routers/index.js"
import useWebSocket from "./socket/index.js"

dotenv.config()

async function main() {

    const PORT = 8888
    const app = express()
    const server = http.createServer(app)

    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json())
    app.use(cors())
    app.use("/api", routers)

    try {
        await mongoose.connect(process.env.MONGODB)
        useWebSocket(server)
        server.listen(PORT, () => console.log(`server is running on port ${PORT}`))
    } catch (error) {
        console.log(error)
    }

}

main()