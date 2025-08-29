import {Activity, ArrowRight, CheckCircle, ChevronDown, XCircle, Star, Award, Clock, Users, Loader2} from "lucide-react";
import React from "react";
import {useDispatch} from "react-redux";

export default function Events({events,isLoading,changeStatus,viewEvents,navEvent}){

    const calculateProfit = (price, basicCost, soldTickets = 1, extraCost = 0) => {
        const revenue = price * soldTickets;
        const totalCost = (parseFloat(basicCost) * soldTickets) + parseFloat(extraCost || 0);
        return revenue - totalCost;
    };

    return (
        <div className="mb-8">
            <div className="flex items-center justify-between mb-6 px-4">
                <div className="flex items-center gap-3">
                    <div className="p-3 rounded-xl bg-gradient-to-r from-purple-500/20 to-indigo-600/20">
                        <Activity size={20} className="text-purple-400" />
                    </div>
                    <h2 className="text-white text-2xl font-bold leading-tight">
                        Events Management
                    </h2>
                </div>
                <button onClick={()=>{viewEvents()}}
                    className="text-teal-400 hover:text-teal-300 transition-colors text-sm font-semibold flex items-center gap-2 px-4 py-2 bg-slate-800/60 rounded-xl hover:bg-slate-700/60">
                    Manage All
                    <ChevronDown size={16} className="rotate-[-90deg]" />
                </button>
            </div>

            <div className="px-4">
                <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800/60 to-slate-900/80 backdrop-blur-sm border border-slate-700/50 shadow-2xl">
                    <div className="overflow-x-auto min-h-35">
                        {isLoading && (
                            <div className="absolute inset-0 bg-[#0f1c2e]/80 backdrop-blur-sm rounded-2xl flex items-center justify-center z-10">
                                <div className="flex flex-col items-center space-y-4">
                                    <Loader2 className="w-8 h-8 text-blue-400 animate-spin" />
                                    <p className="text-slate-300 text-lg font-medium">Loading Events...</p>
                                </div>
                            </div>
                        )}
                        <table className="w-full min-w-[1100px]">
                            <thead>
                            <tr className="bg-gradient-to-r from-slate-800/80 to-slate-700/80 border-b border-slate-600/30">
                                <th className="px-6 py-4 text-left text-white text-sm font-semibold">Event Details</th>
                                <th className="px-6 py-4 text-left text-white text-sm font-semibold">Registration Info</th>
                                <th className="px-6 py-4 text-left text-white text-sm font-semibold">Pricing</th>
                                <th className="px-6 py-4 text-left text-white text-sm font-semibold">Expected Profit</th>
                                <th className="px-6 py-4 text-left text-white text-sm font-semibold">Rating</th>
                                <th className="px-6 py-4 text-left text-white text-sm font-semibold">Status</th>
                                <th className="px-6 py-4 text-left text-white text-sm font-semibold">Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {events.map((event) => {
                                const hasActiveOffer = event.has_offer && event.offers && event.offers.length > 0;
                                const soldTickets = event.tickets_count ? (event.tickets_count - (event.remaining_tickets || 0)) : 1;
                                const bookingProgress = event.tickets_count ? Math.round((soldTickets / event.tickets_count) * 100) : 0;
                                const expectedProfit = calculateProfit(event.price, event.basic_cost, soldTickets, event.extra_cost);

                                return (
                                    <tr
                                        key={event.id} className="group border-t border-t-slate-700/30 hover:bg-gradient-to-r hover:from-slate-800/60 hover:to-slate-700/40 transition-all duration-300">
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-4">
                                                <div className="relative">
                                                    {event.images && event.images.length > 0 ? (
                                                        <img
                                                            src={event.images[0].url}
                                                            alt={event.name}
                                                            className="w-14 h-14 rounded-2xl object-cover border-2 border-purple-500/30 group-hover:border-purple-400/50 transition-all duration-300 group-hover:scale-110"
                                                        />
                                                    ) : (
                                                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500/30 to-indigo-600/30 border-2 border-purple-500/30 group-hover:border-purple-400/50 transition-all duration-300 group-hover:scale-110 flex items-center justify-center">
                                                            <Activity size={20} className="text-purple-400" />
                                                        </div>
                                                    )}
                                                    {hasActiveOffer && (
                                                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                                                            <Award size={10} className="text-white" />
                                                        </div>
                                                    )}
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                                </div>
                                                <div>
                                                    <p className="text-white font-semibold text-lg group-hover:text-teal-300 transition-colors duration-300">{event.name}</p>
                                                    <div className="flex items-center gap-2 mt-1">
                                                    <span className="inline-block px-3 py-1 bg-gradient-to-r from-teal-600/20 to-teal-700/20 text-teal-300 text-xs rounded-full border border-teal-500/20">
                                                        {event.category.name}
                                                    </span>
                                                        {hasActiveOffer && (
                                                            <span className="inline-block px-2 py-1 bg-red-500/20 text-red-400 text-xs rounded-full border border-red-500/30">
                                                            {event.offers[0].discount}% OFF
                                                        </span>
                                                        )}
                                                    </div>
                                                    <div className="flex items-center gap-1 mt-1">
                                                        <Star size={12} className="text-yellow-400 fill-current" />
                                                        <span className="text-slate-400 text-xs">{event.rate} ({event.reviewer_count})</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            {event.is_limited ? (
                                                <div className="space-y-2">
                                                    <div className="flex items-center gap-2 text-slate-300">
                                                        <Users size={14} className="text-purple-400" />
                                                        <span className="text-white font-semibold">{soldTickets}/{event.tickets_count}</span>
                                                    </div>
                                                    <div className="w-full bg-slate-700/50 rounded-full h-2">
                                                        <div
                                                            className="bg-gradient-to-r from-purple-500 to-purple-400 h-2 rounded-full transition-all duration-500"
                                                            style={{width: `${bookingProgress}%`}}
                                                        ></div>
                                                    </div>
                                                    <span className="text-xs text-slate-400 font-medium">{bookingProgress}% filled</span>
                                                    <div className="flex items-center gap-2 text-slate-400 text-xs">
                                                        <Clock size={12} />
                                                        <span>Limited seats</span>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="space-y-2">
                                                    <div className="flex items-center gap-2 text-green-400">
                                                        <Users size={14} />
                                                        <span className="text-sm font-medium">Unlimited</span>
                                                    </div>
                                                    <div className="text-slate-400 text-xs">
                                                        Open registration
                                                    </div>
                                                    <div className="flex items-center gap-2 text-slate-400 text-xs">
                                                        <Clock size={12} />
                                                        <span>Always available</span>
                                                    </div>
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="space-y-1">
                                                {hasActiveOffer ? (
                                                    <>
                                                        <div className="text-slate-400 text-sm line-through">${event.main_price}</div>
                                                        <div className="text-white font-bold text-xl">${event.price}</div>
                                                        <div className="text-green-400 text-xs font-medium">
                                                            Save ${(parseFloat(event.main_price) - event.price).toFixed(2)}
                                                        </div>
                                                    </>
                                                ) : (
                                                    <div className="text-white font-bold text-xl">${event.price}</div>
                                                )}
                                                <div className="text-slate-500 text-xs">
                                                    Basic cost: ${event.basic_cost}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="space-y-1">
                                            <span className={`font-semibold text-lg ${expectedProfit >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                                ${expectedProfit.toFixed(2)}
                                            </span>
                                                <div className="text-slate-400 text-xs">
                                                    {event.is_limited ? `for ${soldTickets} sold` : 'per registration'}
                                                </div>
                                                {event.extra_cost && parseFloat(event.extra_cost) > 0 && (
                                                    <div className="text-red-400 text-xs">
                                                        -${event.extra_cost} prizes cost
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="space-y-2">
                                                <div className="flex items-center gap-2">
                                                    <Star size={16} className="text-yellow-400 fill-current" />
                                                    <span className="text-white font-semibold">{event.rate}/5</span>
                                                </div>
                                                <div className="text-slate-400 text-xs">
                                                    {event.reviewer_count} reviews
                                                </div>
                                                <div className="text-slate-400 text-xs">
                                                    {event.stars_count} stars total
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="space-y-2">
                                                <button
                                                    onClick={() => changeStatus({ id: event.id, status: event.status })}
                                                    className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-sm font-semibold transition-all duration-300 shadow-lg ${
                                                        event.status === 'active'
                                                            ? 'bg-gradient-to-r from-green-600/20 to-emerald-600/20 text-green-400 border border-green-500/30 hover:from-green-500/30 hover:to-emerald-500/30 hover:scale-105'
                                                            : 'bg-gradient-to-r from-red-600/20 to-pink-600/20 text-red-400 border border-red-500/30 hover:from-red-500/30 hover:to-pink-500/30 hover:scale-105'
                                                    }`}
                                                >
                                                    {event.status === 'active' ? <CheckCircle size={14} /> : <XCircle size={14} />}
                                                    {event.status}
                                                </button>
                                                {event.is_deleted && (
                                                    <div className="text-red-400 text-xs font-medium">
                                                        Marked for deletion
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <button
                                                onClick={() => {navEvent(event.id)}}
                                                className="flex items-center gap-2 px-4 py-2 rounded-2xl text-sm font-semibold transition-all duration-300 shadow-lg bg-gradient-to-r from-blue-600/20 to-cyan-600/20 text-blue-400 border border-blue-500/30 hover:from-blue-500/30 hover:to-cyan-500/30 hover:scale-105 hover:shadow-blue-500/25 group"
                                            >
                                                <span>View</span>
                                                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
                                            </button>
                                        </td>
                                    </tr>
                                )})}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}