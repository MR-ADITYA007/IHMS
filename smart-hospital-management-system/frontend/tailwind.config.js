import typography from '@tailwindcss/typography';
import containerQueries from '@tailwindcss/container-queries';
import animate from 'tailwindcss-animate';

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['index.html', 'src/**/*.{js,ts,jsx,tsx,html,css}'],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        border: 'oklch(var(--border))',
        input: 'oklch(var(--input))',
        ring: 'oklch(var(--ring) / <alpha-value>)',
        background: 'oklch(var(--background))',
        foreground: 'oklch(var(--foreground))',
        primary: {
          DEFAULT: 'oklch(var(--primary) / <alpha-value>)',
          foreground: 'oklch(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'oklch(var(--secondary) / <alpha-value>)',
          foreground: 'oklch(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'oklch(var(--destructive) / <alpha-value>)',
          foreground: 'oklch(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'oklch(var(--muted) / <alpha-value>)',
          foreground: 'oklch(var(--muted-foreground) / <alpha-value>)'
        },
        accent: {
          DEFAULT: 'oklch(var(--accent) / <alpha-value>)',
          foreground: 'oklch(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'oklch(var(--popover))',
          foreground: 'oklch(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'oklch(var(--card))',
          foreground: 'oklch(var(--card-foreground))'
        },
        chart: {
          1: 'oklch(var(--chart-1))',
          2: 'oklch(var(--chart-2))',
          3: 'oklch(var(--chart-3))',
          4: 'oklch(var(--chart-4))',
          5: 'oklch(var(--chart-5))'
        },
        sidebar: {
          DEFAULT: 'oklch(var(--sidebar))',
          foreground: 'oklch(var(--sidebar-foreground))',
          primary: 'oklch(var(--sidebar-primary))',
          'primary-foreground': 'oklch(var(--sidebar-primary-foreground))',
          accent: 'oklch(var(--sidebar-accent))',
          'accent-foreground': 'oklch(var(--sidebar-accent-foreground))',
          border: 'oklch(var(--sidebar-border))',
          ring: 'oklch(var(--sidebar-ring))'
        },
        /* Medical-specific semantic tokens */
        medical: {
          blue: {
            50:  'oklch(0.97 0.02 230)',
            100: 'oklch(0.93 0.04 230)',
            200: 'oklch(0.85 0.07 232)',
            300: 'oklch(0.74 0.10 234)',
            400: 'oklch(0.62 0.14 230)',
            500: 'oklch(0.50 0.14 238)',
            600: 'oklch(0.42 0.13 240)',
            700: 'oklch(0.35 0.12 240)',
            800: 'oklch(0.27 0.10 242)',
            900: 'oklch(0.20 0.07 244)',
          },
          gray: {
            50:  'oklch(0.98 0.005 240)',
            100: 'oklch(0.95 0.008 235)',
            200: 'oklch(0.91 0.01 232)',
            300: 'oklch(0.84 0.015 230)',
            400: 'oklch(0.72 0.02 228)',
            500: 'oklch(0.60 0.02 230)',
            600: 'oklch(0.48 0.025 232)',
          },
          emergency: 'oklch(0.52 0.22 25)',
          'emergency-dark': 'oklch(0.42 0.22 25)',
          'emergency-light': 'oklch(0.95 0.05 25)',
          success: 'oklch(0.55 0.15 160)',
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        xl: 'calc(var(--radius) + 4px)',
        '2xl': 'calc(var(--radius) + 8px)',
      },
      boxShadow: {
        xs: '0 1px 2px 0 rgba(0,0,0,0.05)',
        card: '0 2px 8px 0 oklch(0.35 0.12 240 / 0.08), 0 1px 2px 0 oklch(0.35 0.12 240 / 0.06)',
        'card-hover': '0 8px 24px 0 oklch(0.35 0.12 240 / 0.14), 0 2px 6px 0 oklch(0.35 0.12 240 / 0.08)',
        'hero': '0 20px 60px 0 oklch(0.35 0.12 240 / 0.25)',
        'btn': '0 2px 8px 0 oklch(0.35 0.12 240 / 0.30)',
        'btn-emergency': '0 2px 8px 0 oklch(0.52 0.22 25 / 0.35)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        },
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' }
        },
        'pulse-ring': {
          '0%, 100%': { boxShadow: '0 0 0 0 oklch(0.52 0.22 25 / 0.4)' },
          '50%': { boxShadow: '0 0 0 8px oklch(0.52 0.22 25 / 0)' }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-up': 'fade-up 0.6s ease-out forwards',
        'pulse-ring': 'pulse-ring 2s ease-in-out infinite',
      }
    }
  },
  plugins: [typography, containerQueries, animate]
};
