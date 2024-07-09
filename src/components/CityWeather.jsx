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

function CityWeather({ weather }) {

    const [daysForecast, setDaysForecast] = useState(null);

    let tempData = []
    let timeData = []
    for (let i = 0; i < 8; i++) {
        tempData[i] = weather?.list[i].main.temp;
        timeData[i] = showHours(weather?.list[i].dt)
    }




    function showSunTimes(UnixTime) {
        const date = new Date(UnixTime * 1000).toLocaleString('default', { timeZone: "IST" })
        return date;
    }

    function showHours(UnixTime) {
        const date = new Date(UnixTime * 1000)
        return date.getHours();
    }

    useEffect(() => {
        const newfiveDays = weather?.list.filter((data, index) => {
            if (index % 8 === 0) {
                return data
            }
        })
        let daysData = []
        for (let i = 0; i < newfiveDays?.length; i++) {
            daysData[i] = {
                dayName: daysOfWeek[new Date(newfiveDays[i].dt * 1000).getDay()],
                temp: newfiveDays[i].main.temp,
                weatherDescription: newfiveDays[i].weather[0].description
            }
        }

        setDaysForecast(daysData)
    }, [weather])

    useEffect(() => {
        console.log(" daysforecast", daysForecast)
    }, [daysForecast])

    return (

        <div className="w-[70%] h-full border-2 border-gray-100 p-2 flex flex-col gap-10">
            {weather
                &&
                <>
                    {/* cityDetails */}
                    <div className="flex flex-col gap-3 text-lg font-medium">
                        <span className="text-2xl">{weather.city.name}, {weather.city.country}</span>
                        <span>Sunrise : {showSunTimes(weather.city.sunrise)}</span>
                        <span>Sunset : {showSunTimes(weather.city.sunset)}</span>
                    </div>


                    {/* chart */}
                    <div className=" flex border-2 border-black overflow-hidden">
                        {timeData.length > 0 && tempData.length > 0 && <TempChart timeData={timeData} tempData={tempData} />}
                    </div>

                    {/* future forecast */}
                    <div className="border-2 border-black  flex items-center justify-center gap-10 text-gray-500">
                        {daysForecast && daysForecast.map((day, index) =>
                            <div key={index} className="flex flex-col items-center justify-center">
                                <span className="font-bold ">{day.dayName}</span>
                                {clouds(day.weatherDescription)}
                                <span>{day.weatherDescription} | {day.temp}</span>
                            </div>
                        )}
                    </div>
                </>}
        </div>
    )
}

export default CityWeather