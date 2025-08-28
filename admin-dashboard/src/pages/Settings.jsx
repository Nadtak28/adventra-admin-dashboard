import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Edit2, Plus } from 'lucide-react';
import CategoryForm from '../features/settings/components/addCategory.jsx'
import LanguageForm from '../features/settings/components/addLanguage.jsx'
import Modal from '../features/settings/components/modal.jsx'
import {getIdsService} from "../features/all/api/getIdsService.jsx";
import {updateCategoryService} from "../features/settings/api/updateCategoryService.jsx";
import {updateLanguageService} from "../features/settings/api/updateLanguageService.jsx";
const Settings = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getIdsService())
    }, []);
    const {categories,languages} = useSelector(state => state.getIds)
    const [showCategoryModal, setShowCategoryModal] = useState(false);
    const [showLanguageModal, setShowLanguageModal] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);
    const [editingLanguage, setEditingLanguage] = useState(null);

    const handleAddCategory = () => {
        setEditingCategory(null);
        setShowCategoryModal(true);
    };

    const handleEditCategory = async(category) => {
        setEditingCategory(category);
        setShowCategoryModal(true);
        dispatch(getIdsService())
    };

    const handleAddLanguage = () => {
        setEditingLanguage(null);
        setShowLanguageModal(true);
    };

    const handleEditLanguage = (language) => {
        setEditingLanguage(language);
        setShowLanguageModal(true);
    };

    const submitEditCategory = async (category) => {
        const result=await dispatch(updateCategoryService({id: category.id, name: category.name}));
        if(result.type==='updateCategoryService/fulfilled')
        {
            alert('Category Updated Successfully');
        }
        else {
            alert('Category with this name is already exist');
        }
    }
    const submitEditLanguage = async (language) => {
        const result=await dispatch(updateLanguageService({id: language.id, name: language.name}));
        console.log(result);
        if(result.type==='updateLanguageService/fulfilled')
        {
            alert('Language Updated Successfully');
        }
        else {
            alert('Language with this name is already exist');
        }
    }

    return (
        <div className="relative space-y-6 bg-[#0b1520] min-h-screen -m-6 p-6 -mx-6">
            <div className="max-w-6xl mx-auto space-y-8">
                {/* Categories Table */}
                <div className="bg-[#1a2332] rounded-lg shadow-lg overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-700 flex justify-between items-center">
                        <h2 className="text-xl font-semibold text-white">Categories</h2>
                        <button
                            onClick={handleAddCategory}
                            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
                        >
                            <Plus size={20} />
                            Add Category
                        </button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-[#0f1923]">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                    ID
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                    Name
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-700">
                            {categories.map((category) => (
                                <tr key={category.id} className="hover:bg-[#0f1923] transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                        {category.id}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                                        {category.name}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <button
                                            onClick={() => handleEditCategory(category)}
                                            className="flex items-center gap-1 text-blue-400 hover:text-blue-300 transition-colors"
                                        >
                                            <Edit2 size={16} />
                                            Edit
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Languages Table */}
                <div className="bg-[#1a2332] rounded-lg shadow-lg overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-700 flex justify-between items-center">
                        <h2 className="text-xl font-semibold text-white">Languages</h2>
                        <button
                            onClick={handleAddLanguage}
                            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors"
                        >
                            <Plus size={20} />
                            Add Language
                        </button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-[#0f1923]">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                    ID
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                    Name
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-700">
                            {languages.map((language) => (
                                <tr key={language.id} className="hover:bg-[#0f1923] transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                        {language.id}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                                        {language.name}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <button
                                            onClick={() => handleEditLanguage(language)}
                                            className="flex items-center gap-1 text-green-400 hover:text-green-300 transition-colors"
                                        >
                                            <Edit2 size={16} />
                                            Edit
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Category Modal */}
            <Modal
                isOpen={showCategoryModal}
                onClose={() => setShowCategoryModal(false)}
                title={editingCategory ? 'Edit Category' : 'Add New Category'}
            >
                <CategoryForm editingCategory={editingCategory} setShowCategoryModal={setShowCategoryModal} submitEdit={submitEditCategory}/>
            </Modal>

            {/* Language Modal */}
            <Modal
                isOpen={showLanguageModal}
                onClose={() => setShowLanguageModal(false)}
                title={editingLanguage ? 'Edit Language' : 'Add New Language'}
            >
                <LanguageForm editingLanguage={editingLanguage} setShowLanguageModal={setShowLanguageModal} submitEdit={submitEditLanguage}/>
            </Modal>
        </div>
    );
};

export default Settings;