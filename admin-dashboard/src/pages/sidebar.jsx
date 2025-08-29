import { useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

const Sidebar = ({ isCollapsed, toggleSidebar }) => {
    const [items, setItems] = useState([
        { icon: "🏠", label: "Dashboard", active: false, path: "" },
        { icon: "🏙️", label: "Cities", active: false, path: "cities" },
        { icon: "📅", label: "Events & Group Trips", active: false, path: "event_grouptrip" },
        { icon: "👥", label: "Guides", active: false, path: "guides" },
        { icon: "👤", label: "Users", active: false, path: "users" },
        { icon: "🔔", label: "Notification", active: false, path: "notifications" },
    ]);
    const location = useLocation().pathname.split("/").pop();
    useEffect(() => {
        const currentLocation = location === 'dashboard' ? '' : location;
        const updatedItems =
            items.map(item => ({
                ...item,
                active: item.path === currentLocation
            }));
        setItems(updatedItems);
    }, [location]);

    const [showLabel, setShowLabel] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const navigate = useNavigate();

    const handleChange = (activeItem) => {
        const newItems = items.map((item, index) => ({
            ...item,
            active: index === activeItem
        }));
        setItems(newItems);
        navigate(items[activeItem].path);
    };

    const isExpanded = !isCollapsed || isHovered;
    useEffect(() => {
        let timer;
        if (isExpanded) {
            timer = setTimeout(() => {
                setShowLabel(true);
            }, 100);
        } else {
            setShowLabel(false);
        }
        return () => clearTimeout(timer);
    }, [isExpanded]);

    return (
        <div
            className={`fixed left-0 top-0 h-full z-50 transition-all duration-700 ease-in-out ${
                isExpanded ? 'w-72' : 'w-21'
            }`}
            onMouseEnter={() => {
                setIsHovered(true);
                toggleSidebar(isExpanded);
            }}
            onMouseLeave={() => {
                setIsHovered(false);
                toggleSidebar(isExpanded);
            }}
        >
            <div className="absolute inset-0 bg-[#0b1520]/90 backdrop-blur-2xl border-r border-white/10"></div>

            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-10 -left-10 w-20 h-20 bg-blue-500/20 rounded-full blur-xl animate-pulse"></div>
                <div className="absolute top-1/3 -right-5 w-16 h-16 bg-sky-500/15 rounded-full blur-lg animate-bounce"></div>
                <div className="absolute bottom-1/4 -left-5 w-12 h-12 bg-cyan-500/20 rounded-full blur-lg animate-pulse delay-1000"></div>
            </div>

            <div className="relative flex h-full flex-col">
                <div className={`px-5 py-8 transition-all duration-700 ease-in-out ${isExpanded ? 'px-14' : 'px-4'}`}>
                    <div className="flex items-center gap-3">
                        <div className={`relative transition-all duration-700 ease-in-out ${isExpanded ? '' : 'mx-auto'}`}>
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-sky-600 rounded-2xl flex items-center justify-center shadow-lg transform rotate-12 hover:rotate-0 transition-transform duration-700">
                                <span className="text-white font-bold text-lg transform -rotate-12">A</span>
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-sky-600 rounded-2xl blur opacity-40 animate-pulse"></div>
                        </div>
                        <div className={`transition-all duration-700 ease-in-out ${
                            isExpanded ? 'w-40 opacity-100 translate-x-0' : 'w-0 opacity-0 overflow-hidden translate-x-2'
                        }`}>
                            <h1 className="text-2xl font-bold text-transparent bg-gradient-to-r from-white via-blue-200 to-sky-200 bg-clip-text whitespace-nowrap">
                                Adventra
                            </h1>
                            <div className="w-12 h-0.5 bg-gradient-to-r from-blue-400 to-transparent rounded-full mt-1"></div>
                        </div>
                    </div>
                </div>

                <div className="flex-1 px-4 space-y-2">
                    {items.map((item, index) => (
                        <div
                            key={index}
                            onClick={() => handleChange(index)}
                            className={`relative group cursor-pointer ${isExpanded ? '' : 'flex justify-center'}`}
                        >
                            {item.active && (
                                <div className={`absolute bottom-0 w-1 bg-gradient-to-b from-blue-400 to-sky-500 rounded-r-full transition-all duration-700 ease-in-out ${
                                    isExpanded ? 'left-0 top-0 opacity-100' : '-left-10 top-0 opacity-0'
                                }`}></div>
                            )}

                            {item.active && !isExpanded && (
                                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-8 bg-gradient-to-br from-blue-400 via-blue-500 to-sky-600 rounded-l-full shadow-lg shadow-blue-500/50 transition-all duration-700 ease-in-out -z-10">
                                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-l-full"></div>
                                    <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-blue-300 rounded-full blur-sm animate-pulse"></div>
                                </div>
                            )}

                            {item.active && !isExpanded && (
                                <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-3 h-3 bg-blue-400/30 rounded-full blur-sm transition-all duration-700 ease-in-out"></div>
                            )}

                            <div className={`relative flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-700 ease-in-out ${
                                item.active
                                    ? isExpanded
                                        ? 'bg-gradient-to-r from-blue-500/20 to-transparent border border-blue-400/30 shadow-lg shadow-blue-500/10'
                                        : 'bg-gradient-to-l from-blue-500/30 via-blue-500/20 to-blue-500/10 border border-blue-400/40 shadow-lg shadow-blue-500/20'
                                    : 'hover:bg-white/5 hover:border-white/10 border border-transparent'
                            } ${isExpanded ? 'w-full' : 'w-12 h-12 justify-center p-0 mx-auto'}`}>

                                <div className={`relative flex items-center justify-center transition-all duration-700 ease-in-out w-8 h-8 ${
                                    item.active ? 'scale-140' : 'group-hover:scale-105'
                                } ${isExpanded ? 'left-0' : 'left-2'}`}>
                                    <div className={`absolute inset-0 rounded-xl bg-gradient-to-br from-blue-500 to-sky-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300`}></div>
                                    <span className="text-xl relative z-10">{item.icon}</span>
                                </div>

                                <div
                                    className={`transition-all duration-1000 ease-in-out ${
                                        isExpanded ? "w-15" : "w-0 overflow-hidden"
                                    } ${showLabel ? "opacity-100 translate-x-2" : "opacity-0 -translate-x-2"}`}
                                >
                                    <span className={`text-sm font-medium transition-colors duration-300 whitespace-nowrap ${
                                        item.active
                                            ? 'text-white'
                                            : 'text-white/40 group-hover:text-white'
                                    }`}>
                                        {item.label}
                                    </span>
                                </div>

                                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>

                            {!isExpanded && !isHovered && (
                                <div className={`absolute left-full ml-3 px-3 py-2 bg-[#0b1520] border border-white/20 text-white text-sm rounded-lg transition-all duration-300 pointer-events-none whitespace-nowrap z-30 shadow-xl opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100`}>
                                    {item.label}
                                    <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#0b1520] border-l border-b border-white/20 transform rotate-45"></div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <div className="p-4 border-t border-white/10">
                    <div className={`group cursor-pointer ${isExpanded ? '' : 'flex justify-center'}`}>
                        <div onClick={() => {navigate('/dashboard/settings')}} className={`flex items-center gap-4 px-4 py-3 rounded-2xl hover:bg-white/5 transition-all duration-700 ease-in-out ${
                            isExpanded ? 'w-full' : 'w-12 h-12 justify-center p-0 mx-auto'
                        }`}>
                            <div className={`relative transition-all duration-700 ease-in-out ${isExpanded ? '' : 'mx-auto'}`}>
                                <span className="text-xl transition-transform duration-300 group-hover:rotate-90">⚙️</span>
                            </div>
                            <div className={`transition-all duration-700 ease-in-out ${
                                isExpanded ? 'w-15 opacity-100 translate-x-0' : 'w-0 opacity-0 overflow-hidden translate-x-2'
                            }`}>
                                <span className="text-sm font-medium text-white/70 group-hover:text-white transition-colors whitespace-nowrap">
                                    Settings
                                </span>
                            </div>
                        </div>

                        {!isExpanded && !isHovered && (
                            <div onClick={() => {navigate('/dashboard/settings')}}
                                className={`absolute left-full ml-3 px-3 py-2 bg-[#0b1520] border border-white/20 text-white text-sm rounded-lg transition-all duration-300 pointer-events-none whitespace-nowrap z-30 shadow-xl opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100`}>
                                Settings
                                <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#0b1520] border-l border-b border-white/20 transform rotate-45"></div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
