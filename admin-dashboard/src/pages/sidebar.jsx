import {useLocation, useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";


const Sidebar = ({ isCollapsed, toggleSidebar }) => {
    const [items, setItems] = useState([
        { icon: "🏠", label: "Dashboard", active: false, path: "" },
        { icon: "🏙️", label: "Cities", active: false, path: "cities" },
        { icon: "📅", label: "Events & Group Trips", active: false, path: "event_grouptrip" },
        { icon: "👥", label: "Guides", active: false, path: "guides"},
        { icon: "🏆", label: "Prizes", active: false, path: "prizes"},
        { icon: "👤", label: "Customers", active: false, path: "customers"},
    ]);
    const location=useLocation().pathname.split("/").pop();
    useEffect(() => {
        const currentLocation=location==='dashboard'?'':location
        const updatedItems =
            items.map(item => ({
            ...item,
            active: item.path === currentLocation
        }));
        setItems(updatedItems);
    },[])

    const [showLabel, setShowLabel] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const navigate = useNavigate();

    const handleChange = (activeItem) => {
        const newItems = items.map((item, index) => ({
            ...item,
            active: index === activeItem
        }));
        setItems(newItems);
        navigate(items[activeItem].path)
    };

    // تحديد حالة التوسع بناءً على hover أو collapsed state
    const isExpanded = !isCollapsed || isHovered;
    useEffect(() => {
        let timer;
        if (isExpanded) {
            timer = setTimeout(() => {
                setShowLabel(true);
            }, 100);
        } else {
            setShowLabel(false); // reset مباشرة عند الإغلاق
        }
        return () => clearTimeout(timer); // تنظيف
    }, [isExpanded]);
    return (
        <div
            className={`fixed left-0 top-0 h-full z-50 transition-all duration-700 ease-in-out ${
                isExpanded ? 'w-72' : 'w-21'
            }`}
            onMouseEnter={() => {
                setIsHovered(true)
                toggleSidebar(isExpanded);
            }}
            onMouseLeave={() => {

                    setIsHovered(false)
                    toggleSidebar(isExpanded)

            }}
        >
            {/* Background with Glass Effect */}
            <div className="absolute inset-0 bg-[#151e1c]/90 backdrop-blur-2xl border-r border-white/10"></div>

            {/* Animated Background Orbs */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-10 -left-10 w-20 h-20 bg-emerald-500/20 rounded-full blur-xl animate-pulse"></div>
                <div className="absolute top-1/3 -right-5 w-16 h-16 bg-teal-500/15 rounded-full blur-lg animate-bounce"></div>
                <div className="absolute bottom-1/4 -left-5 w-12 h-12 bg-green-500/20 rounded-full blur-lg animate-pulse delay-1000"></div>
            </div>

            <div className="relative flex h-full flex-col">

                {/* Header */}
                <div className={`px-5 py-8 transition-all duration-700 ease-in-out ${isExpanded ? 'px-14' : 'px-4'}`}>
                    <div className="flex items-center gap-3">
                        <div className={`relative transition-all duration-700 ease-in-out ${isExpanded ? '' : 'mx-auto'}`}>
                            <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg transform rotate-12 hover:rotate-0 transition-transform duration-700">
                                <span className="text-white font-bold text-lg transform -rotate-12">A</span>
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-2xl blur opacity-40 animate-pulse"></div>
                        </div>
                        <div className={`transition-all duration-700 ease-in-out ${
                            isExpanded ? 'w-40 opacity-100 translate-x-0' : 'w-0 opacity-0 overflow-hidden translate-x-2'
                        }`}>
                            <h1 className="text-2xl font-bold text-transparent bg-gradient-to-r from-white via-emerald-200 to-teal-200 bg-clip-text whitespace-nowrap">
                                Adventra
                            </h1>
                            <div className="w-12 h-0.5 bg-gradient-to-r from-emerald-400 to-transparent rounded-full mt-1"></div>
                        </div>
                    </div>
                </div>

                {/* Navigation Items */}
                <div className="flex-1 px-4 space-y-2">
                    {items.map((item, index) => (
                        <div
                            key={index}
                            onClick={() => handleChange(index)}
                            className={`relative group cursor-pointer ${isExpanded ? '' : 'flex justify-center'}`}
                        >
                            {/* Active Indicator - Left */}
                            {item.active && (
                                <div className={`absolute  bottom-0 w-1 bg-gradient-to-b from-emerald-400 to-teal-500 rounded-r-full transition-all duration-700 ease-in-out ${
                                    isExpanded ? 'left-0 top-0 opacity-100' : '-left-10 top-0 opacity-0'
                                }`}></div>
                            )}

                            {/* Active Indicator - Right (for collapsed state) */}
                            {item.active && !isExpanded && (
                                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-8 bg-gradient-to-br from-emerald-400 via-emerald-500 to-teal-600 rounded-l-full shadow-lg shadow-emerald-500/50 transition-all duration-700 ease-in-out -z-10">
                                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-l-full"></div>
                                    <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-emerald-300 rounded-full blur-sm animate-pulse"></div>
                                </div>
                            )}

                            {/* Right decorative element for collapsed active state */}
                            {item.active && !isExpanded && (
                                <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-3 h-3 bg-emerald-400/30 rounded-full blur-sm transition-all duration-700 ease-in-out"></div>
                            )}

                            <div className={`relative flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-700 ease-in-out ${
                                item.active
                                    ? isExpanded
                                        ? 'bg-gradient-to-r from-emerald-500/20 to-transparent border border-emerald-400/30 shadow-lg shadow-emerald-500/10'
                                        : 'bg-gradient-to-l from-emerald-500/30 via-emerald-500/20 to-emerald-500/10 border border-emerald-400/40 shadow-lg shadow-emerald-500/20'
                                    : 'hover:bg-white/5 hover:border-white/10 border border-transparent'
                            } ${isExpanded ? 'w-full' : 'w-12 h-12 justify-center p-0 mx-auto'}`}>

                                {/* Icon Container */}
                                <div className={`relative flex items-center justify-center transition-all duration-700 ease-in-out w-8 h-8 ${
                                    item.active ? 'scale-140' : 'group-hover:scale-105'
                                } ${isExpanded ? 'left-0' : 'left-2'}`}>
                                    <div className={`absolute inset-0 rounded-xl bg-gradient-to-br from-green-500 to-teal-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300`}></div>
                                    <span className="text-xl relative z-10" >{item.icon}</span>
                                </div>

                                {/* Label */}
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

                                {/* Hover Effect */}
                                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>

                            {/* Tooltip for collapsed state - سيظهر فقط عندما يكون collapsed وليس hover */}
                            {!isExpanded && !isHovered && (
                                <div className={`absolute left-full ml-3 px-3 py-2 bg-[#151e1c] border border-white/20 text-white text-sm rounded-lg transition-all duration-300 pointer-events-none whitespace-nowrap z-30 shadow-xl opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100`}>
                                    {item.label}
                                    <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#151e1c] border-l border-b border-white/20 transform rotate-45"></div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Bottom Section */}
                <div className="p-4 border-t border-white/10">
                    <div className={`group cursor-pointer ${isExpanded ? '' : 'flex justify-center'}`}>
                        <div className={`flex items-center gap-4 px-4 py-3 rounded-2xl hover:bg-white/5 transition-all duration-700 ease-in-out ${
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

                        {/* Settings Tooltip - سيظهر فقط عندما يكون collapsed وليس hover */}
                        {!isExpanded && !isHovered && (
                            <div className={`absolute left-full ml-3 px-3 py-2 bg-[#151e1c] border border-white/20 text-white text-sm rounded-lg transition-all duration-300 pointer-events-none whitespace-nowrap z-30 shadow-xl opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100`}>
                                Settings
                                <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#151e1c] border-l border-b border-white/20 transform rotate-45"></div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar