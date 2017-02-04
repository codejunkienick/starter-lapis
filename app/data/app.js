import apiClient from './apiClient';

export default {
  load() {
    return apiClient.get('/app/load');
  },
};
