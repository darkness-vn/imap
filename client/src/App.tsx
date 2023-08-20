import { useEffect } from "react"
import socket from "./socket"

export default function App() {

	useEffect(() => {
		socket.on("ping", data => {
			console.log(data)
		})
	}, [socket])

	const ping = () => {
		socket.emit("ping", { sender: "client", data: "ping to server" })
	}

	return <div>
		<p>Hello world</p>
		<button onClick={ping}>Ping</button>
	</div>
}