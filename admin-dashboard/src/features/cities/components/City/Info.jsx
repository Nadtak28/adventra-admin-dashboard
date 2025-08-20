import { useSelector } from "react-redux";
import { MapPin, Globe, Languages } from "lucide-react";
import SkeletonCard from "@mui/material";
const Info = ({ cityId }) => {
    const { detail: city, loadingDetail: loading } = useSelector(
        (state) => state.cities
    );

    if (loading) {
        return (
            <div className="space-y-6">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="px-4">
                        <SkeletonCard className="h-4 w-24 mb-2" />
                        <SkeletonCard className="h-16 w-full" />
                    </div>
                ))}
            </div>
        );
    }

    if (!city) return null;

    const infoCards = [
        {
            title: "About",
            content: city.description,
            icon: Globe,
            delay: "animation-delay-200",
        },
        {
            title: "Country",
            content: city.country?.name,
            icon: MapPin,
            delay: "animation-delay-400",
        },
        {
            title: "Language",
            content: city.language?.name,
            icon: Languages,
            delay: "animation-delay-600",
        },
    ];

    return (
        <div className="space-y-6">
            {infoCards.map((card) => (
                <div
                    key={card.title}
                    className={`opacity-0 animate-slide-in-up ${card.delay} group`}
                >
                    <div className="px-4 md:px-6">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 rounded-lg bg-[#519489]/10 group-hover:bg-[#519489]/20 transition-colors duration-300">
                                <card.icon className="w-5 h-5 text-[#519489]" />
                            </div>
                            <h2 className="text-[#101918] text-xl font-bold">{card.title}</h2>
                        </div>
                        <div className="bg-white rounded-xl border border-[#519489]/20 p-4 shadow-sm hover:shadow-md transition-all duration-300 hover:border-[#519489]/40 group-hover:transform group-hover:translate-x-2">
                            <p className="text-[#519489] text-base leading-relaxed">
                                {card.content}
                            </p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};
export default Info;
