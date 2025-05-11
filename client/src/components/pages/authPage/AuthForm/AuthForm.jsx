import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Typography, TextField, Button, Box } from '@mui/material';
import { Controller, useForm } from "react-hook-form";

const AuthForm = ({ isLogin }) => {
  const navigate = useNavigate();
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: '',
      password: '',
      login: ''
    }
  });

  const onSubmit = async (data) => {
    try {
      const endpoint = isLogin ? 'login' : 'registration';
      const response = await fetch(`http://localhost:5000/api/user/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || 'Ошибка сервера');
      }

      localStorage.setItem('token', result.token);
      navigate('/');
      window.location.reload();
      
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 4, p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        {isLogin ? 'Вход' : 'Регистрация'}
      </Typography>
      
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2 }}>
        {!isLogin && (
          <Controller
            name="login"
            control={control}
            rules={{ required: 'Обязательное поле' }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Логин"
                error={!!errors.login}
                helperText={errors.login?.message}
                fullWidth
                margin="normal"
                value={field.value || ''}
              />
            )}
          />
        )}

        <Controller
          name="email"
          control={control}
          rules={{ required: 'Обязательное поле' }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Email"
              type="email"
              error={!!errors.email}
              helperText={errors.email?.message}
              fullWidth
              margin="normal"
              value={field.value || ''}
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          rules={{ 
            required: 'Обязательное поле',
            minLength: {
              value: 6,
              message: 'Минимум 6 символов'
            }
          }}
          render={({ field }) => (
            <TextField
              {...field}
              type="password"
              label="Пароль"
              error={!!errors.password}
              helperText={errors.password?.message}
              fullWidth
              margin="normal"
              value={field.value || ''}
            />
          )}
        />

{isLogin ? (
  <Typography sx={{ mt: 2 }}>
    Нет аккаунта?{" "}
    <NavLink
      to="/registration"
      style={{color: '#5fa7b8' }}
    >
      Зарегистрируйся!
    </NavLink>
  </Typography>
) : (
  <Typography variant="body2" sx={{ mt: 2 }}>
    Уже есть аккаунт?{" "}
    <Typography component="span">
      <NavLink
        to="/login"
        style={{ color: '#5fa7b8' }}
      >
        Войдите!
      </NavLink>
    </Typography>
  </Typography>
)}
        <Button 
          type="submit" 
          variant="contained" 
          fullWidth 
          sx={{ mt: 3, mb: 2, py: 1.5 }}
          size="large"
        >
          {isLogin ? 'Войти' : 'Зарегистрироваться'}
        </Button>
      </Box>
    </Box>
  );
};

export default AuthForm;