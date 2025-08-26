import UserTable from '../features/users/component/table.jsx';
import React, {useState, useMemo, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Search, Users, UserCheck, UserX, Loader2 } from 'lucide-react';
import {filterService} from "../features/all/api/filterService.jsx";
import {ChangeUserStatueService} from "../features/users/api/changeUserStatueService.jsx";

const UserManagement = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const [changed,setChanged,] = useState(true);
    const {isLoading,inActiveUsers,activeUsers} = useSelector(state => state.Users);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(filterService({type:'user'}))
    }, [searchTerm,changed]);

    const toggleUserStatus = (user) => {
        setChanged(!changed);
        const status=user.status==='active'?'inactive':'active'
        dispatch(ChangeUserStatueService({id:user.id,status:status}));
    };

    return (
        <div
            className="relative flex size-full min-h-screen w-auto flex-col space-y-6 bg-[#0b1520] -m-6 p-6 -mx-6 overflow-x-hidden"
            style={{ fontFamily: '"Spline Sans", "Noto Sans", sans-serif' }}
        >
            <div className="container mx-auto max-w-7xl">
                {/* Header */}
                <div className="text-center mb-10">
                    <h1 className="text-5xl font-bold text-blue-400 mb-4 drop-shadow-2xl">
                        User Management
                    </h1>
                    <p className="text-slate-400 text-lg">Manage user accounts with ease</p>
                </div>

                {/* Search Section */}
                <div className="mb-10 relative">
                    <div className={`relative group w-full h-16 rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 ease-out ${isSearchFocused ? 'shadow-blue-400/20 scale-105' : 'shadow-black/50'} ${isLoading ? 'opacity-50 pointer-events-none' : ''}`}>
                        <div className="relative flex w-full h-full bg-[#0f1c2e]/80 backdrop-blur-sm">
                            <div className={`flex items-center justify-center px-5 border-r border-slate-600/30 transition-all duration-300 cursor-pointer ${isSearchFocused ? 'text-blue-300' : 'text-blue-400'}`}>
                                {isLoading ? (
                                    <Loader2 size={22} className="animate-spin" />
                                ) : (
                                    <Search size={22} strokeWidth={2.5} />
                                )}
                            </div>
                            <input
                                type="text"
                                placeholder="Search users by name or email..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onFocus={() => setIsSearchFocused(true)}
                                onBlur={() => setIsSearchFocused(false)}
                                disabled={isLoading}
                                className="w-full h-full px-6 py-4 bg-transparent text-white text-lg font-medium placeholder-slate-400/70 focus:outline-none disabled:cursor-not-allowed"
                            />
                        </div>
                    </div>
                </div>

                {/* Active Users Table */}
                <UserTable
                    users={activeUsers}
                    title="Active Users"
                    titleColor="text-emerald-400"
                    borderColor="border-emerald-400/20"
                    icon={UserCheck}
                    count={activeUsers.length}
                    toggleUserStatus={toggleUserStatus}
                    isLoading={isLoading}
                />

                {/* Inactive Users Table */}
                <UserTable
                    users={inActiveUsers}
                    title="Inactive Users"
                    titleColor="text-red-400"
                    borderColor="border-red-400/20"
                    icon={UserX}
                    count={inActiveUsers.length}
                    toggleUserStatus={toggleUserStatus}
                    isLoading={isLoading}
                />
            </div>
        </div>
    );
};

export default UserManagement;