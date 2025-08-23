import React, {useEffect} from 'react';
import { Plus, Star, TrendingDown} from 'lucide-react';
import {useDispatch} from "react-redux";
import {getIdsService} from "../../features/all/api/getIdsService.jsx";
import Header from "../../features/all/components/header.jsx";
import {useNavigate} from "react-router-dom";
import GuideFilters from "../../features/guide/components/Filter.jsx";
import GuideCard from "../../features/guide/components/guideCard.jsx";
import SectionHeader from "../../features/guide/components/sectionHeader.jsx";
export default function Guides() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
        useEffect(() => {
            dispatch(getIdsService())
        }, []);

    const topRatedGuides = [
        {
            name: 'Emma Carter',
            salary: '$4,500',
            nextBooking: 'July 15, 2024',
            rating: 4.9,
            tours: 45
        },
        {
            name: 'Owen Bennett',
            salary: '$4,200',
            nextBooking: 'July 20, 2024',
            rating: 4.8,
            tours: 38
        },
        {
            name: 'Chloe Foster',
            salary: '$4,000',
            nextBooking: 'July 22, 2024',
            rating: 4.7,
            tours: 42
        }
    ];

    const lowestRatedGuides = [
        {
            name: 'Caleb Scott',
            salary: '$3,500',
            nextBooking: 'July 25, 2024',
            rating: 3.8,
            tours: 23
        },
        {
            name: 'Lily Evans',
            salary: '$3,200',
            nextBooking: 'July 28, 2024',
            rating: 3.6,
            tours: 18
        },
        {
            name: 'Samuel Ford',
            salary: '$3,000',
            nextBooking: 'July 30, 2024',
            rating: 3.4,
            tours: 15
        }
    ];


    return (
        <div
            className="relative flex size-full min-h-screen w-auto flex-col space-y-6 bg-[#0b1520] -m-6 p-6 -mx-6 overflow-x-hidden"
            style={{ fontFamily: '"Spline Sans", "Noto Sans", sans-serif' }}
        >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-teal-900/30 via-slate-800/10 to-transparent"></div>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-slate-800/40 via-transparent to-transparent"></div>

            <div className="layout-container flex h-full grow flex-col relative z-10">
                <div className="gap-1 px-6 flex flex-1 justify-center py-5">
                    <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
                        {/* Header */}
                        <div className="flex flex-wrap justify-between gap-3 p-4 mb-6">
                            <Header title='Guides Dashboard' description="Manage your tour guides and performance metrics" />
                            <button className="group flex min-w-[120px] cursor-pointer items-center justify-center overflow-hidden rounded-2xl h-12 px-6 bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-500 hover:to-teal-600 text-white text-sm font-semibold leading-normal shadow-xl shadow-teal-500/25 hover:shadow-teal-500/40 transition-all duration-300 hover:scale-105"
                                    onClick={() => navigate('/dashboard/guides/add')}>
                                <Plus size={18} className="mr-2 group-hover:rotate-90 transition-transform duration-300" />
                                <span className="truncate">Add Guide</span>
                            </button>
                        </div>

                        {/* Search and Filter */}
                        <GuideFilters />

                        {/* Top Rated Guides */}
                        <SectionHeader
                            title="Top Rated Guides This Month"
                            icon={Star}
                            gradient="from-yellow-500 to-orange-500"
                        />
                        <div className="flex overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                            <div className="flex items-stretch p-8 gap-6 min-w-max">
                                {topRatedGuides.map((guide, index) => (
                                    <GuideCard key={index} guide={guide} type="top" />
                                ))}
                            </div>
                        </div>

                        {/* Lowest Rated Guides */}
                        <SectionHeader
                            title="Guides Needing Support"
                            icon={TrendingDown}
                            gradient="from-red-500 to-pink-500"
                        />
                        <div className="flex overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pb-8">
                            <div className="flex items-stretch p-8 gap-6 min-w-max">
                                {lowestRatedGuides.map((guide, index) => (
                                    <GuideCard key={index} guide={guide} type="lowest" />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};