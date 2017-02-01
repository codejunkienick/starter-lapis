import apiClient from './apiClient';
export default {

  login(data) {
    return apiClient.post('/user/login', { data });
  },
};
