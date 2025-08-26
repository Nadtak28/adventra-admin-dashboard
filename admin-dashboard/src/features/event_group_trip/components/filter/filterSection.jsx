import {Filter, Globe, MapPin, Tag, X,ListOrdered} from "lucide-react";
import React from "react";
import {useSelector} from "react-redux";

export default function FilterSection({selectedCities,setSelectedCities,selectedStatus,setSelectedStatus,selectedLanguages,selectedCategories,setSelectedCategories,setSelectedLanguages,clearAllFilters,searchType,hasOffer,setHasOffer,order_type,setOrder}){
    const {categories, cities, languages} = useSelector((state) => state.getIds);

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

    const getAvailableCities = () => {
        return cities.filter(city => !selectedCities.find(selected => selected.id === city.id));
    };

    const getAvailableCategories = () => {
        return categories.filter(category => !selectedCategories.find(selected => selected.id === category.id));
    };

    const getAvailableLanguages = () => {
        return languages.filter(language => !selectedLanguages.find(selected => selected.id === language.id));
    };

    // Get status options based on search type
    const getStatusOptions = () => {
        if (searchType === 'event') {
            return [
                { value: 'all', label: 'All Status' },
                { value: 'active', label: 'Active' },
                { value: 'inactive', label: 'Inactive' }
            ];
        } else {
            return [
                { value: 'all', label: 'All Status' },
                { value: 'pending', label: 'Pending' },
                { value: 'completed', label: 'Completed' },
                { value: 'in_progress', label: 'In Progress' },
                { value: 'finished', label: 'Finished' },
                { value: 'cancel', label: 'Cancelled' }
            ];
        }
    };
    return (
        <div className="space-y-6">
            {/* Dropdowns Row */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
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

                {/* Languages Selection - Only for Group Tours */}
                {searchType === 'group_trip' && (
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
                )}

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
                        {getStatusOptions().map(option => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                </div>

                {/* Has Offer Filter */}
                <div className="relative">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-400 z-10">
                        <Tag size={18} />
                    </div>
                    <select
                        className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border border-slate-600/50 bg-slate-800/80 backdrop-blur-sm focus:border-orange-500 hover:border-slate-500/70 h-12 placeholder:text-slate-400 pl-12 pr-4 text-sm font-normal leading-normal shadow-lg transition-all duration-300"
                        value={hasOffer}
                        onChange={(e) => setHasOffer(e.target.value)}
                    >
                        <option value="0">All</option>
                        <option value="1">Has Offer Only</option>
                    </select>
                </div>
                {/*DESC ASC*/}
                <div className="relative">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-400 z-10">
                        <ListOrdered size={18} />
                    </div>
                    <select
                        className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border border-slate-600/50 bg-slate-800/80 backdrop-blur-sm focus:border-orange-500 hover:border-slate-500/70 h-12 placeholder:text-slate-400 pl-12 pr-4 text-sm font-normal leading-normal shadow-lg transition-all duration-300"
                        value={order_type}
                        onChange={(e) => setOrder(e.target.value)}
                    >
                        <option value="DESC">DESC</option>
                        <option value="ASC">ASC</option>
                    </select>
                </div>
            </div>

            {/* Selected Filters Display */}
            {(selectedCities.length > 0 || selectedCategories.length > 0 || selectedLanguages.length > 0 || (selectedStatus !== 'active' && selectedStatus !== 'pending') || hasOffer !== '0') && (
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

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* First Column */}
                        <div className="space-y-3">
                            {/* Selected Status */}
                            {selectedStatus !== 'active' && selectedStatus !== 'pending' && (
                                <div>
                                    <h4 className="text-green-300 text-xs font-medium mb-2 flex items-center gap-2">
                                        <Filter size={12} />
                                        Status
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        <div className="flex items-center gap-2 bg-green-500/20 border border-green-400/50 text-green-300 px-3 py-1.5 rounded-full text-sm">
                                            <span>{getStatusOptions().find(opt => opt.value === selectedStatus)?.label}</span>
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

                            {/* Has Offer Filter */}
                            {hasOffer !== '0' && (
                                <div>
                                    <h4 className="text-orange-300 text-xs font-medium mb-2 flex items-center gap-2">
                                        <Tag size={12} />
                                        Offers
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        <div className="flex items-center gap-2 bg-orange-500/20 border border-orange-400/50 text-orange-300 px-3 py-1.5 rounded-full text-sm">
                                            <span>{'Has Offer'}</span>
                                            <button
                                                onClick={() => setHasOffer('0')}
                                                className="hover:bg-orange-400/20 rounded-full p-0.5 transition-colors"
                                            >
                                                <X size={12} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Second Column */}
                        <div className="space-y-3">
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

                            {/* Selected Languages - Only for Group Tours */}
                            {searchType === 'group_trip' && selectedLanguages.length > 0 && (
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
                        </div>

                        {/* Third Column */}
                        <div className="space-y-3">
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
    )
}