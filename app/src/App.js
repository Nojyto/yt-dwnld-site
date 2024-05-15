import axios from "axios";
import React, { useEffect, useRef, useState } from "react";

function App() {
    const [getMessage, setGetMessage] = useState({});
    const [downloadState, setDownloadState] = useState(false);
    const [blobName, setBlobName] = useState("");
    const hrefButton = useRef(null);
    const inputRef = useRef(null);
    // good shit -> https://github.com/Raxabi/Downlotube-HTTP/tree/main
    useEffect(() => {
        axios
            .get("/_api")
            .then(response => {
                console.log("SUCCESS", response);
                setGetMessage({
                    status: response.status,
                    data: response.data
                });
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const handleButtonClick = async () => {
        try {
            const response = await axios.post('/_api', { url: inputRef.current.value });
            console.log('Server response:', response.data);

            const blob = await b64ToBlob(response.data.blob);
            const blobURL = URL.createObjectURL(blob);

            if (hrefButton.current) {
                hrefButton.current.href = blobURL;
                hrefButton.current.download = response.data.title + " - " + response.data.author;
                hrefButton.current.click();
            }

            setDownloadState(true);
            setBlobName(response.data.title + " - " + response.data.author);
        } catch (error) {
            console.error('Error sending input:', error);
        }
    };

    const b64ToBlob = (b64String) => {
        const byteCharacters = atob(b64String);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        return new Blob([byteArray], { type: 'audio/mp4' });
    };

    return (
        <div className="bg-gray-800 min-h-screen flex flex-col justify-center items-center">
            <header className="bg-gray-900 text-white p-6 rounded-lg shadow-lg">
                <p className="text-2xl font-bold">React + Flask Tutorial</p>
                <div>
                    {getMessage.status === 200 ? (
                        <h3 className="text-green-400">{getMessage.data.message}</h3>
                    ) : (
                        <h3 className="text-yellow-500">LOADING</h3>
                    )}
                </div>
                <div className="mt-4">
                    <input 
                        type="text" 
                        ref={inputRef}
                        defaultValue="https://www.youtube.com/watch?v=pXRviuL6vMY"
                        className="p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button 
                        type="button" 
                        onClick={handleButtonClick}
                        className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Download Video
                    </button>
                </div>
                {downloadState && (
                    <a 
                        ref={hrefButton} 
                        style={{ display: 'none' }}
                    >
                        Download Link
                    </a>
                )}
                <div className="mt-2 text-sm text-gray-300">{blobName}</div>
            </header>
        </div>
    );
}

export default App;