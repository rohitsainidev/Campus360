import api from './api';

export const feeService = {
  // Get student's fee summary, breakdown, and receipts
  getMyFees: async () => {
    const response = await api.get('/fees/my-fees');
    return response.data;
  },

  // Process simulated / real fee payment
  payFee: async (paymentData) => {
    const response = await api.post('/fees/pay', paymentData);
    return response.data;
  },

  // Get admin collection analytics and defaulters
  getAdminOverview: async () => {
    const response = await api.get('/fees/admin/overview');
    return response.data;
  },

  // Record counter/offline fee settlement
  recordOfflinePayment: async (settlementData) => {
    const response = await api.post('/fees/admin/record-offline', settlementData);
    return response.data;
  },
};

export default feeService;
