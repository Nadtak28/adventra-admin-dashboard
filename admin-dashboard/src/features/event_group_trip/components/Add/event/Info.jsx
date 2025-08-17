import {Calendar, MapPin, Tag} from "lucide-react";
import React from "react";

export default function Info({formData,handleInputChange,eventTypes,cities}){
    return(
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
                        value={formData.form.nameAr}
                        onChange={(e) => handleInputChange('nameAr', e.target.value)}
                        placeholder="مثال: مهرجان الرياض للطعام"
                        className="w-full p-4 bg-slate-800/80 backdrop-blur-sm border border-slate-600/50 hover:border-slate-500/70 rounded-2xl text-white placeholder-slate-400/70 focus:outline-none focus:border-teal-500 shadow-lg transition-all duration-300"
                        required
                        dir="rtl"
                    />
                {formData.errors.nameAr&& <p className="text-red-500 text-sm ml-3 ">Field is required</p>}
                </div>


                {/* English Name */}
                <div className="space-y-3">
                    <label className="text-white font-semibold">Event name</label>
                    <input
                        type="text"
                        value={formData.form.nameEn}
                        onChange={(e) => handleInputChange('nameEn', e.target.value)}
                        placeholder="Example: Riyadh Food Festival"
                        className="w-full p-4 bg-slate-800/80 backdrop-blur-sm border border-slate-600/50 hover:border-slate-500/70 rounded-2xl text-white placeholder-slate-400/70 focus:outline-none focus:border-teal-500 shadow-lg transition-all duration-300"
                        required
                    />
                {formData.errors.nameEn&& <p className="text-red-500 text-sm ml-3 ">Field is required</p>}
                </div>


                {/* Event Type */}
                <div className="space-y-3">
                    <label className="flex items-center gap-2 text-white font-semibold">
                        <Tag size={18} className="text-teal-400" />
                        Category
                    </label>
                    <select
                        value={formData.form.eventType}
                        onChange={(e) => handleInputChange('eventType', e.target.value)}
                        className="w-full p-4 bg-slate-800/80 backdrop-blur-sm border border-slate-600/50 hover:border-slate-500/70 rounded-2xl text-white focus:outline-none focus:border-teal-500 shadow-lg transition-all duration-300"
                        required
                    >
                        <option value="">Select Event category</option>
                        {Object.entries(eventTypes).map(([event, id]) => (
                            <option key={id} value={id}>
                                {event}
                            </option>
                        ))}
                    </select>
                    {formData.errors.eventType&& <p className="text-red-500 text-sm ml-3 ">Field is required</p>}

                </div>

                {/* City Selection */}
                <div className="space-y-3">
                    <label className="flex items-center gap-2 text-white font-semibold">
                        <MapPin size={18} className="text-teal-400" />
                        City
                    </label>
                    <select
                        value={formData.form.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        className="w-full p-4 bg-slate-800/80 backdrop-blur-sm border border-slate-600/50 hover:border-slate-500/70 rounded-2xl text-white focus:outline-none focus:border-teal-500 shadow-lg transition-all duration-300"
                        required
                    >
                        <option value="">Select city</option>
                        {Object.entries(cities).map(([city, id]) => (
                            <option key={id} value={id}>
                                {city}
                            </option>
                        ))}
                    </select>
                    {formData.errors.city&& <p className="text-red-500 text-sm ml-3 ">Field is required</p>}

                </div>
            </div>
        </div>
    )
}