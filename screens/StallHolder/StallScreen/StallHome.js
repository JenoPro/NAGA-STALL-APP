import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StatusBar,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Header from '../StallComponents/header';
import Navbar from '../StallComponents/navbar';
import Sidebar from '../StallComponents/Sidebar';

// Import all screen components
import DashboardScreen from './Dashboard/DashboardScreen';
import ReportsScreen from './Report/ReportsScreen';
import RaffleScreen from './Raffle/RaffleScreen';
import AuctionScreen from './Auction/AuctionScreen';
import SettingsScreen from './Settings/SettingsScreen';
import NotificationsScreen from './Notifications/NotificationsScreen';
import DocumentsScreen from './Documents/DocumentsScreen';
import StallScreen from './Stall/StallScreen';

const { width, height } = Dimensions.get('window');

const StallHome = ({ navigation }) => {
  // Single source of truth for current screen
  const [currentScreen, setCurrentScreen] = useState('stall');
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const handleLogout = () => {
    navigation.navigate('LoginScreen');
  };

  const handleMenuPress = () => {
    setSidebarVisible(true);
  };

  const handleSidebarClose = () => {
    setSidebarVisible(false);
  };

  const handleProfilePress = () => {
    console.log('Profile pressed - show account options');
  };

  // Handle navigation from sidebar
  const handleMenuItemPress = (itemId) => {
    console.log(`Navigating to: ${itemId}`);
    
    if (itemId === 'logout') {
      handleLogout();
      return;
    }
    
    setCurrentScreen(itemId);
    setSidebarVisible(false);
  };

  // Handle navigation from bottom navbar
  const handleNavigation = (screen) => {
    console.log(`Bottom nav - Navigating to: ${screen}`);
    setCurrentScreen(screen);
  };

  // Get page title for header
  const getPageTitle = () => {
    const titles = {
      dashboard: 'Dashboard',
      stall: 'Stall Management',
      reports: 'Reports',
      raffle: 'Raffle',
      auction: 'Auction',
      settings: 'Settings',
      notifications: 'Notifications',
      documents: 'Documents',
    };
    return titles[currentScreen] || 'Stall Management';
  };

  // Determine which tab should be active in navbar
  const getActiveNavTab = () => {
    // Only show active state for screens that are actually in the navbar
    if (currentScreen === 'documents') {
      return 'Documents';
    }
    if (currentScreen === 'stall') {
      return 'Stall';
    }
    // For sidebar screens (dashboard, reports, raffle, auction, settings, notifications)
    // return null to show no active state in navbar
    return null;
  };

  // Render current screen
  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case 'dashboard':
        return <DashboardScreen />;
      case 'stall':
        return <StallScreen />;
      case 'reports':
        return <ReportsScreen />;
      case 'raffle':
        return <RaffleScreen />;
      case 'auction':
        return <AuctionScreen />;
      case 'settings':
        return <SettingsScreen />;
      case 'notifications':
        return <NotificationsScreen />;
      case 'documents':
        return <DocumentsScreen />;
      default:
        return <StallScreen />;
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
        <StatusBar barStyle="dark-content" backgroundColor="#ffffff" translucent={false} />
        
        <Header 
          onMenuPress={handleMenuPress}
          title={getPageTitle()}
        />

        {/* Main Content */}
        <ScrollView 
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {renderCurrentScreen()}
        </ScrollView>

        {/* Bottom Navigation Component */}
        <Navbar 
          activeTab={getActiveNavTab()}
          onStallPress={() => handleNavigation('stall')}
          onDocumentsPress={() => handleNavigation('documents')}
        />

        {/* Sidebar Component */}
        <Sidebar
          isVisible={sidebarVisible}
          onClose={handleSidebarClose}
          onProfilePress={handleProfilePress}
          onMenuItemPress={handleMenuItemPress}
          activeMenuItem={currentScreen}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
    flexGrow: 1,
  },
});

export default StallHome;