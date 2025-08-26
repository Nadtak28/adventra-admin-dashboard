import {Calendar, Clock, Star, Users, Loader2} from "lucide-react";
import React, {useState} from "react";

export default function SearchResult({data, searchTerm, selectedCities, selectedCategories, selectedLanguages, selectedStatus, sortBy, setSortBy, clearAllFilters, hasOffer, searchType, isLoading}) {
    const [viewMode, setViewMode] = useState('grid');

    const getStatusBadgeColor = (status) => {
        const colors = {
            active: 'bg-green-500/20 text-green-400 border-green-500/30',
            inactive: 'bg-red-500/20 text-red-400 border-red-500/30',
            pending: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
            completed: 'bg-green-500/20 text-green-400 border-green-500/30',
            in_progress: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
            finished: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
            cancel: 'bg-red-500/20 text-red-400 border-red-500/30'
        };
        return colors[status] || 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    };

    // Loading skeleton for Events/Tours Grid
    const GridSkeleton = () => (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
                <div key={index} className="bg-gradient-to-br from-slate-800/80 to-slate-900/90 p-6 rounded-2xl border border-slate-700/50 backdrop-blur-sm animate-pulse">
                    {/* Status badges skeleton */}
                    <div className="flex justify-end gap-2 mb-4">
                        <div className="h-6 w-16 bg-slate-700/50 rounded-full"></div>
                        <div className="h-6 w-12 bg-slate-700/50 rounded-full"></div>
                    </div>

                    {/* Image skeleton */}
                    <div className="w-30 h-30 bg-slate-700/50 rounded-xl mx-auto mb-4"></div>

                    {/* Content skeleton */}
                    <div className="text-center space-y-3">
                        <div className="h-5 bg-slate-700/50 rounded-lg w-3/4 mx-auto"></div>
                        <div className="h-4 bg-slate-700/50 rounded w-full mx-auto"></div>
                        <div className="h-4 bg-slate-700/50 rounded w-2/3 mx-auto"></div>

                        {/* Rating skeleton */}
                        <div className="h-4 bg-slate-700/50 rounded w-1/2 mx-auto"></div>

                        {/* Dates skeleton (for tours) */}
                        {searchType === 'group_trip' && (
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <div className="h-4 bg-slate-700/50 rounded w-1/3"></div>
                                    <div className="h-4 bg-slate-700/50 rounded w-1/3"></div>
                                </div>
                                <div className="flex justify-between">
                                    <div className="h-4 bg-slate-700/50 rounded w-1/3"></div>
                                    <div className="h-4 bg-slate-700/50 rounded w-1/3"></div>
                                </div>
                            </div>
                        )}

                        {/* Price section skeleton */}
                        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-700/50">
                            <div className="h-12 bg-slate-700/50 rounded"></div>
                            <div className="h-12 bg-slate-700/50 rounded"></div>
                            <div className="h-12 bg-slate-700/50 rounded"></div>
                        </div>

                        {/* Button skeleton */}
                        <div className="h-10 bg-slate-700/50 rounded-xl w-full"></div>
                    </div>
                </div>
            ))}
        </div>
    );

    // Loading skeleton for Events/Tours List
    const ListSkeleton = () => (
        <div className="space-y-4">
            {[...Array(4)].map((_, index) => (
                <div key={index} className="bg-gradient-to-br from-slate-800/80 to-slate-900/90 p-6 rounded-2xl border border-slate-700/50 backdrop-blur-sm animate-pulse">
                    <div className="flex items-start gap-6">
                        {/* Image skeleton */}
                        <div className="w-40 h-40 bg-slate-700/50 rounded-xl flex-shrink-0"></div>

                        <div className="flex-1 space-y-4">
                            {/* Header skeleton */}
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <div className="h-6 bg-slate-700/50 rounded-lg w-64 mb-2"></div>
                                    <div className="h-4 bg-slate-700/50 rounded w-48 mb-2"></div>
                                    <div className="h-4 bg-slate-700/50 rounded w-full"></div>
                                    <div className="h-4 bg-slate-700/50 rounded w-3/4 mt-1"></div>
                                </div>
                                <div className="flex gap-3">
                                    <div className="h-8 bg-slate-700/50 rounded-xl w-16"></div>
                                    <div className="h-8 bg-slate-700/50 rounded-xl w-12"></div>
                                </div>
                            </div>

                            {/* Dates skeleton (for tours) */}
                            {searchType === 'group_trip' && (
                                <div className="flex gap-6">
                                    <div className="h-4 bg-slate-700/50 rounded w-32"></div>
                                    <div className="h-4 bg-slate-700/50 rounded w-32"></div>
                                </div>
                            )}

                            {/* Bottom section skeleton */}
                            <div className="flex items-center justify-between pt-3 border-t border-slate-700/50">
                                <div className="flex gap-6">
                                    <div className="h-12 bg-slate-700/50 rounded w-20"></div>
                                    <div className="h-12 bg-slate-700/50 rounded w-20"></div>
                                    <div className="h-12 bg-slate-700/50 rounded w-20"></div>
                                    <div className="h-12 bg-slate-700/50 rounded w-20"></div>
                                </div>
                                <div className="h-10 bg-slate-700/50 rounded-xl w-24"></div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );

    return (
        <>
            {(data?.length > 0 || searchTerm || selectedCities.length > 0 || selectedCategories.length > 0 || selectedLanguages.length > 0 || selectedStatus !== 'active' || selectedStatus !== 'pending' || hasOffer !== '0' || isLoading) && (
                <div className="space-y-6">
                    {/* Results Header */}
                    <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-800/40 backdrop-blur-sm rounded-2xl p-4 border border-slate-700/50">
                        <div className="flex items-center gap-4">
                            <h3 className="text-white text-lg font-semibold flex items-center gap-2">
                                {isLoading ? (
                                    <Loader2 size={20} className="text-teal-400 animate-spin" />
                                ) : searchType === 'event' ? (
                                    <Calendar size={20} className="text-teal-400" />
                                ) : (
                                    <Users size={20} className="text-teal-400" />
                                )}
                                {isLoading ? (
                                    `Searching ${searchType === 'event' ? 'Events' : 'Group Tours'}...`
                                ) : (
                                    `${searchType === 'event' ? 'Events' : 'Group Tours'} Results (${data?.length || 0})`
                                )}
                            </h3>

                            <select
                                className="bg-slate-700/80 backdrop-blur-sm border border-slate-600/50 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-teal-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                disabled={isLoading}
                            >
                                <option value="name">Sort by Name</option>
                                <option value="price">Sort by Price</option>
                                <option value="rating">Sort by Rating</option>
                                <option value="created_at">Sort by Date</option>
                                {searchType === 'group_trip' && <option value="starting_date">Sort by Start Date</option>}
                                {searchType === 'group_trip' && <option value="ending_date">Sort by End Date</option>}
                            </select>
                        </div>

                        <div className="flex bg-slate-700/50 rounded-xl p-1">
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`px-3 py-2 rounded-lg text-sm transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${viewMode === 'grid' ? 'bg-teal-500 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
                                disabled={isLoading}
                            >
                                Grid
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                className={`px-3 py-2 rounded-lg text-sm transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${viewMode === 'list' ? 'bg-teal-500 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
                                disabled={isLoading}
                            >
                                List
                            </button>
                        </div>
                    </div>

                    {isLoading ? (
                        // Loading State
                        <div className="space-y-4">
                            {viewMode === 'grid' ? <GridSkeleton /> : <ListSkeleton />}
                        </div>
                    ) : data?.length > 0 ? (
                        // Results
                        <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 h-100 overflow-y-scroll border border-slate-700/40 rounded-2xl p-4 shadow-inner backdrop-blur-sm [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden' : 'space-y-4 h-150 overflow-y-scroll border border-slate-700/40 rounded-2xl p-4 shadow-inner backdrop-blur-sm [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'}>
                            {data?.map((item) =>
                                searchType === 'event' ? (
                                    viewMode === 'grid' ? (
                                        // Events Grid View
                                        <div key={item.id} className="group relative bg-gradient-to-br from-slate-800/80 to-slate-900/90 p-6 rounded-2xl border border-slate-700/50 backdrop-blur-sm hover:shadow-xl hover:shadow-teal-500/10 transition-all duration-500 hover:scale-105 hover:border-teal-500/30">
                                            <div className="absolute top-4 right-4 flex items-center gap-2">
                                                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusBadgeColor(item.status)}`}>
                                                        {item.status}
                                                    </span>
                                                {item.has_offer && (
                                                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-orange-500/20 text-orange-400 border border-orange-500/30">
                                                            OFFER
                                                        </span>
                                                )}
                                            </div>

                                            <div className="w-30 h-30 bg-gradient-to-br from-teal-400 to-teal-600 rounded-xl flex items-center justify-center text-white font-bold text-xl mb-4 mx-auto">
                                                {item.images && item.images.length > 0 ? (
                                                    <img
                                                        src={item.images[0].url}
                                                        alt={item.name}
                                                        className="w-full h-full object-cover rounded-xl"
                                                        onError={(e) => {
                                                            e.target.style.display = 'none';
                                                            e.target.nextSibling.style.display = 'flex';
                                                        }}
                                                    />
                                                ) : <Calendar size={32} />}
                                            </div>

                                            <div className="text-center space-y-3">
                                                <div>
                                                    <h4 className="text-white font-semibold text-lg group-hover:text-teal-300 transition-colors">
                                                        {item.name}
                                                    </h4>
                                                    <p className="text-slate-400 text-sm line-clamp-2 mt-1">
                                                        {item.description}
                                                    </p>
                                                </div>

                                                <div className="flex items-center justify-center gap-2">
                                                    <div className="flex items-center gap-1">
                                                        <Star size={16} className="text-yellow-400" fill="currentColor" />
                                                        <span className="text-white text-sm font-medium">{item.rate}</span>
                                                    </div>
                                                    <span className="text-slate-400 text-xs">({item.reviewer_count} reviews)</span>
                                                </div>


                                                {item.has_offer ? (
                                                    <>
                                                        <div
                                                            className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-700/50">
                                                            <div className="text-center">
                                                                <p className="text-slate-400 text-xs">Price</p>
                                                                <p className="text-teal-300 font-semibold">${item.price}</p>
                                                            </div>
                                                            <div className="text-center">
                                                                <p className="text-orange-400 text-xs">Save From {item.main_price}</p>
                                                                <p className="text-orange-300 font-semibold">${(parseFloat(item.main_price) - parseFloat(item.price)).toFixed(2)}</p>
                                                            </div>
                                                            <div className="text-center">
                                                                <p className="text-slate-400 text-xs">Basic Cost</p>
                                                                <p className="text-white font-semibold">${item.basic_cost}</p>
                                                            </div>
                                                        </div>

                                                    </>
                                                ) : (
                                                    <div
                                                        className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-700/50">
                                                        <div className="text-center">
                                                            <p className="text-slate-400 text-xs">Price</p>
                                                            <p className="text-teal-300 font-semibold">${item.price}</p>
                                                        </div>
                                                        <div className="text-center">
                                                            <p className="text-slate-400 text-xs">Basic Cost</p>
                                                            <p className="text-white font-semibold">${item.basic_cost}</p>
                                                        </div>
                                                    </div>
                                                )}


                                                <button className="w-full bg-teal-500/20 hover:bg-teal-500/30 text-teal-300 hover:text-white px-4 py-2 rounded-xl transition-all duration-300 hover:scale-105 text-sm font-medium">
                                                    View Event
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        // Events List View
                                        <div key={item.id} className="group relative bg-gradient-to-br from-slate-800/80 to-slate-900/90 p-6 rounded-2xl border border-slate-700/50 backdrop-blur-sm hover:shadow-xl hover:shadow-teal-500/10 transition-all duration-500 hover:border-teal-500/30">
                                            <div className="flex items-start gap-6">
                                                <div className="w-40 h-40 bg-gradient-to-br from-teal-400 to-teal-600 rounded-xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                                                    {item.images && item.images.length > 0 ? (
                                                        <img
                                                            src={item.images[0].url}
                                                            alt={item.name}
                                                            className="w-full h-full object-cover rounded-xl"
                                                            onError={(e) => {
                                                                e.target.style.display = 'none';
                                                                e.target.nextSibling.style.display = 'flex';
                                                            }}
                                                        />
                                                    ) : <Calendar size={40} />}
                                                </div>

                                                <div className="flex-1 space-y-4">
                                                    <div className="flex items-start justify-between">
                                                        <div>
                                                            <h4 className="text-white font-semibold text-xl group-hover:text-teal-300 transition-colors">
                                                                {item.name}
                                                            </h4>
                                                            <p className="text-slate-300 text-sm line-clamp-2 mt-1">
                                                                {item.description}
                                                            </p>
                                                        </div>

                                                        <div className="flex items-center gap-3">
                                                            <div className="flex items-center gap-1 bg-slate-700/50 px-3 py-1.5 rounded-xl">
                                                                <Star size={14} className="text-yellow-400" fill="currentColor" />
                                                                <span className="text-white text-sm font-medium">{item.rate}</span>
                                                                <span className="text-slate-400 text-xs">({item.reviewer_count})</span>
                                                            </div>

                                                            <span className={`px-3 py-1.5 rounded-xl text-xs font-medium border ${getStatusBadgeColor(item.status)}`}>
                                                                    {item.status}
                                                                </span>

                                                            {item.has_offer && (
                                                                <span className="px-3 py-1.5 rounded-xl text-xs font-medium bg-orange-500/20 text-orange-400 border border-orange-500/30">
                                                                        OFFER
                                                                    </span>
                                                            )}
                                                        </div>
                                                    </div>


                                                    <div className="flex items-center justify-between pt-3 border-t border-slate-700/50">
                                                        <div className="flex items-center gap-6">
                                                            <div className="text-center">
                                                                <p className="text-slate-400 text-xs">Price</p>
                                                                <p className="text-teal-300 font-semibold">${item.price}</p>
                                                            </div>
                                                            <div className="text-center">
                                                                <p className="text-slate-400 text-xs">Basic Cost</p>
                                                                <p className="text-white font-semibold">${item.basic_cost}</p>
                                                            </div>
                                                            {item.has_offer&& <div className="text-center">
                                                                <p className="text-orange-400 text-xs">Save
                                                                    From {item.main_price}</p>
                                                                <p className="text-orange-300 font-semibold">${(parseFloat(item.main_price) - parseFloat(item.price)).toFixed(2)}</p>
                                                            </div>}
                                                            <div className="text-center">
                                                                <p className="text-slate-400 text-xs">Reviews</p>
                                                                <p className="text-blue-400 font-semibold">{item.reviewer_count}</p>
                                                            </div>
                                                        </div>
                                                        <button className="bg-teal-500/20 hover:bg-teal-500/30 text-teal-300 hover:text-white px-4 py-2 rounded-xl transition-all duration-300 hover:scale-105 text-sm font-medium">
                                                            View Event
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                ) : (
                                    // Group Tours
                                    viewMode === 'grid' ? (
                                        // Group Tours Grid View
                                        <div key={item.id} className="group relative bg-gradient-to-br from-slate-800/80 to-slate-900/90 p-6 rounded-2xl border border-slate-700/50 backdrop-blur-sm hover:shadow-xl hover:shadow-teal-500/10 transition-all duration-500 hover:scale-105 hover:border-teal-500/30">
                                            <div className="absolute top-4 right-4 flex items-center gap-2">
                                                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusBadgeColor(item.status)}`}>
                                                        {item.status}
                                                    </span>
                                                {item.has_offer && (
                                                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-orange-500/20 text-orange-400 border border-orange-500/30">
                                                            OFFER
                                                        </span>
                                                )}
                                            </div>

                                            <div className="w-30 h-30 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl mb-4 mx-auto">
                                                {item.images && item.images.length > 0 ? (
                                                    <img
                                                        src={item.images[0].url}
                                                        alt={item.name}
                                                        className="w-full h-full object-cover rounded-xl"
                                                        onError={(e) => {
                                                            e.target.style.display = 'none';
                                                            e.target.nextSibling.style.display = 'flex';
                                                        }}
                                                    />
                                                ) : <Users size={32} />}
                                            </div>

                                            <div className="text-center space-y-3">
                                                <div>
                                                    <h4 className="text-white font-semibold text-lg group-hover:text-teal-300 transition-colors">
                                                        {item.name}
                                                    </h4>
                                                    <p className="text-slate-400 text-sm line-clamp-2 mt-1">
                                                        {item.description}
                                                    </p>
                                                </div>

                                                <div className="flex items-center justify-center gap-2">
                                                    <div className="flex items-center gap-1">
                                                        <Star size={16} className="text-yellow-400" fill="currentColor" />
                                                        <span className="text-white text-sm font-medium">{item.rate}</span>
                                                    </div>
                                                    <span className="text-slate-400 text-xs">Guide: {item.guide?.name}</span>
                                                </div>

                                                <div className="flex flex-col gap-2">
                                                    <div className="flex items-center justify-between text-sm">
                                                            <span className="text-slate-400 flex items-center gap-1">
                                                                <Clock size={12} />
                                                                Start:
                                                            </span>
                                                        <span className="text-green-400">{new Date(item.starting_date).toLocaleDateString()}</span>
                                                    </div>
                                                    <div className="flex items-center justify-between text-sm">
                                                            <span className="text-slate-400 flex items-center gap-1">
                                                                <Clock size={12} />
                                                                End:
                                                            </span>
                                                        <span className="text-red-400">{new Date(item.ending_date).toLocaleDateString()}</span>
                                                    </div>
                                                </div>


                                                {item.has_offer ? (
                                                    <>
                                                        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-700/50">
                                                            <div className="text-center">
                                                                <p className="text-slate-400 text-xs">Price</p>
                                                                <p className="text-teal-300 font-semibold">${item.price}</p>
                                                            </div>
                                                            <div className="text-center">
                                                                <p className="text-orange-400 text-xs">Save From {item.main_price}</p>
                                                                <p className="text-orange-300 font-semibold">${(parseFloat(item.main_price) - parseFloat(item.price)).toFixed(2)}</p>
                                                            </div>
                                                            <div className="text-center">
                                                                <p className="text-slate-400 text-xs">Remaining Tickets</p>
                                                                <p className="text-white font-semibold">{item.remaining_tickets}</p>
                                                            </div>
                                                        </div>
                                                    </>
                                                ) : (
                                                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-700/50">
                                                        <div className="text-center">
                                                            <p className="text-slate-400 text-xs">Price</p>
                                                            <p className="text-teal-300 font-semibold">${item.price}</p>
                                                        </div>
                                                        <div className="text-center">
                                                            <p className="text-slate-400 text-xs">Remaining Tickets</p>
                                                            <p className="text-white font-semibold">{item.remaining_tickets}</p>
                                                        </div>
                                                    </div>
                                                )}




                                                <button className="w-full bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 hover:text-white px-4 py-2 rounded-xl transition-all duration-300 hover:scale-105 text-sm font-medium">
                                                    View Tour
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        // Group Tours List View
                                        <div key={item.id} className="group relative bg-gradient-to-br from-slate-800/80 to-slate-900/90 p-6 rounded-2xl border border-slate-700/50 backdrop-blur-sm hover:shadow-xl hover:shadow-teal-500/10 transition-all duration-500 hover:border-teal-500/30">
                                            <div className="flex items-start gap-6">
                                                <div className="w-40 h-40 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                                                    {item.images && item.images.length > 0 ? (
                                                        <img
                                                            src={item.images[0].url}
                                                            alt={item.name}
                                                            className="w-full h-full object-cover rounded-xl"
                                                            onError={(e) => {
                                                                e.target.style.display = 'none';
                                                                e.target.nextSibling.style.display = 'flex';
                                                            }}
                                                        />
                                                    ) : <Users size={40} />}
                                                </div>

                                                <div className="flex-1 space-y-4">
                                                    <div className="flex items-start justify-between">
                                                        <div>
                                                            <h4 className="text-white font-semibold text-xl group-hover:text-teal-300 transition-colors">
                                                                {item.name}
                                                            </h4>
                                                            <div className="flex items-center gap-4 mt-1">
                                                                <p className="text-slate-400 text-sm">Guide: {item?.guide?.name}</p>
                                                                <div className="flex items-center gap-1">
                                                                    <Star size={12} className="text-yellow-400" fill="currentColor" />
                                                                    <span className="text-slate-400 text-sm">Guide: {item?.guide?.rate}</span>
                                                                </div>
                                                            </div>
                                                            {item.description && (
                                                                <p className="text-slate-300 text-sm line-clamp-2 mt-2">
                                                                    {item.description}
                                                                </p>
                                                            )}
                                                        </div>

                                                        <div className="flex items-center gap-3">
                                                                <span className={`px-3 py-1.5 rounded-xl text-xs font-medium border ${getStatusBadgeColor(item.status)}`}>
                                                                    {item.status}
                                                                </span>

                                                            {item.has_offer && (
                                                                <span className="px-3 py-1.5 rounded-xl text-xs font-medium bg-orange-500/20 text-orange-400 border border-orange-500/30">
                                                                        OFFER
                                                                    </span>
                                                            )}
                                                        </div>
                                                    </div>

                                                    <div className="flex flex-wrap items-center gap-4 text-sm">
                                                        <div className="flex items-center gap-2">
                                                            <Clock size={14} className="text-green-400" />
                                                            <span className="text-slate-400">Start:</span>
                                                            <span className="text-green-400">{new Date(item.starting_date).toLocaleDateString()}</span>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <Clock size={14} className="text-red-400" />
                                                            <span className="text-slate-400">End:</span>
                                                            <span className="text-red-400">{new Date(item.ending_date).toLocaleDateString()}</span>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center justify-between pt-3 border-t border-slate-700/50">
                                                        <div className="flex items-center gap-6">
                                                            <div className="text-center">
                                                                <p className="text-slate-400 text-xs">Price</p>
                                                                <p className="text-teal-300 font-semibold">${item.price}</p>
                                                            </div>
                                                            {item.has_offer&& <div className="text-center">
                                                                <p className="text-orange-400 text-xs">Save
                                                                    From {item.main_price}</p>
                                                                <p className="text-orange-300 font-semibold">${(parseFloat(item.main_price) - parseFloat(item.price)).toFixed(2)}</p>
                                                            </div>}
                                                            <div className="text-center">
                                                                <p className="text-slate-400 text-xs">Remaining Tickets</p>
                                                                <p className="text-white font-semibold">{item.remaining_tickets}</p>
                                                            </div>
                                                            <div className="text-center">
                                                                <p className="text-slate-400 text-xs">Rating</p>
                                                                <p className="text-yellow-400 font-semibold">{item.rate}</p>
                                                            </div>
                                                        </div>
                                                        <button className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 hover:text-white px-4 py-2 rounded-xl transition-all duration-300 hover:scale-105 text-sm font-medium">
                                                            View Tour
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                )
                            )}
                        </div>
                    ) : (
                        // No Results
                        <div className="text-center py-16 space-y-4">
                            <div className="w-20 h-20 bg-slate-700/50 rounded-full flex items-center justify-center mx-auto">
                                {searchType === 'event' ? <Calendar size={32} className="text-slate-400" /> : <Users size={32} className="text-slate-400" />}
                            </div>
                            <div>
                                <p className="text-slate-300 text-lg font-medium">No {searchType === 'event' ? 'events' : 'group tours'} found</p>
                                <p className="text-slate-500 text-sm mt-2">Try adjusting your search criteria or filters</p>
                            </div>
                            <button
                                onClick={clearAllFilters}
                                className="bg-teal-500/20 hover:bg-teal-500/30 text-teal-300 hover:text-white px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105 text-sm font-medium"
                            >
                                Clear All Filters
                            </button>
                        </div>
                    )}
                </div>
            )}
        </>
    )
}