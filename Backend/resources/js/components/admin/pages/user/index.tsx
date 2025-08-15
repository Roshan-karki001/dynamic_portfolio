import { useGetUsersQuery } from '@/services/api/admin/userApi'
import { FaEdit } from 'react-icons/fa'
import { FaPlus, FaTrash } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import Spinner from '@/components/Spinner'
import { ActionIcon } from '@mantine/core'
import BaseTableClient from '@/components/BaseTableClient'
import { notifications } from '@mantine/notifications'
import LoadingScreen from '@/components/LoadingScreen'
import { notify, notifyError } from '@/utils/notify'
import withConfirmationModal from '../../hocs/withConfirmationModal'

const AdminUser = (props) => {
    const { data: users, isLoading, isError, isSuccess } = useGetUsersQuery()

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
                <h1 className="text-2xl font-bold">Users</h1>
            </div>
            {isSuccess && (
                <BaseTableClient
                    totalData={users.length}
                    rows={users}
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
                            header: 'Contact Number',
                            field: 'contact_number',
                        },
                        {
                            header: 'Email',
                            field: 'email',
                        },
                        {
                            header: 'Address',
                            field: 'address',
                        },
                        {
                            header: 'Created At',
                            cell: (info) => {
                                const createdAt = info.row.original.created_at // Assuming 'createdAt' is in the data
                                const formattedDate = new Date(createdAt).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                })

                                return <span>{formattedDate}</span>
                            },
                            enableSorting: true,
                        },
                        {
                            header: 'Action',
                            cell: (info) => {
                                return <></>
                            },
                        },
                    ]}
                />
            )}
        </div>
    )
}

export default withConfirmationModal(AdminUser)
