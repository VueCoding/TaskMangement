import api from "./axiosCall";

export const login = (data) => api.post('/login', data);
export const register = (data) => api.post('/register', data);
export const logout = () => api.post('/logout');

export const createTask = (data) => api.post('/create-task',data);
export const deleteTask = (id) => api.delete(`/delete-task/${id}`);
export const getTask = (page, status = 'All') => api.get(`/view-task?page=${page}&status=${status}`);
export const editTask = (id,data) => api.patch(`/edit-status/${id}`,data);
export const showTask = (id) => api.get(`/single-task/${id}`);