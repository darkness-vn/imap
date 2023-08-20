import { Server } from "socket.io"
import ping from "./ping.socket.js"
const useWebSocket = (originServer) => {
    
    const io = new Server(originServer, {
        cors: { methods: ["GET", "POST"], origin: "*" }
    })

    io.on("connection", socket => {

        console.log(`:: SOCKET ::`)

        ping({ socket, io })

        socket.on("disconnect", (reason) => {
            console.log(reason)
        })
    })
}

export default useWebSocket