import axios, { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
// import logo from "./logo.svg";

function App() {
    const [getMessage, setGetMessage] = useState({});

    useEffect(() => {
        axios
            .get("/api/hello")
            .then((response) => {
                console.log("SUCCESS", response);
                setGetMessage(response);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <div className="">
            <header className="App-header">
                {/* <img src={logo} className="App-logo" alt="logo" /> */}
                <p>React + Flask Tutorial</p>
                <div>
                    {getMessage.status === 200 ? (
                        <h3>{getMessage.data.message}</h3>
                    ) : (
                        <h3>LOADING</h3>
                    )}
                </div>
            </header>
        </div>
    );
}

export default App;
