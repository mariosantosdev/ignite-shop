import { globalCss } from '.'
import { Roboto } from 'next/font/google'

const roboto = Roboto({
  weight: '400',
})

export const globalStyles = globalCss({
  '*': {
    margin: 0,
    padding: 0,
    boxSizing: 'border-box',
  },

  body: {
    '-webkit-font-smoothing': 'antialiased',
    backgroundColor: '$gray900',
    color: '$gray100',
  },

  'body, input, textarea, button': {
    ...roboto.style,
  },
})
