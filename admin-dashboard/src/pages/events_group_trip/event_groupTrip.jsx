
import React, { useState } from 'react';
import {
    Search, ChevronDown, Plus, Calendar, DollarSign, Users, TrendingUp,
    MapPin, Clock, Filter, Eye, Activity, MoreHorizontal, Edit3,
    CheckCircle, XCircle, Star, BarChart3, PieChart,Tickets
} from 'lucide-react';
import StateCard from "../../features/all/components/states_card.jsx";
import Header from "../../features/all/components/header.jsx";
import Footer from "../../features/event_group_trip/components/footer.jsx";
import {useNavigate} from "react-router-dom";

export default function EventGroupTrip() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedFilter, setSelectedFilter] = useState('all');
    const [isSearchFocused, setIsSearchFocused] = useState(false);
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
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC-ULsYaGHIedTV7y8ZJWGE5BmIfjesyvjShKWdL1tN-SlOPj1eCA8TfiyhdxF0qHF8gA6BeVXQZSZQOO3NXU0rlDcD8a6ZlylQPbr_S_Ipj1p52Mx0EpvebLT7b3OlD0n3OuT4BfpGCCvEmr50fbGcsO2Dc7Bz6I6hmUVJrVByXSuFisMZhGxISrBCuMwy_JNjBBU_SX3Zsl5EEA_bhZAaAJlmaPrcIOaIW-GBEtqdVXAb4_DedVu6KUJqbB7DL6WO6d1lj9jSX_4"
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
            revenue: "$6,000"
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
            revenue: "$3,750"
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
            revenue: "$2,600"
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
            revenue: "$2,025"
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
            revenue: "$1,400"
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
            category: "Music"
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
            category: "Food"
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
            category: "Culture"
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
            category: "Technology"
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
            category: "Sports"
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

    const filterButtons = [
        { label: "All", value: "all", active: selectedFilter === "all" },
        { label: "Active", value: "active", active: selectedFilter === "active" },
        { label: "Upcoming", value: "upcoming", active: selectedFilter === "upcoming" },
        { label: "Past", value: "past", active: selectedFilter === "past" }
    ];

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
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8 px-4">
                            <StateCard name='Total Tours' value={totalTours}>
                                <Calendar size={20} className="text-teal-400" />
                            </StateCard>

                            <StateCard name='Total Events' value={totalEvents}>
                                <Activity size={20} className="text-teal-400" />
                            </StateCard>

                            <StateCard name='Total Revenue' value={`$${totalRevenue.toLocaleString()}`}>
                                <DollarSign size={20} className="text-teal-400" />
                            </StateCard>

                            <StateCard name='Participants' value={totalParticipants}>
                                <Users size={20} className="text-teal-400" />
                            </StateCard>

                            <StateCard name='Avg Rating' value={avgRating.toFixed(1)}>
                                <Star size={20} className="text-teal-400" />
                            </StateCard>
                        </div>

                        {/* Enhanced Search and Filter Bar */}
                        <div className="flex flex-wrap gap-6 mb-8 px-4">
                            {/* Enhanced Search Bar */}
                            <div className={`
                                relative group flex-1 min-w-[300px] h-14 rounded-2xl overflow-hidden 
                                shadow-xl transition-all duration-500 ease-out
                                ${isSearchFocused ? 'shadow-teal-400/20 scale-105' : 'shadow-black/50'}
                                before:absolute before:inset-0 before:bg-gradient-to-r 
                                before:from-teal-400/10 before:via-transparent before:to-slate-700/20
                                before:opacity-0 before:transition-opacity before:duration-300
                                ${isSearchFocused ? 'before:opacity-100' : ''}
                            `}>
                                {/* Animated border gradient */}
                                <div className={`
                                    absolute inset-0 bg-gradient-to-r from-teal-400/30 via-slate-600/30 to-teal-400/30
                                    transition-opacity duration-500 rounded-2xl
                                    ${isSearchFocused ? 'opacity-100' : 'opacity-0'}
                                `} style={{ padding: '1px' }}>
                                    <div className="w-full h-full bg-slate-800/90 backdrop-blur-md rounded-2xl"></div>
                                </div>

                                <div className="relative flex w-full h-full">
                                    {/* Search Icon Container */}
                                    <div className={`
                                        flex items-center justify-center px-4 
                                        bg-slate-800/80 backdrop-blur-sm border-r border-slate-600/30
                                        transition-all duration-300 group-hover:bg-slate-700/80
                                        ${isSearchFocused ? 'text-teal-300 bg-slate-700/90' : 'text-teal-400'}
                                    `}>
                                        <div className={`
                                            transition-transform duration-300 
                                            ${isSearchFocused ? 'scale-110 rotate-12' : 'group-hover:scale-105'}
                                        `}>
                                            <Search size={20} strokeWidth={2.5} />
                                        </div>
                                    </div>

                                    {/* Input Field */}
                                    <div className="relative flex-1 flex items-center z-1">
                                        <input
                                            type="text"
                                            placeholder="Search tours, events, or guides..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            onFocus={() => setIsSearchFocused(true)}
                                            onBlur={() => setIsSearchFocused(false)}
                                            className={`
                                                w-full h-full px-5 py-4 
                                                bg-slate-800/60 backdrop-blur-sm
                                                text-white text-base font-medium
                                                placeholder-slate-400/70
                                                focus:outline-none focus:bg-slate-800/80
                                                transition-all duration-300
                                                ${isSearchFocused ? 'placeholder-teal-300/50' : ''}
                                            `}
                                        />

                                        {/* Floating Icons */}
                                        <div className={`
                                            absolute right-4 flex items-center space-x-2
                                            transition-all duration-300
                                            ${searchQuery ? 'opacity-100 translate-x-0' : 'opacity-40 translate-x-2'}
                                        `}>
                                            <div className="text-slate-500 hover:text-teal-400 transition-colors duration-200 cursor-pointer">
                                                <MapPin size={16} />
                                            </div>
                                            <div className="text-slate-500 hover:text-teal-400 transition-colors duration-200 cursor-pointer">
                                                <Calendar size={16} />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Subtle glow effect */}
                                <div className={`
                                    absolute -inset-1 bg-gradient-to-r from-teal-400/20 to-slate-600/20 
                                    rounded-2xl blur-xl transition-opacity duration-500
                                    ${isSearchFocused ? 'opacity-50' : 'opacity-0'}
                                `}></div>
                            </div>

                            {/* Enhanced Filter Buttons */}
                            <div className="flex gap-3">
                                {filterButtons.map((filter, index) => (
                                    <button
                                        key={filter.value}
                                        onClick={() => setSelectedFilter(filter.value)}
                                        className={`
                                            px-5 py-3 rounded-2xl font-semibold text-sm transition-all duration-300 
                                            ${filter.active
                                            ? 'bg-gradient-to-r from-teal-600 to-teal-700 text-white shadow-lg shadow-teal-500/25 scale-105'
                                            : 'bg-slate-800/60 text-slate-300 hover:bg-slate-700/60 hover:text-teal-300 hover:scale-105'
                                        }
                                            backdrop-blur-sm border border-slate-700/50 hover:border-teal-500/30
                                        `}
                                        style={{
                                            animationDelay: `${index * 100}ms`
                                        }}
                                    >
                                        {filter.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Enhanced Upcoming Group Tours */}
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
                                                                <p className="text-teal-400 text-sm font-medium">{tour.discount}</p>
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
                                                                <MoreHorizontal size={16} />
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
                                                    <td className="px-6 py-5 text-white font-semibold text-lg group-hover:text-teal-300 transition-colors duration-300">{tour.name}</td>
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

                        {/* Enhanced Events */}
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
                                                        <div>
                                                            <p className="text-white font-semibold text-lg group-hover:text-teal-300 transition-colors duration-300">{event.name}</p>
                                                            <span className="inline-block px-3 py-1 bg-gradient-to-r from-teal-600/20 to-teal-700/20 text-teal-300 text-xs rounded-full mt-2 border border-teal-500/20">
                                                                {event.category}
                                                            </span>
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