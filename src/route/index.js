import { createBrowserRouter } from "react-router-dom";
import AuthRedirection from "../shared/components/AuthRedirection";
import HomePage from "../pages/HomePage";
import MainLayout from "../shared/components/layout/main-layout";
import { HistoryServicePage } from "../pages/HistoryServicePage";
import { DealershipPage } from "../pages/DealershipPage";

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout/>,
        children: [
            {
                path: '',
                element: <HomePage/>
            },
            {
                path: 'history-service/:motorcycleId',
                element: <HistoryServicePage/>
            },
            {
                path: 'dealerships',
                element: <DealershipPage/>
            }
        ]
    },
    {
        path: "/auth/callback",
        element: <AuthRedirection/>,
    },
]);

export default router;