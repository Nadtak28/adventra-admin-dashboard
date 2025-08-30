import { Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";

const EventCard = ({ event, index }) => {
    const navigate = useNavigate();

    function onClick(event) {
        navigate(`/dashboard/events/${event.id}`)
    }

    return (
        <div
            onClick={() => onClick(event)}
            className={`border border-[#519489]/25 bg-[#101b2a]/50 backdrop-blur-md rounded-xl shadow-md hover:shadow-xl flex flex-col overflow-hidden min-w-[200px] max-w-[220px] snap-start cursor-pointer transform transition-all duration-500 hover:scale-[1.05] hover:border-[#519489]/60 opacity-0 animate-slide-in-right group`}
            style={{ animationDelay: `${index * 150}ms` }}
        >
            {/* صورة الفعالية */}
            <div
                className="w-full aspect-video bg-center bg-cover relative overflow-hidden"
                style={{
                    backgroundImage: `url("${
                        event.image ||
                        event.images?.[0]?.url ||
                        "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&h=200&fit=crop"
                    }")`,
                }}
            >
                {/* تأثير غامق عند الهوفر */}
                <div className="absolute inset-0 bg-[#519489]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* أيقونة الكاليندر */}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <div className="bg-[#101b2a]/70 backdrop-blur-sm border border-[#519489]/40 rounded-full p-1.5 shadow-md">
                        <Calendar className="w-4 h-4 text-[#519489]" />
                    </div>
                </div>
            </div>

            {/* نصوص البطاقة */}
            <div className="p-4 space-y-2 flex-1">
                {/* عنوان الفعالية */}
                <h3 className="text-white text-sm font-semibold truncate group-hover:text-[#519489] transition-colors duration-300">
                    {event.title || event.name || "Upcoming Event"}
                </h3>

                {/* وصف الفعالية */}
                <p className="text-gray-300 text-xs line-clamp-2 leading-relaxed">
                    {event.description || "Discover amazing events in this beautiful city"}
                </p>
            </div>
        </div>
    );
};

export default EventCard;
