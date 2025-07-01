import { useNavigate, useParams, Link as RouterLink } from 'react-router-dom';
import React, { useContext } from 'react';
import IconButton from '@mui/material/IconButton';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import {
  useGetFilmQuery,
  useGetSequelsAndPrequelsQuery,
  useGetStuffQuery,
} from '../../../services/kinopoiskApi';
import {
  useGetLikesQuery,
  useSetLikeMutation,
  useSetDislikeMutation,
} from '../../../services/likesApi';
import {
  useGetFavoritesQuery,
  useAddFavoriteMutation,
  useRemoveFavoriteMutation,
} from '../../../services/favoritesApi';
import {
  Box,
  Button,
  ButtonGroup,
  CircularProgress,
  Typography,
  Chip,
  Link,
  Snackbar,
  Tooltip,
} from '@mui/material';
import ErrorMessage from '../../ui/errorMessage/ErrorMessage';
import { ArrowBack, Language, Movie } from '@mui/icons-material';
import MovieCard from '../../ui/movieCard/MovieCard';
import './MovieDetail.scss';
import BearCarousel from 'bear-react-carousel';
import VideoPlayer from '../../../videoPlayer/VideoPlayer';
import { ColorModeContext } from '../../../context/ToggleColorMode';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

const MovieDetail = () => {

  const pageVariants = {
    initial: { opacity: 0, x: -100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 100 }
  };

  const { id } = useParams();
  const navigate = useNavigate();
  const { mode } = useContext(ColorModeContext);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { data: likesData, error: likesError, refetch: refetchLikes } = useGetLikesQuery(id);
  const [setLike, { error: likeError }] = useSetLikeMutation();
  const [setDislike, { error: dislikeError }] = useSetDislikeMutation();
  const { data: favorites, error: favoritesError } = useGetFavoritesQuery(undefined, {
    skip: !isAuthenticated,
  });
  const [addFavorite, { error: addFavoriteError, isLoading: isAddingFavorite }] = useAddFavoriteMutation();
  const [removeFavorite, { error: removeFavoriteError, isLoading: isRemovingFavorite }] = useRemoveFavoriteMutation();

  const responseFilm = useGetFilmQuery(id);
  const responseSequelsAndPrequels = useGetSequelsAndPrequelsQuery(id);
  const responseStuff = useGetStuffQuery(id);

  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');

  const isFavorite = favorites?.some((fav) => fav.kinopoiskId === parseInt(id));

  React.useEffect(() => {
    if (likesError) {
      setSnackbarMessage('Ошибка загрузки лайков: ' + (likesError.data?.message || 'Серверная ошибка'));
      setSnackbarOpen(true);
    }
    if (favoritesError) {
      setSnackbarMessage('Ошибка загрузки избранного: ' + (favoritesError.data?.message || 'Серверная ошибка'));
      setSnackbarOpen(true);
    }
    if (likeError || dislikeError || addFavoriteError || removeFavoriteError) {
      console.error('Ошибка API:', { likeError, dislikeError, addFavoriteError, removeFavoriteError });
      const error = likeError || dislikeError || addFavoriteError || removeFavoriteError;
      setSnackbarMessage(
        `Ошибка ${error.status || 'неизвестна'}: ${error.data?.message || 'Серверная ошибка'}`
      );
      setSnackbarOpen(true);
    }
  }, [likesError, favoritesError, likeError, dislikeError, addFavoriteError, removeFavoriteError]);

  const handleLike = async () => {
    if (!isAuthenticated) {
      setSnackbarMessage('Пожалуйста, зарегистрируйтесь, чтобы поставить лайк');
      setSnackbarOpen(true);
      setTimeout(() => {
        navigate('/registration');
      }, 2000);
      return;
    }
    
    try {
      if (likesData?.userReaction === true) {
        await setDislike(id).unwrap();
        setSnackbarMessage('Лайк удален');
      } else {
        await setLike(id).unwrap();
        setSnackbarMessage(likesData?.userReaction === false ? 'Лайк заменен на дизлайк' : 'Лайк поставлен');
      }
      refetchLikes();
      setSnackbarOpen(true);
    } catch (err) {
      console.error('Ошибка при изменении лайка:', err);
      setSnackbarMessage(`Ошибка ${err.status || 'неизвестна'}: ${err.data?.message || 'Серверная ошибка'}`);
      setSnackbarOpen(true);
    }
  };

  const handleDislike = async () => {
    if (!isAuthenticated) {
      setSnackbarMessage('Пожалуйста, зарегистрируйтесь, чтобы поставить дизлайк');
      setSnackbarOpen(true);
      setTimeout(() => {
        navigate('/registration');
      }, 2000);
      return;
    }
    try {
      await setDislike(id).unwrap();
      refetchLikes();
      setSnackbarMessage('Дизлайк поставлен');
      setSnackbarOpen(true);
    } catch (err) {
      console.error('Ошибка при установке дизлайка:', err);
      setSnackbarMessage(`Ошибка ${err.status || 'неизвестна'}: ${err.data?.message || 'Серверная ошибка'}`);
      setSnackbarOpen(true);
    }
  };

  const handleFavoriteToggle = async () => {
    if (!isAuthenticated) {
      setSnackbarMessage('Пожалуйста, зарегистрируйтесь, чтобы добавить в избранное');
      setSnackbarOpen(true);
      setTimeout(() => {
        navigate('/registration');
      }, 2000);
      return;
    }
    try {
      if (isFavorite) {
        await removeFavorite(id).unwrap();
        setSnackbarMessage('Фильм удален из избранного');
      } else {
        await addFavorite(id).unwrap();
        setSnackbarMessage('Фильм добавлен в избранное');
      }
      setSnackbarOpen(true);
    } catch (err) {
      console.error('Ошибка при изменении избранного:', err);
      setSnackbarMessage(
        `Ошибка ${err.status || 'неизвестна'}: ${err.data?.message || 'Не удалось изменить избранное'}`
      );
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  if (responseFilm.isLoading || responseStuff.isLoading) {
    return (
      <Box display="flex" alignItems="center" justifyContent="center" className="loading-container">
        <CircularProgress size="6rem" />
      </Box>
    );
  }

  if (responseFilm.error || responseStuff.error) {
    return <ErrorMessage />;
  }

  return (
    <>
    <motion.div
  initial="initial"
  animate="animate"
  exit="exit"
  variants={pageVariants}
  transition={{ duration: 0.5 }}
  className={`movie-detail-container ${mode}`}
>

<Button
  startIcon={<ArrowBack />}
  onClick={() => navigate(-1)}
  variant="outlined"
  sx={{
    minHeight: '32px', 
    padding: '4px 12px', 
    fontSize: '0.8125rem', 
    lineHeight: 1.5, 
    '& .MuiButton-startIcon': {
      marginRight: '4px', 
      marginLeft: '-2px'
    }
  }}
>
  Назад
</Button>
      <div className={`movie-detail-container ${mode}`}>
        <div className="movie-main-content">
          <div className="poster-section">
            <img
              src={responseFilm.data.posterUrl}
              alt={responseFilm.data.nameRu}
              className="movie-poster"
            />
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <span>{likesData?.likes || 0}</span>
              <Tooltip title={isFavorite ? 'Убрать лайк' : 'Добавить лайк'}>
              <IconButton
                onClick={handleLike}
                disabled={isAuthenticated && likesData?.userReaction === true}
              >
                <ThumbUpIcon sx={{ color: likesData?.userReaction === true ? '#4f9c60' : 'inherit' }} />
              </IconButton>
              </Tooltip>
              <span>{likesData?.dislikes || 0}</span>
              <Tooltip title={isFavorite ? 'Убрать дизлайк' : 'Добавить дизлайк'}>
              <IconButton
                onClick={handleDislike}
                disabled={isAuthenticated && likesData?.userReaction === false}
              >
                <ThumbDownIcon color={likesData?.userReaction === false ? 'error' : 'inherit'} />
              </IconButton>
              </Tooltip>
              <Tooltip title={isFavorite ? 'Удалить из избранного' : 'Добавить в избранное'}>
                <IconButton
                  onClick={handleFavoriteToggle}
                  disabled={isAddingFavorite || isRemovingFavorite}
                  sx={{
                    '&:hover': {
                      transform: 'scale(1.2)',
                      transition: 'transform 0.2s ease-in-out',
                    },
                  }}
                >
                  {isFavorite ? (
                    <FavoriteIcon sx={{ color: '#ff0000' }} />
                  ) : (
                    <FavoriteBorderIcon />
                  )}
                </IconButton>
              </Tooltip>
            </Box>
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
                  {responseFilm.data.countries.map(({ country }) => country).join(', ')}
                </span>
              </div>
              <div className="meta-row">
                <span className="meta-label">Жанры:</span>
                <span className="meta-value genres">
                  {responseFilm.data.genres.map(({ genre }) => (
                    <Chip label={genre} key={genre} className="genre-chip" />
                  ))}
                </span>
              </div>
              <div className="meta-row">
                <span className="meta-label">Режиссеры:</span>
                <span className="meta-value">
                  {responseStuff.data
                    .filter((el) => el.professionText === 'Режиссеры')
                    .map(({ nameRu }) => nameRu)
                    .join(', ')}
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
            {responseStuff.data
              .filter((el) => el.professionText === 'Актеры')
              .slice(0, 14)
              .map(({ nameRu, staffId }) => (
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
                data={responseSequelsAndPrequels.data?.map((movie) => (
                  <div key={movie.filmId} style={{ padding: '0 8px' }}>
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
                  1024: { slidesPerView: 5, slidesPerGroup: 5 },
                }}
                style={{ width: '100%' }}
              />
            </React.Fragment>
          )}
        </div>
      </div>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
      />
      </motion.div>
    </>
  );
};

export default MovieDetail;