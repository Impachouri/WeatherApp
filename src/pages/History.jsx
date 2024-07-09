import { Link } from 'react-router-dom';
import { MdDelete } from "react-icons/md";

function History({ history, handleDelete }) {

    const handleClick = (e, index) => {
        e.preventDefault();
        console.log(index)
        handleDelete(index)
    }

    return (

        <div className="w-screen h-screen bg-slate-100 flex  justify-center items-center flex-col gap-10">

            <Link to="/" className='border-2 bg-black text-white py-2 px-4'>Back</Link>
            <span className='text-black font-bold text-2xl'>History</span>
            {history.map((city, index) =>
                <li key={index} className='border-1 bg-black text-white font-semibold p-5 flex flex-row gap-10'>{city} <button onClick={(e) => handleClick(e, city)}> <MdDelete szie={20} /></button></li>
            )
            }
        </div>
    )
}

export default History