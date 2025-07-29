import React, { useState } from 'react';
import { Home, Calendar, Users, Bookmark, User, Settings, Search, ChevronDown } from 'lucide-react';

export default function EventGroupTrip () {
    const [searchQuery, setSearchQuery] = useState('');

    const sidebarItems = [
        { icon: Home, label: "Dashboard", active: false },
        { icon: Calendar, label: "Events", active: false },
        { icon: Users, label: "Group Tours", active: true },
        { icon: Bookmark, label: "Bookings", active: false },
        { icon: User, label: "Customers", active: false }
    ];

    const upcomingTours = [
        {
            id: 1,
            name: "City Exploration Walk",
            date: "2024-08-15",
            bookings: "15/30",
            discount: "Apply 10% Discount",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC-ULsYaGHIedTV7y8ZJWGE5BmIfjesyvjShKWdL1tN-SlOPj1eCA8TfiyhdxF0qHF8gA6BeVXQZSZQOO3NXU0rlDcD8a6ZlylQPbr_S_Ipj1p52Mx0EpvebLT7b3OlD0n3OuT4BfpGCCvEmr50fbGcsO2Dc7Bz6I6hmUVJrVByXSuFisMZhGxISrBCuMwy_JNjBBU_SX3Zsl5EEA_bhZAaAJlmaPrcIOaIW-GBEtqdVXAb4_DedVu6KUJqbB7DL6WO6d1lj9jSX_4"
        },
        {
            id: 2,
            name: "Historical Sites Visit",
            date: "2024-08-20",
            bookings: "8/25",
            discount: "Apply 15% Discount",
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
            endDate: "2024-07-20"
        },
        {
            id: 2,
            name: "Coastal Bike Tour",
            companyCost: "$3,000",
            profitMargin: "25%",
            perPersonPrice: "$150",
            endDate: "2024-07-15"
        },
        {
            id: 3,
            name: "Wine Tasting Experience",
            companyCost: "$2,000",
            profitMargin: "30%",
            perPersonPrice: "$100",
            endDate: "2024-07-10"
        },
        {
            id: 4,
            name: "City Exploration Walk",
            companyCost: "$1,500",
            profitMargin: "35%",
            perPersonPrice: "$75",
            endDate: "2024-07-05"
        },
        {
            id: 5,
            name: "Historical Sites Visit",
            companyCost: "$1,000",
            profitMargin: "40%",
            perPersonPrice: "$50",
            endDate: "2024-07-01"
        }
    ];

    const events = [
        {
            id: 1,
            name: "Summer Music Festival",
            perPersonPrice: "$100",
            companyCost: "$50",
            profit: "$50",
            status: "Enabled"
        },
        {
            id: 2,
            name: "Food & Wine Expo",
            perPersonPrice: "$75",
            companyCost: "$40",
            profit: "$35",
            status: "Enabled"
        },
        {
            id: 3,
            name: "Art & Culture Fair",
            perPersonPrice: "$50",
            companyCost: "$25",
            profit: "$25",
            status: "Disabled"
        },
        {
            id: 4,
            name: "Tech Conference",
            perPersonPrice: "$200",
            companyCost: "$100",
            profit: "$100",
            status: "Enabled"
        },
        {
            id: 5,
            name: "Sports Tournament",
            perPersonPrice: "$150",
            companyCost: "$75",
            profit: "$75",
            status: "Disabled"
        }
    ];

    const filterButtons = [
        { label: "City", active: false },
        { label: "Type", active: false },
        { label: "Price", active: false },
        { label: "Date", active: false }
    ];

    return (
        <div className="relative flex size-full min-h-screen flex-col bg-[#11221e] dark group/design-root overflow-x-hidden" style={{fontFamily: '"Spline Sans", "Noto Sans", sans-serif'}}>
            <div className="layout-container flex h-full grow flex-col">
                <div className="gap-1 px-6 flex flex-1 justify-center py-5">
                    {/* Sidebar */}
                    <div className="layout-content-container flex flex-col w-80">
                        <div className="flex h-full min-h-[700px] flex-col justify-between bg-[#11221e] p-4">
                            <div className="flex flex-col gap-4">
                                <h1 className="text-white text-base font-medium leading-normal">Tourify</h1>
                                <div className="flex flex-col gap-2">
                                    {sidebarItems.map((item, index) => {
                                        const IconComponent = item.icon;
                                        return (
                                            <div
                                                key={index}
                                                className={`flex items-center gap-3 px-3 py-2 ${
                                                    item.active ? 'rounded-full bg-[#23483f]' : ''
                                                }`}
                                            >
                                                <IconComponent className="text-white w-6 h-6" />
                                                <p className="text-white text-sm font-medium leading-normal">
                                                    {item.label}
                                                </p>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                            <div className="flex flex-col gap-1">
                                <div className="flex items-center gap-3 px-3 py-2">
                                    <Settings className="text-white w-6 h-6" />
                                    <p className="text-white text-sm font-medium leading-normal">Settings</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
                        {/* Header */}
                        <div className="flex flex-wrap justify-between gap-3 p-4">
                            <p className="text-white tracking-light text-[32px] font-bold leading-tight min-w-72">
                                Group Tours & Events
                            </p>
                        </div>

                        {/* Search Bar */}
                        <div className="px-4 py-3">
                            <label className="flex flex-col min-w-40 h-12 w-full">
                                <div className="flex w-full flex-1 items-stretch rounded-xl h-full">
                                    <div className="text-[#91cabc] flex border-none bg-[#23483f] items-center justify-center pl-4 rounded-l-xl border-r-0">
                                        <Search className="w-6 h-6" />
                                    </div>
                                    <input
                                        placeholder="Search tours and events"
                                        className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border-none bg-[#23483f] focus:border-none h-full placeholder:text-[#91cabc] px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>
                            </label>
                        </div>

                        {/* Filter Buttons */}
                        <div className="flex gap-3 p-3 flex-wrap pr-4">
                            {filterButtons.map((filter, index) => (
                                <button key={index} className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-full bg-[#23483f] pl-4 pr-2">
                                    <p className="text-white text-sm font-medium leading-normal">{filter.label}</p>
                                    <ChevronDown className="text-white w-5 h-5" />
                                </button>
                            ))}
                        </div>

                        {/* Upcoming Group Tours */}
                        <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
                            Upcoming Group Tours
                        </h2>
                        <div className="px-4 py-3">
                            <div className="flex overflow-hidden rounded-xl border border-[#32675a] bg-[#11221e]">
                                <table className="flex-1">
                                    <thead>
                                    <tr className="bg-[#19342d]">
                                        <th className="px-4 py-3 text-left text-white w-[400px] text-sm font-medium leading-normal">
                                            Tour Name
                                        </th>
                                        <th className="px-4 py-3 text-left text-white w-[400px] text-sm font-medium leading-normal">
                                            Date
                                        </th>
                                        <th className="px-4 py-3 text-left text-white w-[400px] text-sm font-medium leading-normal">
                                            Bookings
                                        </th>
                                        <th className="px-4 py-3 text-left text-white w-60 text-[#91cabc] text-sm font-medium leading-normal">
                                            Discount
                                        </th>
                                        <th className="px-4 py-3 text-left text-white w-14 text-sm font-medium leading-normal">
                                            Image
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {upcomingTours.map((tour) => (
                                        <tr key={tour.id} className="border-t border-t-[#32675a]">
                                            <td className="h-[72px] px-4 py-2 w-[400px] text-white text-sm font-normal leading-normal">
                                                {tour.name}
                                            </td>
                                            <td className="h-[72px] px-4 py-2 w-[400px] text-[#91cabc] text-sm font-normal leading-normal">
                                                {tour.date}
                                            </td>
                                            <td className="h-[72px] px-4 py-2 w-[400px] text-[#91cabc] text-sm font-normal leading-normal">
                                                {tour.bookings}
                                            </td>
                                            <td className="h-[72px] px-4 py-2 w-60 text-[#91cabc] text-sm font-bold leading-normal tracking-[0.015em]">
                                                {tour.discount}
                                            </td>
                                            <td className="h-[72px] px-4 py-2 w-14 text-sm font-normal leading-normal">
                                                <img
                                                    src={tour.image}
                                                    alt={tour.name}
                                                    className="w-10 h-10 rounded-full object-cover"
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Recent Group Tours */}
                        <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
                            Recent Group Tours
                        </h2>
                        <div className="px-4 py-3">
                            <div className="flex overflow-hidden rounded-xl border border-[#32675a] bg-[#11221e]">
                                <table className="flex-1">
                                    <thead>
                                    <tr className="bg-[#19342d]">
                                        <th className="px-4 py-3 text-left text-white w-[400px] text-sm font-medium leading-normal">
                                            Tour Name
                                        </th>
                                        <th className="px-4 py-3 text-left text-white w-[400px] text-sm font-medium leading-normal">
                                            Company Cost
                                        </th>
                                        <th className="px-4 py-3 text-left text-white w-[400px] text-sm font-medium leading-normal">
                                            Profit Margin
                                        </th>
                                        <th className="px-4 py-3 text-left text-white w-[400px] text-sm font-medium leading-normal">
                                            Per Person Price
                                        </th>
                                        <th className="px-4 py-3 text-left text-white w-[400px] text-sm font-medium leading-normal">
                                            End Date
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {recentTours.map((tour) => (
                                        <tr key={tour.id} className="border-t border-t-[#32675a]">
                                            <td className="h-[72px] px-4 py-2 w-[400px] text-white text-sm font-normal leading-normal">
                                                {tour.name}
                                            </td>
                                            <td className="h-[72px] px-4 py-2 w-[400px] text-[#91cabc] text-sm font-normal leading-normal">
                                                {tour.companyCost}
                                            </td>
                                            <td className="h-[72px] px-4 py-2 w-[400px] text-[#91cabc] text-sm font-normal leading-normal">
                                                {tour.profitMargin}
                                            </td>
                                            <td className="h-[72px] px-4 py-2 w-[400px] text-[#91cabc] text-sm font-normal leading-normal">
                                                {tour.perPersonPrice}
                                            </td>
                                            <td className="h-[72px] px-4 py-2 w-[400px] text-[#91cabc] text-sm font-normal leading-normal">
                                                {tour.endDate}
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Action Buttons for Tours */}
                        <div className="flex justify-stretch">
                            <div className="flex flex-1 gap-3 flex-wrap px-4 py-3 justify-start">
                                <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-[#23483f] text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-[#2d5349] transition-colors">
                                    <span className="truncate">View All Tours</span>
                                </button>
                                <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-[#0fdba8] text-[#11221e] text-sm font-bold leading-normal tracking-[0.015em] hover:bg-[#0bc596] transition-colors">
                                    <span className="truncate">Add New Tour</span>
                                </button>
                            </div>
                        </div>

                        {/* Events */}
                        <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
                            Events
                        </h2>
                        <div className="px-4 py-3">
                            <div className="flex overflow-hidden rounded-xl border border-[#32675a] bg-[#11221e]">
                                <table className="flex-1">
                                    <thead>
                                    <tr className="bg-[#19342d]">
                                        <th className="px-4 py-3 text-left text-white w-[400px] text-sm font-medium leading-normal">
                                            Event Name
                                        </th>
                                        <th className="px-4 py-3 text-left text-white w-[400px] text-sm font-medium leading-normal">
                                            Per Person Price
                                        </th>
                                        <th className="px-4 py-3 text-left text-white w-[400px] text-sm font-medium leading-normal">
                                            Company Cost
                                        </th>
                                        <th className="px-4 py-3 text-left text-white w-[400px] text-sm font-medium leading-normal">
                                            Profit
                                        </th>
                                        <th className="px-4 py-3 text-left text-white w-60 text-sm font-medium leading-normal">
                                            Status
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {events.map((event) => (
                                        <tr key={event.id} className="border-t border-t-[#32675a]">
                                            <td className="h-[72px] px-4 py-2 w-[400px] text-white text-sm font-normal leading-normal">
                                                {event.name}
                                            </td>
                                            <td className="h-[72px] px-4 py-2 w-[400px] text-[#91cabc] text-sm font-normal leading-normal">
                                                {event.perPersonPrice}
                                            </td>
                                            <td className="h-[72px] px-4 py-2 w-[400px] text-[#91cabc] text-sm font-normal leading-normal">
                                                {event.companyCost}
                                            </td>
                                            <td className="h-[72px] px-4 py-2 w-[400px] text-[#91cabc] text-sm font-normal leading-normal">
                                                {event.profit}
                                            </td>
                                            <td className="h-[72px] px-4 py-2 w-60 text-sm font-normal leading-normal">
                                                <button
                                                    className={`flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-8 px-4 text-sm font-medium leading-normal w-full transition-colors ${
                                                        event.status === 'Enabled'
                                                            ? 'bg-[#23483f] text-white hover:bg-[#2d5349]'
                                                            : 'bg-[#1a1a1a] text-[#91cabc] hover:bg-[#23483f]'
                                                    }`}
                                                >
                                                    <span className="truncate">{event.status}</span>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Action Buttons for Events */}
                        <div className="flex justify-stretch">
                            <div className="flex flex-1 gap-3 flex-wrap px-4 py-3 justify-start">
                                <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-[#23483f] text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-[#2d5349] transition-colors">
                                    <span className="truncate">View All Events</span>
                                </button>
                                <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-[#0fdba8] text-[#11221e] text-sm font-bold leading-normal tracking-[0.015em] hover:bg-[#0bc596] transition-colors">
                                    <span className="truncate">Add New Event</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

