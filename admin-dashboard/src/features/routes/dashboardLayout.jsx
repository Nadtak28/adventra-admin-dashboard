import {Outlet} from 'react-router-dom'
import Sidebar from "../../pages/sidebar.jsx";
import React, {useState} from "react";
export default function DashboardLayout() {
    const [isCollapsed, setIsCollapsed] = useState(true);

    const toggleSidebar = (value) => {
        setIsCollapsed(value);
    };
    return (
        <div className=" flex size-full w-full min-h-screen flex-col bg-[#151e1c] group/design-root overflow-x-hidden font-sans">
            <Sidebar isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />
                <div className={`transition-all duration-700 ease-in-out ${
                isCollapsed ? 'ml-20' : 'ml-80'
                } p-6 min-h-screen bg-gray-100`}>
                    <Outlet/>
                </div>
        </div>
    )
}