import StateCard from "./state_card.jsx";
import {BanknoteArrowDown, BanknoteArrowUp, Bus, Tickets, Wallet} from "lucide-react";
import React, {useMemo} from "react";
import { Skeleton } from "@mui/material";

export default function StatsCards({ month, isLoading })
{
    const info =useMemo(()=> {
        return {
            total_income: Math.round(month?.total_income),
            total_income_percentage:Math.round(((month?.total_income - month?.prev?.total_income) / month?.prev?.total_income)* 100),
            total_expenses: Math.round(month?.total_expenses),
            total_expenses_percentage:Math.round(((month?.total_expenses - month?.prev?.total_expenses) / month?.prev?.total_expenses)* 100),
            total_profit: Math.round(month?.total_profit),
            total_profit_percentage:Math.round(((month?.total_profit - month?.prev?.total_profit) / month?.prev?.total_profit)* 100),
            events_reserved_tickets: month?.events_reserved_tickets,
            total_events_percentage:Math.round(((month?.events_reserved_tickets - month?.prev?.events_reserved_tickets) / month?.prev?.events_reserved_tickets)* 100),
            group_trip_reserved_tickets: month?.group_trip_reserved_tickets,
            total_group_trip_percentage:Math.round(((month?.group_trip_reserved_tickets - month?.prev?.group_trip_reserved_tickets) / month?.prev?.group_trip_reserved_tickets)* 100),
        }},[month])
    console.log(month)
    // Loading skeleton component for individual cards
    const LoadingCard = () => (
        <div className="flex flex-col gap-4 rounded-2xl p-6 bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 hover:border-gray-600 transition-all duration-300 hover:shadow-2xl group">
            <div className="flex items-center justify-between">
                <Skeleton
                    variant="text"
                    width={120}
                    height={20}
                    sx={{
                        bgcolor: 'rgba(156, 163, 175, 0.3)', // gray-400/30
                        borderRadius: '6px'
                    }}
                />
                <div className="p-3 rounded-xl bg-gradient-to-r from-teal-500/20 to-slate-600/20">
                    <Skeleton
                        variant="circular"
                        width={27}
                        height={27}
                        sx={{
                            bgcolor: 'rgba(45, 212, 191, 0.4)' // teal-400/40
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
                        bgcolor: 'rgba(255, 255, 255, 0.2)', // white/20
                        borderRadius: '8px'
                    }}
                />
                <Skeleton
                    variant="rectangular"
                    width={60}
                    height={24}
                    sx={{
                        bgcolor: 'rgba(45, 212, 191, 0.2)', // teal-300/20
                        borderRadius: '8px'
                    }}
                />
            </div>
        </div>
    );

    if (isLoading) {
        return (
            <>
                {/* Statistics Cards Loading */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <LoadingCard />
                    <LoadingCard />
                    <LoadingCard />
                </div>

                {/* Monthly Bookings Loading */}
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
                <StateCard title='Total Income' value={'$' + info.total_income} trend={info.total_income_percentage}>
                    <Wallet size={27} className="text-teal-400"/>
                </StateCard>

                <StateCard title='Expenses' value={'$' + info.total_expenses} trend={info.total_expenses_percentage}>
                    <BanknoteArrowDown size={30} className="text-teal-400"/>
                </StateCard>

                <StateCard title='Net Profit' value={'$' + info.total_profit} trend={info.total_profit_percentage}>
                    <BanknoteArrowUp size={30} className="text-teal-400"/>
                </StateCard>
            </div>

            {/* Monthly Bookings */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <StateCard title='Event Tickets' value={info.events_reserved_tickets} trend={info.total_events_percentage}>
                    <Tickets size={27} className="text-teal-400"/>
                </StateCard>

                <StateCard title='Group Tour Tickets' value={info.group_trip_reserved_tickets} trend={info.total_group_trip_percentage}>
                    <Bus size={30} className="text-teal-400"/>
                </StateCard>
            </div>
        </>
    );
}