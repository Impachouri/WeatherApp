import Navbar from '../components/Navbar'
import CityWeather from '../components/CityWeather'
import { useState } from 'react'

function Home({ setHistory }) {

    const [weather, setWeather] = useState(null);
    return (
        <div className='w-screen h-screen bg-slate-100 flex  justify-center items-center flex-col overflow-auto'>
            <Navbar setWeather={setWeather} setHistory={setHistory} />
            <CityWeather weather={weather} />
        </div>
    )
}

export default Home