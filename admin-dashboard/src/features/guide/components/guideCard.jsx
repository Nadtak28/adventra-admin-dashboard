import {Users, Calendar, Star, TrendingDown, MapPin, Languages, Mail, Phone, Award, TrendingUp} from 'lucide-react';
import React from "react";

const GuideCard = ({ guide, nav }) => {
    const getPerformanceColor = (rating) => {
        const numRating = parseFloat(rating);
        if (numRating >= 4) return 'from-green-400 to-emerald-400';
        if (numRating >= 3) return 'from-yellow-400 to-orange-400';
        if (numRating >= 2) return 'from-orange-400 to-red-400';
        return 'from-red-400 to-pink-400';
    };

    const getPerformancePercentage = (rating) => {
        return Math.round((parseFloat(rating) / 5) * 100);
    };

    const getBadgeInfo = (rating) => {
        const numRating = parseFloat(rating);
        if (numRating >= 4.5) return { type: 'top', label: 'Top Rated', color: 'from-yellow-500 to-orange-500', icon: Star };
        if (numRating >= 4) return { type: 'excellent', label: 'Excellent', color: 'from-green-500 to-emerald-500', icon: TrendingUp };
        if (numRating >= 3) return { type: 'good', label: 'Good', color: 'from-blue-500 to-cyan-500', icon: Users };
        if (numRating >= 2) return { type: 'average', label: 'Average', color: 'from-yellow-500 to-orange-500', icon: Award };
        return { type: 'needs-help', label: 'Needs Help', color: 'from-red-500 to-pink-500', icon: TrendingDown };
    };

    const badge = getBadgeInfo(guide.monthly_rating);
    const BadgeIcon = badge.icon;
    const performancePercentage = getPerformancePercentage(guide.monthly_rating);

    return (
        <div onClick={()=>{
            nav(guide.id)
        }}
            className="group relative flex h-full flex-1 flex-col gap-4 rounded-2xl min-w-64 bg-gradient-to-br from-slate-800/80 to-slate-900/90 p-6 border border-slate-700/50 backdrop-blur-sm hover:shadow-2xl hover:shadow-teal-500/10 transition-all duration-500 hover:scale-105 hover:border-teal-500/30 hover:-translate-y-2">

            {/* Performance Badge */}
            <div className="absolute -top-2 -right-2 z-10">
                <div className={`bg-gradient-to-r ${badge.color} text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-lg`}>
                    <BadgeIcon size={12} fill={badge.type === 'top' ? "white" : undefined} />
                    {badge.label}
                </div>
            </div>

            {/* Status Indicator */}
            {guide.status !== 'active' && (
                <div className="absolute top-2 left-2 z-10">
                    <div className="bg-red-500/80 text-white text-xs font-medium px-2 py-1 rounded-full">
                        Inactive
                    </div>
                </div>
            )}

            {/* Guide Image/Avatar */}
            <div className="w-full aspect-square rounded-xl overflow-hidden relative">
                {guide?.images?.[0]?.url ? (
                    <img
                        src={guide.images[0].url}
                        alt={guide.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white text-2xl font-bold">
                        {guide.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                    </div>
                )}

                {/* Overall Rating Overlay */}
                <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-sm rounded-lg px-2 py-1 flex items-center gap-1 shadow-lg">
                    <Star size={14} className="text-yellow-400" fill="currentColor" />
                    <span className="text-white text-sm font-semibold">{guide.rate}/5</span>
                </div>

                {/* Monthly Rating Overlay */}
                <div className="absolute bottom-3 left-3 bg-teal-600/90 backdrop-blur-sm rounded-lg px-2 py-1 flex items-center gap-1 shadow-lg">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <span className="text-white text-xs font-medium">Month: {guide.monthly_rating}</span>
                </div>

                {/* Reviews Count */}
                <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm rounded-lg px-2 py-1 text-white text-xs">
                    {guide.reviewer_count} reviews
                </div>

                {/* Hover Actions */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/30">
                    <div className="flex gap-2">
                        <button className="bg-teal-500/90 hover:bg-teal-400 text-white p-2 rounded-full backdrop-blur-sm transition-all duration-200 hover:scale-110">
                            <Users size={16} />
                        </button>
                        <button className="bg-slate-700/90 hover:bg-slate-600 text-white p-2 rounded-full backdrop-blur-sm transition-all duration-200 hover:scale-110">
                            <Calendar size={16} />
                        </button>
                        <button className="bg-blue-500/90 hover:bg-blue-400 text-white p-2 rounded-full backdrop-blur-sm transition-all duration-200 hover:scale-110">
                            <Mail size={16} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Guide Information */}
            <div className="space-y-3 flex-1">
                {/* Name and Location */}
                <div>
                    <p className="text-white text-lg font-semibold leading-normal group-hover:text-teal-300 transition-colors duration-300">
                        {guide.name}
                    </p>
                    <div className="flex items-center justify-between mt-1">
                        <p className="text-teal-300 text-sm flex items-center gap-1">
                            <MapPin size={12} />
                            {guide.city.name}
                        </p>
                        <p className="text-slate-400 text-xs flex items-center gap-1">
                            <Phone size={12} />
                            {guide.phone}
                        </p>
                    </div>
                </div>

                {/* Salary Information */}
                <div className="space-y-2 bg-slate-800/50 rounded-lg p-3">
                    <div className="flex items-center justify-between">
                        <span className="text-slate-400 text-sm">Base Salary:</span>
                        <span className="text-teal-400 font-bold text-base">${guide.const_salary}</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-slate-400 text-sm">Extra Salary:</span>
                        <span className="text-emerald-400 font-bold text-base">${guide.extra_salary}</span>
                    </div>
                    <div className="flex items-center justify-between border-t border-slate-700 pt-2">
                        <span className="text-slate-300 text-sm font-medium">Guide Price:</span>
                        <span className="text-white font-bold text-lg">${guide.price}</span>
                    </div>
                </div>

                {/* Categories */}
                <div>
                    <span className="text-slate-400 text-xs mb-2 block">Specializations:</span>
                    <div className="flex flex-wrap gap-1">
                        {guide.categories.slice(0, 3).map(category => (
                            <span key={category.id} className="bg-teal-500/20 text-teal-300 px-2 py-1 rounded-full text-xs border border-teal-500/30">
                                {category.name}
                            </span>
                        ))}
                        {guide.categories.length > 3 && (
                            <span className="bg-slate-600/50 text-slate-300 px-2 py-1 rounded-full text-xs">
                                +{guide.categories.length - 3}
                            </span>
                        )}
                    </div>
                </div>

                {/* Languages */}
                <div>
                    <span className="text-slate-400 text-xs mb-2 flex items-center gap-1">
                        <Languages size={12} />
                        Languages:
                    </span>
                    <div className="flex flex-wrap gap-1">
                        {guide.languages.slice(0, 4).map(language => (
                            <span key={language.id} className="bg-purple-500/20 text-purple-300 px-2 py-1 rounded-full text-xs border border-purple-500/30">
                                {language.name.toUpperCase()}
                            </span>
                        ))}
                        {guide.languages.length > 4 && (
                            <span className="bg-slate-600/50 text-slate-300 px-2 py-1 rounded-full text-xs">
                                +{guide.languages.length - 4}
                            </span>
                        )}
                    </div>
                </div>

                {/* Performance and Rating Details */}
                <div className="mt-4 space-y-3">
                    {/* Overall Rating */}
                    <div className="bg-slate-800/50 rounded-lg p-3">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-slate-400 text-xs">Overall Rating</span>
                            <div className="flex items-center gap-1">
                                <Star size={14} className="text-yellow-400 fill-current" />
                                <span className="text-white font-semibold">{guide.rate}/5</span>
                            </div>
                        </div>
                        <div className="flex justify-between text-xs text-slate-400">
                            <span>{guide.reviewer_count} reviews</span>
                            <span>{guide.stars_count} total stars</span>
                        </div>
                    </div>

                    {/* Monthly Performance */}
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-slate-400 text-xs">Monthly Performance</span>
                            <span className="text-slate-300 text-xs font-semibold">{performancePercentage}%</span>
                        </div>
                        <div className="w-full bg-slate-700/50 rounded-full h-3 overflow-hidden">
                            <div
                                className={`h-full rounded-full transition-all duration-1000 bg-gradient-to-r ${getPerformanceColor(guide.monthly_rating)}`}
                                style={{ width: `${performancePercentage}%` }}
                            />
                        </div>
                        <div className="flex justify-between items-center mt-1">
                            <span className="text-slate-500 text-xs">Rating: {guide.monthly_rating}/5.0</span>
                            <span className={`text-xs font-medium ${badge.type === 'top' || badge.type === 'excellent' ? 'text-green-400' : badge.type === 'needs-help' ? 'text-red-400' : 'text-yellow-400'}`}>
                                {badge.label}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Contact Button */}
                <button className="w-full mt-4 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-400 hover:to-teal-500 text-white py-2 px-4 rounded-xl font-medium transition-all duration-300 hover:shadow-lg hover:shadow-teal-500/20 flex items-center justify-center gap-2">
                    <Mail size={16} />
                    Contact Guide
                </button>
            </div>
        </div>
    );
};

export default GuideCard;