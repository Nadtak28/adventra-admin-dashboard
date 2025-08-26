import { Loader2, UserCheck, Users, UserX } from "lucide-react";
import React from "react";

const UserRow = ({ user, toggleUserStatus }) => {
    const isActive = user.status === "active";
    const avatarUrl =
        user.image && user.image.length > 0
            ? user.image[0]
            : `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=3b82f6&color=ffffff`;

    return (
        <tr className="border-b border-slate-700 hover:bg-slate-800/50 transition-all duration-300">
            <td className="py-4 px-4">
                <div className="flex items-center justify-center">
                    <img
                        src={avatarUrl}
                        alt={user.name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-slate-600 shadow-lg hover:scale-110 transition-transform duration-300"
                    />
                </div>
            </td>

            <td className="py-4 px-4">
                <div className="font-medium text-slate-200 text-lg">{user.name}</div>
            </td>

            <td className="py-4 px-4">
                <div className="text-slate-400 text-sm">{user.email}</div>
            </td>

            <td className="py-4 px-4 text-center">
                <span className="text-blue-400 font-semibold">{user.points || "0"}</span>
            </td>

            <td className="py-4 px-4 text-center text-slate-400 text-sm">
                {user.created_at?.toString().slice(0,10)}
            </td>

            <td className="py-4 px-4 text-center">
                <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                        isActive
                            ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                            : "bg-red-500/20 text-red-400 border border-red-500/30"
                    }`}
                >
                    {isActive ? (
                        <>
                            <UserCheck className="w-4 h-4 mr-1" />
                            Active
                        </>
                    ) : (
                        <>
                            <UserX className="w-4 h-4 mr-1" />
                            Inactive
                        </>
                    )}
                </span>
            </td>

            {/* زر التفعيل/التعطيل */}
            <td className="py-4 px-4 text-center">
                <button
                    onClick={() => toggleUserStatus(user)}
                    className={`px-6 py-2 rounded-lg text-white font-medium transition-all duration-300 transform hover:scale-105 shadow-lg ${
                        isActive
                            ? "bg-red-500 hover:bg-red-600 hover:shadow-red-500/25"
                            : "bg-emerald-500 hover:bg-emerald-600 hover:shadow-emerald-500/25"
                    }`}
                >
                    {isActive ? "Deactivate" : "Activate"}
                </button>
            </td>
        </tr>
    );
};

const UserTable = ({
                       users,
                       title,
                       titleColor,
                       borderColor,
                       icon: Icon,
                       count,
                       toggleUserStatus,
                       isLoading,
                   }) => (
    <div className="mb-8">
        <div className={`bg-[#0f1c2e]/90 backdrop-blur-lg rounded-2xl p-6 border ${borderColor} shadow-2xl relative`}>
            {isLoading && (
                <div className="absolute inset-0 bg-[#0f1c2e]/80 backdrop-blur-sm rounded-2xl flex items-center justify-center z-10">
                    <div className="flex flex-col items-center space-y-4">
                        <Loader2 className="w-8 h-8 text-blue-400 animate-spin" />
                        <p className="text-slate-300 text-lg font-medium">Loading users...</p>
                    </div>
                </div>
            )}

            <div className="flex items-center mb-6">
                <Icon className={`w-6 h-6 mr-3 ${titleColor}`} />
                <h2 className={`text-2xl font-bold ${titleColor}`}>{title}</h2>
                <span
                    className={`ml-4 px-4 py-2 rounded-full text-sm font-medium ${
                        titleColor.includes("emerald")
                            ? "bg-emerald-500/20 text-emerald-400"
                            : "bg-red-500/20 text-red-400"
                    }`}
                >
                    {count}
                </span>
            </div>

            <div className="overflow-x-auto rounded-xl">
                {users.length > 0 ? (
                    <table className="w-full">
                        <thead>
                        <tr className="border-b border-slate-700 bg-[#0b1520]/50">
                            <th className="text-center py-4 px-4 text-slate-300 font-semibold">Photo</th>
                            <th className="text-left py-4 px-4 text-slate-300 font-semibold">Name</th>
                            <th className="text-left py-4 px-4 text-slate-300 font-semibold">Email</th>
                            <th className="text-center py-4 px-4 text-slate-300 font-semibold">Points</th>
                            <th className="text-center py-4 px-4 text-slate-300 font-semibold">Signed Up At</th>
                            <th className="text-center py-4 px-4 text-slate-300 font-semibold">Status</th>
                            <th className="text-center py-4 px-4 text-slate-300 font-semibold">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {users.map((user) => (
                            <UserRow key={user.id} user={user} toggleUserStatus={toggleUserStatus} />
                        ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="text-center py-12">
                        <Users className="w-16 h-16 text-slate-500 mx-auto mb-4" />
                        <p className="text-slate-400 text-lg">No results found</p>
                    </div>
                )}
            </div>
        </div>
    </div>
);

export default UserTable;
