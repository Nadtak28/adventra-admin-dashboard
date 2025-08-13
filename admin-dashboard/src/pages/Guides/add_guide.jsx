import React, { useState } from 'react';
import {User, Mail, Phone, DollarSign, MapPin, Globe, Tag, Save, X, Plus, Check, ArrowLeft, Eye} from 'lucide-react';
import {useNavigate} from "react-router-dom";

export default function TourGuideForm() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        salary: '',
        city: '',
        languages: [],
        categories: []
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const cities = [
        'Riyadh',         // Saudi Arabia
        'Cairo',          // Egypt
        'Dubai',          // UAE
        'Paris',          // France
        'London',         // United Kingdom
        'New York',       // United States
        'Tokyo',          // Japan
        'Seoul',          // South Korea
        'Berlin',         // Germany
        'Barcelona',      // Spain
        'Rome',           // Italy
        'Istanbul',       // Turkey
        'Toronto',        // Canada
        'Sydney',         // Australia
        'São Paulo',      // Brazil
        'Bangkok',        // Thailand
        'Kuala Lumpur',   // Malaysia
        'Singapore',      // Singapore
        'Cape Town',      // South Africa
        'Amsterdam'       // Netherlands
    ];

    const availableLanguages = [
        'Arabic',
        'English',
        'French',
        'German',
        'Italian',
        'Spanish',
        'Russian',
        'Japanese',
        'Chinese',
        'Turkish'
    ];

    const tourismCategories = [
        'Religious',
        'Cultural',
        'Heritage',
        'Nature',
        'Beach',
        'Wellness',
        'Sports',
        'Business'
    ];


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const toggleSelection = (item, field) => {
        setFormData(prev => ({
            ...prev,
            [field]: prev[field].includes(item)
                ? prev[field].filter(i => i !== item)
                : [...prev[field], item]
        }));
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) newErrors.name = 'name required';
        if (!formData.email.trim()) newErrors.email = 'email required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'email is invalid';
        if (!formData.phone.trim()) newErrors.phone = 'phone required';
        if (!formData.salary.trim()) newErrors.salary = 'salary required';
        if (!formData.city) newErrors.city = 'city required';
        if (formData.languages.length === 0) newErrors.languages = 'should select one language at least';
        if (formData.categories.length === 0) newErrors.categories = 'should select one category at least';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsSubmitting(true);

        // Simulate API call
        setTimeout(() => {
            console.log('Tour Guide Data:', formData);
            alert('Guide Added Successfully!');
            setIsSubmitting(false);
            // Reset form
            setFormData({
                name: '',
                email: '',
                phone: '',
                salary: '',
                city: '',
                languages: [],
                categories: []
            });
        }, 2000);
    };

    const resetForm = () => {
        setFormData({
            name: '',
            email: '',
            phone: '',
            salary: '',
            city: '',
            languages: [],
            categories: []
        });
        setErrors({});
    };

    return (
        <div className="relative space-y-6 bg-[#0b1520] min-h-screen -m-6 p-6">
            {/* Enhanced background effects */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-teal-900/30 via-slate-800/10 to-transparent"></div>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-slate-800/40 via-transparent to-transparent"></div>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-teal-900/5 to-transparent"></div>

            <div className="layout-container flex h-full grow flex-col relative z-10">
                <div className="gap-1 px-6 flex flex-1 justify-center py-5">
                    <div className="layout-content-container flex flex-col max-w-[900px] flex-1">

                        {/* Header */}
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-4">
                                <button className="group flex items-center justify-center w-12 h-12 rounded-2xl bg-slate-800/80 backdrop-blur-sm border border-slate-700/50 hover:border-teal-500/50 text-slate-400 hover:text-white transition-all duration-300 hover:scale-105"
                                        onClick={()=>navigate("/dashboard/guides")}>
                                    <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform duration-300" />
                                </button>
                                <div>
                                    <h1 className="text-3xl font-bold text-white mb-2">Add New Guide</h1>
                                    <p className="text-slate-400">Add guide info</p>
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
                                    Add the guide
                                </button>
                            </div>
                        </div>

                        {/* Form */}
                        <div className="px-4 space-y-8">
                            <div className="bg-gradient-to-br from-slate-800/60 to-slate-900/80 backdrop-blur-sm border border-slate-700/50 shadow-2xl rounded-2xl p-8">

                                {/* Basic Information */}
                                <div className="mb-8">
                                    <h2 className="text-white text-xl font-semibold mb-6 flex items-center gap-3">
                                        <User size={20} className="text-teal-400" />
                                        Info
                                    </h2>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* Name */}
                                        <div className="space-y-2">
                                            <label className="text-white text-sm font-semibold">Full Name</label>
                                            <div className="relative">
                                                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-teal-400">
                                                    <User size={18} />
                                                </div>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleInputChange}
                                                    placeholder="Insert guide full name"
                                                    className={`w-full pl-12 pr-4 py-4 bg-slate-800/80 backdrop-blur-sm border rounded-2xl text-white focus:outline-none transition-all duration-300 ${
                                                        errors.name
                                                            ? 'border-red-500 focus:border-red-400'
                                                            : 'border-slate-600/50 hover:border-slate-500/70 focus:border-teal-500'
                                                    }`}
                                                />
                                            </div>
                                            {errors.name && <p className="text-red-400 text-sm">{errors.name}</p>}
                                        </div>

                                        {/* Email */}
                                        <div className="space-y-2">
                                            <label className="text-white text-sm font-semibold">Email</label>
                                            <div className="relative">
                                                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-teal-400">
                                                    <Mail size={18} />
                                                </div>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleInputChange}
                                                    placeholder="example@email.com"
                                                    className={`w-full pl-12 pr-4 py-4 bg-slate-800/80 backdrop-blur-sm border rounded-2xl text-white focus:outline-none transition-all duration-300 ${
                                                        errors.email
                                                            ? 'border-red-500 focus:border-red-400'
                                                            : 'border-slate-600/50 hover:border-slate-500/70 focus:border-teal-500'
                                                    }`}
                                                />
                                            </div>
                                            {errors.email && <p className="text-red-400 text-sm">{errors.email}</p>}
                                        </div>

                                        {/* Phone */}
                                        <div className="space-y-2">
                                            <label className="text-white text-sm font-semibold">Phone</label>
                                            <div className="relative">
                                                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-teal-400">
                                                    <Phone size={18} />
                                                </div>
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleInputChange}
                                                    placeholder="+10 215 111 555"
                                                    className={`w-full pl-12 pr-4 py-4 bg-slate-800/80 backdrop-blur-sm border rounded-2xl text-white focus:outline-none transition-all duration-300 ${
                                                        errors.phone
                                                            ? 'border-red-500 focus:border-red-400'
                                                            : 'border-slate-600/50 hover:border-slate-500/70 focus:border-teal-500'
                                                    }`}
                                                />
                                            </div>
                                            {errors.phone && <p className="text-red-400 text-sm">{errors.phone}</p>}
                                        </div>

                                        {/* Salary */}
                                        <div className="space-y-2">
                                            <label className="text-white text-sm font-semibold">Salary</label>
                                            <div className="relative">
                                                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-teal-400">
                                                    <DollarSign size={18} />
                                                </div>
                                                <input
                                                    type="number"
                                                    name="salary"
                                                    value={formData.salary}
                                                    onChange={handleInputChange}
                                                    placeholder="5000"
                                                    min={0}
                                                    className={`w-full pl-12 pr-4 py-4 bg-slate-800/80 backdrop-blur-sm border rounded-2xl text-white focus:outline-none transition-all duration-300 ${
                                                        errors.salary
                                                            ? 'border-red-500 focus:border-red-400'
                                                            : 'border-slate-600/50 hover:border-slate-500/70 focus:border-teal-500'
                                                    }`}
                                                />
                                            </div>
                                            {errors.salary && <p className="text-red-400 text-sm">{errors.salary}</p>}
                                        </div>
                                    </div>
                                </div>

                                {/* City Selection */}
                                <div className="mb-8">
                                    <h2 className="text-white text-xl font-semibold mb-6 flex items-center gap-3">
                                        <MapPin size={20} className="text-teal-400" />
                                        City
                                    </h2>

                                    <div className="space-y-2">
                                        <div className="relative">
                                            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-teal-400 z-10">
                                                <MapPin size={18} />
                                            </div>
                                            <select
                                                name="city"
                                                value={formData.city}
                                                onChange={handleInputChange}
                                                className={`w-full pl-12 pr-4 py-4 bg-slate-800/80 backdrop-blur-sm border rounded-2xl text-white focus:outline-none transition-all duration-300 appearance-none cursor-pointer [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${
                                                    errors.city
                                                        ? 'border-red-500 focus:border-red-400'
                                                        : 'border-slate-600/50 hover:border-slate-500/70 focus:border-teal-500'
                                                }`}
                                            >
                                                <option value="">Select city</option>
                                                {cities.map(city => (
                                                    <option key={city} value={city} className="bg-slate-800 text-white">
                                                        {city}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        {errors.city && <p className="text-red-400 text-sm">{errors.city}</p>}
                                    </div>
                                </div>

                                {/* Languages */}
                                <div className="mb-8">
                                    <h2 className="text-white text-xl font-semibold mb-6 flex items-center gap-3">
                                        <Globe size={20} className="text-teal-400" />
                                        Languages
                                    </h2>

                                    <div className="space-y-2">
                                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                                            {availableLanguages.map(language => (
                                                <button
                                                    key={language}
                                                    type="button"
                                                    onClick={() => toggleSelection(language, 'languages')}
                                                    className={`p-3 rounded-xl border text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
                                                        formData.languages.includes(language)
                                                            ? 'bg-gradient-to-r from-teal-600 to-teal-700 border-teal-500 text-white shadow-lg shadow-teal-500/25'
                                                            : 'bg-slate-800/60 border-slate-600/50 text-slate-300 hover:border-teal-500/50 hover:bg-slate-700/60'
                                                    }`}
                                                >
                                                    {formData.languages.includes(language) && <Check size={14} />}
                                                    {language}
                                                </button>
                                            ))}
                                        </div>
                                        {errors.languages && <p className="text-red-400 text-sm">{errors.languages}</p>}
                                    </div>
                                </div>

                                {/* Categories */}
                                <div className="mb-8">
                                    <h2 className="text-white text-xl font-semibold mb-6 flex items-center gap-3">
                                        <Tag size={20} className="text-teal-400" />
                                        Categories
                                    </h2>

                                    <div className="space-y-2">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            {tourismCategories.map(category => (
                                                <button
                                                    key={category}
                                                    type="button"
                                                    onClick={() => toggleSelection(category, 'categories')}
                                                    className={`p-4 rounded-xl border text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
                                                        formData.categories.includes(category)
                                                            ? 'bg-gradient-to-r from-teal-600 to-teal-700 border-teal-500 text-white shadow-lg shadow-teal-500/25'
                                                            : 'bg-slate-800/60 border-slate-600/50 text-slate-300 hover:border-teal-500/50 hover:bg-slate-700/60'
                                                    }`}
                                                >
                                                    {formData.categories.includes(category) && <Check size={16} />}
                                                    {category}
                                                </button>
                                            ))}
                                        </div>
                                        {errors.categories && <p className="text-red-400 text-sm">{errors.categories}</p>}
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-slate-700/30">
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="group flex-1 flex items-center justify-center gap-3 py-4 px-6 bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-500 hover:to-teal-600 text-white font-semibold rounded-2xl shadow-xl shadow-teal-500/25 hover:shadow-teal-500/40 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                                Pending...
                                            </>
                                        ) : (
                                            <>
                                                <Save size={20} className="group-hover:rotate-12 transition-transform duration-300" />
                                                Add Guide
                                            </>
                                        )}
                                    </button>

                                    <button
                                        type="button"
                                        onClick={resetForm}
                                        className="group flex items-center justify-center gap-3 py-4 px-6 bg-slate-700/60 hover:bg-slate-600/60 text-white font-semibold rounded-2xl border border-slate-600/50 hover:border-slate-500/70 transition-all duration-300 hover:scale-105"
                                    >
                                        <X size={20} className="group-hover:rotate-90 transition-transform duration-300" />
                                        Clear
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}