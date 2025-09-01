/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inspiration: ["Inspiration", "sans-serif"],
        irish: ["Irish", "sans-serif"],
        tahoma: ["tahoma"],
        // Add more custom font families as needed
      },
      colors: {
        heladosCarol_color: "#E188B5",
        chocolate: "#a56150",
        fresa: "#E188B5",
        naranja: "#E98746",
        cremaLeche: "#F5F5DC",
        vainilla: "#F9E5BC",
        amarillo: '#F9A217',
        coco:'#ffffff'
      },
      backgroundImage: {
        'fondoLogin': "url('/images/cdn-3.expansion.webp')",
        
      }
         },
  },
  plugins: [],
};
