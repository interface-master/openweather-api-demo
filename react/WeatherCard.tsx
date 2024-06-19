import './WeatherCard.css';

export interface IWeatherCard {
    dt: number;
    main: string;
    description: string;
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    icon: string;
}

function WeatherCard({data}: {data: IWeatherCard}) {
    return (
        <div className='row weatherCard'>
            <div className='col'>
                <div className='row'>
                    <div className='temp' data-testid='temp'>{data.temp}<span>&deg;</span></div>
                    <div className='icon' data-testid='icon'>
                        <img src={`https://openweathermap.org/img/wn/${data.icon}@2x.png`} alt={data.description} />
                    </div>
                </div>
                <div className='row highAndLow'>
                    <span data-testid='high'>High: {data.temp_max}&deg;</span>
                    <span className='spacer'>·</span>
                    <span data-testid='low'>Low: {data.temp_min}&deg;</span>
                </div>
            </div>
            <div className='col'>
                <div className='main' data-testid='main'>{data.main}</div>
                <div className='feels' data-testid='feels'>Feels like {data.feels_like}&deg;</div>
            </div>
        </div>
    )
}

export default WeatherCard;