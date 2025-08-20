import {MapPin} from "lucide-react";
import React from "react";

export default function City({formData,handleInputChange,cities}) {
    return (
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
                        value={formData.form.city}
                        onChange={(e)=>{handleInputChange('city',e.target.value)}}
                        className={`w-full pl-12 pr-4 py-4 bg-slate-800/80 backdrop-blur-sm border rounded-2xl text-white focus:outline-none transition-all duration-300 'border-slate-600/50 hover:border-slate-500/70 focus:border-teal-500'`}
                    >
                        <option value="">Select city</option>
                        {cities.map(city => (
                            <option key={city.id} value={city.id}>
                                {city.name}
                            </option>
                        ))}
                    </select>
                </div>
                {formData.errors.city && <p className="text-red-400 text-sm">field is required</p>}
            </div>
        </div>
    )
}