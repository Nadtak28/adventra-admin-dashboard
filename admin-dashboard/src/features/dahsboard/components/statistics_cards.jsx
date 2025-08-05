import StateCard from "./state_card.jsx";
import {BanknoteArrowDown, BanknoteArrowUp, Bus, Tickets, Wallet} from "lucide-react";
import React from "react";

export default function StatsCards()
{
    return (
        <>
        {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StateCard title='Total Income' value='$120,000' trend='+12%' >
                    <Wallet size={27} className="text-[#7bf1a8]"/>
                </StateCard>

                <StateCard title='Expenses' value='$45,000' trend='-5%' >
                    <BanknoteArrowDown  size={30} className="text-[#7bf1a8]"/>
                </StateCard>

                <StateCard title='Net Profit' value='$75,000' trend='+15%' >
                    <BanknoteArrowUp size={30} className="text-[#7bf1a8]"/>
                </StateCard>

            </div>
            {/* Monthly Bookings */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <StateCard title='Event Tickets' value={350} trend='+8%' >
                    <Tickets size={27} className="text-[#7bf1a8]"/>
                </StateCard>
                <StateCard title='Group Tour Tickets' value={200} trend='+12%%' >
                    <Bus size={30} className="text-[#7bf1a8]"/>
                </StateCard>
            </div>
        </>
    )
}