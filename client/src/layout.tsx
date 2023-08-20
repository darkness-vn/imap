import { Outlet } from "react-router-dom"

export default function Layout() {
    return <div className="bg-gray-700 min-h-[100vh] w-screen flex items-center justify-center">
        <Outlet />
    </div>
} 