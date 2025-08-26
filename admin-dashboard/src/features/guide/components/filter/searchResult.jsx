import {useState} from "react";
import {useSelector} from "react-redux";
import {MapPin, Search, Star, Loader2} from "lucide-react";

export default function SearchResult({isLoading, searchTerm, selectedCities, selectedCategories, selectedLanguages, selectedStatus, sortBy, setSortBy, clearAllFilters}) {
    const {guides} = useSelector((state) => state.Guides);
    const [viewMode, setViewMode] = useState('grid');

    // Loading skeleton for grid view
    const GridSkeleton = () => (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
                <div key={index} className="bg-gradient-to-br from-slate-800/80 to-slate-900/90 p-4 rounded-2xl border border-slate-700/50 backdrop-blur-sm animate-pulse">
                    <div className="w-full h-32 bg-slate-700/50 rounded-xl mb-4"></div>
                    <div className="text-center space-y-3">
                        <div className="h-5 bg-slate-700/50 rounded-lg w-3/4 mx-auto"></div>
                        <div className="h-4 bg-slate-700/50 rounded w-1/2 mx-auto"></div>
                        <div className="h-4 bg-slate-700/50 rounded w-1/3 mx-auto"></div>
                        <div className="flex gap-2 justify-center">
                            <div className="h-6 bg-slate-700/50 rounded-full w-16"></div>
                            <div className="h-6 bg-slate-700/50 rounded-full w-16"></div>
                        </div>
                        <div className="grid grid-cols-3 gap-4 pt-4">
                            <div className="h-10 bg-slate-700/50 rounded"></div>
                            <div className="h-10 bg-slate-700/50 rounded"></div>
                            <div className="h-10 bg-slate-700/50 rounded"></div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );

    // Loading skeleton for list view
    const ListSkeleton = () => (
        <div className="space-y-4">
            {[...Array(4)].map((_, index) => (
                <div key={index} className="bg-gradient-to-br from-slate-800/80 to-slate-900/90 p-6 rounded-2xl border border-slate-700/50 backdrop-blur-sm animate-pulse">
                    <div className="flex items-start gap-6">
                        <div className="w-40 h-40 bg-slate-700/50 rounded-xl flex-shrink-0"></div>
                        <div className="flex-1 space-y-4">
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <div className="h-6 bg-slate-700/50 rounded-lg w-48 mb-2"></div>
                                    <div className="h-4 bg-slate-700/50 rounded w-64"></div>
                                </div>
                                <div className="flex gap-3">
                                    <div className="h-8 bg-slate-700/50 rounded-xl w-20"></div>
                                    <div className="h-8 bg-slate-700/50 rounded-xl w-16"></div>
                                </div>
                            </div>
                            <div className="h-4 bg-slate-700/50 rounded w-full"></div>
                            <div className="h-4 bg-slate-700/50 rounded w-3/4"></div>
                            <div className="flex gap-6 pt-3">
                                <div className="h-12 bg-slate-700/50 rounded w-20"></div>
                                <div className="h-12 bg-slate-700/50 rounded w-20"></div>
                                <div className="h-12 bg-slate-700/50 rounded w-20"></div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );

    return (
        <>
            {(guides?.length > 0 || searchTerm || selectedCities.length > 0 || selectedCategories.length > 0 || selectedLanguages.length > 0 || selectedStatus !== 'all' || isLoading) && (
                <div className="space-y-6">
                    {/* Results Header */}
                    <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-800/40 backdrop-blur-sm rounded-2xl p-4 border border-slate-700/50">
                        <div className="flex items-center gap-4">
                            <h3 className="text-white text-lg font-semibold flex items-center gap-2">
                                {isLoading ? (
                                    <Loader2 size={20} className="text-teal-400 animate-spin" />
                                ) : (
                                    <Search size={20} className="text-teal-400" />
                                )}
                                {isLoading ? 'Searching...' : `Search Results (${guides.length})`}
                            </h3>

                            <select
                                className="bg-slate-700/80 backdrop-blur-sm border border-slate-600/50 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-teal-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                disabled={isLoading}
                            >
                                <option value="name">Sort by Name</option>
                                <option value="rating">Sort by Rating</option>
                                <option value="price">Sort by Price</option>
                                <option value="created_at">Sort by Added Date</option>
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
                    ) : guides.length > 0 ? (
                        // Results
                        <div
                            className={
                                viewMode === 'grid'
                                    ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 h-100 overflow-x-auto overflow-y-scroll border border-slate-700/40 rounded-2xl p-4 shadow-inner backdrop-blur-sm [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'
                                    : 'space-y-4 h-150 overflow-y-scroll border border-slate-700/40 rounded-2xl p-4 shadow-inner backdrop-blur-sm [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'
                            }>
                            {guides.map((guide) => (
                                viewMode === 'grid' ? (
                                    <div key={guide.id} className="group relative bg-gradient-to-br from-slate-800/80 to-slate-900/90 p-4 rounded-2xl border border-slate-700/50 backdrop-blur-sm hover:shadow-xl hover:shadow-teal-500/10 transition-all duration-500 hover:scale-105 hover:border-teal-500/30">
                                        <div className="absolute top-4 right-4">
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${guide.status === 'active' ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-red-500/20 text-red-400 border border-red-500/30'}`}>
                                                    {guide.status}
                                                </span>
                                        </div>

                                        <div className="w-30 h-30 bg-gradient-to-br from-teal-400 to-teal-600 rounded-xl flex items-center justify-center text-white font-bold text-xl mb-4 mx-auto">
                                            {guide.images && guide.images.length > 0 ? (
                                                <img
                                                    src={guide.images[0].url}
                                                    alt={guide.name}
                                                    className="w-full h-full object-cover rounded-xl"
                                                    onError={(e) => {
                                                        e.target.style.display = 'none';
                                                        e.target.nextSibling.style.display = 'flex';
                                                    }}
                                                />
                                            ) : (guide.name.split(' ').map(n => n[0]).join(''))}
                                        </div>

                                        <div className="text-center space-y-3">
                                            <div>
                                                <h4 className="text-white font-semibold text-lg group-hover:text-teal-300 transition-colors">
                                                    {guide.name}
                                                </h4>
                                                <p className="text-slate-400 text-sm flex items-center gap-1 justify-center">
                                                    <MapPin size={12} />
                                                    {guide.city.name}
                                                </p>
                                            </div>

                                            <div className="flex items-center justify-center gap-2">
                                                <div className="flex items-center gap-1">
                                                    <Star size={16} className="text-yellow-400" fill="currentColor" />
                                                    <span className="text-white text-sm font-medium">{guide.rate}</span>
                                                </div>
                                                <span className="text-slate-400 text-xs">({guide.reviewer_count} reviews)</span>
                                            </div>

                                            <div className="flex flex-wrap gap-1 justify-center">
                                                {guide.categories.slice(0, 2).map(category => (
                                                    <span key={category.id} className="bg-teal-500/20 text-teal-300 px-2 py-1 rounded-full text-xs">
                                                            {category.name}
                                                        </span>
                                                ))}
                                                {guide.categories.length > 2 && (
                                                    <span className="bg-slate-600/50 text-slate-400 px-2 py-1 rounded-full text-xs">
                                                            +{guide.categories.length - 2}
                                                        </span>
                                                )}
                                            </div>

                                            <div className="flex flex-wrap gap-1 justify-center">
                                                {guide.languages.slice(0, 3).map(lang => (
                                                    <span key={lang.id} className="bg-blue-500/20 text-blue-300 px-2 py-1 rounded-full text-xs">
                                                            {lang.name}
                                                        </span>
                                                ))}
                                            </div>

                                            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-700/50">
                                                <div className="text-center">
                                                    <p className="text-slate-400 text-xs">Daily Rate</p>
                                                    <p className="text-teal-300 font-semibold">${guide.price}</p>
                                                </div>
                                                <div className="text-center">
                                                    <p className="text-slate-400 text-xs">Const Salary</p>
                                                    <p className="text-white font-semibold">${guide.const_salary}</p>
                                                </div>
                                                <div className="text-center">
                                                    <p className="text-slate-400 text-xs">Extra Salary</p>
                                                    <p className="text-white font-semibold">${guide.extra_salary}</p>
                                                </div>

                                            </div>
                                            <button className="flex-1 bg-teal-500/20 hover:bg-teal-500/30 text-teal-300 hover:text-white px-4 py-2 rounded-xl transition-all duration-300 hover:scale-105 text-sm font-medium">
                                                View Profile
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div key={guide.id} className="group relative bg-gradient-to-br from-slate-800/80 to-slate-900/90 p-6 rounded-2xl border border-slate-700/50 backdrop-blur-sm hover:shadow-xl hover:shadow-teal-500/10 transition-all duration-500 hover:border-teal-500/30">
                                        <div className="flex items-start gap-6">
                                            <div className="w-40 h-40 bg-gradient-to-br from-teal-400 to-teal-600 rounded-xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                                                {guide.images && guide.images.length > 0 ? (
                                                    <img
                                                        src={guide.images[0].url}
                                                        alt={guide.name}
                                                        className="w-full h-full object-cover rounded-xl"
                                                        onError={(e) => {
                                                            e.target.style.display = 'none';
                                                            e.target.nextSibling.style.display = 'flex';
                                                        }}
                                                    />
                                                ) : (guide.name.split(' ').map(n => n[0]).join(''))}
                                            </div>

                                            <div className="flex-1 space-y-4">
                                                <div className="flex items-start justify-between">
                                                    <div>
                                                        <h4 className="text-white font-semibold text-xl group-hover:text-teal-300 transition-colors">
                                                            {guide.name}
                                                        </h4>
                                                        <div className="flex items-center gap-4 mt-1">
                                                            <p className="text-slate-400 text-sm flex items-center gap-1">
                                                                <MapPin size={12} />
                                                                {guide.city.name}
                                                            </p>
                                                            <p className="text-slate-400 text-sm">{guide.email}</p>
                                                            <p className="text-slate-400 text-sm">{guide.phone}</p>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center gap-3">
                                                        <div className="flex items-center gap-1 bg-slate-700/50 px-3 py-1.5 rounded-xl">
                                                            <Star size={14} className="text-yellow-400" fill="currentColor" />
                                                            <span className="text-white text-sm font-medium">{guide.rate}</span>
                                                            <span className="text-slate-400 text-xs">({guide.reviewer_count})</span>
                                                        </div>

                                                        <span className={`px-3 py-1.5 rounded-xl text-xs font-medium ${guide.status === 'active' ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-red-500/20 text-red-400 border border-red-500/30'}`}>
                                                                {guide.status}
                                                            </span>
                                                    </div>
                                                </div>

                                                {guide.description && (
                                                    <p className="text-slate-300 text-sm line-clamp-2">
                                                        {guide.description}
                                                    </p>
                                                )}

                                                <div className="flex flex-wrap items-center gap-4">
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-slate-400 text-xs font-medium">Categories:</span>
                                                        <div className="flex flex-wrap gap-1">
                                                            {guide.categories.map(category => (
                                                                <span key={category.id} className="bg-teal-500/20 text-teal-300 px-2 py-1 rounded-full text-xs">
                                                                        {category.name}
                                                                    </span>
                                                            ))}
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center gap-2">
                                                        <span className="text-slate-400 text-xs font-medium">Languages:</span>
                                                        <div className="flex flex-wrap gap-1">
                                                            {guide.languages.map(lang => (
                                                                <span key={lang.id} className="bg-blue-500/20 text-blue-300 px-2 py-1 rounded-full text-xs">
                                                                        {lang.name}
                                                                    </span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex items-center justify-between pt-3 border-t border-slate-700/50">
                                                    <div className="flex items-center gap-6">
                                                        <div className="text-center">
                                                            <p className="text-slate-400 text-xs">daily Rate</p>
                                                            <p className="text-teal-300 font-semibold">${guide.price}</p>
                                                        </div>
                                                        <div className="text-center">
                                                            <p className="text-slate-400 text-xs">Base Salary</p>
                                                            <p className="text-white font-semibold">${guide.const_salary}</p>
                                                        </div>
                                                        <div className="text-center">
                                                            <p className="text-slate-400 text-xs">Extra Salary</p>
                                                            <p className="text-white font-semibold">${guide.extra_salary}</p>
                                                        </div>
                                                        {parseFloat(guide.extra_salary) > 0 && (
                                                            <div className="text-center">
                                                                <p className="text-slate-400 text-xs">Extra Salary</p>
                                                                <p className="text-green-400 font-semibold">+${guide.extra_salary}</p>
                                                            </div>
                                                        )}
                                                        <div className="text-center ">
                                                            <p className="text-slate-400 text-xs">monthly rating</p>
                                                            <p className="text-blue-300 font-bold">{guide.monthly_rating}</p>
                                                        </div>
                                                    </div>
                                                    <button className="bg-teal-500/20 hover:bg-teal-500/30 text-teal-300 hover:text-white px-4 py-2 rounded-xl transition-all duration-300 hover:scale-105 text-sm font-medium">
                                                        View Profile
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            ))}
                        </div>
                    ) : (
                        // No Results
                        <div className="text-center py-16 space-y-4">
                            <div className="w-20 h-20 bg-slate-700/50 rounded-full flex items-center justify-center mx-auto">
                                <Search size={32} className="text-slate-400" />
                            </div>
                            <div>
                                <p className="text-slate-300 text-lg font-medium">No guides found</p>
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