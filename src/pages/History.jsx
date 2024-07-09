import { Link } from 'react-router-dom';
import { MdDelete } from 'react-icons/md';

function History({ history, handleDelete }) {

    const handleClick = (e, city, searchTime) => {
        e.preventDefault();
        handleDelete(city, searchTime);
    };

    return (
        <div className="w-screen h-screen bg-gray-100 flex justify-center items-center flex-col gap-10">
            <div className="w-[40%] h-full flex flex-col gap-10 p-20">
                <Link to="/" className="border-2 bg-black text-white py-2 px-4 rounded-md self-start">
                    Back
                </Link>
                <h2 className='text-2xl font-bold self-center'>History</h2>
                <ul className="bg-white shadow-lg rounded-lg p-4 w-full ">
                    {history.map((entry, index) => (
                        <HistoryItem
                            key={index}
                            entry={entry}
                            handleClick={(e) => handleClick(e, entry.city, entry.searchTime)}
                        />
                    ))}
                </ul>
            </div>
        </div>
    );
}

function HistoryItem({ entry, handleClick }) {
    const { city, searchTime } = entry;

    return (
        <li className="w-full border-b py-2 flex items-center justify-between">
            <span className="text-2xl font-bold">
                {city}, <span className="text-sm">{searchTime}</span>
            </span>
            <button onClick={handleClick} className="text-red-500 hover:text-red-700">
                <MdDelete size={20} />
            </button>
        </li>
    );
}

export default History;
