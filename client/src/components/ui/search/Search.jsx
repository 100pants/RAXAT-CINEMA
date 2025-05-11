import { Autocomplete, CircularProgress, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useGetFilmsQuery } from '../../../services/kinopoiskApi'
import { useDispatch, useSelector } from 'react-redux'
import { setSearchQuery } from '../../../features/searchQuerySlice'
import './Search.scss'
import { useNavigate } from 'react-router-dom'

const movieTypes = {
    FILM: 'Фильм',
    TV_SERIES: 'Сериал',
    TV_SHOW: 'ТВ-Шоу',
    MINI_SERIES: 'Мини-сериал'
}

const Search = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [input, setInput] = useState('')

    const {
        countries, 
        genreId,
        order,
        type,
        year,
        page,
        keyword
    } = useSelector(state => state.searchQuery)

    useEffect(() => {
        const setTimeoutId = setTimeout(() => {
            dispatch(setSearchQuery({ keyword: input }))
        }, 400)

        return () => clearTimeout(setTimeoutId)
    }, [input, dispatch])

    const { data, isFetching } = useGetFilmsQuery({
        countries,
        genreId,
        order,
        type,
        year,
        page,
        keyword
    })

    return (
        <Autocomplete
            freeSolo
            sx={{
                borderRadius: 5,
                width: 400,
                backgroundColor: 'rgba(255,255,255, 0.15)',
                '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                        border: 'none',
                    },
                },
            }}
            options={data?.items || []}
            getOptionLabel={(option) => 
                typeof option === 'string' 
                    ? option 
                    : `${option.nameRu || option.nameEn} - ${movieTypes[option.type]} - ${option.year}`
            }
            onInputChange={(_, value) => {
                setInput(value)
            }}
            onChange={(_, value) => {
                if (value && value.kinopoiskId) {
                    navigate(`/movie/${value.kinopoiskId}`)
                }
            }}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Поиск"
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <React.Fragment>
                                {isFetching ? (
                                    <CircularProgress size={20} color="inherit" />
                                ) : null}
                                {params.InputProps.endAdornment}
                            </React.Fragment>
                        ),
                    }}
                />
            )}
        />
    )
}

export default Search