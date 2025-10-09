// API Service for mobile app backend integration
import { API_CONFIG } from '../config/networkConfig';

class ApiService {
  // Mobile login function using the improved backend
  static async mobileLogin(username, password) {
    try {
      console.log('🔄 Attempting login to:', `${API_CONFIG.BASE_URL}${API_CONFIG.MOBILE_ENDPOINTS.LOGIN}`);
      console.log('📱 Request data:', { username, password: '***' });

      const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.MOBILE_ENDPOINTS.LOGIN}`, {
        method: 'POST',
        headers: API_CONFIG.HEADERS,
        body: JSON.stringify({
          username,
          password
        }),
      });

      console.log('📡 Response status:', response.status);
      console.log('📡 Response headers:', response.headers);

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      console.log('✅ Login successful:', data.message);
      return {
        success: true,
        data: data.data,
        message: data.message
      };
    } catch (error) {
      console.error('❌ Login API Error:', error);
      console.error('🔍 Error type:', error.constructor.name);
      console.error('🔍 Error message:', error.message);
      
      // Check if it's a network connectivity issue
      if (error.message === 'Network request failed') {
        console.error('🚨 Network connectivity issue detected');
        console.error('🔧 Check: Backend server running on port 3001?');
        console.error('🔧 Check: Same Wi-Fi network?');
        console.error('🔧 Check: Firewall blocking connections?');
      }
      
      return {
        success: false,
        message: error.message || 'Network error occurred'
      };
    }
  }

  // Submit application using the improved backend
  static async submitApplication(applicantId, stallId) {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.MOBILE_ENDPOINTS.SUBMIT_APPLICATION}`, {
        method: 'POST',
        headers: API_CONFIG.HEADERS,
        body: JSON.stringify({
          applicant_id: applicantId,
          stall_id: stallId
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Application failed');
      }

      return {
        success: true,
        data: data.data,
        message: data.message
      };
    } catch (error) {
      console.error('Submit Application API Error:', error);
      return {
        success: false,
        message: error.message || 'Network error occurred'
      };
    }
  }

  // Health check with detailed connectivity testing
  static async healthCheck() {
    try {
      console.log('🏥 Testing connectivity to:', `${API_CONFIG.BASE_URL}${API_CONFIG.MOBILE_ENDPOINTS.HEALTH}`);
      
      const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.MOBILE_ENDPOINTS.HEALTH}`, {
        method: 'GET',
        headers: API_CONFIG.HEADERS,
        timeout: 10000, // 10 second timeout
      });

      console.log('🏥 Health check response status:', response.status);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Health check failed');
      }

      console.log('✅ Backend is reachable:', data.message);
      return {
        success: true,
        data: data,
        message: data.message
      };
    } catch (error) {
      console.error('❌ Health Check Error:', error);
      console.error('🔍 Full URL tested:', `${API_CONFIG.BASE_URL}${API_CONFIG.MOBILE_ENDPOINTS.HEALTH}`);
      
      return {
        success: false,
        message: error.message || 'Network error occurred'
      };
    }
  }

  // Test basic connectivity to server
  static async testConnectivity() {
    try {
      console.log('🔌 Testing basic connectivity to:', API_CONFIG.BASE_URL);
      
      const response = await fetch(`${API_CONFIG.BASE_URL}/`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        },
        timeout: 5000
      });

      console.log('🔌 Basic connectivity test status:', response.status);
      
      if (response.ok) {
        console.log('✅ Server is reachable');
        return true;
      } else {
        console.log('⚠️ Server responded but with error status:', response.status);
        return false;
      }
    } catch (error) {
      console.error('❌ Basic connectivity failed:', error.message);
      return false;
    }
  }
}

export default ApiService;