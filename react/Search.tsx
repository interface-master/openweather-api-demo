import { useContext } from 'react';

import WrapperContext from "./Wrapper.context";

function Search() {
    const { city, setCity } = useContext(WrapperContext);

    return (
        <>
            <h1>Search</h1>
            <div>Selected City: `{city}`</div>
            <button onClick={() => setCity('Toronto')}>Toronto</button>
            <button onClick={() => setCity('Montreal')}>Montreal</button>
        </>
    )
}

export default Search;