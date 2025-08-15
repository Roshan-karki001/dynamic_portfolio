export default function appendCurrency(amount: string | number): string {
    // Ensure the amount is a number and handle cases where it might be a string
    const num = typeof amount === 'string' ? parseFloat(amount) : amount

    if (isNaN(num)) {
        return '' // Return empty string if the value is not a valid number
    }

    // Format the number to 2 decimal places
    const formattedAmount = num.toFixed(2)

    // Define your currency symbol here, e.g., USD, EUR, INR
    const currencySymbol = '₹' // Replace with the symbol of your choice, e.g., '$' for USD

    // Return the formatted amount with the currency symbol
    return `${currencySymbol} ${formattedAmount}`
}
