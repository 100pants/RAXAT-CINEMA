import React from 'react';
import AuthForm from '../authPage/AuthForm/AuthForm';
import { useLocation } from 'react-router-dom';

const AuthPage = () => {
  const location = useLocation();
  const isLogin = location.pathname === '/login';

  return <AuthForm isLogin={isLogin} />;
};

export default AuthPage;