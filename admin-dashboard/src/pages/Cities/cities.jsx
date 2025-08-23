import React, {useEffect, useState} from 'react';
import {Plus } from 'lucide-react';
import Header from "../../features/all/components/header.jsx";
import {useNavigate} from "react-router-dom";
import FilterBar from '../../features/cities/components/cities/filterBar.jsx'
import CityTable from '../../features/cities/components/cities/cityTable.jsx'
import Pagination from '../../features/cities/components/cities/pagination.jsx'
import {updateFields} from '../../features/cities/hook/citiesSlice.jsx'
import {CitiesService} from '../../features/cities/api/citiesService.jsx'
import {useDispatch, useSelector} from "react-redux";
export default function CitiesDashboard() {
    const {cities,totalCities,currentPage,lastPage,search,sortBy,isLoading,avg_rate} = useSelector(state => state.Cities);
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const dispatch=useDispatch();
    const navigate=useNavigate();
    useEffect(() => {
        dispatch(CitiesService())
    }, []);
    const handleInputChange= async (field,value)=>{
        await dispatch(updateFields({field, value}))
        await dispatch(CitiesService())
    }
    return (
        <div className="relative space-y-6 bg-[#0b1520] min-h-screen -m-6 p-6">
            {/* Enhanced background effects */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-teal-900/30 via-slate-800/10 to-transparent"></div>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-slate-800/40 via-transparent to-transparent"></div>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-teal-900/5 to-transparent"></div>

            <div className="layout-container flex h-full grow flex-col relative z-10">
                <div className="gap-1 px-6 flex flex-1 justify-center py-5">
                    <div className="layout-content-container flex flex-col max-w-[1200px] flex-1">

                        {/* Enhanced Header */}
                        <div className="flex flex-wrap justify-between gap-3 p-4 mb-6">
                            <Header title='Cities Dashboard' description="Manage destinations and track performance metrics" />

                            <button className="group flex min-w-[120px] cursor-pointer items-center justify-center overflow-hidden rounded-2xl h-12 px-6 bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-500 hover:to-teal-600 text-white text-sm font-semibold leading-normal shadow-xl shadow-teal-500/25 hover:shadow-teal-500/40 transition-all duration-300 hover:scale-105"
                                    onClick={() => navigate('/dashboard/cities/add')}>
                                <Plus size={18} className="mr-2 group-hover:rotate-90 transition-transform duration-300" />
                                <span className="truncate">Add City</span>
                            </button>
                        </div>

                        <FilterBar search={search} sortBy={sortBy} handleInputChange={handleInputChange} isSearchFocused={isSearchFocused} setIsSearchFocused={setIsSearchFocused} />
                        <CityTable Cities={cities} isLoading={isLoading}/>
                        <Pagination totalCities={totalCities} currentPage={currentPage} lastPage={lastPage} handleInputChange={handleInputChange} avg_rate={avg_rate} />
                    </div>
                </div>
            </div>
        </div>
    );
}