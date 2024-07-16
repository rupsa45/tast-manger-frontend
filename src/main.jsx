import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import MainLayout from "./layout/MainLayout.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login.jsx";
import SignUp from "./components/SignUp.jsx";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute.jsx";
import PublicRoute from "./ProtectedRoute/PublicRoute.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider>
      <BrowserRouter>
        <MainLayout>
          <Routes>

            
             {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<App />} />
            </Route>

            {/* Public Routes */}
            <Route element={<PublicRoute/>}>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
            </Route>


          </Routes>
        </MainLayout>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
);
