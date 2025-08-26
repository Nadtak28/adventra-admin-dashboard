import {Calendar, Search, Users} from "lucide-react";
import React, {useState} from "react";

export default function searchBarAndSelector({searchType,setSearchType,setSelectedStatus,searchTerm,setSearchTerm,go})
{
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    return (<>
        {/* Search Type Selector */}
    <div className="flex justify-center">
        <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-2 border border-slate-700/50">
            <div className="flex bg-slate-700/50 rounded-xl p-1">
                <button
                    onClick={() => setSearchType('event')}
                    className={`px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                        searchType === 'event'
                            ? 'bg-teal-500 text-white shadow-lg'
                            : 'text-slate-400 hover:text-white'
                    }`}
                >
                    <Calendar size={16} />
                    Events
                </button>
                <button
                    onClick={() => {
                        setSearchType('group_trip')
                        setSelectedStatus('pending')
                    }}
                    className={`px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                        searchType === 'group_trip'
                            ? 'bg-teal-500 text-white shadow-lg'
                            : 'text-slate-400 hover:text-white'
                    }`}
                >
                    <Users size={16} />
                    Group Tours
                </button>
            </div>
        </div>
    </div>

    {/* Search Bar */}
    <div className={`relative group w-full h-16 rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 ease-out ${isSearchFocused ? 'shadow-teal-400/20 scale-105' : 'shadow-black/50'}`}>
        <div className="relative flex w-full h-full bg-slate-800/80 backdrop-blur-sm">
            <div onClick={go} className={`flex items-center justify-center px-5 border-r border-slate-600/30 transition-all duration-300 cursor-pointer ${isSearchFocused ? 'text-teal-300' : 'text-teal-400'}`}>
                <Search size={22} strokeWidth={2.5} />
            </div>
            <input
                type="text"
                placeholder={`Search ${searchType === 'event' ? 'events' : 'group tours'} by name or description...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className="w-full h-full px-6 py-4 bg-transparent text-white text-lg font-medium placeholder-slate-400/70 focus:outline-none"
            />
        </div>
    </div>
        </>
    )
}