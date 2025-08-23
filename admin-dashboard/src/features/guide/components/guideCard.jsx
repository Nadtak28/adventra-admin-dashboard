import { Users, Calendar, Star, TrendingDown} from 'lucide-react';
const GuideCard = ({ guide, type }) => (
    <div className="group relative flex h-full flex-1 flex-col gap-4 rounded-2xl min-w-64 bg-gradient-to-br from-slate-800/80 to-slate-900/90 p-6 border border-slate-700/50 backdrop-blur-sm hover:shadow-2xl hover:shadow-teal-500/10 transition-all duration-500 hover:scale-105 hover:border-teal-500/30 hover:-translate-y-2">
        <div className="absolute -top-2 -right-2 z-10">
            {type === 'top' && (
                <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-lg shadow-yellow-500/30">
                    <Star size={12} fill="white" />
                    Top Rated
                </div>
            )}
            {type === 'lowest' && (
                <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-lg shadow-red-500/30">
                    <TrendingDown size={12} />
                    Needs Help
                </div>
            )}
        </div>

        <div className="w-full aspect-square rounded-xl overflow-hidden relative">
            <div className="w-full h-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white text-2xl font-bold">
                {guide.name.split(' ').map(n => n[0]).join('')}
            </div>

            <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-sm rounded-lg px-2 py-1 flex items-center gap-1 shadow-lg">
                <Star size={14} className="text-yellow-400" fill="currentColor" />
                <span className="text-white text-sm font-semibold">{guide.rating}</span>
            </div>

            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                <div className="flex gap-2">
                    <button className="bg-teal-500/90 hover:bg-teal-400 text-white p-2 rounded-full backdrop-blur-sm transition-all duration-200 hover:scale-110">
                        <Users size={16} />
                    </button>
                    <button className="bg-slate-700/90 hover:bg-slate-600 text-white p-2 rounded-full backdrop-blur-sm transition-all duration-200 hover:scale-110">
                        <Calendar size={16} />
                    </button>
                </div>
            </div>
        </div>

        <div className="space-y-3">
            <div>
                <p className="text-white text-lg font-semibold leading-normal group-hover:text-teal-300 transition-colors duration-300">
                    {guide.name}
                </p>
                <p className="text-teal-300 text-sm font-medium">
                    {guide.tours} tours completed
                </p>
            </div>

            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <span className="text-slate-400 text-sm">Salary:</span>
                    <span className="text-white font-semibold">{guide.salary}</span>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-slate-400 text-sm">Next Booking:</span>
                    <span className="text-teal-300 text-sm font-medium">{guide.nextBooking}</span>
                </div>
            </div>

            <div className="mt-4">
                <div className="flex justify-between items-center mb-1">
                    <span className="text-slate-400 text-xs">Performance</span>
                    <span className="text-slate-300 text-xs">{Math.round(guide.rating * 20)}%</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                    <div
                        className={`h-2 rounded-full transition-all duration-1000 ${
                            type === 'top' ? 'bg-gradient-to-r from-yellow-400 to-orange-400' :
                                'bg-gradient-to-r from-red-400 to-pink-400'
                        }`}
                        style={{ width: `${guide.rating * 20}%` }}
                    ></div>
                </div>
            </div>
        </div>
    </div>
);
export default GuideCard;