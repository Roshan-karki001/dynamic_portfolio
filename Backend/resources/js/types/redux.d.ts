interface ReduxUser {
    name: string
    role: string
    email: string
}

interface ReduxStore {
    user: {
        value: null | ReduxUser
    }
}
