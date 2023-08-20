import { FormEvent, InputHTMLAttributes, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { login } from "../redux/slices/auth.slice"
import axios from "axios"

export default function Register() {

    const nav = useNavigate()
    const usernameRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const dispatch = useDispatch()

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        navigator.geolocation.getCurrentPosition(async (position: GeolocationPosition) => {
            const { data } = await axios.post("http://localhost:8888/api/auth/register", {
                username: usernameRef.current?.value,
                password: passwordRef.current?.value,
                lat: position.coords.latitude,
                lng: position.coords.longitude
            })
            const res = data as AuthResponse
            dispatch(login(res.data))
            localStorage.setItem("auth", JSON.stringify(res.data))
            nav("/map")
        })
    }

    return <div className="bg-gray-500 px-8 py-6 rounded-lg">
        <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
            <p className="text-lg font-semibold">Đăng ký tài khoản</p>
            <input ref={usernameRef} className="px-4 py-2 rounded-md" placeholder="Nhập tên tài khoản" />
            <input ref={passwordRef} className="px-4 py-2 rounded-md" placeholder="Nhập mật khẩu" />
            <button type="submit" className="bg-green-500 rounded-lg py-2">Đăng Ký</button>
        </form>
    </div>
}