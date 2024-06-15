import WeatherCard, { IWeatherCard } from "./WeatherCard"

import './WeatherCardCompact.css';

function WeatherCardCompact({data}: {data: IWeatherCard}) {
    return (
        <div className='col weatherCardCompact'>
            <div className='row'>
                <div className='temp'>{data.temp}<span>&deg;</span></div>
                <div className='feels'>({data.feels_like}&deg;)</div>
            </div>
            <div className='icon'>
                <img src={`https://openweathermap.org/img/wn/${data.icon}@2x.png`} alt={data.description} />
            </div>
            <div className='row highAndLow'>
                <span>{data.temp_max}&deg;</span>
                <span className='spacer'>/</span>
                <span>{data.temp_min}&deg;</span>
            </div>
        </div>
    )
}

export default WeatherCardCompact