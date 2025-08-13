import React, { useState } from 'react';
import AddMedia from '../../features/all/components/Add/add_media.jsx';
import AddHeader from "../../features/all/components/Add/add_header.jsx";
import Info from "../../features/event_group_trip/components/Add/Info.jsx"
import Description from "../../features/event_group_trip/components/Add/description.jsx"
import Prices from "../../features/event_group_trip/components/Add/prices.jsx";
import {useNavigate} from "react-router-dom";
import SubmitButton from "../../features/all/components/Add/submit_button.jsx";
export default function AddEvent() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        nameEn: '',
        nameAr: '',
        descriptionEn: '',
        descriptionAr: '',
        ticketPrice: '',
        userPrice: '',
        eventType: '',
        city: '',
        maxTickets: '',
        images: [],
        videos: []
    });

    const eventTypes = [
        'Cultural', 'Sports', 'Entertainment', 'Educational', 'Artistic', 'Musical',
        'Theatrical', 'Commercial', 'Technological', 'Food & Drink', 'Health & Fitness',
        'Kids & Family', 'Business & Careers', 'Touristic', 'Religious', 'Charitable'
    ];


    const cities = [
        'Riyadh', 'Jeddah', 'Makkah', 'Madinah', 'Dammam',
        'Khobar', 'Tabuk', 'Buraidah', 'Khamis Mushait', 'Hail', 'Majmaah',
        'Taif', 'Jubail', 'Najran', 'Al Baha', 'Yanbu', 'Qatif',
        'Al Ahsa', 'Arar', 'Sakaka', 'Abha', 'Jazan'
    ];


    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = () => {
        console.log('Event submitted:', formData);
        // هنا يمكنك إضافة منطق إرسال البيانات
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

                    <AddMedia formData={formData} setFormData={setFormData} />
                    {/* Submit Button */}
                    <div className="flex justify-center">
                        <SubmitButton handleSubmit={handleSubmit} text={'Add the event'} big={true}/>
                    </div>
                </div>
            </div>
        </div>
    );
}