import { Suspense, lazy, useEffect } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LoadingScreen from './LoadingScreen'
const AdminLayout = lazy(() => import('./layout/AdminLayout'))
import AdminPageNotFound from './PageNotFound'
import AdminDashboard from './admin/pages/Dashboard'
import AdminUserSetting from './admin/pages/setting/UserSetting'
import AdminTechnology from './admin/pages/technology/index'
import AdminTechnologyUpsert from './admin/pages/technology/Upsert'
import AdminProject from './admin/pages/project/index'
import AdminProjectUpsert from './admin/pages/project/Upsert'
import AdminContactMessage from './admin/pages/contact/index'

import PageTitle from './admin/components/PageTitle'

const App = () => {
    const router = createBrowserRouter([
        {
            path: 'admin',
            element: (
                <>
                    <Suspense fallback={<LoadingScreen />}>
                        <AdminLayout />
                    </Suspense>
                </>
            ),
            children: [
                {
                    path: '',
                    element: (
                        <>
                            <PageTitle title="Dashboard" />
                            <AdminDashboard />
                        </>
                    ),
                },
                {
                    path: 'dashboard',
                    element: (
                        <>
                            <PageTitle title="Dashboard" />
                            <AdminDashboard />
                        </>
                    ),
                },
                {
                    path: 'technologies',
                    children: [
                        {
                            path: '',
                            element: <AdminTechnology />,
                        },
                        {
                            path: 'create',
                            element: <AdminTechnologyUpsert />,
                        },
                        {
                            path: 'edit/:id',
                            element: <AdminTechnologyUpsert />,
                        },
                    ],
                },
                {
                    path: 'projects',
                    children: [
                        {
                            path: '',
                            element: <AdminProject />,
                        },
                        {
                            path: 'create',
                            element: <AdminProjectUpsert />,
                        },
                        {
                            path: 'edit/:id',
                            element: <AdminProjectUpsert />,
                        },
                    ],
                },
                {
                    path: 'messages',
                    element: <AdminContactMessage />,
                },
                { path: 'settings', element: <AdminUserSetting /> },
                {
                    path: '*',
                    element: <AdminPageNotFound />,
                },
            ],
        },
    ])

    return <RouterProvider router={router} />
}

export default App
