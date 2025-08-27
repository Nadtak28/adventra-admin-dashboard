import GuideCard from "./guideCard";
import SkeletonCard from "./skeletonCard.jsx";
import { Users } from "lucide-react";

const GuidesSection = ({ guides, loading }) => {
    return (
        <section className="opacity-0 animate-fade-in-up animation-delay-1000">
            {/* العنوان الرئيسي */}
            <div className="flex items-center gap-3 px-4 md:px-6 mb-4">
                <div className="p-2 rounded-lg bg-[#519489]/15 backdrop-blur-sm">
                    <Users className="w-6 h-6 text-[#519489]" />
                </div>
                <h2 className="text-white text-2xl font-bold tracking-wide">
                    Local Guides
                </h2>
            </div>

            {/* الحاوية الرئيسية */}
            <div className="overflow-x-auto scroll-smooth snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                <div className="flex items-stretch gap-4 px-4 py-2 md:px-6">
                    {loading ? (
                        // حالة التحميل
                        [...Array(3)].map((_, i) => (
                            <SkeletonCard
                                key={i}
                                className="min-w-[180px] h-56 rounded-xl bg-[#101b2a]/40 backdrop-blur-md"
                            />
                        ))
                    ) : !guides || guides.length === 0 ? (
                        // حالة عدم وجود مرشدين
                        <div className="flex-1 flex items-center justify-center py-12">
                            <div className="text-center opacity-0 animate-fade-in">
                                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#519489]/15 flex items-center justify-center backdrop-blur-sm">
                                    <Users className="w-8 h-8 text-[#519489]/70" />
                                </div>
                                <p className="text-gray-300 text-lg font-medium">
                                    No guides available
                                </p>
                                <p className="text-gray-400 text-sm mt-1">
                                    Guides will be listed here when available
                                </p>
                            </div>
                        </div>
                    ) : (
                        // عرض البطاقات في الوضع الداكن
                        (Array.isArray(guides) ? guides : guides.data || []).map(
                            (guide, index) => (
                                <GuideCard key={guide.id} guide={guide} index={index} />
                            )
                        )
                    )}
                </div>
            </div>
        </section>
    );
};

export default GuidesSection;
