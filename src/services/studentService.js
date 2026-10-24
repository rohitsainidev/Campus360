import api from './api';

export const studentService = {
  /**
   * Get student dashboard summary stats
   */
  async getDashboard() {
    try {
      const response = await api.get('/student/dashboard');
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Get student attendance details
   */
  async getAttendance() {
    try {
      const response = await api.get('/student/attendance');
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Get all assignments with student submission status
   */
  async getAssignments() {
    try {
      const response = await api.get('/student/assignments');
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Submit an assignment
   */
  async submitAssignment(assignmentId, data) {
    try {
      const response = await api.post(`/student/assignments/${assignmentId}/submit`, data);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
};

export default studentService;
