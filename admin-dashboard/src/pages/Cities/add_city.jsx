import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import AddMedia from "../../features/all/components/Add/add_media.jsx";
import AddHeader from "../../features/all/components/Add/add_header.jsx";
import Info from "../../features/cities/components/add/info.jsx"
import Description from "../../features/cities/components/add/description.jsx"
import Language from "../../features/cities/components/add/language.jsx"
import SubmitButton from "../../features/all/components/Add/submit_button.jsx";
import {useSelector,useDispatch} from "react-redux";
import {updateFields,add_emptyMedia,Submit} from '../../features/cities/hook/addCitySlice.jsx'
import {AddCityService} from '../../features/cities/api/addCityService.jsx'
import {getIdsService} from "../../features/all/api/getIdsService.jsx";
export default function AddCity() {
    const navigate = useNavigate();
    const formData=useSelector(state=>state.AddCity);
    const [Files,setFiles] = useState({images:[],videos:[]});
    const dispatch=useDispatch();
    const {languages}=useSelector(state=>state.getIds);
    useEffect(() => {
        dispatch(getIdsService())
    }, []);
    const countries = {
        'afghanistan': 1,
        'albania': 2,
        'algeria': 3,
        'america-samoa': 4,
        'andorra': 5,
        'angola': 6,
        'anguilla': 7,
        'antarctica': 8,
        'antigua-and-barbuda': 9,
        'argentina': 10,
        'armenia': 11,
        'aruba': 12,
        'australia': 13,
        'austria': 14,
        'azerbaijan': 15,
        'bahamas': 16,
        'bahrain': 17,
        'bangladesh': 18,
        'barbados': 19,
        'belarus': 20,
        'belgium': 21,
        'belize': 22,
        'benin': 23,
        'bermuda': 24,
        'bhutan': 25
    };

    const handleInputChange = (field, value) => {
        dispatch(updateFields({field,value}));
    };
    const handleFilesChange=(type) => {
        if(Files.images.length===0&&type!=='add') {
            dispatch(add_emptyMedia({type:'empty'}))
        }
        else{
          dispatch(add_emptyMedia({type:'add'}))
        }
    }
    const handleSubmit = async () => {
        handleFilesChange('check')
        dispatch(Submit())
        const result=await dispatch(AddCityService(Files))
        if(result.type==='AddCityService/fulfilled')
        {
            alert('city successfully added');
            setFiles({images:[],videos:[]})
            //هون بضيف الnavigate فيما بعد
        }
        else {
            alert('Problem happened ');
        }
    };
    return (
        <div className="relative min-h-screen bg-[#0b1520] -m-6 p-6">
            {/* Enhanced background effects */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-teal-900/30 via-slate-800/10 to-transparent"></div>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-slate-800/40 via-transparent to-transparent"></div>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-teal-900/5 to-transparent"></div>
            <div className="relative z-10 max-w-4xl mx-auto">
                <AddHeader path={'/dashboard/cities'} title={'Add New City'} description={'add city info and media'} handleSubmit={handleSubmit} buttonText={'Add the city'} />
                <div className="space-y-8">
                    <Info handleInputChange={handleInputChange} countries={countries} formData={formData}></Info>

                    <Description handleInputChange={handleInputChange} formData={formData}/>

                    <Language languages={languages} handleInputChange={handleInputChange} formData={formData}/>

                    <AddMedia formData={formData} addMedia={handleFilesChange} Files={Files} setFiles={setFiles} />

                    {/* Submit Button */}
                    <div className="flex justify-center">
                        <SubmitButton handleSubmit={handleSubmit} formData={formData} text="Add the city" big={true} />
                    </div>
                </div>
            </div>
        </div>
    );
}