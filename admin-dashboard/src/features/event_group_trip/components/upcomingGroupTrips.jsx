import {Calendar, ChevronDown, Clock, Edit3, Eye, TicketPercent, Users, Star, Award, Loader2} from "lucide-react";
import React from "react";

export default function soldTicketsUpcomingGroupTrips({upcomingGroupTrips,isLoading,viewUpcomingGroupTrips}){
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    const formatDuration = (startDate, endDate) => {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const diffTime = Math.abs(end - start);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return `${diffDays} days`;
    };

    const getBookingProgress = (ticketsCount, remainingTickets) => {
        const soldTickets = ticketsCount - remainingTickets;
        return Math.round((soldTickets / ticketsCount) * 100);
    };

    return(
        <div className="mb-8">
            <div className="flex items-center justify-between mb-6 px-4">
                <div className="flex items-center gap-3">
                    <div className="p-3 rounded-xl bg-gradient-to-r from-teal-500/20 to-slate-600/20">
                        <Calendar size={20} className="text-teal-400" />
                    </div>
                    <h2 className="text-white text-2xl font-bold leading-tight">
                        Upcoming Group Tours
                    </h2>
                </div>
                <button onClick={()=>{viewUpcomingGroupTrips()}}
                    className="text-teal-400 hover:text-teal-300 transition-colors text-sm font-semibold flex items-center gap-2 px-4 py-2 bg-slate-800/60 rounded-xl hover:bg-slate-700/60">
                    View All
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
                        <table className="w-full min-w-[1000px]">
                            <thead>
                            <tr className="bg-gradient-to-r from-slate-800/80 to-slate-700/80 border-b border-slate-600/30">
                                <th className="px-6 py-4 text-left text-white text-sm font-semibold">Tour Details</th>
                                <th className="px-6 py-4 text-left text-white text-sm font-semibold">Date & Duration</th>
                                <th className="px-6 py-4 text-left text-white text-sm font-semibold">Tickets Status</th>
                                <th className="px-6 py-4 text-left text-white text-sm font-semibold">Guide & Rating</th>
                                <th className="px-6 py-4 text-left text-white text-sm font-semibold">Pricing</th>
                                <th className="px-6 py-4 text-left text-white text-sm font-semibold">Revenue</th>
                                <th className="px-6 py-4 text-left text-white text-sm font-semibold">Offer</th>
                            </tr>
                            </thead>
                            <tbody>
                            {upcomingGroupTrips.map((tour) => {
                                const bookingProgress = getBookingProgress(tour.tickets_count, tour.remaining_tickets);
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
                                                            className="w-14 h-14 rounded-2xl object-cover border-2 border-teal-500/30 group-hover:border-teal-400/50 transition-all duration-300 group-hover:scale-110"
                                                        />
                                                    ) : (
                                                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-500/30 to-slate-600/30 border-2 border-teal-500/30 group-hover:border-teal-400/50 transition-all duration-300 group-hover:scale-110 flex items-center justify-center">
                                                            <Calendar size={20} className="text-teal-400" />
                                                        </div>
                                                    )}
                                                    {hasActiveOffer && (
                                                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                                                            <TicketPercent size={10} className="text-white" />
                                                        </div>
                                                    )}
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                                </div>
                                                <div>
                                                    <p className="text-white font-semibold text-lg group-hover:text-teal-300 transition-colors duration-300">{tour.name}</p>
                                                    {hasActiveOffer && (
                                                        <p className="text-red-400 text-sm font-medium">
                                                            {tour.offers[0].discount}% OFF
                                                        </p>
                                                    )}
                                                    <div className="flex items-center gap-1 mt-1">
                                                        <Star size={12} className="text-yellow-400 fill-current" />
                                                        <span className="text-slate-400 text-xs">{tour.rate} ({tour.reviewer_count})</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="space-y-2">
                                                <div className="flex items-center gap-2 text-slate-300">
                                                    <Calendar size={14} className="text-teal-400" />
                                                    <span className="text-sm font-medium">{formatDate(tour.starting_date)}</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-slate-300">
                                                    <Clock size={14} className="text-teal-400" />
                                                    <span className="text-sm font-medium">{formatDuration(tour.starting_date, tour.ending_date)}</span>
                                                </div>
                                                <div className="text-xs text-slate-400">
                                                    Status: <span className={`font-medium ${tour.status === 'confirmed' ? 'text-green-400' : tour.status === 'pending' ? 'text-yellow-400' : 'text-red-400'}`}>
                                                    {tour.status}
                                                </span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="space-y-2">
                                                <div className="flex justify-between text-sm">
                                                    <span className="text-white font-semibold">{tour.tickets_count - tour.remaining_tickets}/{tour.tickets_count}</span>
                                                    <span className="text-slate-400">sold</span>
                                                </div>
                                                <div className="w-full bg-slate-700/50 rounded-full h-2">
                                                    <div
                                                        className="bg-gradient-to-r from-teal-500 to-teal-400 h-2 rounded-full transition-all duration-500"
                                                        style={{ width: `${bookingProgress}%` }}
                                                    ></div>
                                                </div>
                                                <div className="flex justify-between text-xs">
                                                    <span className="text-slate-400">{tour.remaining_tickets} remaining</span>
                                                    <span className="text-teal-400 font-medium">{bookingProgress}% sold</span>
                                                </div>
                                                <div className="text-xs text-slate-500">
                                                    Target: {tour.tickets_limit} min
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-3">
                                                {tour.guide.images && tour.guide.images.length > 0 ? (
                                                    <img
                                                        src={tour.guide.images[0].url}
                                                        alt={tour.guide.name}
                                                        className="w-10 h-10 rounded-full object-cover border-2 border-teal-500/30"
                                                    />
                                                ) : (
                                                    <div className="w-10 h-10 bg-gradient-to-r from-slate-700/80 to-slate-800/80 rounded-full flex items-center justify-center">
                                                        <Users size={16} className="text-teal-400" />
                                                    </div>
                                                )}
                                                <div>
                                                    <div className="text-slate-300 text-sm font-medium">{tour.guide.name}</div>
                                                    <div className="text-slate-500 text-xs">{tour.guide.phone}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="space-y-1">
                                                {hasActiveOffer ? (
                                                    <>
                                                        <div className="text-slate-400 text-sm line-through">${tour.main_price}</div>
                                                        <div className="text-white font-bold text-xl">${tour.price}</div>
                                                        <div className="text-green-400 text-xs font-medium">
                                                            Save ${(parseFloat(tour.main_price) - tour.price).toFixed(2)}
                                                        </div>
                                                    </>
                                                ) : (
                                                    <div className="text-white font-bold text-xl">${tour.price}</div>
                                                )}
                                                <div className="text-slate-500 text-xs">
                                                    Basic cost per person: ${tour.basic_cost}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="text-center">
                                                <div className="text-white font-bold text-lg">${Math.round((tour.tickets_count-tour.remaining_tickets)*tour.price)}</div>
                                                <div className="text-slate-400 text-xs">total earned</div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-2">
                                                <button className="group/btn p-2.5 bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 hover:border-teal-500/50 text-slate-400 hover:text-teal-300 rounded-xl hover:bg-slate-700/60 transition-all duration-300 hover:scale-110">
                                                    <Eye size={14} className="group-hover/btn:scale-110 transition-transform duration-300" />
                                                </button>
                                                <button
                                                    disabled={!tour.has_offer}
                                                    className="
                                                            group/btn p-2.5 backdrop-blur-sm border rounded-xl transition-all duration-300

                                                            // Default (Enabled) styles
                                                            bg-slate-800/60 border-slate-700/50 text-slate-400 hover:border-teal-500/50 hover:text-teal-300 hover:bg-slate-700/60 hover:scale-110

                                                            // Disabled styles
                                                            disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:bg-slate-800/60 disabled:hover:border-slate-700/50 disabled:hover:text-slate-400">
                                                    <Edit3 size={14} className="group-hover/btn:rotate-12 transition-transform duration-300" />
                                                </button>
                                                <button
                                                    disabled={tour.has_offer}
                                                    className="
                                                            group/btn p-2.5 backdrop-blur-sm border rounded-xl transition-all duration-300

                                                            // Default Styles (when enabled)
                                                            bg-slate-800/60 border-slate-700/50 text-slate-400
                                                            hover:border-teal-500/50 hover:text-teal-300 hover:bg-slate-700/60 hover:scale-110

                                                            // Disabled Styles
                                                            disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
                                                            disabled:hover:bg-slate-800/60 disabled:hover:border-slate-700/50
                                                            disabled:hover:text-slate-400">
                                                    <TicketPercent size={14} />
                                                </button>
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