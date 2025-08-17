import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Image,
  StatusBar,
  Modal,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import styles from './LogInCSS/LoginCSS';
import {
  loginOptions,
  handleLogin,
  handleForgotPassword,
  toggleDropdown,
  selectOption,
  getSelectedLabel,
} from './LoginFunction/LoginFunctions';

const LoginScreen = ({ navigation }) => {
  // State management
  const [loginAs, setLoginAs] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const [errorModal, setErrorModal] = useState({
    visible: false,
    title: '',
    message: '',
    type: 'error' // 'error', 'info', 'success'
  });
  const dropdownRef = useRef(null);

  // Wrapper functions to pass state setters to imported functions
  const handleLoginPress = () => {
    handleLogin(loginAs, username, password, setIsLoading, navigation, setErrorModal);
  };

  const handleForgotPasswordPress = () => {
    handleForgotPassword(setErrorModal);
  };

  const handleToggleDropdown = () => {
    toggleDropdown(dropdownRef, setDropdownPosition, setIsDropdownVisible, isDropdownVisible);
  };

  const handleSelectOption = (option) => {
    selectOption(option, setLoginAs, setIsDropdownVisible);
  };

  const closeErrorModal = () => {
    setErrorModal({ ...errorModal, visible: false });
  };

  const renderDropdownItem = ({ item }) => (
    <TouchableOpacity
      style={styles.dropdownItem}
      onPress={() => handleSelectOption(item)}
    >
      <Text style={styles.dropdownItemText}>{item.label}</Text>
    </TouchableOpacity>
  );

  const getModalIcon = () => {
    switch (errorModal.type) {
      case 'error':
        return '⚠️';
      case 'info':
        return 'ℹ️';
      case 'success':
        return '✅';
      default:
        return '⚠️';
    }
  };

  const getModalColor = () => {
    switch (errorModal.type) {
      case 'error':
        return '#e74c3c';
      case 'info':
        return '#3498db';
      case 'success':
        return '#27ae60';
      default:
        return '#e74c3c';
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={['top']}>
        <StatusBar barStyle="light-content" backgroundColor="rgba(0,0,0,0.3)" translucent />
        <ImageBackground
          source={require('../../assets/Login-Image/background-mobile.png')}
          style={styles.backgroundImage}
          resizeMode="cover"
        >
          <View style={styles.overlay} />
          
          <SafeAreaView style={styles.content} edges={['bottom', 'left', 'right']}>
            <View style={styles.logoContainer}>
              <Image
                source={require('../../assets/Login-Image/naga-city-logo.png')}
                style={styles.logo}
                resizeMode="contain"
              />
            </View>

            <View style={styles.titleContainer}>
              <Text style={styles.title}>Naga City Stall Management</Text>
              <Text style={styles.subtitle}>Mobile App</Text>
              <Text style={styles.poweredBy}>Powered by: DigiStall</Text>
            </View>

            <View style={styles.formContainer}>
              <Text style={styles.formTitle}>Sign In</Text>

              <View style={styles.inputContainer}>
                <TouchableOpacity
                  ref={dropdownRef}
                  style={styles.dropdownContainer}
                  onPress={handleToggleDropdown}
                >
                  <Text style={[
                    styles.dropdownText,
                    loginAs === '' && styles.placeholderText
                  ]}>
                    {getSelectedLabel(loginAs)}
                  </Text>
                  <View style={[
                    styles.arrow,
                    isDropdownVisible && styles.arrowUp
                  ]} />
                </TouchableOpacity>
              </View>

              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.textInput}
                  placeholder="Username"
                  placeholderTextColor="#999"
                  value={username}
                  onChangeText={setUsername}
                  autoCapitalize="none"
                />
              </View>

              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.textInput}
                  placeholder="Password"
                  placeholderTextColor="#999"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={true}
                  autoCapitalize="none"
                />
              </View>

              <TouchableOpacity 
                style={[styles.loginButton, isLoading && styles.loginButtonDisabled]} 
                onPress={handleLoginPress}
                disabled={isLoading}
              >
                {isLoading ? (
                  <View style={styles.loadingContainer}>
                    <ActivityIndicator size="small" color="white" />
                    <Text style={styles.loadingText}>Logging in...</Text>
                  </View>
                ) : (
                  <Text style={styles.loginButtonText}>Login</Text>
                )}
              </TouchableOpacity>

              <TouchableOpacity onPress={handleForgotPasswordPress}>
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </ImageBackground>

        {/* Dropdown Modal */}
        <Modal
          visible={isDropdownVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setIsDropdownVisible(false)}
        >
          <TouchableOpacity
            style={styles.modalOverlay}
            activeOpacity={1}
            onPress={() => setIsDropdownVisible(false)}
          >
            <View
              style={[
                styles.dropdownList,
                {
                  top: dropdownPosition.top,
                  left: dropdownPosition.left,
                  width: dropdownPosition.width,
                }
              ]}
            >
              <FlatList
                data={loginOptions}
                renderItem={renderDropdownItem}
                keyExtractor={(item) => item.value}
                showsVerticalScrollIndicator={false}
              />
            </View>
          </TouchableOpacity>
        </Modal>

        {/* Custom Error Modal */}
        <Modal
          visible={errorModal.visible}
          transparent={true}
          animationType="fade"
          onRequestClose={closeErrorModal}
        >
          <View style={styles.errorModalOverlay}>
            <View style={styles.errorModalContainer}>
              <View style={[styles.errorModalHeader, { backgroundColor: getModalColor() }]}>
                <Text style={styles.errorModalIcon}>{getModalIcon()}</Text>
                <Text style={styles.errorModalTitle}>{errorModal.title}</Text>
              </View>
              
              <View style={styles.errorModalBody}>
                <Text style={styles.errorModalMessage}>{errorModal.message}</Text>
              </View>
              
              <View style={styles.errorModalFooter}>
                <TouchableOpacity
                  style={[styles.errorModalButton, { backgroundColor: getModalColor() }]}
                  onPress={closeErrorModal}
                >
                  <Text style={styles.errorModalButtonText}>OK</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default LoginScreen;