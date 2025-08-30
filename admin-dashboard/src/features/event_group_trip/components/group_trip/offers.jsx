import React, {useMemo, useState} from "react";
import {Percent, Plus, Save, X, Edit} from "lucide-react";
import {EventService} from "../../api/getEventService.jsx";

const OffersSection = ({
                           offers,
                           hasOffer,
                           isEditing,
                           onOfferChange,
                           onAddOffer,
                           event,
                           handleEditOffer
                       }) => {

    const today = useMemo(() => {
        const date = new Date();
        date.setDate(date.getDate() + 1);
        return date.toISOString().split('T')[0];
    }, []);
    const [showAddOffer, setShowAddOffer] = useState(false);
    const [editingOfferId, setEditingOfferId] = useState(null);
    const [newOffer, setNewOffer] = useState({
        discount: '',
        start_date: '',
        end_date: ''
    });

    // آخر عرض (الأحدث)
    const latestOffer = offers && offers.length > 0 ? offers[offers.length - 1] : null;

    const formatDateForInput = (dateString) => {
        if (!dateString) return '';
        return dateString.split('T')[0];
    };

    const handleAddNewOffer = () => {
        if (newOffer.discount && newOffer.start_date && newOffer.end_date) {
            onAddOffer(newOffer);
            setNewOffer({ discount: '', start_date: '', end_date: '' });
            setShowAddOffer(false);
        }
    };

    const handleStartEdit = (offerId) => {
        setEditingOfferId(offerId);
    };

    const handleSaveEdit = () => {
        if (latestOffer) {
            handleEditOffer({
                discount: latestOffer.discount,
                start_date: formatDateForInput(latestOffer.start_date),
                end_date: formatDateForInput(latestOffer.end_date)
            });
        }
        setEditingOfferId(null);
    };

    const handleCancelEdit = () => {
        setEditingOfferId(null);
    };

    return (
        <section className="animate-fade-in-up animation-delay-600 bg-gradient-to-br from-slate-800/50 via-slate-700/30 to-slate-800/50 backdrop-blur-sm border border-slate-600/30 rounded-xl p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-orange-500/20 rounded-lg">
                    <Percent className="w-6 h-6 text-orange-400" />
                </div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
                    Offers
                </h2>
            </div>

            {offers && offers.length > 0 ? (
                <div className="space-y-4">
                    {/* عرض جميع العروض */}
                    {offers.map((offer, index) => {
                        const isLatest = index === offers.length - 1;
                        const isCurrentlyEditing = editingOfferId === offer.id && isEditing&& isLatest;

                        return (
                            <div key={offer.id || index} className="bg-slate-700/50 rounded-lg p-4 border border-slate-600/50">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg font-semibold text-slate-200">
                                        {isLatest ? 'Latest Offer' : `Offer ${index + 1}`}
                                        {isLatest && hasOffer && (
                                            <span className="ml-2 px-2 py-1 text-xs bg-green-500/20 text-green-400 rounded-full">
                                                Active
                                            </span>
                                        )}
                                    </h3>

                                    {/* زر التعديل يظهر فقط للعرض الأخير عندما hasOffer = true */}
                                    {isLatest && isEditing && new Date() < new Date('2025-09-06T21:00:00.000000Z') && (
                                        <button
                                            onClick={() => handleStartEdit(offer.id)}
                                            className="flex items-center gap-2 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm"
                                        >
                                            <Edit className="w-4 h-4" />
                                            Edit
                                        </button>
                                    )}
                                </div>

                                {isCurrentlyEditing ? (
                                    // نموذج التعديل للعرض الأخير فقط
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                                Discount (%)
                                            </label>
                                            <input
                                                type="number"
                                                value={offer.discount}
                                                onChange={(e) => onOfferChange('discount', e.target.value)}
                                                className="w-full px-3 py-2 bg-slate-600/50 border border-slate-500 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                                                placeholder="مثال: 20"
                                                min="0"
                                                max="100"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                                Start Date
                                            </label>
                                            <input
                                                type="date"
                                                value={formatDateForInput(offer.start_date)}
                                                onChange={(e) => onOfferChange('start_date', e.target.value)}
                                                className="w-full px-3 py-2 bg-slate-600/50 border border-slate-500 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                                                min={today}
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                                End Date
                                            </label>
                                            <input
                                                type="date"
                                                value={formatDateForInput(offer.end_date)}
                                                onChange={(e) => onOfferChange('end_date', e.target.value)}
                                                className="w-full px-3 py-2 bg-slate-600/50 border border-slate-500 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                                            />
                                        </div>

                                        <div className="md:col-span-3 flex justify-center gap-3 mt-4">
                                            <button
                                                onClick={handleSaveEdit}
                                                className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                                            >
                                                <Save className="w-4 h-4" />
                                                Save
                                            </button>
                                            <button
                                                onClick={handleCancelEdit}
                                                className="flex items-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
                                            >
                                                <X className="w-4 h-4" />
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    // عرض البيانات فقط
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div className="bg-orange-500/10 rounded-lg p-3 border border-orange-500/20">
                                            <div className="text-sm text-slate-400">Discount %</div>
                                            <div className="text-xl font-bold text-orange-400">{offer.discount}%</div>
                                        </div>

                                        <div className="bg-blue-500/10 rounded-lg p-3 border border-blue-500/20">
                                            <div className="text-sm text-slate-400">Start Date</div>
                                            <div className="text-lg font-medium text-blue-400">
                                                {formatDateForInput(offer.start_date)}
                                            </div>
                                        </div>

                                        <div className="bg-red-500/10 rounded-lg p-3 border border-red-500/20">
                                            <div className="text-sm text-slate-400">End Date</div>
                                            <div className="text-lg font-medium text-red-400">
                                                {formatDateForInput(offer.end_date)}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            ) : (
                // لا توجد عروض
                <div className="text-center py-8">
                    <div className="text-slate-400 mb-4">No Offers Available</div>
                </div>
            )}

            {/* قسم إضافة عرض جديد - يظهر فقط عندما hasOffer = false */}
            {!hasOffer && (
                <div className="mt-6">
                    {!showAddOffer ? (
                        <div className="text-center">
                            {isEditing&&!hasOffer && offers?.[0]?(new Date() > new Date(offers?.[0]?.end_date)):true && (
                                <button
                                    onClick={() => setShowAddOffer(true)}
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors"
                                >
                                    <Plus className="w-4 h-4" />
                                    Add New Offer
                                </button>
                            )}
                        </div>
                    ) : (
                        <div className="bg-slate-700/50 rounded-lg p-6 border border-slate-600/50">
                            <h3 className="text-lg font-semibold text-slate-200 mb-4">Add New Offer</h3>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-2">
                                        Discount (%)
                                    </label>
                                    <input
                                        type="number"
                                        value={newOffer.discount}
                                        onChange={(e) => setNewOffer(prev => ({...prev, discount: e.target.value}))}
                                        className="w-full px-3 py-2 bg-slate-600/50 border border-slate-500 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                                        placeholder="Example: 20"
                                        min="0"
                                        max="100"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-2">
                                        Start Date
                                    </label>
                                    <input
                                        type="date"
                                        value={newOffer.start_date}
                                        onChange={(e) => setNewOffer(prev => ({...prev, start_date: e.target.value}))}
                                        className="w-full px-3 py-2 bg-slate-600/50 border border-slate-500 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                                        min={today}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-2">
                                        End Date
                                    </label>
                                    <input
                                        type="date"
                                        value={newOffer.end_date}
                                        onChange={(e) => setNewOffer(prev => ({...prev, end_date: e.target.value}))}
                                        className="w-full px-3 py-2 bg-slate-600/50 border border-slate-500 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    />
                                </div>
                            </div>

                            <div className="flex justify-center gap-3">
                                <button
                                    onClick={handleAddNewOffer}
                                    className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                                >
                                    <Save className="w-4 h-4" />
                                    Save
                                </button>
                                <button
                                    onClick={() => {
                                        setShowAddOffer(false);
                                        setNewOffer({ discount: '', start_date: '', end_date: '' });
                                    }}
                                    className="flex items-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
                                >
                                    <X className="w-4 h-4" />
                                    Cancel
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </section>
    );
};

export default OffersSection;