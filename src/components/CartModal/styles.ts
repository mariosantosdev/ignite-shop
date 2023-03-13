import { styled, css } from '~/styles'

export const overlayClass = css({
  position: 'fixed',
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,

  display: 'flex',
  justifyContent: 'flex-end',
  backgroundColor: 'transparent',
})

export const contentClass = css({
  display: 'flex',
  flexDirection: 'column',
  overflowY: 'auto',
  position: 'fixed',
  top: 0,
  right: 0,
  width: '100%',
  height: '100vh',
  maxWidth: '30rem',
  background: '$gray800',
  padding: '3rem',
  borderRadius: '0.25rem',
  boxShadow: '-4px 0px 30px rgba(0, 0, 0, 0.8)',
})

export const Head = styled('header', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  marginBottom: '1.25rem',
  gap: '1rem',

  button: {
    cursor: 'pointer',
    alignSelf: 'flex-end',
    color: '$gray400',
    border: 'none',
    backgroundColor: 'transparent',
    lineHeight: 1,
  },

  h2: {
    fontSize: '$lg',
    fontWeight: 'bold',
  },
})

export const Content = styled('div', {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem',
  overflowY: 'auto',
})

export const Product = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',

  img: {
    background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
    borderRadius: '8px',
    width: '5.5rem',
    height: '5.5rem',
  },

  div: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '0.5rem',
    height: '100%',

    h3: { fontSize: '$md' },
    span: { fontSize: '$md', fontWeight: 'bold' },
    button: {
      marginTop: 'auto',
      cursor: 'pointer',
      border: 'none',
      backgroundColor: 'transparent',
      color: '$green300',
      fontWeight: 'bold',
    },
  },
})

export const Footer = styled('footer', {
  marginTop: '1.25rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem',

  button: {
    backgroundColor: '$green300',
    border: 0,
    color: '$white',
    borderRadius: 8,
    padding: '1.25rem',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '$md',

    transition: 'filter 0.2s',

    '&:not(:disabled):hover': {
      filter: 'brightness(0.9)',
    },
  },
})

export const ListInfo = styled('ul', {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
})

export const ItemInfo = styled('li', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',

  variants: {
    type: {
      total: {
        fontSize: '$lg',
        fontWeight: 'bold',
      },
    },
  },
})
