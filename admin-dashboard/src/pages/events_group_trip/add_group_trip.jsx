import React, { useState } from 'react';
import AddMedia from "../../features/all/components/Add/add_media.jsx";
import {useNavigate} from "react-router-dom";
import {useSelector,useDispatch} from "react-redux";
import AddHeader from "../../features/all/components/Add/add_header.jsx";
import Info from "../../features/event_group_trip/components/Add/GT/info.jsx"
import Description from "../../features/event_group_trip/components/Add/GT/description.jsx"
import Price from "../../features/event_group_trip/components/Add/GT/price.jsx";
import Guide from "../../features/event_group_trip/components/Add/GT/guide.jsx";
import Events from "../../features/event_group_trip/components/Add/GT/events.jsx";
import {add_emptyMedia, updateFields,Submit} from "../../features/event_group_trip/hook/addGTSlice.jsx";
import {addGTService} from "../../features/event_group_trip/api/addGTService.jsx";
import SubmitButton from "../../features/all/components/Add/submit_button.jsx";
export default function AddGroupTrip() {

    const navigate = useNavigate();
    const formData=useSelector(state=>state.AddGT)
    const [Files, setFiles] = useState({images:[],videos:[]});
    const dispatch = useDispatch();
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
        const result=await dispatch(addGTService(Files))
        if(result.type==='addGTService/fulfilled')
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

            <div className="relative z-10 max-w-6xl mx-auto">
                {/* Header */}
                <AddHeader path={'/dashboard/event_grouptrip'} title={'Add New Group Trip'} description={'Add trip info and media'} handleSubmit={handleSubmit} buttonText={'Add the Trip'} />

                <div className="space-y-8">
                    <Info formData={formData} handleInputChange={handleInputChange}/>

                    <Description formData={formData} handleInputChange={handleInputChange}/>

                    <Price formData={formData} handleInputChange={handleInputChange}/>

                    <Events formData={formData} handleInputChange={handleInputChange}/>

                    <Guide formData={formData} handleInputChange={handleInputChange}/>

                    {/* Media Upload */}
                    <AddMedia formData={formData} addMedia={handleFilesChange} Files={Files} setFiles={setFiles} />

                    {/* Submit Button */}
                    <div className="flex justify-center">
                        <SubmitButton formData={formData} handleSubmit={handleSubmit} text={'Add the trip'} big={true}/>
                    </div>
                </div>

            </div>
        </div>
    );
}