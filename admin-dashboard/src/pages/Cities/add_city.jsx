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
    const countries = {"afghanistan":1,"albania":2,"algeria":3,"america-samoa":4,"andorra":5,"angola":6,"anguilla":7,"antarctica":8,"antigua-and-barbuda":9,"argentina":10,"armenia":11,"aruba":12,"australia":13,"austria":14,"azerbaijan":15,"bahamas":16,"bahrain":17,"bangladesh":18,"barbados":19,"belarus":20,"belgium":21,"belize":22,"benin":23,"bermuda":24,"bhutan":25,"bolivia":26,"bosnia-and-herzegovina":27,"botswana":28,"brazil":29,"brunei-darussalam":30,"bulgaria":31,"burkina-fas":32,"burundi":33,"cambodia":34,"cameroon":35,"canada":36,"cape-verde":37,"cayman_islands":38,"center-african-republic":39,"chad":40,"chile":41,"china":42,"christmas-island":43,"cocos-islands":44,"colombia":45,"comoros":46,"congo":47,"cook-islands":48,"costa-rica":49,"cote-de-ivoire":50,"croatia":51,"cuba":52,"cyprus":53,"czech":54,"denmark":55,"djibouti":56,"dominica":57,"dominican":58,"east-timor":59,"ecuador":60,"egypt":61,"el-salvador":62,"equatorial-guinea":63,"eritrea":64,"estonia":65,"ethiopia":66,"falkland-islands":67,"faroe-islands":68,"fiji":69,"finland":70,"france":71,"gabon":72,"the-gambia":73,"georgia":74,"germany":75,"ghana":76,"gibraltar":77,"greece":78,"greenland":79,"grenada":80,"guadeloupe":81,"guam":82,"guatemala":83,"guinea":84,"guinea-bissau":85,"guyana":86,"haiti":87,"holy-see":88,"honduras":89,"hong-kong":90,"hungary":91,"island":92,"india":93,"indonesia":94,"iran":95,"iraq":96,"ireland":97,"italy":98,"ivory-coast":99,"jamaica":100,"japan":101,"jordan":102,"kazakhstan":103,"kenya":104,"kiribati":105,"north-korea":106,"south-korea":107,"kosovo":108,"kuwait":109,"kyrgyzstan":110,"lao-people":111,"latvia":112,"lebanon":113,"lesotho":114,"liberia":115,"libya":116,"liechtenstein":117,"lithuania":118,"luxembourg":119,"macau":120,"madagascar":121,"malawi":122,"malaysia":123,"maldives":124,"mali":125,"malta":126,"marshall-islands":127,"martinique":128,"mauritania":129,"mauritius":130,"mexico":131,"micronesia":132,"moldova":133,"monaco":134,"mongolia":135,"montenegro":136,"montserrat":137,"morocco":138,"mozambique":139,"myanmar":140,"namibia":141,"nauru":142,"nepal":143,"netherlands":144,"new-caledonia":145,"new-zealand":146,"nicaragua":147,"niger":148,"nigeria":149,"niue":150,"north-macedonia":151,"northern-mariana-islands":152,"norway":153,"oman":154,"pakistan":155,"palau":156,"palestine":157,"panama":158,"papua-new-guinea":159,"paraguay":160,"peru":161,"philippines":162,"pitcairn-islands":163,"poland":164,"portugal":165,"puerto-rico":166,"qatar":167,"reunion-island":168,"romania":169,"russia":170,"rwanda":171,"saint-kitts-and-nevis":172,"saint lucia":173,"samoa":174,"san-marino":175,"saudi-arabia":176,"senegal":177,"serbia":178,"seychelles":179,"sierra-leone":180,"singapore":181,"slovakia":182,"slovenia":183,"solomon-islands":184,"somali":185,"south-africa":186,"south-sudan":187,"spain":188,"sri-lanka":189,"sudan":190,"suriname":191,"swaziland":192,"sweden":193,"switzerland":194,"syria":195,"taiwan":196,"tajikistan":197,"tanzania":198,"thailand":199,"tibet":200,"timer-lest":201,"togo":202,"tokelau":203,"tonga":204,"trinidad-and-tobago":205,"tunisia":206,"turkey":207,"turkmenistan":208,"turks-and-caicos-islands":209,"tuvalu":210,"uganda":211,"ukraine":212,"uae":213,"uk":214,"usa":215,"uruguay":216,"uzbekistan":217,"vanuatu":218,"venezuela":219,"vietnam":220,"virgin-islands":221,"wallis-and-futuna-islands":222,"yemen":223,"zambia":224,"zimbabwe":225}

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
            alert('Wrong Input');
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