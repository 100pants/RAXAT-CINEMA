import { useNavigate, useParams, Link as RouterLink } from 'react-router-dom'
import React, { useContext } from 'react'
import IconButton from '@mui/material/IconButton';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { 
  useGetFilmQuery, 
  useGetSequelsAndPrequelsQuery, 
  useGetStuffQuery 
} from '../../../services/kinopoiskApi'
import { 
  useGetLikesQuery,
  useSetLikeMutation,
  useSetDislikeMutation
} from '../../../services/likesApi'
import { 
  Box, 
  Button, 
  ButtonGroup, 
  CircularProgress, 
  Typography,
  Chip,
  Link
} from '@mui/material'
import ErrorMessage from '../../ui/errorMessage/ErrorMessage'
import { ArrowBack, Language, Movie } from '@mui/icons-material'
import MovieCard from '../../ui/movieCard/MovieCard'
import './MovieDetail.scss'
import BearCarousel from 'bear-react-carousel'
import VideoPlayer from '../../../videoPlayer/VideoPlayer'
import { ColorModeContext } from '../../../context/ToggleColorMode'

const MovieDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { mode } = useContext(ColorModeContext)
  const { data: likesData = {}, refetch: refetchLikes } = useGetLikesQuery(id)
  const [setLike] = useSetLikeMutation()
  const [setDislike] = useSetDislikeMutation()
  
  const responseFilm = useGetFilmQuery(id)
  const responseSequelsAndPrequels = useGetSequelsAndPrequelsQuery(id)
  const responseStuff = useGetStuffQuery(id)

  const handleLike = async () => {
    try {
      await setLike(id).unwrap()
      refetchLikes()
    } catch (err) {
      console.error('Ошибка при установке лайка:', err)
    }
  }

  const handleDislike = async () => {
    try {
      await setDislike(id).unwrap()
      refetchLikes()
    } catch (err) {
      console.error('Ошибка при установке дизлайка:', err)
    }
  }

  if (responseFilm.isLoading || responseStuff.isLoading) {
    return (
      <Box display='flex' alignItems='center' justifyContent='center' className="loading-container">
        <CircularProgress size='6rem'/>
      </Box>
    )
  }

  if (responseFilm.error || responseStuff.error) {
    return <ErrorMessage />
  }

  return (
    <>
      <Button 
        startIcon={<ArrowBack />} 
        onClick={() => navigate(-1)}
        className="back-button"
        variant="outlined"
      />
      <div className={`movie-detail-container ${mode}`}>
        <div className="movie-main-content">
          <div className="poster-section">
            <img 
              src={responseFilm.data.posterUrl}
              alt={responseFilm.data.nameRu}
              className="movie-poster"
            />
            <span>{likesData.likes || 0}</span>
            <IconButton 
              onClick={handleLike}
              disabled={likesData.userReaction === true}
            >
              <ThumbUpIcon sx={{ color: likesData.userReaction === true ? '#4f9c60' : 'inherit' }} />
            </IconButton>

            <span>{likesData.dislikes || 0}</span>
            <IconButton 
              onClick={handleDislike}
              disabled={likesData.userReaction === false}
            >
              <ThumbDownIcon color={likesData.userReaction === false ? 'error' : 'inherit'}/>
            </IconButton>
          </div>

          <div className="info-section">
            <Typography variant="h3" className="movie-title">
              {responseFilm.data.nameRu}
            </Typography>

            <div className="movie-meta">
              <div className="meta-row">
                <span className="meta-label">Год:</span>
                <span className="meta-value">{responseFilm.data.year}</span>
              </div>

              <div className="meta-row">
                <span className="meta-label">Время:</span>
                <span className="meta-value">
                  {responseFilm.data.filmLength ? `${responseFilm.data.filmLength} мин` : '-'}
                </span>
              </div>

              <div className="meta-row">
                <span className="meta-label">Страна:</span>
                <span className="meta-value">
                  {responseFilm.data.countries.map(({country}) => country).join(', ')}
                </span>
              </div>

              <div className="meta-row">
                <span className="meta-label">Жанры:</span>
                <span className="meta-value genres">
                  {responseFilm.data.genres.map(({genre}) => (
                    <Chip label={genre} key={genre} className="genre-chip"/>
                  ))}
                </span>
              </div>

              <div className="meta-row">
                <span className="meta-label">Режиссеры:</span>
                <span className="meta-value">
                  {responseStuff.data.filter(el => el.professionText === 'Режиссеры').map(({nameRu}) => nameRu).join(', ')}
                </span>
              </div>
            </div>

            <ButtonGroup className="action-buttons">
              <Button 
                target="_blank" 
                href={responseFilm.data.webUrl} 
                startIcon={<Language />}
                className="kinopoisk-button"
                variant="contained"
              >
                Кинопоиск
              </Button>
              {responseFilm.data.imdbId && (
                <Button 
                  target="_blank" 
                  href={`https://www.imdb.com/title/${responseFilm.data.imdbId}`} 
                  startIcon={<Movie />}
                  className="imdb-button"
                  variant="contained"
                >
                  IMDB
                </Button>
              )}
            </ButtonGroup>
          </div>
        </div>

        <div className="description-section">
          <Typography variant="h4" className="section-title">Описание</Typography>
          <Typography className="description-text">
            {responseFilm.data.description || 'Описание отсутствует'}
          </Typography>
        </div>

        <div className="actors-section">
          <Typography variant="h4" className="section-title">В главных ролях</Typography>
          <div className="actors-grid">
            {responseStuff.data.filter(el => el.professionText === 'Актеры')
              .slice(0, 14)
              .map(({nameRu, staffId}) => (
                <Link 
                  component={RouterLink} 
                  to={`/actor/${staffId}`} 
                  key={staffId} 
                  className="actor-card"
                >
                  {nameRu}
                </Link>
              ))}
          </div>
        </div>

        <div className="player-placeholder">
          <div className="placeholder-content">
            <VideoPlayer />
          </div>
        </div>


        <div className="sequels-section">
       
          {responseSequelsAndPrequels.data?.length > 0 && (
            <React.Fragment>
            <Typography variant="h4" className="section-title">Сиквелы и приквелы</Typography>
            <BearCarousel
              data={responseSequelsAndPrequels.data?.map(movie => (
                <div key={movie.filmId} style={{padding: '0 8px'}}>
                  <MovieCard movie={movie} />
                </div>
              ))}
              slidesPerView={1}
              slidesPerGroup={1}
              isEnableNavButton={true}
              isEnableLoop={false}
              isEnableAutoPlay={false}
              spaceBetween={16}
              isEnableMouseMove={true}
              isEnablePagination={false}
              breakpoints={{
                375: { slidesPerView: 1, slidesPerGroup: 1 },
                768: { slidesPerView: 3, slidesPerGroup: 3, spaceBetween: 20 },
                1024: { slidesPerView: 5, slidesPerGroup: 5 }
              }}
              style={{width: '100%'}}
            />
            </React.Fragment>
          )}
        </div>
      </div>
    </>
  )
}

export default MovieDetail