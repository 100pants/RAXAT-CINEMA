import { Stack, Typography } from '@mui/material'
import React from 'react'

const Footer = () => {
  return (
    <Stack
     component="footer"
      sx={{
        padding: 4,
        flexDirection: { sm: 'row' },
        justifyContent: { sm: 'space-between' },
        alignItems: { sm: 'center' },
        backgroundColor: 'background.paper',
        borderTop: '1px solid',
        borderColor: 'divider'
      }}
    >
          <Typography variant='body2' color='text.secondary'>&copy; {new Date().getFullYear()} &laquo;RAXAT-CINEMA&raquo; 18+ <br />
          Данный сайт создан исключительно в обучающих целях. <br />
          Все права принадлежат правообладателям.
          </Typography>

        <Typography variant='h5' color='primary.main'>RAXAT-CINEMA</Typography>
    </Stack>
  )
}

export default Footer