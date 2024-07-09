import Navbar from '../components/Navbar'
import CityWeather from '../components/CityWeather'
import { useState } from 'react'

function Home({ setCities }) {

    const [weather, setWeather] = useState(null);
    return (
        <div className='w-screen h-screen bg-slate-100 flex  justify-center items-center flex-col gap-10 overflow-auto'>
            <Navbar setWeather={setWeather} setCities={setCities} />
            <CityWeather weather={weather} />
        </div>
    )
}

export default Home