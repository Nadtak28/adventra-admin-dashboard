import {FileText} from "lucide-react";
import React from "react";

export default function Description({formData,handleInputChange}){
    return(
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
                    value={formData.form.descriptionAr}
                    onChange={(e) => handleInputChange('descriptionAr', e.target.value)}
                    placeholder="اكتب وصفاً مفصلاً عن الفعالية وما تتضمنه..."
                    rows={4}
                    className="w-full p-4 bg-slate-800/80 backdrop-blur-sm border border-slate-600/50 hover:border-slate-500/70 rounded-2xl text-white placeholder-slate-400/70 focus:outline-none focus:border-teal-500 shadow-lg transition-all duration-300 resize-none"
                    required
                    dir="rtl"
                />
                {formData.errors.descriptionAr&& <p className="text-red-500 text-sm ml-3 ">Field is required</p>}

            </div>

            {/* English Description */}
            <div className="space-y-3">
                <label className="text-white font-semibold">Event Description</label>
                <textarea
                    value={formData.form.descriptionEn}
                    onChange={(e) => handleInputChange('descriptionEn', e.target.value)}
                    placeholder="Write a detailed description of the event..."
                    rows={4}
                    className="w-full p-4 bg-slate-800/80 backdrop-blur-sm border border-slate-600/50 hover:border-slate-500/70 rounded-2xl text-white placeholder-slate-400/70 focus:outline-none focus:border-teal-500 shadow-lg transition-all duration-300 resize-none"
                    required
                />
                {formData.errors.descriptionEn&& <p className="text-red-500 text-sm ml-3 ">Field is required</p>}
            </div>
        </div>
    </div>
    )
}