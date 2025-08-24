import {Globe, MapPin, Search, Star, Filter, X, Calendar} from "lucide-react";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {filterService} from "../../all/api/filterService.jsx";

export default function GuideFilters(){
    const {categories,cities,languages}=useSelector((state) => state.getIds);
    const {guides}=useSelector((state) => state.Guides);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCities, setSelectedCities] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedLanguages, setSelectedLanguages] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState('active');
    const [sortBy, setSortBy] = useState('name');
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const [viewMode, setViewMode] = useState('grid');
    const dispatch = useDispatch();

    useEffect(() => {
        go()
    }, [
        searchTerm,
        selectedCities,
        selectedCategories,
        selectedLanguages,
        selectedStatus,
        sortBy,
        dispatch
    ]);

    const go = () => {
        if (
            searchTerm ||
            selectedCities.length ||
            selectedCategories.length ||
            selectedLanguages.length ||
            selectedStatus
        ) {
            dispatch(filterService({
                type: 'guide',
                contains: searchTerm || undefined,
                cities: selectedCities.length ? selectedCities : undefined,
                categories: selectedCategories.length ? selectedCategories : undefined,
                languages: selectedLanguages.length ? selectedLanguages : undefined,
                status: selectedStatus,
                orderBy: sortBy || undefined
            }));
        }
    }

    const handleCitySelect = (cityId) => {
        if (cityId && !selectedCities.find(city => city.id === parseInt(cityId))) {
            const city = cities.find(c => c.id === parseInt(cityId));
            if (city) {
                setSelectedCities(prev => [...prev, city]);
            }
        }
    };

    const handleCategorySelect = (categoryId) => {
        if (categoryId && !selectedCategories.find(category => category.id === parseInt(categoryId))) {
            const category = categories.find(c => c.id === parseInt(categoryId));
            if (category) {
                setSelectedCategories(prev => [...prev, category]);
            }
        }
    };

    const handleLanguageSelect = (languageId) => {
        if (languageId && !selectedLanguages.find(language => language.id === parseInt(languageId))) {
            const language = languages.find(l => l.id === parseInt(languageId));
            if (language) {
                setSelectedLanguages(prev => [...prev, language]);
            }
        }
    };

    const removeCity = (cityId) => {
        setSelectedCities(prev => prev.filter(city => city.id !== cityId));
    };

    const removeCategory = (categoryId) => {
        setSelectedCategories(prev => prev.filter(category => category.id !== categoryId));
    };

    const removeLanguage = (languageId) => {
        setSelectedLanguages(prev => prev.filter(language => language.id !== languageId));
    };

    const clearAllFilters = () => {
        setSearchTerm('');
        setSelectedCities([]);
        setSelectedCategories([]);
        setSelectedLanguages([]);
        setSelectedStatus('active');
    };

    const getAvailableCities = () => {
        return cities.filter(city => !selectedCities.find(selected => selected.id === city.id));
    };

    const getAvailableCategories = () => {
        return categories.filter(category => !selectedCategories.find(selected => selected.id === category.id));
    };

    const getAvailableLanguages = () => {
        return languages.filter(language => !selectedLanguages.find(selected => selected.id === language.id));
    };

    return (
        <div className="px-4 py-6 space-y-6">
            {/* Search Bar */}
            <div className={`relative group w-full h-16 rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 ease-out ${isSearchFocused ? 'shadow-teal-400/20 scale-105' : 'shadow-black/50'}`}>
                <div className="relative flex w-full h-full bg-slate-800/80 backdrop-blur-sm">
                    <div onClick={go} className={`flex items-center justify-center px-5 border-r border-slate-600/30 transition-all duration-300 cursor-pointer ${isSearchFocused ? 'text-teal-300' : 'text-teal-400'}`}>
                        <Search size={22} strokeWidth={2.5} />
                    </div>
                    <input
                        type="text"
                        placeholder="Search guides by name, city, or specialization..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onFocus={() => setIsSearchFocused(true)}
                        onBlur={() => setIsSearchFocused(false)}
                        className="w-full h-full px-6 py-4 bg-transparent text-white text-lg font-medium placeholder-slate-400/70 focus:outline-none"
                    />
                </div>
            </div>

            {/* Filter Section */}
            <div className="space-y-6">
                {/* Dropdowns Row */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {/* Cities Selection */}
                    <div className="relative">
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-teal-400 z-10">
                            <MapPin size={18} />
                        </div>
                        <select
                            className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border border-slate-600/50 bg-slate-800/80 backdrop-blur-sm focus:border-teal-500 hover:border-slate-500/70 h-12 placeholder:text-slate-400 pl-12 pr-4 text-sm font-normal leading-normal shadow-lg transition-all duration-300"
                            onChange={(e) => handleCitySelect(e.target.value)}
                            value=""
                        >
                            <option value="">Select Cities</option>
                            {getAvailableCities().map(city => (
                                <option key={city.id} value={city.id}>{city.name}</option>
                            ))}
                        </select>
                    </div>

                    {/* Categories Selection */}
                    <div className="relative">
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 z-10">
                            <Filter size={18} />
                        </div>
                        <select
                            className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border border-slate-600/50 bg-slate-800/80 backdrop-blur-sm focus:border-purple-500 hover:border-slate-500/70 h-12 placeholder:text-slate-400 pl-12 pr-4 text-sm font-normal leading-normal shadow-lg transition-all duration-300"
                            onChange={(e) => handleCategorySelect(e.target.value)}
                            value=""
                        >
                            <option value="">Select Categories</option>
                            {getAvailableCategories().map(category => (
                                <option key={category.id} value={category.id}>{category.name}</option>
                            ))}
                        </select>
                    </div>

                    {/* Languages Selection */}
                    <div className="relative">
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 z-10">
                            <Globe size={18} />
                        </div>
                        <select
                            className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border border-slate-600/50 bg-slate-800/80 backdrop-blur-sm focus:border-blue-500 hover:border-slate-500/70 h-12 placeholder:text-slate-400 pl-12 pr-4 text-sm font-normal leading-normal shadow-lg transition-all duration-300"
                            onChange={(e) => handleLanguageSelect(e.target.value)}
                            value=""
                        >
                            <option value="">Select Languages</option>
                            {getAvailableLanguages().map(language => (
                                <option key={language.id} value={language.id}>{language.name}</option>
                            ))}
                        </select>
                    </div>

                    {/* Status Filter */}
                    <div className="relative">
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-400 z-10">
                            <Filter size={18} />
                        </div>
                        <select
                            className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border border-slate-600/50 bg-slate-800/80 backdrop-blur-sm focus:border-green-500 hover:border-slate-500/70 h-12 placeholder:text-slate-400 pl-12 pr-4 text-sm font-normal leading-normal shadow-lg transition-all duration-300"
                            value={selectedStatus}
                            onChange={(e) => setSelectedStatus(e.target.value)}
                        >
                            <option value="all">All Status</option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </div>
                </div>

                {/* Selected Filters Display */}
                {(selectedCities.length > 0 || selectedCategories.length > 0 || selectedLanguages.length > 0 || selectedStatus !== 'active') && (
                    <div className="bg-slate-800/40 backdrop-blur-sm rounded-2xl p-4 border border-slate-700/50 space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-white text-sm font-medium">Selected Filters</h3>
                            <button
                                onClick={clearAllFilters}
                                className="px-3 py-1.5 rounded-lg bg-red-500/20 backdrop-blur-sm border border-red-400/30 text-red-300 text-xs hover:bg-red-500/30 hover:border-red-400/50 transition-all duration-300"
                            >
                                Clear All
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* First Column */}
                            <div className="space-y-3">
                                {/* Selected Status */}
                                {selectedStatus !== 'active' && (
                                    <div>
                                        <h4 className="text-green-300 text-xs font-medium mb-2 flex items-center gap-2">
                                            <Filter size={12} />
                                            Status
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            <div className="flex items-center gap-2 bg-green-500/20 border border-green-400/50 text-green-300 px-3 py-1.5 rounded-full text-sm">
                                                <span>{selectedStatus === 'all' ? 'All' : 'Inactive'}</span>
                                                <button
                                                    onClick={() => setSelectedStatus('all')}
                                                    className="hover:bg-green-400/20 rounded-full p-0.5 transition-colors"
                                                >
                                                    <X size={12} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Selected Categories */}
                                {selectedCategories.length > 0 && (
                                    <div>
                                        <h4 className="text-purple-300 text-xs font-medium mb-2 flex items-center gap-2">
                                            <Filter size={12} />
                                            Categories ({selectedCategories.length})
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            {selectedCategories.map(category => (
                                                <div
                                                    key={category.id}
                                                    className="flex items-center gap-2 bg-purple-500/20 border border-purple-400/50 text-purple-300 px-3 py-1.5 rounded-full text-sm"
                                                >
                                                    <span>{category.name}</span>
                                                    <button
                                                        onClick={() => removeCategory(category.id)}
                                                        className="hover:bg-purple-400/20 rounded-full p-0.5 transition-colors"
                                                    >
                                                        <X size={12} />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Second Column */}
                            <div className="space-y-3">
                                {/* Selected Languages */}
                                {selectedLanguages.length > 0 && (
                                    <div>
                                        <h4 className="text-blue-300 text-xs font-medium mb-2 flex items-center gap-2">
                                            <Globe size={12} />
                                            Languages ({selectedLanguages.length})
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            {selectedLanguages.map(language => (
                                                <div
                                                    key={language.id}
                                                    className="flex items-center gap-2 bg-blue-500/20 border border-blue-400/50 text-blue-300 px-3 py-1.5 rounded-full text-sm"
                                                >
                                                    <span>{language.name}</span>
                                                    <button
                                                        onClick={() => removeLanguage(language.id)}
                                                        className="hover:bg-blue-400/20 rounded-full p-0.5 transition-colors"
                                                    >
                                                        <X size={12} />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                {/* Selected Cities */}
                                {selectedCities.length > 0 && (
                                    <div>
                                        <h4 className="text-teal-300 text-xs font-medium mb-2 flex items-center gap-2">
                                            <MapPin size={12} />
                                            Cities ({selectedCities.length})
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            {selectedCities.map(city => (
                                                <div
                                                    key={city.id}
                                                    className="flex items-center gap-2 bg-teal-500/20 border border-teal-400/50 text-teal-300 px-3 py-1.5 rounded-full text-sm"
                                                >
                                                    <span>{city.name}</span>
                                                    <button
                                                        onClick={() => removeCity(city.id)}
                                                        className="hover:bg-teal-400/20 rounded-full p-0.5 transition-colors"
                                                    >
                                                        <X size={12} />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Search Results */}
            {(guides?.length>0 || searchTerm || selectedCities.length > 0 || selectedCategories.length > 0 || selectedLanguages.length > 0 || selectedStatus !== 'all') && (
                <div className="space-y-6">
                    {/* Results Header */}
                    <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-800/40 backdrop-blur-sm rounded-2xl p-4 border border-slate-700/50">
                        <div className="flex items-center gap-4">
                            <h3 className="text-white text-lg font-semibold flex items-center gap-2">
                                <Search size={20} className="text-teal-400" />
                                Search Results ({guides.length})
                            </h3>

                            <select
                                className="bg-slate-700/80 backdrop-blur-sm border border-slate-600/50 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-teal-500 transition-all duration-300"
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
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
                                className={`px-3 py-2 rounded-lg text-sm transition-all duration-300 ${viewMode === 'grid' ? 'bg-teal-500 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
                            >
                                Grid
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                className={`px-3 py-2 rounded-lg text-sm transition-all duration-300 ${viewMode === 'list' ? 'bg-teal-500 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
                            >
                                List
                            </button>
                        </div>
                    </div>

                    {guides.length > 0 ? (
                        <div
                            className={
                                viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 h-100 overflow-x-auto overflow-y-scrollborder border-slate-700/40 rounded-2xl p-4 shadow-inner backdrop-blur-sm[-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden' : 'space-y-4 h-150 overflow-y-scroll border border-slate-700/40 rounded-2xl p-4 shadow-inner backdrop-blur-sm[-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'}>
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
                                                </div><div className="text-center">
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
                                                        </div><div className="text-center">
                                                            <p className="text-slate-400 text-xs">Extra Salary</p>
                                                            <p className="text-white font-semibold">${guide.extra_salary}</p>
                                                        </div>
                                                        {parseFloat(guide.extra_salary) > 0 && (
                                                            <div className="text-center">
                                                                <p className="text-slate-400 text-xs">Extra Salary</p>
                                                                <p className="text-green-400 font-semibold">+${guide.extra_salary}</p>
                                                            </div>
                                                        )}
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
        </div>
    );
}