import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        text: '#112047',
        breadcrumb: '#E2C108',
        sec: '#5965F9'
      },
      backgroundImage: {
        "footer-bg": "url('/assets/footer.jpg')",
        "header-bg": "url('/assets/bg-contact.jpg')",

      },
      fontFamily: {
        inter: ["'Inter', serif"],
        libre: ["'Libre Franklin', sans- serif"]
      },
    },
  },
  plugins: [],
}
export default config
