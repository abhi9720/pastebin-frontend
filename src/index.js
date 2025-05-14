import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from './pages/LoginPage';
import GoogleCallbackPage from './pages/GoogleCallbackPage';
import PrivateRoute from './util/PrivateRoute';
import { Toaster } from 'react-hot-toast';

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/auth/google/callback" element={<GoogleCallbackPage />} />

        <Route
          path="/pastes"
          element={
            <PrivateRoute>
              <App />
            </PrivateRoute>
          }
        />
        <Route
          path="/pastes/:pasteId"
          element={
            <PrivateRoute>
              <App />
            </PrivateRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);