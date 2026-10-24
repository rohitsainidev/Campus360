import api from './api';

export const noticeService = {
  // Get notices with optional category, audience, search filters
  getNotices: async (params = {}) => {
    const response = await api.get('/notices', { params });
    return response.data;
  },

  // Create new announcement (Admin / Teacher)
  createNotice: async (noticeData) => {
    const response = await api.post('/notices', noticeData);
    return response.data;
  },

  // Toggle pin on notice (Admin)
  togglePin: async (id) => {
    const response = await api.patch(`/notices/${id}/pin`);
    return response.data;
  },

  // Delete notice (Admin)
  deleteNotice: async (id) => {
    const response = await api.delete(`/notices/${id}`);
    return response.data;
  },
};

export default noticeService;
