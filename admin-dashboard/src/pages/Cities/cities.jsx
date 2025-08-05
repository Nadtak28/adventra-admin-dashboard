import React, { useState } from 'react';
import { Search, Filter, TrendingUp, MapPin, Calendar, Users, Star, MoreVertical, Plus, Globe, Eye, Edit3, Activity } from 'lucide-react';
import StateCard from "../../features/all/components/states_card.jsx";
import Header from "../../features/all/components/header.jsx";
import {useNavigate} from "react-router-dom";

export default function CitiesDashboard() {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('name');
    const [filterBy, setFilterBy] = useState('all');
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const navigate=useNavigate();
    const cities = [
        {
            id: 1,
            name: "Paris",
            country: "France",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDn41AVL3bje3irO4Vv5RnaPYYcsxEOtjVBrNPv1BD6tUqkOHOsiwTI2mmyZ7qkE30a7YtPrCtSrPmgmC9aB8VBlPCEczLxj-_RPZ1GArdYDtOxrZ1XTA0dSgEjiawdCL-rIneZqsDLXbJWmv0OqQnNPCkEbco-03X5B5IbEx4ylnY1wrezobxXcQwC3evQ3IviiJK0ukfMQezcZV732EYgU84VHpH7ByglnxHL_k3E2xPBewPP9F9fhY6uxDdqeTy1vXfot4AQb5A",
            events: 50,
            tourGuides: 120,
            visitors: 15600,
            rating: 4.8,
            revenue: 125000,
            status: 'active',
            growth: 12.5
        },
        {
            id: 2,
            name: "London",
            country: "United Kingdom",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDwvVQs5eLW5SH6N5K4Ntw_tLbbSp4mJFkZyKH4whJ9WL89H-_SfZigwppkIjaGCBsEo9le_LeJFwTkizIW0x6rv6puLvCjV8gQrNoqksjZrAZ5E8OWAQIWMP-uYMeavA49VfkRgfKB814wxdS0eAAmfj0NwRQI5A76JsV86VssQigphV2YlkOy-eaNobb2UeE27ICXhsjcNrjXxZuoqYErtwF2UDzyb8l1KXsAa66nY3fVUyx2S3Yh65QvRY4oM1hKd-By5TMUikA",
            events: 60,
            tourGuides: 150,
            visitors: 18200,
            rating: 4.7,
            revenue: 142000,
            status: 'active',
            growth: 8.3
        },
        {
            id: 3,
            name: "Rome",
            country: "Italy",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDtg62JFrdjYSJHa2Z7RhU4uN8kAzoAgceOBZQVMvBqr9XAMg7nBvnCQZQUFXVFOgHyQL9c5sJBQhEcIbTOGW-1OwrzlkInB9qwad0A9qim6kxLLtCTD7Lh4dIUAPX5XlIfpFpdZOBdRyWxjspn4KBU5mtuFhp3gJeAkJIViuXkDsVclC8FSq2J2qE57ECNlpRV5ySlIDwI-nlUA2urJWRuKdnLFFMNKJsDOC2WmPf95s-TTO0cWp9EPb_OuOD9NdKxJOl1eMOSGIE",
            events: 40,
            tourGuides: 100,
            visitors: 12800,
            rating: 4.6,
            revenue: 98000,
            status: 'active',
            growth: 15.2
        },
        {
            id: 4,
            name: "New York",
            country: "United States",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD0SUueiDV3CC3zb0t8ZHbLs4pwSrj6XMtGgTbAkLCZcQ-SgKIUusJuYH3Gp8COMHbT_nzyHga4a23gyiiVabeoOhZwRmHHcom3ezTVp0pgsrI0uU1ZLnWTuWumtlwfVrwC6bP45dm4x9lwlQl7-kySORlGWf9zfIKK9qtMsxy0AmWcewKWnlPg_vOfQfvUiu7-HY1Y6qA2dImG2XJMd1h8JxTmBN7RSjy-9E03bKBhG6WuPyhtdVSy1Fzqs8X57hF1hxS78QUJh70",
            events: 80,
            tourGuides: 200,
            visitors: 22400,
            rating: 4.9,
            revenue: 189000,
            status: 'active',
            growth: 6.7
        },
        {
            id: 5,
            name: "Tokyo",
            country: "Japan",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC8Esr-Fnjo0pTDA7rMgYOVRFB64s-mmaioHUtLdi-LFS6lQnbJoq7nDCVMfhRN368MJiVuOoLMFeev8NbHeGNFlaC3Ofc7IyjHaldTerFRn8XrK9f7vThzKKchhIRm_qXW9LIIiC2GBPJaoylcjVGPRfXDldQY0MjkUeHCE1Uh7QYWtVtLI0Gs8EHGFbc0NIe1-2LIQPuFQA_31fpgqvwi-YrxHpl2Q1-1sKBOSB3PafGJZr2DvcjkwjwdlMmih5GYsyDzzpje0sw",
            events: 70,
            tourGuides: 180,
            visitors: 19800,
            rating: 4.8,
            revenue: 167000,
            status: 'active',
            growth: 10.1
        }
    ];

    // Filter and sort cities
    const filteredCities = cities
        .filter(city =>
            city.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            city.country.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => {
            switch(sortBy) {
                case 'events': return b.events - a.events;
                case 'visitors': return b.visitors - a.visitors;
                case 'revenue': return b.revenue - a.revenue;
                case 'rating': return b.rating - a.rating;
                default: return a.name.localeCompare(b.name);
            }
        });

    // Calculate totals
    const totalEvents = cities.reduce((sum, city) => sum + city.events, 0);
    const totalTours = 43;
    const totalTourGuides = cities.reduce((sum, city) => sum + city.tourGuides, 0);
    const totalVisitors = cities.reduce((sum, city) => sum + city.visitors, 0);
    const totalRevenue = cities.reduce((sum, city) => sum + city.revenue, 0);
    const avgRating = cities.reduce((sum, city) => sum + city.rating, 0) / cities.length;

    const formatNumber = (num) => {
        if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
        if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
        return num.toString();
    };

    const formatCurrency = (num) => {
        return '$' + formatNumber(num);
    };

    return (
        <div className="relative space-y-6 bg-[#0b1520] min-h-screen -m-6 p-6">
            {/* Enhanced background effects */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-teal-900/30 via-slate-800/10 to-transparent"></div>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-slate-800/40 via-transparent to-transparent"></div>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-teal-900/5 to-transparent"></div>

            <div className="layout-container flex h-full grow flex-col relative z-10">
                <div className="gap-1 px-6 flex flex-1 justify-center py-5">
                    <div className="layout-content-container flex flex-col max-w-[1200px] flex-1">

                        {/* Enhanced Header */}
                        <div className="flex flex-wrap justify-between gap-3 p-4 mb-6">
                            <Header title='Cities Dashboard' description="Manage destinations and track performance metrics" />

                            <button className="group flex min-w-[120px] cursor-pointer items-center justify-center overflow-hidden rounded-2xl h-12 px-6 bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-500 hover:to-teal-600 text-white text-sm font-semibold leading-normal shadow-xl shadow-teal-500/25 hover:shadow-teal-500/40 transition-all duration-300 hover:scale-105"
                            onClick={() => navigate('/dashboard/cities/add')}>
                                <Plus size={18} className="mr-2 group-hover:rotate-90 transition-transform duration-300" />
                                <span className="truncate">Add City</span>
                            </button>
                        </div>

                        {/* Enhanced Stats Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8 px-4">
                            <StateCard name='Total Cities' value={cities.length}>
                                <MapPin size={20} className="text-teal-400" />
                            </StateCard>

                            <StateCard name='Total Events' value={totalEvents}>
                                <Activity size={20} className="text-teal-400" />
                            </StateCard>

                            <StateCard name='Total Tours' value={totalTours}>
                                <Calendar size={20} className="text-teal-400" />
                            </StateCard>

                            <StateCard name='Visitors' value={formatNumber(totalVisitors)}>
                                <Users size={20} className="text-teal-400" />
                            </StateCard>

                            <StateCard name='Revenue' value={formatCurrency(totalRevenue)}>
                                <TrendingUp size={20} className="text-teal-400" />
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
                                    <div className="relative flex-1 flex items-center">
                                        <input
                                            type="text"
                                            placeholder="Search cities or countries..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            onFocus={() => setIsSearchFocused(true)}
                                            onBlur={() => setIsSearchFocused(false)}
                                            className={`
                                                w-full h-full px-5 py-4 
                                                bg-slate-800/60 backdrop-blur-sm
                                                text-white text-base font-medium
                                                placeholder-slate-400/70
                                                focus:outline-none focus:bg-slate-800/80
                                                transition-all duration-300 z-1
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
                                                <MapPin size={16} />
                                            </div>
                                            <div className="text-slate-500 hover:text-teal-400 transition-colors duration-200 cursor-pointer">
                                                <Globe size={16} />
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

                            {/* Enhanced Sort Dropdown */}
                            <div className="relative min-w-[200px]">
                                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-teal-400 z-10">
                                    <Filter size={18} />
                                </div>
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="w-full pl-12 pr-4 py-4 bg-slate-800/80 backdrop-blur-sm border border-slate-600/50 hover:border-slate-500/70 rounded-2xl text-white focus:outline-none focus:border-teal-500 shadow-lg transition-all duration-300 appearance-none cursor-pointer"
                                >
                                    <option value="name">Sort by Name</option>
                                    <option value="events">Sort by Events</option>
                                    <option value="visitors">Sort by Visitors</option>
                                    <option value="revenue">Sort by Revenue</option>
                                    <option value="rating">Sort by Rating</option>
                                </select>
                            </div>
                        </div>

                        {/* Enhanced Table */}
                        <div className="px-4 py-3">
                            <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800/60 to-slate-900/80 backdrop-blur-sm border border-slate-700/50 shadow-2xl">
                                <div className="overflow-x-auto">
                                    <table className="w-full min-w-[800px]">
                                        <thead>
                                        <tr className="bg-gradient-to-r from-slate-800/80 to-slate-700/80 border-b border-slate-600/30">
                                            <th className="px-6 py-4 text-left text-white text-sm font-semibold leading-normal">
                                                City
                                            </th>
                                            <th className="px-6 py-4 text-left text-white text-sm font-semibold leading-normal">
                                                Events
                                            </th>
                                            <th className="px-6 py-4 text-left text-white text-sm font-semibold leading-normal">
                                                Tour Guides
                                            </th>
                                            <th className="px-6 py-4 text-left text-white text-sm font-semibold leading-normal">
                                                Monthly Visitors
                                            </th>
                                            <th className="px-6 py-4 text-left text-white text-sm font-semibold leading-normal">
                                                Rating
                                            </th>
                                            <th className="px-6 py-4 text-left text-white text-sm font-semibold leading-normal">
                                                Revenue
                                            </th>
                                            <th className="px-6 py-4 text-left text-white text-sm font-semibold leading-normal">
                                                Growth
                                            </th>
                                            <th className="px-6 py-4 text-left text-white text-sm font-semibold leading-normal">
                                                Actions
                                            </th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {filteredCities.map((city, index) => (
                                            <tr key={city.id} className="group border-t border-t-slate-700/30 hover:bg-gradient-to-r hover:from-slate-800/60 hover:to-slate-700/40 transition-all duration-300">
                                                <td className="px-6 py-5">
                                                    <div className="flex items-center gap-4">
                                                        <div className="relative">
                                                            <img
                                                                src={city.image}
                                                                alt={city.name}
                                                                className="w-14 h-14 rounded-2xl object-cover border-2 border-teal-500/30 group-hover:border-teal-400/50 transition-all duration-300 group-hover:scale-110"
                                                            />
                                                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                                        </div>
                                                        <div>
                                                            <p className="text-white font-semibold text-lg group-hover:text-teal-300 transition-colors duration-300">{city.name}</p>
                                                            <p className="text-slate-400 text-sm font-medium">{city.country}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-5">
                                                    <span className="bg-gradient-to-r from-teal-600/80 to-teal-700/80 text-white px-3 py-2 rounded-full text-sm font-semibold shadow-lg shadow-teal-500/20">
                                                        {city.events}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-5 text-slate-300 font-medium">
                                                    {city.tourGuides}
                                                </td>
                                                <td className="px-6 py-5 text-slate-300 font-medium">
                                                    {formatNumber(city.visitors)}
                                                </td>
                                                <td className="px-6 py-5">
                                                    <div className="flex items-center gap-2">
                                                        <Star size={16} className="text-yellow-400 fill-current" />
                                                        <span className="text-white font-semibold">{city.rating}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-5 text-white font-semibold text-lg">
                                                    {formatCurrency(city.revenue)}
                                                </td>
                                                <td className="px-6 py-5">
                                                    <div className="flex items-center gap-2">
                                                        <TrendingUp size={16} className="text-green-400" />
                                                        <span className="text-green-400 font-semibold">+{city.growth}%</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-5">
                                                    <div className="flex items-center gap-3">
                                                        <button className="group/btn flex items-center gap-2 text-slate-400 hover:text-white transition-all duration-300 px-4 py-2 rounded-xl bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 hover:border-teal-500/50 hover:bg-slate-700/60 text-sm font-medium shadow-lg hover:shadow-teal-500/20 hover:scale-105">
                                                            <Edit3 size={14} className="group-hover/btn:rotate-12 transition-transform duration-300" />
                                                            Edit
                                                        </button>
                                                        <button className="text-slate-400 hover:text-white transition-all duration-300 p-2 rounded-xl hover:bg-slate-700/60 hover:scale-110">
                                                            <MoreVertical size={16} />
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

                        {/* Enhanced Footer Stats */}
                        <div className="px-4 py-6 text-center">
                            <div className="bg-gradient-to-r from-slate-800/40 to-slate-700/40 backdrop-blur-sm rounded-2xl p-4 border border-slate-700/30">
                                <p className="text-slate-300 text-sm font-medium flex items-center justify-center gap-4">
                                    <span className="flex items-center gap-2">
                                        <Eye size={16} className="text-teal-400" />
                                        Showing {filteredCities.length} of {cities.length} cities
                                    </span>
                                    <span className="text-slate-500">•</span>
                                    <span className="flex items-center gap-2">
                                        <Star size={16} className="text-yellow-400 fill-current" />
                                        Average Rating: {avgRating.toFixed(1)}
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}