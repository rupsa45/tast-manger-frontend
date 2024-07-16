import axiosInstance from "./axiosConfig";
const API_USERS_URL = import.meta.env.VITE_API_USERS_URL;

export const signUp = async (userData) => {
  try {
    const response = await axiosInstance.post(
      `${API_USERS_URL}/signup`,
      userData
    );
    localStorage.setItem('token', response.data.token);
    return response.data;
  } catch (error) {
    console.error("Error signing up:", error);
    throw error;
  }
};

export const login = async (credentials) => {
  try {
    const response = await axiosInstance.post(
      `${API_USERS_URL}/signin`,
      credentials
    );
    localStorage.setItem('token', response.data.token);
    return response.data;
  } catch (error) {
    console.error("Error signing in:", error);
    throw error;
  }
};

export const logout = async () => {
  try {
    const response = await axiosInstance.post(`${API_USERS_URL}/logout`);
    localStorage.removeItem('token');
    return response.data;
  } catch (error) {
    console.error('Error logging out:', error);
    throw error;
  }
};

export const getMe=async()=>{
  try {
    const response = await axiosInstance.get(`${API_USERS_URL}/me`)
    return response.data;
  } catch (error) {
    console.error('Error getting me:', error);
    throw error;
  }
}