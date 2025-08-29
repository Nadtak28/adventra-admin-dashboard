import {Send, UserCheck, Users} from "lucide-react";
import React from "react";

export default function BroadCastNotifications({ activeTab, setBroadcastType, broadcastType,broadcastMessage,setBroadcastMessage,sendBroadcast,title,setTitle }) {
    return (
        <>
            {activeTab === 'broadcast' && (
                <div className="space-y-6">
                    <div>
                        <h2 className="text-xl font-semibold text-white mb-4">Broadcast Notification</h2>
                        <p className="text-slate-400 mb-6">Send a notification to all users or all guides</p>
                    </div>

                    {/* Recipient Type Selection */}
                    <div className="bg-slate-800/50 p-6 rounded-lg">
                        <h3 className="text-lg font-medium text-white mb-4">Select Recipients</h3>
                        <div className="flex space-x-4">
                            <button
                                onClick={() => setBroadcastType('user')}
                                className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-colors ${
                                    broadcastType === 'user'
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                                }`}
                            >
                                <Users className="w-5 h-5" />
                                <span>All Users</span>
                            </button>
                            <button
                                onClick={() => setBroadcastType('guide')}
                                className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-colors ${
                                    broadcastType === 'guide'
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                                }`}
                            >
                                <UserCheck className="w-5 h-5" />
                                <span>All Guides</span>
                            </button>
                        </div>
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
                                value={broadcastMessage}
                                onChange={(e) => setBroadcastMessage(e.target.value)}
                                placeholder="Enter your broadcast message here..."
                                className="w-full h-32 bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                            />
                        </div>

                        <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">
                Broadcasting to: <span className="text-white font-medium">All {broadcastType}</span>
              </span>
                            <button
                                onClick={sendBroadcast}
                                disabled={!title.trim() || !broadcastMessage.trim()}
                                className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                <Send className="w-4 h-4" />
                                <span>Send Broadcast</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}