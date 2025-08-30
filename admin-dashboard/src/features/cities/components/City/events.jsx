import EventCard from "./EventCard";
import { Calendar } from "lucide-react";
import SkeletonCard from "./skeletonCard.jsx";
import {useNavigate} from "react-router-dom";

const EventsSection = ({ events, loading }) => {
    return (
        <section className="opacity-0 animate-fade-in-up animation-delay-800">
            {/* عنوان القسم */}
            <div className="flex items-center gap-3 px-4 md:px-6 mb-4">
                <div className="p-2 rounded-lg bg-[#519489]/15 backdrop-blur-sm group-hover:bg-[#519489]/25 transition-colors duration-300">
                    <Calendar className="w-6 h-6 text-[#519489]" />
                </div>
                <h2 className="text-white text-2xl font-bold tracking-wide">
                    Events in the City
                </h2>
            </div>

            {/* سلايدر الكروت */}
            <div className="overflow-x-auto scroll-smooth snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                <div className="flex items-stretch gap-4 px-4 py-2 md:px-6">
                    {loading ? (
                        [...Array(3)].map((_, i) => (
                            <SkeletonCard
                                key={i}
                                className="min-w-[200px] h-48 rounded-xl bg-[#101b2a]/40 border border-[#519489]/20 shadow-md"
                            />
                        ))
                    ) : !events || events.length === 0 ? (
                        <div className="flex-1 flex items-center justify-center py-12">
                            <div className="text-center opacity-0 animate-fade-in">
                                {/* أيقونة لا توجد فعاليات */}
                                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#519489]/15 backdrop-blur-sm flex items-center justify-center shadow-inner">
                                    <Calendar className="w-8 h-8 text-[#519489]/70" />
                                </div>
                                <p className="text-gray-300 text-lg font-medium">
                                    No events scheduled
                                </p>
                                <p className="text-gray-500 text-sm mt-1">
                                    Check back later for upcoming events
                                </p>
                            </div>
                        </div>
                    ) : (
                        (Array.isArray(events) ? events : []).map((event, index) => (
                            <EventCard key={event.id || index} event={event} index={index} />
                        ))
                    )}
                </div>
            </div>

            {/* ستايلات الأنيميشن */}
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
                .animate-fade-in-up {
                    animation: fade-in-up 0.8s ease-out forwards;
                }
                .animation-delay-800 {
                    animation-delay: 0.8s;
                }
            `}</style>
        </section>
    );
};

export default EventsSection;
