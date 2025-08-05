import React from "react";

export default function StateCard({ name, value, children }) {
 return(
    <div className="group relative bg-gradient-to-br from-slate-800/80 to-slate-900/90 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 hover:shadow-2xl hover:shadow-teal-500/10 transition-all duration-500 hover:scale-105 hover:border-teal-500/30">
        <div className="flex items-center justify-between">
            <div>
                <p className="text-slate-400 text-sm font-medium mb-1">{name}</p>
                <p className="text-white text-2xl font-bold">{value}</p>
            </div>
            <div className="p-3 rounded-xl bg-gradient-to-r from-teal-500/20 to-slate-600/20 group-hover:from-teal-400/30 group-hover:to-slate-500/30 transition-all duration-300">
                {children}
            </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-teal-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
    </div>
);}