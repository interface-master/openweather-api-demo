import { ChangeEvent, ReactElement, useContext, useEffect, useRef, useState } from 'react';
import { City, ICity } from 'country-state-city';

import WrapperContext from "./Wrapper.context";

const Search = () => {
    const { city, setCity } = useContext(WrapperContext);
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
                console.log('filtered:',filtered);
                setFilteredCities(filtered);
            } else {
                setFilteredCities([]);
            }
        }, 250);
    }

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        console.log('setting search term',event.target.value);
        setSearchTerm(event.target.value);
        debounceSearch(event.target.value);
    }

    const handleCitySelected = (selection: ICity) => {
        setCity(selection);
        setSearchTerm('');
        setFilteredCities([]);
    }

    const getFilteredCities = () => {
        console.log('getting filteredCities',filteredCities);
        return filteredCities.map((c,idx) => {
            if (idx < 10) {
                return (<li key={idx} onClick={() => handleCitySelected(c)}>
                    {c.name}, {c.stateCode}, {c.countryCode}
                </li>);
            }
        });
    }

    return (
        <div className='typeahead'>
            <h1>Search</h1>
            <input
                type='text'
                value={searchTerm}
                onChange={handleInputChange}
                placeholder='Search for any City...'
            />
            {filteredCities.length > 0 && (
                <ul className='suggestions'>
                    {getFilteredCities()}
                </ul>
            )}
            
            <div>Selected City: `{city?.name}`</div>
        </div>
    )
}

export default Search;