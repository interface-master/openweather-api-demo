import WrapperProvider from './Wrapper.provider';
import WrapperController from './Wrapper.controller';

import Forecast from './Forecast';
import Search from './Search';
import Weather from './Weather';

function Wrapper() {
    return (
        <WrapperProvider>
            <WrapperController>
                <Search />
                <Weather />
                <Forecast />
            </WrapperController>
        </WrapperProvider>
    )
}

export default Wrapper;