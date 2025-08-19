import React, { useMemo} from "react";
import {useLocation} from "react-router-dom";

export default function PopularItems({ events, groupTrips, activeTab, setActiveTab }) {
    const image = "https://lh3.googleusercontent.com/aida-public/AB6AXuCDapy81jQAGhyEZAFleT7OxwoPfYFkdY9yTAvCT_kNT8onwkIVvdtMkHH0AcZ-3H_FE8ALVdwOdA_-HBwZyruGodWcI_oXEzCq4WEdTKu9QyY9XItlcJlRJ5qA3RX5Z7EOEDW351anFoTLup6g6lBDD0O6Y2VXkmrt8DiBs7BvO6IrN1-VYibH-5pv24OpYo5Co5Vu5hGmWwzfN_EMKbNacDHgK7f0zUoDW6BI5e_cntRLaJ-NbRYiugicwaFmk5LWEIyys8_V-j0";
    const location = useLocation();
    const items = useMemo(() => {
        if(activeTab === 'events'){
            return events;
        }
        return groupTrips;
    }, [activeTab, events, groupTrips,location]);

    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'active':        // شغال/مفعل
                return 'bg-green-600/20 text-green-300 border-green-400';
            case 'finished':      // منتهي
                return 'bg-emerald-600/20 text-emerald-300 border-emerald-400';
            case 'inactive':      // غير مفعل
                return 'bg-red-600/20 text-red-300 border-red-400';
            case 'pending':       // قيد الانتظار
                return 'bg-yellow-600/20 text-yellow-300 border-yellow-400';
            case 'in_progress':   // قيد التنفيذ
                return 'bg-blue-600/20 text-blue-300 border-blue-400';
            case 'completed':     // مكتمل بنجاح
                return 'bg-slate-600/20 text-slate-300 border-slate-400';
            default:              // غير معروف
                return 'bg-gray-600/20 text-gray-300 border-gray-400';
        }

    };

    const formatPrice = (price) => {
        if (typeof price === 'number') {
            return `$${price.toLocaleString()}`;
        }
        return price || 'TBD';
    };

    const renderStars = (rating) => {
        if (!rating) return null;
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;

        for (let i = 0; i < fullStars; i++) {
            stars.push(<span key={i} className="text-yellow-400">★</span>);
        }
        if (hasHalfStar) {
            stars.push(<span key="half" className="text-yellow-400">☆</span>);
        }
        const emptyStars = 5 - Math.ceil(rating);
        for (let i = 0; i < emptyStars; i++) {
            stars.push(<span key={`empty-${i}`} className="text-gray-600">★</span>);
        }
        return stars;
    };

    return (
        <div>
            <h2 className="text-white text-2xl font-bold mb-6 flex items-center gap-3">
                <span>🔥</span>
                Popular Events & Group Trips
            </h2>

            {/* Tabs */}
            <div className="mb-6">
                <div className="flex bg-gray-800/50 rounded-2xl p-1 w-fit backdrop-blur-md border border-gray-700/50">
                    {[
                        { id: 'events', label: 'Events' },
                        { id: 'tours', label: 'Group Tours' }
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                                activeTab === tab.id
                                    ? 'bg-blue-600/20 text-blue-300 border border-blue-400 shadow-lg'
                                    : 'text-gray-400 hover:text-white hover:bg-gray-800/40'
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Popular Items Cards */}
            <div className="flex overflow-x-auto p-6 gap-6 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {items?.map((item, index) => (
                    <div
                        key={index}
                        className="flex-shrink-0 w-80 bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 rounded-2xl overflow-hidden hover:border-blue-400 transition-all duration-300 hover:shadow-2xl hover:scale-105 group"
                    >
                        <div className="relative overflow-hidden">
                            <img
                                src={item.images?.[0]?.url || image}
                                alt={item.name}
                                className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                            {/* Price Badge */}
                            <div className="absolute top-4 right-4">
                                {item.hasoffer && item.basic_cost && (
                                    <div className="bg-red-600/90 text-white px-2 py-1 rounded-lg text-xs font-bold mb-2 shadow-lg">
                                        -{Math.round(((item.basic_cost - parseFloat(item.price?.replace(/[$,]/g, '') || 0)) / item.basic_cost) * 100)}% OFF
                                    </div>
                                )}
                                <div className="bg-gray-900/90 backdrop-blur-sm rounded-lg px-3 py-2 border border-blue-400/50">
                                    {item.has_offer && item.basic_cost && (
                                        <div className="text-gray-400 text-xs line-through mb-1">
                                            {formatPrice(item.basic_cost)}$
                                        </div>
                                    )}
                                    <div className="text-blue-300 text-sm font-bold">
                                        {formatPrice(item.price)}$
                                    </div>
                                </div>
                            </div>

                            {/* Status Badge */}
                            {item.status && (
                                <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold border shadow-md ${getStatusColor(item.status)}`}>
                                    {item.status}
                                </div>
                            )}
                        </div>

                        <div className="p-6">
                            {/* Title */}
                            <h3 className="text-white text-lg font-bold mb-3 group-hover:text-blue-300 transition-colors line-clamp-2">
                                {item.name}
                            </h3>

                            {/* Rating */}
                            {item.rate && (
                                <div className="flex items-center gap-2 mb-3">
                                    <div className="flex">
                                        {renderStars(item.rate)}
                                    </div>
                                    <span className="text-gray-400 text-sm">
                                        {item.rate} {item.reviewer_count && `(${item.reviewer_count} reviews)`}
                                    </span>
                                </div>
                            )}

                            {/* Description */}
                            <div className="text-gray-400 text-sm leading-relaxed">
                                <p className="line-clamp-3">
                                    {item.description || 'No description available'}
                                </p>
                            </div>

                            {/* Additional Info */}
                            <div className="mt-4 pt-4 border-t border-gray-700/50">
                                <div className="flex flex-wrap gap-2 text-xs">
                                    {(item.starting_date || item.start_date) && (
                                        <span className="bg-gray-700/50 text-gray-300 px-2 py-1 rounded-lg">
                                            ⏱️Duration:
                                            {(() => {
                                                const start = new Date(item.starting_date || item.start_date);
                                                const end = new Date(item.ending_date || item.end_date);

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
                                        </span>
                                    )}

                                    {item.tickets_limit && (
                                        <span className="bg-gray-700/50 text-gray-300 px-2 py-1 rounded-lg">
                                            ️🎫Expected: {item.tickets_limit}
                                        </span>
                                    )}
                                    {item.tickets_count && (
                                        <span className="bg-gray-700/50 text-gray-300 px-2 py-1 rounded-lg">
                                            👥Reserved: {item.tickets_count}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}