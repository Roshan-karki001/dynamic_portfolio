import { options } from 'laravel-mix'
import React from 'react'

/**
 * to integrate with react-hook-form
 * @returns
 */

type FieldProps = {
    type?: string
    name: string
    placeholder?: string
    required?: boolean
    register?: any
    errors?: any
    [key: string]: any
}

export default function InputField({
    type = 'text',
    name,
    placeholder,
    required = false,
    register,
    errors,
    ...rest
}: FieldProps) {
    let options: { [key: string]: any } = { required: { message: 'required field', value: required } }
    let validationRules = {}

    if (register) {
        validationRules = { ...register(name, options) }
    }

    if (type === 'number') {
        options.pattern = {
            value: /^[0-9]+(\.[0-9]+)?$/, // Regular expression to allow only numbers
            message: 'Please enter a valid number',
        }

        let { min, max } = rest

        if (min)
            options.min = {
                value: min,
                message: `Please input value above ${min}`,
            }

        if (max)
            options.max = {
                value: max,
                message: `Please input value below ${max}`,
            }

        type = 'text'

        if (register) {
            delete rest.min
            delete rest.max
        }
    } else if (type == 'select') {
        return (
            <>
                <select
                    className="form-control "
                    {...register(name, {
                        required: { message: 'required field', value: required },
                        setValueAs: (value) => {
                            if (value === true) {
                                return 'true'
                            } else if (value === false) {
                                return 'false'
                            }
                            return value
                        },
                    })}
                >
                    <option value="" className="form-control">
                        Select
                    </option>
                    {rest?.options?.map((el) => {
                        return (
                            <option className="form-control capitalize" value={el.value}>
                                {el.label}
                            </option>
                        )
                    })}
                </select>
                {errors?.[name]?.message && <p className="text-red-500 text-sm mt-1">{errors?.[name].message as string}</p>}
            </>
        )
    }

    return (
        <>
            {type == 'textarea' ? (
                <textarea
                    {...validationRules}
                    className="form-control"
                    placeholder={placeholder || ''}
                    rows={7}
                    {...rest}
                />
            ) : (
                <input
                    {...validationRules}
                    type={type}
                    className="form-control"
                    placeholder={placeholder || ''}
                    {...rest}
                />
            )}
            {errors?.[name]?.message && <p className="text-red-500 text-sm mt-1">{errors?.[name].message as string}</p>}
        </>
    )
}
