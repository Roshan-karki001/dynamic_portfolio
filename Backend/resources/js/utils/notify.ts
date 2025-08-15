import { notifications } from '@mantine/notifications'

export const notify = (message?: string) => {
    notifications.show({
        message: message || 'Operation Successful',
    })
}
export const notifyError = (message?: string) => {
    notifications.show({
        color: 'red',
        message: message || 'Something went wrong! Please try again later.',
    })
}
