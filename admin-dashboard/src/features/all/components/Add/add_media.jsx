import {Image, Upload, Video, X} from "lucide-react";
import React from "react";
import {useState} from "react";

export default function AddMedia({formData,addMedia,Files,setFiles}){
    const [uploadType, setUploadType] = useState('images');
    const [dragOver, setDragOver] = useState(false);

    const handleFileUpload = (files, type) => {
        const newFiles = Array.from(files).map(file => ({
            id: Date.now() + Math.random(),
            File:file,
            name: file.name,
            url: URL.createObjectURL(file),
            type: file.type
        }));

        setFiles(prev => ({
            ...prev,
            [type]: [...prev[type], ...newFiles]
        }));
        addMedia('add')
    };

    const removeFile = (fileId, type) => {
        setFiles(prev => ({
            ...prev,
            [type]: prev[type].filter(file => file.id !== fileId)
        }));
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setDragOver(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setDragOver(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragOver(false);
        const files = e.dataTransfer.files;
        handleFileUpload(files, uploadType);
    };
    return(
    <div className="bg-gradient-to-br from-slate-800/60 to-slate-900/80 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 shadow-2xl">
        <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-xl bg-teal-600/20 border border-teal-500/30">
                <Upload size={24} className="text-teal-400" />
            </div>
            <h2 className="text-2xl font-bold text-white">Media</h2>
        </div>

        {/* Upload Type Selector */}
        <div className="flex gap-4 mb-6">
            <button
                type="button"
                onClick={() => setUploadType('images')}
                className={`
                                    flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold transition-all duration-300
                                    ${uploadType === 'images'
                    ? 'bg-gradient-to-r from-teal-600 to-teal-700 text-white shadow-lg shadow-teal-500/20'
                    : 'bg-slate-800/60 text-slate-300 hover:text-white border border-slate-600/50'
                }
                                `}
            >
                <Image size={18} />
                Photos
            </button>
            <button
                type="button"
                onClick={() => setUploadType('videos')}
                className={`
                                    flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold transition-all duration-300
                                    ${uploadType === 'videos'
                    ? 'bg-gradient-to-r from-teal-600 to-teal-700 text-white shadow-lg shadow-teal-500/20'
                    : 'bg-slate-800/60 text-slate-300 hover:text-white border border-slate-600/50'
                }
                                `}
            >
                <Video size={18} />
                Videos
            </button>
        </div>

        {/* Drag and Drop Area */}
        <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`
                                relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300
                                ${dragOver
                ? 'border-teal-500 bg-teal-900/20'
                : 'border-slate-600/50 hover:border-teal-500/50'
            }
                            `}
        >
            <div className="flex flex-col items-center gap-4">
                <div className="p-4 rounded-full bg-slate-800/60">
                    {uploadType === 'images' ? (
                        <Image size={32} className="text-teal-400" />
                    ) : (
                        <Video size={32} className="text-teal-400" />
                    )}
                </div>
                <div>
                    <p className="text-white font-semibold text-lg mb-2">
                        Drag and Drop {uploadType === 'images' ? 'Photos' : 'Videos'} هنا
                    </p>
                    <p className="text-slate-400">or click to select fiels</p>
                </div>
                <input
                    type="file"
                    multiple
                    accept={uploadType === 'images' ? 'image/*' : 'video/*'}
                    onChange={(e) => handleFileUpload(e.target.files, uploadType)}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
            </div>
        </div>

        {/* Uploaded Files Display */}
        {(Files.images.length > 0 || Files.videos.length > 0) && (
            <div className="mt-8 space-y-6">
                {/* Images */}
                {Files.images.length > 0 && (
                    <div>
                        <h3 className="text-white font-semibold text-lg mb-4 flex items-center gap-2">
                            <Image size={20} className="text-teal-400" />
                            Photos ({Files.images.length})
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {Files.images.map(image => (
                                <div key={image.id} className="relative group">
                                    <img
                                        src={image.url}
                                        alt={image.name}
                                        className="w-full h-32 object-cover rounded-xl border-2 border-slate-600/50 group-hover:border-teal-500/50 transition-colors duration-300"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeFile(image.id, 'images')}
                                        className="absolute top-2 right-2 p-1 bg-red-600 hover:bg-red-700 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
                                    >
                                        <X size={16} />
                                    </button>
                                    <div className="absolute bottom-2 left-2 right-2 bg-black/60 backdrop-blur-sm text-white text-xs p-1 rounded truncate">
                                        {image.name}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Videos */}
                {Files.videos.length > 0 && (
                    <div>
                        <h3 className="text-white font-semibold text-lg mb-4 flex items-center gap-2">
                            <Video size={20} className="text-teal-400" />
                            Videos ({Files.videos.length})
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {Files.videos.map(video => (
                                <div key={video.id} className="relative group">
                                    <video
                                        src={video.url}
                                        className="w-full h-48 object-cover rounded-xl border-2 border-slate-600/50 group-hover:border-teal-500/50 transition-colors duration-300"
                                        controls
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeFile(video.id, 'videos')}
                                        className="absolute top-2 right-2 p-1 bg-red-600 hover:bg-red-700 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
                                    >
                                        <X size={16} />
                                    </button>
                                    <div className="absolute bottom-2 left-2 right-2 bg-black/60 backdrop-blur-sm text-white text-xs p-1 rounded truncate">
                                        {video.name}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        )}
        {formData?.errors?.media&& <p className="text-red-500 text-sm ml-3 ">Should add one Image at least</p>}
    </div>
    )
}