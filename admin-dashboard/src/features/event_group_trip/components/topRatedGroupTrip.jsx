import {Award, ChevronDown, RefreshCw, Star} from "lucide-react";
import React from "react";
import {useDispatch} from "react-redux";
import {filterService} from "../../all/api/filterService.jsx";

export default  function TopRatedGroupTrip ({topRatedGroupTrips,viewMoreTopRatedTours}){
    const dispatch = useDispatch();

    return(
    <div className="mb-8">
        <div className="flex items-center justify-between mb-6 px-4">
            <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-gradient-to-r from-amber-500/20 to-orange-600/20">
                    <Award size={20} className="text-amber-400" />
                </div>
                <h2 className="text-white text-2xl font-bold leading-tight">
                    Top Rated Tours - Ready for Republishing
                </h2>
            </div>
            <button onClick={()=>{
                viewMoreTopRatedTours()
            }}
                className="text-teal-400 hover:text-teal-300 transition-colors text-sm font-semibold flex items-center gap-2 px-4 py-2 bg-slate-800/60 rounded-xl hover:bg-slate-700/60">
                View All
                <ChevronDown size={16} className="rotate-[-90deg]" />
            </button>
        </div>

        <div className="px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {topRatedGroupTrips.map((tour) => (
                    <div key={tour.id} className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800/60 to-slate-900/80 backdrop-blur-sm border border-slate-700/50 shadow-2xl transition-all duration-300 hover:shadow-teal-500/20 hover:scale-105">
                        {/* Card Image */}
                        <div className="relative h-48 overflow-hidden">
                            <img
                                src={tour.images?.[0]?.url || '/placeholder-tour.jpg'}
                                alt={tour.name}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                            {/* Rating Badge */}
                            <div className="absolute top-4 left-4 flex items-center gap-1 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full">
                                <Star size={14} className="text-amber-400 fill-current" />
                                <span className="text-white text-sm font-semibold">{tour.rate}</span>
                            </div>

                            {/* OFFER Badge - فقط إذا كان هناك عرض */}
                            {tour.has_offer && tour.offers?.length > 0 && (
                                <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-red-500/20 text-red-400 border border-red-500/30">
                        {Math.round(tour.offers[0].discount)}% OFF
                    </span>
                                </div>
                            )}

                            {/* Status Badge */}
                            <div className="absolute bottom-4 left-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    tour.status === 'finished'
                        ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                        : 'bg-green-500/20 text-green-400 border border-green-500/30'
                }`}>
                    {tour.status === 'finished' ? 'FINISHED' : tour.status.toUpperCase()}
                </span>
                            </div>
                        </div>

                        {/* Card Content */}
                        <div className="p-6 space-y-4">
                            <div>
                                <h3 className="text-white text-lg font-bold mb-2 group-hover:text-teal-300 transition-colors duration-300">
                                    {tour.name}
                                </h3>
                                <div className="flex items-center justify-between text-sm text-slate-400 mb-3">
                                    <span>Last Active:</span>
                                    <span className="backdrop-blur-2xl border border-slate-700/30 rounded-xl px-3 py-1">
                        {new Date(tour.ending_date).toLocaleDateString()}
                    </span>
                                    <span>{tour.reviewer_count > 0 ? `${tour.reviewer_count} Reviews` : 'No Reviews'}</span>
                                </div>

                                {/* Guide Info */}
                                <div className="flex items-center gap-2 text-sm text-slate-300 mb-2">
                                    <span className="text-slate-400">Guide:</span>
                                    <span className="text-teal-400 font-medium">{tour.guide?.name || 'N/A'}</span>
                                </div>
                            </div>

                            {/* Stats Grid */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="text-center p-3 bg-slate-800/40 rounded-lg border border-slate-700/30">
                                    <div className="text-white text-xl font-bold">{tour.tickets_count - tour.remaining_tickets}</div>
                                    <div className="text-slate-400 text-xs">Tickets Sold</div>
                                </div>
                                <div className="text-center p-3 bg-slate-800/40 rounded-lg border border-slate-700/30">
                                    <div className="text-emerald-400 text-xl font-bold">${tour.revenue}</div>
                                    <div className="text-slate-400 text-xs">Total Revenue</div>
                                </div>
                            </div>

                            {/* Additional Stats */}
                            <div className="grid grid-cols-3 gap-3">
                                <div className="text-center p-2 bg-slate-800/20 rounded-lg">
                                    <div className="text-orange-400 text-lg font-semibold">{tour.remaining_tickets}</div>
                                    <div className="text-slate-400 text-xs">Remained</div>
                                </div>
                                <div className="text-center p-2 bg-slate-800/20 rounded-lg">
                                    <div className="text-cyan-400 text-lg font-semibold">{tour.tickets_count}</div>
                                    <div className="text-slate-400 text-xs">Max Capacity</div>
                                </div>
                                <div className="text-center p-2 bg-slate-800/20 rounded-lg">
                                    <div className="text-purple-400 text-lg font-semibold">{tour.tickets_limit}</div>
                                    <div className="text-slate-400 text-xs">Min Target</div>
                                </div>
                            </div>

                            {/* Price Section */}
                            <div className="py-3 border-t border-slate-700/50 space-y-3">
                                {/* Current Price Display */}
                                <div className="flex items-center justify-center gap-3">
                                    {tour.has_offer && tour.main_price ? (
                                        <>
                                            <div className="text-center">
                                                <div className="text-slate-400 text-sm line-through">${tour.main_price}</div>
                                                <div className="text-slate-400 text-xs">Original</div>
                                            </div>
                                            <div className="text-center">
                                                <div className="text-emerald-400 text-xl font-bold">${tour.price}</div>
                                                <div className="text-slate-400 text-xs">Offer Price</div>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="text-center">
                                            <div className="text-white text-xl font-bold">${tour.price}</div>
                                            <div className="text-slate-400 text-xs">Price per Person</div>
                                        </div>
                                    )}
                                </div>

                                {/* Cost Breakdown */}
                                <div className="flex items-center justify-between text-sm bg-slate-800/30 rounded-lg p-3">
                                    <div className="text-center">
                                        <span className="text-slate-400">Basic Cost: </span>
                                        <span className="text-green-400 font-semibold">${tour.basic_cost}</span>
                                    </div>
                                    <div className="text-center">
                                        <span className="text-slate-400">Extra Rewards: </span>
                                        <span className="text-blue-400 font-semibold">${tour.extra_cost}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Tour Duration */}
                            <div className="flex items-center justify-between text-sm bg-slate-800/30 rounded-lg p-3">
                                <div>
                                    <span className="text-slate-400">Start: </span>
                                    <span className="text-white">{new Date(tour.starting_date).toLocaleDateString()}</span>
                                </div>
                                <div>
                                    <span className="text-slate-400">End: </span>
                                    <span className="text-white">{new Date(tour.ending_date).toLocaleDateString()}</span>
                                </div>
                            </div>

                            {/* Action Button */}
                            <button className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-teal-600 to-cyan-700 hover:from-teal-500 hover:to-cyan-600 text-white py-3 px-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-teal-500/25">
                                <RefreshCw size={16} className="group-hover:rotate-180 transition-transform duration-500" />
                                Republish Tour
                            </button>
                        </div>

                        {/* Hover Glow Effect */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-teal-400/20 to-cyan-600/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
                    </div>
                ))}
            </div>
        </div>
    </div>
    )
}