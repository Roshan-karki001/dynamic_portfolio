import { useGetTechnologiesQuery, useDeleteTechnologyMutation } from '@/services/api/admin/technologyApi'
import { FaEdit } from 'react-icons/fa'
import { FaPlus, FaTrash } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import { ActionIcon } from '@mantine/core'
import BaseTableClient from '@/components/BaseTableClient'
import withConfirmationModal from '@/components/admin/hocs/withConfirmationModal'
import LoadingScreen from '@/components/LoadingScreen'
import { notify, notifyError } from '@/utils/notify'
import getImageSrc from '@/utils/getImageSrc'

const AdminTechnology = (props) => {
    const { data: technologies, isLoading, isError, isSuccess } = useGetTechnologiesQuery()
    const [deleteTechnology] = useDeleteTechnologyMutation()

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
                <h1 className="text-2xl font-bold">Technologies</h1>
                <Link
                    to="/admin/technologies/create"
                    className="flex items-center bg-blue-500 text-white px-2 py-2 rounded hover:bg-blue-600"
                >
                    <FaPlus className="mr-2" /> Add New Technology
                </Link>
            </div>
            {isSuccess && (
                <BaseTableClient
                    totalData={technologies.length}
                    rows={technologies}
                    columns={[
                        {
                            header: 'SN',
                            cell: (info) => {
                                return info.table.getRowModel().flatRows.indexOf(info.row) + 1
                            },
                        },
                        {
                            header: 'Name',
                            field: 'name',
                            enableSorting: true,
                        },
                        {
                            header: 'Icon',
                            cell: (info) => {
                                return (
                                    <img
                                        className="h-12 w-24"
                                        src={getImageSrc(info.row.original.icon)}
                                        alt={info.row.original.name}
                                    />
                                )
                            },
                        },
                        {
                            header: 'Action',
                            cell: (info) => {
                                return (
                                    <>
                                        <Link to={`/admin/technologies/edit/${info.row.original.id}`}>
                                            <ActionIcon>
                                                <FaEdit />
                                            </ActionIcon>
                                        </Link>
                                        &nbsp;
                                        <ActionIcon
                                            onClick={() => {
                                                props.openModal(async () => {
                                                    try {
                                                        await deleteTechnology({ id: info.row.original.id }).unwrap()
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

export default withConfirmationModal(AdminTechnology)
