import {
    AutoAwesome,
    Favorite,
    FamilyRestroom,
    Castle,
    LiveTv,
    LocalMovies,
    MenuBook,
    MoodBad,
    Pool,
    Reorder,
    StarPurple500,
    VolunteerActivism,
} from '@mui/icons-material';

export const iconComponents = {
    AutoAwesome,
    Favorite,
    FamilyRestroom,
    Castle,
    LiveTv,
    LocalMovies,
    MenuBook,
    MoodBad,
    Pool,
    Reorder,
    StarPurple500,
    VolunteerActivism,
}

export const TOP_LISTS = [
    {
        title: 'ТОП 100 ПОПУЛЯРНЫХ ФИЛЬМОВ',
        icon: 'AutoAwesome',
        url: '/popular',
        value: 'TOP_POPULAR_MOVIES',
    },
    {
        title: 'ТОП 250 ЛУЧШИХ ФИЛЬМОВ',
        icon: 'StarPurple500',
        url: '/best',
        value: 'TOP_250_MOVIES',
    },
    {
        title: 'Вампиры',
        icon: 'Favorite',
        url: '/vampires',
        value: 'VAMPIRE_THEME',
    },
    {
        title: 'Комиксы',
        icon: 'MenuBook',
        url: '/comics',
        value: 'COMICS_THEME',
    },
    {
        title: 'Семейные',
        icon: 'FamilyRestroom',
        url: '/family',
        value: 'FAMILY',
    },
    {
        title: 'Романтика',
        icon: 'VolunteerActivism',
        url: '/romantic',
        value: 'LOVE_THEME',
    },
    {
        title: 'Зомби',
        icon: 'MoodBad',
        url: '/zombie',
        value: 'ZOMBIE_THEME',
    },
    {
        title: 'Катастрофы',
        icon: 'Pool',
        url: '/catastrophe',
        value: 'CATASTROPHE_THEME',
    },
    {
        title: 'Популярные сериалы',
        icon: 'LiveTv',
        url: '/popular-serials',
        value: 'POPULAR_SERIES',
    },
]

export const MOVIE_LISTS = [
    {
        title: 'Фильмы',
        icon: 'LocalMovies',
        url: '/films',
        value: 'FILM',
        genreId: ''
    },
    {
        title: 'Сериалы',
        icon: 'Reorder',
        url: '/serials',
        value: 'TV_SERIES',
        genreId: ''
    },
    {
        title: 'Мультфильмы',
        icon: 'Castle',
        url: '/cartoons',
        value: 'FILM',
        genreId: '18' 
    },
]