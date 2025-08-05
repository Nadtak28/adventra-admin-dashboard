import React from "react";

export default function StateCard({title,children,value,trend}) {
    return(
    <div className="flex flex-col gap-4 rounded-2xl p-6 bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 hover:border-gray-600 transition-all duration-300 hover:shadow-2xl group">
        <div className="flex items-center justify-between">
            <p className="text-gray-400 text-sm font-medium">{title} This Month</p>
            <div className=" p-3 rounded-xl bg-gradient-to-r from-teal-500/20 to-slate-600/20 group-hover:from-teal-400/30 group-hover:to-slate-500/30 group-hover:scale-110 transition-transform duration-300">
                {children}
            </div>
        </div>
        <div className="flex items-end justify-between">
            <p className="text-white text-3xl font-bold">{value}</p>
            <span className={`text-sm font-medium px-2 py-1 rounded-lg ${
                trend.startsWith('+')
                    ? 'text-teal-300 bg-teal-900/30'
                    : 'text-rose-400 bg-rose-900/20'
            }`}>
                {trend}
            </span>
        </div>
    </div>
    )
}