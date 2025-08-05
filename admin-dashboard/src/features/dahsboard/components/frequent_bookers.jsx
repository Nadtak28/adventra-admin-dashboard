import React from "react";

export default function FrequentBookers({bookers}) {
    return (
        <div>
            <h2 className="text-white text-2xl font-bold mb-6 flex items-center gap-3">
                <span>⭐</span>
                Frequent Bookers
            </h2>

            <div className="bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 rounded-2xl overflow-hidden shadow-2xl">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                        <tr className="bg-gray-900/50">
                            <th className="px-6 py-4 text-left text-white text-sm font-semibold">Name</th>
                            <th className="px-6 py-4 text-left text-white text-sm font-semibold">Email</th>
                            <th className="px-6 py-4 text-left text-white text-sm font-semibold">Bookings</th>
                        </tr>
                        </thead>
                        <tbody>
                        {bookers.map((customer, index) => (
                            <tr key={index} className="border-t border-gray-700/50 hover:bg-gray-800/30 transition-colors duration-200">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-gradient-to-r from-gray-800 to-gray-700 rounded-full flex items-center justify-center text-white font-bold text-sm">
                                            {customer.name.split(' ').map(n => n[0]).join('')}
                                        </div>
                                        <span className="text-white font-medium">{customer.name}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-gray-400">{customer.email}</td>
                                <td className="px-6 py-4">
                                    <span className="text-white font-bold">{customer.bookings}</span>
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