export const formatDate = (date: string | Date, format: string = 'dd/mm/yyyy'): string => {
    // Ensure the input date is a valid Date object
    const parsedDate = new Date(date)
    if (isNaN(parsedDate.getTime())) {
        throw new Error('Invalid date')
    }

    // Helper function to pad single digit numbers with a leading zero
    const pad = (num: number): string => (num < 10 ? '0' + num : num.toString())

    // Get individual components of the date
    const day = pad(parsedDate.getDate())
    const month = pad(parsedDate.getMonth() + 1) // Months are zero-indexed
    const year = parsedDate.getFullYear()
    const hours = pad(parsedDate.getHours())
    const minutes = pad(parsedDate.getMinutes())
    const seconds = pad(parsedDate.getSeconds())

    // Create the formatted date by replacing format placeholders with actual values
    let formattedDate = format
        .replace('dd', day)
        .replace('mm', month)
        .replace('yyyy', year.toString())
        .replace('hh', hours)
        .replace('mm', minutes) // Conflicts with month, so replace the minute part only
        .replace('ss', seconds)

    return formattedDate
}
