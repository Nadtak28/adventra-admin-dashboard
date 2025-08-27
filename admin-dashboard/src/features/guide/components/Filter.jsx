import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {filterService} from "../../all/api/filterService.jsx";
import SearchBar from "../components/filter/searchBar.jsx";
import FilterSection from "../components/filter/filterSection.jsx";
import SearchResult from "../components/filter/searchResult.jsx";
export default function GuideFilters({isLoading,nav}){
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCities, setSelectedCities] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedLanguages, setSelectedLanguages] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState('active');
    const [sortBy, setSortBy] = useState('name');

    const dispatch = useDispatch();

    useEffect(() => {
        go()
    }, [
        searchTerm,
        selectedCities,
        selectedCategories,
        selectedLanguages,
        selectedStatus,
        sortBy,
        dispatch
    ]);

    const go = () => {
        if (
            searchTerm ||
            selectedCities.length ||
            selectedCategories.length ||
            selectedLanguages.length ||
            selectedStatus
        ) {
            dispatch(filterService({
                type: 'guide',
                contains: searchTerm || undefined,
                cities: selectedCities.length ? selectedCities : undefined,
                categories: selectedCategories.length ? selectedCategories : undefined,
                languages: selectedLanguages.length ? selectedLanguages : undefined,
                status: selectedStatus,
                orderBy: sortBy || undefined
            }));
        }
    }

    const clearAllFilters = () => {
        setSearchTerm('');
        setSelectedCities([]);
        setSelectedCategories([]);
        setSelectedLanguages([]);
        setSelectedStatus('active');
    };


    return (
        <div className="px-4 py-6 space-y-6">
            {/* Search Bar */}
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} go={go} />

            {/* Filter Section */}
            <FilterSection selectedCities={selectedCities} setSelectedCities={setSelectedCities} clearAllFilters={clearAllFilters} selectedCategories={selectedCategories} selectedLanguages={selectedLanguages} selectedStatus={selectedStatus} setSelectedCategories={setSelectedCategories} setSelectedLanguages={setSelectedLanguages} setSelectedStatus={setSelectedStatus} />

            {/* Search Results */}
            <SearchResult nav={nav} isLoading={isLoading} searchTerm={searchTerm} selectedLanguages={selectedLanguages} selectedStatus={selectedStatus} selectedCategories={selectedCategories} selectedCities={selectedCities} sortBy={sortBy} setSortBy={setSortBy} clearAllFilters={clearAllFilters}/>
        </div>
    );
}