import React, { useState } from 'react';
import {
    Home,
    MapPin,
    Users,
    Calendar,
    DollarSign,
    Search,
    Plus,
    Star,
    TrendingUp,
    TrendingDown,
    Globe,
    Filter
} from 'lucide-react';
import {useNavigate} from "react-router-dom";

export default function Guides() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const [isSearchFocused, setIsSearchFocused] = useState(false);

    const topRatedGuides = [
        {
            name: 'Emma Carter',
            image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face',
            salary: '$4,500',
            nextBooking: 'July 15, 2024',
            rating: 4.9,
            tours: 45
        },
        {
            name: 'Owen Bennett',
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
            salary: '$4,200',
            nextBooking: 'July 20, 2024',
            rating: 4.8,
            tours: 38
        },
        {
            name: 'Chloe Foster',
            image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
            salary: '$4,000',
            nextBooking: 'July 22, 2024',
            rating: 4.7,
            tours: 42
        }
    ];

    const mostBookedGuides = [
        {
            name: 'Lucas Hayes',
            image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
            salary: '$4,800',
            nextBooking: 'July 10, 2024',
            rating: 4.6,
            tours: 67
        },
        {
            name: 'Grace Turner',
            image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face',
            salary: '$4,600',
            nextBooking: 'July 12, 2024',
            rating: 4.5,
            tours: 58
        },
        {
            name: 'Henry Reed',
            image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=face',
            salary: '$4,400',
            nextBooking: 'July 18, 2024',
            rating: 4.4,
            tours: 52
        }
    ];

    const lowestRatedGuides = [
        {
            name: 'Caleb Scott',
            image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face',
            salary: '$3,500',
            nextBooking: 'July 25, 2024',
            rating: 3.8,
            tours: 23
        },
        {
            name: 'Lily Evans',
            image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face',
            salary: '$3,200',
            nextBooking: 'July 28, 2024',
            rating: 3.6,
            tours: 18
        },
        {
            name: 'Samuel Ford',
            image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&crop=face',
            salary: '$3,000',
            nextBooking: 'July 30, 2024',
            rating: 3.4,
            tours: 15
        }
    ];

    const GuideCard = ({ guide, type }) => (
        <div className="group relative flex h-full flex-1 flex-col gap-4 rounded-2xl min-w-64 bg-gradient-to-br from-slate-800/80 to-slate-900/90 p-6 border border-slate-700/50 backdrop-blur-sm hover:shadow-2xl hover:shadow-teal-500/10 transition-all duration-500 hover:scale-105 hover:border-teal-500/30 hover:-translate-y-2">
            {/* Badge */}
            <div className="absolute -top-2 -right-2 z-10">
                {type === 'top' && (
                    <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-lg shadow-yellow-500/30">
                        <Star size={12} fill="white" />
                        Top Rated
                    </div>
                )}
                {type === 'booked' && (
                    <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-lg shadow-green-500/30">
                        <TrendingUp size={12} />
                        Most Booked
                    </div>
                )}
                {type === 'lowest' && (
                    <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-lg shadow-red-500/30">
                        <TrendingDown size={12} />
                        Needs Help
                    </div>
                )}
            </div>

            <div className="w-full aspect-square rounded-xl overflow-hidden relative">
                <img
                    src={guide.image}
                    alt={guide.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Rating overlay */}
                <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-sm rounded-lg px-2 py-1 flex items-center gap-1 shadow-lg">
                    <Star size={14} className="text-yellow-400" fill="currentColor" />
                    <span className="text-white text-sm font-semibold">{guide.rating}</span>
                </div>

                {/* Hover overlay with actions */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="flex gap-2">
                        <button className="bg-teal-500/90 hover:bg-teal-400 text-white p-2 rounded-full backdrop-blur-sm transition-all duration-200 hover:scale-110">
                            <Users size={16} />
                        </button>
                        <button className="bg-slate-700/90 hover:bg-slate-600 text-white p-2 rounded-full backdrop-blur-sm transition-all duration-200 hover:scale-110">
                            <Calendar size={16} />
                        </button>
                    </div>
                </div>
            </div>

            <div className="space-y-3">
                <div>
                    <p className="text-white text-lg font-semibold leading-normal group-hover:text-teal-300 transition-colors duration-300">
                        {guide.name}
                    </p>
                    <p className="text-teal-300 text-sm font-medium">
                        {guide.tours} tours completed
                    </p>
                </div>

                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <span className="text-slate-400 text-sm">Salary:</span>
                        <span className="text-white font-semibold">{guide.salary}</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-slate-400 text-sm">Next Booking:</span>
                        <span className="text-teal-300 text-sm font-medium">{guide.nextBooking}</span>
                    </div>
                </div>

                {/* Progress bar based on rating */}
                <div className="mt-4">
                    <div className="flex justify-between items-center mb-1">
                        <span className="text-slate-400 text-xs">Performance</span>
                        <span className="text-slate-300 text-xs">{Math.round(guide.rating * 20)}%</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                        <div
                            className={`h-2 rounded-full transition-all duration-1000 ${
                                type === 'top' ? 'bg-gradient-to-r from-yellow-400 to-orange-400' :
                                    type === 'booked' ? 'bg-gradient-to-r from-green-400 to-emerald-400' :
                                        'bg-gradient-to-r from-red-400 to-pink-400'
                            }`}
                            style={{ width: `${guide.rating * 20}%` }}
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    );

    const SectionHeader = ({ title, icon: Icon, gradient }) => (
        <div className="flex items-center gap-3 px-4 pb-4 pt-6">
            <div className={`p-3 rounded-xl bg-gradient-to-r ${gradient} shadow-lg`}>
                <Icon size={20} className="text-white" />
            </div>
            <h2 className="text-white text-xl font-bold leading-tight tracking-tight">
                {title}
            </h2>
        </div>
    );

    return (
        <div
            className="relative flex size-full min-h-screen w-auto flex-col space-y-6 bg-[#0b1520] -m-6 p-6 -mx-6 overflow-x-hidden"
            style={{ fontFamily: '"Spline Sans", "Noto Sans", sans-serif' }}
        >
            {/* Enhanced background effects */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-teal-900/30 via-slate-800/10 to-transparent"></div>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-slate-800/40 via-transparent to-transparent"></div>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-teal-900/5 to-transparent"></div>

            <div className="layout-container flex h-full grow flex-col relative z-10">
                <div className="gap-1 px-6 flex flex-1 justify-center py-5">
                    <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
                        {/* Enhanced Header */}
                        <div className="flex flex-wrap justify-between items-center gap-3 p-4 mb-2">
                            <div>
                                <h1 className="text-white tracking-tight text-4xl font-bold leading-tight bg-gradient-to-r from-white via-teal-200 to-teal-400 bg-clip-text text-transparent">
                                    Guides Dashboard
                                </h1>
                                <p className="text-slate-400 text-sm mt-2 flex items-center gap-2">
                                    <Users size={16} className="text-teal-400" />
                                    Manage your tour guides and performance metrics
                                </p>
                            </div>
                            <button className="group flex min-w-[140px] cursor-pointer items-center justify-center overflow-hidden rounded-2xl h-12 px-6 bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-500 hover:to-teal-600 text-white text-sm font-semibold leading-normal shadow-xl shadow-teal-500/25 hover:shadow-teal-500/40 transition-all duration-300 hover:scale-105"
                                    onClick={()=>navigate("/dashboard/guides/add")}>
                                <Plus size={18} className="mr-2 group-hover:rotate-90 transition-transform duration-300" />
                                <span className="truncate">Add Guide</span>
                            </button>
                        </div>

                        {/* Enhanced Search and Filter */}
                        <div className="px-4 py-6 space-y-6">
                            {/* Enhanced Search Bar */}
                            <div className={`
                                relative group w-full h-16 rounded-2xl overflow-hidden 
                                shadow-2xl transition-all duration-500 ease-out
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
                                        flex items-center justify-center px-5 
                                        bg-slate-800/80 backdrop-blur-sm border-r border-slate-600/30
                                        transition-all duration-300 group-hover:bg-slate-700/80
                                        ${isSearchFocused ? 'text-teal-300 bg-slate-700/90' : 'text-teal-400'}
                                    `}>
                                        <div className={`
                                            transition-transform duration-300 
                                            ${isSearchFocused ? 'scale-110 rotate-12' : 'group-hover:scale-105'}
                                        `}>
                                            <Search size={22} strokeWidth={2.5} />
                                        </div>
                                    </div>

                                    {/* Input Field */}
                                    <div className="relative flex-1 flex items-center z-2">
                                        <input
                                            type="text"
                                            placeholder="Search guides by name, city, or specialization..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            onFocus={() => setIsSearchFocused(true)}
                                            onBlur={() => setIsSearchFocused(false)}
                                            className={`
                                                w-full h-full px-6 py-4 
                                                bg-slate-800/60 backdrop-blur-sm
                                                text-white text-lg font-medium
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
                                            ${searchTerm ? 'opacity-100 translate-x-0' : 'opacity-40 translate-x-2'}
                                        `}>
                                            <div className="text-slate-500 hover:text-teal-400 transition-colors duration-200 cursor-pointer">
                                                <MapPin size={18} />
                                            </div>
                                            <div className="text-slate-500 hover:text-teal-400 transition-colors duration-200 cursor-pointer">
                                                <Globe size={18} />
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

                            {/* Enhanced Filter Section */}
                            <div className="flex flex-wrap gap-4 items-center">
                                <div className="flex max-w-[280px] relative">
                                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-teal-400 z-10">
                                        <Filter size={18} />
                                    </div>
                                    <select
                                        className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border border-slate-600/50 bg-slate-800/80 backdrop-blur-sm focus:border-teal-500 hover:border-slate-500/70 h-12 placeholder:text-slate-400 pl-12 pr-4 text-sm font-normal leading-normal shadow-lg transition-all duration-300"
                                        value={selectedCity}
                                        onChange={(e) => setSelectedCity(e.target.value)}
                                    >
                                        <option value="">All Cities</option>
                                        <option value="paris">Paris</option>
                                        <option value="london">London</option>
                                        <option value="tokyo">Tokyo</option>
                                        <option value="dubai">Dubai</option>
                                        <option value="newyork">New York</option>
                                    </select>
                                </div>

                                {/* Quick filters */}
                                <div className={`
                                    flex gap-2 transition-all duration-500 transform
                                    ${isSearchFocused ? 'opacity-100 translate-y-0' : 'opacity-70 translate-y-1'}
                                `}>
                                    {['Top Rated', 'Available', 'Busy'].map((filter, index) => (
                                        <button
                                            key={filter}
                                            className={`
                                                px-4 py-2 rounded-full bg-slate-800/40 backdrop-blur-sm
                                                border border-slate-600/30 text-slate-300 text-sm
                                                hover:bg-teal-400/10 hover:border-teal-400/40 hover:text-teal-300
                                                cursor-pointer transition-all duration-300
                                                hover:scale-105 hover:shadow-lg hover:shadow-teal-400/10
                                            `}
                                            style={{
                                                animationDelay: `${index * 100}ms`
                                            }}
                                        >
                                            {filter}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Top Rated Guides */}
                        <SectionHeader
                            title="Top Rated Guides This Month"
                            icon={Star}
                            gradient="from-yellow-500 to-orange-500"
                        />
                        <div className="flex overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                            <div className="flex items-stretch p-8 gap-6 min-w-max">
                                {topRatedGuides.map((guide, index) => (
                                    <GuideCard key={index} guide={guide} type="top" />
                                ))}
                            </div>
                        </div>

                        {/* Most Booked Guides */}
                        <SectionHeader
                            title="Most Booked Guides This Month"
                            icon={TrendingUp}
                            gradient="from-green-500 to-emerald-500"
                        />
                        <div className="flex overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                            <div className="flex items-stretch p-8 gap-6 min-w-max">
                                {mostBookedGuides.map((guide, index) => (
                                    <GuideCard key={index} guide={guide} type="booked" />
                                ))}
                            </div>
                        </div>

                        {/* Lowest Rated Guides */}
                        <SectionHeader
                            title="Guides Needing Support"
                            icon={TrendingDown}
                            gradient="from-red-500 to-pink-500"
                        />
                        <div className="flex overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pb-8">
                            <div className="flex items-stretch p-8 gap-6 min-w-max">
                                {lowestRatedGuides.map((guide, index) => (
                                    <GuideCard key={index} guide={guide} type="lowest" />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};