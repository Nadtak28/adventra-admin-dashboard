
import React, {useEffect, useState} from 'react';
import {
    Search, ChevronDown, Plus, Calendar, DollarSign, Users, TrendingUp,
    MapPin, Clock, Eye, Activity, TicketPercent , Edit3,
    CheckCircle, XCircle, Star, BarChart3,Award,RefreshCw
} from 'lucide-react';
import StateCard from "../../features/all/components/states_card.jsx";
import Header from "../../features/all/components/header.jsx";
import Filters from "../../features/event_group_trip/components/filter.jsx";

import Footer from "../../features/event_group_trip/components/footer.jsx";
import {useNavigate} from "react-router-dom";
import {getIdsService} from "../../features/all/api/getIdsService.jsx";
import {getEv_GTService} from "../../features/event_group_trip/api/getEv_GTService.jsx";
import {useDispatch,useSelector} from "react-redux";

export default function EventGroupTrip() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getIdsService())
        dispatch(getEv_GTService())
    }, []);
    const {events,recentGroupTrips,upcomingGroupTrips,eventsCount,groupsCount,totalRevenue,monthlyRate}=useSelector(state=>state.Events_GTS)
    const navigate = useNavigate();

    // Top Rated Tours for republishing

    return (
        <div className="relative space-y-6 bg-[#0b1520] min-h-screen -m-6 p-6 -mx-6">
            {/* Enhanced background effects */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-teal-900/30 via-slate-800/10 to-transparent"></div>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-slate-800/40 via-transparent to-transparent"></div>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-teal-900/5 to-transparent"></div>

            <div className="layout-container flex h-full grow flex-col relative z-10">
                <div className="gap-1 px-6 flex flex-1 justify-center py-5">
                    <div className="layout-content-container flex flex-col max-w-[1400px] flex-1">

                        {/* Enhanced Header */}
                        <div className="flex flex-wrap justify-between items-center gap-3 p-4 mb-6">
                            <Header title='Tours & Events Dashboard' description="Manage group tours and events efficiently" />
                        </div>

                        {/* Enhanced Stats Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 px-4">
                            <StateCard name='Total Tours' value={groupsCount}>
                                <Calendar size={20} className="text-teal-400" />
                            </StateCard>

                            <StateCard name='Total Events' value={eventsCount}>
                                <Activity size={20} className="text-teal-400" />
                            </StateCard>

                            <StateCard name='Total Revenue' value={`$${Math.round(totalRevenue).toLocaleString()}`}>
                                <DollarSign size={20} className="text-teal-400" />
                            </StateCard>

                            <StateCard name='Avg Rating' value={monthlyRate.toFixed(1)}>
                                <Star size={20} className="text-teal-400" />
                            </StateCard>
                        </div>

                        <Filters/>

                        {/* NEW: Top Rated Tours for Republishing - Cards Layout */}
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
                                <button className="text-teal-400 hover:text-teal-300 transition-colors text-sm font-semibold flex items-center gap-2 px-4 py-2 bg-slate-800/60 rounded-xl hover:bg-slate-700/60">
                                    View All
                                    <ChevronDown size={16} className="rotate-[-90deg]" />
                                </button>
                            </div>

                            <div className="px-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                    {recentGroupTrips.map((tour) => (
                                        <div key={tour.id} className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800/60 to-slate-900/80 backdrop-blur-sm border border-slate-700/50 shadow-2xl transition-all duration-300 hover:shadow-amber-500/20 hover:scale-105">
                                            {/* Card Image */}
                                            <div className="relative h-48 overflow-hidden">
                                                <img
                                                    src={tour.images?.[0]?.url}
                                                    alt={tour.name}
                                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                                                {/* Rating Badge */}
                                                <div className="absolute top-4 left-4 flex items-center gap-1 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full">
                                                    <Star size={14} className="text-amber-400 fill-current" />
                                                    <span className="text-white text-sm font-semibold">{tour.rate}</span>
                                                </div>

                                                {/* OFFER Badge */}
                                                {tour.has_offer && (
                                                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-orange-500/20 text-orange-400 border border-orange-500/30">
                                                        OFFER
                                                    </span>
                                                )}
                                            </div>

                                            {/* Card Content */}
                                            <div className="p-6 space-y-4">
                                                <div>
                                                    <h3 className="text-white text-lg font-bold mb-2 group-hover:text-teal-300 transition-colors duration-300">
                                                        {tour.name}
                                                    </h3>
                                                    <div className="flex items-center justify-between text-sm text-slate-400">
                                                        <span>Last Active: {tour.lastActive}</span>
                                                        <span>{tour.completedTours} Tours</span>
                                                    </div>
                                                </div>

                                                {/* Stats */}
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div className="text-center">
                                                        <div className="text-white text-xl font-bold">{tour.totalBookings}</div>
                                                        <div className="text-slate-400 text-xs">Total Bookings</div>
                                                    </div>
                                                    <div className="text-center">
                                                        <div className="text-green-400 text-xl font-bold">{tour.revenue}</div>
                                                        <div className="text-slate-400 text-xs">Total Revenue</div>
                                                    </div>
                                                </div>

                                                {/* Price and Group Size */}
                                                <div className="flex items-center justify-between py-2 border-t border-slate-700/50">
                                                    <div className="text-center">
                                                        <div className="text-white text-lg font-semibold">{tour.originalPrice}</div>
                                                        <div className="text-slate-400 text-xs">Price per Person</div>
                                                    </div>
                                                    <div className="text-center">
                                                        <div className="text-teal-400 text-lg font-semibold">{tour.avgGroupSize}</div>
                                                        <div className="text-slate-400 text-xs">Avg Group Size</div>
                                                    </div>
                                                </div>

                                                {/* Action Button */}
                                                <button className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-amber-600 to-orange-700 hover:from-amber-500 hover:to-orange-600 text-white py-3 px-4 rounded-xl font-semibold transition-all duration-300 hover:scale-125 shadow-lg hover:shadow-amber-500/25">
                                                    <RefreshCw size={16} className="group-hover:rotate-180 transition-transform duration-500" />
                                                    Republish Tour
                                                </button>
                                            </div>

                                            {/* Hover Glow Effect */}
                                            <div className="absolute -inset-1 bg-gradient-to-r from-amber-400/20 to-orange-600/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>


                        {/* Enhanced Upcoming Group Tours - WITH IMAGES */}
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
                                <button className="text-teal-400 hover:text-teal-300 transition-colors text-sm font-semibold flex items-center gap-2 px-4 py-2 bg-slate-800/60 rounded-xl hover:bg-slate-700/60">
                                    View All
                                    <ChevronDown size={16} className="rotate-[-90deg]" />
                                </button>
                            </div>

                            <div className="px-4">
                                <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800/60 to-slate-900/80 backdrop-blur-sm border border-slate-700/50 shadow-2xl">
                                    <div className="overflow-x-auto">
                                        <table className="w-full min-w-[900px]">
                                            <thead>
                                            <tr className="bg-gradient-to-r from-slate-800/80 to-slate-700/80 border-b border-slate-600/30">
                                                <th className="px-6 py-4 text-left text-white text-sm font-semibold">Tour Details</th>
                                                <th className="px-6 py-4 text-left text-white text-sm font-semibold">Date & Duration</th>
                                                <th className="px-6 py-4 text-left text-white text-sm font-semibold">Bookings</th>
                                                <th className="px-6 py-4 text-left text-white text-sm font-semibold">Guide</th>
                                                <th className="px-6 py-4 text-left text-white text-sm font-semibold">Price</th>
                                                <th className="px-6 py-4 text-left text-white text-sm font-semibold">Actions</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {upcomingGroupTrips.map((tour) => (
                                                <tr key={tour.id} className="group border-t border-t-slate-700/30 hover:bg-gradient-to-r hover:from-slate-800/60 hover:to-slate-700/40 transition-all duration-300">
                                                    <td className="px-6 py-5">
                                                        <div className="flex items-center gap-4">
                                                            <div className="relative">
                                                                <img
                                                                    src={tour.image}
                                                                    alt={tour.name}
                                                                    className="w-14 h-14 rounded-2xl object-cover border-2 border-teal-500/30 group-hover:border-teal-400/50 transition-all duration-300 group-hover:scale-110"
                                                                />
                                                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                                            </div>
                                                            <div>
                                                                <p className="text-white font-semibold text-lg group-hover:text-teal-300 transition-colors duration-300">{tour.name}</p>
                                                                {tour.discount && <p className="text-teal-400 text-sm font-medium">{tour.discount}</p>}
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-5">
                                                        <div className="space-y-2">
                                                            <div className="flex items-center gap-2 text-slate-300">
                                                                <Calendar size={14} className="text-teal-400" />
                                                                <span className="text-sm font-medium">{tour.date}</span>
                                                            </div>
                                                            <div className="flex items-center gap-2 text-slate-300">
                                                                <Clock size={14} className="text-teal-400" />
                                                                <span className="text-sm font-medium">{tour.duration}</span>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-5">
                                                        <div className="space-y-2">
                                                            <div className="mb-2">
                                                                <span className="text-white font-semibold text-lg">{tour.bookings}</span>
                                                            </div>
                                                            <div className="w-full bg-slate-700/50 rounded-full h-2">
                                                                <div
                                                                    className="bg-gradient-to-r from-teal-500 to-teal-400 h-2 rounded-full transition-all duration-500"
                                                                    style={{ width: `${tour.bookedPercentage}%` }}
                                                                ></div>
                                                            </div>
                                                            <span className="text-xs text-slate-400 font-medium">{tour.bookedPercentage}% full</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-5">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-10 h-10 bg-gradient-to-r from-slate-700/80 to-slate-800/80 rounded-full flex items-center justify-center">
                                                                <Users size={16} className="text-teal-400" />
                                                            </div>
                                                            <span className="text-slate-300 text-sm font-medium">{tour.guide.name}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-5">
                                                        <span className="text-white font-bold text-xl">{tour.price}</span>
                                                    </td>
                                                    <td className="px-6 py-5">
                                                        <div className="flex items-center gap-3">
                                                            <button className="group/btn p-3 bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 hover:border-teal-500/50 text-slate-400 hover:text-teal-300 rounded-xl hover:bg-slate-700/60 transition-all duration-300 hover:scale-110">
                                                                <Eye size={16} className="group-hover/btn:scale-110 transition-transform duration-300" />
                                                            </button>
                                                            <button className="group/btn p-3 bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 hover:border-teal-500/50 text-slate-400 hover:text-teal-300 rounded-xl hover:bg-slate-700/60 transition-all duration-300 hover:scale-110">
                                                                <Edit3 size={16} className="group-hover/btn:rotate-12 transition-transform duration-300" />
                                                            </button>
                                                            <button className="group/btn p-3 bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 hover:border-teal-500/50 text-slate-400 hover:text-teal-300 rounded-xl hover:bg-slate-700/60 transition-all duration-300 hover:scale-110">
                                                                <TicketPercent  size={16} />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Enhanced Recent Tours Performance */}
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
                                <button className="text-teal-400 hover:text-teal-300 transition-colors text-sm font-semibold flex items-center gap-2 px-4 py-2 bg-slate-800/60 rounded-xl hover:bg-slate-700/60">
                                    View Details
                                    <ChevronDown size={16} className="rotate-[-90deg]" />
                                </button>
                            </div>

                            <div className="px-4">
                                <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800/60 to-slate-900/80 backdrop-blur-sm border border-slate-700/50 shadow-2xl">
                                    <div className="overflow-x-auto">
                                        <table className="w-full min-w-[1000px]">
                                            <thead>
                                            <tr className="bg-gradient-to-r from-slate-800/80 to-slate-700/80 border-b border-slate-600/30">
                                                <th className="px-6 py-4 text-left text-white text-sm font-semibold">Tour Name</th>
                                                <th className="px-6 py-4 text-left text-white text-sm font-semibold">Participants</th>
                                                <th className="px-6 py-4 text-left text-white text-sm font-semibold">Company Cost</th>
                                                <th className="px-6 py-4 text-left text-white text-sm font-semibold">Revenue</th>
                                                <th className="px-6 py-4 text-left text-white text-sm font-semibold">Profit Margin</th>
                                                <th className="px-6 py-4 text-left text-white text-sm font-semibold">Rating</th>
                                                <th className="px-6 py-4 text-left text-white text-sm font-semibold">End Date</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {recentGroupTrips.map((tour, index) => (
                                                <tr key={tour.id} className="group border-t border-t-slate-700/30 hover:bg-gradient-to-r hover:from-slate-800/60 hover:to-slate-700/40 transition-all duration-300">
                                                    <td className="px-6 py-5">
                                                        <div className="flex items-center gap-4">
                                                            <div className="relative">
                                                                <img
                                                                    src={tour.image}
                                                                    alt={tour.name}
                                                                    className="w-14 h-14 rounded-2xl object-cover border-2 border-green-500/10 group-hover:border-green-400/20 transition-all duration-300 group-hover:scale-110"
                                                                />
                                                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                                            </div>
                                                            <div>
                                                                <p className="text-white font-semibold text-lg group-hover:text-teal-300 transition-colors duration-300">{tour.name}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-5">
                                                        <div className="flex items-center gap-3">
                                                            <div className="p-2 bg-slate-700/50 rounded-lg">
                                                                <Users size={16} className="text-teal-400" />
                                                            </div>
                                                            <span className="text-slate-300 font-medium">{tour.participants}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-5 text-slate-300 font-medium">{tour.companyCost}</td>
                                                    <td className="px-6 py-5 text-white font-semibold text-lg">{tour.revenue}</td>
                                                    <td className="px-6 py-5">
                                                        <div className="flex items-center gap-2">
                                                            <TrendingUp size={16} className="text-green-400" />
                                                            <span className="text-green-400 font-semibold">{tour.profitMargin}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-5">
                                                        <div className="flex items-center gap-2">
                                                            <Star size={16} className="text-yellow-400 fill-current" />
                                                            <span className="text-white font-semibold">{tour.rating}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-5 text-slate-300 font-medium">{tour.endDate}</td>
                                                </tr>
                                            ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>


                        {/* Enhanced Events - WITH IMAGES */}
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
                                <button className="text-teal-400 hover:text-teal-300 transition-colors text-sm font-semibold flex items-center gap-2 px-4 py-2 bg-slate-800/60 rounded-xl hover:bg-slate-700/60">
                                    Manage All
                                    <ChevronDown size={16} className="rotate-[-90deg]" />
                                </button>
                            </div>

                            <div className="px-4">
                                <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800/60 to-slate-900/80 backdrop-blur-sm border border-slate-700/50 shadow-2xl">
                                    <div className="overflow-x-auto">
                                        <table className="w-full min-w-[1000px]">
                                            <thead>
                                            <tr className="bg-gradient-to-r from-slate-800/80 to-slate-700/80 border-b border-slate-600/30">
                                                <th className="px-6 py-4 text-left text-white text-sm font-semibold">Event Details</th>
                                                <th className="px-6 py-4 text-left text-white text-sm font-semibold">Registration</th>
                                                <th className="px-6 py-4 text-left text-white text-sm font-semibold">Pricing</th>
                                                <th className="px-6 py-4 text-left text-white text-sm font-semibold">Profit</th>
                                                <th className="px-6 py-4 text-left text-white text-sm font-semibold">Rate</th>
                                                <th className="px-6 py-4 text-left text-white text-sm font-semibold">Status</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {events.map((event) => (
                                                <tr key={event.id} className="group border-t border-t-slate-700/30 hover:bg-gradient-to-r hover:from-slate-800/60 hover:to-slate-700/40 transition-all duration-300">
                                                    <td className="px-6 py-5">
                                                        <div className="flex items-center gap-4">
                                                            <div className="relative">
                                                                <img
                                                                    src={event.images?.[0]?.url}
                                                                    alt={event.name}
                                                                    className="w-14 h-14 rounded-2xl object-cover border-2 border-purple-500/30 group-hover:border-purple-400/50 transition-all duration-300 group-hover:scale-110"
                                                                />
                                                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                                            </div>
                                                            <div>
                                                                <p className="text-white font-semibold text-lg group-hover:text-teal-300 transition-colors duration-300">{event.name}</p>
                                                                <span className="inline-block px-3 py-1 bg-gradient-to-r from-teal-600/20 to-teal-700/20 text-teal-300 text-xs rounded-full mt-2 border border-teal-500/20">
                                                                    {event.description}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-5">
                                                        <div className="space-y-2">
                                                            <div className="mb-2">
                                                                <span className="text-white font-semibold text-lg">edit later</span>
                                                            </div>
                                                            <div className="w-full bg-slate-700/50 rounded-full h-2">
                                                                <div
                                                                    className="bg-gradient-to-r from-teal-500 to-teal-400 h-2 rounded-full transition-all duration-500"
                                                                    style={{ width: `${(event.registered / event.capacity) * 100}%` }}
                                                                ></div>
                                                            </div>
                                                            <span className="text-xs text-slate-400 font-medium">
                                                                {Math.round((event.registered / event.capacity) * 100)}% filled
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-5">
                                                        <div>
                                                            <p className="text-white font-semibold text-lg">{event.price}</p>
                                                            <p className="text-slate-400 text-sm">Cost: {event.basic_cost}</p>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-5">
                                                        <span className="text-green-400 font-semibold text-lg">{event.profit}</span>
                                                    </td>
                                                    <td className="px-6 py-5 text-slate-300 font-medium">{event.rate}⭐</td>
                                                    <td className="px-6 py-5">
                                                        <button className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-sm font-semibold transition-all duration-300 shadow-lg ${
                                                            event.status === 'active'
                                                                ? 'bg-gradient-to-r from-green-600/20 to-emerald-600/20 text-green-400 border border-green-500/30 hover:from-green-500/30 hover:to-emerald-500/30 hover:scale-105'
                                                                : 'bg-gradient-to-r from-red-600/20 to-pink-600/20 text-red-400 border border-red-500/30 hover:from-red-500/30 hover:to-pink-500/30 hover:scale-105'
                                                        }`}>
                                                            {event.status === 'active' ? (
                                                                <CheckCircle size={14} />
                                                            ) : (
                                                                <XCircle size={14} />
                                                            )}
                                                            {event.status}
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Enhanced Action Buttons */}
                        <div className="flex justify-center gap-6 px-4 py-8">
                            <button className="group flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-500 hover:to-teal-600 text-white rounded-2xl font-bold text-lg shadow-xl shadow-teal-500/25 hover:shadow-teal-500/40 transition-all duration-300 hover:scale-105"
                                    onClick={()=>navigate("/dashboard/event_grouptrip/add_group_trip")}>
                                <Plus size={20} className="group-hover:rotate-90 transition-transform duration-300" />
                                Create New Tour
                            </button>
                            <button className="group flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-purple-500 hover:to-indigo-600 text-white rounded-2xl font-bold text-lg shadow-xl shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300 hover:scale-105"
                                    onClick={()=>navigate("/dashboard/event_grouptrip/add_event")}>
                                <Plus size={20} className="group-hover:rotate-90 transition-transform duration-300" />
                                Create New Event
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}