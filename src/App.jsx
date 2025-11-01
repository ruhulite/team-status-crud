
import {RouterProvider} from "react-router-dom";
import {routes} from "./routes.jsx";
import './App.css'
import {useEffect, useState} from "react";
import ProgressBar from "./components/ProgressBar.jsx";
import api from "./service/api.js";

function App() {

    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        // api.interceptors.request.use(config => {
        //     setIsLoading(true)
        //     return config;
        // },
        // error => {
        // setIsLoading(false)
        //     return Promise.reject(error);
        // })
        //
        // api.interceptors.response.use(response => {
        //     setIsLoading(false)
        //     return response;
        // }, error => {
        //     setIsLoading(false)
        //     return Promise.reject(error);
        // })
    }, []);

    return <div className="mx-auto max-w-md bg-white md:max-w-2xl mt-15">
        <ProgressBar isLoading={isLoading} />
        <RouterProvider router={ routes } />
    </div>
}

export default App
