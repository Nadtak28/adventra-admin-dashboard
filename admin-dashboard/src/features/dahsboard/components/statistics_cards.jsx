import StateCard from "./state_card.jsx";
import {BanknoteArrowDown, BanknoteArrowUp, Bus, Tickets, Wallet} from "lucide-react";
import React from "react";

export default function StatsCards(month)
{

    return (
        <>
        {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StateCard title='Total Income' value={'$'+month.total_income} trend='+12%' >
                    <Wallet size={27} className="text-teal-400"/>
                </StateCard>

                <StateCard title='Expenses' value={'$'+month.total_expenses} trend='-5%' >
                    <BanknoteArrowDown  size={30} className="text-teal-400"/>
                </StateCard>

                <StateCard title='Net Profit' value={'$'+month.total_profit} trend='+15%' >
                    <BanknoteArrowUp size={30} className="text-teal-400"/>
                </StateCard>

            </div>
            {/* Monthly Bookings */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <StateCard title='Event Tickets' value={month.events_reserved_tickets} trend='+8%' >
                    <Tickets size={27} className="text-teal-400"/>
                </StateCard>
                <StateCard title='Group Tour Tickets' value={month.group_trip_reserved_tickets} trend='+12%%' >
                    <Bus size={30} className="text-teal-400"/>
                </StateCard>
            </div>
        </>
    )
}