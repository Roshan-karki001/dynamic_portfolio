// Tailwind CSS configuration

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './resources/views/**/*.blade.php',
        './resources/js/**/*.vue',
        // "./resources/js/**/*.{js,jsx,ts,tsx}",
        // "./resources/js/components/layout/VisitorLayout.jsx",
        './resources/js/components/**/*.{js,jsx,ts,tsx}',
        '!./resources/js/components/admin**/*.{js,jsx,ts,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                primary: '#276749',
                brandDark: '#151616',
                secondary: '#1c2434',
                strokedark: '#2E3A47',
            },
            fontFamily: {
                poppins: ['Poppins', 'sans-serif'],
                varela: ['Verela Round', 'sans-serif'],
            },
            container: {
                center: true,
                padding: {
                    DEFAULT: '1rem',
                    sm: '2rem',
                    lg: '4rem',
                    xl: '5rem',
                    '2xl': '6rem',
                },
            },
        },
    },
    plugins: [],
}
