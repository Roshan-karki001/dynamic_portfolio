/**
 * full screen loader
 * @returns
 */
export default function LoadingScreen() {
    return (
        <>
            <style>
                {`

                    .spinner-wrapper{
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        height: 100vh;
                        margin: 0;
                        background-color: transparent;
                    }

                    .spinner {
                        width: 40px;
                        height: 40px;
                        border: 4px solid rgba(0, 0, 0, 0.1);
                        border-top: 4px solid #3498db;
                        border-radius: 50%;
                        animation: spin 1s linear infinite;
                    }

                    @keyframes spin {
                        0% {
                            transform: rotate(0deg);
                        }
                        100% {
                            transform: rotate(360deg);
                        }
                    }

                    `}
            </style>
            <div className="spinner-wrapper">
                <div className="spinner"></div>
            </div>
        </>
    )
}
