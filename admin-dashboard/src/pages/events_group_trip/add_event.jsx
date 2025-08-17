import React, { useState } from 'react';
import AddMedia from '../../features/all/components/Add/add_media.jsx';
import AddHeader from "../../features/all/components/Add/add_header.jsx";
import Info from "../../features/event_group_trip/components/Add/event/Info.jsx"
import Description from "../../features/event_group_trip/components/Add/event/description.jsx"
import Prices from "../../features/event_group_trip/components/Add/event/prices.jsx";
import {useNavigate} from "react-router-dom";
import SubmitButton from "../../features/all/components/Add/submit_button.jsx";
import {useDispatch, useSelector} from "react-redux";
import {add_emptyMedia, updateFields,Submit} from "../../features/event_group_trip/hook/addEventSlice.jsx";
import {AddEventService} from "../../features/event_group_trip/api/addEventService.jsx";
export default function AddEvent() {
    const navigate = useNavigate();
    const formData=useSelector(state=>state.AddEvent);
    const [Files,setFiles] = useState({images:[],videos:[]});
    const dispatch=useDispatch();

    const eventTypes = {
        'Eco-tourism': 1,
        'Cultural': 2,
        'Adventure': 3,
        'Nature': 4,
        'Food': 5
    }
    const cities = {
        'Port Llewellyn': 1,
        'Ryleeport': 2,
        'Port Eastontown': 3,
        'New Ethyl': 4,
        'New Sadie': 5,
        'Port Nelsfurt': 6,
        'Adriannafurt': 7,
        'Yundtport': 8,
        'Franeckimouth': 9,
        'Beckerberg': 10
    };

    const handleInputChange = (field, value) => {
        dispatch(updateFields({field,value}));
    };
    const handleFilesChange=(type) => {
        if(Files.images.length===0&&type!=='add') {
            dispatch(add_emptyMedia({type:'empty'}))
        }
        else{
            dispatch(add_emptyMedia({type:'add'}))
        }
    }

    const handleSubmit = async () => {
        handleFilesChange('check')
        dispatch(Submit())
        const result=await dispatch(AddEventService(Files))
        if(result.type==='AddEventService/fulfilled')
        {
            setFiles({images:[],videos:[]})
            //هون بضيف الnavigate فيما بعد
        }

    };

    return (
        <div className="relative min-h-screen bg-[#0b1520] -m-6 p-6">
            {/* Enhanced background effects */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-teal-900/30 via-slate-800/10 to-transparent"></div>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-slate-800/40 via-transparent to-transparent"></div>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-teal-900/5 to-transparent"></div>

            <div className="relative z-10 max-w-4xl mx-auto">
                {/* Header */}
                <AddHeader path={'/dashboard/event_grouptrip'} title={'Add New Event'} description={'Add event info and media'} handleSubmit={handleSubmit} buttonText={'Add the event'} />

                <div className="space-y-8">
                    <Info formData={formData} handleInputChange={handleInputChange} eventTypes={eventTypes} cities={cities} />

                    <Description formData={formData} handleInputChange={handleInputChange}/>

                    <Prices formData={formData} handleInputChange={handleInputChange}/>

                    <AddMedia formData={formData} addMedia={handleFilesChange} Files={Files} setFiles={setFiles} />
                    {/* Submit Button */}
                    <div className="flex justify-center">
                        <SubmitButton formData={formData} handleSubmit={handleSubmit} text={'Add the event'} big={true}/>
                    </div>
                </div>
            </div>
        </div>
    );
}