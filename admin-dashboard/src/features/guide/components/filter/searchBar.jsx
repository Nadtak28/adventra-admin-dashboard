import {Search} from "lucide-react";
import React, {useState} from "react";

export  default function SearchBar({searchTerm,setSearchTerm,go}) {
    const [isSearchFocused, setIsSearchFocused] = useState(false);

    return(
        <div className={`relative group w-full h-16 rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 ease-out ${isSearchFocused ? 'shadow-teal-400/20 scale-105' : 'shadow-black/50'}`}>
        <div className="relative flex w-full h-full bg-slate-800/80 backdrop-blur-sm">
            <div onClick={go} className={`flex items-center justify-center px-5 border-r border-slate-600/30 transition-all duration-300 cursor-pointer ${isSearchFocused ? 'text-teal-300' : 'text-teal-400'}`}>
                <Search size={22} strokeWidth={2.5} />
            </div>
            <input
                type="text"
                placeholder="Search guides by name, city, or specialization..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className="w-full h-full px-6 py-4 bg-transparent text-white text-lg font-medium placeholder-slate-400/70 focus:outline-none"
            />
        </div>
    </div>)
}