import { MapPin, Globe, BarChart3, DollarSign } from "lucide-react";
import { useState, useEffect } from "react";

const EventInfoSection = ({
                              eventCity,
                              eventCategory,
                              eventDescription,
                              eventDescriptionAr,
                              basicCost,
                              price,
                              main_price,
                              isEditing = false,
                              onDescriptionEnChange,
                              onDescriptionArChange,
                              onCityChange,
                              onCategoryChange,
                              onBasicCostChange,
                              onPriceChange,
                              onMainPriceChange,
                              cities = [],
                              categories = [],
                              offers=[],
                              priceBfOffer,
                              setPriceBfOffer,
                              has_offer
                          }) => {
    const infoCards = [
        {
            title: "About",
            content: eventDescription,
            contentAr: eventDescriptionAr,
            icon: Globe,
            delay: "animation-delay-200",
            type: "textarea",
            onChangeEn: onDescriptionEnChange,
            onChangeAr: onDescriptionArChange,
            placeholderEn: "Event description in English...",
            placeholderAr: "Event description in Arabic..."
        },
        {
            title: "City",
            content: eventCity,
            icon: MapPin,
            delay: "animation-delay-400",
            type: "select",
            onChangeEn: onCityChange,
            options: cities,
            placeholderEn: "Select a city"
        },
        {
            title: "Category",
            content: eventCategory,
            icon: BarChart3,
            delay: "animation-delay-600",
            type: "select",
            onChangeEn: onCategoryChange,
            options: categories,
            placeholderEn: "Select a category"
        },
        {
            title: "Pricing",
            content: { basicCost, price, main_price },
            icon: DollarSign,
            delay: "animation-delay-800",
            type: "pricing",
            onChangeBasic: onBasicCostChange,
            onChangePrice: onPriceChange,
            onChangeMainPrice: onMainPriceChange,
            placeholderBasic: "Basic cost...",
            placeholderPrice: "Event price...",
            placeholderMainPrice: "Main price..."
        },
    ];

    return (
        <div className="space-y-6">
            {infoCards.map((card) => (
                <div key={card.title} className={`opacity-0 animate-slide-in-up ${card.delay} group`}>
                    <div className="px-4 md:px-6">
                        {/* Card Title */}
                        <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 rounded-lg bg-[#519489]/15 group-hover:bg-[#519489]/25 transition-colors duration-300">
                                <card.icon className="w-5 h-5 text-[#519489]" />
                            </div>
                            <h2 className="text-white text-xl font-bold tracking-wide">
                                {card.title}
                            </h2>
                        </div>

                        <div
                            className={`bg-[#101b2a]/60 backdrop-blur-md rounded-xl border border-[#519489]/20 p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-[#519489]/40 group-hover:scale-[1.02] ${isEditing ? 'ring-2 ring-blue-500/20 ring-offset-2 ring-offset-[#0b1520]' : ''}`}
                        >
                            <div className="flex flex-col md:flex-row gap-4">
                                {/* English Content */}
                                <div className="flex-1">
                                    {card.type === "textarea" ? (
                                        <EditableTextarea
                                            value={card.content}
                                            onChange={card.onChangeEn}
                                            isEditing={isEditing}
                                            placeholder={card.placeholderEn}
                                            className="text-gray-200 text-base leading-relaxed"
                                            rows={4}
                                        />
                                    ) : card.type === "select" ? (
                                        <SelectInput
                                            onChange={(e) => card.onChangeEn(e.target.value)}
                                            options={card.options}
                                            isEditing={isEditing}
                                            placeholder={card.placeholderEn}
                                            content={card.content}
                                        />
                                    ) : card.type === "pricing" ? (
                                        <PricingInput
                                            basicCost={card.content.basicCost}
                                            price={card.content.price}
                                            main_price={card.content.main_price}
                                            onBasicCostChange={card.onChangeBasic}
                                            onPriceChange={card.onChangePrice}
                                            onMainPriceChange={card.onChangeMainPrice}
                                            isEditing={isEditing}
                                            placeholderBasic={card.placeholderBasic}
                                            placeholderPrice={card.placeholderPrice}
                                            placeholderMainPrice={card.placeholderMainPrice}
                                            offers={offers}
                                            has_offer={has_offer}
                                            priceBfOffer={priceBfOffer}
                                            setPriceBfOffer={setPriceBfOffer}
                                        />
                                    ) : (
                                        <EditableInput
                                            value={card.content}
                                            onChange={card.onChangeEn}
                                            isEditing={isEditing}
                                            placeholder={card.placeholderEn}
                                            className="text-gray-200 text-base leading-relaxed"
                                        />
                                    )}
                                </div>

                                {/* Arabic Description */}
                                {card.title === "About" && (
                                    <div className="flex-1">
                                        {isEditing && (
                                            <div className="mb-2">
                                                <span className="text-gray-400 text-sm">Arabic Description:</span>
                                            </div>
                                        )}
                                        <EditableTextarea
                                            value={card.contentAr}
                                            onChange={card.onChangeAr}
                                            isEditing={isEditing}
                                            placeholder={card.placeholderAr}
                                            className="text-gray-300 text-sm leading-relaxed text-right"
                                            dir="rtl"
                                            rows={4}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

// مكوّن إدخال نصي عادي
const EditableInput = ({ value, onChange, isEditing, placeholder, className = "", dir = "ltr" }) => {
    const [localValue, setLocalValue] = useState(value || "");
    useEffect(() => setLocalValue(value || ""), [value]);

    return isEditing ? (
        <input
            type="text"
            value={localValue}
            onChange={(e) => {
                setLocalValue(e.target.value);
                onChange(e.target.value);
            }}
            placeholder={placeholder}
            className={`w-full bg-slate-800/90 border-2 border-slate-600/50 text-white rounded-lg px-4 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 ${className}`}
            dir={dir}
        />
    ) : (
        <p className={className} dir={dir}>{value || placeholder}</p>
    );
};

// مكوّن إدخال نصي متعدد الأسطر
const EditableTextarea = ({ value, onChange, isEditing, placeholder, className = "", dir = "ltr", rows = 3 }) => {
    const [localValue, setLocalValue] = useState(value || "");
    useEffect(() => setLocalValue(value || ""), [value]);

    return isEditing ? (
        <textarea
            value={localValue}
            onChange={(e) => {
                setLocalValue(e.target.value);
                onChange(e.target.value);
            }}
            placeholder={placeholder}
            className={`w-full bg-slate-800/90 border-2 border-slate-600/50 text-white rounded-lg px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 ${className}`}
            rows={rows}
            dir={dir}
        />
    ) : (
        <p className={className} dir={dir}>{value || placeholder}</p>
    );
};

// مكوّن الـ SelectInput المُحدث ليتعامل مع الكائنات
const SelectInput = ({ onChange, options = [], placeholder = "Select an option", isEditing, content }) => {
    const getCurrentValue = () => {
        if (isEditing) {
            return typeof content === 'object' && content?.id ? content.id : content;
        }
        return content;
    };

    const getDisplayText = () => {
        if (typeof content === 'object' && content?.name) {
            return content.name;
        }
        if (typeof content === 'string') {
            return content;
        }
        return placeholder;
    };

    return isEditing ? (
        <select
            value={getCurrentValue() || ""}
            onChange={onChange}
            className="w-full bg-slate-800/90 border-2 border-slate-600/50 text-white rounded-lg px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
        >
            <option value="">{placeholder}</option>
            {options.map((option) => (
                <option key={option.id} value={option.id}>
                    {option.name}
                </option>
            ))}
        </select>
    ) : (
        <p className="text-gray-200">{getDisplayText()}</p>
    );
};

// مكوّن الأسعار المحدث مع main_price
const PricingInput = ({
                          basicCost,
                          price,
                          main_price,
                          onBasicCostChange,
                          onPriceChange,
                          onMainPriceChange,
                          isEditing,
                          placeholderBasic,
                          placeholderPrice,
                          placeholderMainPrice,
                          offers,
                          has_offer,
                          priceBfOffer,
                            setPriceBfOffer,
                      }) => {
    const [localBasicCost, setLocalBasicCost] = useState(basicCost || "");
    const [localPrice, setLocalPrice] = useState(price || "");
    const [localMainPrice, setLocalMainPrice] = useState(main_price || "");

    useEffect(() => setLocalBasicCost(basicCost || ""), [basicCost]);
    useEffect(() => setLocalPrice(price || ""), [price]);
    useEffect(() => setLocalMainPrice(main_price || ""), [main_price]);

    // تحديد ما إذا كان هناك عرض (main_price موجود)
    const hasOffer = has_offer;

    return isEditing ? (
        <div className="space-y-4">
            {/* Basic Cost */}
            <div>
                <label className="block text-gray-400 text-sm mb-2">Basic Cost</label>
                <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">$</span>
                    <input
                        type="number"
                        step="0.01"
                        min="0"
                        value={localBasicCost}
                        onChange={(e) => {
                            setLocalBasicCost(e.target.value);
                            onBasicCostChange(e.target.value);
                        }}
                        placeholder={placeholderBasic}
                        className="w-full bg-slate-800/90 border-2 border-slate-600/50 text-white rounded-lg pl-8 pr-4 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Main Price */}
                {hasOffer&&<div>
                    <label className="block text-gray-400 text-sm mb-2">
                        Main Price
                    </label>
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">$</span>
                        <input
                            type="number"
                            step="0.01"
                            min="0"
                            value={priceBfOffer}
                            onChange={(e) => {
                                setPriceBfOffer(e.target.value);
                                setLocalPrice(parseFloat(e.target.value-(e.target.value*offers?.[0].discount/100)).toFixed(2));
                            }}
                            placeholder={placeholderMainPrice}
                            className="w-full bg-slate-800/90 border-2 border-slate-600/50 text-white rounded-lg pl-8 pr-4 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                        />
                    </div>
                </div>}

                {/* Event Price */}
                <div>
                    <label className="block text-gray-400 text-sm mb-2">
                        Event Price
                        <span className="text-xs text-gray-500 block">
                            {localMainPrice ? "(After discount)" : "(Main price)"}
                        </span>
                    </label>
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">$</span>
                        <input
                            type="number"
                            step="0.01"
                            min="0"
                            value={localPrice}
                            onChange={(e) => {
                                if(!hasOffer) {
                                    setLocalPrice(e.target.value);
                                    onPriceChange(e.target.value);
                                }
                            }}
                            placeholder={placeholderPrice}
                            className="w-full bg-slate-800/90 border-2 border-slate-600/50 text-white rounded-lg pl-8 pr-4 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                        />
                    </div>
                </div>
            </div>
        </div>
    ) : (
        <div className="space-y-4">
            {/* Basic Cost */}
            <div className="bg-slate-800/30 rounded-lg p-3">
                <span className="text-gray-400 text-sm block mb-1">Basic Cost:</span>
                <p className="text-gray-200 text-base font-medium">
                    {basicCost ? `$${parseFloat(basicCost).toFixed(2)}` : "Not set"}
                </p>
            </div>

            {/* Pricing Display */}
            <div className="bg-gradient-to-r from-slate-800/30 to-slate-700/30 rounded-lg p-4">
                {hasOffer ? (
                    // عرض السعر الأصلي والسعر بعد الخصم
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="text-gray-400 text-sm">Original Price:</span>
                            <p className="text-gray-400 text-lg line-through decoration-red-500 decoration-2">
                                ${parseFloat(main_price).toFixed(2)}
                            </p>
                        </div>

                        <div className="flex items-center justify-between">
                            <span className="text-green-400 text-sm font-medium">Special Price:</span>
                            <p className="text-green-400 text-2xl font-bold">
                                ${parseFloat(price).toFixed(2)}
                            </p>
                        </div>

                        {/* حساب نسبة الخصم */}
                        {main_price && price && parseFloat(main_price) > parseFloat(price) && (
                            <div className="text-center">
                                <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                                    Save {offers?.[0].discount}%
                                </span>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="text-center">
                        <span className="text-gray-400 text-sm block mb-2">Event Price:</span>
                        <p className="text-[#519489] text-2xl font-bold">
                            {price ? `$${parseFloat(price).toFixed(2)}` : "Not set"}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EventInfoSection;