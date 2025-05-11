import { Box, Typography, Button } from '@mui/material'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import React from 'react'

const ErrorMessage = () => {
  const handleReload = () => {
    window.location.reload()
  }

  return (
    <Box 
      display='flex'
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
      color='error.main'
      textAlign='center'
      sx={{ mt: 32 }}
    >
      <ErrorOutlineIcon sx={{ fontSize: 60, mb: 2 }} />
      <Typography variant='h5' fontWeight='bold'>
        Произошла ошибка
      </Typography>
      <Typography variant='body1' mt={1}>
        Что-то пошло не так. Попробуйте обновить страницу.
      </Typography>
      <Button variant='outlined' color='error' sx={{ mt: 3 }} onClick={handleReload}>
        Обновить
      </Button>
    </Box>
  )
}

export default ErrorMessage
