import { useGetProjectsQuery, useDeleteProjectMutation } from '@/services/api/admin/projectApi'
import { FaEdit } from 'react-icons/fa'
import { FaPlus, FaTrash } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import { ActionIcon } from '@mantine/core'
import BaseTableClient from '@/components/BaseTableClient'
import withConfirmationModal from '@/components/admin/hocs/withConfirmationModal'
import LoadingScreen from '@/components/LoadingScreen'
import { notify, notifyError } from '@/utils/notify'
import getImageSrc from '@/utils/getImageSrc'

const AdminProject = (props) => {
    const { data: projects, isLoading, isError, isSuccess } = useGetProjectsQuery()
    const [deleteProject] = useDeleteProjectMutation()

    if (isError) {
        return (
            <>
                <p>error page</p>{' '}
            </>
        )
    }
    if (isLoading) {
        return <LoadingScreen />
    }

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Projects</h1>
                <Link
                    to="/admin/projects/create"
                    className="flex items-center bg-blue-500 text-white px-2 py-2 rounded hover:bg-blue-600"
                >
                    <FaPlus className="mr-2" /> Add New Project
                </Link>
            </div>
            {isSuccess && (
                <BaseTableClient
                    totalData={projects.length}
                    rows={projects}
                    columns={[
                        {
                            header: 'SN',
                            cell: (info) => {
                                return info.table.getRowModel().flatRows.indexOf(info.row) + 1
                            },
                        },
                        {
                            header: 'Title',
                            field: 'title',
                            enableSorting: true,
                        },
                        {
                            header: 'Description',
                            field: 'description',
                            enableSorting: true,
                        },
                        {
                            header: 'Image',
                            cell: (info) => {
                                return (
                                    <img
                                        className="h-12 w-24"
                                        src={getImageSrc(info.row.original.image)}
                                        alt={info.row.original.name}
                                    />
                                )
                            },
                        },
                        {
                            header: 'Technologies',
                            cell: (info) => {
                                const technologies = info.row.original.technologies

                                return (
                                    <div className="space-y-1">
                                        {Array.isArray(technologies) ? (
                                            technologies.map((tech, index) => (
                                                <span key={index} className="block text-sm text-gray-600">
                                                    {tech.name}
                                                </span>
                                            ))
                                        ) : (
                                            <></>
                                        )}
                                    </div>
                                )
                            },
                        },
                        {
                            header: 'Action',
                            cell: (info) => {
                                return (
                                    <>
                                        <Link to={`/admin/projects/edit/${info.row.original.id}`}>
                                            <ActionIcon>
                                                <FaEdit />
                                            </ActionIcon>
                                        </Link>
                                        &nbsp;
                                        <ActionIcon
                                            onClick={() => {
                                                props.openModal(async () => {
                                                    try {
                                                        await deleteProject({ id: info.row.original.id }).unwrap()
                                                        notify()
                                                    } catch (err) {
                                                        notifyError()
                                                    }
                                                })
                                            }}
                                            variant="filled"
                                            color="red"
                                            aria-label="Settings"
                                        >
                                            <FaTrash />
                                        </ActionIcon>
                                    </>
                                )
                            },
                        },
                    ]}
                />
            )}
        </div>
    )
}

export default withConfirmationModal(AdminProject)
