/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
     "./src/**/*.{html,ts}",
     "./node_modules/flowbite/**/*.js"
  ],
  safelist: [
  'dark',
  'dark:bg-gray-600',
  'dark:text-gray-300'
],

  theme: {
    extend: {},
  },
  darkMode: 'class',
  plugins: [require('flowbite/plugin')],
}

