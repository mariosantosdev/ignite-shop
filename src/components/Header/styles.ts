import { styled } from '~/styles'

export const HeaderWrapper = styled('header', {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',

  padding: '2rem 0',
  width: '100%',
  maxWidth: '74rem',
  margin: '0 auto',
})

export const IconButton = styled('button', {
  cursor: 'pointer',
  position: 'relative',
  border: 0,
  borderRadius: 6,
  padding: '1rem',
  backgroundColor: '$gray800',

  svg: {
    color: '$gray400',
  },

  variants: {
    hasItems: {
      true: {
        svg: {
          color: '$white',
        },
        '&::after': {
          content: '""',
          color: '$white',
          position: 'absolute',
          top: '-.5rem',
          right: '-.5rem',
          border: '5px solid $gray900',
          width: '1rem',
          height: '1rem',
          borderRadius: '50%',
          backgroundColor: '$green300',
        },
      },
    },
  },
})
