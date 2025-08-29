import React, {useEffect, useState} from 'react';
import {Bell, Send, Users, X, Check, AlertCircle, Target} from 'lucide-react';
import AdminNotifications from "../features/notifications/components/adminNotification.jsx";
import BroadCastNotifications from "../features/notifications/components/broadcast.jsx";
import Targeted from "../features/notifications/components/targeted.jsx";
import {useDispatch, useSelector} from "react-redux";
import {publicNotifyService} from "../features/notifications/api/publicNotifyService.jsx";
import {filterService} from "../features/all/api/filterService.jsx";
import {privateNotifyService} from "../features/notifications/api/privateNotifyService.jsx";
import {getNotificationService} from "../features/notifications/api/getNotification.jsx";

const NotificationsInterface = () => {
    const dispatch = useDispatch();
    const [activeTab, setActiveTab] = useState('admin');
    const [broadcastType, setBroadcastType] = useState('user');
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [broadcastMessage, setBroadcastMessage] = useState('');
    const [targetedType, setTargetedType] = useState('user');
    const [title, setTitle] = useState('');
    const {inActiveUsers,activeUsers}=useSelector(state => state.Users);
    const {guides}=useSelector(state => state.Guides);
    const {notifications}=useSelector(state => state.Notifications);
    // Mock data for admin notifications
    const [users, setUsers] = useState([]);
    useEffect(() => {
        setUsers([...inActiveUsers, ...activeUsers]);
    },[inActiveUsers]);

    useEffect(() => {
        setSelectedUsers([]);
        setSearchTerm('');
        setTitle('');
        setTargetedMessage('')
        setBroadcastMessage('');

    }, [activeTab]);
    useEffect(() => {
        dispatch(filterService({type:'user'}))
        dispatch(filterService({type:'guide',status:'all'}))
        dispatch(getNotificationService())
    },[])
    // const adminNotifications = [
    //     {
    //         id: 1,
    //         type: 'info',
    //         title: 'System Update Complete',
    //         message: 'The system has been successfully updated to version 2.1.4',
    //         timestamp: '2 hours ago',
    //         read: false
    //     },
    //     {
    //         id: 2,
    //         type: 'warning',
    //         title: 'High Server Load',
    //         message: 'Server CPU usage is at 85%. Consider scaling resources.',
    //         timestamp: '4 hours ago',
    //         read: true
    //     },
    //     {
    //         id: 3,
    //         type: 'success',
    //         title: 'Backup Completed',
    //         message: 'Daily backup completed successfully at 03:00 AM',
    //         timestamp: '6 hours ago',
    //         read: true
    //     },
    //     {
    //         id: 4,
    //         type: 'error',
    //         title: 'Failed Login Attempts',
    //         message: 'Multiple failed login attempts detected from IP 192.168.1.100',
    //         timestamp: '8 hours ago',
    //         read: false
    //     }
    // ];
    const getNotificationIcon = (type) => {
        // switch (type) {
        //     case 'success':
        //         return <Check className="w-5 h-5 text-green-400" />;
        //     case 'warning':
        //         return <AlertCircle className="w-5 h-5 text-yellow-400" />;
        //     case 'error':
        //         return <X className="w-5 h-5 text-red-400" />;
        //     default:
        // }
                return <Bell className="w-5 h-5 text-blue-400" />;
    };

    const [targetedMessage, setTargetedMessage] = useState('');

    const toggleUserSelection = (userId) => {
        setSelectedUsers(prev =>
            prev.includes(userId)
                ? prev.filter(id => id !== userId)
                : [...prev, userId]
        );
    };

    // Clear selected users when changing type
    const handleTypeChange = (type) => {
        setTargetedType(type);
        setSelectedUsers([]);
        setSearchTerm('');
        setTitle('');
        setTargetedMessage('')
    };

    const sendBroadcast = async () => {
        const data={
            title:title,
            body:broadcastMessage,
            type:broadcastType
        }
        const result =await dispatch(publicNotifyService({data}))
        if (result.type==='publicNotifyService/fulfilled') {
            alert(`Message arrived successfully to all !${broadcastType}s`);
            setTitle('')
            setBroadcastMessage('')

        }
        else{
            alert(`Error Happened!`);
        }
    };

    const sendTargetedNotification = async () => {
        if (targetedMessage.trim() && selectedUsers.length > 0) {
            const data={
                title:title,
                body:targetedMessage,
                type:targetedType,
                ids:selectedUsers
            }
            const result =await dispatch(privateNotifyService({data}))
            if (result.type==='privateNotifyService/fulfilled') {
                alert(`Message arrived successfully to all !${targetedType}s`);
                setTitle('')
                setTargetedMessage('')
                setSelectedUsers([]);
            }
            else{
                alert(`Error Happened!`);
            }
        }
    };

    return (
        <div className="relative flex size-full min-h-screen w-auto flex-col space-y-6 bg-[#0b1520] -m-6 p-6 -mx-6 overflow-x-hidden">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white">Notifications Management</h1>
                    <p className="text-slate-400 mt-2">Manage and send notifications to users and guides</p>
                </div>
                <div className="flex items-center space-x-2 bg-slate-800/50 p-1 rounded-lg">
                    <button
                        onClick={() => setActiveTab('admin')}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                            activeTab === 'admin'
                                ? 'bg-blue-600 text-white'
                                : 'text-slate-400 hover:text-white hover:bg-slate-700'
                        }`}
                    >
                        <Bell className="w-4 h-4 inline mr-2" />
                        Admin Notifications
                    </button>
                    <button
                        onClick={() => setActiveTab('broadcast')}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                            activeTab === 'broadcast'
                                ? 'bg-blue-600 text-white'
                                : 'text-slate-400 hover:text-white hover:bg-slate-700'
                        }`}
                    >
                        <Users className="w-4 h-4 inline mr-2" />
                        Broadcast
                    </button>
                    <button
                        onClick={() => setActiveTab('targeted')}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                            activeTab === 'targeted'
                                ? 'bg-blue-600 text-white'
                                : 'text-slate-400 hover:text-white hover:bg-slate-700'
                        }`}
                    >
                        <Send className="w-4 h-4 inline mr-2" />
                        Targeted
                    </button>
                </div>
            </div>

            <AdminNotifications activeTab={activeTab} notifications={notifications} getNotificationIcon={getNotificationIcon} />

            <BroadCastNotifications setBroadcastType={setBroadcastType}
                                    activeTab={activeTab}
                                    setBroadcastMessage={setBroadcastMessage}
                                    broadcastMessage={broadcastMessage}
                                    broadcastType={broadcastType}
                                    sendBroadcast={sendBroadcast}
                                    title={title}
                                    setTitle={setTitle} />

            <Targeted setTargetedMessage={setTargetedMessage}
                      searchTerm={searchTerm}
                      setSearchTerm={setSearchTerm}
                      selectedUsers={selectedUsers}
                      sendTargetedNotification={sendTargetedNotification}
                      users={users}
                      guides={guides}
                      targetedMessage={targetedMessage}
                      toggleUserSelection={toggleUserSelection}
                      handleTypeChange={handleTypeChange}
                      targetedType={targetedType}
                      activeTab={activeTab}
                      title={title}
                      setTitle={setTitle}
            />

        </div>
    );
};

export default NotificationsInterface;