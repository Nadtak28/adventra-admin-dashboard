import {ArrowLeft, Eye} from "lucide-react";
import React from "react";
import {useNavigate} from "react-router-dom";
import SubmitButton from "../../../all/components/Add/submit_button.jsx";
import {Button} from "@mui/material";
export default function AddHeader({path,title,description,handleSubmit,buttonText}) {
    const navigate = useNavigate();
    return (
        <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
                <button className="group flex items-center justify-center w-12 h-12 rounded-2xl bg-slate-800/80 backdrop-blur-sm border border-slate-700/50 hover:border-teal-500/50 text-slate-400 hover:text-white transition-all duration-300 hover:scale-105"
                        onClick={()=>{navigate(path)}}>
                    <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform duration-300" />
                </button>
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">{title}</h1>
                    <p className="text-slate-400">{description}</p>
                </div>
            </div>

            <div className="flex gap-3">
                <button className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-slate-800/80 backdrop-blur-sm border border-slate-700/50 hover:border-slate-600/70 text-slate-300 hover:text-white transition-all duration-300 hover:scale-105">
                    <Eye size={18} />
                    View
                </button>
                <SubmitButton handleSubmit={handleSubmit} text={buttonText} big={false}/>
            </div>
        </div>
    )
}