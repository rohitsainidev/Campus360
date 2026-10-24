import api from './api';

export const examService = {
  // Get public/student exam timetable
  getTimetable: async () => {
    const response = await api.get('/exams/timetable');
    return response.data;
  },

  // Get student's verified hall ticket
  getHallTicket: async () => {
    const response = await api.get('/exams/hall-ticket');
    return response.data;
  },

  // Get student's official grade statement
  getMyResults: async () => {
    const response = await api.get('/exams/my-results');
    return response.data;
  },

  // Schedule new exam slot (Admin)
  schedulePaper: async (examData) => {
    const response = await api.post('/exams/schedule', examData);
    return response.data;
  },

  // Toggle live published status of results (Admin)
  togglePublishResults: async () => {
    const response = await api.patch('/exams/toggle-publish');
    return response.data;
  },

  // Get teacher continuous grading sheet
  getTeacherGradingSheet: async (courseCode) => {
    const response = await api.get('/exams/teacher/grading-sheet', {
      params: { courseCode },
    });
    return response.data;
  },

  // Submit course marks (Teacher)
  submitCourseGrades: async (data) => {
    const response = await api.post('/exams/teacher/submit-grades', data);
    return response.data;
  },
};

export default examService;
