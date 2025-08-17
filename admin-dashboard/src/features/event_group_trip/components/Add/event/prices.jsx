import {DollarSign, Users, Calendar, Clock, Info} from "lucide-react";
export default function Prices({formData, handleInputChange}){
    return (
        <div className="bg-gradient-to-br from-slate-800/60 to-slate-900/80 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 shadow-2xl">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-teal-600/20 border border-teal-500/30">
                    <Clock size={24} className="text-teal-400" />
                </div>
                <h2 className="text-2xl font-bold text-white">Event Configuration</h2>
            </div>

            {/* Time-based Event Toggle */}
            <div className="mb-8 p-6 bg-slate-800/40 border border-slate-600/30 rounded-xl">
                <div className="flex items-center gap-3 mb-4">
                    <Clock size={20} className="text-teal-400" />
                    <h3 className="text-lg font-semibold text-white">Event Type</h3>
                </div>
                <label className="flex items-center gap-3 cursor-pointer group">
                    <div className="relative">
                        <input
                            type="checkbox"
                            checked={formData.form.isTimeBased || false}
                            onChange={(e) => handleInputChange('isTimeBased', e.target.checked)}
                            className="sr-only"
                        />
                        <div className={`w-12 h-6 rounded-full transition-all duration-300 ${
                            formData.form.isTimeBased
                                ? 'bg-teal-500 shadow-lg shadow-teal-500/30'
                                : 'bg-slate-600'
                        }`}>
                            <div className={`w-5 h-5 bg-white rounded-full transition-all duration-300 transform ${
                                formData.form.isTimeBased ? 'translate-x-6 translate-y-0.5' : 'translate-x-0.5 translate-y-0.5'
                            }`}></div>
                        </div>
                    </div>
                    <span className="text-white font-medium group-hover:text-teal-300 transition-colors duration-200">
                        This event is time-bound with ticketing
                    </span>
                </label>
                <div className={`mt-4 p-4 rounded-lg border transition-all duration-300 ${
                    formData.form.isTimeBased
                        ? 'bg-teal-900/10 border-teal-500/20 text-teal-200'
                        : 'bg-slate-800/20 border-slate-600/20 text-slate-400'
                }`}>
                    <div className="flex items-start gap-3">
                        <Info size={16} className={`mt-0.5 ${formData.form.isTimeBased ? 'text-teal-400' : 'text-slate-500'}`} />
                        <div className="text-sm">
                            {formData.form.isTimeBased ? (
                                <div>
                                    <p className="font-medium mb-1">Time-bound Event with Ticketing</p>
                                    <p>This event has specific start/end dates and requires ticket sales management with pricing configuration.</p>
                                </div>
                            ) : (
                                <div>
                                    <p className="font-medium mb-1">Open Event (No Time Restrictions)</p>
                                    <p>This is a general event without specific dates or ticketing requirements.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Date Range - Only show if time-based is enabled */}
            <div className={`transition-all duration-700 ease-in-out overflow-hidden ${
                formData.form.isTimeBased
                    ? 'max-h-96 opacity-100 transform translate-y-0 mb-8'
                    : 'max-h-0 opacity-0 transform -translate-y-4 mb-0'
            }`}>
                <div className={`p-6 bg-gradient-to-r from-teal-900/20 to-cyan-900/20 border border-teal-500/30 rounded-xl transition-all duration-500 transform ${
                    formData.form.isTimeBased
                        ? 'scale-100 shadow-lg shadow-teal-500/10'
                        : 'scale-95'
                }`}>
                    <div className={`flex items-center gap-3 mb-6 transition-all duration-500 delay-200 ${
                        formData.form.isTimeBased
                            ? 'opacity-100 transform translate-x-0'
                            : 'opacity-0 transform -translate-x-4'
                    }`}>
                        <div className="p-2 rounded-lg bg-teal-600/20 border border-teal-500/30">
                            <Calendar size={20} className="text-teal-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-white">Event Duration</h3>
                    </div>
                    <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 transition-all duration-500 delay-300 ${
                        formData.form.isTimeBased
                            ? 'opacity-100 transform translate-y-0'
                            : 'opacity-0 transform translate-y-4'
                    }`}>
                        {/* Start Date */}
                        <div className="space-y-3 transform transition-all duration-500 hover:scale-105">
                            <label className="flex items-center gap-2 text-white font-semibold">
                                <Calendar size={18} className="text-teal-400" />
                                Start Date & Time
                            </label>
                            <input
                                type="date"
                                value={formData.form.startDate || 'today'}
                                onChange={(e) => handleInputChange('startDate', e.target.value)}
                                className="w-full p-4 bg-slate-800/80 backdrop-blur-sm border border-slate-600/50 hover:border-slate-500/70 rounded-2xl text-white focus:outline-none focus:border-teal-500 focus:shadow-lg focus:shadow-teal-500/20 shadow-lg transition-all duration-300"
                                required={formData.form.isTimeBased}
                                min={formData.form.startDate}
                            />

                        </div>

                        {/* End Date */}
                        <div className="space-y-3 transform transition-all duration-500 hover:scale-105">
                            <label className="flex items-center gap-2 text-white font-semibold">
                                <Calendar size={18} className="text-teal-400" />
                                End Date & Time
                            </label>
                            <input
                                type="date"
                                value={formData.form.endDate || ''}
                                onChange={(e) => handleInputChange('endDate', e.target.value)}
                                className="w-full p-4 bg-slate-800/80 backdrop-blur-sm border border-slate-600/50 hover:border-slate-500/70 rounded-2xl text-white focus:outline-none focus:border-teal-500 focus:shadow-lg focus:shadow-teal-500/20 shadow-lg transition-all duration-300"
                                required={formData.form.isTimeBased}
                                min={formData.form.startDate}
                            />
                            {formData.errors.endDate&& <p className="text-red-500 text-sm ml-3 ">Field is required</p>}

                        </div>
                    </div>

                    {/* Duration Display */}
                    <div className={`transition-all duration-700 delay-600 overflow-hidden ${
                        formData.form.startDate && formData.form.endDate && formData.form.isTimeBased
                            ? 'max-h-20 opacity-100 transform translate-y-0 mt-6'
                            : 'max-h-0 opacity-0 transform -translate-y-2 mt-0'
                    }`}>
                        <div className="p-4 bg-slate-800/40 rounded-xl border border-slate-700/30 transform transition-all duration-300">
                            <p className="text-teal-300 text-sm font-medium flex items-center gap-2">
                                <Clock size={16} className="text-teal-400" />
                                Event Duration: {formData.form.startDate && formData.form.endDate && (() => {
                                const start = new Date(formData.form.startDate);
                                const end = new Date(formData.form.endDate);
                                const diffTime = Math.abs(end - start);
                                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                                return diffDays === 1 ? '1 day' : `${diffDays} days`;
                            })()}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Pricing Section - Always visible */}
            <div className="mb-8">
                {/* Pricing Header */}
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 rounded-xl bg-emerald-600/20 border border-emerald-500/30">
                        <DollarSign size={24} className="text-emerald-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-white">Pricing Configuration</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {/* Ticket Price */}
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
                        {formData.form.ticketPrice && (
                            <p className="text-emerald-300 text-sm font-medium">
                                Cost: ${formData.form.ticketPrice}
                            </p>
                        )}
                    </div>

                    {/* User Price */}
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
                                min={formData.form.ticketPrice}
                                step="0.01"
                            />
                            {formData.errors.userPrice&& <p className="text-red-500 text-sm ml-3 ">Field is required</p>}

                            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                                <span className="text-slate-400 font-medium">$</span>
                            </div>
                        </div>
                        {formData.form.userPrice && (
                            <p className="text-emerald-300 text-sm font-medium">
                                Price: ${formData.form.userPrice}
                            </p>
                        )}
                    </div>
                </div>

                {/* Profit per person indicator */}
                {formData.form.ticketPrice && formData.form.userPrice && (
                    <div className="p-4 bg-slate-800/40 border border-slate-600/30 rounded-xl mb-6">
                        <div className="flex items-center justify-center gap-3">
                            <DollarSign size={16} className="text-emerald-400" />
                            <span className="text-slate-300 text-sm">Profit per Person:</span>
                            <span className={`font-bold text-lg ${
                                (Number(formData.form.userPrice) - Number(formData.form.ticketPrice)) >= 0
                                    ? 'text-emerald-400'
                                    : 'text-red-400'
                            }`}>
                                ${(Number(formData.form.userPrice) - Number(formData.form.ticketPrice)).toFixed(2)}
                            </span>
                        </div>
                    </div>
                )}
            </div>

            {/* Ticketing Details - Only show if time-based is enabled */}
            <div className={`transition-all duration-700 ease-in-out overflow-hidden ${
                formData.form.isTimeBased
                    ? 'max-h-screen opacity-100 transform translate-y-0 mb-8'
                    : 'max-h-0 opacity-0 transform -translate-y-4 mb-0'
            }`}>
                <div className={`transition-all duration-500 delay-400 ${
                    formData.form.isTimeBased
                        ? 'opacity-100 transform translate-y-0'
                        : 'opacity-0 transform translate-y-4'
                }`}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {/* Max Tickets */}
                        <div className="space-y-3 transform transition-all duration-500 mb-8">
                            <label className="flex items-center gap-2 text-white font-semibold">
                                <Users size={18} className="text-emerald-400" />
                                Maximum Tickets Available
                            </label>
                            <input
                                type="number"
                                value={formData.form.maxTickets || ''}
                                onChange={(e) => handleInputChange('maxTickets', e.target.value)}
                                placeholder="100"
                                className="w-full p-4 bg-slate-800/80 backdrop-blur-sm border border-slate-600/50 hover:border-slate-500/70 rounded-2xl text-white placeholder-slate-400/70 focus:outline-none focus:border-emerald-500 focus:shadow-lg focus:shadow-emerald-500/20 shadow-lg transition-all duration-300 max-w-md"
                                required={formData.form.isTimeBased}
                                min="1"
                            />
                            {formData.errors.maxTickets&& <p className="text-red-500 text-sm ml-3 ">Field is required</p>}

                            {formData.form.maxTickets && (
                                <p className="text-emerald-400 text-sm font-medium">
                                    Limit: {formData.form.maxTickets} tickets maximum
                                </p>
                            )}
                        </div>
                        {/* count Tickets */}
                        <div className="space-y-3  transform transition-all duration-500 mb-8">
                            <label className="flex items-center gap-2 text-white font-semibold">
                                <Users size={18} className="text-emerald-400" />
                                Tickets Count
                            </label>
                            <input
                                type="number"
                                value={formData.form.ticketCount || ''}
                                onChange={(e) => handleInputChange('ticketCount', e.target.value)}
                                placeholder="100"
                                className="w-full p-4 bg-slate-800/80 backdrop-blur-sm border border-slate-600/50 hover:border-slate-500/70 rounded-2xl text-white placeholder-slate-400/70 focus:outline-none focus:border-emerald-500 focus:shadow-lg focus:shadow-emerald-500/20 shadow-lg transition-all duration-300 max-w-md"
                                required={formData.form.isTimeBased}
                                max={formData.form.maxTickets}
                            />
                            {formData.errors.ticketCount&& <p className="text-red-500 text-sm ml-3 ">Field is required</p>}

                            {formData.form.ticketCount && (
                                <p className="text-emerald-400 text-sm font-medium">
                                    count: {formData.form.ticketCount} tickets
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Total Revenue & Profit Calculation */}
                    {formData.form.ticketPrice && formData.form.userPrice && formData.form.maxTickets && (
                        <div className="transition-all duration-700 delay-600">
                            <div className="p-6 bg-gradient-to-r from-blue-900/20 to-emerald-900/20 border border-blue-500/30 rounded-xl shadow-lg">
                                <h3 className="text-blue-300 font-semibold text-lg mb-4 flex items-center gap-2">
                                    <DollarSign size={20} className="text-blue-400" />
                                    Total Revenue & Profit Analysis
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-center">
                                    <div className="bg-slate-800/40 p-5 rounded-xl border border-slate-700/30 hover:scale-105 transition-all duration-300">
                                        <p className="text-slate-300 text-sm mb-2">Total Revenue</p>
                                        <p className="text-white font-bold text-2xl">
                                            ${(Number(formData.form.userPrice) * Number(formData.form.maxTickets)).toFixed(2)}
                                        </p>
                                        <p className="text-slate-400 text-xs mt-1">
                                            {formData.form.maxTickets} tickets × ${formData.form.userPrice}
                                        </p>
                                    </div>
                                    <div className="bg-slate-800/40 p-5 rounded-xl border border-slate-700/30 hover:scale-105 transition-all duration-300">
                                        <p className="text-slate-300 text-sm mb-2">Total Profit</p>
                                        <p className={`font-bold text-2xl ${
                                            ((Number(formData.form.userPrice) - Number(formData.form.ticketPrice)) * Number(formData.form.maxTickets)) >= 0
                                                ? 'text-emerald-400'
                                                : 'text-red-400'
                                        }`}>
                                            ${((Number(formData.form.userPrice) - Number(formData.form.ticketPrice)) * Number(formData.form.maxTickets)).toFixed(2)}
                                        </p>
                                        <p className="text-slate-400 text-xs mt-1">
                                            {formData.form.maxTickets} tickets × ${(Number(formData.form.userPrice) - Number(formData.form.ticketPrice)).toFixed(2)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}