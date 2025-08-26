import React, { useState } from 'react';
import { Edit, Save, X, Power, PowerOff, MapPin, Globe, Calendar, Users, Image, Video } from 'lucide-react';

const CityManagementInterface = () => {
    const [isActive, setIsActive] = useState(true);
    const [isEditing, setIsEditing] = useState(false);

    const [cityData, setCityData] = useState({
        nameEn: "Dubai",
        nameAr: "دبي",
        country: "United Arab Emirates",
        language: "Arabic, English",
        descriptionEn: "Dubai is a vibrant cosmopolitan city known for its futuristic skyline, luxury shopping, and world-class attractions. From the iconic Burj Khalifa to the stunning Palm Jumeirah, Dubai offers an unparalleled blend of modern innovation and traditional Arabian culture.",
        descriptionAr: "دبي مدينة عالمية نابضة بالحياة تشتهر بأفقها المستقبلي والتسوق الفاخر ومعالمها السياحية عالمية المستوى. من برج خليفة الشهير إلى نخلة جميرا المذهلة، تقدم دبي مزيجاً لا مثيل له من الابتكار الحديث والثقافة العربية التقليدية.",
        images: [
            "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&h=250&fit=crop",
            "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=400&h=250&fit=crop",
            "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=250&fit=crop"
        ],
        videos: [
            "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
            "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4"
        ],
        touristGuides: [
            "Downtown Dubai Walking Tour",
            "Dubai Creek Heritage Tour",
            "Desert Safari Adventure",
            "Dubai Marina Boat Tour"
        ],
        events: [
            {
                name: "Dubai Shopping Festival",
                date: "Dec 15, 2024 - Feb 15, 2025",
                description: "Annual shopping extravaganza with discounts and entertainment"
            },
            {
                name: "Dubai Food Festival",
                date: "Feb 20 - Mar 15, 2025",
                description: "Culinary celebration featuring local and international cuisine"
            },
            {
                name: "Art Dubai",
                date: "Mar 1 - 5, 2025",
                description: "Premier art fair showcasing contemporary Middle Eastern art"
            }
        ]
    });

    const [editData, setEditData] = useState({ ...cityData });

    const handleEdit = () => {
        setEditData({ ...cityData });
        setIsEditing(true);
    };

    const handleSave = () => {
        setCityData({ ...editData });
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditData({ ...cityData });
        setIsEditing(false);
    };

    const updateEditField = (field, value) => {
        setEditData(prev => ({ ...prev, [field]: value }));
    };

    const updateArrayField = (field, index, value) => {
        setEditData(prev => ({
            ...prev,
            [field]: prev[field].map((item, i) => i === index ? value : item)
        }));
    };

    const addArrayItem = (field, defaultValue = "") => {
        setEditData(prev => ({
            ...prev,
            [field]: [...prev[field], defaultValue]
        }));
    };

    const removeArrayItem = (field, index) => {
        setEditData(prev => ({
            ...prev,
            [field]: prev[field].filter((_, i) => i !== index)
        }));
    };

    const updateEventField = (index, field, value) => {
        setEditData(prev => ({
            ...prev,
            events: prev.events.map((event, i) =>
                i === index ? { ...event, [field]: value } : event
            )
        }));
    };

    const addEvent = () => {
        setEditData(prev => ({
            ...prev,
            events: [...prev.events, { name: "", date: "", description: "" }]
        }));
    };

    const removeEvent = (index) => {
        setEditData(prev => ({
            ...prev,
            events: prev.events.filter((_, i) => i !== index)
        }));
    };

    const currentData = isEditing ? editData : cityData;

    return (
        <div
            className="relative flex size-full min-h-screen w-auto flex-col space-y-6 bg-[#0b1520] -m-6 p-6 -mx-6 overflow-x-hidden"
            style={{ fontFamily: '"Spline Sans", "Noto Sans", sans-serif' }}
        >
            {/* Header Controls */}
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-4">
                    <button
                        onClick={() => setIsActive(!isActive)}
                        className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                            isActive
                                ? 'bg-green-600 hover:bg-green-700 text-white'
                                : 'bg-red-600 hover:bg-red-700 text-white'
                        }`}
                    >
                        {isActive ? <Power size={20} /> : <PowerOff size={20} />}
                        <span>{isActive ? 'Active' : 'Inactive'}</span>
                    </button>
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                        isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                        Status: {isActive ? 'Active' : 'Inactive'}
                    </div>
                </div>

                <div className="flex items-center space-x-3">
                    {isEditing ? (
                        <>
                            <button
                                onClick={handleCancel}
                                className="flex items-center space-x-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors"
                            >
                                <X size={20} />
                                <span>Cancel</span>
                            </button>
                            <button
                                onClick={handleSave}
                                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                            >
                                <Save size={20} />
                                <span>Save Changes</span>
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={handleEdit}
                            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                        >
                            <Edit size={20} />
                            <span>Edit City</span>
                        </button>
                    )}
                </div>
            </div>

            {/* City Header */}
            <div className="bg-[#1a2332] rounded-xl p-6 mb-6">
                <div className="flex items-center space-x-4 mb-4">
                    <MapPin className="text-blue-400" size={32} />
                    <div>
                        {isEditing ? (
                            <div className="space-y-2">
                                <input
                                    type="text"
                                    value={currentData.nameEn}
                                    onChange={(e) => updateEditField('nameEn', e.target.value)}
                                    className="text-3xl font-bold text-white bg-[#2a3441] border border-gray-600 rounded px-3 py-1"
                                    placeholder="English Name"
                                />
                                <input
                                    type="text"
                                    value={currentData.nameAr}
                                    onChange={(e) => updateEditField('nameAr', e.target.value)}
                                    className="text-2xl text-blue-300 bg-[#2a3441] border border-gray-600 rounded px-3 py-1"
                                    placeholder="Arabic Name"
                                />
                            </div>
                        ) : (
                            <>
                                <h1 className="text-3xl font-bold text-white">{currentData.nameEn}</h1>
                                <p className="text-2xl text-blue-300">{currentData.nameAr}</p>
                            </>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-3">
                        <Globe className="text-green-400" size={20} />
                        <div>
                            <span className="text-gray-400 text-sm">Country:</span>
                            {isEditing ? (
                                <input
                                    type="text"
                                    value={currentData.country}
                                    onChange={(e) => updateEditField('country', e.target.value)}
                                    className="ml-2 text-white bg-[#2a3441] border border-gray-600 rounded px-2 py-1"
                                />
                            ) : (
                                <span className="ml-2 text-white">{currentData.country}</span>
                            )}
                        </div>
                    </div>
                    <div className="flex items-center space-x-3">
                        <Users className="text-purple-400" size={20} />
                        <div>
                            <span className="text-gray-400 text-sm">Language:</span>
                            {isEditing ? (
                                <input
                                    type="text"
                                    value={currentData.language}
                                    onChange={(e) => updateEditField('language', e.target.value)}
                                    className="ml-2 text-white bg-[#2a3441] border border-gray-600 rounded px-2 py-1"
                                />
                            ) : (
                                <span className="ml-2 text-white">{currentData.language}</span>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Description Section */}
            <div className="bg-[#1a2332] rounded-xl p-6 mb-6">
                <h2 className="text-xl font-semibold text-white mb-4">Description</h2>
                <div className="space-y-4">
                    <div>
                        <h3 className="text-lg font-medium text-blue-300 mb-2">English</h3>
                        {isEditing ? (
                            <textarea
                                value={currentData.descriptionEn}
                                onChange={(e) => updateEditField('descriptionEn', e.target.value)}
                                className="w-full h-24 text-gray-300 bg-[#2a3441] border border-gray-600 rounded p-3 resize-none"
                                placeholder="English description"
                            />
                        ) : (
                            <p className="text-gray-300 leading-relaxed">{currentData.descriptionEn}</p>
                        )}
                    </div>
                    <div>
                        <h3 className="text-lg font-medium text-blue-300 mb-2">Arabic</h3>
                        {isEditing ? (
                            <textarea
                                value={currentData.descriptionAr}
                                onChange={(e) => updateEditField('descriptionAr', e.target.value)}
                                className="w-full h-24 text-gray-300 bg-[#2a3441] border border-gray-600 rounded p-3 resize-none"
                                placeholder="Arabic description"
                                dir="rtl"
                            />
                        ) : (
                            <p className="text-gray-300 leading-relaxed" dir="rtl">{currentData.descriptionAr}</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Images Section */}
            <div className="bg-[#1a2332] rounded-xl p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                        <Image className="text-yellow-400" size={24} />
                        <h2 className="text-xl font-semibold text-white">City Images</h2>
                    </div>
                    {isEditing && (
                        <button
                            onClick={() => addArrayItem('images')}
                            className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm"
                        >
                            Add Image
                        </button>
                    )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {currentData.images.map((image, index) => (
                        <div key={index} className="relative">
                            {isEditing ? (
                                <div className="space-y-2">
                                    <input
                                        type="url"
                                        value={image}
                                        onChange={(e) => updateArrayField('images', index, e.target.value)}
                                        className="w-full text-white bg-[#2a3441] border border-gray-600 rounded px-3 py-2 text-sm"
                                        placeholder="Image URL"
                                    />
                                    <button
                                        onClick={() => removeArrayItem('images', index)}
                                        className="text-red-400 hover:text-red-300 text-sm"
                                    >
                                        Remove
                                    </button>
                                </div>
                            ) : (
                                <img
                                    src={image}
                                    alt={`${currentData.nameEn} ${index + 1}`}
                                    className="w-full h-48 object-cover rounded-lg"
                                />
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Videos Section */}
            <div className="bg-[#1a2332] rounded-xl p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                        <Video className="text-red-400" size={24} />
                        <h2 className="text-xl font-semibold text-white">City Videos</h2>
                    </div>
                    {isEditing && (
                        <button
                            onClick={() => addArrayItem('videos')}
                            className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm"
                        >
                            Add Video
                        </button>
                    )}
                </div>
                <div className="space-y-4">
                    {currentData.videos.map((video, index) => (
                        <div key={index} className="relative">
                            {isEditing ? (
                                <div className="space-y-2">
                                    <input
                                        type="url"
                                        value={video}
                                        onChange={(e) => updateArrayField('videos', index, e.target.value)}
                                        className="w-full text-white bg-[#2a3441] border border-gray-600 rounded px-3 py-2"
                                        placeholder="Video URL"
                                    />
                                    <button
                                        onClick={() => removeArrayItem('videos', index)}
                                        className="text-red-400 hover:text-red-300 text-sm"
                                    >
                                        Remove
                                    </button>
                                </div>
                            ) : (
                                <div className="bg-[#2a3441] rounded-lg p-4">
                                    <p className="text-gray-300">Video {index + 1}: {video}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Tourist Guides Section */}
            <div className="bg-[#1a2332] rounded-xl p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-white">Tourist Guides</h2>
                    {isEditing && (
                        <button
                            onClick={() => addArrayItem('touristGuides')}
                            className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm"
                        >
                            Add Guide
                        </button>
                    )}
                </div>
                <div className="space-y-3">
                    {currentData.touristGuides.map((guide, index) => (
                        <div key={index} className="flex items-center space-x-3">
                            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                            {isEditing ? (
                                <div className="flex-1 flex items-center space-x-2">
                                    <input
                                        type="text"
                                        value={guide}
                                        onChange={(e) => updateArrayField('touristGuides', index, e.target.value)}
                                        className="flex-1 text-gray-300 bg-[#2a3441] border border-gray-600 rounded px-3 py-2"
                                        placeholder="Guide name"
                                    />
                                    <button
                                        onClick={() => removeArrayItem('touristGuides', index)}
                                        className="text-red-400 hover:text-red-300 text-sm"
                                    >
                                        Remove
                                    </button>
                                </div>
                            ) : (
                                <span className="text-gray-300">{guide}</span>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Events Section */}
            <div className="bg-[#1a2332] rounded-xl p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                        <Calendar className="text-green-400" size={24} />
                        <h2 className="text-xl font-semibold text-white">City Events</h2>
                    </div>
                    {isEditing && (
                        <button
                            onClick={addEvent}
                            className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm"
                        >
                            Add Event
                        </button>
                    )}
                </div>
                <div className="space-y-4">
                    {currentData.events.map((event, index) => (
                        <div key={index} className="bg-[#2a3441] rounded-lg p-4">
                            {isEditing ? (
                                <div className="space-y-3">
                                    <input
                                        type="text"
                                        value={event.name}
                                        onChange={(e) => updateEventField(index, 'name', e.target.value)}
                                        className="w-full text-white bg-[#3a4551] border border-gray-600 rounded px-3 py-2"
                                        placeholder="Event name"
                                    />
                                    <input
                                        type="text"
                                        value={event.date}
                                        onChange={(e) => updateEventField(index, 'date', e.target.value)}
                                        className="w-full text-blue-300 bg-[#3a4551] border border-gray-600 rounded px-3 py-2"
                                        placeholder="Event date"
                                    />
                                    <textarea
                                        value={event.description}
                                        onChange={(e) => updateEventField(index, 'description', e.target.value)}
                                        className="w-full text-gray-300 bg-[#3a4551] border border-gray-600 rounded px-3 py-2 resize-none"
                                        rows="2"
                                        placeholder="Event description"
                                    />
                                    <button
                                        onClick={() => removeEvent(index)}
                                        className="text-red-400 hover:text-red-300 text-sm"
                                    >
                                        Remove Event
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <h3 className="text-lg font-semibold text-white mb-1">{event.name}</h3>
                                    <p className="text-blue-300 text-sm mb-2">{event.date}</p>
                                    <p className="text-gray-300">{event.description}</p>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CityManagementInterface;