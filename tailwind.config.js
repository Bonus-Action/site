/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
        './src/packages/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            backgroundSize: {
                40: '40%',
            },
            fontFamily: {
                headings: ['Norse'],
            },
            maxWidth: {
                logo: '105px',
            },
            backgroundImage: {
                header: "url('/img/header.jpeg')",
                about: "url('/img/stain-about.png')",
            },
            colors: {
                primary: {
                    DEFAULT: '#005f69',
                    light: '#008d9c',
                },
                gray: '#232121',
                'primary-color': 'var(--primary-color)',
            },
        },
        fontFamily: {
            sans: ['"Nunito Sans", sans-serif'],
            sansSerif: ['"Nunito Sans", sans-serif'],
        },
    },
    plugins: [],
};
