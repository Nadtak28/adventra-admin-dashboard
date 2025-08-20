import {Check, Tag} from "lucide-react";
import React from "react";

export default function Categories({formData, handleInputChange,Categories}) {
    return (
        <div className="mb-8">
            <h2 className="text-white text-xl font-semibold mb-6 flex items-center gap-3">
                <Tag size={20} className="text-teal-400" />
                Categories
            </h2>

            <div className="space-y-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {Categories.map(category => (
                        <button
                            key={category.id}
                            type="button"
                            onClick={() => handleInputChange('categories', category)}
                            className={`p-4 rounded-xl border text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
                                formData.form.categories.includes(category)
                                    ? 'bg-gradient-to-r from-teal-600 to-teal-700 border-teal-500 text-white shadow-lg shadow-teal-500/25'
                                    : 'bg-slate-800/60 border-slate-600/50 text-slate-300 hover:border-teal-500/50 hover:bg-slate-700/60'
                            }`}>
                            {formData.form.categories.includes(category) && <Check size={16} />}
                            {category.name}
                        </button>
                    ))}
                </div>
                {formData.errors.categories && <p className="text-red-400 text-sm">field is required</p>}
            </div>
        </div>
    )
}