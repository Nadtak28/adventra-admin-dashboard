import {Filter} from "lucide-react";
import React from "react";

export default function AdminNotifications({ activeTab, notifications,getNotificationIcon }) {
    return (
        <>
            {activeTab === 'admin' && (
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold text-white">Recent Admin Notifications</h2>
                        <div className="flex items-center space-x-2">
                  {/*<span className="text-sm text-slate-400">*/}
                  {/*  {adminNotifications.filter(n => !n.read).length} unread*/}
                  {/*</span>*/}
                            <Filter className="w-4 h-4 text-slate-400" />
                        </div>
                    </div>

                    <div className="grid gap-4">
                        {notifications?.map((notification) => (
                                // className={`bg-slate-800/50 border-l-4 p-4 rounded-r-lg transition-all hover:bg-slate-800/70 border-l-blue-500 ${!notification.read ? 'bg-slate-800/80' : ''}`}
                            <div
                                key={notification.id}
                                className={`bg-slate-800/50 border-l-4 p-4 rounded-r-lg transition-all hover:bg-slate-800/70 border-l-blue-500`}
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex items-start space-x-3">
                                        {getNotificationIcon(notification.type)}
                                        <div className="flex-1">
                                            <h3 className="font-medium text-white">{notification?.title}</h3>
                                            <p className="text-slate-300 text-sm mt-1">{notification?.body}</p>
                                            <span className="text-xs text-slate-500 mt-2 block">{notification?.data?.toString()}</span>
                                        </div>
                                    </div>
                                    {/*{!notification.read && (*/}
                                    {/*    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>*/}
                                    {/*)}*/}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    )
}