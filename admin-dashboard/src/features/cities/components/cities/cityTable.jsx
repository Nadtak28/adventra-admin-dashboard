import {Eye, Star, TrendingUp, TrendingDown} from "lucide-react";
import React from "react";
import { CircularProgress, Skeleton, Box } from '@mui/material';
import {useNavigate} from "react-router-dom";

export default function CityTable({Cities, isLoading}){
    const image= "https://lh3.googleusercontent.com/aida-public/AB6AXuC8Esr-Fnjo0pTDA7rMgYOVRFB64s-mmaioHUtLdi-LFS6lQnbJoq7nDCVMfhRN368MJiVuOoLMFeev8NbHeGNFlaC3Ofc7IyjHaldTerFRn8XrK9f7vThzKKchhIRm_qXW9LIIiC2GBPJaoylcjVGPRfXDldQY0MjkUeHCE1Uh7QYWtVtLI0Gs8EHGFbc0NIe1-2LIQPuFQA_31fpgqvwi-YrxHpl2Q1-1sKBOSB3PafGJZr2DvcjkwjwdlMmih5GYsyDzzpje0sw"
    const navigate = useNavigate();

    function nav(city) {
        navigate(`/dashboard/cities/${city.id}`);
    }
    const formatNumber = (num) => {
        if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
        if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
        return num.toString();
    };
    const formatCurrency = (num) => {
        return '$' + formatNumber(num);
    };

    // Loading Skeleton Row Component
    const LoadingRow = () => (
        <tr className="border-t border-t-slate-700/30">
            <td className="px-6 py-5">
                <div className="flex items-center gap-4">
                    <Skeleton
                        variant="rectangular"
                        width={56}
                        height={56}
                        sx={{
                            borderRadius: '1rem',
                            bgcolor: 'rgba(100, 116, 139, 0.2)'
                        }}
                    />
                    <div>
                        <Skeleton
                            variant="text"
                            width={120}
                            height={24}
                            sx={{ bgcolor: 'rgba(100, 116, 139, 0.2)' }}
                        />
                        <Skeleton
                            variant="text"
                            width={80}
                            height={16}
                            sx={{ bgcolor: 'rgba(100, 116, 139, 0.2)' }}
                        />
                    </div>
                </div>
            </td>
            <td className="px-6 py-5">
                <Skeleton
                    variant="rounded"
                    width={60}
                    height={32}
                    sx={{
                        borderRadius: '9999px',
                        bgcolor: 'rgba(20, 184, 166, 0.2)'
                    }}
                />
            </td>
            <td className="px-6 py-5">
                <Skeleton
                    variant="text"
                    width={40}
                    height={20}
                    sx={{ bgcolor: 'rgba(100, 116, 139, 0.2)' }}
                />
            </td>
            <td className="px-6 py-5">
                <Skeleton
                    variant="text"
                    width={60}
                    height={20}
                    sx={{ bgcolor: 'rgba(100, 116, 139, 0.2)' }}
                />
            </td>
            <td className="px-6 py-5">
                <div className="flex items-center gap-2">
                    <Skeleton
                        variant="circular"
                        width={16}
                        height={16}
                        sx={{ bgcolor: 'rgba(251, 191, 36, 0.2)' }}
                    />
                    <Skeleton
                        variant="text"
                        width={30}
                        height={20}
                        sx={{ bgcolor: 'rgba(100, 116, 139, 0.2)' }}
                    />
                </div>
            </td>
            <td className="px-6 py-5">
                <Skeleton
                    variant="text"
                    width={80}
                    height={24}
                    sx={{ bgcolor: 'rgba(100, 116, 139, 0.2)' }}
                />
            </td>
            <td className="px-6 py-5">
                <div className="flex items-center gap-2">
                    <Skeleton
                        variant="circular"
                        width={16}
                        height={16}
                        sx={{ bgcolor: 'rgba(34, 197, 94, 0.2)' }}
                    />
                    <Skeleton
                        variant="text"
                        width={50}
                        height={20}
                        sx={{ bgcolor: 'rgba(100, 116, 139, 0.2)' }}
                    />
                </div>
            </td>
            <td className="px-6 py-5">
                <div className="flex items-center gap-3">
                    <Skeleton
                        variant="rounded"
                        width={70}
                        height={36}
                        sx={{
                            borderRadius: '0.75rem',
                            bgcolor: 'rgba(100, 116, 139, 0.2)'
                        }}
                    />
                    <Skeleton
                        variant="circular"
                        width={32}
                        height={32}
                        sx={{ bgcolor: 'rgba(100, 116, 139, 0.2)' }}
                    />
                </div>
            </td>
        </tr>
    );

    return (
        <div className="px-4 py-3">
            <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800/60 to-slate-900/80 backdrop-blur-sm border border-slate-700/50 shadow-2xl">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[800px]">
                        <thead>
                        <tr className="bg-gradient-to-r from-slate-800/80 to-slate-700/80 border-b border-slate-600/30">
                            <th className="px-6 py-4 text-left text-white text-sm font-semibold leading-normal">
                                City
                            </th>
                            <th className="px-6 py-4 text-left text-white text-sm font-semibold leading-normal">
                                Events
                            </th>
                            <th className="px-6 py-4 text-left text-white text-sm font-semibold leading-normal">
                                Tour Guides
                            </th>
                            <th className="px-6 py-4 text-left text-white text-sm font-semibold leading-normal">
                                Monthly Visitors
                            </th>
                            <th className="px-6 py-4 text-left text-white text-sm font-semibold leading-normal">
                                Rating
                            </th>
                            <th className="px-6 py-4 text-left text-white text-sm font-semibold leading-normal">
                                Revenue
                            </th>
                            <th className="px-6 py-4 text-left text-white text-sm font-semibold leading-normal">
                                Growth
                            </th>
                            <th className="px-6 py-4 text-left text-white text-sm font-semibold leading-normal">
                                Actions
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {isLoading ? (
                            // Loading State - عرض 5 صفوف loading skeleton
                            Array.from({ length: 5 }).map((_, index) => (
                                <LoadingRow key={`loading-${index}`} />
                            ))
                        ) : (
                            // Data State - عرض البيانات الفعلية
                            Cities?.map((city, index) => (
                                <tr onClick={()=>{nav(city)}}
                                    key={city.id} className="group border-t border-t-slate-700/30 hover:bg-gradient-to-r hover:from-slate-800/60 hover:to-slate-700/40 transition-all duration-300">
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-4">
                                            <div className="relative">
                                                <img
                                                    src={city?.images?.[0]?.url||image}
                                                    alt={city.name}
                                                    className="w-14 h-14 rounded-2xl object-cover border-2 border-teal-500/30 group-hover:border-teal-400/50 transition-all duration-300 group-hover:scale-110"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                            </div>
                                            <div>
                                                <p className="text-white font-semibold text-lg group-hover:text-teal-300 transition-colors duration-300">{city.name}</p>
                                                <p className="text-slate-400 text-sm font-medium">{city.country}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <span className="bg-gradient-to-r from-teal-600/80 to-teal-700/80 text-white px-3 py-2 rounded-full text-sm font-semibold shadow-lg shadow-teal-500/20">
                                            {city.events_count}
                                        </span>
                                    </td>
                                    <td className="px-6 py-5 text-slate-300 font-medium">
                                        {city.guides_count}
                                    </td>
                                    <td className="px-6 py-5 text-slate-300 font-medium">
                                        {formatNumber(city.monthly_visitors)}
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-2">
                                            <Star size={16} className="text-yellow-400 fill-current" />
                                            <span className="text-white font-semibold">{city.rating}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5 text-white font-semibold text-lg">
                                        {formatCurrency(city.current_revenue)}
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-2">
                                            {((Number(city.current_revenue) - Number(city.last_revenue)) / Number(city.last_revenue)) * 100 > 0 ? (
                                                <>
                                                    <TrendingUp size={16} className="text-green-400" />
                                                    <span className="text-green-400 font-semibold">+
                                                        {city.last_revenue!=0?((
                                                            ((Number(city.current_revenue) - Number(city.last_revenue)) / Number(city.last_revenue)) *
                                                            100
                                                        ).toFixed(2)):0}%
                                                    </span>
                                                </>
                                            ) : (
                                                <><TrendingDown size={16} className="text-red-400" />
                                                    <span className="text-red-400 font-semibold">
                                                        {city.last_revenue!=0?((
                                                            ((Number(city.current_revenue) - Number(city.last_revenue)) / Number(city.last_revenue)) *
                                                            100
                                                        ).toFixed(2)):0}%
                                                    </span>
                                                </>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-3">
                                            <button className="group/btn flex items-center gap-2 text-slate-400 hover:text-white transition-all duration-300 px-4 py-2 rounded-xl bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 hover:border-teal-500/50 hover:bg-slate-700/60 text-sm font-medium shadow-lg hover:shadow-teal-500/20 hover:scale-105">
                                                <Eye size={14} className="group-hover/btn:rotate-12 transition-transform duration-300" />
                                                View
                                            </button>

                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                        </tbody>
                    </table>
                </div>

                {/* Loading State Overlay */}
                {isLoading && (
                    <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center rounded-2xl">
                        <Box
                            display="flex"
                            flexDirection="column"
                            alignItems="center"
                            gap={2}
                            className="bg-slate-800/80 px-8 py-6 rounded-2xl border border-slate-600/50 shadow-2xl"
                        >
                            <CircularProgress
                                size={40}
                                thickness={4}
                                sx={{
                                    color: '#14b8a6', // teal-500
                                    '& .MuiCircularProgress-circle': {
                                        strokeLinecap: 'round',
                                    }
                                }}
                            />
                            <div className="text-white font-medium text-sm">
                                Loading cities data...
                            </div>
                        </Box>
                    </div>
                )}
            </div>
        </div>
    )
}