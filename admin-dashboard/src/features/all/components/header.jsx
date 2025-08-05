import React from "react";
import {Globe} from "lucide-react";

export default function Header({title,description}){
    return (
        <div>
            <h1 className="text-white tracking-tight text-4xl font-bold leading-tight bg-gradient-to-r from-white via-teal-200 to-teal-400 bg-clip-text text-transparent">
                {title}
            </h1>
            <p className="text-slate-400 text-sm mt-2 flex items-center gap-2">
                <Globe size={16} className="text-teal-400" />
                {description}
            </p>
        </div>
    )
}