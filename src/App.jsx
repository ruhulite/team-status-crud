
import {RouterProvider} from "react-router-dom";
import {routes} from "./routes.jsx";
import './App.css'

function App() {

    return <div className="mx-auto max-w-md bg-white md:max-w-2xl mt-15">
            <RouterProvider router={ routes } />
    </div>
}

export default App
