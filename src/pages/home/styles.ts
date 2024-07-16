import { styled, Heading, Text } from '@ignite-ui/react'

export const Container = styled('div', {
  maxWidth: 'calc(100vw - (100vw - 600px) / 2)',
  marginLeft: 'auto',
  minWidth: '100vw',
  paddingLeft: '$20',
  height: '100vh',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '$20',
})

export const Hero = styled('div', {
  maxWidth: 480,
  padding: '0 $10',

  [`${Heading}`]: {
    '@media(max-width: 600px)': {
      fontSize: '$6xl',
    },
  },

  [`${Text}`]: {
    maskType: '$2',
    color: '$gray200',
  },
})

export const Preview = styled('div', {
  overflow: 'hidden',

  '@media(max-width: 600px)': {
    display: 'none',
  },
})
