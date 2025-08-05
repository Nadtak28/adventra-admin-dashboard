import React, { useState, useRef, useEffect } from "react";
import { TrendingUp } from "lucide-react";

export default function Chart() {
    const monthsData = [
        { month: 'Jan', value: 65000 },
        { month: 'Feb', value: 85000 },
        { month: 'Mar', value: 72000 },
        { month: 'Apr', value: 21000 },
        { month: 'May', value: 92000 },
        { month: 'Jun', value: 58000 },
        { month: 'Jul', value: 78000 },
        { month: 'Aug', value: 89000 },
        { month: 'Sep', value: 35000 },
        { month: 'Oct', value: 25000 },
        { month: 'Nov', value: 98000 },
        { month: 'Dec', value: 68000 }
    ];

    const [scrollOffset, setScrollOffset] = useState(0);
    const containerRef = useRef(null);
    const maxScroll = Math.max(0, monthsData.length - 6);
    const isScrollingRef = useRef(false);

    const allValues = monthsData.map(item => item.value);
    const minValue = Math.min(...allValues);
    const maxValue = Math.max(...allValues);
    const valueRange = maxValue - minValue;

    const valueToPosition = (value) => {
        if (valueRange === 0) return 75;
        const normalizedValue = (value - minValue) / valueRange;
        const svgHeight = 120;
        const padding = 30;
        return svgHeight - (normalizedValue * (svgHeight - padding * 2)) + padding;
    };

    const handleWheel = (e) => {
        if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
            e.preventDefault();
            e.stopPropagation();

            if (isScrollingRef.current) return;
            isScrollingRef.current = true;

            const delta = e.deltaX > 0 ? 0.3 : -0.3;

            setScrollOffset(prev => {
                const newOffset = prev + delta;
                return Math.max(0, Math.min(newOffset, maxScroll));
            });

            setTimeout(() => {
                isScrollingRef.current = false;
            }, 50);
        }
    };

    const handleShiftWheel = (e) => {
        if (e.shiftKey) {
            e.preventDefault();
            e.stopPropagation();

            if (isScrollingRef.current) return;
            isScrollingRef.current = true;

            const delta = e.deltaY > 0 ? 0.3 : -0.3;

            setScrollOffset(prev => {
                const newOffset = prev + delta;
                return Math.max(0, Math.min(newOffset, maxScroll));
            });

            setTimeout(() => {
                isScrollingRef.current = false;
            }, 50);
        }
    };

    const getVisibleData = () => {
        const startIndex = Math.floor(scrollOffset);
        const endIndex = Math.min(startIndex + 6, monthsData.length);
        return monthsData.slice(startIndex, endIndex).map(item => ({
            ...item,
            position: valueToPosition(item.value)
        }));
    };

    const visibleData = getVisibleData();
    const averageValue = '40,000';

    const createPath = (data) => {
        if (data.length === 0) return "";

        const width = 680;
        const leftPadding = 60;
        const segmentWidth = width / Math.max(data.length - 1, 1);

        let pathData = `M${leftPadding} ${data[0].position}`;

        for (let i = 1; i < data.length; i++) {
            const x = leftPadding + (i * segmentWidth);
            const y = data[i].position;
            pathData += `C${leftPadding + ((i-1) * segmentWidth) + segmentWidth/3} ${data[i-1].position} ${x - segmentWidth/3} ${y} ${x} ${y}`;
        }

        return pathData;
    };

    const createAreaPath = (data) => {
        if (data.length === 0) return "";

        const linePath = createPath(data);
        const width = 680;
        const leftPadding = 60;
        const segmentWidth = width / Math.max(data.length - 1, 1);
        const lastX = leftPadding + ((data.length - 1) * segmentWidth);

        return `${linePath}V170H${leftPadding}V${data[0].position}Z`;
    };

    const linePath = createPath(visibleData);
    const areaPath = createAreaPath(visibleData);

    return (
        <div className="rounded-2xl border border-gray-700/50 bg-gray-800/60 backdrop-blur-sm p-8 hover:border-gray-600 transition-all duration-300 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <p className="text-white text-lg font-semibold">Net Profit Trend</p>
                    <p className="text-3xl font-bold text-white mt-2">
                        ${averageValue.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-400 mt-1">
                        Average for {visibleData.length} months
                    </p>
                </div>
                <TrendingUp size={40} className="text-teal-400"/>
            </div>

            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                    <span className="text-gray-400 text-sm">
                        Showing {Math.floor(scrollOffset) + 1}-{Math.floor(scrollOffset) + visibleData.length} of {monthsData.length} months
                    </span>
                    <span className="text-teal-300 text-sm font-medium bg-teal-900/30 px-3 py-1 rounded-full">
                        +15%
                    </span>
                </div>

                <div className="text-gray-400 text-sm">
                    Scroll to navigate →
                </div>
            </div>

            <div
                className="min-h-[200px] py-4 cursor-grab active:cursor-grabbing hover:bg-gray-800/20 rounded-lg transition-colors duration-200 select-none overflow-x-auto scrollbar-thin scrollbar-thumb-teal-500 scrollbar-track-gray-700"
                ref={containerRef}
                onWheel={handleWheel}
                onWheelCapture={handleShiftWheel}
                style={{
                    isolation: 'isolate',
                    scrollBehavior: 'smooth'
                }}
            >
                <div
                    className="transition-all duration-300 ease-out"
                    style={{
                        transform: `translateX(${scrollOffset * -10}px)`,
                        willChange: 'transform'
                    }}
                >
                    <svg width="100%" height="280" viewBox="0 0 800 180" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                        <defs>
                            <linearGradient id="paint0_linear_enhanced" x1="400" y1="20" x2="400" y2="130" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#2dd4bf" stopOpacity="0.4" />
                                <stop offset="1" stopColor="#2dd4bf" stopOpacity="0.05" />
                            </linearGradient>
                        </defs>

                        <g opacity="0.15">
                            <line x1="60" y1={valueToPosition(maxValue)} x2="740" y2={valueToPosition(maxValue)} stroke="#2dd4bf" strokeWidth="1" strokeDasharray="3,3"/>
                            <line x1="60" y1={valueToPosition(minValue)} x2="740" y2={valueToPosition(minValue)} stroke="#6b7280" strokeWidth="1" strokeDasharray="3,3"/>
                        </g>

                        {areaPath && (
                            <path
                                d={areaPath}
                                fill="url(#paint0_linear_enhanced)"
                            />
                        )}

                        {linePath && (
                            <path
                                d={linePath}
                                stroke="#2dd4bf"
                                strokeWidth="3"
                                strokeLinecap="round"
                                fill="none"
                                filter="drop-shadow(0 2px 4px rgba(45, 212, 191, 0.3))"
                            />
                        )}

                        {visibleData.map((item, index) => {
                            const x = 60 + (index * (680 / Math.max(visibleData.length - 1, 1)));
                            return (
                                <g key={`${item.month}-${Math.floor(scrollOffset)}-${index}`}>
                                    <circle
                                        cx={x}
                                        cy={item.position}
                                        r="8"
                                        fill="#2dd4bf"
                                        fillOpacity="0.2"
                                        className="animate-pulse"
                                    />
                                    <circle
                                        cx={x}
                                        cy={item.position}
                                        r="5"
                                        fill="#2dd4bf"
                                        stroke="#1f2937"
                                        strokeWidth="2"
                                        className="drop-shadow-lg"
                                    />
                                    <g>
                                        <rect
                                            x={x - 25}
                                            y={item.position - 28}
                                            width="50"
                                            height="18"
                                            rx="9"
                                            fill="rgba(31, 41, 55, 0.9)"
                                            stroke="#2dd4bf"
                                            strokeWidth="1"
                                        />
                                        <text
                                            x={x}
                                            y={item.position - 16}
                                            textAnchor="middle"
                                            fontSize="12"
                                            fill="#2dd4bf"
                                            fontWeight="600"
                                        >
                                            ${(item.value/1000).toFixed(0)}K
                                        </text>
                                    </g>
                                </g>
                            );
                        })}

                        <g opacity="0.8">
                            <text x="15" y={valueToPosition(maxValue) + 4} fontSize="12" fill="#2dd4bf" fontWeight="600" textAnchor="start">
                                ${(maxValue/1000).toFixed(0)}K
                            </text>
                            <text x="15" y={valueToPosition(minValue) + 4} fontSize="12" fill="#6b7280" fontWeight="500" textAnchor="start">
                                ${(minValue/1000).toFixed(0)}K
                            </text>
                        </g>

                        <line x1="60" y1="20" x2="60" y2="170" stroke="#374151" strokeWidth="1" opacity="0.3"/>
                    </svg>
                </div>

                <div className="flex justify-around mt-4 px-8">
                    {visibleData.map((item, index) => (
                        <div key={`${item.month}-label-${Math.floor(scrollOffset)}-${index}`} className="text-center">
                            <p className="text-gray-400 text-xs font-medium">{item.month}</p>
                            <p className="text-teal-300 text-xs mt-1">${(item.value/1000).toFixed(0)}K</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-4">
                <div className="w-full h-2 bg-gray-700/30 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-gradient-to-r from-teal-400 to-teal-500 rounded-full transition-all duration-300 ease-out"
                        style={{
                            width: `${((6 / monthsData.length) * 100)}%`,
                            marginLeft: `${(scrollOffset / maxScroll) * (100 - (6 / monthsData.length) * 100)}%`
                        }}
                    />
                </div>
                <div className="flex justify-between mt-2 text-xs text-gray-500">
                    <span>Jan</span>
                    <span className="text-center opacity-60">
                        {Math.floor(scrollOffset) + 1}-{Math.min(Math.floor(scrollOffset) + 6, monthsData.length)} of {monthsData.length}
                    </span>
                    <span>Dec</span>
                </div>
            </div>

            <div className="mt-4 text-center">
                <p className="text-xs text-gray-500">
                    <span className="inline-flex items-center gap-2">
                        ↔️ Scroll horizontally to navigate
                        <span className="opacity-60">•</span>
                        ⇧ Hold Shift + scroll vertically
                    </span>
                </p>
            </div>
        </div>
    );
}