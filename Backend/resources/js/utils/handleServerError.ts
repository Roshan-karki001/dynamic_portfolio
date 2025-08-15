import React from 'react'
import { notifyError } from './notify'

export default function handleServerError(
    err: any,
    setHookFormError?: (field: string, config: { type: string; message: string }) => void
) {
    let msg = err?.data?.message
    let httpMessage = ''
    const status = err?.status
    switch (status) {
        case 400:
            httpMessage = 'Bad Request'
            break
        case 401:
            httpMessage = 'Unauthenticated'
            break
        case 403:
            httpMessage = 'Forbidden'
            break
        case 404:
            httpMessage = 'Resource Not Found'
            break
        case 422:
            httpMessage = 'Unprocessable Entity'
            break
        case 500:
            httpMessage = 'Server Error'
            break
        case 503:
            httpMessage = 'Service Unavailable'
            break
        default:
            httpMessage = 'Something went wrong. Try Again'
            break
    }

    notifyError(msg || httpMessage)

    if ((status == 401 || status == 422) && setHookFormError && err?.data?.errors) {
        /*
            assuming backend response is
            {
                "status": 422,
                "data": {
                    "message": "The facebook field must be a valid URL.",
                    "errors": {
                    "facebook": [
                        "The facebook field must be a valid URL."
                    ]
                    }
                }
            }

        */
        let formErrors = Object.entries(err.data.errors)
        formErrors.forEach((err) => {
            setHookFormError(err[0], { type: 'manual', message: err[1]?.[0] })
        })
    }
}
