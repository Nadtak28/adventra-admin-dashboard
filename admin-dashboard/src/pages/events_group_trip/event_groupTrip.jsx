
import React, {useEffect, useState, useCallback, useRef} from 'react';
import {
     ChevronDown, Plus, Calendar, DollarSign, Activity, CheckCircle, XCircle, Star,
} from 'lucide-react';
import StateCard from "../../features/all/components/states_card.jsx";
import Header from "../../features/all/components/header.jsx";
import Filters from "../../features/event_group_trip/components/filter/filter.jsx";
import TopRatedGroupTrip from "../../features/event_group_trip/components/topRatedGroupTrip.jsx";
import UpcomingGroupTrips from "../../features/event_group_trip/components/upcomingGroupTrips.jsx";
import RecentGroupTrips from "../../features/event_group_trip/components/recentGroupTrips.jsx";
import Events from "../../features/event_group_trip/components/events.jsx";
import {useNavigate} from "react-router-dom";
import {getIdsService} from "../../features/all/api/getIdsService.jsx";
import {getEv_GTService} from "../../features/event_group_trip/api/getEv_GTService.jsx";
import {useDispatch,useSelector} from "react-redux";
import {ChangeEventStatueService} from "../../features/event_group_trip/api/changeEventStatus.js";
export default function EventGroupTrip() {
    const dispatch = useDispatch();
    const [changed, setChanged] = useState(false);
    const event_GTRef=useRef();
    useEffect(() => {
        dispatch(getIdsService())
    }, []);

    useEffect(() => {
        dispatch(getEv_GTService())
    }, [changed]);

    const {topRatedGroupTrips,events,recentGroupTrips,upcomingGroupTrips,eventsCount,groupsCount,totalRevenue,monthlyRate,isLoadingPage}=useSelector(state=>state.Events_GTS)
    const navigate = useNavigate();

    const changeStatus = useCallback(({id, status}) => {
        setChanged(prev => !prev);
        const Status = status === 'active' ? 'inactive' : 'active';
        dispatch(ChangeEventStatueService({id, status: Status}));
    }, [dispatch]);
    const viewMoreTopRatedTours = ()=>{
        event_GTRef.current.MoreTopRatedTours()
    }
    const viewUpcomingGroupTrips = ()=>{
        event_GTRef.current.MoreUpcomingGroupTrips()
    }
    const viewRecentGroupTrips = ()=>{
        event_GTRef.current.RecentGroupTrips()
    }
    const viewEvents = ()=>{
        event_GTRef.current.Events()
    }
    return (
        <div className="relative space-y-6 bg-[#0b1520] min-h-screen -m-6 p-6 -mx-6">
            {/* Enhanced background effects */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-teal-900/30 via-slate-800/10 to-transparent"></div>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-slate-800/40 via-transparent to-transparent"></div>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-teal-900/5 to-transparent"></div>

            <div className="layout-container flex h-full grow flex-col relative z-10">
                <div className="gap-1 px-6 flex flex-1 justify-center py-5">
                    <div className="layout-content-container flex flex-col max-w-[1400px] flex-1">

                        {/* Enhanced Header */}
                        <div className="flex flex-wrap justify-between items-center gap-3 p-4 mb-6">
                            <Header title='Tours & Events Dashboard' description="Manage group tours and events efficiently" />
                        </div>

                        {/* Enhanced Stats Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 px-4">
                            <StateCard name='Total Tours' value={groupsCount}>
                                <Calendar size={20} className="text-teal-400" />
                            </StateCard>

                            <StateCard name='Total Events' value={eventsCount}>
                                <Activity size={20} className="text-teal-400" />
                            </StateCard>

                            <StateCard name='Total Revenue' value={`$${Math.round(totalRevenue).toLocaleString()}`}>
                                <DollarSign size={20} className="text-teal-400" />
                            </StateCard>

                            <StateCard name='Avg Rating' value={monthlyRate.toFixed(1)}>
                                <Star size={20} className="text-teal-400" />
                            </StateCard>
                        </div>

                        <Filters ref={event_GTRef}/>

                        <TopRatedGroupTrip topRatedGroupTrips={topRatedGroupTrips} viewMoreTopRatedTours={viewMoreTopRatedTours} />

                        <UpcomingGroupTrips upcomingGroupTrips={upcomingGroupTrips} isLoading={isLoadingPage} viewUpcomingGroupTrips={viewUpcomingGroupTrips}/>

                        <RecentGroupTrips recentGroupTrips={recentGroupTrips} isLoading={isLoadingPage} viewRecentGroupTrips={viewRecentGroupTrips}/>


                        {/* Enhanced Events - WITH IMAGES */}
                        <Events events={events} isLoading={isLoadingPage} changeStatus={changeStatus} viewEvents={viewEvents}/>

                        {/* Enhanced Action Buttons */}
                        <div className="flex justify-center gap-6 px-4 py-8">
                            <button className="group flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-500 hover:to-teal-600 text-white rounded-2xl font-bold text-lg shadow-xl shadow-teal-500/25 hover:shadow-teal-500/40 transition-all duration-300 hover:scale-105"
                                    onClick={()=>navigate("/dashboard/event_grouptrip/add_group_trip")}>
                                <Plus size={20} className="group-hover:rotate-90 transition-transform duration-300" />
                                Create New Tour
                            </button>
                            <button className="group flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-purple-500 hover:to-indigo-600 text-white rounded-2xl font-bold text-lg shadow-xl shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300 hover:scale-105"
                                    onClick={()=>navigate("/dashboard/event_grouptrip/add_event")}>
                                <Plus size={20} className="group-hover:rotate-90 transition-transform duration-300" />
                                Create New Event
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}