import {Languages} from "lucide-react";
import React from "react";

export default function Language({availableLanguages,handleInputChange,formData}){
    return (
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
                        onClick={() => handleInputChange('language',language)}
                        className={`
                                        p-4 rounded-2xl border-2 transition-all duration-300 font-semibold text-sm
                                        ${language===formData.form.language
                            ? 'bg-gradient-to-r from-teal-600/80 to-teal-700/80 border-teal-500 text-white shadow-lg shadow-teal-500/20 scale-105'
                            : 'bg-slate-800/60 border-slate-600/50 text-slate-300 hover:border-teal-500/50 hover:text-white hover:scale-105'
                        }
                                    `}
                    >
                        {language}
                    </button>
                ))}
            </div>

            {formData.form.language && (
                <div className="mt-4 p-4 bg-teal-900/20 border border-teal-500/30 rounded-xl">
                    <p className="text-teal-300 text-sm">
                        Language: {formData.form.language}
                    </p>
                </div>
            )}
            {formData.errors.language&& <p className="text-red-500 text-sm ml-3 ">Field is required</p>}

        </div>

    )
}