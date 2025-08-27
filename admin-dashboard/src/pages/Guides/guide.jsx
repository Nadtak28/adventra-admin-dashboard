import { useParams } from "react-router-dom";
import GuideProfile from "../../features/guide/components/guide/guideProfile.jsx";
import BookingSection from "../../features/guide/components/guide/bookingSection.jsx";
import LoadingSpinner from "../../features/guide/components/guide/loadingSpinner.jsx";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import ReviewsSection from "../../features/guide/components/guide/reviewsSection.jsx";
import {getGuideService} from "../../features/guide/api/getGuideService.jsx";
import {getIdsService} from "../../features/all/api/getIdsService.jsx";

const Guide = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const {guide,isLoading}=useSelector((state) => state.Guide);
    const {cities}=useSelector((state) => state.getIds);
    const [isEdit, setEdit] = useState(false);
    //loading from selector
    const availability=[]
    useEffect(()=>{
        dispatch(getGuideService({id}))
        dispatch(getIdsService())
    },[])
    if (isLoading) {
        return (
            <div className="relative space-y-6 bg-[#0b1520] min-h-screen -m-6 p-6">
                <div className="min-h-screen bg-[#0b1520] flex items-center justify-center">
                    <LoadingSpinner size="lg" text="Loading guide details..." />
                </div>
            </div>
        );
    }

    if (!guide) return null;

    return (
        <div className="relative space-y-6 bg-[#0b1520] min-h-screen -m-6 p-6">
            <div className="min-h-screen bg-[#0b1520]">
                {/* Hero Section with animated background */}
                <div className="relative overflow-hidden bg-[#0b1520]">
                    {/* Background decorative elements */}
                    <div className="absolute inset-0 bg-[#0b1520]"></div>

                    <div className="absolute top-0 right-0 w-96 h-96 bg-[#519489]/5 rounded-full -translate-y-48 translate-x-48 animate-pulse"></div>
                    <div
                        className="absolute bottom-0 left-0 w-64 h-64 bg-[#519489]/5 rounded-full translate-y-32 -translate-x-32 animate-pulse"
                        style={{ animationDelay: "1s" }}
                    ></div>

                    <div
                        className={`relative px-4 sm:px-8 md:px-12 lg:px-20 xl:px-40 py-12 transition-all duration-300`}
                    >
                        <div className="max-w-6xl mx-auto space-y-12">
                            {/* Guide Profile Section */}

                                <GuideProfile guide={guide} cities={cities} isEdit={isEdit} setEdit={setEdit} />


                            {/* Booking Section - Pass only availability data */}
                            <section className="flex justify-center">
                                <div className="w-full max-w-md  rounded-lg shadow-lg p-6">
                                    <BookingSection
                                        guideId={Number(id)}
                                        guideName={guide?.name}
                                        guideImage={guide?.image}
                                        availability={availability}
                                        loadingAvailability={isLoading}
                                    />
                                </div>
                            </section>

                            {/* Reviews Section */}
                            <section className=" rounded-lg shadow-lg">
                                <ReviewsSection
                                    type="guide"
                                    entityId={Number(id)}
                                    feedbacks={guide?.feedbacks}
                                    rating={guide.rate}
                                    id={guide.id}
                                />
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Guide;