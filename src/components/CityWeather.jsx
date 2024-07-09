import { useEffect, useState } from "react";
import TempChart from "./TempChart";
import { WiCloudy, WiRainMix, WiNightRainWind, WiDayRainMix } from "weather-icons-react";

const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function clouds(description) {
    switch (description) {
        case "broken clouds":
            return <WiCloudy size={34} color='#000' />;
        case "light rain":
            return <WiRainMix size={34} color='#000' />;
        case "overcast clouds":
            return <WiNightRainWind size={34} color='#000' />;
        default:
            return <WiDayRainMix size={34} color='#000' />;
    }
}

function showSunTimes(UnixTime) {
    const date = new Date(UnixTime * 1000).toLocaleString('default', { timeZone: "IST" });
    return date;
}

function showHours(UnixTime) {
    const date = new Date(UnixTime * 1000);
    return date.toLocaleString('en-US', { hour: 'numeric', hour12: true });
}

function kelvinToCelsius(tempKelvin) {
    return (tempKelvin - 273.15).toFixed(1); // Convert Kelvin to Celsius and round to one decimal place
}

function CityWeather({ weather }) {
    const [daysForecast, setDaysForecast] = useState(null);

    useEffect(() => {
        if (weather) {
            const tempData = weather.list.slice(0, 8).map(entry => kelvinToCelsius(entry.main.temp));
            const timeData = weather.list.slice(0, 8).map(entry => showHours(entry.dt));
            const newfiveDays = weather.list.filter((_, index) => index % 8 === 0);

            const daysData = newfiveDays.map(entry => ({
                dayName: daysOfWeek[new Date(entry.dt * 1000).getDay()],
                temp: kelvinToCelsius(entry.main.temp),
                weatherDescription: entry.weather[0].description
            }));

            setDaysForecast(daysData);
        }
    }, [weather]);

    return (
        <div className="w-[70%] h-full border-2 border-gray-100 p-2 flex flex-col gap-6">
            {weather && (
                <>
                    {/* City Details */}
                    <div className="flex flex-col gap-3 text-lg font-medium">
                        <span className="text-2xl">{weather.city.name}, {weather.city.country}</span>
                        <span>Sunrise : {showSunTimes(weather.city.sunrise)}</span>
                        <span>Sunset : {showSunTimes(weather.city.sunset)}</span>
                    </div>

                    {/* Chart */}
                    <div className="flex items-center justify-center border-2 border-black overflow-hidden">
                        <TempChart
                            timeData={weather.list.slice(0, 8).map(entry => showHours(entry.dt))}
                            tempData={weather.list.slice(0, 8).map(entry => kelvinToCelsius(entry.main.temp))}
                        />
                    </div>

                    {/* Future Forecast */}
                    <div className="border-2 border-black flex items-center justify-center gap-10 text-gray-500">
                        {daysForecast && daysForecast.map((day, index) => (
                            <div key={index} className="flex flex-col items-center justify-center">
                                <span className="font-bold">{day.dayName}</span>
                                {clouds(day.weatherDescription)}
                                <span>{day.weatherDescription} | {day.temp} °C</span>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

export default CityWeather;
