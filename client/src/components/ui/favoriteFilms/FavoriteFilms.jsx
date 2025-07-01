import { CircularProgress } from "@mui/material";
import ErrorMessage from "../errorMessage/ErrorMessage";
import MovieCard from "../movieCard/MovieCard";
import { useGetFilmQuery } from "../../../services/kinopoiskApi";

const FavoriteFilmItem = ({ id }) => {
  const { data: film, error, isLoading } = useGetFilmQuery(id);
  
  if (error) return null;
  if (!film) return null;
  
  return <MovieCard movie={film} />;
};

export const FavoriteFilms = ({ ids }) => {
  const idList = ids.split(',').filter(id => id.trim() !== '');
  
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
      gap: '20px',
      padding: '20px'
    }}>
      {idList.map(id => (
        <FavoriteFilmItem key={id} id={id} />
      ))}
    </div>
  );
};