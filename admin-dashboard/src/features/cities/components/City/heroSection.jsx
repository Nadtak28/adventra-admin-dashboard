import { useEffect, useState } from "react";
import { MapPin, Globe, ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";

const HeroSection = (info) => {




    if (!info) {
        return (
            <div className="px-4 py-3">
                <div className="bg-red-50 border border-red-200 rounded-xl min-h-[218px] flex items-center justify-center">
                    <p className="text-red-600">
                        {"Failed to load info details"}
                    </p>
                </div>
            </div>
        );
    }

    const images = info.images || [];
    const videos = info.videos || [];
    const hasMedia = images.length > 0 || videos.length > 0;

    return (
        <div className="px-4 py-3 space-y-4">
            {/* Header Section */}
            <div className="relative rounded-xl min-h-[140px] bg-gradient-to-br from-[#519489] to-[#6ba89c] overflow-hidden">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="relative z-10 p-6 flex items-center justify-between h-full">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <MapPin className="w-5 h-5 text-white/80" />
                            <span className="text-white/80 text-sm font-medium">
                {info.country?.name}
              </span>
                        </div>
                        <h1 className="text-white text-3xl sm:text-4xl font-bold drop-shadow-lg">
                            {info.name}
                        </h1>
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                        <Globe className="w-6 h-6 text-white" />
                    </div>
                </div>
            </div>

            {/* Media Sliders */}
            {hasMedia && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Images Slider */}
                    {images.length > 0 && (
                        <MediaSlider
                            items={images}
                            type="image"
                        />
                    )}

                    {/* Videos Slider */}
                    {videos.length > 0 && (
                        <MediaSlider
                            items={videos}
                            type="video"
                        />
                    )}
                </div>
            )}

            {/* Fallback when no media */}
            {!hasMedia && (
                <div className="relative rounded-xl min-h-[200px] bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    <div className="relative z-10 p-6 flex items-center justify-center h-full">
                        <div className="text-center">
                            <Globe className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                            <p className="text-gray-600 text-lg">No Media</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
const MediaSlider = ({ items, type, title }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);
    const [autoPlayEnabled, setAutoPlayEnabled] = useState(true);

    const currentItem = items[currentIndex];
    const defaultImage = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop";

    // Auto-slide functionality
    useEffect(() => {
        if (autoPlayEnabled && items.length > 1 && !isVideoPlaying) {
            const interval = setInterval(() => {
                setCurrentIndex((prev) => (prev + 1) % items.length);
            }, 4000);

            return () => clearInterval(interval);
        }
    }, [autoPlayEnabled, items.length, isVideoPlaying, currentIndex]);

    const goToPrevious = (e) => {
        e.stopPropagation();
        setCurrentIndex((prev) =>
            prev === 0 ? items.length - 1 : prev - 1
        );
    };

    const goToNext = (e) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev + 1) % items.length);
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
        const video = document.querySelector(`video[data-slider="${type}"][data-index="${currentIndex}"]`);
        if (video) {
            if (video.paused) {
                video.play();
            } else {
                video.pause();
            }
        }
    };

    if (!items || items.length === 0) return null;

    return (
        <div className="relative rounded-xl min-h-[200px] overflow-hidden group transform transition-all duration-500 hover:scale-[1.02]">
            {/* Media Background */}
            {type === 'video' ? (
                <video
                    key={currentItem.url}
                    data-slider={type}
                    data-index={currentIndex}
                    className="absolute inset-0 w-full h-full object-cover"
                    src={currentItem.url}
                    autoPlay={false}
                    loop
                    muted
                    controls={false}
                    onPlay={handleVideoPlay}
                    onPause={handleVideoPause}
                />
            ) : (
                <div
                    className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
                    style={{
                        backgroundImage: `url("${currentItem?.url || defaultImage}")`,
                    }}
                />
            )}

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            {/* Navigation Arrows */}
            {items.length > 1 && (
                <>
                    <button
                        onClick={goToPrevious}
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white/30 z-30"
                    >
                        <ChevronLeft className="w-4 h-4 text-white" />
                    </button>
                    <button
                        onClick={goToNext}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white/30 z-30"
                    >
                        <ChevronRight className="w-4 h-4 text-white" />
                    </button>
                </>
            )}

            {/* Video Play Button */}
            {type === 'video' && (
                <button
                    onClick={handlePlayButtonClick}
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm rounded-full p-3 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white/30 z-30"
                >
                    {isVideoPlaying ? (
                        <Pause className="w-6 h-6 text-white" />
                    ) : (
                        <Play className="w-6 h-6 text-white ml-1" />
                    )}
                </button>
            )}

            {/* Title and Counter */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                <div className="flex items-center justify-between">
                    <h3 className="text-white text-lg font-semibold">
                        {title}
                    </h3>
                    <div className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
            <span className="text-white text-sm font-medium">
              {type === 'video' ? '📹' : '📸'} {currentIndex + 1} / {items.length}
            </span>
                    </div>
                </div>
            </div>

            {/* Media Indicators */}
            {items.length > 1 && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-1 z-30">
                    {items.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`w-2 h-2 rounded-full transition-all duration-300 hover:scale-150 ${
                                index === currentIndex
                                    ? 'bg-white scale-125'
                                    : 'bg-white/50 hover:bg-white/75'
                            }`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default HeroSection;