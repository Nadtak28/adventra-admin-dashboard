import { MapPin, Globe, Languages, Edit3 } from "lucide-react";
import { useState, useEffect } from "react";

const CityInfoSection = ({
                             cityCountry,
                             cityLanguage,
                             cityDescription,
                             cityDescriptionAr,
                             isEditing = false,
                             onDescriptionEnChange,
                             onDescriptionArChange,
                             onCountryChange,
                             onLanguageChange,
                             countries,
                             languages,
                         }) => {
    const infoCards = [
        {
            title: "About",
            content: cityDescription,
            contentAr: cityDescriptionAr,
            icon: Globe,
            delay: "animation-delay-200",
            type: "textarea",
            onChangeEn: onDescriptionEnChange,
            onChangeAr: onDescriptionArChange,
            placeholderEn: "City description in English...",
            placeholderAr: "City description in Arabic..."
        },
        {
            title: "Country",
            content: cityCountry,
            icon: MapPin,
            delay: "animation-delay-400",
            type: "select",
            onChangeEn: onCountryChange,
            options: countries,
            placeholderEn: "Select a country"
        },
        {
            title: "Language",
            content: cityLanguage,
            icon: Languages,
            delay: "animation-delay-600",
            type: "select",
            onChangeEn: onLanguageChange,
            options: languages,
            placeholderEn: "Select a language"
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
                                            value={card.content}
                                            onChange={(e) => card.onChangeEn(e.target.value)}
                                            options={card.options}
                                            isEditing={isEditing}
                                            placeholder={card.placeholderEn}
                                            content={card.content}
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

// مكوّن الـ SelectInput
const SelectInput = ({ value, onChange, options = [], placeholder = "Select an option", isEditing,content }) => {
    const selectedOption = options.find(opt => opt.id === Number(value));

    return isEditing ? (
        <select
            value={value}
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
        <p className="text-gray-200">{ content}</p>
    );
};

export default CityInfoSection;
