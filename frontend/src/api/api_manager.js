import axios from 'axios';
axios.defaults.withCredentials = true; // Ovo treba staviti zbog bug-a u axiosu kod slanja cookie pri api pozivu

const API = axios.create({ baseURL: 'http://localhost:2000' });

// USERS API CALLS
export const login_user = (data) => API.post('/api/users/login', data);
export const check_cookie = () => API.post('/api/users/auth/check-cookie');
export const logout_user = () => API.post('/api/users/logout');
export const get_all_users = () => API.get('/api/users/get-users');
export const add_new_user = (data) => API.post('/api/users/admin/add-user',data);
export const remove_user = (userId) => API.post(`/api/users/admin/remove-user/${userId}`);