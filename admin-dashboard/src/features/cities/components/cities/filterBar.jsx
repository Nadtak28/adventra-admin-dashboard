import {Filter, Globe, MapPin, Search} from "lucide-react";
import React from "react";

export default function FilterBar({isSearchFocused,setIsSearchFocused,search,sortBy,handleInputChange}) {
    return (
        <div className="flex flex-wrap gap-6 mb-8 px-4">
            {/* Enhanced Search Bar */}
            <div className={`
                                relative group flex-1 min-w-[300px] h-14 rounded-2xl overflow-hidden 
                                shadow-xl transition-all duration-500 ease-out
                                ${isSearchFocused ? 'shadow-teal-400/20 scale-104' : 'shadow-black/50'}
                                before:absolute before:inset-0 before:bg-gradient-to-r 
                                before:from-teal-400/10 before:via-transparent before:to-slate-700/20
                                before:opacity-0 before:transition-opacity before:duration-300
                                ${isSearchFocused ? 'before:opacity-100' : ''}
                            `}>
                {/* Animated border gradient */}
                <div className={`
                                    absolute inset-0 bg-gradient-to-r from-teal-400/30 via-slate-600/30 to-teal-400/30
                                    transition-opacity duration-500 rounded-2xl
                                    ${isSearchFocused ? 'opacity-100' : 'opacity-0'}
                                `} style={{ padding: '1px' }}>
                    <div className="w-full h-full bg-slate-800/90 backdrop-blur-md rounded-2xl"></div>
                </div>

                <div className="relative flex w-full h-full">
                    {/* Search Icon Container */}
                    <div className={`
                                        flex items-center justify-center px-4 
                                        bg-slate-800/80 backdrop-blur-sm border-r border-slate-600/30
                                        transition-all duration-300 group-hover:bg-slate-700/80
                                        ${isSearchFocused ? 'text-teal-300 bg-slate-700/90' : 'text-teal-400'}
                                    `}>
                        <div className={`
                                            transition-transform duration-300 
                                            ${isSearchFocused ? 'scale-110 rotate-12' : 'group-hover:scale-105'}
                                        `}>
                            <Search size={20} strokeWidth={2.5} />
                        </div>
                    </div>

                    {/* Input Field */}
                    <div className="relative flex-1 flex items-center">
                        <input
                            type="text"
                            placeholder="Search cities or countries..."
                            value={search}
                            onChange={(e) => handleInputChange('search', e.target.value)}
                            onFocus={() => setIsSearchFocused(true)}
                            onBlur={() => setIsSearchFocused(false)}
                            className={`
                                                w-full h-full px-5 py-4 
                                                bg-slate-800/60 backdrop-blur-sm
                                                text-white text-base font-medium
                                                placeholder-slate-400/70
                                                focus:outline-none focus:bg-slate-800/80
                                                transition-all duration-300 z-1
                                                ${isSearchFocused ? 'placeholder-teal-300/50' : ''}
                                            `}
                        />

                        {/* Floating Icons */}
                        <div className={`
                                            absolute right-4 flex items-center space-x-2
                                            transition-all duration-300
                                            ${search ? 'opacity-100 translate-x-0' : 'opacity-40 translate-x-2'}
                                        `}>
                            <div className="text-slate-500 hover:text-teal-400 transition-colors duration-200 cursor-pointer">
                                <MapPin size={16} />
                            </div>
                            <div className="text-slate-500 hover:text-teal-400 transition-colors duration-200 cursor-pointer">
                                <Globe size={16} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Subtle glow effect */}
                <div className={`
                                    absolute -inset-1 bg-gradient-to-r from-teal-400/20 to-slate-600/20 
                                    rounded-2xl blur-xl transition-opacity duration-500
                                    ${isSearchFocused ? 'opacity-50' : 'opacity-0'}
                                `}></div>
            </div>

            {/* Enhanced Sort Dropdown */}
            <div className="relative min-w-[200px]">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-teal-400 z-10">
                    <Filter size={18} />
                </div>
                <select
                    value={sortBy}
                    onChange={(e) => handleInputChange('sortBy',e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-slate-800/80 backdrop-blur-sm border border-slate-600/50 hover:border-slate-500/70 rounded-2xl text-white focus:outline-none focus:border-teal-500 shadow-lg transition-all duration-300 appearance-none cursor-pointer"
                >
                    <option value="name">Sort by Name</option>
                    <option value="events">Sort by Events</option>
                    <option value="guides">Sort by Guide</option>
                    <option value="visitor">Sort by Visitors</option>
                    <option value="revenue">Sort by Revenue</option>
                    <option value="rate">Sort by Rating</option>
                </select>
            </div>
        </div>
    )
}