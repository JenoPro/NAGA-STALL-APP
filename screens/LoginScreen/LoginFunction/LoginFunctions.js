// Login Functions - All business logic and event handlers
import { TouchableOpacity, Text } from 'react-native';

export const loginOptions = [
  { label: 'Stallholder', value: 'stallholder' },
  { label: 'Vendor', value: 'vendor' },
  { label: 'Inspector', value: 'inspector' },
];

// Fixed credentials for testing - now includes all user types
const FIXED_CREDENTIALS = {
  stallholder: {
    username: 'try',
    password: 'try'
  },
  vendor: {
    username: 'try',
    password: 'try'
  },
  inspector: {
    username: 'try',
    password: 'try'
  }
};

export const handleLogin = async (loginAs, username, password, setIsLoading, navigation, setErrorModal) => {
  console.log('Login pressed', { loginAs, username, password });
  
  // Start loading
  setIsLoading(true);
  
  try {
    // Check credentials for all user types
    if (FIXED_CREDENTIALS[loginAs] && 
        username === FIXED_CREDENTIALS[loginAs].username && 
        password === FIXED_CREDENTIALS[loginAs].password) {
      
      // Simulate loading time (2 seconds)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log(`Login successful for ${loginAs}`);
      
      // Navigate to appropriate screen based on user type
      if (navigation) {
        switch (loginAs) {
          case 'stallholder':
            navigation.navigate('StallHome');
            break;
          case 'vendor':
            navigation.navigate('VendorHome');
            break;
          case 'inspector':
            navigation.navigate('InspectorHome');
            break;
          default:
            console.log('Unknown user type');
        }
      }
      
    } else {
      // Invalid credentials
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log(`Invalid credentials for ${loginAs}`);
      
      // Show custom error modal
      if (setErrorModal) {
        setErrorModal({
          visible: true,
          title: 'Login Failed',
          message: 'The username or password you entered is incorrect. Please check your credentials and try again.',
          type: 'error'
        });
      }
    }
  } catch (error) {
    console.error('Login error:', error);
    
    if (setErrorModal) {
      setErrorModal({
        visible: true,
        title: 'Connection Error',
        message: 'Unable to connect to the server. Please check your internet connection and try again.',
        type: 'error'
      });
    }
  } finally {
    // Stop loading
    setIsLoading(false);
  }
};

export const handleForgotPassword = (setErrorModal) => {
  console.log('Forgot password pressed');
  
  if (setErrorModal) {
    setErrorModal({
      visible: true,
      title: 'Password Recovery',
      message: 'Please contact your system administrator to reset your password or visit the main office for assistance.',
      type: 'info'
    });
  }
};

export const toggleDropdown = (dropdownRef, setDropdownPosition, setIsDropdownVisible, isDropdownVisible) => {
  if (dropdownRef.current) {
    dropdownRef.current.measure((x, y, width, height, pageX, pageY) => {
      setDropdownPosition({
        top: pageY + height - 30,
        left: pageX,
        width: width,
      });
      setIsDropdownVisible(!isDropdownVisible);
    });
  }
};

export const selectOption = (option, setLoginAs, setIsDropdownVisible) => {
  setLoginAs(option.value);
  setIsDropdownVisible(false);
};

export const getSelectedLabel = (loginAs) => {
  const selected = loginOptions.find(option => option.value === loginAs);
  return selected ? selected.label : 'Login As';
};

export const renderDropdownItem = (item, selectOption, setLoginAs, setIsDropdownVisible, styles) => (
  <TouchableOpacity
    style={styles.dropdownItem}
    onPress={() => selectOption(item, setLoginAs, setIsDropdownVisible)}
  >
    <Text style={styles.dropdownItemText}>{item.label}</Text>
  </TouchableOpacity>
);