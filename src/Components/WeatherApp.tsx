import React, { useEffect, useState } from 'react';
import sunny from '../assets/images/sunny.png';
import cloudy from '../assets/images/cloudy.png';
import rainy from '../assets/images/rainy.png';
import snowy from '../assets/images/snowy.png';
import loadingGif from '../assets/images/loading.gif';
import getForecast from '../Helper/getForecast';
import { WeatherData } from '../Helper/getForecast';

const WeatherApp: React.FC = () => {
    const [location, setLocation] = useState<string>('');
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const weatherIcons: { [key: string]: string } = {
        'Clear': sunny,
        'Clouds': cloudy,
        'Rain': rainy,
        'Snow': snowy,
        'Mist': cloudy,
        'Haze': cloudy,
        'Drizzle': rainy,
    };

    const weatherImages = weather && weather.weatherType in weatherIcons ? weatherIcons[weather.weatherType] : null;
    const backgroundImage: { [key: string]: string } = {
        'Clear': 'linear-gradient(to right, #f3b07c, #fcd283)',
        'Clouds': 'linear-gradient(to right, #57d6d4, #71eeec)',
        'Rain': 'linear-gradient(to right, #5bc8fb, #80eaff)',
        'Snow': 'linear-gradient(to right, #aff2ff, #fff)',
        'Haze': 'linear-gradient(to right, #57d6d4, #71eeec)',
        'Mist': 'linear-gradient(to right, #57d6d4, #71eeec)',
    }
    const backgroundImageStyle = weather && weather?.weatherType && backgroundImage[weather.weatherType] ? backgroundImage[weather.weatherType] : 'linear-gradient(to right, #57d6d4, #71eeec)';

    const formattedDate = new Date().toLocaleDateString('en-GB', {
        weekday: 'short',
        day: 'numeric',
        month: 'short'
    });

    useEffect(() => {
        const fetchInitialWeather = async () => {
            setLoading(true);
            setLocation('Bengaluru');
            const data = await getForecast('Bengaluru');
            if (typeof data === 'string') {
                setError(data);
                setWeather(null);
            } else {
                setWeather(data);
                setError(null);
            }
            setLocation('');
            setLoading(false);
        };

        fetchInitialWeather();
    }, []);

    const fetchWeather = async () => {
        if (location.trim() === '') {
            return;
        }
        try {
            const data = await getForecast(location);
            if(typeof data === 'string') {
                setError(data);
                setWeather(null);
                return;
            } else {
                setError(null);
                setWeather(data);
            }
            console.log(data);
        } catch {
            setError('Not Found');
            setWeather(null);
        }
        setLocation('');
        setLoading(false);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocation(e.target.value);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            fetchWeather();
        }
    };

    return (
        <div className='container' style={{ backgroundImage: backgroundImageStyle }}>
            <div className='weather-app' style={{ backgroundImage: backgroundImageStyle && backgroundImageStyle.replace('to-right', 'to-top') }}>
                <div className='search'>
                    <div className='search-top'>
                        <i className='fa-solid fa-location-dot'></i>
                        <div className='location'>{weather?.location}</div>
                    </div>
                    <div className='search-bar'>
                        <input type='text' placeholder='Search Location' value={location} onChange={handleInputChange} onKeyDown={handleKeyDown}/>
                        <i className='fa-solid fa-magnifying-glass' onClick={fetchWeather}></i>
                    </div>
                </div>
                {loading ? (<img className='loading' src={loadingGif} alt="loading..."/>) : error && <div className='not-found'>Can't find the Location ☹️</div>}
                {weather && <>
                    <div className='weather'>
                        <img src={weatherImages || sunny} alt='weather icon' />
                        <div className='weather-type'>{weather?.weatherType || ""}</div>
                        <div className='temp'>{weather ? `${Math.ceil(weather.temp)}°C` : ""}</div>
                    </div>
                    <div className='weather-date'>
                        <p>{formattedDate}</p>
                    </div>
                    <div className='weather-data'>
                        <div className='humidity'>
                            <div className='data-name'>Humidity</div>
                            <i className='fa-solid fa-droplet'></i>
                            <div className='data'>{weather ? `${weather.humidity}%`: ""}</div>
                        </div>
                        <div className='wind'>
                            <div className='data-name'>Wind</div>
                            <i className='fa-solid fa-wind'></i>
                            <div className='data'>{weather ? `${Math.ceil(weather.windSpeed)}km/hr` : ""}</div>
                        </div>
                    </div>
                </>}
            </div>
        </div>
    );
};
export default WeatherApp;