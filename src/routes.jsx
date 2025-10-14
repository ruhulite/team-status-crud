import {createBrowserRouter} from "react-router-dom";

import ErrorPage from "./pages/ErrorPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import TeamForm from "./components/TeamForm.jsx";

export const routes = createBrowserRouter([
    {
        path: '/',
        element: <HomePage />,
        errorElement: <ErrorPage />
    },
    {
        path: '/team-form',
        element: <TeamForm />,
        errorElement: <ErrorPage />
    }
])