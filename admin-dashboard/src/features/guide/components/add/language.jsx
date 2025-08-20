import {Check, Globe} from "lucide-react";
import React from "react";

export default function Languages({formData,handleInputChange,languages}) {
    return (
        <div className="mb-8">
            <h2 className="text-white text-xl font-semibold mb-6 flex items-center gap-3">
                <Globe size={20} className="text-teal-400" />
                Languages
            </h2>

            <div className="space-y-2">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {languages.map(language => (
                        <button
                            key={language.id}
                            type="button"
                            onClick={() => handleInputChange('languages', language)}
                            className={`
                        p-4 rounded-2xl border-2 transition-all duration-300 font-semibold text-sm
                        ${formData.form.languages.includes(language)
                                ? 'bg-gradient-to-r from-teal-600/80 to-teal-700/80 border-teal-500 text-white shadow-lg shadow-teal-500/20 scale-105'
                                : 'bg-slate-800/60 border-slate-600/50 text-slate-300 hover:border-teal-500/50 hover:text-white hover:scale-105'
                            }
                    `}
                        >
                            {language.name}
                        </button>
                    ))}
                </div>
                {formData.errors.languages && <p className="text-red-400 text-sm">field is required</p>}
            </div>
        </div>
    )
}