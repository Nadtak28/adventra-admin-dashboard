import {Check, Globe} from "lucide-react";
import React from "react";

export default function Languages({formData,handleInputChange,Languages}) {
    return (
        <div className="mb-8">
            <h2 className="text-white text-xl font-semibold mb-6 flex items-center gap-3">
                <Globe size={20} className="text-teal-400" />
                Languages
            </h2>

            <div className="space-y-2">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">

                    {Object.entries(Languages).map(([language, id]) => (
                        <button
                            key={id}
                            type="button"
                            onClick={()=>{handleInputChange('languages',id)}}
                            className={`p-3 rounded-xl border text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
                                formData.form.languages.includes(id)
                                    ? 'bg-gradient-to-r from-teal-600 to-teal-700 border-teal-500 text-white shadow-lg shadow-teal-500/25'
                                    : 'bg-slate-800/60 border-slate-600/50 text-slate-300 hover:border-teal-500/50 hover:bg-slate-700/60'
                            }`}
                        >
                            {formData.form.languages.includes(id) && <Check size={14} />}
                            {language}
                        </button>
                    ))}
                </div>
                {formData.errors.languages && <p className="text-red-400 text-sm">field is required</p>}
            </div>
        </div>
    )
}