import {Search, Star, User, X} from "lucide-react";
import React, {useState} from "react";

export default function Guide({formData,handleInputChange}) {
    const [showGuideModal, setShowGuideModal] = useState(false);
    const [guideSearch, setGuideSearch] = useState('');
    const tourGuides = [
        {
            id: 1,
            name: 'أحمد محمد',
            nameEn: 'Ahmed Mohamed',
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
            languages: ['العربية', 'الإنجليزية', 'الفرنسية'],
            rating: 4.8,
            experience: '5 سنوات',
            specialties: ['التاريخ', 'الثقافة']
        },
        {
            id: 2,
            name: 'فاطمة العلي',
            nameEn: 'Fatima Al-Ali',
            image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
            languages: ['العربية', 'الإنجليزية'],
            rating: 4.9,
            experience: '7 سنوات',
            specialties: ['الطبيعة', 'المغامرة']
        },
        {
            id: 3,
            name: 'خالد السعد',
            nameEn: 'Khalid Al-Saad',
            image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
            languages: ['العربية', 'الإنجليزية', 'الألمانية', 'الإسبانية'],
            rating: 4.7,
            experience: '10 سنوات',
            specialties: ['الآثار', 'الفن']
        }
    ];
    const filteredGuides = tourGuides.filter(guide =>
        guide.name.toLowerCase().includes(guideSearch.toLowerCase()) ||
        guide.nameEn.toLowerCase().includes(guideSearch.toLowerCase())
    );

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

                {formData.form.selectedGuide.id ? (
                    <div className="bg-slate-800/40 rounded-2xl p-6 border border-slate-600/30">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <img
                                    src={formData.form.selectedGuide.image}
                                    alt={formData.form.selectedGuide.name}
                                    className="w-16 h-16 rounded-2xl object-cover border-2 border-teal-500/50"
                                />
                                <div>
                                    <h3 className="text-white font-bold text-lg">{formData.form.selectedGuide.name}</h3>
                                    <p className="text-slate-300 text-sm">{formData.form.selectedGuide.nameEn}</p>
                                    <div className="flex items-center gap-2 mt-1">
                                        <Star size={14} className="text-yellow-400 fill-current" />
                                        <span className="text-yellow-400 font-semibold text-sm">{formData.form.selectedGuide.rating}</span>
                                        <span className="text-slate-400 text-sm">• {formData.form.selectedGuide.experience}</span>
                                    </div>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {formData.form.selectedGuide.languages.map(lang => (
                                            <span key={lang} className="px-2 py-1 bg-teal-600/20 text-teal-300 text-xs rounded-lg border border-teal-500/30">
                                                            {lang}
                                                        </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => handleInputChange('selectedGuide',{})}
                                className="text-red-400 hover:text-red-300 transition-colors duration-200"
                            >
                                <X size={20} />
                            </button>
                        </div>
                    </div>
                ) : (
                    <button
                        onClick={() => setShowGuideModal(true)}
                        className="w-full p-8 border-2 border-dashed border-slate-600/50 hover:border-teal-500/50 rounded-2xl text-center transition-all duration-300 hover:bg-teal-900/10"
                    >
                        <User size={32} className="text-teal-400 mx-auto mb-3" />
                        <p className="text-white font-semibold text-lg mb-2">Select Guide</p>
                        <p className="text-slate-400">Click to select guide from the list</p>
                    </button>
                    )}
                    {formData.errors.selectedGuide&& <p className="text-red-500 text-sm ml-3 mt-2 ">Field is required</p>}
            </div>
            {/* Tour Guide Selection Modal */}
            {showGuideModal && (
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
                                placeholder="search for a tour guide..."
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
                                        <img
                                            src={guide.image}
                                            alt={guide.name}
                                            className="w-16 h-16 rounded-2xl object-cover border-2 border-teal-500/30"
                                        />
                                        <div className="flex-1">
                                            <h4 className="text-white font-bold text-lg">{guide.name}</h4>
                                            <p className="text-slate-300 text-sm mb-2">{guide.nameEn}</p>
                                            <div className="flex items-center gap-2 mb-2">
                                                <Star size={14} className="text-yellow-400 fill-current" />
                                                <span className="text-yellow-400 font-semibold text-sm">{guide.rating}</span>
                                                <span className="text-slate-400 text-sm">• {guide.experience}</span>
                                            </div>
                                            <div className="flex flex-wrap gap-1 mb-2">
                                                {guide.languages.map(lang => (
                                                    <span key={lang} className="px-2 py-1 bg-teal-600/20 text-teal-300 text-xs rounded-lg border border-teal-500/30">
                                                                {lang}
                                                            </span>
                                                ))}
                                            </div>
                                            <div className="flex flex-wrap gap-1">
                                                {guide.specialties.map(specialty => (
                                                    <span key={specialty} className="px-2 py-1 bg-slate-700/50 text-slate-300 text-xs rounded-lg">
                                                                {specialty}
                                                            </span>
                                                ))}
                                            </div>
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