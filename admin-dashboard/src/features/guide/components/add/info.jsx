import {DollarSign, Mail, Phone, User} from "lucide-react";
import React from "react";

export default function Info ({formData, handleInputChange}) {
    return (
        <div className="mb-8">
            <h2 className="text-white text-xl font-semibold mb-6 flex items-center gap-3">
                <User size={20} className="text-teal-400" />
                Info
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div className="space-y-2">
                    <label className="text-white text-sm font-semibold">Full Name</label>
                    <div className="relative">
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-teal-400">
                            <User size={18} />
                        </div>
                        <input
                            type="text"
                            name="name"
                            value={formData.form.name}
                            onChange={(e)=>{handleInputChange('name',e.target.value)}}
                            placeholder="Insert guide full name"
                            className={`w-full pl-12 pr-4 py-4 bg-slate-800/80 backdrop-blur-sm border rounded-2xl text-white focus:outline-none transition-all duration-300 border-slate-600/50 hover:border-slate-500/70 focus:border-teal-500`}
                        />
                    </div>
                    {formData.errors.name && <p className="text-red-400 text-sm">field is required</p>}
                </div>

                {/* Email */}
                <div className="space-y-2">
                    <label className="text-white text-sm font-semibold">Email</label>
                    <div className="relative">
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-teal-400">
                            <Mail size={18} />
                        </div>
                        <input
                            type="email"
                            name="email"
                            value={formData.form.email}
                            onChange={(e)=>{handleInputChange('email',e.target.value)}}
                            placeholder="example@email.com"
                            className={`w-full pl-12 pr-4 py-4 bg-slate-800/80 backdrop-blur-sm border rounded-2xl text-white focus:outline-none transition-all duration-300 border-slate-600/50 hover:border-slate-500/70 focus:border-teal-500`}
                        />
                    </div>
                    {formData.errors.email && <p className="text-red-400 text-sm">{formData.form.email?"invalid Email":"field is required"}</p>}
                </div>

                {/* Phone */}
                <div className="space-y-2">
                    <label className="text-white text-sm font-semibold">Phone</label>
                    <div className="relative">
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-teal-400">
                            <Phone size={18} />
                        </div>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.form.phone}
                            onChange={(e)=>{handleInputChange('phone',e.target.value)}}
                            placeholder="+10 215 111 555"
                            className={`w-full pl-12 pr-4 py-4 bg-slate-800/80 backdrop-blur-sm border rounded-2xl text-white focus:outline-none transition-all duration-300 border-slate-600/50 hover:border-slate-500/70 focus:border-teal-500`}
                        />
                    </div>
                    {formData.errors.phone && <p className="text-red-400 text-sm">{formData.form.phone?"invalid Phone Number":"field is required"}</p>}
                </div>

                {/* Salary */}
                <div className="space-y-2">
                    <label className="text-white text-sm font-semibold">Salary</label>
                    <div className="relative">
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-teal-400">
                            <DollarSign size={18} />
                        </div>
                        <input
                            type="number"
                            name="salary"
                            value={formData.form.salary}
                            onChange={(e)=>{handleInputChange('salary',e.target.value)}}
                            placeholder="5000"
                            min={0}
                            className={`w-full pl-12 pr-4 py-4 bg-slate-800/80 backdrop-blur-sm border rounded-2xl text-white focus:outline-none transition-all duration-300 border-slate-600/50 hover:border-slate-500/70 focus:border-teal-500`}
                        />
                    </div>
                    {formData.errors.salary && <p className="text-red-400 text-sm">field is required</p>}
                </div>
            </div>
        </div>
    )
}