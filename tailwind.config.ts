import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      grey10: '#F6F8FC',
      grey20: '#F1F4F9',
      grey30: '#E2E8F0',
      grey40: '#CBD4E1',
      grey50: '#94A3B8',
      grey60: '#64748B',
      grey70: '#475569',
      grey80: '#27364B',
      grey90: '#1E2A3B',
      grey100: '#0F1A2A',
      grey01: '#FCFCFD',
      blue10: '#D3E1FE',
      blue20: '#7EA5F8',
      blue40: '#4D82F3',
      blue60: '#2563EB',
      blue80: '#0037B3',
      blue100: '#002987',
      red10: '#FFD3DD',
      red60: '#FF345F',
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      boxShadow: {
        'soft-shadow': '0px 1.7px 22.32px 0px rgba(0, 0, 0, 0.05)',
        'boarding-shadow': '0px 0px 20px 0px rgba(65, 76, 97, 0.07)',
      },
    },
  },
  plugins: [],
}
export default config
