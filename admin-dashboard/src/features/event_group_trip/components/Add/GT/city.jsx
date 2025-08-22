import React, { useState } from 'react';
import { MapPin, ChevronDown, Search, X } from 'lucide-react';

export default function CitySelection({ formData, handleInputChange,isOpen,setIsOpen, cities = [] }) {
    const [searchTerm, setSearchTerm] = useState('');

    // إضافة useEffect لإغلاق القائمة عند النقر خارجها
    React.useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            return () => document.removeEventListener('keydown', handleEscape);
        }
    }, [isOpen]);

    // فلترة المدن حسب البحث
    const filteredCities = cities.filter(city =>
        city.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        city.country?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // العثور على المدينة المختارة
    const selectedCity = cities.find(city => city.id === formData.form.city_id);

    const handleCitySelect = (city) => {
        handleInputChange('city_id', city.id);
        setIsOpen(false);
        setSearchTerm('');
    };

    const clearSelection = (e) => {
        e.stopPropagation();
        handleInputChange('city_id', null);
    };
    return (
        <div className={`rounded-2xl border border-gray-700/50 bg-gray-800/60 backdrop-blur-sm p-8 hover:border-gray-600 transition-all duration-300 shadow-2xl
            ${isOpen ? 'pb-50' : 'pb-8'}`}>
            <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-gradient-to-br from-teal-500/20 to-cyan-500/20 border border-teal-500/30">
                    <MapPin className="w-6 h-6 text-teal-400" />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-white">City Selection</h3>
                    <p className="text-gray-400 text-sm">Choose the destination city for your trip</p>
                </div>
            </div>

            <div className="space-y-4">
                {/* City Selector */}
                <div className="relative">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                        Destination City
                        <span className="text-red-400 ml-1">*</span>
                    </label>

                    <div className="relative">
                        <button
                            type="button"
                            onClick={() => setIsOpen(!isOpen)}
                            className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 text-left flex items-center justify-between focus:outline-none ${
                                formData.form.city_id
                                    ? 'border-teal-500/50 bg-gray-800/80 text-white focus:border-teal-400'
                                    : 'border-gray-600/50 bg-gray-800/50 text-gray-400 hover:border-gray-500 focus:border-teal-400'
                            }`}
                        >
                            <div className="flex items-center gap-3">
                                <MapPin className="w-4 h-4 text-teal-400" />
                                <span>
            {selectedCity
                ? `${selectedCity.name}${selectedCity.country ? `, ${selectedCity.country}` : ''}`
                : 'Select a city...'
            }
        </span>
                            </div>

                            <div className="flex items-center gap-2">
                                {selectedCity && (
                                    <div
                                        onClick={(e) => {
                                            e.stopPropagation(); // يمنع فتح القائمة عند الضغط على الحذف
                                            clearSelection();
                                        }}
                                        className="p-1 hover:bg-gray-700 rounded-full transition-colors duration-200 cursor-pointer"
                                    >
                                        <X className="w-4 h-4 text-gray-400 hover:text-red-400" />
                                    </div>
                                )}
                                <ChevronDown
                                    className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                                        isOpen ? 'rotate-180' : ''
                                    }`}
                                />
                            </div>
                        </button>


                        {/* Dropdown */}
                        {isOpen && (
                            <>
                                {/* Backdrop لإغلاق القائمة عند النقر خارجها */}
                                <div
                                    className="fixed inset-0 z-40"
                                    onClick={() => setIsOpen(false)}
                                />

                                <div className="absolute z-50 w-full mt-2 bg-gray-800/95 border border-gray-600/50 rounded-xl shadow-2xl backdrop-blur-sm overflow-hidden">
                                    {/* Search Input */}
                                    <div className="p-3 border-b border-gray-700/50">
                                        <div className="relative">
                                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                            <input
                                                type="text"
                                                placeholder="Search cities..."
                                                value={searchTerm}
                                                onChange={(e) => setSearchTerm(e.target.value)}
                                                className="w-full pl-10 pr-4 py-2 bg-gray-700/50 border border-gray-600/30 rounded-lg text-white placeholder-gray-400 focus:border-teal-400 focus:outline-none transition-all duration-200"
                                                autoFocus
                                            />
                                        </div>
                                    </div>

                                    {/* Cities List */}
                                    <div className="max-h-48 overflow-y-auto">
                                        {filteredCities.length > 0 ? (
                                            filteredCities.map((city) => (
                                                <button
                                                    key={city.id}
                                                    onClick={() => handleCitySelect(city)}
                                                    className={`w-full px-4 py-3 text-left hover:bg-gray-700/50 transition-colors duration-200 flex items-center gap-3 ${
                                                        formData.form.city_id === city.id
                                                            ? 'bg-teal-500/20 text-teal-300 border-r-2 border-teal-400'
                                                            : 'text-gray-300'
                                                    }`}
                                                >
                                                    <MapPin className="w-4 h-4 text-teal-400 flex-shrink-0" />
                                                    <div className="min-w-0 flex-1">
                                                        <div className="font-medium truncate">{city.name}</div>
                                                        {city.country && (
                                                            <div className="text-xs text-gray-400 truncate">{city.country}</div>
                                                        )}
                                                    </div>
                                                </button>
                                            ))
                                        ) : (
                                            <div className="px-4 py-8 text-center text-gray-400">
                                                <MapPin className="w-8 h-8 mx-auto mb-2 text-gray-500" />
                                                <p>No cities found</p>
                                                {searchTerm && (
                                                    <p className="text-sm mt-1">for "{searchTerm}"</p>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </>
                        )}
                    </div>

                    {/* Selected City Info */}
                    {selectedCity && (
                        <div className="mt-3 p-3 bg-teal-500/10 border border-teal-500/20 rounded-lg">
                            <div className="flex items-center gap-2 text-sm text-teal-300">
                                <MapPin className="w-4 h-4" />
                                <span className="font-medium">Selected:</span>
                                <span>{selectedCity.name}</span>
                                {selectedCity.country && (
                                    <>
                                        <span className="text-gray-400">•</span>
                                        <span className="text-gray-300">{selectedCity.country}</span>
                                    </>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* Additional Info */}
                <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                    <div className="flex items-start gap-3">
                        <div className="p-1 bg-blue-500/20 rounded-full mt-0.5">
                            <MapPin className="w-3 h-3 text-blue-400" />
                        </div>
                        <div>
                            <p className="text-sm text-blue-300 font-medium mb-1">Location Tips</p>
                            <p className="text-xs text-gray-400 leading-relaxed">
                                Choose the main destination city for your group trip. This will help participants understand the primary location and plan accordingly.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}