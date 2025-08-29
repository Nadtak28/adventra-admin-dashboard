import {BarChart3, ChevronDown, Star, TrendingUp, Users, Award, Calendar, Loader2} from "lucide-react";
import React from "react";

export default function RecentGroupTrips({recentGroupTrips,isLoading,viewRecentGroupTrips}){
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    const calculateProfitMargin = (revenue, basicCost, extraCost, soldTickets) => {
        const totalRevenue = parseFloat(revenue);
        const totalCost = (parseFloat(basicCost) * soldTickets) + parseFloat(extraCost);
        const profit = totalRevenue - totalCost;
        const margin = totalRevenue > 0 ? ((profit / totalRevenue) * 100).toFixed(1) : 0;
        return { profit, margin };
    };

    return (
        <div className="mb-8">
            <div className="flex items-center justify-between mb-6 px-4">
                <div className="flex items-center gap-3">
                    <div className="p-3 rounded-xl bg-gradient-to-r from-green-500/20 to-emerald-600/20">
                        <BarChart3 size={20} className="text-green-400" />
                    </div>
                    <h2 className="text-white text-2xl font-bold leading-tight">
                        Recent Tours Performance
                    </h2>
                </div>
                <button onClick={()=>{viewRecentGroupTrips()}}
                    className="text-teal-400 hover:text-teal-300 transition-colors text-sm font-semibold flex items-center gap-2 px-4 py-2 bg-slate-800/60 rounded-xl hover:bg-slate-700/60">
                    View Details
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
                                    <p className="text-slate-300 text-lg font-medium">Loading Group Trips...</p>
                                </div>
                            </div>
                        )}
                        <table className="w-full min-w-[1100px]">
                            <thead>
                            <tr className="bg-gradient-to-r from-slate-800/80 to-slate-700/80 border-b border-slate-600/30">
                                <th className="px-6 py-4 text-left text-white text-sm font-semibold">Tour Details</th>
                                <th className="px-6 py-4 text-left text-white text-sm font-semibold">Participants</th>
                                <th className="px-6 py-4 text-left text-white text-sm font-semibold">Total Costs</th>
                                <th className="px-6 py-4 text-left text-white text-sm font-semibold">Revenue</th>
                                <th className="px-6 py-4 text-left text-white text-sm font-semibold">Profit Analysis</th>
                                <th className="px-6 py-4 text-left text-white text-sm font-semibold">Rating</th>
                                <th className="px-6 py-4 text-left text-white text-sm font-semibold">Completion</th>
                            </tr>
                            </thead>
                            <tbody>
                            {recentGroupTrips.map((tour, index) => {
                                const soldTickets = tour.tickets_count - tour.remaining_tickets;
                                const { profit, margin } = calculateProfitMargin(soldTickets*tour.price, tour.basic_cost,tour.extra_cost, soldTickets);
                                const hasActiveOffer = tour.has_offer && tour.offers && tour.offers.length > 0;

                                return (
                                    <tr key={tour.id} className="group border-t border-t-slate-700/30 hover:bg-gradient-to-r hover:from-slate-800/60 hover:to-slate-700/40 transition-all duration-300">
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-4">
                                                <div className="relative">
                                                    {tour.images && tour.images.length > 0 ? (
                                                        <img
                                                            src={tour.images[0].url}
                                                            alt={tour.name}
                                                            className="w-14 h-14 rounded-2xl object-cover border-2 border-green-500/10 group-hover:border-green-400/20 transition-all duration-300 group-hover:scale-110"
                                                        />
                                                    ) : (
                                                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500/30 to-emerald-600/30 border-2 border-green-500/30 group-hover:border-green-400/50 transition-all duration-300 group-hover:scale-110 flex items-center justify-center">
                                                            <BarChart3 size={20} className="text-green-400" />
                                                        </div>
                                                    )}
                                                    {tour.status === 'finished' && (
                                                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                                                            <div className="w-2 h-2 bg-white rounded-full"></div>
                                                        </div>
                                                    )}
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                                </div>
                                                <div>
                                                    <p className="text-white font-semibold text-lg group-hover:text-teal-300 transition-colors duration-300">{tour.name}</p>
                                                    {hasActiveOffer && (
                                                        <p className="text-green-400 text-sm font-medium">
                                                            Had {tour.offers[0].discount}% discount
                                                        </p>
                                                    )}
                                                    <div className="flex items-center gap-1 mt-1">
                                                        <Star size={12} className="text-yellow-400 fill-current" />
                                                        <span className="text-slate-400 text-xs">{tour.rate || 'N/A'} ({tour.reviewer_count})</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="space-y-2">
                                                <div className="flex items-center gap-3">
                                                    <div className="p-2 bg-slate-700/50 rounded-lg">
                                                        <Users size={16} className="text-teal-400" />
                                                    </div>
                                                    <span className="text-white font-semibold text-lg">{soldTickets}</span>
                                                </div>
                                                <div className="text-xs text-slate-400">
                                                    of {tour.tickets_count} capacity
                                                </div>
                                                <div className="text-xs text-green-400">
                                                    Target: {tour.tickets_limit} ✓
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="space-y-2">
                                                <div className="text-slate-300 text-sm">
                                                    <span className="text-slate-400">Basic:</span> ${(parseFloat(tour.basic_cost) * soldTickets).toFixed(2)}
                                                </div>
                                                {parseFloat(tour.extra_cost) > 0 && (
                                                    <div className="text-red-400 text-sm">
                                                        <span className="text-slate-400">Prizes:</span> ${tour.extra_cost}
                                                    </div>
                                                )}
                                                <div className="text-white font-semibold border-t border-slate-600 pt-2">
                                                    Total: ${((parseFloat(tour.basic_cost) * soldTickets) + parseFloat(tour.extra_cost)).toFixed(2)}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="text-white font-bold text-xl">${soldTickets*tour.price}</div>
                                            <div className="text-slate-400 text-xs">total earned</div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="space-y-2">
                                                <div className="flex items-center gap-2">
                                                    <TrendingUp size={16} className={profit >= 0 ? "text-green-400" : "text-red-400"} />
                                                    <span className={`font-semibold ${profit >= 0 ? "text-green-400" : "text-red-400"}`}>
                                                    {margin}%
                                                </span>
                                                </div>
                                                <div className={`text-sm font-medium ${profit >= 0 ? "text-green-400" : "text-red-400"}`}>
                                                    ${profit.toFixed(2)}
                                                </div>
                                                <div className="text-xs text-slate-400">
                                                    {profit >= 0 ? "profit" : "loss"}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="space-y-2">
                                                {tour.reviewer_count > 0 ? (
                                                    <>
                                                        <div className="flex items-center gap-2">
                                                            <Star size={16} className="text-yellow-400 fill-current" />
                                                            <span className="text-white font-semibold">{tour.rate}/5</span>
                                                        </div>
                                                        <div className="text-slate-400 text-xs">
                                                            {tour.reviewer_count} reviews
                                                        </div>
                                                        <div className="text-slate-400 text-xs">
                                                            {tour.stars_count} stars total
                                                        </div>
                                                    </>
                                                ) : (
                                                    <div className="text-slate-400 text-sm">No reviews yet</div>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="space-y-2">
                                                <div className="flex items-center gap-2 text-slate-300">
                                                    <Calendar size={14} className="text-green-400" />
                                                    <span className="text-sm font-medium">{formatDate(tour.ending_date)}</span>
                                                </div>
                                                <div className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                                                    tour.status === 'finished'
                                                        ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                                                        : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                                                }`}>
                                                    {tour.status}
                                                </div>
                                                {parseFloat(tour.extra_cost) > 0 && (
                                                    <div className="flex items-center gap-1">
                                                        <Award size={12} className="text-yellow-400" />
                                                        <span className="text-yellow-400 text-xs">with prizes</span>
                                                    </div>
                                                )}
                                            </div>
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