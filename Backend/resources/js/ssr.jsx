import React, { useEffect } from 'react'
import { createInertiaApp } from '@inertiajs/react'
import createServer from '@inertiajs/react/server'
import ReactDOMServer from 'react-dom/server'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { MantineProvider } from '@mantine/core'
import { Notifications } from '@mantine/notifications'
import { store, initializePersistor } from './redux/store.ts'
import '@mantine/core/styles.css'
import '@mantine/notifications/styles.css'
import './style.css'

const SafePersistGate = ({ children }) => {
    const [PersistGate, setPersistGate] = React.useState(null)
    const [persistor, setPersistor] = React.useState(null)

    useEffect(() => {
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

// Server-Side Rendering
if (typeof window === 'undefined') {
    createServer((page) =>
        createInertiaApp({
            page,
            render: ReactDOMServer.renderToString,
            resolve: (name) => import(`./components/guest/${name}.jsx`),
            setup: ({ App, props }) => (
                <React.StrictMode>
                    <Provider store={store}>
                        <MantineProvider withGlobalStyles withNormalizeCSS withCSSVariables>
                            <Notifications />
                            <App {...props} />
                        </MantineProvider>
                    </Provider>
                </React.StrictMode>
            ),
        })
    )
} else {
    // Client-Side Hydration
    createInertiaApp({
        resolve: (name) => import(`./components/guest/${name}.jsx`),
        setup: async ({ App, props }) => {
            const rootElement = document.getElementById('app')

            if (!rootElement) {
                throw new Error('Root element #app not found')
            }

            ReactDOM.hydrateRoot(
                rootElement,
                <React.StrictMode>
                    <Provider store={store}>
                        <MantineProvider withGlobalStyles withNormalizeCSS withCSSVariables>
                            <Notifications />
                            <SafePersistGate>
                                <App {...props} />
                            </SafePersistGate>
                        </MantineProvider>
                    </Provider>
                </React.StrictMode>
            )
        },
    })
}
