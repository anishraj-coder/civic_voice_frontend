// src/routes/index.tsx
import { createBrowserRouter } from "react-router-dom";
import App from "@/App";
import Body from "@/routes/Body";
import IssueForm from "@/components/IssueForm.tsx";
import CityReportsPage from "@/pages/CityReportsPage";

export const appRoutes = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                index: true,
                element: <Body />,
            },
            {
                path: "/form",
                element: <IssueForm />,
            },
            {
                path: '/cities',
                element: <CityReportsPage />,
            }
        ],
    },
]);