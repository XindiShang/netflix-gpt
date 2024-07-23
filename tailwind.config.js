import daisyui from 'daisyui';

// eslint-disable-next-line no-undef
module.exports = {
  content: ['./src/**/*.tsx'],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        netflix: {
          primary: '#E50914',
          'primary-focus': '#E50914',
          'primary-content': '#ffffff',
          secondary: '#000000',
          'secondary-focus': '#E50914',
          // 'secondary-focus': '#f1f5f94c',
          'secondary-content': '#ffffff',
          accent: '#E50914',
          'accent-focus': '#E50914',
          'accent-content': '#ffffff',
          neutral: '#1F2937',
          'neutral-focus': '#1F2937',
          'neutral-content': '#ffffff',
          'base-100': '#ffffff',
          'base-200': '#f9fafb',
          'base-300': '#d1d5db',
          'base-content': '#1f2937',
          info: '#2094f3',
          success: '#009485',
          warning: '#ff9900',
          error: '#ff5724',
        },
      },
    ],
  },
};
