const defaultTheme = require("tailwindcss/defaultTheme");
const withMT = require("@material-tailwind/react/utils/withMT");

/** @type {import('tailwindcss').Config} */
module.exports = withMT({
    content: [
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/views/**/*.blade.php",
        "./resources/js/**/*.jsx",
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ["Figtree", ...defaultTheme.fontFamily.sans],
            },
        },
        colors: {
            "tag-green": "#256525",
            "tag-light-green": "#30c0a8",
            "tag-red": "#c72a1c",
            "tag-bright-red": "#ff3b54",
            "tag-dark-red": "#4c0805",
            "tag-orange": "#ffb057",
            "tag-bright-orange": "#fe7b4d",
        },
        minHeight: {
            10: "40px",
        },
    },

    plugins: [require("@tailwindcss/forms")],
});
