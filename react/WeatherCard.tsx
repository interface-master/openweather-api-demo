import './WeatherCard.css';

export interface IWeatherCard {
    description: string;
    temp: string;
    feels_like: string;
    temp_min: string;
    temp_max: string;
    icon: string;
}

function WeatherCard({data}: {data: IWeatherCard}) {
    return (
        <div className='row weatherCard'>
            <div className='col'>
                <div className='row'>
                    <div className='temp'>{data.temp}<span>&deg;</span></div>
                    <div className='icon'>
                        <img src={`https://openweathermap.org/img/wn/${data.icon}@2x.png`} alt={data.description} />
                    </div>
                </div>
                <div className='row highAndLow'>
                    <span>High: {data.temp_max}&deg;</span>
                    <span className='spacer'>·</span>
                    <span>Low: {data.temp_min}&deg;</span>
                </div>
            </div>
            <div className='col'>
                <div className='description'>{data.description}</div>
                <div className=''>Feels like {data.feels_like}&deg;</div>
            </div>
        </div>
    )
}

export default WeatherCard;