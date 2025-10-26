// Network configuration for mobile app
// Use this file to configure the API endpoints for your React Native Expo app

// IMPORTANT: This configuration supports multiple network environments
// It will automatically try different endpoints until one works

export const API_CONFIG = {
  // Multiple possible server endpoints (in order of preference)
  SERVERS: [
    // Current detected IP addresses
    'http://192.168.110.16:3001',  // Current Wi-Fi IP
    'http://192.168.137.1:3001',   // Local Area Connection
    
    // Previous IP (backup)
    'http://192.168.8.38:3001',
    
    // Common local network ranges
    'http://192.168.1.100:3001',  // Common router IP range
    'http://192.168.0.100:3001',  // Another common range
    'http://10.0.0.100:3001',     // Mobile hotspot range
    
    // Localhost alternatives (for testing)
    'http://localhost:3001',
    'http://127.0.0.1:3001',
    
    // Add your cloud server here when available
    // 'https://your-app-name.herokuapp.com',
    // 'https://your-app-name.vercel.app',
  ],
  
  // Current active server (will be set automatically)
  BASE_URL: null,
  
  // Mobile app specific endpoints
  MOBILE_ENDPOINTS: {
    LOGIN: '/api/mobile/mobile-login',
    SUBMIT_APPLICATION: '/api/mobile/submit-application',
    HEALTH: '/api/health'  // Main health endpoint, not mobile-specific
  },
  
  // Timeout for network requests (5 seconds per attempt)
  TIMEOUT: 5000,
  
  // Default headers
  HEADERS: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
};

// Server discovery and connection testing
export const NetworkUtils = {
  // Test if a server is reachable
  async testConnection(serverUrl) {
    try {
      console.log(`🔌 Testing connection to: ${serverUrl}`);
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.TIMEOUT);
      
      const response = await fetch(`${serverUrl}${API_CONFIG.MOBILE_ENDPOINTS.HEALTH}`, {
        method: 'GET',
        headers: API_CONFIG.HEADERS,
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (response.ok) {
        console.log(`✅ Connection successful to: ${serverUrl}`);
        return true;
      } else {
        console.log(`❌ Server responded with error: ${response.status}`);
        return false;
      }
    } catch (error) {
      console.log(`❌ Connection failed to ${serverUrl}:`, error.message);
      return false;
    }
  },

  // Find the first working server
  async findWorkingServer() {
    console.log('🔍 Discovering available servers...');
    
    for (const server of API_CONFIG.SERVERS) {
      if (await this.testConnection(server)) {
        API_CONFIG.BASE_URL = server;
        console.log(`🎯 Active server set to: ${server}`);
        return server;
      }
    }
    
    console.error('❌ No working servers found');
    throw new Error('Unable to connect to any server. Please check:\n\n• Backend server is running on port 3001\n• Device and server are on same network\n• Firewall allows connections\n• Server IP is in the config');
  },

  // Get current active server or find one
  async getActiveServer() {
    if (API_CONFIG.BASE_URL) {
      // Test if current server is still working
      if (await this.testConnection(API_CONFIG.BASE_URL)) {
        return API_CONFIG.BASE_URL;
      } else {
        console.log('🔄 Current server not responding, finding new one...');
        API_CONFIG.BASE_URL = null;
      }
    }
    
    return await this.findWorkingServer();
  }
};

// Helper function to make API calls
export const apiCall = async (endpoint, method = 'GET', data = null) => {
  try {
    const config = {
      method,
      headers: API_CONFIG.HEADERS,
      timeout: API_CONFIG.TIMEOUT
    };
    
    if (data && (method === 'POST' || method === 'PUT')) {
      config.body = JSON.stringify(data);
    }
    
    const response = await fetch(`${API_CONFIG.BASE_URL}${endpoint}`, config);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`API call failed for ${endpoint}:`, error);
    throw error;
  }
};

// Example usage in your mobile app:
// import { API_CONFIG, apiCall } from './config/networkConfig';
// 
// // Login example:
// const loginResult = await apiCall(API_CONFIG.MOBILE_ENDPOINTS.LOGIN, 'POST', {
//   username: 'your_username',
//   password: 'your_password'
// });

console.log('📱 Mobile Network Config Loaded');
console.log('🌐 Backend URL:', API_CONFIG.BASE_URL);
console.log('🔗 Login endpoint:', `${API_CONFIG.BASE_URL}${API_CONFIG.MOBILE_ENDPOINTS.LOGIN}`);
console.log('🌐 Backend URL:', API_CONFIG.BASE_URL);
console.log('🔗 Login endpoint:', `${API_CONFIG.BASE_URL}${API_CONFIG.MOBILE_ENDPOINTS.LOGIN}`);