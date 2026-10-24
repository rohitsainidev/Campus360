import api from './api';

export const complaintService = {
  /**
   * Fetch all complaints (role-filtered by backend)
   */
  async getComplaints(params = {}) {
    try {
      const response = await api.get('/complaints', { params });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Create a new complaint ticket
   */
  async createComplaint(data) {
    try {
      const response = await api.post('/complaints', data);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Update complaint status, assign staff, or add resolution note
   */
  async updateStatus(id, data) {
    try {
      const response = await api.patch(`/complaints/${id}`, data);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
};

export default complaintService;
