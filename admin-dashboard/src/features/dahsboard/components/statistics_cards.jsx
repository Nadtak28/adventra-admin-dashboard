import StateCard from "./state_card.jsx";
import {BanknoteArrowDown, BanknoteArrowUp, Bus, Tickets, Wallet} from "lucide-react";
import React, {useMemo, useEffect, useState} from "react";
import { Skeleton } from "@mui/material";

export default function StatsCards({ dashBoard, isLoading }) {
    // State for animation control
    const [animationKey, setAnimationKey] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    const currentMonth = dashBoard.currentMonth;
    const month = {...dashBoard.businessInfo[currentMonth], prev: dashBoard.businessInfo[currentMonth+1]};

    const info = useMemo(() => {
        const safePercent = (current, prev) => {
            if (!month.prev || prev === 0 || prev === undefined || prev === null) return 0;
            return Math.round(((Number(current) - Number(prev)) / Number(prev)) * 100);
        };
        return {
            total_income: Math.round(month?.total_income || 0),
            total_income_percentage: safePercent(month?.total_income, month?.prev?.total_income),

            total_expenses: Math.round(month?.total_expenses || 0),
            total_expenses_percentage: safePercent(month?.total_expenses, month?.prev?.total_expenses),

            total_profit: Math.round(month?.total_profit || 0),
            total_profit_percentage: safePercent(month?.total_profit, month?.prev?.total_profit),

            events_reserved_tickets: month?.events_reserved_tickets || 0,
            total_events_percentage: safePercent(month?.events_reserved_tickets, month?.prev?.events_reserved_tickets),

            group_trip_reserved_tickets: month?.group_trip_reserved_tickets || 0,
            total_group_trip_percentage: safePercent(month?.group_trip_reserved_tickets, month?.prev?.group_trip_reserved_tickets),
        };
    }, [month]);

    // Trigger animation when dashBoard changes
    useEffect(() => {
        if (!isLoading) {
            setIsAnimating(true);
            setAnimationKey(prev => prev + 1);

            const timer = setTimeout(() => {
                setIsAnimating(false);
            }, 800);

            return () => clearTimeout(timer);
        }
    }, [dashBoard.currentMonth, dashBoard.businessInfo, isLoading]);

    // Animated card wrapper component
    const AnimatedCardWrapper = ({ children, delay = 0 }) => {
        const [isCardLoading, setIsCardLoading] = useState(false);

        useEffect(() => {
            if (isAnimating) {
                setIsCardLoading(true);
                const timer = setTimeout(() => {
                    setIsCardLoading(false);
                }, 400 + delay); // Loading duration + delay

                return () => clearTimeout(timer);
            }
        }, [isAnimating, delay]);

        if (isCardLoading) {
            return (
                <div className="flex flex-col gap-4 rounded-2xl p-6 bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 animate-pulse">
                    <div className="flex items-center justify-between">
                        <div className="h-4 bg-gray-600/50 rounded w-32 animate-pulse"></div>
                        <div className="p-3 rounded-xl bg-gradient-to-r from-teal-500/20 to-slate-600/20">
                            <div className="w-7 h-7 bg-teal-400/30 rounded-full animate-pulse"></div>
                        </div>
                    </div>
                    <div className="flex items-end justify-between">
                        <div className="h-8 bg-gray-500/50 rounded w-20 animate-pulse"></div>
                        <div className="h-6 bg-teal-300/30 rounded w-14 animate-pulse"></div>
                    </div>
                </div>
            );
        }

        return (
            <div
                key={`${animationKey}-${delay}`}
                className={`transform transition-all duration-700 ease-in-out ${
                    isAnimating
                        ? 'animate-pulse opacity-60 -translate-y-2 scale-98'
                        : 'opacity-100 translate-y-0 scale-100'
                }`}
                style={{
                    transitionDelay: `${delay}ms`
                }}
            >
                {children}
            </div>
        );
    };

    // Loading skeleton component for individual cards
    const LoadingCard = () => (
        <div className="flex flex-col gap-4 rounded-2xl p-6 bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 hover:border-gray-600 transition-all duration-300 hover:shadow-2xl group">
            <div className="flex items-center justify-between">
                <Skeleton
                    variant="text"
                    width={120}
                    height={20}
                    sx={{
                        bgcolor: 'rgba(156, 163, 175, 0.3)',
                        borderRadius: '6px'
                    }}
                />
                <div className="p-3 rounded-xl bg-gradient-to-r from-teal-500/20 to-slate-600/20">
                    <Skeleton
                        variant="circular"
                        width={27}
                        height={27}
                        sx={{
                            bgcolor: 'rgba(45, 212, 191, 0.4)'
                        }}
                    />
                </div>
            </div>
            <div className="flex items-end justify-between">
                <Skeleton
                    variant="text"
                    width={80}
                    height={36}
                    sx={{
                        bgcolor: 'rgba(255, 255, 255, 0.2)',
                        borderRadius: '8px'
                    }}
                />
                <Skeleton
                    variant="rectangular"
                    width={60}
                    height={24}
                    sx={{
                        bgcolor: 'rgba(45, 212, 191, 0.2)',
                        borderRadius: '8px'
                    }}
                />
            </div>
        </div>
    );

    if (isLoading) {
        return (
            <>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <LoadingCard />
                    <LoadingCard />
                    <LoadingCard />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <LoadingCard />
                    <LoadingCard />
                </div>
            </>
        );
    }

    return (
        <>
            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <AnimatedCardWrapper delay={0}>
                    <StateCard
                        title={currentMonth === 0 ? 'Total Income This Month' : `Total Income In ${month?.month_name}`}
                        value={'$' + info.total_income}
                        trend={info.total_income_percentage}
                    >
                        <Wallet size={27} className="text-teal-400"/>
                    </StateCard>
                </AnimatedCardWrapper>

                <AnimatedCardWrapper delay={50}>
                    <StateCard
                        title={currentMonth === 0 ? 'Total Expenses This Month' : `Total Expenses In ${month?.month_name}`}
                        value={'$' + info.total_expenses}
                        trend={info.total_expenses_percentage}
                    >
                        <BanknoteArrowDown size={30} className="text-teal-400"/>
                    </StateCard>
                </AnimatedCardWrapper>

                <AnimatedCardWrapper delay={100}>
                    <StateCard
                        title={currentMonth === 0 ? 'Total Net Profit This Month' : `Total Net Profit In ${month?.month_name}`}
                        value={'$' + info.total_profit}
                        trend={info.total_profit_percentage}
                    >
                        <BanknoteArrowUp size={30} className="text-teal-400"/>
                    </StateCard>
                </AnimatedCardWrapper>
            </div>

            {/* Monthly Bookings */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <AnimatedCardWrapper delay={150}>
                    <StateCard
                        title={currentMonth === 0 ? 'Event Tickets This Month' : `Event Tickets Income In ${month?.month_name}`}
                        value={info.events_reserved_tickets}
                        trend={info.total_events_percentage}
                    >
                        <Tickets size={27} className="text-teal-400"/>
                    </StateCard>
                </AnimatedCardWrapper>

                <AnimatedCardWrapper delay={200}>
                    <StateCard
                        title={currentMonth === 0 ? 'Group Tour Tickets This Month' : `Group Tour Tickets In ${month?.month_name}`}
                        value={info.group_trip_reserved_tickets}
                        trend={info.total_group_trip_percentage}
                    >
                        <Bus size={30} className="text-teal-400"/>
                    </StateCard>
                </AnimatedCardWrapper>
            </div>
        </>
    );
}