import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { MantineProvider } from '@mantine/core'
import { store, initializePersistor } from './redux/store.ts'

import '@mantine/core/styles.css'
import '@mantine/notifications/styles.css'

import './bootstrap.js'
import './style.css'

import App from './components/App'
import { Notifications } from '@mantine/notifications'

const SafePersistGate = ({ children }) => {
    const [PersistGate, setPersistGate] = React.useState(null)
    const [persistor, setPersistor] = React.useState(null)

    React.useEffect(() => {
        // Dynamically import PersistGate and initialize persistor
        import('redux-persist/es/integration/react')
            .then(({ PersistGate }) => setPersistGate(() => PersistGate))
            .catch((err) => console.error('Failed to load PersistGate:', err))

        initializePersistor()
            .then((persistor) => setPersistor(persistor))
            .catch((err) => console.error('Failed to initialize persistor:', err))
    }, [])

    if (!PersistGate || !persistor) {
        return <>{children}</>
    }

    return (
        <PersistGate loading={null} persistor={persistor}>
            {children}
        </PersistGate>
    )
}

const root = createRoot(document.getElementById('csr-app'))

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <MantineProvider>
                <Notifications />
                <SafePersistGate>
                    <App />
                </SafePersistGate>
            </MantineProvider>
        </Provider>
    </React.StrictMode>
)
