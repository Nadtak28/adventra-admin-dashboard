import React from "react";
import {Star} from "lucide-react";

export default function Pagination({totalCities,currentPage,handleInputChange,lastPage,avg_rate}) {
    const showing=currentPage === lastPage?totalCities:5*currentPage;
    return (
        <div className="flex justify-center items-center gap-4 px-4 py-6">
            <div className="bg-gradient-to-r from-slate-800/60 to-slate-700/60 backdrop-blur-sm rounded-2xl p-4 border border-slate-700/40 shadow-xl">
                <div className="flex items-center gap-3">
                    {/* Previous Button */}
                    <button
                        onClick={() => handleInputChange('currentPage', Math.max(currentPage - 1, 1))}
                        disabled={currentPage === 1}
                        className={`
                                            flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300
                                            ${currentPage === 1
                            ? 'bg-slate-700/40 text-slate-500 cursor-not-allowed'
                            : 'bg-gradient-to-r from-teal-600/80 to-teal-700/80 text-white hover:from-teal-500 hover:to-teal-600 hover:scale-105 shadow-lg shadow-teal-500/20 hover:shadow-teal-500/30'
                        }
                                        `}
                    >
                        <span>←</span>
                        Previous
                    </button>

                    {/* Page Numbers */}
                    <div className="flex items-center gap-2">
                        {Array.from({ length: lastPage }, (_, i) => i + 1).map((pageNum) => (
                            <button
                                key={pageNum}
                                onClick={() => handleInputChange('currentPage',pageNum)}
                                className={`
                                                    w-10 h-10 rounded-xl text-sm font-bold transition-all duration-300 relative overflow-hidden
                                                    ${currentPage === pageNum
                                    ? 'bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-lg shadow-teal-500/30 scale-110'
                                    : 'bg-slate-700/60 text-slate-300 hover:bg-slate-600/60 hover:text-white hover:scale-105'
                                }
                                                `}
                            >
                                {currentPage === pageNum && (
                                    <div className="absolute inset-0 bg-gradient-to-r from-teal-400/20 to-teal-600/20 animate-pulse"></div>
                                )}
                                <span className="relative z-10">{pageNum}</span>
                            </button>
                        ))}
                    </div>

                    {/* Next Button */}
                    <button
                        onClick={() => handleInputChange('currentPage', Math.min(currentPage + 1, lastPage))}
                        disabled={currentPage === lastPage}
                        className={`
                                            flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300
                                            ${currentPage === lastPage
                            ? 'bg-slate-700/40 text-slate-500 cursor-not-allowed'
                            : 'bg-gradient-to-r from-teal-600/80 to-teal-700/80 text-white hover:from-teal-500 hover:to-teal-600 hover:scale-105 shadow-lg shadow-teal-500/20 hover:shadow-teal-500/30'
                        }
                                        `}
                    >
                        Next
                        <span>→</span>
                    </button>
                </div>

                {/* Page Info */}
                <div className="mt-3 pt-3 border-t border-slate-600/30">
                    <p className="text-slate-400 text-xs text-center font-medium">
                        Page {currentPage} of {lastPage} • Showing {showing}  of {totalCities} cities
                    </p>
                </div>
                                <p className="text-slate-300 mt-3 text-sm font-medium flex items-center justify-center gap-4">
                                    <span className="flex items-center gap-2">
                                        <Star size={16} className="text-yellow-400 fill-current" />
                                        Average Rating: {avg_rate}
                                    </span>
                </p>
            </div>
        </div>
    )
}