import {Check, Search, Send, UserCheck, Users, X} from "lucide-react";
import React from "react";

export default function Targeted({activeTab, targetedType,handleTypeChange,searchTerm,setSearchTerm,selectedUsers,toggleUserSelection,users,guides,targetedMessage,setTargetedMessage,sendTargetedNotification,title,setTitle}) {

    // Get the appropriate data source and filter based on search
    const getCurrentData = () => {
        const currentData = targetedType === 'user' ? users : guides;
        return currentData.filter(item =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
    };

    const currentFilteredData = getCurrentData();
    return (
        <>
            {activeTab === 'targeted' && (
                <div className="space-y-6">
                    <div>
                        <h2 className="text-xl font-semibold text-white mb-4">Send Targeted Notification</h2>
                        <p className="text-slate-400 mb-6">Select specific users or guides to send notifications</p>
                    </div>

                    {/* User Selection */}
                    <div className="bg-slate-800/50 p-6 rounded-lg">
                        <h3 className="text-lg font-medium text-white mb-4">Select Recipients</h3>

                        {/* Type Filter */}
                        <div className="flex space-x-4 mb-4">
                            <button
                                onClick={() => handleTypeChange('user')}
                                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                                    targetedType === 'user'
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                                }`}
                            >
                                <Users className="w-4 h-4" />
                                <span>Users</span>
                            </button>
                            <button
                                onClick={() => handleTypeChange('guide')}
                                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                                    targetedType === 'guide'
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                                }`}
                            >
                                <UserCheck className="w-4 h-4" />
                                <span>Guides</span>
                            </button>
                        </div>

                        {/* Search */}
                        <div className="relative mb-4">
                            <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder={`Search ${targetedType}...`}
                                className="w-full pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        {/* Users List */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-60 overflow-y-auto">
                            {currentFilteredData.map((user) => (
                                <div
                                    key={user.id}
                                    onClick={() => toggleUserSelection(user.id)}
                                    className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors ${
                                        selectedUsers.includes(user.id)
                                            ? 'bg-blue-600/20 border border-blue-500'
                                            : 'bg-slate-700 hover:bg-slate-600'
                                    }`}
                                >
                                    <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                                        selectedUsers.includes(user.id)
                                            ? 'bg-blue-600 border-blue-600'
                                            : 'border-slate-400'
                                    }`}>
                                        {selectedUsers.includes(user.id) && (
                                            <Check className="w-3 h-3 text-white" />
                                        )}
                                    </div>
                                    <div className="flex items-center space-x-2 flex-1">
                                        <div className={`w-2 h-2 rounded-full ${user.status==='active' ? 'bg-green-500' : 'bg-slate-500'}`}></div>
                                        <div>
                                            <p className="text-white text-sm font-medium">{user.name}</p>
                                            <p className="text-slate-400 text-xs">{user.email}</p>
                                        </div>
                                    </div>
                                    <span className={`text-xs px-2 py-1 rounded ${
                                        targetedType === 'guides' ? 'bg-purple-600 text-white' : 'bg-blue-600 text-white'
                                    }`}>
                        {targetedType === 'user' ? 'user' : 'guide'}
                      </span>
                                </div>
                            ))}
                        </div>

                        {selectedUsers.length > 0 && (
                            <div className="mt-4 p-3 bg-slate-700 rounded-lg">
                                <p className="text-white text-sm font-medium mb-2">
                                    Selected ({selectedUsers.length}):
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {selectedUsers.map(userId => {
                                        // Find user in current data source
                                        const user = currentFilteredData.find(u => u.id === userId) ||
                                            (targetedType === 'user' ? users : guides).find(u => u.id === userId);
                                        return user ? (
                                            <span key={userId} className="bg-blue-600 text-white text-xs px-2 py-1 rounded flex items-center space-x-1">
                            <span>{user.name}</span>
                            <X
                                className="w-3 h-3 cursor-pointer hover:bg-blue-700 rounded"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    toggleUserSelection(userId);
                                }}
                            />
                          </span>
                                        ) : null;
                                    })}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Message Composition */}
                    <div className="bg-slate-800/50 p-6 rounded-lg">
                        <h3 className="text-lg font-medium text-white mb-4">Compose Message</h3>

                        {/* Title Input */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                Notification Title
                            </label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Enter notification title..."
                                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        {/* Message Textarea */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                Message Content
                            </label>
                            <textarea
                                value={targetedMessage}
                                onChange={(e) => setTargetedMessage(e.target.value)}
                                placeholder="Enter your targeted message here..."
                                className="w-full h-32 bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                            />
                        </div>

                        <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">
                    Recipients: <span className="text-white font-medium">{selectedUsers.length} selected</span>
                  </span>
                            <button
                                onClick={sendTargetedNotification}
                                disabled={!title.trim() || !targetedMessage.trim() || selectedUsers.length === 0}
                                className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                <Send className="w-4 h-4" />
                                <span>Send to Selected</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}