import { defineConfig } from "@pandacss/dev"

export default defineConfig({
    // Whether to use css reset
    preflight: true,
    
    // Where to look for your css declarations
    include: ["./app/**/*.{js,jsx,ts,tsx}", "./pages/**/*.{js,jsx,ts,tsx}"],

    // Files to exclude
    exclude: [],

    // Useful for theme customization
    theme: {
      extend: {}
    },

    // The output directory for your css system
    outdir: "styled-system",
    
    globalCss: {
      html: {
        h: 'full',
      },
      body: {
        bg: { base: 'white', _dark: '#2C2C2C' },
      },
    },
    jsxFramework: 'react',
    validation: 'error',
})