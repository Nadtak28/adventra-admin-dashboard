import React, { useState } from 'react';
import {
    Home,
    MapPin,
    Users,
    Calendar,
    DollarSign,
    Search,
    Plus
} from 'lucide-react';

export default function Guides () {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCity, setSelectedCity] = useState('');

    const sidebarItems = [
        { icon: Home, label: 'Dashboard', active: false },
        { icon: MapPin, label: 'Tours', active: false },
        { icon: Users, label: 'Guides', active: true },
        { icon: Calendar, label: 'Bookings', active: false },
        { icon: DollarSign, label: 'Payments', active: false },
    ];

    const topRatedGuides = [
        {
            name: 'Emma Carter',
            image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face',
            salary: '$4,500',
            nextBooking: 'July 15, 2024'
        },
        {
            name: 'Owen Bennett',
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
            salary: '$4,200',
            nextBooking: 'July 20, 2024'
        },
        {
            name: 'Chloe Foster',
            image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
            salary: '$4,000',
            nextBooking: 'July 22, 2024'
        }
    ];

    const mostBookedGuides = [
        {
            name: 'Lucas Hayes',
            image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
            salary: '$4,800',
            nextBooking: 'July 10, 2024'
        },
        {
            name: 'Grace Turner',
            image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face',
            salary: '$4,600',
            nextBooking: 'July 12, 2024'
        },
        {
            name: 'Henry Reed',
            image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=face',
            salary: '$4,400',
            nextBooking: 'July 18, 2024'
        }
    ];

    const lowestRatedGuides = [
        {
            name: 'Caleb Scott',
            image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face',
            salary: '$3,500',
            nextBooking: 'July 25, 2024'
        },
        {
            name: 'Lily Evans',
            image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face',
            salary: '$3,200',
            nextBooking: 'July 28, 2024'
        },
        {
            name: 'Samuel Ford',
            image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&crop=face',
            salary: '$3,000',
            nextBooking: 'July 30, 2024'
        }
    ];

    const GuideCard = ({ guide }) => (
        <div className="flex h-full flex-1 flex-col gap-4 rounded-lg min-w-40">
            <div className="w-full aspect-square rounded-xl overflow-hidden">
                <img
                    src={guide.image}
                    alt={guide.name}
                    className="w-full h-full object-cover"
                />
            </div>
            <div>
                <p className="text-white text-base font-medium leading-normal">{guide.name}</p>
                <p className="text-teal-300 text-sm font-normal leading-normal">
                    Salary: {guide.salary} | Next Booking: {guide.nextBooking}
                </p>
            </div>
        </div>
    );

    return (
        <div
            className="relative flex size-full min-h-screen flex-col bg-slate-900 text-white overflow-x-hidden"
            style={{ fontFamily: '"Spline Sans", "Noto Sans", sans-serif' }}
        >
            <div className="layout-container flex h-full grow flex-col">
                <div className="gap-1 px-6 flex flex-1 justify-center py-5">
                    {/* Sidebar */}
                    <div className="layout-content-container flex flex-col w-80">
                        <div className="flex h-full min-h-[700px] flex-col justify-between bg-slate-900 p-4">
                            <div className="flex flex-col gap-4">
                                <div className="flex flex-col gap-2">
                                    {sidebarItems.map((item, index) => (
                                        <div
                                            key={index}
                                            className={`flex items-center gap-3 px-3 py-2 rounded-full cursor-pointer transition-colors ${
                                                item.active ? 'bg-slate-700' : 'hover:bg-slate-800'
                                            }`}
                                        >
                                            <item.icon className="text-white" size={24} />
                                            <p className="text-white text-sm font-medium leading-normal">{item.label}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
                        {/* Header */}
                        <div className="flex flex-wrap justify-between gap-3 p-4">
                            <p className="text-white tracking-tight text-3xl font-bold leading-tight min-w-72">Guides</p>
                            <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-8 px-4 bg-slate-700 text-white text-sm font-medium leading-normal hover:bg-slate-600 transition-colors">
                                <Plus size={16} className="mr-2" />
                                <span className="truncate">Add Guide</span>
                            </button>
                        </div>

                        {/* Search */}
                        <div className="px-4 py-3">
                            <div className="flex w-full h-12">
                                <div className="text-teal-300 flex border-none bg-slate-700 items-center justify-center pl-4 rounded-l-xl border-r-0">
                                    <Search size={24} />
                                </div>
                                <input
                                    placeholder="Search by name"
                                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border-none bg-slate-700 focus:border-none h-full placeholder:text-teal-300 px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* City Filter */}
                        <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
                            <div className="flex flex-col min-w-40 flex-1">
                                <select
                                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border border-slate-600 bg-slate-800 focus:border-slate-600 h-14 placeholder:text-teal-300 p-[15px] text-base font-normal leading-normal"
                                    value={selectedCity}
                                    onChange={(e) => setSelectedCity(e.target.value)}
                                >
                                    <option value="">Select a city</option>
                                    <option value="paris">Paris</option>
                                    <option value="london">London</option>
                                    <option value="tokyo">Tokyo</option>
                                </select>
                            </div>
                        </div>

                        {/* Top Rated Guides */}
                        <h2 className="text-white text-xl font-bold leading-tight tracking-tight px-4 pb-3 pt-5">
                            Top Rated Guides This Month
                        </h2>
                        <div className="flex overflow-x-auto scrollbar-hide">
                            <div className="flex items-stretch p-4 gap-3">
                                {topRatedGuides.map((guide, index) => (
                                    <GuideCard key={index} guide={guide} />
                                ))}
                            </div>
                        </div>

                        {/* Most Booked Guides */}
                        <h2 className="text-white text-xl font-bold leading-tight tracking-tight px-4 pb-3 pt-5">
                            Most Booked Guides This Month
                        </h2>
                        <div className="flex overflow-x-auto scrollbar-hide">
                            <div className="flex items-stretch p-4 gap-3">
                                {mostBookedGuides.map((guide, index) => (
                                    <GuideCard key={index} guide={guide} />
                                ))}
                            </div>
                        </div>

                        {/* Lowest Rated Guides */}
                        <h2 className="text-white text-xl font-bold leading-tight tracking-tight px-4 pb-3 pt-5">
                            Lowest Rated Guides
                        </h2>
                        <div className="flex overflow-x-auto scrollbar-hide">
                            <div className="flex items-stretch p-4 gap-3">
                                {lowestRatedGuides.map((guide, index) => (
                                    <GuideCard key={index} guide={guide} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
