import { Sidebar } from "./Sidebar";
import { Outlet } from "react-router-dom";

export function Layout (){
    return (
        <div className="flex">
            <Sidebar />
            <div className="ml-64 p-6 w-full min-h-screen bg-gray-100">
                <Outlet />
            </div>
        </div>
    );
}
