import {Save} from "lucide-react";
import React from "react";
import CircularProgress from '@mui/material/CircularProgress';
export default function SubmitButton({formData,handleSubmit,text,big}) {
    const isLoading = formData?.isLoading ?? false;
    return (<div>
        {!isLoading?(<button
                disabled={isLoading}
                onClick={handleSubmit}
                className={big?"group flex items-center gap-4 px-14 py-6 rounded-2xl bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-500 hover:to-teal-600 text-white font-bold text-lg shadow-2xl shadow-teal-500/30 hover:shadow-teal-500/50 transition-all duration-300 hover:scale-105"
                    :"group flex items-center gap-2 px-8 py-3 rounded-2xl bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-500 hover:to-teal-600 text-white font-semibold shadow-xl shadow-teal-500/25 hover:shadow-teal-500/40 transition-all duration-300 hover:scale-105"
                }
                >
                <Save size={18} className="group-hover:scale-110 transition-transform duration-300" />
                {text}
        </button>):
            (<div className={big?"group flex items-center gap-4 px-14 py-6 rounded-2xl bg-gradient-to-r from-teal-500 to-teal-600 font-bold text-lg shadow-2xl shadow-teal-500/30"
                    :"group flex items-center gap-2 px-8 py-3 rounded-2xl bg-gradient-to-r from-teal-500 to-teal-600 font-semibold shadow-xl shadow-teal-500/25 "
                  }>
                <CircularProgress sx={{color: "white"}}/>
                </div>
        )
        }
        </div>
    )
}