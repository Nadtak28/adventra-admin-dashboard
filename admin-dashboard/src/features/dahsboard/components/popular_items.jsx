import React from "react";

export default function PopularItems({items,activeTab, setActiveTab}) {
    return(
        <div>
            <h2 className="text-white text-2xl font-bold mb-6 flex items-center gap-3">
                <span>🔥</span>
                Popular Items
            </h2>

            {/* Tabs */}
            <div className="mb-6">
                <div className="flex bg-gray-800/50 rounded-2xl p-1 w-fit">
                    {[
                        { id: 'events', label: 'Events' },
                        { id: 'tours', label: 'Group Tours' }
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                                activeTab === tab.id
                                    ? 'bg-gray-800 text-green-300 shadow-lg border border-gray-700'
                                    : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Popular Items Cards */}
            <div className="flex overflow-x-auto pb-6 gap-6 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {items.map((item, index) => (
                    <div key={index} className="flex-shrink-0 w-80 bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 rounded-2xl overflow-hidden hover:border-gray-600 transition-all duration-300 hover:shadow-2xl hover:scale-105 group">
                        <div className="relative overflow-hidden">
                            <img
                                src={item.image}
                                alt={item.title}
                                className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <div className="absolute top-4 right-4 bg-gray-800 text-green-300 px-3 py-1 rounded-full text-sm font-bold border border-gray-700">
                                {item.price}
                            </div>
                        </div>
                        <div className="p-6">
                            <h3 className="text-white text-lg font-bold mb-2 group-hover:text-green-300 transition-colors">
                                {item.title}
                            </h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                {item.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}