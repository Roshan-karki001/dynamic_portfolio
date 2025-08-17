import { useGetMessagesQuery, useDeleteMessageMutation } from '@/services/api/admin/contactApi'
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
    const { data: messages, isLoading, isError, isSuccess } = useGetMessagesQuery()
    const [deleteMessage] = useDeleteMessageMutation()

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
                <h1 className="text-2xl font-bold">Messages</h1>
            </div>
            {isSuccess && (
                <BaseTableClient
                    totalData={messages.length}
                    rows={messages}
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
                            enableSorting: true,
                        },
                        {
                            header: 'Email',
                            field: 'email',
                            enableSorting: true,
                        },
                        {
                            header: 'Message',
                            field: 'message',
                            enableSorting: true,
                        },
                        {
                            header: 'Action',
                            cell: (info) => {
                                return (
                                    <>
                                        <ActionIcon
                                            onClick={() => {
                                                props.openModal(async () => {
                                                    try {
                                                        await deleteMessage({ id: info.row.original.id }).unwrap()
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
