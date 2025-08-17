import React, {useState} from "react";
import {Calendar, Check, Plus, Search, X} from "lucide-react";

export default function Events({formData,handleInputChange}){
    const [showEventModal, setShowEventModal] = useState(false);
    const [eventSearch, setEventSearch] = useState('');
    const availableEvents = [
        {
            id: 1,
            nameAr: 'جولة في المتحف الوطني',
            nameEn: 'National Museum Tour',
            type: 'ثقافية',
            image: 'https://images.unsplash.com/photo-1566127444979-b3d2b654e715?w=300&h=200&fit=crop',
            duration: '2 ساعة',
            price: 50
        },
        {
            id: 2,
            nameAr: 'رحلة في الحديقة المائية',
            nameEn: 'Water Park Adventure',
            type: 'ترفيهية',
            image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=300&h=200&fit=crop',
            duration: '4 ساعات',
            price: 120
        },
        {
            id: 3,
            nameAr: 'جولة الطعام التراثي',
            nameEn: 'Traditional Food Tour',
            type: 'طعام وشراب',
            image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=300&h=200&fit=crop',
            duration: '3 ساعات',
            price: 80
        },
        {
            id: 4,
            nameAr: 'مهرجان الموسيقى',
            nameEn: 'Music Festival',
            type: 'موسيقية',
            image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=200&fit=crop',
            duration: '5 ساعات',
            price: 200
        }
    ];


    const filteredEvents = availableEvents.filter(event =>
        event.nameAr.toLowerCase().includes(eventSearch.toLowerCase()) ||
        event.nameEn.toLowerCase().includes(eventSearch.toLowerCase()) ||
        event.type.toLowerCase().includes(eventSearch.toLowerCase())
    );
    return (
        <div>

            {/* Events Selection */}
            <div className="bg-gradient-to-br from-slate-800/60 to-slate-900/80 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className="p-3 rounded-xl bg-teal-600/20 border border-teal-500/30">
                            <Calendar size={24} className="text-teal-400" />
                        </div>
                        <h2 className="text-2xl font-bold text-white">Events</h2>
                    </div>
                    <button
                        onClick={() => setShowEventModal(true)}
                        className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-500 hover:to-teal-600 text-white font-semibold transition-all duration-300 hover:scale-105"
                    >
                        <Plus size={18} />
                        Add Events
                    </button>
                </div>

                {formData.form.selectedEvents.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {formData.form.selectedEvents.map(event => (
                            <div key={event.id} className="bg-slate-800/40 rounded-2xl overflow-hidden border border-slate-600/30 group hover:border-teal-500/50 transition-all duration-300">
                                <div className="relative">
                                    <img
                                        src={event.image}
                                        alt={event.nameAr}
                                        className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                    <button
                                        onClick={() => {
                                            handleInputChange('selectedEvents', event);
                                        }}
                                        className="absolute top-2 right-2 p-1 bg-red-600 hover:bg-red-700 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"
                                    >
                                        <X size={16} />
                                    </button>
                                    <div className="absolute bottom-2 left-2 px-2 py-1 bg-teal-600/80 text-white text-xs rounded-lg font-semibold">
                                        {event.type}
                                    </div>
                                </div>
                                <div className="p-4">
                                    <h3 className="text-white font-bold text-sm mb-1">{event.nameAr}</h3>
                                    <p className="text-slate-300 text-xs mb-2">{event.nameEn}</p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-slate-400 text-xs">{event.duration}</span>
                                        <span className="text-teal-300 font-semibold text-sm">{event.price} $</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <Calendar size={48} className="text-slate-600 mx-auto mb-4" />
                        <p className="text-slate-400 text-lg font-medium">No events have been selected yet.</p>
                        <p className="text-slate-500 text-sm">Click "Add Events" to select events accompanying the trip.</p>
                    </div>
                )}
                {formData.errors.selectedEvents&& <p className="text-red-500 text-sm ml-3 mt-2 ">Field is required</p>}

            </div>
            {/* Events Selection Modal */}
            {showEventModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-lg border border-slate-700/50 rounded-2xl p-8 max-w-6xl w-full max-h-[80vh] overflow-y-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ">

                        <div className="flex items-center justify-between mb-6">

                            <h3 className="text-2xl font-bold text-white">Select Events</h3>
                            <div className="relative left-80">
                                <button
                                    onClick={() => setShowEventModal(false)}
                                    className="px-8 py-3 bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-500 hover:to-teal-600 text-white font-semibold rounded-2xl transition-all duration-300 hover:scale-105"
                                >
                                    ({formData.form.selectedEvents.length} Events were selected )
                                </button>
                            </div>
                            <button
                                onClick={() => setShowEventModal(false)}
                                className="text-slate-400 hover:text-white transition-colors duration-200"
                            >
                                <X size={24} />
                            </button>

                        </div>

                        {/* Search */}
                        <div className="relative mb-6">
                            <Search size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" />
                            <input
                                type="text"
                                placeholder="search for a event..."
                                value={eventSearch}
                                onChange={(e) => setEventSearch(e.target.value)}
                                className="w-full pl-12 pr-4 py-4 bg-slate-800/80 border border-slate-600/50 rounded-2xl text-white placeholder-slate-400/70 focus:outline-none focus:border-teal-500"
                            />
                        </div>

                        {/* Events Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredEvents.map(event => {
                                const isSelected = formData.form.selectedEvents.find(e => e.id === event.id);
                                return (
                                    <div
                                        key={event.id}
                                        onClick={() => {
                                            handleInputChange("selectedEvents", event)
                                        }}
                                        className={`
                                                bg-slate-800/40 border-2 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105
                                                ${isSelected
                                            ? 'border-teal-500 shadow-lg shadow-teal-500/20'
                                            : 'border-slate-600/30 hover:border-teal-500/50'
                                        }
                                            `}
                                    >
                                        <div className="relative">
                                            <img
                                                src={event.image}
                                                alt={event.nameAr}
                                                className="w-full h-32 object-cover"
                                            />
                                            <div className="absolute top-2 left-2 px-2 py-1 bg-teal-600/80 text-white text-xs rounded-lg font-semibold">
                                                {event.type}
                                            </div>
                                            {isSelected && (
                                                <div className="absolute top-2 right-2 p-1 bg-teal-600 text-white rounded-full">
                                                    <Check size={16} />
                                                </div>
                                            )}
                                        </div>
                                        <div className="p-4">
                                            <h4 className="text-white font-bold text-lg mb-1">{event.nameAr}</h4>
                                            <p className="text-slate-300 text-sm mb-3">{event.nameEn}</p>
                                            <div className="flex items-center justify-between">
                                                <span className="text-slate-400 text-sm">{event.duration}</span>
                                                <span className="text-teal-300 font-bold">{event.price} $</span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>


                    </div>
                </div>
            )}
        </div>
    )
}