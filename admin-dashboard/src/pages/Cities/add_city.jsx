import React, { useState } from 'react';
import { ArrowLeft, Upload, X, Plus, Globe, MapPin, Languages, FileText, Image, Video, Save, Eye, Star } from 'lucide-react';
import {useNavigate} from "react-router-dom";
import AddMedia from "../../features/all/components/add_media.jsx";

export default function AddCity() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        nameAr: '',
        nameEn: '',
        country: '',
        descriptionAr: '',
        descriptionEn: '',
        language:'',
        images: [],
        videos: []
    });

    const countries = [
        'Saudi Arabia', 'United Arab Emirates', 'Egypt', 'Jordan', 'Lebanon',
        'Syria', 'Iraq', 'Kuwait', 'Qatar', 'Bahrain', 'Oman', 'Yemen', 'Morocco',
        'Algeria', 'Tunisia', 'Libya', 'Sudan', 'Palestine', 'France', 'Italy',
        'Spain', 'Germany', 'United Kingdom', 'United States', 'Japan'
    ];

    const availableLanguages = [
        'Arabic', 'English', 'French', 'German', 'Spanish', 'Italian',
        'Russian', 'Chinese', 'Japanese', 'Korean', 'Turkish', 'Persian'
    ];


    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleLanguageToggle = (language) => {
        setFormData(prev => ({
            ...prev,
            language: language
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        // هنا يمكنك إضافة منطق إرسال البيانات
    };

    return (
        <div className="relative min-h-screen bg-[#0b1520] -m-6 p-6">
            {/* Enhanced background effects */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-teal-900/30 via-slate-800/10 to-transparent"></div>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-slate-800/40 via-transparent to-transparent"></div>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-teal-900/5 to-transparent"></div>

            <div className="relative z-10 max-w-4xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <button className="group flex items-center justify-center w-12 h-12 rounded-2xl bg-slate-800/80 backdrop-blur-sm border border-slate-700/50 hover:border-teal-500/50 text-slate-400 hover:text-white transition-all duration-300 hover:scale-105"
                        onClick={()=>{navigate('/dashboard/cities')}}>
                            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform duration-300" />
                        </button>
                        <div>
                            <h1 className="text-3xl font-bold text-white mb-2">Add New City</h1>
                            <p className="text-slate-400">add city info and media</p>
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <button className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-slate-800/80 backdrop-blur-sm border border-slate-700/50 hover:border-slate-600/70 text-slate-300 hover:text-white transition-all duration-300 hover:scale-105">
                            <Eye size={18} />
                            View
                        </button>
                        <button
                            onClick={handleSubmit}
                            className="group flex items-center gap-2 px-8 py-3 rounded-2xl bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-500 hover:to-teal-600 text-white font-semibold shadow-xl shadow-teal-500/25 hover:shadow-teal-500/40 transition-all duration-300 hover:scale-105"
                        >
                            <Save size={18} className="group-hover:scale-110 transition-transform duration-300" />
                            Add the city
                        </button>
                    </div>
                </div>

                <div className="space-y-8">
                    {/* Basic Information */}
                    <div className="bg-gradient-to-br from-slate-800/60 to-slate-900/80 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 shadow-2xl">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 rounded-xl bg-teal-600/20 border border-teal-500/30">
                                <Globe size={24} className="text-teal-400" />
                            </div>
                            <h2 className="text-2xl font-bold text-white">City info</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Country Selection */}
                            <div className="space-y-3">
                                <label className="flex items-center gap-2 text-white font-semibold">
                                    <MapPin size={18} className="text-teal-400" />
                                    County
                                </label>
                                <select
                                    value={formData.country}
                                    onChange={(e) => handleInputChange('country', e.target.value)}
                                    className="w-full p-4 bg-slate-800/80 backdrop-blur-sm border border-slate-600/50 hover:border-slate-500/70 rounded-2xl text-white focus:outline-none focus:border-teal-500 shadow-lg transition-all duration-300"
                                    required
                                >
                                    <option value="">Select the county</option>
                                    {countries.map(country => (
                                        <option key={country} value={country}>{country}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Empty space for layout */}
                            <div></div>

                            {/* Arabic Name */}
                            <div className="space-y-3">
                                <label className="text-white font-semibold">اسم المدينة</label>
                                <input
                                    type="text"
                                    value={formData.nameAr}
                                    onChange={(e) => handleInputChange('nameAr', e.target.value)}
                                    placeholder="مثال: الرياض"
                                    className="w-full p-4 bg-slate-800/80 backdrop-blur-sm border border-slate-600/50 hover:border-slate-500/70 rounded-2xl text-white placeholder-slate-400/70 focus:outline-none focus:border-teal-500 shadow-lg transition-all duration-300"
                                    required
                                    dir="rtl"
                                />
                            </div>

                            {/* English Name */}
                            <div className="space-y-3">
                                <label className="text-white font-semibold">City name</label>
                                <input
                                    type="text"
                                    value={formData.nameEn}
                                    onChange={(e) => handleInputChange('nameEn', e.target.value)}
                                    placeholder="Example: Riyadh"
                                    className="w-full p-4 bg-slate-800/80 backdrop-blur-sm border border-slate-600/50 hover:border-slate-500/70 rounded-2xl text-white placeholder-slate-400/70 focus:outline-none focus:border-teal-500 shadow-lg transition-all duration-300"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* Descriptions */}
                    <div className="bg-gradient-to-br from-slate-800/60 to-slate-900/80 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 shadow-2xl">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 rounded-xl bg-teal-600/20 border border-teal-500/30">
                                <FileText size={24} className="text-teal-400" />
                            </div>
                            <h2 className="text-2xl font-bold text-white">Description</h2>
                        </div>

                        <div className="space-y-6">
                            {/* Arabic Description */}
                            <div className="space-y-3">
                                <label className="text-white font-semibold">وصف المدينة</label>
                                <textarea
                                    value={formData.descriptionAr}
                                    onChange={(e) => handleInputChange('descriptionAr', e.target.value)}
                                    placeholder="اكتب وصفاً مفصلاً عن المدينة..."
                                    rows={4}
                                    className="w-full p-4 bg-slate-800/80 backdrop-blur-sm border border-slate-600/50 hover:border-slate-500/70 rounded-2xl text-white placeholder-slate-400/70 focus:outline-none focus:border-teal-500 shadow-lg transition-all duration-300 resize-none"
                                    required
                                    dir="rtl"
                                />
                            </div>

                            {/* English Description */}
                            <div className="space-y-3">
                                <label className="text-white font-semibold">City description</label>
                                <textarea
                                    value={formData.descriptionEn}
                                    onChange={(e) => handleInputChange('descriptionEn', e.target.value)}
                                    placeholder="Write a detailed description of the city..."
                                    rows={4}
                                    className="w-full p-4 bg-slate-800/80 backdrop-blur-sm border border-slate-600/50 hover:border-slate-500/70 rounded-2xl text-white placeholder-slate-400/70 focus:outline-none focus:border-teal-500 shadow-lg transition-all duration-300 resize-none"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* Languages */}
                    <div className="bg-gradient-to-br from-slate-800/60 to-slate-900/80 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 shadow-2xl">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 rounded-xl bg-teal-600/20 border border-teal-500/30">
                                <Languages size={24} className="text-teal-400" />
                            </div>
                            <h2 className="text-2xl font-bold text-white">Language</h2>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {availableLanguages.map(language => (
                                <button
                                    key={language}
                                    type="button"
                                    onClick={() => handleLanguageToggle(language)}
                                    className={`
                                        p-4 rounded-2xl border-2 transition-all duration-300 font-semibold text-sm
                                        ${language===formData.language
                                        ? 'bg-gradient-to-r from-teal-600/80 to-teal-700/80 border-teal-500 text-white shadow-lg shadow-teal-500/20 scale-105'
                                        : 'bg-slate-800/60 border-slate-600/50 text-slate-300 hover:border-teal-500/50 hover:text-white hover:scale-105'
                                    }
                                    `}
                                >
                                    {language}
                                </button>
                            ))}
                        </div>

                        {formData.language && (
                            <div className="mt-4 p-4 bg-teal-900/20 border border-teal-500/30 rounded-xl">
                                <p className="text-teal-300 text-sm">
                                    Language: {formData.language}
                                </p>
                            </div>
                        )}
                    </div>

                    <AddMedia formData={formData} setFormData={setFormData} />

                    {/* Submit Button */}
                    <div className="flex justify-center pt-6">
                        <button
                            type="submit"
                            className="group flex items-center gap-3 px-12 py-4 rounded-2xl bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-500 hover:to-teal-600 text-white font-bold text-lg shadow-2xl shadow-teal-500/30 hover:shadow-teal-500/50 transition-all duration-300 hover:scale-105"
                        >
                            <Save size={24} className="group-hover:scale-110 transition-transform duration-300" />
                            Add the city
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}