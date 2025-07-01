import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './Layout';
import MoviesPage from './pages/moviesPage/MoviesPage';
import MovieDetail from './pages/movieDetail/MovieDetail';
import ActorDetail from './pages/actorDetail/ActorDetail';
import { MOVIE_LISTS, TOP_LISTS } from '../constants';
import MoviesListTop from './pages/moviesListTop/MoviesListTop';
import MoviesListMain from './pages/moviesListMain/MoviesListMain';
import AuthPage from './pages/authPage/AuthPage';
import FavoritePage from './pages/favoritePage/FavoritePage';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <MoviesPage />,
        },
        ...TOP_LISTS.map((el) => ({
          path: el.url,
          element: <MoviesListTop />,
        })),
        ...MOVIE_LISTS.map((el) => ({
          path: el.url,
          element: <MoviesListMain />,
        })),
        {
          path: '/movie/:id',
          element: <MovieDetail />,
        },
        {
          path: '/actor/:id',
          element: <ActorDetail />,
        },
        {
          path: '/registration',
          element: <AuthPage isLogin={false} />,
        },
        {
          path: '/login',
          element: <AuthPage isLogin={true} />,
        },
        {
          path: '/favorites',
          element: <FavoritePage isLogin={true} />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;