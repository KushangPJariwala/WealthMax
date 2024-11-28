/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { Routes as ReactRoutes, Route, Navigate } from "react-router-dom";
import LandingPage from "../components/landing page";
import Login from "../components/auth/Login";
import Layout from "../components/common/Layout";
import Signup from "../components/auth/Signup";
import AuthLayout from "../components/auth/AuthLayout";
import Dashboard from "../components/dashboard";
import Cookies from "js-cookie";
import WatchList from "../components/watchlist";
import StockDetails from "../components/stockDetails";
import BankDetails from "../components/bank/BankDetails";
import AddBank from "../components/bank/AddBank";
export default function Routes() {
  const ProtectedRoute = ({ children }) => {
    const token = Cookies.get("token");
    return token ? children : <Navigate to="/login" replace />;
  };
  const PublicRoute = ({ children }) => {
    const token = Cookies.get("token");
    return token ? <Navigate to="/" replace /> : children;
  };
  return (
    <ReactRoutes>
      <Route
        path="/"
        element={
          <Layout>
            <LandingPage />
          </Layout>
        }
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Layout>
              <Dashboard />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/marketDetails/:symbol"
        element={
          <ProtectedRoute>
            <Layout>
              <StockDetails />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/watchlist"
        element={
          <ProtectedRoute>
            <Layout>
              <WatchList />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/bank-details"
        element={
          <ProtectedRoute>
            <Layout>
              <BankDetails />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/add-bank"
        element={
          <ProtectedRoute>
            <Layout>
              <AddBank />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/login"
        element={
          <PublicRoute>
            <AuthLayout>
              <Login />
            </AuthLayout>
          </PublicRoute>
        }
      />
      <Route
        path="/signup"
        element={
          <PublicRoute>
            <AuthLayout>
              <Signup />
            </AuthLayout>
          </PublicRoute>
        }
      />
    </ReactRoutes>
  );
}
