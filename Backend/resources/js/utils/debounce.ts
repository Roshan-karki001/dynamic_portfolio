let timeoutId

/* debouncing inputs like search, price range */
export default function debounce(cb, delay = 1000) {
    if (timeoutId) {
        clearTimeout(timeoutId)
    }
    timeoutId = setTimeout(() => {
        cb()
    }, delay)
}
