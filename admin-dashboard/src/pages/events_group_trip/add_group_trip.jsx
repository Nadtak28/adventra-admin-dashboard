import React, { useState } from 'react';
import { ArrowLeft, Upload, X, Plus, Calendar, Clock, DollarSign, FileText, Image, Video, Save, Eye, Users, MapPin, Star, Check, Search, User } from 'lucide-react';
import AddMedia from "../../features/all/components/add_media.jsx";
import {useNavigate} from "react-router-dom";

export default function AddGroupTrip() {
    const [formData, setFormData] = useState({
        nameEn: '',
        nameAr: '',
        descriptionEn: '',
        descriptionAr: '',
        startTime: '',
        endTime: '',
        companyPrice: '',
        userPrice: '',
        minTickets: '',
        preBookedTickets: '',
        selectedGuide: null,
        selectedEvents: [],
        images: [],
        videos: []
    });
    const navigate = useNavigate();
    const [showGuideModal, setShowGuideModal] = useState(false);
    const [showEventModal, setShowEventModal] = useState(false);
    const [guideSearch, setGuideSearch] = useState('');
    const [eventSearch, setEventSearch] = useState('');

    // بيانات وهمية للأدلة السياحية
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

    // بيانات وهمية للفعاليات
    const availableEvents = [
        {
            id: 1,
            nameAr: 'جولة في المتحف الوطني',
            nameEn: 'National Museum Tour',
            type: 'ثقافية',
            image: 'https://images.unsplash.com/photo-1566127444979-b3d2b654e715?w=300&h=200&fit=crop',
            duration: '2 ساعة',
            price: 50
        },
        {
            id: 2,
            nameAr: 'رحلة في الحديقة المائية',
            nameEn: 'Water Park Adventure',
            type: 'ترفيهية',
            image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=300&h=200&fit=crop',
            duration: '4 ساعات',
            price: 120
        },
        {
            id: 3,
            nameAr: 'جولة الطعام التراثي',
            nameEn: 'Traditional Food Tour',
            type: 'طعام وشراب',
            image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=300&h=200&fit=crop',
            duration: '3 ساعات',
            price: 80
        },
        {
            id: 4,
            nameAr: 'مهرجان الموسيقى',
            nameEn: 'Music Festival',
            type: 'موسيقية',
            image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=200&fit=crop',
            duration: '5 ساعات',
            price: 200
        }
    ];

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const selectGuide = (guide) => {
        setFormData(prev => ({
            ...prev,
            selectedGuide: guide
        }));
        setShowGuideModal(false);
        setGuideSearch('');
    };

    const toggleEvent = (event) => {
        setFormData(prev => {
            const isSelected = prev.selectedEvents.some(e => e.id === event.id);
            return {
                ...prev,
                selectedEvents: isSelected
                    ? prev.selectedEvents.filter(e => e.id !== event.id)
                    : [...prev.selectedEvents, event]
            };
        });
    };

    const removeEvent = (eventId) => {
        setFormData(prev => ({
            ...prev,
            selectedEvents: prev.selectedEvents.filter(e => e.id !== eventId)
        }));
    };

    const handleSubmit = () => {
        console.log('Trip submitted:', formData);
    };

    const filteredGuides = tourGuides.filter(guide =>
        guide.name.toLowerCase().includes(guideSearch.toLowerCase()) ||
        guide.nameEn.toLowerCase().includes(guideSearch.toLowerCase())
    );

    const filteredEvents = availableEvents.filter(event =>
        event.nameAr.toLowerCase().includes(eventSearch.toLowerCase()) ||
        event.nameEn.toLowerCase().includes(eventSearch.toLowerCase()) ||
        event.type.toLowerCase().includes(eventSearch.toLowerCase())
    );

    return (
        <div className="relative min-h-screen bg-[#0b1520] -m-6 p-6">
            {/* Enhanced background effects */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-teal-900/30 via-slate-800/10 to-transparent"></div>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-slate-800/40 via-transparent to-transparent"></div>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-teal-900/5 to-transparent"></div>

            <div className="relative z-10 max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <button className="group flex items-center justify-center w-12 h-12 rounded-2xl bg-slate-800/80 backdrop-blur-sm border border-slate-700/50 hover:border-teal-500/50 text-slate-400 hover:text-white transition-all duration-300 hover:scale-105"
                                onClick={()=>navigate("/dashboard/event_grouptrip")}>
                            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform duration-300" />
                        </button>
                        <div>
                            <h1 className="text-3xl font-bold text-white mb-2">Add New Group Trip</h1>
                            <p className="text-slate-400">Add trip info and events included and media</p>
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
                            Add the trip
                        </button>
                    </div>
                </div>

                <div className="space-y-8">
                    {/* Basic Information */}
                    <div className="bg-gradient-to-br from-slate-800/60 to-slate-900/80 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 shadow-2xl">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 rounded-xl bg-teal-600/20 border border-teal-500/30">
                                <MapPin size={24} className="text-teal-400" />
                            </div>
                            <h2 className="text-2xl font-bold text-white">Trip info</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Arabic Name */}
                            <div className="space-y-3">
                                <label className="text-white font-semibold">اسم الرحلة</label>
                                <input
                                    type="text"
                                    value={formData.nameAr}
                                    onChange={(e) => handleInputChange('nameAr', e.target.value)}
                                    placeholder="مثال: رحلة استكشاف التراث"
                                    className="w-full p-4 bg-slate-800/80 backdrop-blur-sm border border-slate-600/50 hover:border-slate-500/70 rounded-2xl text-white placeholder-slate-400/70 focus:outline-none focus:border-teal-500 shadow-lg transition-all duration-300"
                                    required
                                    dir="rtl"
                                />
                            </div>

                            {/* English Name */}
                            <div className="space-y-3">
                                <label className="text-white font-semibold">Trip name</label>
                                <input
                                    type="text"
                                    value={formData.nameEn}
                                    onChange={(e) => handleInputChange('nameEn', e.target.value)}
                                    placeholder="Example: Heritage Discovery Trip"
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
                                <label className="text-white font-semibold">وصف الرحلة</label>
                                <textarea
                                    value={formData.descriptionAr}
                                    onChange={(e) => handleInputChange('descriptionAr', e.target.value)}
                                    placeholder="اكتب وصفاً مفصلاً عن الرحلة ومحطاتها..."
                                    rows={4}
                                    className="w-full p-4 bg-slate-800/80 backdrop-blur-sm border border-slate-600/50 hover:border-slate-500/70 rounded-2xl text-white placeholder-slate-400/70 focus:outline-none focus:border-teal-500 shadow-lg transition-all duration-300 resize-none"
                                    required
                                    dir="rtl"
                                />
                            </div>

                            {/* English Description */}
                            <div className="space-y-3">
                                <label className="text-white font-semibold">Trip description</label>
                                <textarea
                                    value={formData.descriptionEn}
                                    onChange={(e) => handleInputChange('descriptionEn', e.target.value)}
                                    placeholder="Write a detailed description of the trip..."
                                    rows={4}
                                    className="w-full p-4 bg-slate-800/80 backdrop-blur-sm border border-slate-600/50 hover:border-slate-500/70 rounded-2xl text-white placeholder-slate-400/70 focus:outline-none focus:border-teal-500 shadow-lg transition-all duration-300 resize-none"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* Time and Pricing */}
                    <div className="bg-gradient-to-br from-slate-800/60 to-slate-900/80 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 shadow-2xl">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 rounded-xl bg-teal-600/20 border border-teal-500/30">
                                <Clock size={24} className="text-teal-400" />
                            </div>
                            <h2 className="text-2xl font-bold text-white">Date and Prices</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {/* Start Time */}
                            <div className="space-y-3">
                                <label className="flex items-center gap-2 text-white font-semibold">
                                    <Calendar size={18} className="text-teal-400" />
                                    Start date
                                </label>
                                <input
                                    type="datetime-local"
                                    value={formData.startTime}
                                    onChange={(e) => handleInputChange('startTime', e.target.value)}
                                    className="w-full p-4 bg-slate-800/80 backdrop-blur-sm border border-slate-600/50 hover:border-slate-500/70 rounded-2xl text-white focus:outline-none focus:border-teal-500 shadow-lg transition-all duration-300"
                                    required
                                />
                            </div>

                            {/* End Time */}
                            <div className="space-y-3">
                                <label className="flex items-center gap-2 text-white font-semibold">
                                    <Calendar size={18} className="text-teal-400" />
                                    end date
                                </label>
                                <input
                                    type="datetime-local"
                                    value={formData.endTime}
                                    onChange={(e) => handleInputChange('endTime', e.target.value)}
                                    className="w-full p-4 bg-slate-800/80 backdrop-blur-sm border border-slate-600/50 hover:border-slate-500/70 rounded-2xl text-white focus:outline-none focus:border-teal-500 shadow-lg transition-all duration-300"
                                    required
                                />
                            </div>

                            {/* Empty space for layout */}
                            <div></div>

                            {/* Company Price */}
                            <div className="space-y-3">
                                <label className="flex items-center gap-2 text-white font-semibold">
                                    <DollarSign size={18} className="text-teal-400" />
                                    Price
                                </label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        value={formData.companyPrice}
                                        onChange={(e) => handleInputChange('companyPrice', e.target.value)}
                                        placeholder="0"
                                        className="w-full p-4 pr-16 bg-slate-800/80 backdrop-blur-sm border border-slate-600/50 hover:border-slate-500/70 rounded-2xl text-white placeholder-slate-400/70 focus:outline-none focus:border-teal-500 shadow-lg transition-all duration-300"
                                        required
                                        min="0"
                                    />
                                </div>
                            </div>

                            {/* User Price */}
                            <div className="space-y-3">
                                <label className="flex items-center gap-2 text-white font-semibold">
                                    <Users size={18} className="text-teal-400" />
                                    Price for customers
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
                            </div>

                            {/* Min Tickets */}
                            <div className="space-y-3">
                                <label className="flex items-center gap-2 text-white font-semibold">
                                    <Users size={18} className="text-teal-400" />
                                    Minimum expected tickets
                                </label>
                                <input
                                    type="number"
                                    value={formData.minTickets}
                                    onChange={(e) => handleInputChange('minTickets', e.target.value)}
                                    placeholder="10"
                                    className="w-full p-4 bg-slate-800/80 backdrop-blur-sm border border-slate-600/50 hover:border-slate-500/70 rounded-2xl text-white placeholder-slate-400/70 focus:outline-none focus:border-teal-500 shadow-lg transition-all duration-300"
                                    required
                                    min="1"
                                />
                            </div>

                            {/* Pre-booked Tickets */}
                            <div className="space-y-3">
                                <label className="flex items-center gap-2 text-white font-semibold">
                                    <Check size={18} className="text-teal-400" />
                                    Ticket Count (منشان اخونا اب ادم)
                                </label>
                                <input
                                    type="number"
                                    value={formData.preBookedTickets}
                                    onChange={(e) => handleInputChange('preBookedTickets', e.target.value)}
                                    placeholder="0"
                                    className="w-full p-4 bg-slate-800/80 backdrop-blur-sm border border-slate-600/50 hover:border-slate-500/70 rounded-2xl text-white placeholder-slate-400/70 focus:outline-none focus:border-teal-500 shadow-lg transition-all duration-300"
                                    min="0"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Tour Guide Selection */}
                    <div className="bg-gradient-to-br from-slate-800/60 to-slate-900/80 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 shadow-2xl">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 rounded-xl bg-teal-600/20 border border-teal-500/30">
                                <User size={24} className="text-teal-400" />
                            </div>
                            <h2 className="text-2xl font-bold text-white">Guide</h2>
                        </div>

                        {formData.selectedGuide ? (
                            <div className="bg-slate-800/40 rounded-2xl p-6 border border-slate-600/30">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <img
                                            src={formData.selectedGuide.image}
                                            alt={formData.selectedGuide.name}
                                            className="w-16 h-16 rounded-2xl object-cover border-2 border-teal-500/50"
                                        />
                                        <div>
                                            <h3 className="text-white font-bold text-lg">{formData.selectedGuide.name}</h3>
                                            <p className="text-slate-300 text-sm">{formData.selectedGuide.nameEn}</p>
                                            <div className="flex items-center gap-2 mt-1">
                                                <Star size={14} className="text-yellow-400 fill-current" />
                                                <span className="text-yellow-400 font-semibold text-sm">{formData.selectedGuide.rating}</span>
                                                <span className="text-slate-400 text-sm">• {formData.selectedGuide.experience}</span>
                                            </div>
                                            <div className="flex flex-wrap gap-2 mt-2">
                                                {formData.selectedGuide.languages.map(lang => (
                                                    <span key={lang} className="px-2 py-1 bg-teal-600/20 text-teal-300 text-xs rounded-lg border border-teal-500/30">
                                                        {lang}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setFormData(prev => ({ ...prev, selectedGuide: null }))}
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
                    </div>

                    {/* Events Selection */}
                    <div className="bg-gradient-to-br from-slate-800/60 to-slate-900/80 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 shadow-2xl">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <div className="p-3 rounded-xl bg-teal-600/20 border border-teal-500/30">
                                    <Calendar size={24} className="text-teal-400" />
                                </div>
                                <h2 className="text-2xl font-bold text-white">Events</h2>
                            </div>
                            <button
                                onClick={() => setShowEventModal(true)}
                                className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-500 hover:to-teal-600 text-white font-semibold transition-all duration-300 hover:scale-105"
                            >
                                <Plus size={18} />
                                Add Events
                            </button>
                        </div>

                        {formData.selectedEvents.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {formData.selectedEvents.map(event => (
                                    <div key={event.id} className="bg-slate-800/40 rounded-2xl overflow-hidden border border-slate-600/30 group hover:border-teal-500/50 transition-all duration-300">
                                        <div className="relative">
                                            <img
                                                src={event.image}
                                                alt={event.nameAr}
                                                className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                            <button
                                                onClick={() => removeEvent(event.id)}
                                                className="absolute top-2 right-2 p-1 bg-red-600 hover:bg-red-700 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"
                                            >
                                                <X size={16} />
                                            </button>
                                            <div className="absolute bottom-2 left-2 px-2 py-1 bg-teal-600/80 text-white text-xs rounded-lg font-semibold">
                                                {event.type}
                                            </div>
                                        </div>
                                        <div className="p-4">
                                            <h3 className="text-white font-bold text-sm mb-1">{event.nameAr}</h3>
                                            <p className="text-slate-300 text-xs mb-2">{event.nameEn}</p>
                                            <div className="flex items-center justify-between">
                                                <span className="text-slate-400 text-xs">{event.duration}</span>
                                                <span className="text-teal-300 font-semibold text-sm">{event.price} ريال</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <Calendar size={48} className="text-slate-600 mx-auto mb-4" />
                                <p className="text-slate-400 text-lg font-medium">No events have been selected yet.</p>
                                <p className="text-slate-500 text-sm">Click "Add Events" to select events accompanying the trip.</p>
                            </div>
                        )}
                    </div>

                    {/* Media Upload */}
                    <AddMedia formData={formData} setFormData={setFormData} />

                    {/* Submit Button */}
                    <div className="flex justify-center pt-6">
                        <button
                            type="button"
                            onClick={handleSubmit}
                            className="group flex items-center gap-3 px-12 py-4 rounded-2xl bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-500 hover:to-teal-600 text-white font-bold text-lg shadow-2xl shadow-teal-500/30 hover:shadow-teal-500/50 transition-all duration-300 hover:scale-105"
                        >
                            <Save size={24} className="group-hover:scale-110 transition-transform duration-300" />
                            Add the trip
                        </button>
                    </div>
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

                {/* Events Selection Modal */}
                {showEventModal && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                        <div className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-lg border border-slate-700/50 rounded-2xl p-8 max-w-6xl w-full max-h-[80vh] overflow-y-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-2xl font-bold text-white">Select Events</h3>
                                <button
                                    onClick={() => setShowEventModal(false)}
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
                                    placeholder="search for a event..."
                                    value={eventSearch}
                                    onChange={(e) => setEventSearch(e.target.value)}
                                    className="w-full pl-12 pr-4 py-4 bg-slate-800/80 border border-slate-600/50 rounded-2xl text-white placeholder-slate-400/70 focus:outline-none focus:border-teal-500"
                                />
                            </div>

                            {/* Events Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredEvents.map(event => {
                                    const isSelected = formData.selectedEvents.some(e => e.id === event.id);
                                    return (
                                        <div
                                            key={event.id}
                                            onClick={() => toggleEvent(event)}
                                            className={`
                                                bg-slate-800/40 border-2 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105
                                                ${isSelected
                                                ? 'border-teal-500 shadow-lg shadow-teal-500/20'
                                                : 'border-slate-600/30 hover:border-teal-500/50'
                                            }
                                            `}
                                        >
                                            <div className="relative">
                                                <img
                                                    src={event.image}
                                                    alt={event.nameAr}
                                                    className="w-full h-32 object-cover"
                                                />
                                                <div className="absolute top-2 left-2 px-2 py-1 bg-teal-600/80 text-white text-xs rounded-lg font-semibold">
                                                    {event.type}
                                                </div>
                                                {isSelected && (
                                                    <div className="absolute top-2 right-2 p-1 bg-teal-600 text-white rounded-full">
                                                        <Check size={16} />
                                                    </div>
                                                )}
                                            </div>
                                            <div className="p-4">
                                                <h4 className="text-white font-bold text-lg mb-1">{event.nameAr}</h4>
                                                <p className="text-slate-300 text-sm mb-3">{event.nameEn}</p>
                                                <div className="flex items-center justify-between">
                                                    <span className="text-slate-400 text-sm">{event.duration}</span>
                                                    <span className="text-teal-300 font-bold">{event.price} $</span>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="flex justify-center mt-8">
                                <button
                                    onClick={() => setShowEventModal(false)}
                                    className="px-8 py-3 bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-500 hover:to-teal-600 text-white font-semibold rounded-2xl transition-all duration-300 hover:scale-105"
                                >
                                     ({formData.selectedEvents.length} Events were selected )
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}