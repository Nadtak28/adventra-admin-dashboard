import React from 'react';
import { Layout, Building, Calendar, MapPin, TrendingUp } from 'lucide-react';

export default function CitiesDashboard() {
    const cities = [
        {
            id: 1,
            name: "Paris",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDn41AVL3bje3irO4Vv5RnaPYYcsxEOtjVBrNPv1BD6tUqkOHOsiwTI2mmyZ7qkE30a7YtPrCtSrPmgmC9aB8VBlPCEczLxj-_RPZ1GArdYDtOxrZ1XTA0dSgEjiawdCL-rIneZqsDLXbJWmv0OqQnNPCkEbco-03X5B5IbEx4ylnY1wrezobxXcQwC3evQ3IviiJK0ukfMQezcZV732EYgU84VHpH7ByglnxHL_k3E2xPBewPP9F9fhY6uxDdqeTy1vXfot4AQb5A",
            events: 50,
            tourGuides: 120
        },
        {
            id: 2,
            name: "London",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDwvVQs5eLW5SH6N5K4Ntw_tLbbSp4mJFkZyKH4whJ9WL89H-_SfZigwppkIjaGCBsEo9le_LeJFwTkizIW0x6rv6puLvCjV8gQrNoqksjZrAZ5E8OWAQIWMP-uYMeavA49VfkRgfKB814wxdS0eAAmfj0NwRQI5A76JsV86VssQigphV2YlkOy-eaNobb2UeE27ICXhsjcNrjXxZuoqYErtwF2UDzyb8l1KXsAa66nY3fVUyx2S3Yh65QvRY4oM1hKd-By5TMUikA",
            events: 60,
            tourGuides: 150
        },
        {
            id: 3,
            name: "Rome",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDtg62JFrdjYSJHa2Z7RhU4uN8kAzoAgceOBZQVMvBqr9XAMg7nBvnCQZQUFXVFOgHyQL9c5sJBQhEcIbTOGW-1OwrzlkInB9qwad0A9qim6kxLLtCTD7Lh4dIUAPX5XlIfpFpdZOBdRyWxjspn4KBU5mtuFhp3gJeAkJIViuXkDsVclC8FSq2J2qE57ECNlpRV5ySlIDwI-nlUA2urJWRuKdnLFFMNKJsDOC2WmPf95s-TTO0cWp9EPb_OuOD9NdKxJOl1eMOSGIE",
            events: 40,
            tourGuides: 100
        },
        {
            id: 4,
            name: "New York",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD0SUueiDV3CC3zb0t8ZHbLs4pwSrj6XMtGgTbAkLCZcQ-SgKIUusJuYH3Gp8COMHbT_nzyHga4a23gyiiVabeoOhZwRmHHcom3ezTVp0pgsrI0uU1ZLnWTuWumtlwfVrwC6bP45dm4x9lwlQl7-kySORlGWf9zfIKK9qtMsxy0AmWcewKWnlPg_vOfQfvUiu7-HY1Y6qA2dImG2XJMd1h8JxTmBN7RSjy-9E03bKBhG6WuPyhtdVSy1Fzqs8X57hF1hxS78QUJh70",
            events: 80,
            tourGuides: 200
        },
        {
            id: 5,
            name: "Tokyo",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC8Esr-Fnjo0pTDA7rMgYOVRFB64s-mmaioHUtLdi-LFS6lQnbJoq7nDCVMfhRN368MJiVuOoLMFeev8NbHeGNFlaC3Ofc7IyjHaldTerFRn8XrK9f7vThzKKchhIRm_qXW9LIIiC2GBPJaoylcjVGPRfXDldQY0MjkUeHCE1Uh7QYWtVtLI0Gs8EHGFbc0NIe1-2LIQPuFQA_31fpgqvwi-YrxHpl2Q1-1sKBOSB3PafGJZr2DvcjkwjwdlMmih5GYsyDzzpje0sw",
            events: 70,
            tourGuides: 180
        }
    ];

    const sidebarItems = [
        { icon: Layout, label: "Dashboard", active: false },
        { icon: Building, label: "Cities", active: true },
        { icon: Calendar, label: "Events", active: false },
        { icon: MapPin, label: "Guides", active: false },
        { icon: TrendingUp, label: "Analytics", active: false }
    ];

    return (
        <div className="relative flex size-full min-h-screen flex-col bg-[#151e1c] dark group/design-root overflow-x-hidden" style={{fontFamily: '"Spline Sans", "Noto Sans", sans-serif'}}>
            <div className="layout-container flex h-full grow flex-col">
                <div className="gap-1 px-6 flex flex-1 justify-center py-5">
                    {/* Sidebar */}
                    <div className="layout-content-container flex flex-col w-80">
                        <div className="flex h-full min-h-[700px] flex-col justify-between bg-[#151e1c] p-4">
                            <div className="flex flex-col gap-4">
                                <div className="flex flex-col gap-2">
                                    {sidebarItems.map((item, index) => {
                                        const IconComponent = item.icon;
                                        return (
                                            <div
                                                key={index}
                                                className={`flex items-center gap-3 px-3 py-2 ${
                                                    item.active ? 'rounded-full bg-[#2b403b]' : ''
                                                }`}
                                            >
                                                <IconComponent className="text-white w-6 h-6" />
                                                <p className="text-white text-sm font-medium leading-normal">
                                                    {item.label}
                                                </p>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
                        {/* Header */}
                        <div className="flex flex-wrap justify-between gap-3 p-4">
                            <p className="text-white tracking-light text-[32px] font-bold leading-tight min-w-72">
                                Cities
                            </p>
                            <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-8 px-4 bg-[#2b403b] text-white text-sm font-medium leading-normal">
                                <span className="truncate">Add City</span>
                            </button>
                        </div>

                        {/* Table */}
                        <div className="px-4 py-3">
                            <div className="flex overflow-hidden rounded-xl border border-[#3e5b54] bg-[#151e1c]">
                                <table className="flex-1">
                                    <thead>
                                    <tr className="bg-[#1f2e2a]">
                                        <th className="px-4 py-3 text-left text-white w-14 text-sm font-medium leading-normal">
                                            Image
                                        </th>
                                        <th className="px-4 py-3 text-left text-white w-[400px] text-sm font-medium leading-normal">
                                            City
                                        </th>
                                        <th className="px-4 py-3 text-left text-white w-[400px] text-sm font-medium leading-normal">
                                            Events
                                        </th>
                                        <th className="px-4 py-3 text-left text-white w-[400px] text-sm font-medium leading-normal">
                                            Tour Guides
                                        </th>
                                        <th className="px-4 py-3 text-left text-white w-60 text-[#9ebdb5] text-sm font-medium leading-normal">
                                            Action
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {cities.map((city) => (
                                        <tr key={city.id} className="border-t border-t-[#3e5b54]">
                                            <td className="h-[72px] px-4 py-2 w-14 text-sm font-normal leading-normal">
                                                <img
                                                    src={city.image}
                                                    alt={city.name}
                                                    className="w-10 h-10 rounded-full object-cover"
                                                />
                                            </td>
                                            <td className="h-[72px] px-4 py-2 w-[400px] text-white text-sm font-normal leading-normal">
                                                {city.name}
                                            </td>
                                            <td className="h-[72px] px-4 py-2 w-[400px] text-[#9ebdb5] text-sm font-normal leading-normal">
                                                {city.events}
                                            </td>
                                            <td className="h-[72px] px-4 py-2 w-[400px] text-[#9ebdb5] text-sm font-normal leading-normal">
                                                {city.tourGuides}
                                            </td>
                                            <td className="h-[72px] px-4 py-2 w-60 text-[#9ebdb5] text-sm font-bold leading-normal tracking-[0.015em]">
                                                <button className="hover:text-white transition-colors cursor-pointer">
                                                    Edit
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

