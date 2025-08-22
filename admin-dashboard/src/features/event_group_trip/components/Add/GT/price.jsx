import {Calendar, Clock, DollarSign, Users, TrendingUp, BarChart3, Target} from "lucide-react";
import React, { useMemo} from "react";

export default function Price({formData, handleInputChange}) {


    // حسابات الربح
    const calculations = useMemo(() => {
        const ticketPrice = Number(formData.form.ticketPrice || 0);
        const userPrice = Number(formData.form.userPrice || 0);
        const minTickets = Number(formData.form.minTickets || 0);
        const maxTickets = Number(formData.form.maxTickets || 0);

        const profitPerTicket = userPrice - ticketPrice;

        // حسابات الحد الأدنى
        const minRevenue = userPrice * minTickets;
        const minProfit = profitPerTicket * minTickets;

        // حسابات الحد الأقصى
        const maxRevenue = userPrice * maxTickets;
        const maxProfit = profitPerTicket * maxTickets;

        return {
            profitPerTicket,
            minRevenue,
            minProfit,
            maxRevenue,
            maxProfit,
            minTickets,
            maxTickets
        };
    }, [formData.form.ticketPrice, formData.form.userPrice, formData.form.minTickets, formData.form.maxTickets]);

    return (
        <div className="bg-gradient-to-br from-slate-800/60 to-slate-900/80 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 shadow-2xl">
            {/* Header */}
            <div className="flex items-center gap-3 mb-8">
                <div className="p-3 rounded-xl bg-teal-600/20 border border-teal-500/30">
                    <Clock size={24} className="text-teal-400" />
                </div>
                <h2 className="text-2xl font-bold text-white">Event Configuration</h2>
            </div>

            {/* Date Section */}
            <div className="mb-8">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-lg bg-blue-600/20 border border-blue-500/30">
                        <Calendar size={20} className="text-blue-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white">Event Timeline</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Start Date */}
                    <div className="space-y-3 transform transition-all duration-500 hover:scale-105">
                        <label className="flex items-center gap-2 text-white font-semibold">
                            <Calendar size={18} className="text-blue-400" />
                            Start Date
                        </label>
                        <input
                            type="datetime-local"
                            value={formData.form.startDate || ''}
                            onChange={(e) => handleInputChange('startDate', e.target.value)}
                            className="w-full p-4 bg-slate-800/80 backdrop-blur-sm border border-slate-600/50 hover:border-slate-500/70 rounded-2xl text-white focus:outline-none focus:border-blue-500 focus:shadow-lg focus:shadow-blue-500/20 shadow-lg transition-all duration-300"
                            required
                            min={formData.form.startDate}
                        />
                    </div>

                    {/* End Date */}
                    <div className="space-y-3 transform transition-all duration-500 hover:scale-105">
                        <label className="flex items-center gap-2 text-white font-semibold">
                            <Calendar size={18} className="text-blue-400" />
                            End Date
                        </label>
                        <input
                            type="datetime-local"
                            value={formData.form.endDate || ''}
                            onChange={(e) => handleInputChange('endDate', e.target.value)}
                            className="w-full p-4 bg-slate-800/80 backdrop-blur-sm border border-slate-600/50 hover:border-slate-500/70 rounded-2xl text-white focus:outline-none focus:border-blue-500 focus:shadow-lg focus:shadow-blue-500/20 shadow-lg transition-all duration-300"
                            required
                            min={formData.form.startDate}
                        />
                        {formData.errors.endDate&& <p className="text-red-500 text-sm ml-3 ">Field is required</p>}
                    </div>
                </div>

                {/* Duration Display */}
                {formData.form.startDate && formData.form.endDate && (
                    <div className="mt-6 p-4 bg-blue-900/20 border border-blue-500/30 rounded-xl transform transition-all duration-500 hover:scale-105">
                        <p className="text-blue-300 text-sm font-medium flex items-center gap-2">
                            <Clock size={16} className="text-blue-400" />
                            Event Duration: {(() => {
                            const start = new Date(formData.form.startDate);
                            const end = new Date(formData.form.endDate);

                            const diffMs = Math.abs(end - start);

                            const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
                            const diffHours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                            const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

                            let result = "";
                            if (diffDays > 0) result += `${diffDays} day${diffDays > 1 ? "s" : ""} `;
                            if (diffHours > 0) result += `${diffHours} hour${diffHours > 1 ? "s" : ""} `;
                            if (diffMinutes > 0) result += `${diffMinutes} min${diffMinutes > 1 ? "s" : ""}`;

                            return result.trim() || "Less than a minute";
                        })()}
                        </p>
                    </div>
                )}
            </div>

            {/* Pricing Section */}
            <div className="mb-8">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-lg bg-emerald-600/20 border border-emerald-500/30">
                        <DollarSign size={20} className="text-emerald-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white">Pricing Configuration</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Cost Price */}
                    <div className="space-y-3 transform transition-all duration-500 hover:scale-105">
                        <label className="flex items-center gap-2 text-white font-semibold">
                            <DollarSign size={18} className="text-emerald-400" />
                            Cost Price per Person
                        </label>
                        <div className="relative">
                            <input
                                type="number"
                                value={formData.form.ticketPrice || ''}
                                onChange={(e) => handleInputChange('ticketPrice', e.target.value)}
                                placeholder="0"
                                className="w-full p-4 pr-16 bg-slate-800/80 backdrop-blur-sm border border-slate-600/50 hover:border-slate-500/70 rounded-2xl text-white placeholder-slate-400/70 focus:outline-none focus:border-emerald-500 focus:shadow-lg focus:shadow-emerald-500/20 shadow-lg transition-all duration-300"
                                required
                                min="0"
                                step="0.01"
                            />
                            {formData.errors.ticketPrice&& <p className="text-red-500 text-sm ml-3 ">Field is required</p>}
                            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                                <span className="text-slate-400 font-medium">$</span>
                            </div>
                        </div>
                    </div>

                    {/* Selling Price */}
                    <div className="space-y-3 transform transition-all duration-500 hover:scale-105">
                        <label className="flex items-center gap-2 text-white font-semibold">
                            <Users size={18} className="text-emerald-400" />
                            Selling Price per Person
                        </label>
                        <div className="relative">
                            <input
                                type="number"
                                value={formData.form.userPrice || ''}
                                onChange={(e) => handleInputChange('userPrice', e.target.value)}
                                placeholder="0"
                                className="w-full p-4 pr-16 bg-slate-800/80 backdrop-blur-sm border border-slate-600/50 hover:border-slate-500/70 rounded-2xl text-white placeholder-slate-400/70 focus:outline-none focus:border-emerald-500 focus:shadow-lg focus:shadow-emerald-500/20 shadow-lg transition-all duration-300"
                                required
                                min="0"
                                step="0.01"
                            />
                            {formData.errors.userPrice&& <p className="text-red-500 text-sm ml-3 ">Field is required</p>}

                            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                                <span className="text-slate-400 font-medium">$</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Profit per person indicator */}
                {formData.form.ticketPrice && formData.form.userPrice && (
                    <div className="mt-6 p-4 bg-slate-800/40 border border-slate-600/30 rounded-xl transform transition-all duration-500 hover:scale-105">
                        <div className="flex items-center justify-center gap-3">
                            <TrendingUp size={16} className="text-emerald-400" />
                            <span className="text-slate-300 text-sm">Profit per Person:</span>
                            <span className={`font-bold text-lg ${
                                calculations.profitPerTicket >= 0 ? 'text-emerald-400' : 'text-red-400'
                            }`}>
                                ${calculations.profitPerTicket.toFixed(2)}
                            </span>
                        </div>
                    </div>
                )}
            </div>

            {/* Tickets Section */}
            <div className="mb-8">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-lg bg-purple-600/20 border border-purple-500/30">
                        <Users size={20} className="text-purple-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white">Ticket Management</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Minimum Expected Tickets */}
                    <div className="space-y-3 transform transition-all duration-500 hover:scale-105">
                        <label className="flex items-center gap-2 text-white font-semibold">
                            <Users size={18} className="text-purple-400" />
                            Minimum Expected Tickets
                        </label>
                        <input
                            type="number"
                            value={formData.form.minTickets || ''}
                            onChange={(e) => handleInputChange('minTickets', e.target.value)}
                            placeholder="10"
                            className="w-full p-4 bg-slate-800/80 backdrop-blur-sm border border-slate-600/50 hover:border-slate-500/70 rounded-2xl text-white placeholder-slate-400/70 focus:outline-none focus:border-purple-500 focus:shadow-lg focus:shadow-purple-500/20 shadow-lg transition-all duration-300"
                            required
                            min="1"
                        />
                        {formData.errors.minTickets&& <p className="text-red-500 text-sm ml-3 ">Field is required</p>}
                        {formData.form.minTickets && (
                            <p className="text-purple-300 text-sm">
                                Target: {formData.form.minTickets} tickets minimum
                            </p>
                        )}
                    </div>

                    {/* Maximum Expected Tickets */}
                    <div className="space-y-3 transform transition-all duration-500 hover:scale-105">
                        <label className="flex items-center gap-2 text-white font-semibold">
                            <Target size={18} className="text-orange-400" />
                            Maximum Expected Tickets
                        </label>
                        <input
                            type="number"
                            value={formData.form.maxTickets || ''}
                            onChange={(e) => handleInputChange('maxTickets', e.target.value)}
                            placeholder="100"
                            className="w-full p-4 bg-slate-800/80 backdrop-blur-sm border border-slate-600/50 hover:border-slate-500/70 rounded-2xl text-white placeholder-slate-400/70 focus:outline-none focus:border-orange-500 focus:shadow-lg focus:shadow-orange-500/20 shadow-lg transition-all duration-300"
                            min={formData.form.minTickets || 1}
                        />
                        {formData.errors.maxTickets&& <p className="text-red-500 text-sm ml-3 ">Field is required</p>}
                        {formData.form.maxTickets && (
                            <p className="text-orange-300 text-sm">
                                Capacity: {formData.form.maxTickets} tickets maximum
                            </p>
                        )}
                    </div>
                </div>

            </div>

            {/* Financial Analysis */}
            {(formData.form.ticketPrice && formData.form.userPrice && (formData.form.minTickets || formData.form.maxTickets)) && (
                <div className="p-6 bg-gradient-to-r from-teal-900/20 to-emerald-900/20 border border-teal-500/30 rounded-xl">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 rounded-lg bg-teal-600/20 border border-teal-500/30">
                            <BarChart3 size={20} className="text-teal-400" />
                        </div>
                        <h3 className="text-teal-300 font-semibold text-lg">Financial Analysis</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {/* Minimum Target Analysis */}
                        {formData.form.minTickets && (
                            <>
                                <div className="bg-slate-800/40 p-5 rounded-xl border border-slate-700/30 hover:scale-105 transition-all duration-300">
                                    <p className="text-slate-300 text-sm mb-2">Min. Target Revenue</p>
                                    <p className="text-white font-bold text-xl">
                                        ${calculations.minRevenue.toFixed(2)}
                                    </p>
                                    <p className="text-slate-400 text-xs mt-1">
                                        {calculations.minTickets} tickets × ${formData.form.userPrice}
                                    </p>
                                </div>
                                <div className="bg-slate-800/40 p-5 rounded-xl border border-slate-700/30 hover:scale-105 transition-all duration-300">
                                    <p className="text-slate-300 text-sm mb-2">Min. Target Profit</p>
                                    <p className={`font-bold text-xl ${
                                        calculations.minProfit >= 0 ? 'text-emerald-400' : 'text-red-400'
                                    }`}>
                                        ${calculations.minProfit.toFixed(2)}
                                    </p>
                                    <p className="text-slate-400 text-xs mt-1">
                                        {calculations.minTickets} tickets × ${calculations.profitPerTicket.toFixed(2)}
                                    </p>
                                </div>
                            </>
                        )}

                        {/* Maximum Target Analysis */}
                        {formData.form.maxTickets && (
                            <>
                                <div className="bg-slate-800/40 p-5 rounded-xl border border-slate-700/30 hover:scale-105 transition-all duration-300">
                                    <p className="text-slate-300 text-sm mb-2">Max. Potential Revenue</p>
                                    <p className="text-white font-bold text-xl">
                                        ${calculations.maxRevenue.toFixed(2)}
                                    </p>
                                    <p className="text-slate-400 text-xs mt-1">
                                        {calculations.maxTickets} tickets × ${formData.form.userPrice}
                                    </p>
                                </div>
                                <div className="bg-slate-800/40 p-5 rounded-xl border border-slate-700/30 hover:scale-105 transition-all duration-300">
                                    <p className="text-slate-300 text-sm mb-2">Max. Potential Profit</p>
                                    <p className={`font-bold text-xl ${
                                        calculations.maxProfit >= 0 ? 'text-emerald-400' : 'text-red-400'
                                    }`}>
                                        ${calculations.maxProfit.toFixed(2)}
                                    </p>
                                    <p className="text-slate-400 text-xs mt-1">
                                        {calculations.maxTickets} tickets × ${calculations.profitPerTicket.toFixed(2)}
                                    </p>
                                </div>
                            </>
                        )}
                    </div>

                    {/* Revenue Range Display */}
                    {formData.form.minTickets && formData.form.maxTickets && (
                        <div className="mt-6 p-4 bg-gradient-to-r from-purple-900/20 to-orange-900/20 border border-teal-500/20 rounded-xl">
                            <h4 className="text-teal-300 font-semibold mb-3">Revenue Range Projection</h4>
                            <div className="flex items-center justify-between">
                                <div className="text-center">
                                    <p className="text-purple-300 text-sm">Minimum</p>
                                    <p className="text-white font-bold text-lg">${calculations.minRevenue.toFixed(2)}</p>
                                </div>
                                <div className="flex-1 mx-4">
                                    <div className="h-2 bg-gradient-to-r from-purple-500 via-teal-500 to-orange-500 rounded-full"></div>
                                </div>
                                <div className="text-center">
                                    <p className="text-orange-300 text-sm">Maximum</p>
                                    <p className="text-white font-bold text-lg">${calculations.maxRevenue.toFixed(2)}</p>
                                </div>
                            </div>
                            <div className="mt-3 text-center">
                                <p className="text-teal-300 text-sm">
                                    Potential Revenue Range: ${calculations.minRevenue.toFixed(2)} - ${calculations.maxRevenue.toFixed(2)}
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}