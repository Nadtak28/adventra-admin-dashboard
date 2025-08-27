import { useState, useEffect } from "react";
import AnimatedCard from "./animatedSection.jsx";
import { Edit3, Save, X, Check } from "lucide-react";
import {updateGuideService} from "../../api/updateGuideService.jsx";
import {useDispatch} from "react-redux";
import {getGuideService} from "../../api/getGuideService.jsx";

const GuideProfile = ({ guide, cities, isEdit, setEdit }) => {
    const [editData, setEditData] = useState({
        const_salary: guide?.const_salary || 0,
        status: guide?.status || 'active',
        email: guide?.email || '',
        city: guide?.city?.id || null
    });
    const dispatch = useDispatch();
    // Update editData when guide changes
    useEffect(() => {
        setEditData({
            const_salary: guide?.const_salary || 0,
            status: guide?.status || 'active',
            email: guide?.email || '',
            city: guide?.city?.id || null
        });
    }, [guide]);

    const imageUrl =
        guide.images?.[0]?.url || "https://unsplash.com/photos/man-holding-lighted-gas-lantern-oXVCgaDqX30";
    const languages = guide.languages?.length
        ? guide.languages.map((lang) => lang.name).join(", ")
        : "N/A";

    // Status color based on active/inactive
    const getStatusColor = (status) => {
        return status?.toLowerCase() === 'active'
            ? 'from-green-500 to-emerald-500'
            : 'from-red-500 to-rose-500';
    };

    const getStatusBg = (status) => {
        return status?.toLowerCase() === 'active'
            ? 'bg-green-500/20 border-green-500/30'
            : 'bg-red-500/20 border-red-500/30';
    };

    // Handle input changes
    const handleInputChange = (field, value) => {
        setEditData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    // Handle save changes
    const handleSave = async () => {
        const data= {
            const_salary: editData.const_salary,
            status: editData.status,
            email: editData.email,
            city_id: editData.city
            }
        const result=await dispatch(updateGuideService({id: guide.id,data:data}));
        if(result.type==='updateGuideService/fulfilled')
        {
            alert('Information updated successfully!');
            //هون بضيف الnavigate فيما بعد
        }
        else {
            alert('Problem happened ');
        }
        const id =guide.id
        dispatch(getGuideService({id}))
        setEdit(false);
    };

    // Handle cancel changes
    const handleCancel = () => {
        setEditData({
            const_salary: guide?.const_salary || 0,
            status: guide?.status || 'active',
            email: guide?.email || '',
            city: guide?.city?.id || null
        });
        setEdit(false);
    };

    // Get city name by ID
    const getCityName = (cityId) => {
        const city = cities?.find(c => c.id === cityId);
        return city?.name || 'N/A';
    };

    return (
        <AnimatedCard className="bg-gradient-to-br from-[#1a1f2e] to-[#252b3a] rounded-3xl shadow-xl hover:shadow-2xl p-8 border border-[#2a3441] backdrop-blur-sm">
            {/* Edit Controls */}
            <div className="flex justify-end mb-4">
                {!isEdit ? (
                    <button
                        onClick={() => setEdit(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-[#519489] hover:bg-[#6ba89d] text-white rounded-xl transition-colors duration-200 font-medium"
                    >
                        <Edit3 className="w-4 h-4" />
                        Edit Guide
                    </button>
                ) : (
                    <div className="flex gap-2">
                        <button
                            onClick={handleSave}
                            className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl transition-colors duration-200 font-medium"
                        >
                            <Save className="w-4 h-4" />
                            Save
                        </button>
                        <button
                            onClick={handleCancel}
                            className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl transition-colors duration-200 font-medium"
                        >
                            <X className="w-4 h-4" />
                            Cancel
                        </button>
                    </div>
                )}
            </div>

            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
                {/* Profile Image */}
                <div className="relative group flex-shrink-0">
                    <div className="absolute -inset-1 bg-gradient-to-r from-[#519489] to-[#6ba89d] rounded-3xl blur opacity-25 group-hover:opacity-75 transition duration-500"></div>
                    <div
                        className="relative bg-center bg-no-repeat aspect-square bg-cover rounded-2xl w-48 h-48 lg:w-56 lg:h-56 shadow-lg transform transition-all duration-500 group-hover:scale-105"
                        style={{ backgroundImage: `url('${imageUrl}')` }}
                    >
                        <div className="absolute inset-0 bg-[#519489] opacity-0 group-hover:opacity-20 rounded-2xl transition-opacity duration-300"></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent rounded-2xl"></div>
                    </div>

                    {/* Rating Badge */}
                    <div className="absolute -top-3 -right-3 bg-[#519489] text-white rounded-full px-3 py-1 text-sm font-bold shadow-lg">
                        ★ {guide.rate || 'N/A'}
                    </div>

                    {/* Status Badge */}
                    <div className={`absolute -top-3 -left-3 px-3 py-1 text-xs font-bold rounded-full shadow-lg ${getStatusBg(isEdit ? editData.status : guide.status)} border`}>
                        <span className={`bg-gradient-to-r ${getStatusColor(isEdit ? editData.status : guide.status)} bg-clip-text text-transparent`}>
                            {isEdit ? editData.status : guide.status || 'Unknown'}
                        </span>
                    </div>
                </div>

                {/* Profile Info */}
                <div className="flex-1 space-y-6 text-center lg:text-left">
                    <div className="animate-slideRight" style={{ animationDelay: "200ms" }}>
                        <h1 className="text-4xl lg:text-5xl font-bold mb-3 bg-gradient-to-r from-white via-[#b4d4d1] to-[#519489] bg-clip-text text-transparent">
                            {guide.name}
                        </h1>
                        <div className="w-24 h-1 bg-gradient-to-r from-[#519489] to-[#6ba89d] mx-auto lg:mx-0 rounded-full"></div>
                    </div>

                    {/* Info Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mt-6">
                        {/* Languages */}
                        <div className="bg-[#0b1520]/50 rounded-xl p-4 border border-[#2a3441] hover:border-[#519489]/50 transition-colors duration-300">
                            <div className="flex items-center text-[#519489] font-medium">
                                <svg className="w-5 h-5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M7 2a1 1 0 00-.707 1.707L7 4.414v3.758a1 1 0 01-.293.707l-4 4C.817 14.769 2.156 18 4.828 18h10.343c2.673 0 4.012-3.231 2.122-5.121l-4-4A1 1 0 0113 8.172V4.414l.707-.707A1 1 0 0013 2H7zm2 6.172V4h2v4.172a3 3 0 00.879 2.12l1.027 1.028a4 4 0 00-2.171.102l-.47.156a4 4 0 01-2.53 0l-.563-.187a1.993 1.993 0 00-.306-.084l1.063-1.063A3 3 0 009 8.172z" clipRule="evenodd" />
                                </svg>
                                <div>
                                    <p className="text-xs text-gray-400 uppercase tracking-wider">Languages</p>
                                    <p className="text-white font-semibold text-sm">{languages}</p>
                                </div>
                            </div>
                        </div>

                        {/* Phone */}
                        <div className="bg-[#0b1520]/50 rounded-xl p-4 border border-[#2a3441] hover:border-[#519489]/50 transition-colors duration-300">
                            <div className="flex items-center text-[#519489] font-medium">
                                <svg className="w-5 h-5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                </svg>
                                <div>
                                    <p className="text-xs text-gray-400 uppercase tracking-wider">Phone</p>
                                    <p className="text-white font-semibold text-sm">{guide.phone?.replaceAll('.',' ') || 'N/A'}</p>
                                </div>
                            </div>
                        </div>

                        {/* Email - Editable */}
                        <div className="bg-[#0b1520]/50 rounded-xl p-4 border border-[#2a3441] hover:border-[#519489]/50 transition-colors duration-300">
                            <div className="flex items-center text-[#519489] font-medium">
                                <svg className="w-5 h-5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                </svg>
                                <div className="flex-1">
                                    <p className="text-xs text-gray-400 uppercase tracking-wider">Email</p>
                                    {isEdit ? (
                                        <input
                                            type="email"
                                            value={editData.email}
                                            onChange={(e) => handleInputChange('email', e.target.value)}
                                            className="bg-[#2a3441] text-white font-semibold text-sm rounded px-2 py-1 w-full border border-[#519489]/30 focus:border-[#519489] focus:outline-none"
                                            placeholder="Enter email"
                                        />
                                    ) : (
                                        <p className="text-white font-semibold text-sm overflow-hidden">{guide.email || 'N/A'}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* City - Editable */}
                        <div className="bg-[#0b1520]/50 rounded-xl p-4 border border-[#2a3441] hover:border-[#519489]/50 transition-colors duration-300">
                            <div className="flex items-center text-[#519489] font-medium">
                                <svg className="w-5 h-5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <div className="flex-1">
                                    <p className="text-xs text-gray-400 uppercase tracking-wider">City</p>
                                    {isEdit ? (
                                        <select
                                            value={editData.city || ''}
                                            onChange={(e) => handleInputChange('city', Number(e.target.value))}
                                            className="bg-[#2a3441] text-white font-semibold text-sm rounded px-2 py-1 w-full border border-[#519489]/30 focus:border-[#519489] focus:outline-none"
                                        >
                                            <option value="">Select City</option>
                                            {cities?.map((city) => (
                                                <option key={city.id} value={city.id}>
                                                    {city.name}
                                                </option>
                                            ))}
                                        </select>
                                    ) : (
                                        <p className="text-white font-semibold text-sm">{guide.city?.name || 'N/A'}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Status - Editable */}
                        <div className="bg-[#0b1520]/50 rounded-xl p-4 border border-[#2a3441] hover:border-[#519489]/50 transition-colors duration-300">
                            <div className="flex items-center text-[#519489] font-medium">
                                <svg className="w-5 h-5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <div className="flex-1">
                                    <p className="text-xs text-gray-400 uppercase tracking-wider">Status</p>
                                    {isEdit ? (
                                        <select
                                            value={editData.status}
                                            onChange={(e) => handleInputChange('status', e.target.value)}
                                            className="bg-[#2a3441] text-white font-semibold text-sm rounded px-2 py-1 w-full border border-[#519489]/30 focus:border-[#519489] focus:outline-none"
                                        >
                                            <option value="active">Active</option>
                                            <option value="inactive">Inactive</option>
                                        </select>
                                    ) : (
                                        <p className="text-white font-semibold text-sm">{guide.status || 'Unknown'}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Monthly Rating */}
                        <div className="bg-[#0b1520]/50 rounded-xl p-4 border border-[#2a3441] hover:border-[#519489]/50 transition-colors duration-300">
                            <div className="flex items-center text-[#519489] font-medium">
                                <svg className="w-5 h-5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                                <div>
                                    <p className="text-xs text-gray-400 uppercase tracking-wider">Monthly Rating</p>
                                    <p className="text-white font-semibold text-sm">★ {guide?.monthly_rating || 'N/A'}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Salary Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                        {/* Base Salary - Editable */}
                        <div className="bg-gradient-to-r from-[#519489]/20 to-[#6ba89d]/20 rounded-2xl p-6 border border-[#519489]/30">
                            <div className="text-center lg:text-left">
                                <p className="text-gray-400 text-sm uppercase tracking-wider mb-2">Base Salary</p>
                                <div className="flex items-baseline justify-center lg:justify-start">
                                    {isEdit ? (
                                        <div className="flex items-baseline">
                                            <span className="text-2xl font-bold text-[#519489] mr-2">$</span>
                                            <input
                                                type="number"
                                                value={editData.const_salary}
                                                onChange={(e) => handleInputChange('const_salary', Number(e.target.value))}
                                                className="bg-[#2a3441] text-[#519489] font-bold text-2xl rounded px-2 py-1 w-24 border border-[#519489]/30 focus:border-[#519489] focus:outline-none"
                                                min="0"
                                            />
                                            <span className="text-gray-400 font-medium ml-2">/ month</span>
                                        </div>
                                    ) : (
                                        <>
                                            <span className="text-3xl font-bold text-[#519489]">${guide?.const_salary || 0}</span>
                                            <span className="text-gray-400 font-medium ml-2">/ month</span>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Additional Salary */}
                        <div className="bg-gradient-to-r from-[#6ba89d]/20 to-[#519489]/20 rounded-2xl p-6 border border-[#6ba89d]/30">
                            <div className="text-center lg:text-left">
                                <p className="text-gray-400 text-sm uppercase tracking-wider mb-2">Additional Pay</p>
                                <div className="flex items-baseline justify-center lg:justify-start">
                                    <span className="text-3xl font-bold text-[#6ba89d]">${guide?.extra_salary || 0}</span>
                                    <span className="text-gray-400 font-medium ml-2">This month</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Tour Price */}
                    <div className="bg-gradient-to-r from-[#519489]/10 to-[#6ba89d]/10 rounded-2xl p-6 border border-[#519489]/20">
                        <div className="text-center lg:text-left">
                            <p className="text-gray-400 text-sm uppercase tracking-wider mb-2">Tour Price</p>
                            <div className="flex items-baseline justify-center lg:justify-start">
                                <span className="text-4xl font-bold text-[#519489]">${guide.price || 0}</span>
                                <span className="text-gray-400 font-medium ml-2 text-lg">per tour</span>
                            </div>
                        </div>
                    </div>

                    {/* Categories */}
                    {guide.categories && guide.categories.length > 0 && (
                        <div className="animate-slideRight" style={{ animationDelay: "500ms" }}>
                            <p className="text-gray-400 text-sm uppercase tracking-wider mb-3">Specialties</p>
                            <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                                {guide.categories.map((category, index) => (
                                    <span
                                        key={category.id}
                                        className="px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-[#519489] to-[#6ba89d] text-white shadow-lg transform transition-all duration-300 hover:scale-110 hover:shadow-xl animate-fadeIn"
                                        style={{ animationDelay: `${500 + index * 100}ms` }}
                                    >
                                        {category.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Description */}
            <div className="mt-10 animate-slideUp" style={{ animationDelay: "600ms" }}>
                <div className="flex items-center mb-6">
                    <div className="h-px bg-gradient-to-r from-transparent via-[#519489] to-transparent flex-1"></div>
                    <span className="px-6 text-[#519489] font-semibold">About Me</span>
                    <div className="h-px bg-gradient-to-r from-transparent via-[#519489] to-transparent flex-1"></div>
                </div>
                <div className="bg-[#0b1520]/30 rounded-2xl p-6 border border-[#2a3441]">
                    <p className="text-gray-300 leading-relaxed text-lg text-center lg:text-left">
                        {guide.description}
                    </p>
                </div>
            </div>
        </AnimatedCard>
    );
};

export default GuideProfile;