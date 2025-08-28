import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {addLanguageService} from "../api/addLanguageService.jsx";
import {getIdsService} from "../../all/api/getIdsService.jsx";
const LanguageForm = ({editingLanguage,setShowLanguageModal,submitEdit}) => {
    const [name, setName] = useState(editingLanguage?.name || '');
    const dispatch = useDispatch();
    const handleSubmit = async() => {
        if (!name.trim()) return;
        if(editingLanguage==null){
            const result=await dispatch(addLanguageService({name}));
            if(result.type==='addLanguageService/fulfilled')
            {
                alert('Language successfully added');
                //هون بضيف الnavigate فيما بعد
            }
            else {
                alert('Language already Exist');
            }
        }else{
            const updatedInfo={id:editingLanguage.id,name:name,};
            submitEdit(updatedInfo)
        }
        dispatch(getIdsService())
        setShowLanguageModal(false);
        setName('');
    };

    return (
        <div className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                    Language Name
                </label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 bg-[#0b1520] border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter language name"
                    onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
                />
            </div>
            <div className="flex gap-3 pt-2">
                <button
                    onClick={handleSubmit}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md transition-colors"
                >
                    {editingLanguage ? 'Update' : 'Add'}
                </button>
                <button
                    onClick={() => setShowLanguageModal(false)}
                    className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-md transition-colors"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};
export default LanguageForm