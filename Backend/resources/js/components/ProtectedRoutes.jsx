import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import Cookies from 'js-cookie'
import { useSelector } from 'react-redux'
import { USER_ROLE } from '@/constants/role'

const ProtectedRoute = ({ element: Component, pageName, ...rest }) => {
    const user = useSelector((store) => store.user.value)

    if (user?.role !== USER_ROLE) {
        return (
            <section className="flex flex-col items-center justify-center h-screen text-center bg-gray-100 p-5">
                <div className="mb-8 md:mb-10 lg:mb-12 xl:mb-14">{/* Optional: Additional content or spacing */}</div>
                <div className="mb-8 md:mb-10 lg:mb-12 xl:mb-14">
                    <p className="text-lg font-medium">Please Login to view {pageName} page.</p>
                </div>
                <div className="mb-8 md:mb-10 lg:mb-12 xl:mb-14">{/* Optional: Additional content or spacing */}</div>
            </section>
        )
    }

    return <Component {...rest} />
}

export default ProtectedRoute
