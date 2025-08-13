import {DollarSign, Users} from "lucide-react";
import React from "react";

export default function Prices({formData,handleInputChange}){
    return (
        <div className="bg-gradient-to-br from-slate-800/60 to-slate-900/80 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 shadow-2xl">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-teal-600/20 border border-teal-500/30">
                    <DollarSign size={24} className="text-teal-400" />
                </div>
                <h2 className="text-2xl font-bold text-white">Price</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Ticket Price */}
                <div className="space-y-3">
                    <label className="flex items-center gap-2 text-white font-semibold">
                        <DollarSign size={18} className="text-teal-400" />
                        Ticket price
                    </label>
                    <div className="relative">
                        <input
                            type="number"
                            value={formData.ticketPrice}
                            onChange={(e) => handleInputChange('ticketPrice', e.target.value)}
                            placeholder="0"
                            className="w-full p-4 pr-16 bg-slate-800/80 backdrop-blur-sm border border-slate-600/50 hover:border-slate-500/70 rounded-2xl text-white placeholder-slate-400/70 focus:outline-none focus:border-teal-500 shadow-lg transition-all duration-300"
                            required
                            min="0"

                        />

                    </div>
                    {formData.ticketPrice && (
                        <p className="text-teal-300 text-sm font-medium">
                            {formData.ticketPrice}$
                        </p>
                    )}
                </div>

                {/* User Price */}
                <div className="space-y-3">
                    <label className="flex items-center gap-2 text-white font-semibold">
                        <Users size={18} className="text-teal-400" />
                        Ticket price for Customer
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
                    {formData.userPrice && (
                        <p className="text-teal-300 text-sm font-medium">
                            {formData.userPrice}$
                        </p>
                    )}
                </div>

                {/* Max Tickets */}
                <div className="space-y-3">
                    <label className="flex items-center gap-2 text-white font-semibold">
                        <Users size={18} className="text-teal-400" />
                        Tickets limit
                    </label>
                    <input
                        type="number"
                        value={formData.maxTickets}
                        onChange={(e) => handleInputChange('maxTickets', e.target.value)}
                        placeholder="100"
                        className="w-full p-4 bg-slate-800/80 backdrop-blur-sm border border-slate-600/50 hover:border-slate-500/70 rounded-2xl text-white placeholder-slate-400/70 focus:outline-none focus:border-teal-500 shadow-lg transition-all duration-300"
                        required
                        min="1"
                    />
                    {formData.maxTickets && (
                        <p className="text-teal-300 text-sm font-medium">
                            A maximum of {formData.maxTickets} tickets can be sold
                        </p>
                    )}
                </div>
            </div>

            {/* Profit Calculation */}
            {formData.ticketPrice && formData.userPrice && formData.maxTickets && (
                <div className="mt-6 p-6 bg-teal-900/20 border border-teal-500/30 rounded-xl">
                    <h3 className="text-teal-300 font-semibold text-lg mb-4">Calculating expected profits</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                        <div className="bg-slate-800/40 p-4 rounded-xl">
                            <p className="text-slate-300 text-sm mb-1">Profit per ticket</p>
                            <p className="text-white font-bold text-xl">
                                {formData.userPrice - formData.ticketPrice}$
                            </p>
                        </div>
                        <div className="bg-slate-800/40 p-4 rounded-xl">
                            <p className="text-slate-300 text-sm mb-1">Total revenue</p>
                            <p className="text-white font-bold text-xl">
                                {formData.userPrice * formData.maxTickets}$
                            </p>
                        </div>
                        <div className="bg-slate-800/40 p-4 rounded-xl">
                            <p className="text-slate-300 text-sm mb-1">Total profits</p>
                            <p className="text-teal-300 font-bold text-xl">
                                {(formData.userPrice - formData.ticketPrice) * formData.maxTickets}$
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}