import apiClient from './apiClient';
export default {
  load(docName) {
    return apiClient.get('/app/load');
  },
};
