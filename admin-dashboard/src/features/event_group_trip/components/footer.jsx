import {Star, TrendingUp, Users} from "lucide-react";
import React from "react";

export default function Footer(){
    return (
    <div className="rounded-2xl p-8 mx-4 bg-gradient-to-br from-slate-800/60 to-slate-900/80 backdrop-blur-sm border border-slate-700/50 shadow-2xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group text-center p-6 rounded-2xl bg-gradient-to-br from-slate-800/40 to-slate-900/60 border border-slate-700/30 hover:border-teal-500/30 transition-all duration-300 hover:scale-105">
                <div className="flex items-center justify-center gap-3 mb-4">
                    <div className="p-3 rounded-xl bg-gradient-to-r from-green-500/20 to-emerald-600/20">
                        <TrendingUp size={24} className="text-green-400" />
                    </div>
                    <h3 className="text-white font-bold text-lg">This Month</h3>
                </div>
                <p className="text-slate-400 text-sm mb-2 font-medium">Revenue Growth</p>
                <p className="text-green-400 text-3xl font-bold">+15.2%</p>
            </div>
            <div className="group text-center p-6 rounded-2xl bg-gradient-to-br from-slate-800/40 to-slate-900/60 border border-slate-700/30 hover:border-teal-500/30 transition-all duration-300 hover:scale-105">
                <div className="flex items-center justify-center gap-3 mb-4">
                    <div className="p-3 rounded-xl bg-gradient-to-r from-teal-500/20 to-cyan-600/20">
                        <Users size={24} className="text-teal-400" />
                    </div>
                    <h3 className="text-white font-bold text-lg">Active Bookings</h3>
                </div>
                <p className="text-slate-400 text-sm mb-2 font-medium">Current Week</p>
                <p className="text-white text-3xl font-bold">23/55</p>
            </div>
            <div className="group text-center p-6 rounded-2xl bg-gradient-to-br from-slate-800/40 to-slate-900/60 border border-slate-700/30 hover:border-teal-500/30 transition-all duration-300 hover:scale-105">
                <div className="flex items-center justify-center gap-3 mb-4">
                    <div className="p-3 rounded-xl bg-gradient-to-r from-yellow-500/20 to-orange-600/20">
                        <Star size={24} className="text-yellow-400" />
                    </div>
                    <h3 className="text-white font-bold text-lg">Customer Satisfaction</h3>
                </div>
                <p className="text-slate-400 text-sm mb-2 font-medium">Average Rating</p>
                <p className="text-yellow-400 text-3xl font-bold">{4.7} ⭐</p>
            </div>
        </div>
    </div>
    )
}