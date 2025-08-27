import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Edit, Save, X, ToggleLeft, ToggleRight } from "lucide-react";
import HeroSection from "../../features/cities/components/City/heroSection.jsx";
import CityInfoSection from "../../features/cities/components/City/Info.jsx";
import EventsSection from "../../features/cities/components/City/events.jsx";
import GuidesSection from "../../features/cities/components/City/guides.jsx";
import { CityService } from "../../features/cities/api/cityService.jsx";
import { cityEvents_GuidesService } from "../../features/cities/api/cityEvents_GuidesService.jsx";
import AddMedia from "../../features/all/components/Add/add_media.jsx";
import {updateCityService} from "../../features/cities/api/updateCityService.jsx";
import {getIdsService} from "../../features/all/api/getIdsService.jsx";

const MainContent = () => {
    useEffect(() => {
        dispatch(getIdsService())
    }, []);
    const { id } = useParams();
    const dispatch = useDispatch();
    const { form, isLoading } = useSelector((state) => state.City);
    const { languages } = useSelector((state) => state.getIds);

    const countries=[
        { id: 1, name: 'afghanistan' },
        { id: 2, name: 'albania' },
        { id: 3, name: 'algeria' },
        { id: 4, name: 'america-samoa' },
        { id: 5, name: 'andorra' },
        { id: 6, name: 'angola' },
        { id: 7, name: 'anguilla' },
        { id: 8, name: 'antarctica' },
        { id: 9, name: 'antigua-and-barbuda' },
        { id: 10, name: 'argentina' },
        { id: 11, name: 'armenia' },
        { id: 12, name: 'aruba' },
        { id: 13, name: 'australia' },
        { id: 14, name: 'austria' },
        { id: 15, name: 'azerbaijan' },
        { id: 16, name: 'bahamas' },
        { id: 17, name: 'bahrain' },
        { id: 18, name: 'bangladesh' },
        { id: 19, name: 'barbados' },
        { id: 20, name: 'belarus' },
        { id: 21, name: 'belgium' },
        { id: 22, name: 'belize' },
        { id: 23, name: 'benin' },
        { id: 24, name: 'bermuda' },
        { id: 25, name: 'bhutan' }
    ]

    // حالة التعديل
    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState({
        nameEn: '',
        nameAr: '',
        descriptionEn: '',
        descriptionAr: '',
        country: '',
        language: '',
        images:[],
        videos:[],
        isActive: form.status === 'active'
    });
    console.log(editForm);

    useEffect(() => {
        dispatch(CityService({ id }));
    }, [dispatch, id]);

    useEffect(() => {
        dispatch(cityEvents_GuidesService({ id }));
    }, [dispatch, id]);

    // تحديث النموذج عند تغيير البيانات
    useEffect(() => {
        if (form) {
            setEditForm({
                nameEn: form?.nameEn || '',
                nameAr: form?.nameAr || '',
                descriptionEn: form?.descriptionEn || '',
                descriptionAr: form?.descriptionAr || '',
                country: form?.country?.id || '',
                language: form?.language?.id || '',
                images: form?.images || [],
                videos: form?.videos || [],
                isActive: form.status === 'active'
            });
        }
    }, [form]);

    // دالة بدء التعديل
    const handleStartEdit = () => {
        setIsEditing(true);
    };

    // دالة إلغاء التعديل
    const handleCancelEdit = () => {
        setIsEditing(false);
        // إعادة تعيين القيم الأصلية
        if (form) {
            setEditForm({
                nameEn: form?.nameEn || '',
                nameAr: form?.nameAr || '',
                descriptionEn: form?.descriptionEn || '',
                descriptionAr: form?.descriptionAr || '',
                country: form?.country?.id || '',
                language: form?.language?.id || '',
                images: form?.images || [],
                videos: form?.videos || [],
                isActive: form.status === 'active'

            });
        }
        setFiles({images:[],videos:[]})
    };

    // دالة حفظ التعديلات
    const handleSaveChanges = async () => {
        let media=[]
        for(const file of Files.images) {
            media.push(file.File);
        }
        for(const file of Files.videos) {
            media.push(file.File);
        }
        let old_media=[]
        for(const media of editForm.images) {
            old_media.push(media.id)
        }for(const media of editForm.videos) {
            old_media.push(media.id)
        }
        const status=editForm.isActive===true?'active':'inactive';
        const data={
            name:editForm.nameEn,
            name_ar:editForm.nameAr,
            description_ar:editForm.descriptionAr,
            description:editForm.descriptionEn,
            country_id:editForm.country,
            language_id:editForm.language,
            status:status,
            old_media:old_media,
            media:media
        }
        try {
            await dispatch(updateCityService({data,id}));
            setIsEditing(false);
            dispatch(CityService({ id }));

            alert('Information updated successfully!');
        } catch (error) {
            console.error('error:', error);
            alert('error happened!');
        }
    };

    // دالة تحديث قيم النموذج
    const handleInputChange = (field, value) => {
        setEditForm(prev => ({
            ...prev,
            [field]: value
        }));
    };

    // دالة تغيير حالة المدينة
    const handleToggleStatus = () => {
        setEditForm(prev => ({
            ...prev,
            isActive: !prev.isActive
        }));
    };
    const handleDeleteMedia = (id, type) => {
        setEditForm((prev) => {
            if (type === "image") {
                return { ...prev, images: prev.images.filter((item) => item.id !== id) };
            } else if (type === "video") {
                return { ...prev, videos: prev.videos.filter((item) => item.id !== id) };
            }
            return prev;
        });
    };
    const [Files,setFiles] = useState({images:[],videos:[]});
    const handleFilesChange=(type) => {

    }

    return (
        <div className="relative space-y-6 bg-[#0b1520] min-h-screen -m-6 p-6">
            {/* شريط التحكم العلوي */}
            <div className="fixed top-4 right-4 z-50">
                <div className="bg-slate-800/90 backdrop-blur-sm border border-slate-700 rounded-lg p-3 shadow-lg">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-slate-300">City Status:</span>
                            <button
                                onClick={handleToggleStatus}
                                className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium transition-all ${
                                    editForm.isActive
                                        ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                                        : 'bg-red-500/20 text-red-400 border border-red-500/30'
                                }`}
                                disabled={!isEditing}
                            >
                                {editForm.isActive ? (
                                    <>
                                        <ToggleRight className="w-4 h-4" />
                                        Active
                                    </>
                                ) : (
                                    <>
                                        <ToggleLeft className="w-4 h-4" />
                                        InActive
                                    </>
                                )}
                            </button>
                        </div>

                        {!isEditing ? (
                            <button
                                onClick={handleStartEdit}
                                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                            >
                                <Edit className="w-4 h-4" />
                                Edit City
                            </button>
                        ) : (
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={handleSaveChanges}
                                    className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                                >
                                    <Save className="w-4 h-4" />
                                    Save Edits
                                </button>
                                <button
                                    onClick={handleCancelEdit}
                                    className="flex items-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
                                >
                                    <X className="w-4 h-4" />
                                    Cancel
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <main className="min-h-screen pt-20">
                {/* Custom CSS for animations */}
                <style jsx>{`
                    @keyframes fade-in-up {
                        from {
                            opacity: 0;
                            transform: translateY(20px);
                        }
                        to {
                            opacity: 1;
                            transform: translateY(0);
                        }
                    }

                    @keyframes slide-in-left {
                        from {
                            opacity: 0;
                            transform: translateX(-20px);
                        }
                        to {
                            opacity: 1;
                            transform: translateX(0);
                        }
                    }

                    @keyframes slide-in-right {
                        from {
                            opacity: 0;
                            transform: translateX(20px);
                        }
                        to {
                            opacity: 1;
                            transform: translateX(0);
                        }
                    }

                    @keyframes slide-in-up {
                        from {
                            opacity: 0;
                            transform: translateY(30px);
                        }
                        to {
                            opacity: 1;
                            transform: translateY(0);
                        }
                    }

                    @keyframes fade-in {
                        from {
                            opacity: 0;
                        }
                        to {
                            opacity: 1;
                        }
                    }

                    .animate-fade-in-up {
                        animation: fade-in-up 0.8s ease-out forwards;
                    }

                    .animate-slide-in-left {
                        animation: slide-in-left 0.6s ease-out forwards;
                    }

                    .animate-slide-in-right {
                        animation: slide-in-right 0.6s ease-out forwards;
                    }

                    .animate-slide-in-up {
                        animation: slide-in-up 0.8s ease-out forwards;
                    }

                    .animate-fade-in {
                        animation: fade-in 0.6s ease-out forwards;
                    }

                    .animation-delay-200 {
                        animation-delay: 200ms;
                    }
                    .animation-delay-300 {
                        animation-delay: 300ms;
                    }
                    .animation-delay-400 {
                        animation-delay: 400ms;
                    }
                    .animation-delay-500 {
                        animation-delay: 500ms;
                    }
                    .animation-delay-600 {
                        animation-delay: 600ms;
                    }
                    .animation-delay-700 {
                        animation-delay: 700ms;
                    }
                    .animation-delay-800 {
                        animation-delay: 800ms;
                    }
                    .animation-delay-1000 {
                        animation-delay: 1000ms;
                    }
                `}</style>

                <div className="flex flex-col max-w-[1200px] mx-auto w-full">
                    {/* Hero Section */}
                    <HeroSection
                        cityName={isEditing ? editForm.nameEn : form?.nameEn}
                        cityNameAr={isEditing ? editForm.nameAr : form?.nameAr}
                        cityCountry={isEditing ? editForm.country : form?.country?.name}
                        cityImage={editForm.images}
                        cityVideos={editForm.videos}
                        isEditing={isEditing}
                        onNameEnChange={(value) => handleInputChange('nameEn', value)}
                        onNameArChange={(value) => handleInputChange('nameAr', value)}
                        onCountryChange={(value) => handleInputChange('country', value)}
                        onDeleteMedia={handleDeleteMedia}
                    />
                    {isEditing&&
                        (
                            <AddMedia formData={editForm} addMedia={handleFilesChange} Files={Files} setFiles={setFiles} />
                        )
                    }
                    <CityInfoSection
                        cityDescription={isEditing ? editForm.descriptionEn : form?.descriptionEn}
                        cityDescriptionAr={isEditing ? editForm.descriptionAr : form?.descriptionAr}
                        cityCountry={isEditing ? editForm.country : form?.country?.name}
                        cityLanguage={isEditing ? editForm.language : form?.language?.name}
                        isEditing={isEditing}
                        onDescriptionEnChange={(value) => handleInputChange('descriptionEn', value)}
                        onDescriptionArChange={(value) => handleInputChange('descriptionAr', value)}
                        onCountryChange={(value) => handleInputChange('country', value)}
                        onLanguageChange={(value) => handleInputChange('language', value)}
                        countries={countries}
                        languages={languages}
                    />

                    {/* Events Section */}
                    <div className="mt-8">
                        <EventsSection events={form?.events} loading={isLoading} />
                    </div>

                    {/* Guides Section */}
                    <div className="mt-8 mb-8">
                        <GuidesSection guides={form?.guides} loading={isLoading} />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default MainContent;