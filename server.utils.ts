// this is the shape coming from OpenWeather API
interface IWeatherAPIData {
    base: string;
    clouds: {
        all: number;
    };
    cod: number;
    coord: {
        lon: number;
        lat: number;
    };
    dt: number;
    id: number;
    main: {
        temp: number;
        feels_like: number;
        temp_min: number;
        temp_max: number;
        pressure: number;
        humidity: number;
    };
    name: string;
    sys: {
        type: number;
        id: number;
        country: string;
        sunrise: number;
        sunset: number;
    };
    timezone: number;
    visibility: number;
    weather: {
        id: number;
        main: string;
        description: string;
        icon: string;
    }[];
    wind: {
        speed: number;
        deg: number;
    };
}

interface IWeatherSnapshot {
    clouds: {
        all: number;
    };
    dt: number;
    dt_txt: string;
    main: {
        temp: number;
        feels_like: number;
        temp_min: number;
        temp_max: number;
        pressure: number;
        sea_level: number;
        grnd_level: number;
        humidity: number;
        temp_kf: number;
    };
    pop: number;
    sys: {
        pod: string;
    };
    visibility: number;
    weather: {
        id: number;
        main: string;
        description: string;
        icon: string;
    }[];
    wind: {
        speed: number;
        deg: number;
        gust: number;
    };
};

interface IForecastAPIData {
    cod: string;
    message: number;
    cnt: number;
    list: IWeatherSnapshot[];
    city: {
        id: number;
        name: string;
        coord: {
            lat: number;
            lon: number;
        };
        country: string;
        population: number;
        timezone: number;
        sunrise: number;
        sunset: number;
    };
}

interface IForecastSummaryByDate {
    [key: string]: IWeather;
}

// this is the shape we're sending to the front-end
// TODO: this is almost identical to FE IWeatherCard - refactor this
export interface IWeather {
    dt: number;
    main?: string;
    description?: string;
    temp?: number;
    feels_like?: number;
    temp_min?: number;
    temp_max?: number;
    icon?: string;
}

/**
 * Receives Weather data from the API and simplifies the return object for the UI
 * - extracts only the necessary data
 * - rounds numbers to nearest decimal
 */
export const preprocessWeather = (data:IWeatherAPIData):IWeather|undefined => {
    if (!data || !data.dt) return undefined;

    // extract
    const dt = data.dt;
    const main = data.weather[0]?.main || undefined;
    const description = data.weather[0]?.description || undefined;
    const temp = data.main?.temp || undefined;
    const feels_like = data.main?.feels_like || undefined;
    const temp_min = data.main?.temp_min || undefined;
    const temp_max = data.main?.temp_max || undefined;
    const icon = data.weather[0]?.icon || undefined;

    const response:IWeather = {
        dt,
        main,
        description,
        temp,
        feels_like,
        temp_min,
        temp_max,
        icon,
    }

    // transform
    response.temp = response.temp ? Math.round(response.temp) : undefined;
    response.feels_like = response.feels_like ? Math.round(response.feels_like) : undefined;
    response.temp_min = response.temp_min ? Math.round(response.temp_min) : undefined;
    response.temp_max = response.temp_max ? Math.round(response.temp_max) : undefined;

    // return
    return response;
}

/**
 * Receives Forecast data from the API and simplifies the return object for the UI
 * - extracts only the necessary data
 * - rolls up by day
 * - rounds numbers to nearest decimal
 */
export const preprocessForecast = (data:IForecastAPIData):IWeather[]|undefined => {
    if (!data) return undefined;

    // extract
    const filtered:IWeather[] = [];
    data.list.forEach((item:IWeatherSnapshot) => {
        if (item.dt) {
            const dt = item.dt;
            const main = item.weather[0]?.main || undefined;
            const description = item.weather[0]?.description || undefined;
            const temp = item.main?.temp || undefined;
            const feels_like = item.main?.feels_like || undefined;
            const temp_min = item.main?.temp_min || undefined;
            const temp_max = item.main?.temp_max || undefined;
            const icon = item.weather[0]?.icon || undefined;
            
            filtered.push({
                dt,
                main,
                description,
                temp,
                feels_like,
                temp_min,
                temp_max,
                icon,
            });
        }
    });

    // roll up by day
    const forecastSummary: IForecastSummaryByDate = filtered.reduce((a:IForecastSummaryByDate, c:IWeather) => {
        // parse date time
        const dtms: number = c.dt * 1000;
        // create a mm-dd key
        const key: string = new Date(dtms).getMonth() + '-' + new Date(dtms).getDate();
        // ignore if this snapshot is for the current day
        const today: string = new Date().getMonth() + '-' + new Date().getDate();
        if (key === today) return a;
        // add it to a keyed object
        if (!a[key]) {
            a[key] = c;
        }
        // summarize
        else {
            if (c.temp) {
                // @ts-ignore - even though a[key] can't possibly be null - ts complains
                a[key].temp = Math.round(a[key].temp + c.temp) / 2;
            }
            if (c.feels_like) {
                // @ts-ignore - even though a[key] can't possibly be null - ts complains
                a[key].feels_like = Math.round((a[key].feels_like + c.feels_like) / 2);
            }
            if (c.temp_min) {
                // @ts-ignore - even though a[key] can't possibly be null - ts complains
                a[key].temp_min = Math.round(Math.min(a[key].temp_min, c.temp_min));
            }
            if (c.temp_max) {
                // @ts-ignore - even though a[key] can't possibly be null - ts complains
                a[key].temp_max = Math.round(Math.max(a[key].temp_max, c.temp_max));
            }
            // TODO: we're not summarizing date/time, main, description, or icon
        }
        return a;
    }, {});

    // create output
    const forecastSummaryByDate: IWeather[] = Object.keys(forecastSummary).map((key: string) => {
        const day = new Date(new Date(forecastSummary[key].dt * 1000).setHours(12)).setMinutes(0);
        const daySummary:IWeather = {
            dt: day,
            main: forecastSummary[key].main,
            description: forecastSummary[key].description,
            temp: forecastSummary[key].temp,
            feels_like: forecastSummary[key].feels_like,
            temp_min: forecastSummary[key].temp_min,
            temp_max: forecastSummary[key].temp_max,
            icon: forecastSummary[key].icon,
        }
        return daySummary;
    });

    return forecastSummaryByDate;
}