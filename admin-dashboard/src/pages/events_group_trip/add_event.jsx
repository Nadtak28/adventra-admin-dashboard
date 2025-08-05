import React, { useState } from 'react';
import { ArrowLeft, Upload, X, Plus, Calendar, MapPin, DollarSign, FileText, Image, Video, Save, Eye, Star, Users, Tag } from 'lucide-react';
import AddMedia from '../../features/all/components/add_media.jsx';
import {useNavigate} from "react-router-dom";
export default function AddEvent() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        nameEn: '',
        nameAr: '',
        descriptionEn: '',
        descriptionAr: '',
        ticketPrice: '',
        userPrice: '',
        eventType: '',
        city: '',
        maxTickets: '',
        images: [],
        videos: []
    });

    const eventTypes = [
        'Cultural', 'Sports', 'Entertainment', 'Educational', 'Artistic', 'Musical',
        'Theatrical', 'Commercial', 'Technological', 'Food & Drink', 'Health & Fitness',
        'Kids & Family', 'Business & Careers', 'Touristic', 'Religious', 'Charitable'
    ];


    const cities = [
        'Riyadh', 'Jeddah', 'Makkah', 'Madinah', 'Dammam',
        'Khobar', 'Tabuk', 'Buraidah', 'Khamis Mushait', 'Hail', 'Majmaah',
        'Taif', 'Jubail', 'Najran', 'Al Baha', 'Yanbu', 'Qatif',
        'Al Ahsa', 'Arar', 'Sakaka', 'Abha', 'Jazan'
    ];


    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = () => {
        console.log('Event submitted:', formData);
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
                        onClick={()=>navigate("/dashboard/event_grouptrip")}>
                            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform duration-300" />
                        </button>
                        <div>
                            <h1 className="text-3xl font-bold text-white mb-2">Add New Event</h1>
                            <p className="text-slate-400">Add event info and media</p>
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
                            Add the event
                        </button>
                    </div>
                </div>

                <div className="space-y-8">
                    {/* Basic Information */}
                    <div className="bg-gradient-to-br from-slate-800/60 to-slate-900/80 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 shadow-2xl">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 rounded-xl bg-teal-600/20 border border-teal-500/30">
                                <Calendar size={24} className="text-teal-400" />
                            </div>
                            <h2 className="text-2xl font-bold text-white">Event Info</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Arabic Name */}
                            <div className="space-y-3">
                                <label className="text-white font-semibold">اسم الفعالية</label>
                                <input
                                    type="text"
                                    value={formData.nameAr}
                                    onChange={(e) => handleInputChange('nameAr', e.target.value)}
                                    placeholder="مثال: مهرجان الرياض للطعام"
                                    className="w-full p-4 bg-slate-800/80 backdrop-blur-sm border border-slate-600/50 hover:border-slate-500/70 rounded-2xl text-white placeholder-slate-400/70 focus:outline-none focus:border-teal-500 shadow-lg transition-all duration-300"
                                    required
                                    dir="rtl"
                                />
                            </div>

                            {/* English Name */}
                            <div className="space-y-3">
                                <label className="text-white font-semibold">Event name</label>
                                <input
                                    type="text"
                                    value={formData.nameEn}
                                    onChange={(e) => handleInputChange('nameEn', e.target.value)}
                                    placeholder="Example: Riyadh Food Festival"
                                    className="w-full p-4 bg-slate-800/80 backdrop-blur-sm border border-slate-600/50 hover:border-slate-500/70 rounded-2xl text-white placeholder-slate-400/70 focus:outline-none focus:border-teal-500 shadow-lg transition-all duration-300"
                                    required
                                />
                            </div>

                            {/* Event Type */}
                            <div className="space-y-3">
                                <label className="flex items-center gap-2 text-white font-semibold">
                                    <Tag size={18} className="text-teal-400" />
                                    Category
                                </label>
                                <select
                                    value={formData.eventType}
                                    onChange={(e) => handleInputChange('eventType', e.target.value)}
                                    className="w-full p-4 bg-slate-800/80 backdrop-blur-sm border border-slate-600/50 hover:border-slate-500/70 rounded-2xl text-white focus:outline-none focus:border-teal-500 shadow-lg transition-all duration-300"
                                    required
                                >
                                    <option value="">Select Event category</option>
                                    {eventTypes.map(type => (
                                        <option key={type} value={type}>{type}</option>
                                    ))}
                                </select>
                            </div>

                            {/* City Selection */}
                            <div className="space-y-3">
                                <label className="flex items-center gap-2 text-white font-semibold">
                                    <MapPin size={18} className="text-teal-400" />
                                    City
                                </label>
                                <select
                                    value={formData.city}
                                    onChange={(e) => handleInputChange('city', e.target.value)}
                                    className="w-full p-4 bg-slate-800/80 backdrop-blur-sm border border-slate-600/50 hover:border-slate-500/70 rounded-2xl text-white focus:outline-none focus:border-teal-500 shadow-lg transition-all duration-300"
                                    required
                                >
                                    <option value="">Select city</option>
                                    {cities.map(city => (
                                        <option key={city} value={city}>{city}</option>
                                    ))}
                                </select>
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
                                <label className="text-white font-semibold">وصف الفعالية</label>
                                <textarea
                                    value={formData.descriptionAr}
                                    onChange={(e) => handleInputChange('descriptionAr', e.target.value)}
                                    placeholder="اكتب وصفاً مفصلاً عن الفعالية وما تتضمنه..."
                                    rows={4}
                                    className="w-full p-4 bg-slate-800/80 backdrop-blur-sm border border-slate-600/50 hover:border-slate-500/70 rounded-2xl text-white placeholder-slate-400/70 focus:outline-none focus:border-teal-500 shadow-lg transition-all duration-300 resize-none"
                                    required
                                    dir="rtl"
                                />
                            </div>

                            {/* English Description */}
                            <div className="space-y-3">
                                <label className="text-white font-semibold">Event Description</label>
                                <textarea
                                    value={formData.descriptionEn}
                                    onChange={(e) => handleInputChange('descriptionEn', e.target.value)}
                                    placeholder="Write a detailed description of the event..."
                                    rows={4}
                                    className="w-full p-4 bg-slate-800/80 backdrop-blur-sm border border-slate-600/50 hover:border-slate-500/70 rounded-2xl text-white placeholder-slate-400/70 focus:outline-none focus:border-teal-500 shadow-lg transition-all duration-300 resize-none"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* Pricing and Capacity */}
                    <div className="bg-gradient-to-br from-slate-800/60 to-slate-900/80 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 shadow-2xl">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 rounded-xl bg-teal-600/20 border border-teal-500/30">
                                <DollarSign size={24} className="text-teal-400" />
                            </div>
                            <h2 className="text-2xl font-bold text-white">Price</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Ticket Price */}
                            <div className="space-y-3">
                                <label className="flex items-center gap-2 text-white font-semibold">
                                    <DollarSign size={18} className="text-teal-400" />
                                    Ticket price
                                </label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        value={formData.ticketPrice}
                                        onChange={(e) => handleInputChange('ticketPrice', e.target.value)}
                                        placeholder="0"
                                        className="w-full p-4 pr-16 bg-slate-800/80 backdrop-blur-sm border border-slate-600/50 hover:border-slate-500/70 rounded-2xl text-white placeholder-slate-400/70 focus:outline-none focus:border-teal-500 shadow-lg transition-all duration-300"
                                        required
                                        min="0"

                                    />

                                </div>
                                {formData.ticketPrice && (
                                    <p className="text-teal-300 text-sm font-medium">
                                        {formData.ticketPrice}$
                                    </p>
                                )}
                            </div>

                            {/* User Price */}
                            <div className="space-y-3">
                                <label className="flex items-center gap-2 text-white font-semibold">
                                    <Users size={18} className="text-teal-400" />
                                    Ticket price for Customer
                                </label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        value={formData.userPrice}
                                        onChange={(e) => handleInputChange('userPrice', e.target.value)}
                                        placeholder="0"
                                        className="w-full p-4 pr-16 bg-slate-800/80 backdrop-blur-sm border border-slate-600/50 hover:border-slate-500/70 rounded-2xl text-white placeholder-slate-400/70 focus:outline-none focus:border-teal-500 shadow-lg transition-all duration-300"
                                        required
                                        min="0"
                                    />

                                </div>
                                {formData.userPrice && (
                                    <p className="text-teal-300 text-sm font-medium">
                                        {formData.userPrice}$
                                    </p>
                                )}
                            </div>

                            {/* Max Tickets */}
                            <div className="space-y-3">
                                <label className="flex items-center gap-2 text-white font-semibold">
                                    <Users size={18} className="text-teal-400" />
                                    Tickets limit
                                </label>
                                <input
                                    type="number"
                                    value={formData.maxTickets}
                                    onChange={(e) => handleInputChange('maxTickets', e.target.value)}
                                    placeholder="100"
                                    className="w-full p-4 bg-slate-800/80 backdrop-blur-sm border border-slate-600/50 hover:border-slate-500/70 rounded-2xl text-white placeholder-slate-400/70 focus:outline-none focus:border-teal-500 shadow-lg transition-all duration-300"
                                    required
                                    min="1"
                                />
                                {formData.maxTickets && (
                                    <p className="text-teal-300 text-sm font-medium">
                                        A maximum of {formData.maxTickets} tickets can be sold
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Profit Calculation */}
                        {formData.ticketPrice && formData.userPrice && formData.maxTickets && (
                            <div className="mt-6 p-6 bg-teal-900/20 border border-teal-500/30 rounded-xl">
                                <h3 className="text-teal-300 font-semibold text-lg mb-4">Calculating expected profits</h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                                    <div className="bg-slate-800/40 p-4 rounded-xl">
                                        <p className="text-slate-300 text-sm mb-1">Profit per ticket</p>
                                        <p className="text-white font-bold text-xl">
                                            {formData.userPrice - formData.ticketPrice}$
                                        </p>
                                    </div>
                                    <div className="bg-slate-800/40 p-4 rounded-xl">
                                        <p className="text-slate-300 text-sm mb-1">Total revenue</p>
                                        <p className="text-white font-bold text-xl">
                                            {formData.userPrice * formData.maxTickets}$
                                        </p>
                                    </div>
                                    <div className="bg-slate-800/40 p-4 rounded-xl">
                                        <p className="text-slate-300 text-sm mb-1">Total profits</p>
                                        <p className="text-teal-300 font-bold text-xl">
                                            {(formData.userPrice - formData.ticketPrice) * formData.maxTickets}$
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    <AddMedia formData={formData} setFormData={setFormData} />
                    {/* Submit Button */}
                    <div className="flex justify-center pt-6">
                        <button
                            type="button"
                            onClick={handleSubmit}
                            className="group flex items-center gap-3 px-12 py-4 rounded-2xl bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-500 hover:to-teal-600 text-white font-bold text-lg shadow-2xl shadow-teal-500/30 hover:shadow-teal-500/50 transition-all duration-300 hover:scale-105"
                        >
                            <Save size={24} className="group-hover:scale-110 transition-transform duration-300" />
                            Add the event
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}