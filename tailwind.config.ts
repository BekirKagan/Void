import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'blue-chill': {
          '50': '#f2f9f9',
          '100': '#ddeff0',
          '200': '#bfe0e2',
          '300': '#92cace',
          '400': '#5faab1',
          '500': '#438e96',
          '600': '#3b757f',
          '700': '#356169',
          '800': '#325158',
          '900': '#2d464c',
          '950': '#1a2c32',
        },

        'amber': {
          '50': '#ffffea',
          '100': '#fffbc5',
          '200': '#fff885',
          '300': '#ffed46',
          '400': '#ffdf1b',
          '500': '#ffbf00',
          '600': '#e29300',
          '700': '#bb6802',
          '800': '#985008',
          '900': '#7c420b',
          '950': '#482200',
        },
      },
    }
  },
  plugins: []
};
export default config;
