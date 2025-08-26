import {Search, Star, User, X} from "lucide-react";
import React, {useState} from "react";

export default function Guide({formData,handleInputChange}) {
    const [showGuideModal, setShowGuideModal] = useState(false);
    const [guideSearch, setGuideSearch] = useState('');
    const Guides=formData.form.Guides
    const filteredGuides = Guides.filter(guide =>
        guide.name.toLowerCase().includes(guideSearch.toLowerCase()) ||
        guide.nameEn?.toLowerCase().includes(guideSearch.toLowerCase())
    );

    const isCitySelected = formData.form.city_id !== '';

    const selectGuide = (guide) => {
        handleInputChange('selectedGuide', guide);
        setShowGuideModal(false);
        setGuideSearch('');
    };
    return (
        <div>
            {/* Tour Guide Selection */}
            <div className="bg-gradient-to-br from-slate-800/60 to-slate-900/80 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 shadow-2xl">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 rounded-xl bg-teal-600/20 border border-teal-500/30">
                        <User size={24} className="text-teal-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-white">Guide</h2>
                </div>

                {!isCitySelected ? (
                    <div className="text-center py-12">
                        <User size={48} className="text-slate-600 mx-auto mb-4" />
                        <p className="text-slate-400 text-lg font-medium">يجب اختيار مدينة أولاً</p>
                        <p className="text-slate-500 text-sm">Please select a city first to view available guides</p>
                    </div>
                ) : formData.form.selectedGuide?.id ? (
                    <div className="bg-slate-800/40 rounded-2xl p-6 border border-slate-600/30">
                        <div className="flex items-start justify-between">
                            <div className="flex items-start gap-4">
                                <div className="relative">
                                    <img
                                        src={formData.form.selectedGuide?.images?.[0]?.url || '/default-guide.jpg'}
                                        alt={formData.form.selectedGuide?.name}
                                        className="w-20 h-20 rounded-2xl object-cover border-2 border-teal-500/50"
                                    />
                                    {formData.form?.selectedGuide?.status === 'active' && (
                                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-slate-800"></div>
                                    )}
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-white font-bold text-xl mb-2">{formData.form?.selectedGuide?.name}</h3>

                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="flex items-center gap-1">
                                            <Star size={16} className="text-yellow-400 fill-current" />
                                            <span className="text-yellow-400 font-semibold text-sm">{formData.form?.selectedGuide?.rate || '0'}</span>
                                            <span className="text-slate-400 text-sm">({formData.form?.selectedGuide?.stars_count || 0} ★)</span>
                                        </div>
                                        <div className="w-1 h-1 bg-slate-500 rounded-full"></div>
                                        <span className="text-slate-300 text-sm">{formData.form?.selectedGuide?.reviewer_count || 0} reviews</span>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 mb-3">
                                        <div className="bg-slate-700/30 rounded-lg p-3">
                                            <span className="text-slate-400 text-xs block">Base Salary</span>
                                            <p className="text-teal-300 font-bold text-lg">${formData.form?.selectedGuide?.const_salary}</p>
                                        </div>
                                        <div className="bg-slate-700/30 rounded-lg p-3">
                                            <span className="text-slate-400 text-xs block">Guiding service cost</span>
                                            <p className="text-white font-bold text-lg">${formData?.form?.selectedGuide?.price}</p>
                                        </div>
                                    </div>

                                    {formData.form.selectedGuide.phone && (
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="text-teal-400">📞</span>
                                            <span className="text-slate-300 text-sm">{formData.form?.selectedGuide?.phone}</span>
                                        </div>
                                    )}

                                    {formData.form.selectedGuide?.email && (
                                        <div className="flex items-center gap-2 mb-3">
                                            <span className="text-teal-400">✉️</span>
                                            <span className="text-slate-300 text-sm">{formData.form.selectedGuide?.email}</span>
                                        </div>
                                    )}

                                    {formData.form.selectedGuide?.languages && formData.form.selectedGuide?.languages?.length > 0 && (
                                        <div className="mb-3">
                                            <span className="text-slate-400 text-xs block mb-1">Languages:</span>
                                            <div className="flex flex-wrap gap-1">
                                                {formData.form.selectedGuide?.languages.map(lang => (
                                                    <span key={lang.id} className="px-2 py-1 bg-teal-600/20 text-teal-300 text-xs rounded-lg border border-teal-500/30">
                                                        {lang.name}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {formData.form.selectedGuide?.categories && formData.form.selectedGuide?.categories?.length > 0 && (
                                        <div className="mb-3">
                                            <span className="text-slate-400 text-xs block mb-1">Specialties:</span>
                                            <div className="flex flex-wrap gap-1">
                                                {formData.form.selectedGuide?.categories?.map(category => (
                                                    <span key={category.id} className="px-2 py-1 bg-slate-700/50 text-slate-300 text-xs rounded-lg">
                                                        {category.name}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {formData.form.selectedGuide?.description && (
                                        <div>
                                            <span className="text-slate-400 text-xs block mb-1">About:</span>
                                            <p className="text-slate-300 text-sm line-clamp-3 leading-relaxed">{formData.form?.selectedGuide?.description}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <button
                                onClick={() => handleInputChange('selectedGuide',{
                                    id: '',
                                    name: '',
                                    images: [],
                                    languages: [],
                                    categories: [],
                                    rate: '',
                                    const_salary: '',
                                    price: '',
                                    phone: '',
                                    email: '',
                                    description: '',
                                    status: '',
                                    stars_count: 0,
                                    reviewer_count: 0
                                })}
                                className="text-red-400 hover:text-red-300 transition-colors duration-200 ml-4"
                            >
                                <X size={20} />
                            </button>
                        </div>
                    </div>
                ) : (
                    <button
                        onClick={() => isCitySelected && setShowGuideModal(true)}
                        disabled={!isCitySelected}
                        className={`w-full p-8 border-2 border-dashed rounded-2xl text-center transition-all duration-300 ${
                            isCitySelected
                                ? 'border-slate-600/50 hover:border-teal-500/50 hover:bg-teal-900/10 cursor-pointer'
                                : 'border-slate-700/30 cursor-not-allowed bg-slate-800/20'
                        }`}
                    >
                        <User size={32} className={`mx-auto mb-3 ${isCitySelected ? 'text-teal-400' : 'text-slate-600'}`} />
                        <p className={`font-semibold text-lg mb-2 ${isCitySelected ? 'text-white' : 'text-slate-500'}`}>Select Guide</p>
                        <p className={`${isCitySelected ? 'text-slate-400' : 'text-slate-600'}`}>
                            {isCitySelected ? 'Click to select guide from the list' : 'Select a city first to choose a guide'}
                        </p>
                    </button>
                )}
                {formData.errors?.selectedGuide&& <p className="text-red-500 text-sm ml-3 mt-2 ">Field is required</p>}
            </div>
            {/* Tour Guide Selection Modal */}
            {showGuideModal && isCitySelected && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-lg border border-slate-700/50 rounded-2xl p-8 max-w-4xl w-full max-h-[80vh] overflow-y-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-2xl font-bold text-white">Selecting a tour guide</h3>
                            <button
                                onClick={() => setShowGuideModal(false)}
                                className="text-slate-400 hover:text-white transition-colors duration-200"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Search */}
                        <div className="relative mb-6">
                            <Search size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search for a tour guide..."
                                value={guideSearch}
                                onChange={(e) => setGuideSearch(e.target.value)}
                                className="w-full pl-12 pr-4 py-4 bg-slate-800/80 border border-slate-600/50 rounded-2xl text-white placeholder-slate-400/70 focus:outline-none focus:border-teal-500"
                            />
                        </div>

                        {/* Guides Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {filteredGuides.map(guide => (
                                <div
                                    key={guide.id}
                                    onClick={() => selectGuide(guide)}
                                    className="bg-slate-800/40 border border-slate-600/30 hover:border-teal-500/50 rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:scale-105"
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="relative">
                                            <img
                                                src={guide.images?.[0]?.url || '/default-guide.jpg'}
                                                alt={guide?.name}
                                                className="w-16 h-16 rounded-2xl object-cover border-2 border-teal-500/30"
                                            />
                                            {guide?.status === 'active' && (
                                                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-slate-800"></div>
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="text-white font-bold text-lg mb-1 truncate">{guide.name}</h4>

                                            <div className="flex items-center gap-2 mb-2">
                                                <div className="flex items-center gap-1">
                                                    <Star size={14} className="text-yellow-400 fill-current" />
                                                    <span className="text-yellow-400 font-semibold text-sm">{guide.rate || '0'}</span>
                                                    <span className="text-slate-400 text-xs">({guide.stars_count || 0}★)</span>
                                                </div>
                                                <div className="w-1 h-1 bg-slate-500 rounded-full"></div>
                                                <span className="text-slate-400 text-xs">{guide.reviewer_count || 0} reviews</span>
                                            </div>

                                            <div className="flex items-center justify-between mb-2">
                                                <div>
                                                    <span className="text-slate-400 text-xs">Base: </span>
                                                    <span className="text-teal-300 text-sm font-medium">${guide.const_salary}</span>
                                                </div>
                                                <div className="text-right">
                                                    <span className="text-slate-400 text-xs block">Total</span>
                                                    <span className="text-white text-sm font-bold">${guide.price}</span>
                                                </div>
                                            </div>

                                            {guide.phone && (
                                                <p className="text-slate-400 text-xs mb-2 flex items-center gap-1">
                                                    <span>📞</span> {guide.phone}
                                                </p>
                                            )}

                                            {guide.email && (
                                                <p className="text-slate-400 text-xs mb-2 flex items-center gap-1 truncate">
                                                    <span>✉️</span> {guide.email}
                                                </p>
                                            )}

                                            {guide.languages && guide.languages.length > 0 && (
                                                <div className="mb-2">
                                                    <div className="flex flex-wrap gap-1">
                                                        {guide.languages.slice(0, 2).map(lang => (
                                                            <span key={lang.id} className="px-2 py-1 bg-teal-600/20 text-teal-300 text-xs rounded-lg border border-teal-500/30">
                                                                {lang.name}
                                                            </span>
                                                        ))}
                                                        {guide.languages.length > 2 && (
                                                            <span className="px-2 py-1 bg-slate-600/50 text-slate-300 text-xs rounded-lg">
                                                                +{guide.languages.length - 2} more
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            )}

                                            {guide.categories && guide.categories.length > 0 && (
                                                <div className="mb-2">
                                                    <div className="flex flex-wrap gap-1">
                                                        {guide.categories.slice(0, 2).map(category => (
                                                            <span key={category.id} className="px-2 py-1 bg-slate-700/50 text-slate-300 text-xs rounded-lg">
                                                                {category.name}
                                                            </span>
                                                        ))}
                                                        {guide.categories.length > 2 && (
                                                            <span className="px-2 py-1 bg-slate-700/50 text-slate-300 text-xs rounded-lg">
                                                                +{guide.categories.length - 2}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            )}

                                            {guide.description && (
                                                <p className="text-slate-400 text-xs line-clamp-2 mt-1">{guide.description}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}