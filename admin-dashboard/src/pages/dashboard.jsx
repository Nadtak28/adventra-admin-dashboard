import React, {useEffect, useState} from 'react';
import StatsCards from "../features/dahsboard/components/statistics_cards.jsx";
import Chart from "../features/dahsboard/components/chart.jsx";
import Header from "../features/all/components/header.jsx";
import PopularItems from "../features/dahsboard/components/popular_items.jsx";
import FrequentBookers from "../features/dahsboard/components/frequent_bookers.jsx";
import {useSelector,useDispatch} from "react-redux";
import {DashBoardService} from "../features/dahsboard/api/DashboardService.jsx";
import {getIdsService} from "../features/all/api/getIdsService.jsx";
import {sendGiftService} from "../features/dahsboard/api/sendGistService.jsx";
import {updateFields} from '../features/dahsboard/hook/DashboardSlice.jsx'
export default function Dashboard() {
    const dashBoard =useSelector(state => state.DashBoard);
    const dispatch = useDispatch();
    const [activeTab, setActiveTab] = useState('');
    const [bookersTab,setBookersTab] = useState(['']);
    useEffect(() => {
           setActiveTab('events');
           dispatch(DashBoardService())
           dispatch(getIdsService())
    }, []);
    const handleInputChange= (field,value)=>{
        dispatch(updateFields({field, value}));
    }
    const sendGift=async (id,points)=>{
        console.log(id);
        const result = await dispatch(sendGiftService({ id, points }));
        if (sendGiftService.fulfilled.match(result)) {
            dispatch(DashBoardService());
        }

    }

    return (
        <div className="space-y-6 bg-[#0b1520] min-h-screen -m-6 p-6 -mx-6">
            <Header title='Dashboard' description="Welcome back! Here's what's happening with your business." />
            <StatsCards dashBoard={dashBoard} isLoading={dashBoard.isLoading}/>
            <Chart updateFields={handleInputChange} dashBoard={dashBoard}/>
            <PopularItems events={dashBoard.topRatedEvents} groupTrips={dashBoard.topRatedGroupTrips} activeTab={activeTab} setActiveTab={setActiveTab} />
            <FrequentBookers bookersEvents={dashBoard.mostEventsBooker} bookersGroupTrips={dashBoard.mostGroupTripsBooker} bookersTab={bookersTab} setBookersTab={setBookersTab} updateFields={handleInputChange} rewardBooker={dashBoard.rewardBooker} rewardPoints={dashBoard.rewardPoints} sendGift={sendGift}/>
        </div>
    );
}