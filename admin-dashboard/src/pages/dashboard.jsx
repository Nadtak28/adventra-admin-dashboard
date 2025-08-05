import React, { useState } from 'react';
import StatsCards from "../features/dahsboard/components/statistics_cards.jsx";
import Chart from "../features/dahsboard/components/chart.jsx";
import Header from "../features/all/components/header.jsx";
import PopularItems from "../features/dahsboard/components/popular_items.jsx";
import FrequentBookers from "../features/dahsboard/components/frequent_bookers.jsx";
export default function Dashboard() {
    const [activeTab, setActiveTab] = useState('events');
    const items=[
        {
            title: "Live Music Festival",
            description: "Experience the thrill of live music with top artists.",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCDapy81jQAGhyEZAFleT7OxwoPfYFkdY9yTAvCT_kNT8onwkIVvdtMkHH0AcZ-3H_FE8ALVdwOdA_-HBwZyruGodWcI_oXEzCq4WEdTKu9QyY9XItlcJlRJ5qA3RX5Z7EOEDW351anFoTLup6g6lBDD0O6Y2VXkmrt8DiBs7BvO6IrN1-VYibH-5pv24OpYo5Co5Vu5hGmWwzfN_EMKbNacDHgK7f0zUoDW6BI5e_cntRLaJ-NbRYiugicwaFmk5LWEIyys8_V-j0",
            price: "$89"
        },
        {
            title: "Culinary Delights Expo",
            description: "Indulge in a variety of cuisines from around the world.",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA-KcT7cBSj7LSF4NVdZEveqmNjltY5gvwlqwiRKli2b8rlRktdK4thyJJDr5JuLKj0uAcQIg8G9gQoOx9f1lfivWoCs_weZRPj1EuTZ_Owp0r2EfNPwdKFIArhAm2kDgazN7AmIMI3c7ZZv19slCj8vz_PKKSkGQO68kqTGU9aRrhP7fP12szUH6oARAKwskyh3C6xVRS6w3LNTNiNihLx38UsagxejSlomDhpFObUDZ-77PYXmswIJvcwP2yLeMQsn_Vicc3h0xA",
            price: "$65"
        },
        {
            title: "Modern Art Showcase",
            description: "Explore contemporary art from emerging and established artists.",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCDapy81jQAGhyEZAFleT7OxwoPfYFkdY9yTAvCT_kNT8onwkIVvdtMkHH0AcZ-3H_FE8ALVdwOdA_-HBwZyruGodWcI_oXEzCq4WEdTKu9QyY9XItlcJlRJ5qA3RX5Z7EOEDW351anFoTLup6g6lBDD0O6Y2VXkmrt8DiBs7BvO6IrN1-VYibH-5pv24OpYo5Co5Vu5hGmWwzfN_EMKbNacDHgK7f0zUoDW6BI5e_cntRLaJ-NbRYiugicwaFmk5LWEIyys8_V-j0",
            price: "$45"
        },
    ]
    const bookers=[
        { name: "Emily Harper", email: "emily.harper@email.com", bookings: 15, status: "VIP" },
        { name: "Owen Mitchell", email: "owen.mitchell@email.com", bookings: 12, status: "Premium" },
        { name: "Chloe Reynolds", email: "chloe.reynolds@email.com", bookings: 10, status: "Premium" },
        { name: "Ethan Hayes", email: "ethan.hayes@email.com", bookings: 8, status: "Regular" },
        { name: "Isabella Reed", email: "isabella.reed@email.com", bookings: 7, status: "Regular" }
    ]
    return (
        <div className="space-y-6 bg-[#0b1520] min-h-screen -m-6 p-6 -mx-6">
            <Header title='Dashboard' description="Welcome back! Here's what's happening with your business." />
            <StatsCards/>
            <Chart/>
            <PopularItems items={items} activeTab={activeTab} setActiveTab={setActiveTab} />
            <FrequentBookers bookers={bookers}/>
        </div>
    );
}