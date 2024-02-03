import React from "react";
import { Route, Routes } from "react-router-dom";
import SignupPage from "../Pages/SignupPage";
import LoginPage from "../Pages/LoginPage";
import Notes from "../Pages/Notes";
import HomePage from "../Pages/HomePage";
import PrivateRoute from "./PrivateRoute";
import ForgotPassword from "../Pages/ForgotPassword";
import ResetPasswordPage from "../Pages/ResetPasswordPage";

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
      <Route
        path="/notes"
        element={
          <PrivateRoute>
            <Notes />
          </PrivateRoute>
        }
      />
     
    </Routes>
  );
};

export default MainRoutes;
