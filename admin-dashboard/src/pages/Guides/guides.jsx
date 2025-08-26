import React, {useEffect, useState} from 'react';
import {ChevronDown, Plus, Star, TrendingDown} from 'lucide-react';
import {useDispatch, useSelector} from "react-redux";
import {getIdsService} from "../../features/all/api/getIdsService.jsx";
import {GuidesService} from "../../features/guide/api/getGuidesPage.jsx";
import Header from "../../features/all/components/header.jsx";
import {useNavigate} from "react-router-dom";
import GuideFilters from "../../features/guide/components/Filter.jsx";
import GuideCard from "../../features/guide/components/guideCard.jsx";
import SectionHeader from "../../features/guide/components/sectionHeader.jsx";
export default function Guides() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [perPage, setPerPage] = useState({good:5,bad:5});
        useEffect(() => {
            dispatch(getIdsService())
            dispatch(GuidesService(perPage))
        }, []);
    const {topRatedGuides,badGuides,isLoading}=useSelector(state => state.Guides)

    return (
        <div
            className="relative flex size-full min-h-screen w-auto flex-col space-y-6 bg-[#0b1520] -m-6 p-6 -mx-6 overflow-x-hidden"
            style={{ fontFamily: '"Spline Sans", "Noto Sans", sans-serif' }}>
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
                        <GuideFilters isLoading={isLoading}/>

                        {/* Top Rated Guides */}
                        <SectionHeader
                            title="Top Rated Guides This Month"
                            icon={Star}
                            gradient="from-yellow-500 to-orange-500"
                        />
                        <div className="flex overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pb-10">
                            <div className="flex items-stretch p-10 gap-6 min-w-max">
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
                        <div className="flex overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pb-10">
                            <div className="flex items-stretch p-10 gap-6 min-w-max">
                                {badGuides.map((guide, index) => (
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