import {MapPin} from "lucide-react";
import React from "react";

export default function Info({formData, handleInputChange}) {
    return (

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
                    value={formData.form.nameAr}
                    onChange={(e) => handleInputChange('nameAr', e.target.value)}
                    placeholder="مثال: رحلة استكشاف التراث"
                    className="w-full p-4 bg-slate-800/80 backdrop-blur-sm border border-slate-600/50 hover:border-slate-500/70 rounded-2xl text-white focus:outline-none focus:border-teal-500 focus:shadow-lg focus:shadow-teal-500/20 shadow-lg transition-all duration-300"
                    required
                    dir="rtl"
                />

                {formData.errors.nameAr&& <p className="text-red-500 text-sm ml-3 ">Field is required</p>}

            </div>

            {/* English Name */}
            <div className="space-y-3">
                <label className="text-white font-semibold">Trip name</label>
                <input
                    type="text"
                    value={formData.form.nameEn}
                    onChange={(e) => handleInputChange('nameEn', e.target.value)}
                    placeholder="Example: Heritage Discovery Trip"
                    className="w-full p-4 bg-slate-800/80 backdrop-blur-sm border border-slate-600/50 hover:border-slate-500/70 rounded-2xl text-white placeholder-slate-400/70 focus:outline-none focus:border-teal-500 shadow-lg transition-all duration-300"
                    required
                />
                {formData.errors.nameEn&& <p className="text-red-500 text-sm ml-3 ">Field is required</p>}

            </div>
        </div>
    </div>
    )
}