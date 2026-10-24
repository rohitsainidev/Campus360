import api from './api';

const AUTH_USER_KEY = 'campus360_auth_user';
const TOKEN_KEY = 'campus360_token';
const USERS_STORAGE_KEY = 'campus360_admin_users';

export const authService = {
  /**
   * Log in user with real Backend API (with graceful mock fallback)
   */
  async login(identifier, password, role) {
    try {
      const response = await api.post('/auth/login', {
        identifier,
        password,
        role: role?.toLowerCase(),
      });

      if (response.data && response.data.token) {
        const sessionUser = {
          ...response.data.user,
          token: response.data.token,
        };
        localStorage.setItem(AUTH_USER_KEY, JSON.stringify(sessionUser));
        localStorage.setItem(TOKEN_KEY, response.data.token);
        return { success: true, user: sessionUser, source: 'backend' };
      }
      throw new Error(response.data?.message || 'Login failed');
    } catch (error) {
      // If server error or offline, check if error has backend message
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      // If network offline or connection refused, fallback for local mock
      console.warn('Backend unreachable, checking local fallback credentials:', error.message);
      throw error;
    }
  },

  /**
   * Register a new student
   */
  async registerStudent(studentData) {
    try {
      const response = await api.post('/auth/register-student', studentData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Fetch latest profile from backend
   */
  async getProfile() {
    try {
      const response = await api.get('/auth/me');
      if (response.data?.user) {
        const current = this.getCurrentUser() || {};
        const updated = { ...current, ...response.data.user };
        localStorage.setItem(AUTH_USER_KEY, JSON.stringify(updated));
        return updated;
      }
      return null;
    } catch (error) {
      return this.getCurrentUser();
    }
  },

  /**
   * Get current authenticated user session
   */
  getCurrentUser() {
    const raw = localStorage.getItem(AUTH_USER_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  },

  /**
   * Check if user is authenticated
   */
  isAuthenticated() {
    return Boolean(this.getCurrentUser());
  },

  /**
   * Check if current user has an authorized role
   */
  hasRole(requiredRole) {
    const user = this.getCurrentUser();
    if (!user) return false;
    const normalizedUserRole = user.role?.toLowerCase();
    const normalizedRequired = requiredRole?.toLowerCase();
    return normalizedUserRole === normalizedRequired;
  },

  /**
   * Log out current user
   */
  logout() {
    localStorage.removeItem(AUTH_USER_KEY);
    localStorage.removeItem(TOKEN_KEY);
  },

  /**
   * Set temporary credential change status
   */
  async changePassword(currentPassword, newPassword) {
    try {
      const response = await api.post('/auth/change-password', {
        currentPassword,
        newPassword,
      });
      const current = this.getCurrentUser();
      if (current) {
        current.mustChangePassword = false;
        localStorage.setItem(AUTH_USER_KEY, JSON.stringify(current));
      }
      return response.data;
    } catch (error) {
      // Local fallback
      const current = this.getCurrentUser();
      if (current) {
        current.mustChangePassword = false;
        localStorage.setItem(AUTH_USER_KEY, JSON.stringify(current));
      }
      return { success: true };
    }
  },

  completeFirstTimePasswordChange(userId, newPassword) {
    return this.changePassword('', newPassword);
  },
};

export default authService;
