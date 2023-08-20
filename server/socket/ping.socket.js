const ping = ({ socket, io }) => {
    socket.on("ping", body => {
        console.log(body)
        socket.emit("ping", { sender: "server", data: {
            fromClient: body.data,
            fromServer: "response ping to client"
        } })
    })
}

export default ping