import {Globe, MapPin, Search, Star, Filter, X, Calendar, Users, Clock, Tag} from "lucide-react";
import React, {useEffect, useState,forwardRef,useImperativeHandle} from "react";
import {useDispatch, useSelector} from "react-redux";
import {filterService} from "../../../all/api/filterService.jsx";
import SearchBarANDSelector from "../filter/searchBar_Selector.jsx";
import FilterSection from "../filter/filterSection.jsx";
import SearchResult from "../filter/searchResult.jsx";
    const EventsToursFilters=forwardRef((props, ref)=>
    {
    const {data,isLoading} = useSelector((state) => state.Events_GTS);
    // const {searchType,searchTerm,selectedCities,selectedCategories,selectedLanguages,selectedStatus,hasOffer,sortBy,order_type} = useSelector((state) => state.Events_GTS.search);
    const [searchType, setSearchType] = useState('event'); // 'events' or 'group_tours'
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCities, setSelectedCities] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedLanguages, setSelectedLanguages] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState('active');
    const [hasOffer, setHasOffer] = useState("0");
    const [sortBy, setSortBy] = useState('name');
    const [order_type,setOrder]=useState('DESC');

    const dispatch = useDispatch();
    useEffect(() => {
        clearAllFilters()
    }, [searchType]);
    useEffect(() => {
        setTimeout(()=>{
            go()
            },1000)
    }, [
        searchType,
        searchTerm,
        selectedCities,
        selectedCategories,
        selectedLanguages,
        selectedStatus,
        hasOffer,
        sortBy,
        order_type
    ]);

    const go = () => {
        const payload = {
            type: searchType,
            contains: searchTerm || undefined,
            cities: selectedCities.length ? selectedCities : undefined,
            categories: selectedCategories.length ? selectedCategories : undefined,
            languages: selectedLanguages.length ? selectedLanguages : undefined,
            status: selectedStatus,
            only_offer: hasOffer ,
            orderBy: sortBy || undefined,
            order_type:order_type
        };

        dispatch(filterService(payload));
    }

    const clearAllFilters = () => {
        setSearchTerm('');
        setSelectedCities([]);
        setSelectedCategories([]);
        setSelectedLanguages([]);
        if(sortBy!=='ending_date')
        searchType === 'event'?setSelectedStatus('active'):setSelectedStatus('pending');
        setHasOffer('0');

    };


    //view More

    const MoreTopRatedTours = () => {
    setSearchType('group_trip')
    setSelectedStatus('finished')
    setSortBy('rating')
    setOrder("DESC")
        setTimeout(() => {
            window.scrollTo({ top: 750, behavior: 'smooth' });
        }, 100);
    }
    const MoreUpcomingGroupTrips=()=>{
        setSearchType('group_trip')
        setSelectedStatus('pending')
        setSortBy('starting_date')
        setOrder('ASC')
        setTimeout(() => {
            window.scrollTo({ top: 750, behavior: 'smooth' });
        }, 100);
    }
    const RecentGroupTrips=()=>{
        setSearchType('group_trip')
        setSelectedStatus('finished')
        setSortBy('ending_date')
        setOrder('ASC')
        setTimeout(() => {
            window.scrollTo({ top: 750, behavior: 'smooth' });
        }, 100);
    }
    const Events=()=>{
        setSearchType('event')
        setSelectedStatus('all')
        setSortBy('rating')
        setOrder('DESC')
        setTimeout(() => {
            window.scrollTo({ top: 750, behavior: 'smooth' });
        }, 100);
    }



    useImperativeHandle(ref,()=>({
        MoreTopRatedTours:MoreTopRatedTours,
        MoreUpcomingGroupTrips:MoreUpcomingGroupTrips,
        RecentGroupTrips:RecentGroupTrips,
        Events:Events
    }))

    return (
        <div className="px-4 py-6 space-y-6">
            <SearchBarANDSelector searchTerm={searchTerm} setSearchTerm={setSearchTerm} setSelectedStatus={setSelectedStatus} searchType={searchType} setSearchType={setSearchType} go={go} />

            {/* Filter Section */}
            <FilterSection
                selectedCities={selectedCities}
                setSelectedCities={setSelectedCities}
                selectedStatus={selectedStatus}
                setSelectedStatus={setSelectedStatus}
                selectedLanguages={selectedLanguages}
                setSelectedLanguages={setSelectedLanguages}
                selectedCategories={selectedCategories}
                setSelectedCategories={setSelectedCategories}
                clearAllFilters={clearAllFilters}
                searchType={searchType}
                setSearchType={setSearchType}
                hasOffer={hasOffer}
                setHasOffer={setHasOffer}
                order_type={order_type}
                setOrder={setOrder}
            />

            {/* Search Results */}

            <SearchResult
                data={data}
                searchTerm={searchTerm}
                selectedCities={selectedCities}
                selectedCategories={selectedCategories}
                selectedLanguages={selectedLanguages}
                selectedStatus={selectedStatus}
                sortBy={sortBy}
                setSortBy={setSortBy}
                clearAllFilters={clearAllFilters}
                hasOffer={hasOffer}
                searchType={searchType}
                isLoading={isLoading}
            />
        </div>
    );

    })
export default EventsToursFilters