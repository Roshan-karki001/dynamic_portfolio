import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setReduxUser } from '@/redux/slices/userSlice'
import { useForm } from 'react-hook-form'
import { useLoginMutation } from '@/services/api/loginApi'
import handleServerError from '@/utils/handleServerError'
import LoadingScreen from '@/components/LoadingScreen'
import '../../index.css'

const Login = () => {
    const dispatch = typeof window !== 'undefined' ? useDispatch() : null
    const [login, { isLoading: isLoadingLogin }] = useLoginMutation()
    const [isClientSide, setIsClientSide] = useState(false)

    const {
        register,
        handleSubmit,
        reset,
        setError,
        formState: { errors: Errors },
    } = useForm()

    // Check if running client-side to avoid SSR issues
    useEffect(() => {
        setIsClientSide(true)
    }, [])

    // Submit handler
    const submitHandler = async (data) => {
        try {
            // Make login API call
            const responseData = await login(data).unwrap()

            if (responseData && responseData.success && isClientSide) {
                // Store user info in Redux
                if (dispatch) {
                    dispatch(setReduxUser(responseData))
                }
                window.location.href = '/admin/dashboard'
            }
        } catch (err) {
            handleServerError(err, setError)
        }
    }

    if (isLoadingLogin) {
        return <LoadingScreen />
    }

    return (
        <div className="min-h-screen">
            <div className="flex flex-col md:flex-row justify-center items-center m-6 p-6">
                {/* Contact Form Card */}
                <div className="w-full h-full md:w-1/2 rounded-lg shadow-lg px-6 py-12 border border-gray-300 hover:shadow-xl transition-shadow duration-300">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 md:mb-8 text-center">Login</h2>
                    <form onSubmit={handleSubmit(submitHandler)} method="POST" className="space-y-6">
                        <div>
                            <label
                                className="block text-sm md:text-base font-medium text-gray-700 mb-2 md:mb-3 required-field"
                                htmlFor="email"
                            >
                                Email
                            </label>
                            <input
                                className="w-full p-3 md:p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
                                id="email"
                                {...register('email', {
                                    required: 'Email is required',
                                })}
                                placeholder="example@domain.com"
                            />
                            {Errors.email?.message && (
                                <p className="text-red-500 text-sm mt-1">{Errors.email.message}</p>
                            )}
                        </div>
                        <div>
                            <label
                                className="block text-sm md:text-base font-medium text-gray-700 mb-2 md:mb-3 required-field"
                                htmlFor="password"
                            >
                                Password
                            </label>
                            <input
                                className="w-full p-3 md:p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
                                id="password"
                                type="password"
                                {...register('password', {
                                    required: 'Password is required',
                                })}
                                placeholder="••••••••"
                            />
                            {Errors.password?.message && (
                                <p className="text-red-500 text-sm mt-1">{Errors.password.message}</p>
                            )}
                        </div>
                        <div className="flex flex-col md:flex-row items-center justify-between">
                            <div className="flex items-center mb-4 md:mb-0">
                                <input
                                    id="remember-me"
                                    type="checkbox"
                                    {...register('remember')}
                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                />
                                <label htmlFor="remember-me" className="ml-2 text-sm md:text-base text-gray-900">
                                    Remember me
                                </label>
                            </div>
                        </div>
                        <div>
                            <button
                                className="w-full py-3 px-4 md:py-4 md:px-6 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
                                type="submit"
                            >
                                Sign In
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
