import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Edit, Save, X, ToggleLeft, ToggleRight, Plus, Calendar, Percent } from "lucide-react";
import HeroSection from "../../features/event_group_trip/components/group_trip/heroSection.jsx";
import EventInfoSection from "../../features/event_group_trip/components/group_trip/Info.jsx";
import OffersSection from "../../features/event_group_trip/components/group_trip/offers.jsx";
import AddMedia from "../../features/all/components/Add/add_media.jsx";
import {getIdsService} from "../../features/all/api/getIdsService.jsx";
import ReviewsSection from "../../features/guide/components/guide/reviewsSection.jsx";
import {updateEventOfferService} from "../../features/event_group_trip/api/updateEventOfferService.js";
import {GetGTService} from "../../features/event_group_trip/api/getGTService.js";
import {addGTOfferSerivce} from "../../features/event_group_trip/api/addGTOfferSlice.jsx";
import {updateGroupTripService} from "../../features/event_group_trip/api/updateGroupTripService.jsx";
import EventsSection from "../../features/cities/components/City/events.jsx";

const MainContent = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { form, isLoading } = useSelector((state) => state.GT);
    const { categories, cities } = useSelector((state) => state.getIds);
    const { guides } = useSelector((state) => state.getIds||[]);
    const[priceBfOffer, setPriceBfOffer] = useState();
    // حالة التعديل
    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState({
        nameEn: '',
        nameAr: '',
        descriptionEn: '',
        descriptionAr: '',
        images: [],
        videos: [],
        price: 0,
        basic_cost: 0,
        offers: [],
        has_offer: false
    });

    const [Files, setFiles] = useState({ images: [], videos: [] });

    useEffect(() => {
        dispatch(GetGTService({ id,type:'no' }));
    }, [dispatch, id]);

    useEffect(() => {
        dispatch(getIdsService())
    }, []);

    // تحديث النموذج عند تغيير البيانات
    useEffect(() => {
        if (form) {
            setEditForm({
                nameEn: form?.nameEn || '',
                nameAr: form?.nameAr || '',
                descriptionEn: form?.descriptionEn || '',
                descriptionAr: form?.descriptionAr || '',
                guide: form?.guide || null,
                images: form?.images || [],
                videos: form?.videos || [],
                basic_cost: form?.basic_cost || 0,
                price: form?.price || 0,
                isActive: form?.status,
                offers: form?.offers || [],
                has_offer: form?.has_offer || false
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
                city: form?.city || null,
                category: form?.category || null,
                images: form?.images || [],
                videos: form?.videos || [],
                basic_cost: form?.basic_cost || 0,
                price: form?.price || 0,
                isActive: form?.status,
                offers: form?.offers || [],
                has_offer: form?.has_offer || false
            });
        }
        setFiles({ images: [], videos: [] });
    };

    // دالة حفظ التعديلات
    const handleSaveChanges = async () => {
        let media = [];
        for (const file of Files.images) {
            media.push(file.File);
        }
        for (const file of Files.videos) {
            media.push(file.File);
        }

        let old_media = [];
        for (const mediaItem of editForm.images) {
            old_media.push(mediaItem.id);
        }
        for (const mediaItem of editForm.videos) {
            old_media.push(mediaItem.id);
        }

        const data = {
            name: editForm.nameEn,
            name_ar: editForm.nameAr,
            description_ar: editForm.descriptionAr,
            description: editForm.descriptionEn,
            guide_id: form.guide?.id,
            price: form.main_price? priceBfOffer:editForm.price,
            basic_cost: editForm.basic_cost,
            extra_cost:form?.extra_cost,
            adding_tickets_count:0,
            tickets_limit:form?.tickets_limit,
            old_media: old_media,
            media: media,
        };
        const result = await dispatch(updateGroupTripService({ data, id }));
        setIsEditing(false);
        dispatch(GetGTService({ id,type:'no' }));
        if (result.type === 'updateGroupTripService/fulfilled') {
            alert('Information updated successfully!');
            setFiles({ images: [], videos: [] });
        } else {
            alert('Problem happened ');
        }
    };

    // دالة تحديث قيم النموذج
    const handleInputChange = (field, value) => {
        if (field === 'city') {
            // البحث عن الcity object بناءً على الid
            const selectedCity = cities.find(city => city.id === parseInt(value));
            setEditForm(prev => ({
                ...prev,
                [field]: selectedCity || value
            }));
        } else if (field === 'category') {
            // البحث عن الcategory object بناءً على الid
            const selectedCategory = categories.find(category => category.id === parseInt(value));
            setEditForm(prev => ({
                ...prev,
                [field]: selectedCategory || value
            }));
        } else {
            setEditForm(prev => ({
                ...prev,
                [field]: value
            }));
        }
    };

    // دالة تغيير حالة المدينة
    const handleToggleStatus = () => {

    };

    // دالة التعامل مع تغيير العرض الحالي
    const handleOfferChange = (field, value) => {
        setEditForm(prev => {
            const updatedOffers = [...prev.offers];
            if (updatedOffers.length > 0) {
                updatedOffers[0] = {
                    ...updatedOffers[0],
                    [field]: field.includes('date') ? value + 'T00:00:00.000000Z' : value
                };
            }
            return {
                ...prev,
                offers: updatedOffers
            };
        });
    };

    // دالة إضافة عرض جديد
    const handleAddOffer = async (data) => {
        const formattedOffer = {
            discount: data.discount,
            start_date: data.start_date,
            end_date: data.end_date,
        };

        const result=await dispatch(addGTOfferSerivce({ data:formattedOffer,id}));
        if(result.type==='addGTOfferSerivce/fulfilled') {
            console.log(result);
            alert('Offer updated successfully!');
        }
        else{
            alert('Something went wrong!');
        }
        dispatch(GetGTService({ id ,type:'no'}));
    };
    const handleEditOffer = async(data) => {
        const formattedOffer = {
            discount: data.discount,
            start_date: data.start_date,
            end_date: data.end_date,
        };
        const result=await dispatch(updateEventOfferService({ data:formattedOffer,id}));
        if(result.type==='updateEventOfferService/fulfilled') {
            console.log(result);
            alert('Offer updated successfully!');
        }
        else{
            alert('Something went wrong!');
        }
        dispatch(getGTSerivce({ id,type:'no' }));
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

    const handleFilesChange = (type) => {
        // إضافة منطق التعامل مع الملفات هنا
    };

    return (
        <div className="relative space-y-6 bg-[#0b1520] min-h-screen -m-6 p-6">
            {/* شريط التحكم العلوي */}
            <div className="fixed top-4 right-4 z-50">
                <div className="bg-slate-800/90 backdrop-blur-sm border border-slate-700 rounded-lg p-3 shadow-lg">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-slate-300">GT Status:</span>
                            <button
                                className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium transition-all ${
                                    editForm.isActive
                                        ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                                        : 'bg-red-500/20 text-red-400 border border-red-500/30'
                                }`}
                                disabled={!isEditing}
                            >
                                    <>
                                        <ToggleRight className="w-4 h-4" />
                                        {form?.status}
                                    </>
                            </button>
                        </div>

                        {!isEditing ? (
                            <button
                                onClick={handleStartEdit}
                                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                            >
                                <Edit className="w-4 h-4" />
                                Edit GT
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

                <div className="flex flex-col max-w-[1200px] mx-auto w-full space-y-6">
                    {/* Hero Section */}
                    <HeroSection
                        eventName={isEditing ? editForm.nameEn : form?.nameEn}
                        eventNameAr={isEditing ? editForm.nameAr : form?.nameAr}
                        eventCity={isEditing ?
                            (typeof editForm.city === 'object' ? editForm.city?.name : editForm.city) :
                            form?.city?.name
                        }
                        eventImage={editForm.images}
                        eventVideos={editForm.videos}
                        isEditing={isEditing}
                        onNameEnChange={(value) => handleInputChange('nameEn', value)}
                        onNameArChange={(value) => handleInputChange('nameAr', value)}
                        onDeleteMedia={handleDeleteMedia}
                    />

                    {isEditing && (
                        <AddMedia
                            formData={editForm}
                            addMedia={handleFilesChange}
                            Files={Files}
                            setFiles={setFiles}
                        />
                    )}

                    <EventInfoSection
                        guide={isEditing ? editForm.guide : form?.guide}
                        eventCategory={isEditing ? editForm.category : form?.category}
                        eventDescription={isEditing ? editForm.descriptionEn : form?.descriptionEn}
                        eventDescriptionAr={isEditing ? editForm.descriptionAr : form?.descriptionAr}
                        basicCost={isEditing ? editForm.basic_cost : form?.basic_cost}
                        price={isEditing ? editForm.price : form?.price}
                        main_price={isEditing ? editForm.main_price : form?.main_price}
                        isEditing={isEditing}
                        onDescriptionEnChange={(value) => handleInputChange('descriptionEn', value)}
                        onDescriptionArChange={(value) => handleInputChange('descriptionAr', value)}
                        onGuideChange={(value) => handleInputChange('guide', value)}
                        onCategoryChange={(value) => handleInputChange('category', value)}
                        onBasicCostChange={(value) => handleInputChange('basic_cost', value)}
                        onPriceChange={(value) => handleInputChange('price', value)}
                        onMaxTicketsChange={(value) => handleInputChange('ticket_count', value)}
                        guides={guides}
                        extra_cost={form.extra_cost}
                        offers={form?.offers||[]}
                        has_offer={form.has_offer}
                        priceBfOffer={priceBfOffer}
                        setPriceBfOffer={setPriceBfOffer}
                        form={form}
                    />

                    {/* Offers Section */}
                    <OffersSection
                        offers={editForm.offers}
                        hasOffer={editForm.has_offer}
                        isEditing={isEditing}
                        onOfferChange={handleOfferChange}
                        onAddOffer={handleAddOffer}
                        event={form.id}
                        handleEditOffer={handleEditOffer}
                    />
                    <EventsSection events={form.events} loading={false}/>
                    <section className=" rounded-lg shadow-lg">
                        <ReviewsSection
                            feedbacks={form?.feedbacks}
                            rating={form.rate}
                            type={'group_trip'}
                        />
                    </section>
                </div>
            </main>
        </div>
    );
};

export default MainContent;