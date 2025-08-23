import React from "react";

const SectionHeader = ({ title, icon: Icon, gradient }) => (
    <div className="flex items-center gap-3 px-4 pb-4 pt-6">
        <div className={`p-3 rounded-xl bg-gradient-to-r ${gradient} shadow-lg`}>
            <Icon size={20} className="text-white" />
        </div>
        <h2 className="text-white text-xl font-bold leading-tight tracking-tight">
            {title}
        </h2>
    </div>
);
export default SectionHeader;