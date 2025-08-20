import React, {useMemo, useState} from "react";
import { X, Gift, Star, Plus, Minus } from "lucide-react";

export default function FrequentBookers({bookersEvents, bookersGroupTrips, bookersTab, setBookersTab,updateFields,rewardBooker,rewardPoints,sendGift}) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const items = useMemo(() => {
        if (bookersTab === 'bookersEvents') {
            return bookersEvents;
        }
        if (bookersTab === 'bookersGroupTrips') {
            return bookersGroupTrips;
        }
        return []
    }, [bookersTab, bookersEvents, bookersGroupTrips]);

    const handleGiveReward = (customer) => {
        updateFields('rewardBooker',customer);
        setIsModalOpen(true);
    };


    const closeModal = () => {
        setIsModalOpen(false);
        updateFields('rewardPoints',0);
        updateFields('rewardBooker',null);
    };

    return (
        <div>
            <h2 className="text-white text-2xl font-bold mb-6 flex items-center gap-3">
                <span>⭐</span>
                Frequent Bookers
            </h2>

            {/* أزرار تبديل النوع */}
            <div className="mb-6 flex gap-2">
                <button
                    onClick={() => setBookersTab('bookersEvents')}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                        bookersTab === 'bookersEvents'
                            ? 'bg-blue-600 text-white shadow-lg'
                            : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                >
                    Event Bookings
                </button>
                <button
                    onClick={() => setBookersTab('bookersGroupTrips')}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                        bookersTab === 'bookersGroupTrips'
                            ? 'bg-blue-600 text-white shadow-lg'
                            : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                >
                    Group Trip Bookings
                </button>
            </div>

            <div className="bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 rounded-2xl overflow-hidden shadow-2xl">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                        <tr className="bg-gray-900/50">
                            <th className="px-6 py-4 text-left text-white text-sm font-semibold">Name</th>
                            <th className="px-6 py-4 text-left text-white text-sm font-semibold">Email</th>
                            <th className="px-6 py-4 text-left text-white text-sm font-semibold">Event Bookings</th>
                            <th className="px-6 py-4 text-left text-white text-sm font-semibold">Group Trip Bookings</th>
                            <th className="px-6 py-4 text-center text-white text-sm font-semibold">Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {items && items.map((customer, index) => (
                            <tr key={customer.id || index} className="border-t border-gray-700/50 hover:bg-gray-800/30 transition-colors duration-200">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-gradient-to-r from-gray-800 to-gray-700 rounded-full flex items-center justify-center text-white font-bold text-sm overflow-hidden">
                                            {customer.image?.url ? (
                                                <img
                                                    src={customer.image.url}
                                                    alt={customer.name}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                />
                                            ) : (
                                                customer.name.split(' ').map(n => n[0]).join('')
                                            )}
                                        </div>
                                        <span className="text-white font-medium">{customer.name}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-gray-400">{customer.email}</td>
                                <td className="px-6 py-4">
                                    <span className="text-blue-400 font-bold">{customer.events_reserved_tickets || 0}</span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="text-green-400 font-bold">{customer.group_trip_reserved_tickets || 0}</span>
                                </td>
                                    <td className="px-6 py-4 text-center">
                                        {customer.gifted_points!=0 ? (
                                            <div className="flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-green-500 text-white px-4 py-2 rounded-lg font-semibold shadow-md">
                                                🎁 {customer.gifted_points} Points
                                            </div>
                                        ) : (
                                            <button
                                                onClick={() => handleGiveReward(customer)}
                                                className="bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2 mx-auto"
                                            >
                                                <span>🏆</span>
                                                Give Reward
                                            </button>
                                        )}
                                    </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Rewards Modal */}
            {isModalOpen && (
                <RewardModal
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    customer={rewardBooker}
                    updateFields={updateFields}
                    rewardPoints={rewardPoints}
                    sendGift={sendGift}
                />
            )}
        </div>
    );
}
const RewardModal = ({ isOpen, onClose, customer,updateFields,rewardPoints,sendGift }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        sendGift(customer.id,rewardPoints);
        setTimeout(()=>{
            onClose();
        },3500)
    };

    const incrementPoints = () => {
        updateFields('rewardPoints', Math.min(1000, rewardPoints + 10))
    }
    const decrementPoints = () => {
        updateFields('rewardPoints', Math.max(10, rewardPoints - 10))
    }

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gray-900 rounded-2xl max-w-md w-full shadow-2xl border border-gray-700">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-700">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-yellow-600 to-yellow-500 rounded-full flex items-center justify-center">
                            <Gift className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h3 className="text-white text-xl font-bold">Reward</h3>
                            <p className="text-gray-400 text-sm">Give the customer rewards✨</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-800 rounded-lg"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Customer Info */}
                <div className="p-6 border-b border-gray-700">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-gradient-to-r from-gray-800 to-gray-700 rounded-full flex items-center justify-center text-white font-bold text-lg overflow-hidden">
                            {customer?.image?.url ? (
                                <img
                                    src={customer?.image?.url}
                                    alt={customer?.name}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                customer?.name?.split(' ').map(n => n[0]).join('')
                            )}
                        </div>
                        <div>
                            <h4 className="text-white text-lg font-semibold">{customer?.name}</h4>
                            <p className="text-gray-400 text-sm">{customer?.email}</p>
                            <div className="flex gap-4 mt-2">
                                <span className="text-blue-400 text-sm">
                                    🎫 {customer?.events_reserved_tickets || 0} Events
                                </span>
                                <span className="text-green-400 text-sm">
                                    ✈️ {customer?.group_trip_reserved_tickets || 0} Trips
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Reward Form */}
                <div className="p-6">
                    {/* Points Input */}
                    <div className="mb-6">
                        <div className="flex items-center gap-3">
                            <button
                                type="button"
                                onClick={decrementPoints}
                                className="w-10 h-10 bg-gray-700 hover:bg-gray-600 rounded-lg flex items-center justify-center transition-colors"
                            >
                                <Minus className="w-4 h-4 text-white" />
                            </button>
                            <div className="flex-1 relative">
                                <input
                                    type="number"
                                    value={rewardPoints}
                                    onChange={(e) => updateFields('rewardPoints',Math.max(0, parseInt(e.target.value) || 0))}
                                    className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white text-center text-xl font-bold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    min="0"
                                    step="50"
                                />
                                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">
                                    Point
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={incrementPoints}
                                className="w-10 h-10 bg-gray-700 hover:bg-gray-600 rounded-lg flex items-center justify-center transition-colors"
                            >
                                <Plus className="w-4 h-4 text-white" />
                            </button>
                        </div>

                        {/* Quick Points Buttons */}
                        <div className="grid grid-cols-4 gap-2 mt-3">
                            {[50, 100, 200, 500].map(value => (
                                <button
                                    key={value}
                                    type="button"
                                    onClick={() => updateFields('rewardPoints',value)}
                                    className={`py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                                        rewardPoints === value
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                    }`}
                                >
                                    {value}
                                </button>
                            ))}
                        </div>
                    </div>


                    {/* Action Buttons */}
                    <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg font-medium transition-all duration-200"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSubmit}
                            disabled={isSubmitting || rewardPoints <= 0}
                            className="flex-1 bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 disabled:from-gray-600 disabled:to-gray-500 text-white py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 disabled:scale-100 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                        >
                            {isSubmitting ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    ...Sending
                                </>
                            ) : (
                                <>
                                    <Gift className="w-4 h-4" />
                                    Send Gift
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};