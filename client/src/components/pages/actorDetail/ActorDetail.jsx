import { useNavigate, useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import React from 'react'
import { useGetStaffByIdQuery } from '../../../services/kinopoiskApi'
import { 
  Box, 
  Button, 
  CircularProgress, 
  Grid, 
  Stack, 
  Typography, 
  Paper,
  Divider,
  Chip,
  Avatar
} from '@mui/material'
import ErrorMessage from '../../ui/errorMessage/ErrorMessage'
import { ArrowBack, Movie, Height, Cake, Info } from '@mui/icons-material'
import { styled } from '@mui/material/styles'

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: '16px',
  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.08)',
}))

const FilmItem = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.1)',
  },
}))

const ActorDetail = () => {
  const {id} = useParams()
  const navigate = useNavigate()

  const {data, isLoading, error} = useGetStaffByIdQuery(id)

  if (isLoading) {
    return (
      <Box display='flex' justifyContent="center" alignItems="center" height="100vh" margin="auto">
        <CircularProgress size='8rem' />
      </Box>
    )
  }

  if (error) return <ErrorMessage />

  return (
    <Box sx={{ maxWidth: '1400px', margin: '0 auto', p: 3 }}>
      <Button 
        startIcon={<ArrowBack />} 
        onClick={() => navigate(-1)}
        variant="outlined"
        sx={{ mb: 3 }}
      >
        Назад
      </Button>

      <StyledPaper elevation={0}>
        <Grid container spacing={4}>
          {/* Фото актера слева */}
          <Grid item xs={12} md={4}>
            <Box sx={{ 
              position: 'relative',
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.1)',
              height: '100%',
              minHeight: '400px'
            }}>
              <img 
                src={data.posterUrl} 
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block'
                }} 
                alt={data.nameRu} 
              />
            </Box>
          </Grid>

          {/* Информация об актере справа */}
          <Grid item xs={12} md={8}>
            <Stack spacing={3}>
              <Box>
                <Typography variant='h3' component="h1" fontWeight="600">
                  {data.nameRu}
                </Typography>
                <Typography variant='h5' color="text.secondary">
                  {data.nameEn}
                </Typography>
              </Box>

              <Paper variant="outlined" sx={{ p: 3, borderRadius: '12px' }}>
                <Typography variant='h5' gutterBottom fontWeight="500" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Info color="primary" /> Основная информация
                </Typography>
                
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
                        <Movie fontSize="small" />
                      </Avatar>
                      <Box>
                        <Typography variant="subtitle2" color="text.secondary">Карьера</Typography>
                        <Typography variant="body1">
                          {data.profession || 'Нет данных'}
                        </Typography>
                      </Box>
                    </Stack>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
                        <Height fontSize="small" />
                      </Avatar>
                      <Box>
                        <Typography variant="subtitle2" color="text.secondary">Рост</Typography>
                        <Typography variant="body1">
                          {data.growth ? `${data.growth} см` : 'Нет данных'}
                        </Typography>
                      </Box>
                    </Stack>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
                        <Cake fontSize="small" />
                      </Avatar>
                      <Box>
                        <Typography variant="subtitle2" color="text.secondary">Дата рождения</Typography>
                        <Typography variant="body1">
                          {data.birthday || 'Нет данных'} {data.age && `(${data.age} лет)`}
                        </Typography>
                      </Box>
                    </Stack>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
                        <Movie fontSize="small" />
                      </Avatar>
                      <Box>
                        <Typography variant="subtitle2" color="text.secondary">Всего фильмов</Typography>
                        <Typography variant="body1">
                          {data.films?.length || 0}
                        </Typography>
                      </Box>
                    </Stack>
                  </Grid>
                </Grid>
              </Paper>

              {data.facts?.length > 0 && (
                <Paper variant="outlined" sx={{ p: 3, borderRadius: '12px' }}>
                  <Typography variant='h5' gutterBottom fontWeight="500">
                    Интересные факты
                  </Typography>
                  <Stack spacing={2}>
                    {data.facts.map((fact, index) => (
                      <Box key={index} sx={{ display: 'flex', gap: 2 }}>
                        <Chip label={index + 1} color="primary" size="small" />
                        <Typography>{fact}</Typography>
                      </Box>
                    ))}
                  </Stack>
                </Paper>
              )}
            </Stack>
          </Grid>
        </Grid>

        {/* Фильмография внизу (на всю ширину) */}
        <Box mt={6}>
          <Typography variant='h4' component="h2" gutterBottom fontWeight="600">
            Фильмография
          </Typography>
          <Divider sx={{ mb: 3 }} />
          
          <Stack spacing={2}>
            {data.films
              .filter((item, index, self) => 
                index === self.findIndex(el => el.filmId === item.filmId)
              )
              .map((film, index) => (
                <FilmItem key={film.filmId} elevation={2}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                    <Typography variant="subtitle1" color="text.secondary">
                      {index + 1}
                    </Typography>
                    <Button 
                      component={Link} 
                      to={`/movie/${film.filmId}`}
                      sx={{ 
                        textTransform: 'none',
                        fontSize: '1rem',
                        fontWeight: '500'
                      }}
                    >
                      {film.nameRu || film.nameEn}
                    </Button>
                  </Box>
                  <Chip 
                    label={film.rating || '—'} 
                    color="primary" 
                    variant="outlined"
                  />
                </FilmItem>
              ))}
          </Stack>
        </Box>
      </StyledPaper>
    </Box>
  )
}

export default ActorDetail