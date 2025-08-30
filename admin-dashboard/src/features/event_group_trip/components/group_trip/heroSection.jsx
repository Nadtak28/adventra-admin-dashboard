import { useEffect, useState } from "react";
import {
    MapPin,
    Globe,
    ChevronLeft,
    ChevronRight,
    Play,
    Pause,
    Camera,
    Video,
    Edit3,
    Trash2
} from "lucide-react";

const HeroSection = ({
                         eventName,
                         eventNameAr,
                         eventImage,
                         eventVideos,
                         isEditing = false,
                         onNameEnChange,
                         onNameArChange,
                         onDeleteMedia
                     }) => {
    const [loaded, setLoaded] = useState(false);
    const [headerLoaded, setHeaderLoaded] = useState(false);

    const images = eventImage || [];
    const videos = eventVideos || [];
    const hasMedia = images.length > 0 || videos.length > 0;

    useEffect(() => {
        const timer1 = setTimeout(() => setHeaderLoaded(true), 200);
        const timer2 = setTimeout(() => setLoaded(true), 400);
        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
        };
    }, []);

    return (
        <div className="relative space-y-6 bg-[#0b1520] min-h-screen -m-6 p-6">
            {/* Edit Mode Indicator */}
            {isEditing && (
                <div className="fixed top-24 right-4 z-40">
                    <div className="bg-blue-600/90 backdrop-blur-sm border border-blue-500/30 rounded-lg p-2 shadow-lg animate-pulse">
                        <div className="flex items-center gap-2">
                            <Edit3 className="w-4 h-4 text-white" />
                            <span className="text-white text-sm font-medium">Editing</span>
                        </div>
                    </div>
                </div>
            )}

            {/* Header */}
            <div
                className={`relative rounded-3xl min-h-[180px] bg-gradient-to-br from-[#12202f] via-[#152636] to-[#1b3347] overflow-hidden shadow-xl transform transition-all duration-1000 ${
                    headerLoaded ? "animate-fade-in-up scale-100" : "opacity-0 scale-95"
                } ${isEditing ? 'ring-2 ring-blue-500/30 ring-offset-2 ring-offset-[#0b1520]' : ''}`}
            >
                {/* Floating patterns */}
                <div
                    className="absolute inset-0 animate-pulse"
                    style={{
                        backgroundImage: `url('data:image/svg+xml,<svg width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg"><circle cx="15" cy="15" r="2" fill="%23519489" fill-opacity="0.03"/></svg>')`,
                    }}
                ></div>

                <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/20"></div>

                <div className="relative z-20 p-8 flex items-center justify-between h-full">
                    <div className="space-y-4 flex items-center justify-between w-full">
                        <div className="space-y-4 flex-1">
                            {/* Country Input */}
                            <div
                                className={`flex items-center gap-3 transform transition-all duration-700 ${
                                    headerLoaded
                                        ? "animate-slide-in-left"
                                        : "opacity-0 -translate-x-4"
                                }`}
                            >
                                <div className="bg-black/30 backdrop-blur-md rounded-full p-2 border border-white/10 shadow-md">
                                    <MapPin className="w-5 h-5 text-white" />
                                </div>
                                <EditableInput
                                    value={'Group Trip'}
                                    isEditing={false}
                                    placeholder="country name"
                                    className="text-gray-200 text-base font-semibold tracking-wide bg-transparent border-0 p-0 focus:ring-0"
                                />
                            </div>

                            {/* City Name English */}
                            <div
                                className={`transform transition-all duration-1000 ${
                                    headerLoaded
                                        ? "animate-slide-in-left"
                                        : "opacity-0 -translate-x-8"
                                }`}
                                style={{ animationDelay: "300ms" }}
                            >
                                <EditableInput
                                    value={eventName}
                                    onChange={onNameEnChange}
                                    isEditing={isEditing}
                                    placeholder="city name "
                                    className="text-white text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight bg-transparent border-0 p-0 focus:ring-0 w-full"
                                />
                            </div>

                            <div
                                className={`w-24 h-1 bg-[#519489] rounded-full shadow-lg transform transition-all duration-1000 ${
                                    headerLoaded
                                        ? "animate-slide-in-left scale-x-100"
                                        : "opacity-0 scale-x-0"
                                }`}
                                style={{ animationDelay: "600ms" }}
                            ></div>
                        </div>

                        {/* City Name Arabic */}
                        {(eventNameAr || isEditing) && (
                            <div className="flex-1 text-right">
                                <div
                                    className={`transform transition-all duration-1000 ${
                                        headerLoaded
                                            ? "animate-slide-in-right"
                                            : "opacity-0 translate-x-8"
                                    }`}
                                    style={{ animationDelay: "400ms" }}
                                >
                                    <EditableInput
                                        value={eventNameAr}
                                        onChange={onNameArChange}
                                        isEditing={isEditing}
                                        placeholder="Arabic City Name"
                                        className="text-white text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight bg-transparent border-0 p-0 focus:ring-0 w-full text-right"
                                        dir="rtl"
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    <div
                        className={`transform transition-all duration-1000 ml-8 ${
                            headerLoaded
                                ? "animate-slide-in-right"
                                : "opacity-0 translate-x-8"
                        }`}
                        style={{ animationDelay: "400ms" }}
                    >
                        <div className="bg-black/30 backdrop-blur-md rounded-2xl p-4 border border-white/10 shadow-lg hover:scale-110 transition-transform duration-500 hover:bg-black/50">
                            <Globe
                                className="w-8 h-8 text-[#519489] animate-spin"
                                style={{ animationDuration: "8s" }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Media Sliders */}
            {hasMedia && (
                <div
                    className={`grid grid-cols-1 lg:grid-cols-2 gap-8 transform transition-all duration-1000 ${
                        loaded ? "animate-slide-in-up" : "opacity-0 translate-y-8"
                    }`}
                    style={{ animationDelay: "800ms" }}
                >
                    {images.length > 0 && (
                        <MediaSlider
                            items={images}
                            type="image"
                            title="Photo Gallery"
                            isEditing={isEditing}
                            onDeleteMedia={onDeleteMedia}
                        />
                    )}
                    {videos.length > 0 && (
                        <MediaSlider
                            items={videos}
                            type="video"
                            title="Video Tour"
                            isEditing={isEditing}
                            onDeleteMedia={onDeleteMedia}
                        />
                    )}
                </div>
            )}

            {/* Fallback when no media */}
            {!hasMedia && (
                <div
                    className={`relative rounded-3xl min-h-[280px] bg-[#15212f] overflow-hidden shadow-lg border border-white/10 transform transition-all duration-1000 ${
                        loaded ? "animate-fade-in-up" : "opacity-0 translate-y-8"
                    }`}
                    style={{ animationDelay: "800ms" }}
                >
                    <div
                        className="absolute inset-0 animate-pulse"
                        style={{
                            backgroundImage: `url('data:image/svg+xml,<svg width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg"><circle cx="15" cy="15" r="2" fill="%23519489" fill-opacity="0.03"/></svg>')`,
                        }}
                    ></div>

                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>

                    <div className="relative z-10 p-8 flex items-center justify-center h-full">
                        <div className="text-center space-y-6">
                            <div className="relative">
                                <Globe className="w-20 h-20 text-[#519489]/70 mx-auto animate-pulse" />
                                <div className="absolute -top-2 -right-2 w-6 h-6 bg-[#519489]/20 rounded-full animate-ping"></div>
                            </div>
                            <div className="space-y-2">
                                <p className="text-gray-200 text-xl font-semibold">
                                    Discover {eventName}
                                </p>
                                <p className="text-gray-400 text-sm">
                                    Media content coming soon
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Custom Animations */}
            <style jsx>{`
                @keyframes fade-in-up {
                    from {
                        opacity: 0;
                        transform: translateY(30px) scale(0.95);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0) scale(1);
                    }
                }

                @keyframes slide-in-left {
                    from {
                        opacity: 0;
                        transform: translateX(-40px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }

                @keyframes slide-in-right {
                    from {
                        opacity: 0;
                        transform: translateX(40px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }

                @keyframes slide-in-up {
                    from {
                        opacity: 0;
                        transform: translateY(40px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .animate-fade-in-up {
                    animation: fade-in-up 0.8s ease-out forwards;
                }

                .animate-slide-in-left {
                    animation: slide-in-left 0.7s ease-out forwards;
                }

                .animate-slide-in-right {
                    animation: slide-in-right 0.7s ease-out forwards;
                }

                .animate-slide-in-up {
                    animation: slide-in-up 0.8s ease-out forwards;
                }

                .shadow-3xl {
                    box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.5);
                }
            `}</style>
        </div>
    );
};

const EditableInput = ({
                           value,
                           onChange,
                           isEditing,
                           placeholder,
                           className = "",
                           textareaProps = false,
                           dir = "ltr"
                       }) => {
    const [localValue, setLocalValue] = useState(value || "");
    const [isFocused, setIsFocused] = useState(false);

    useEffect(() => {
        setLocalValue(value || "");
    }, [value]);

    const handleChange = (e) => {
        setLocalValue(e.target.value);
        onChange(e.target.value);
    };

    if (!isEditing) {
        return (
            <span className={className} dir={dir}>
                {value || placeholder}
            </span>
        );
    }

    const baseInputStyles = `
        bg-slate-800/90 backdrop-blur-sm border-2 border-slate-600/50 
        text-white placeholder-slate-400 rounded-lg px-4 py-2
        focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20
        transition-all duration-300 resize-none
        ${className}
    `;

    if (textareaProps) {
        return (
            <textarea
                value={localValue}
                onChange={handleChange}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder={placeholder}
                className={`${baseInputStyles} min-h-[40px]`}
                rows={1}
                dir={dir}
                style={{
                    boxShadow: isFocused ? '0 0 20px rgba(59, 130, 246, 0.3)' : 'none'
                }}
            />
        );
    }

    return (
        <input
            type="text"
            value={localValue}
            onChange={handleChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholder}
            className={baseInputStyles}
            dir={dir}
            style={{
                boxShadow: isFocused ? '0 0 20px rgba(59, 130, 246, 0.3)' : 'none'
            }}
        />
    );
};

const MediaSlider = ({ items, type, title, isEditing, onDeleteMedia }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);
    const [autoPlayEnabled, setAutoPlayEnabled] = useState(true);
    const [loaded, setLoaded] = useState(false);

    const currentItem = items[currentIndex];

    useEffect(() => {
        const timer = setTimeout(() => setLoaded(true), 100);
        return () => clearTimeout(timer);
    }, []);

    // إصلاح المشكلة: إعادة تعيين المؤشر عند تغيير عدد العناصر
    useEffect(() => {
        if (items.length === 0) {
            setCurrentIndex(0);
        } else if (currentIndex >= items.length) {
            // إذا كان المؤشر الحالي أكبر من أو يساوي طول المصفوفة، اجعله يشير إلى آخر عنصر
            setCurrentIndex(items.length - 1);
        } else if (currentIndex < 0) {
            // إذا كان المؤشر سالبًا، اجعله يشير إلى أول عنصر
            setCurrentIndex(0);
        }
    }, [items.length, currentIndex]);

    // Auto-slide functionality
    useEffect(() => {
        if (autoPlayEnabled && items.length > 1 && !isVideoPlaying) {
            const interval = setInterval(() => {
                setCurrentIndex((prev) => {
                    const nextIndex = prev + 1;
                    // تأكد من أن المؤشر الجديد ضمن النطاق الصحيح
                    return nextIndex >= items.length ? 0 : nextIndex;
                });
            }, 4000);
            return () => clearInterval(interval);
        }
    }, [autoPlayEnabled, items.length, isVideoPlaying, currentIndex]);

    const goToPrevious = (e) => {
        e.stopPropagation();
        setCurrentIndex((prev) => {
            if (items.length === 0) return 0;
            return prev === 0 ? items.length - 1 : prev - 1;
        });
    };

    const goToNext = (e) => {
        e.stopPropagation();
        setCurrentIndex((prev) => {
            if (items.length === 0) return 0;
            return (prev + 1) % items.length;
        });
    };

    const handleVideoPlay = () => {
        setIsVideoPlaying(true);
        setAutoPlayEnabled(false);
    };

    const handleVideoPause = () => {
        setIsVideoPlaying(false);
        setAutoPlayEnabled(true);
    };

    const handlePlayButtonClick = (e) => {
        e.stopPropagation();
        const video = document.querySelector(
            `video[data-slider="${type}"][data-index="${currentIndex}"]`
        );
        if (video) {
            if (video.paused) {
                video.play();
            } else {
                video.pause();
            }
        }
    };

    const handleDeleteClick = (e) => {
        e.stopPropagation();
        if (onDeleteMedia && currentItem?.id) {
            // حفظ المؤشر الحالي قبل الحذف
            const wasLastItem = currentIndex === items.length - 1;
            const newLength = items.length - 1;

            // تحديد المؤشر الجديد بعد الحذف
            if (newLength === 0) {
                // إذا كان هذا آخر عنصر، سيتم إعادة تعيين المؤشر إلى 0 في useEffect
                setCurrentIndex(0);
            } else if (wasLastItem) {
                // إذا كنا في آخر عنصر، انتقل إلى العنصر السابق
                setCurrentIndex(newLength - 1);
            }
            // إذا لم نكن في آخر عنصر، يبقى المؤشر كما هو أو يتم تعديله في useEffect

            onDeleteMedia(currentItem.id, type);
        }
    };

    // إذا لم تكن هناك عناصر، لا تعرض شيئًا
    if (!items || items.length === 0) return null;

    // إذا كان المؤشر خارج النطاق، لا تعرض شيئًا حتى يتم إصلاحه في useEffect
    if (currentIndex >= items.length || currentIndex < 0 || !currentItem) {
        return null;
    }

    return (
        <div
            className={`relative rounded-2xl min-h-[280px] overflow-hidden group shadow-2xl transform transition-all duration-700 hover:scale-[1.03] hover:shadow-3xl ${
                loaded ? "animate-fade-in-up" : "opacity-0"
            }`}
        >
            {/* Media Background */}
            {type === "video" ? (
                <video
                    key={`${currentItem?.url}-${currentIndex}`} // مفتاح فريد لإعادة تحميل الفيديو
                    data-slider={type}
                    data-index={currentIndex}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    src={currentItem?.url}
                    autoPlay={false}
                    loop
                    muted
                    controls={false}
                    onPlay={handleVideoPlay}
                    onPause={handleVideoPause}
                />
            ) : (
                <div
                    className="absolute inset-0 bg-cover bg-center transition-all duration-1000 group-hover:scale-105"
                    style={{
                        backgroundImage: `url("${currentItem?.url}")`,
                    }}
                />
            )}

            {/* زر الحذف يظهر فقط في وضع التعديل */}
            {isEditing && (
                <button
                    onClick={handleDeleteClick}
                    className="absolute top-4 right-4 bg-red-600/80 hover:bg-red-700 transition-all duration-300 p-2 rounded-full shadow-lg z-40 transform hover:scale-110"
                    title="Delete"
                >
                    <Trash2 className="w-5 h-5 text-white" />
                </button>
            )}

            {/* Navigation Arrows */}
            {items.length > 1 && (
                <>
                    <button
                        onClick={goToPrevious}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/40 backdrop-blur-md border border-white/10 rounded-full p-3 opacity-0 group-hover:opacity-100 transition-all duration-500 hover:bg-[#519489]/40 hover:scale-110 z-30 shadow-lg"
                    >
                        <ChevronLeft className="w-5 h-5 text-white" />
                    </button>
                    <button
                        onClick={goToNext}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/40 backdrop-blur-md border border-white/10 rounded-full p-3 opacity-0 group-hover:opacity-100 transition-all duration-500 hover:bg-[#519489]/40 hover:scale-110 z-30 shadow-lg"
                    >
                        <ChevronRight className="w-5 h-5 text-white" />
                    </button>
                </>
            )}

            {/* Video Play Button */}
            {type === "video" && (
                <button
                    onClick={handlePlayButtonClick}
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/40 backdrop-blur-md border border-white/20 rounded-full p-4 opacity-0 group-hover:opacity-100 transition-all duration-500 hover:bg-[#519489]/50 hover:scale-125 z-30 shadow-xl"
                >
                    {isVideoPlaying ? (
                        <Pause className="w-8 h-8 text-white" />
                    ) : (
                        <Play className="w-8 h-8 text-white ml-1" />
                    )}
                </button>
            )}

            {/* Title and Counter */}
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        {type === "video" ? (
                            <Video className="w-5 h-5 text-[#519489] animate-pulse" />
                        ) : (
                            <Camera className="w-5 h-5 text-[#519489] animate-pulse" />
                        )}
                        <h3 className="text-white text-xl font-bold tracking-wide">
                            {title || (type === "video" ? "City Videos" : "City Gallery")}
                        </h3>
                    </div>
                    <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-full px-4 py-2 shadow-lg">
                        <span className="text-white text-sm font-semibold">
                            {currentIndex + 1} / {items.length}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;