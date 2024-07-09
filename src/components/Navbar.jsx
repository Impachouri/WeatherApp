import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';

function Navbar({ setWeather, setCities }) {
    const API_KEY = import.meta.env.VITE_WEATEHR_API_KEY
    const [city, setCity] = useState();

    const handleChange = (e) => {
        e.preventDefault();
        setCity(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}`, city);
            console.log(response)
            setWeather(response.data)
            setCities(city);
        } catch (error) {
            alert("Error in fetching");
            console.log(error)
        }
    }

    const handleHistory = (e) => {
        e.preventDefault();
        redirect('/history');
    }

    return (
        <div className=" m-10 w-[70%] flex flex-col gap-7">
            <div className='bg-black text-white flex justify-center p-4'>
                <h2 >Weather</h2>
            </div>
            <div className='flex w-full items-center justify-center gap-10'>
                <input className="w-[50%] h-[90%] p-2" type="text" placeholder='City...' onChange={handleChange} value={city} />
                <button onClick={handleSubmit} className='border-2 py-2 px-4  rounded-md border-green-400 text-green-400'>Search</button>
                <Link
                    to="/history"
                    className='border-2 py-2 px-4  rounded-md bg-purple-600 text-white'
                >
                    History
                </Link>

            </div>
        </div>
    )
}

export default Navbar