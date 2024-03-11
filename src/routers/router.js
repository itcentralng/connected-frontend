import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from '../layout/Layout';
import CreateMessage from '../pages/CreateMessage';
import Messages from '../pages/Messages';
import AddFiles from '../pages/AddFiles';
import LoginPage from '../pages/LoginPage';
import RegistrationPage from '../pages/RegistrationPage';

const ProtectedRoute = ({ children }) => {
  // Wrapper component for protected routes
  //   const isAuth = !!user;
  const isAuth = true;

  if (!isAuth) {
    return <Navigate to="/signin" replace />;
  }

  return children;
};

const Router = () => {
  return (
    <Routes>
      {/* <Route path="signin" element={<SignIn />} />
        <Route path="signup" element={<SignUp />} /> */}

      <Route
        // Shared pages
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route path="/" element={<AddFiles />} />
        <Route path="createMessage" element={<CreateMessage />} />
        <Route path="messages" element={<Messages />} />
        <Route path="LoginPage" element={<LoginPage />} />
        <Route path="RegistrationPage" element={<RegistrationPage />} />
      </Route>

      <Route path="*" element={<h1>404, page not found</h1>} />
    </Routes>
  );
};

export default Router;
