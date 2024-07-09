import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Loading from './Loading';

function Navbar({ setWeather, setHistory }) {
    const API_KEY = import.meta.env.VITE_WEATEHR_API_KEY;
    const [city, setCity] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setCity(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}`);
            console.log(response);
            setWeather(response.data);
            const newCity = {
                city: city,
                searchTime: new Date().toLocaleString(), // Store search time
            };
            setHistory(prev => [newCity, ...prev]);
        } catch (error) {
            alert(error.response.data.message);
            console.error('Error:', error);
        } finally {
            setLoading(false); // Stop loading animation
        }
    };

    return (

        <div className="m-10 w-[70%] flex flex-col gap-2">
            {loading && <Loading />}
            <div className='bg-black text-white flex justify-center p-4'>
                <h2>Weather</h2>
            </div>
            <div className='flex w-full items-center justify-center gap-10'>
                <input
                    className="w-[50%] h-[90%] p-2"
                    type="text"
                    placeholder='City...'
                    value={city}
                    onChange={handleChange}
                />
                <button
                    onClick={handleSubmit}
                    className='border-2 py-2 px-4 rounded-md border-green-400 text-green-400'
                >
                    Search
                </button>
                <Link
                    to="/history"
                    className='border-2 py-2 px-4 rounded-md bg-purple-600 text-white'
                >
                    History
                </Link>
            </div>
        </div>
    );
}

export default Navbar;
