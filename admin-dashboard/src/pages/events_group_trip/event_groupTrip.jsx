
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
import {useDispatch} from "react-redux";

export default function EventGroupTrip() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getIdsService())
    }, []);

    const navigate = useNavigate();
    const upcomingTours = [
        {
            id: 1,
            name: "City Exploration Walk",
            date: "2024-08-15",
            bookings: "15/30",
            bookedPercentage: 50,
            discount: "Apply 10% Discount",
            price: "$75",
            status: "active",
            duration: "3 hours",
            guide: "ابو الفدا جونسون",
            image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop&crop=center"
        },
        {
            id: 2,
            name: "Historical Sites Visit",
            date: "2024-08-20",
            bookings: "8/25",
            bookedPercentage: 32,
            discount: "Apply 15% Discount",
            price: "$95",
            status: "active",
            duration: "5 hours",
            guide: "افهد السامرائي",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBpjX3DAmirzfQZ2Dk7kyV1E4spOYTMTepPS9pE8nkd6dYJRB_SMaiczUbUVZG0kyN7rhfZS9FuMUGpmBucaR1yy_9KVLWexCCykosHeWP3cdCObSHXQvBMZHBsRnNHOYybLR-72Rs65l6r6Xb9ZyQ_53AKPf7racKtbb7hcQxBO4xBUV4rUpcniVgDNuJK3j59QQJWYPTRFPJ2hB5RvsmoMB54yQl1Ai4PT_4LiqXjN9YQ8gFv9RNFuD2f6nwlHNRfq_8SGzu5WZw"
        }
    ];

    const recentTours = [
        {
            id: 1,
            name: "Mountain Hiking Adventure",
            companyCost: "$5,000",
            profitMargin: "20%",
            perPersonPrice: "$250",
            endDate: "2024-07-20",
            participants: 24,
            rating: 4.8,
            revenue: "$6,000",
            image: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071" // صورة جبال ومغامرة
        },
        {
            id: 2,
            name: "Coastal Bike Tour",
            companyCost: "$3,000",
            profitMargin: "25%",
            perPersonPrice: "$150",
            endDate: "2024-07-15",
            participants: 18,
            rating: 4.6,
            revenue: "$3,750",
            image: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071" // صورة دراجات على الساحل
        },
        {
            id: 3,
            name: "Wine Tasting Experience",
            companyCost: "$2,000",
            profitMargin: "30%",
            perPersonPrice: "$100",
            endDate: "2024-07-10",
            participants: 16,
            rating: 4.9,
            revenue: "$2,600",
            image: "https://images.unsplash.com/photo-1510626176961-4b57d4fbad03" // صورة تذوق نبيذ
        },
        {
            id: 4,
            name: "City Exploration Walk",
            companyCost: "$1,500",
            profitMargin: "35%",
            perPersonPrice: "$75",
            endDate: "2024-07-05",
            participants: 22,
            rating: 4.7,
            revenue: "$2,025",
            image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b" // صورة جولة في المدينة
        },
        {
            id: 5,
            name: "Historical Sites Visit",
            companyCost: "$1,000",
            profitMargin: "40%",
            perPersonPrice: "$50",
            endDate: "2024-07-01",
            participants: 20,
            rating: 4.5,
            revenue: "$1,400",
            image: "https://images.unsplash.com/photo-1506354666786-959d6d497f1a" // صورة مواقع تاريخية
        }
    ];

    const events = [
        {
            id: 1,
            name: "Summer Music Festival",
            perPersonPrice: "$100",
            companyCost: "$50",
            profit: "$50",
            status: "Enabled",
            capacity: 500,
            registered: 342,
            date: "2024-08-25",
            category: "Music",
            image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&h=300&fit=crop&crop=center"
        },
        {
            id: 2,
            name: "Food & Wine Expo",
            perPersonPrice: "$75",
            companyCost: "$40",
            profit: "$35",
            status: "Enabled",
            capacity: 300,
            registered: 156,
            date: "2024-08-30",
            category: "Food",
            image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop&crop=center"
        },
        {
            id: 3,
            name: "Art & Culture Fair",
            perPersonPrice: "$50",
            companyCost: "$25",
            profit: "$25",
            status: "Disabled",
            capacity: 200,
            registered: 45,
            date: "2024-09-05",
            category: "Culture",
            image: "https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=400&h=300&fit=crop&crop=center"
        },
        {
            id: 4,
            name: "Tech Conference",
            perPersonPrice: "$200",
            companyCost: "$100",
            profit: "$100",
            status: "Enabled",
            capacity: 150,
            registered: 127,
            date: "2024-09-10",
            category: "Technology",
            image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop&crop=center"
        },
        {
            id: 5,
            name: "Sports Tournament",
            perPersonPrice: "$150",
            companyCost: "$75",
            profit: "$75",
            status: "Disabled",
            capacity: 100,
            registered: 23,
            date: "2024-09-15",
            category: "Sports",
            image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400&h=300&fit=crop&crop=center"
        }
    ];

    // Top Rated Tours for republishing
    const topRatedTours = [
        {
            id: 1,
            name: "Desert Safari Adventure",
            rating: 4.9,
            totalBookings: 156,
            revenue: "$15,600",
            image: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=400&h=300&fit=crop&crop=center",
            originalPrice: "$120",
            category: "Adventure",
            completedTours: 12,
            avgGroupSize: 13,
            lastActive: "2024-07-28"
        },
        {
            id: 2,
            name: "Cultural Heritage Walk",
            rating: 4.8,
            totalBookings: 142,
            revenue: "$12,780",
            image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop&crop=center",
            originalPrice: "$90",
            category: "Culture",
            completedTours: 9,
            avgGroupSize: 16,
            lastActive: "2024-07-25"
        },
        {
            id: 3,
            name: "Mountain Peak Expedition",
            rating: 4.8,
            totalBookings: 124,
            revenue: "$18,600",
            image: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=400&h=300&fit=crop&crop=center",
            originalPrice: "$150",
            category: "Adventure",
            completedTours: 8,
            avgGroupSize: 15,
            lastActive: "2024-07-22"
        },
        {
            id: 4,
            name: "Sunset Photography Tour",
            rating: 4.7,
            totalBookings: 98,
            revenue: "$9,800",
            image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop&crop=center",
            originalPrice: "$100",
            category: "Photography",
            completedTours: 7,
            avgGroupSize: 14,
            lastActive: "2024-07-20"
        }
    ];
    // Calculate stats
    const totalTours = 43;
    const totalEvents = events.length;
    const totalRevenue = recentTours.reduce((sum, tour) => {
        return sum + parseFloat(tour.revenue.replace('$', '').replace(',', ''));
    }, 0);
    const avgRating = recentTours.reduce((sum, tour) => sum + tour.rating, 0) / recentTours.length;
    const totalParticipants = recentTours.reduce((sum, tour) => sum + tour.participants, 0);

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
                            <StateCard name='Total Tours' value={totalTours}>
                                <Calendar size={20} className="text-teal-400" />
                            </StateCard>

                            <StateCard name='Total Events' value={totalEvents}>
                                <Activity size={20} className="text-teal-400" />
                            </StateCard>

                            <StateCard name='Total Revenue' value={`$${totalRevenue.toLocaleString()}`}>
                                <DollarSign size={20} className="text-teal-400" />
                            </StateCard>

                            <StateCard name='Avg Rating' value={avgRating.toFixed(1)}>
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
                                    {topRatedTours.map((tour) => (
                                        <div key={tour.id} className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800/60 to-slate-900/80 backdrop-blur-sm border border-slate-700/50 shadow-2xl transition-all duration-300 hover:shadow-amber-500/20 hover:scale-105">
                                            {/* Card Image */}
                                            <div className="relative h-48 overflow-hidden">
                                                <img
                                                    src={tour.image}
                                                    alt={tour.name}
                                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                                                {/* Rating Badge */}
                                                <div className="absolute top-4 left-4 flex items-center gap-1 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full">
                                                    <Star size={14} className="text-amber-400 fill-current" />
                                                    <span className="text-white text-sm font-semibold">{tour.rating}</span>
                                                </div>

                                                {/* Category Badge */}
                                                <div className="absolute top-4 right-4 bg-teal-600/80 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-semibold">
                                                    {tour.category}
                                                </div>
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
                                            {upcomingTours.map((tour) => (
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
                                                            <span className="text-slate-300 text-sm font-medium">{tour.guide}</span>
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
                                            {recentTours.map((tour, index) => (
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
                                                <th className="px-6 py-4 text-left text-white text-sm font-semibold">Date</th>
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
                                                                    src={event.image}
                                                                    alt={event.name}
                                                                    className="w-14 h-14 rounded-2xl object-cover border-2 border-purple-500/30 group-hover:border-purple-400/50 transition-all duration-300 group-hover:scale-110"
                                                                />
                                                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                                            </div>
                                                            <div>
                                                                <p className="text-white font-semibold text-lg group-hover:text-teal-300 transition-colors duration-300">{event.name}</p>
                                                                <span className="inline-block px-3 py-1 bg-gradient-to-r from-teal-600/20 to-teal-700/20 text-teal-300 text-xs rounded-full mt-2 border border-teal-500/20">
                                                                    {event.category}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-5">
                                                        <div className="space-y-2">
                                                            <div className="mb-2">
                                                                <span className="text-white font-semibold text-lg">{event.registered}/{event.capacity}</span>
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
                                                            <p className="text-white font-semibold text-lg">{event.perPersonPrice}</p>
                                                            <p className="text-slate-400 text-sm">Cost: {event.companyCost}</p>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-5">
                                                        <span className="text-green-400 font-semibold text-lg">{event.profit}</span>
                                                    </td>
                                                    <td className="px-6 py-5 text-slate-300 font-medium">{event.date}</td>
                                                    <td className="px-6 py-5">
                                                        <button className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-sm font-semibold transition-all duration-300 shadow-lg ${
                                                            event.status === 'Enabled'
                                                                ? 'bg-gradient-to-r from-green-600/20 to-emerald-600/20 text-green-400 border border-green-500/30 hover:from-green-500/30 hover:to-emerald-500/30 hover:scale-105'
                                                                : 'bg-gradient-to-r from-red-600/20 to-pink-600/20 text-red-400 border border-red-500/30 hover:from-red-500/30 hover:to-pink-500/30 hover:scale-105'
                                                        }`}>
                                                            {event.status === 'Enabled' ? (
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

                        {/* Enhanced Quick Stats Footer */}
                        <Footer/>
                    </div>
                </div>
            </div>
        </div>
    );
}