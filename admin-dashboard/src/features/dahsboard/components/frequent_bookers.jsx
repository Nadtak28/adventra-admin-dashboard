import React, {useMemo} from "react";

export default function FrequentBookers({bookersEvents,bookersGroupTrips,bookersTab,setBookersTab}) {
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
        alert(`تم منح جائزة للعميل: ${customer.name}`);
        // يمكنك استبدال هذا بوظيفة أخرى لمعالجة الجائزة
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
                            <tr key={index} className="border-t border-gray-700/50 hover:bg-gray-800/30 transition-colors duration-200">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-gradient-to-r from-gray-800 to-gray-700 rounded-full flex items-center justify-center text-white font-bold text-sm overflow-hidden">

                                            {customer.image?.url?
                                                (
                                                    <img
                                                        src={customer.image?.url}
                                                        className="w-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                    />
                                                ):customer.name.split(' ').map(n => n[0]).join('')}
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
                                    <button
                                        onClick={() => handleGiveReward(customer)}
                                        className="bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2 mx-auto"
                                    >
                                        <span>🏆</span>
                                        Give Reward
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}