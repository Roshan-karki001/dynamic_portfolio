import React, { useEffect, useState } from 'react'
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb'
import {
    useGetTechnologyQuery,
    useStoreTechnologyMutation,
    useUpdateTechnologyMutation,
} from '@/services/api/admin/technologyApi'
import { useNavigate, useParams } from 'react-router-dom'
import { Controller, useForm } from 'react-hook-form'
import LoadingScreen from '@/components/LoadingScreen'
import { notify, notifyError } from '@/utils/notify'
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from '@mantine/dropzone'
import { IconPhoto, IconUpload, IconX } from '@tabler/icons-react'
import { Button, Group, rem, SimpleGrid, Text } from '@mantine/core'
import '@mantine/dropzone/styles.css'

const UpsertTechnology = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const {
        data: technology,
        isLoading,
        isError,
    } = useGetTechnologyQuery(id, {
        skip: !id,
    })

    const [storeTechnology, { isLoading: isSubmitting }] = useStoreTechnologyMutation()
    const [updateTechnology, { isLoading: isUpdating }] = useUpdateTechnologyMutation()
    const [files, setFiles] = useState<FileWithPath[]>([])

    const previews = files.map((file, index) => {
        const imageUrl = URL.createObjectURL(file)
        return <img key={index} src={imageUrl} className="max-h-12" onLoad={() => URL.revokeObjectURL(imageUrl)} />
    })

    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors },
    } = useForm()

    useEffect(() => {
        if (technology) {
            reset({
                name: technology.name,
            })
        }
    }, [technology, reset])

    const submitHandler = async (data) => {
        try {
            let formData = new FormData()
            formData.append('name', data.name)
            if (data.icon) {
                formData.append('icon', data.icon)
            }

            if (id) {
                formData.append('_method', 'PUT')
                await updateTechnology({ id, data: formData }).unwrap()
                notify('Technology updated successfully!')
            } else {
                await storeTechnology(formData).unwrap()
                notify('Technology added successfully!')
            }
            navigate('/admin/technologies')
        } catch (err) {
            notifyError()
        }
    }

    if (id && isLoading) {
        return <LoadingScreen />
    }

    return (
        <div className="p-4">
            <Breadcrumb
                basePageName="Technologies"
                basePageLink="/admin/technologies"
                pageName={id ? 'Update Technology' : 'Create Technology'}
            />

            {/* Tabs */}
            <div className="p-4 mb-4">
                {/* Form Content */}
                <form onSubmit={handleSubmit(submitHandler)} className="bg-white dark:bg-boxdark p-4 rounded shadow-md">
                    <div>
                        <div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="mb-4">
                                    <label className="block mb-1 text-black dark:text-white required-field">Name</label>
                                    <input
                                        autoFocus
                                        type="text"
                                        {...register('name', { required: 'Name is required' })}
                                        className="w-full p-2 border border-gray-300 rounded dark:bg-dark-gray-800 dark:border-strokedark"
                                    />
                                    {errors.name?.message && (
                                        <p className="text-red-500 text-sm mt-1">{errors.name.message as string}</p>
                                    )}
                                </div>
                                <div className="mb-4">
                                    <label className="block mb-1 text-black dark:text-white">Icon</label>

                                    <Dropzone
                                        onDrop={(files) => {
                                            setFiles(files)
                                            reset({
                                                icon: files[0],
                                            })
                                        }}
                                        onReject={(error) => {
                                            let errorMessage = error?.[0]?.errors?.[0]?.message
                                            if (errorMessage && typeof errorMessage == 'string') {
                                                notifyError(errorMessage)
                                            }
                                        }}
                                        maxSize={5 * 1024 ** 2}
                                        accept={IMAGE_MIME_TYPE}
                                        maxFiles={1}
                                        multiple={false}
                                        {...register('icon')}
                                    >
                                        <Group justify="center" gap="xl" mih={220} style={{ pointerEvents: 'none' }}>
                                            <Dropzone.Accept>
                                                <IconUpload
                                                    style={{
                                                        width: rem(52),
                                                        height: rem(52),
                                                        color: 'var(--mantine-color-blue-6)',
                                                    }}
                                                    stroke={1.5}
                                                />
                                            </Dropzone.Accept>
                                            <Dropzone.Reject>
                                                <IconX
                                                    style={{
                                                        width: rem(52),
                                                        height: rem(52),
                                                        color: 'var(--mantine-color-red-6)',
                                                    }}
                                                    stroke={1.5}
                                                />
                                            </Dropzone.Reject>
                                            <Dropzone.Idle>
                                                <IconPhoto
                                                    style={{
                                                        width: rem(52),
                                                        height: rem(52),
                                                        color: 'var(--mantine-color-dimmed)',
                                                    }}
                                                    stroke={1.5}
                                                />
                                            </Dropzone.Idle>

                                            <div>
                                                <Text size="xl" style={{ textAlign: 'center' }} inline>
                                                    Drag icon here or click to select file
                                                </Text>
                                                <Text
                                                    size="sm"
                                                    style={{ textAlign: 'center' }}
                                                    c="dimmed"
                                                    inline
                                                    mt={7}
                                                >
                                                    file should not exceed 5mb
                                                </Text>
                                                <Text
                                                    size="sm"
                                                    style={{ textAlign: 'center' }}
                                                    c="dimmed"
                                                    inline
                                                    mt={7}
                                                >
                                                    SVG, PNG
                                                </Text>
                                            </div>
                                        </Group>
                                    </Dropzone>
                                    <SimpleGrid cols={{ base: 1, sm: 4 }} mt={previews.length > 0 ? 'xl' : 0}>
                                        {previews}
                                    </SimpleGrid>
                                    {errors.icon?.message && (
                                        <p className="text-red-500 text-sm mt-1">{errors.icon.message as string}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Save Button */}
                    <div className="mt-4 flex justify-end">
                        <Button type="submit">
                            {isSubmitting || isUpdating ? 'Loading...' : `${id ? 'Update' : 'Save'}`}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default UpsertTechnology
