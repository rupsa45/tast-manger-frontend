import axiosInstance from "./axiosConfig";
const API_TASKS_URL = import.meta.env.VITE_API_TASKS_URL;

const getAllTasks = async () => {
  const response = await axiosInstance.get(API_TASKS_URL);
  return response.data;
};

const createTask = async (task) => {
  const response = await axiosInstance.post(`${API_TASKS_URL}`, task);
  return response.data;
};

const updateTask = async (id, task) => {
  const response = await axiosInstance.put(`${API_TASKS_URL}/${id}`, task);
  return response.data;
};

const deleteTask = async (id) => {
  const response = await axiosInstance.delete(`${API_TASKS_URL}/${id}`);
  return response.data;
};

const getTask = async (id) => {
  const response = await axiosInstance.get(`${API_TASKS_URL}/${id}`);
  return response.data;
};

const getCompletedTasks = async () => {
  const response = await axiosInstance.get(`${API_TASKS_URL}/completed`);
  return response.data;
};

const getIncompleteTasks = async () => {
  const response = await axiosInstance.get(`${API_TASKS_URL}/incomplete`);
  return response.data;
};

export {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
  getTask,
  getCompletedTasks,
  getIncompleteTasks,
};
