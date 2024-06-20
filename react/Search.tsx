import React from 'react';
import { ChangeEvent, useRef, useState } from 'react';
import { City, ICity } from 'country-state-city';

import WrapperContext from "./Wrapper.context";

import './Search.css';

const Search = () => {
    const { city, setCity } = React.useContext(WrapperContext);
    const [ searchTerm, setSearchTerm ] = useState('' as string);
    const [ filteredCities, setFilteredCities ] = useState([] as ICity[]);
    const timeoutRef = useRef(undefined as NodeJS.Timeout | undefined);
    const cities = City.getAllCities();
    
    const debounceSearch = (searchTerm: string) => {
        clearTimeout(timeoutRef.current);

        timeoutRef.current = setTimeout(() => {
            if (searchTerm) {
                const filtered = cities.filter(c => 
                    c.name.toLowerCase().includes(searchTerm.toLowerCase())
                );
                setFilteredCities(filtered);
            } else {
                setFilteredCities([]);
            }
        }, 250);
    }

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
        debounceSearch(event.target.value);
    }

    const handleCitySelected = (selection: ICity) => {
        setCity(selection);
        setSearchTerm('');
        setFilteredCities([]);
    }

    const getFilteredCities = () => {
        return filteredCities.map((c,idx) => {
            if (idx < 10) {
                return (<li key={idx} onClick={() => handleCitySelected(c)}>
                    {c.name}, {c.stateCode}, {c.countryCode}
                </li>);
            }
        });
    }

    return (
        <div className='typeahead insetWrapper'>
            <h1>Search</h1>
            
            <input
                type='text'
                value={searchTerm}
                onChange={handleInputChange}
                placeholder='Search for any City...'
            />
            
            {city && (
                <div className='selected'>
                    Selected City: <em>{city?.name}</em>
                </div>
            )}
            
            {filteredCities.length > 0 && (
                <ul className='suggestions'>
                    {getFilteredCities()}
                </ul>
            )}
        </div>
    )
}

export default Search;