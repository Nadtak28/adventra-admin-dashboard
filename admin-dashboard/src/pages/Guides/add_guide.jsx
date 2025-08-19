import React, { useState } from 'react';
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {updateFields,Submit} from "../../features/guide/hook/addGuideSlice.jsx";
import AddHeader from "../../features/all/components/Add/add_header.jsx";
import Info from "../../features/guide/components/add/info.jsx";
import City from "../../features/guide/components/add/city.jsx";
import Languages from "../../features/guide/components/add/language.jsx";
import Categories from "../../features/guide/components/add/categories.jsx";
import SubmitButton from "../../features/all/components/Add/submit_button.jsx";
import {addGuideService} from "../../features/guide/api/addGuideService.jsx";

export default function TourGuideForm() {
    const navigate = useNavigate();
    const formData=useSelector(state=>state.addGuide);
    const dispatch=useDispatch();

    const availableLanguages = {
        'Bengali':1,
        'Luxembourgish':2,
        'French':3,
        'Nigerian Pidgin':4,
        'Algerian Arabic':5

    }

    const tourismCategories = {
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


    const handleInputChange = (field,value) => {
        dispatch(updateFields({field,value}))
    };

    const handleSubmit = async () => {
        dispatch(Submit());
        await dispatch(addGuideService())
    };

    return (
        <div className="relative space-y-6 bg-[#0b1520] min-h-screen -m-6 p-6">
            {/* Enhanced background effects */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-teal-900/30 via-slate-800/10 to-transparent"></div>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-slate-800/40 via-transparent to-transparent"></div>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-teal-900/5 to-transparent"></div>

            <div className="layout-container flex h-full grow flex-col relative z-10">
                <div className="gap-1 px-6 flex flex-1 justify-center py-5">
                    <div className="layout-content-container flex flex-col max-w-[900px] flex-1">

                        {/* Header */}
                        <AddHeader path={'/dashboard/guides'} title={'Add New Guide'} description={'Add guide info'} handleSubmit={handleSubmit} buttonText={'Add the guide'} />

                        {/* Form */}
                        <div className="px-4 space-y-8">
                            <div className="bg-gradient-to-br from-slate-800/60 to-slate-900/80 backdrop-blur-sm border border-slate-700/50 shadow-2xl rounded-2xl p-8">

                                <Info formData={formData} handleInputChange={handleInputChange} />

                                <City formData={formData} handleInputChange={handleInputChange} cities={cities} />

                                <Languages formData={formData} handleInputChange={handleInputChange} Languages={availableLanguages} />

                                <Categories formData={formData} handleInputChange={handleInputChange} Categories={tourismCategories} />

                                <div className="flex justify-center">
                                    <SubmitButton formData={formData} handleSubmit={handleSubmit} text={'Add the guide'} big={true}/>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}