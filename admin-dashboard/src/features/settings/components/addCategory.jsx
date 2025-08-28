import React, {useState} from "react";
import {addCategoryService} from "../api/addCategoryService.jsx";
import {getIdsService} from "../../all/api/getIdsService.jsx";
import {useDispatch} from "react-redux";
import {addLanguageService} from "../api/addLanguageService.jsx";

const CategoryForm = ({editingCategory,setShowCategoryModal,submitEdit}) => {
    const [name, setName] = useState(editingCategory?.name || '');
    const dispatch = useDispatch();
    const handleSubmit =async () => {
        if (!name.trim()) return;
        if(editingCategory==null){
            const result =await dispatch(addCategoryService({name}));
            if(result.type==='addCategoryService/fulfilled')
            {
                alert('Category successfully added');
                //هون بضيف الnavigate فيما بعد
            }
            else {
                alert('Category already Exist');
            }
        }else{
            const updatedInfo={id:editingCategory.id,name:name,};
            submitEdit(updatedInfo)
        }
        dispatch(getIdsService())
        setShowCategoryModal(false);
        setName('');
    };

    return (
        <div className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                    Category Name
                </label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 bg-[#0b1520] border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter category name"
                    onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
                />
            </div>
            <div className="flex gap-3 pt-2">
                <button
                    onClick={handleSubmit}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors"
                >
                    {editingCategory ? 'Update' : 'Add'}
                </button>
                <button
                    onClick={() => setShowCategoryModal(false)}
                    className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-md transition-colors"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};
export default CategoryForm;