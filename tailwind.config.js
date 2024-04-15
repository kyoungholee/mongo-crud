/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './boards/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
          main : "url('../../public/money-bgimg.jpg')",
          signup : "url('../../public/signup-money-img.jpg')",
          whatMoney : "url('../../public/whatmoney.jpg')",
          savingpigmoney : "url('../../public/saving01.png')",
          growth : "url('../../public/growth.jpg')",
          coin : "url('../../public/coin.png')",
      },
    },
  },
  plugins: [],
}