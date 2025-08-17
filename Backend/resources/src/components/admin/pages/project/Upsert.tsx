import React, { useEffect, useState } from 'react'
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb'
import { useGetProjectQuery, useStoreProjectMutation, useUpdateProjectMutation } from '@/services/api/admin/projectApi'
import { useNavigate, useParams } from 'react-router-dom'
import { Controller, useForm } from 'react-hook-form'
import LoadingScreen from '@/components/LoadingScreen'
import { notify, notifyError } from '@/utils/notify'
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from '@mantine/dropzone'
import { IconPhoto, IconUpload, IconX } from '@tabler/icons-react'
import { Button, Group, MultiSelect, rem, SimpleGrid, Text } from '@mantine/core'
import '@mantine/dropzone/styles.css'
import { useGetTechnologiesQuery } from '@/services/api/admin/technologyApi'

const UpsertProject = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const {
        data: project,
        isLoading,
        isError,
    } = useGetProjectQuery(id, {
        skip: !id,
    })
    const {
        data: technologies,
        isLoading: isLoadingTechnologies,
        isError: isErrorTechnologies,
    } = useGetTechnologiesQuery()

    const [storeProject, { isLoading: isSubmitting }] = useStoreProjectMutation()
    const [updateProject, { isLoading: isUpdating }] = useUpdateProjectMutation()
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
        watch,
        formState: { errors },
    } = useForm()

    useEffect(() => {
        if (project) {
            reset({
                title: project.title,
                description: project.description,
                url: project.url ?? '',
            })
        }
    }, [project, reset])

    const submitHandler = async (data) => {
        try {
            let formData = new FormData()
            formData.append('title', data.title)
            formData.append('description', data.description)
            formData.append('technologies', JSON.stringify(selectedTechnologies))
            if (data.image) {
                formData.append('image', data.image)
            }
            formData.append('url', data.url)

            if (id) {
                formData.append('_method', 'PUT')
                await updateProject({ id, data: formData }).unwrap()
                notify('Project updated successfully!')
            } else {
                await storeProject(formData).unwrap()
                notify('Project added successfully!')
            }
            navigate('/admin/projects')
        } catch (err) {
            notifyError()
        }
    }

    let technologiesOptions = technologies?.map((el) => ({ value: `${el.id}`, label: el.name })) || []

    let selectedTechnologies = watch('technology_ids')

    if (id && isLoading) {
        return <LoadingScreen />
    }

    return (
        <div className="p-4">
            <Breadcrumb
                basePageName="Projects"
                basePageLink="/admin/projects"
                pageName={id ? 'Update Project' : 'Create Project'}
            />

            {/* Tabs */}
            <div className="p-4 mb-4">
                {/* Form Content */}
                <form onSubmit={handleSubmit(submitHandler)} className="bg-white dark:bg-boxdark p-4 rounded shadow-md">
                    <div>
                        <div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="mb-4">
                                    <label className="block mb-1 text-black dark:text-white required-field">
                                        Title
                                    </label>
                                    <input
                                        autoFocus
                                        type="text"
                                        {...register('title', { required: 'Title is required' })}
                                        className="w-full p-2 border border-gray-300 rounded dark:bg-dark-gray-800 dark:border-strokedark"
                                    />
                                    {errors.title?.message && (
                                        <p className="text-red-500 text-sm mt-1">{errors.title.message as string}</p>
                                    )}
                                </div>

                                <div className="mb-4">
                                    <label className="block mb-1 text-black dark:text-white required-field">
                                        Description
                                    </label>
                                    <textarea
                                        rows={4}
                                        {...register('description', { required: 'Description is required' })}
                                        className="w-full p-2 border border-gray-300 rounded dark:bg-dark-gray-800 dark:border-strokedark"
                                    />
                                    {errors.description?.message && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.description.message as string}
                                        </p>
                                    )}
                                </div>
                                <div className="mb-4">
                                    <label className="block mb-1 text-black dark:text-white required-field">
                                        Image
                                    </label>

                                    <Dropzone
                                        onDrop={(files) => {
                                            setFiles(files)
                                            reset({
                                                image: files[0],
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
                                                    Drag image here or click to select file
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
                                                    JPEG, SVG, PNG
                                                </Text>
                                            </div>
                                        </Group>
                                    </Dropzone>
                                    <SimpleGrid cols={{ base: 1, sm: 4 }} mt={previews.length > 0 ? 'xl' : 0}>
                                        {previews}
                                    </SimpleGrid>
                                    {errors.image?.message && (
                                        <p className="text-red-500 text-sm mt-1">{errors.image.message as string}</p>
                                    )}
                                </div>
                                <div className="mb-4">
                                    <label className="form-label required-field">Technologies</label>
                                    <Controller
                                        name="technology_ids"
                                        control={control}
                                        render={({ field }) => (
                                            <MultiSelect
                                                placeholder="Select Technologies"
                                                data={technologiesOptions}
                                                value={field.value?.map((el) => `${el}`)}
                                                className=""
                                                classNames={{
                                                    wrapper: 'form-control !p-0',
                                                    input: 'p-2 border-none min-h-0',
                                                }}
                                                clearable
                                                searchable
                                                nothingFoundMessage="Nothing found..."
                                                withScrollArea={false}
                                                styles={{ dropdown: { maxHeight: 200, overflowY: 'auto' } }}
                                                onChange={(values) => {
                                                    field.onChange(values)
                                                }}
                                            />
                                        )}
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block mb-1 text-black dark:text-white">URL</label>
                                    <input
                                        type="text"
                                        {...register('url')}
                                        className="w-full p-2 border border-gray-300 rounded dark:bg-dark-gray-800 dark:border-strokedark"
                                    />
                                    {errors.url?.message && (
                                        <p className="text-red-500 text-sm mt-1">{errors.url.message as string}</p>
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

export default UpsertProject
