import loadingGif from '../assets/cloud_loading.gif'

const Loading = () => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
            <img src={loadingGif} alt="Loading..." />
        </div>
    );
};

export default Loading;
