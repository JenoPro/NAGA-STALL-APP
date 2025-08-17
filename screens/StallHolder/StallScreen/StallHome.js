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
import InboxScreen from './Inbox/InboxScreen';
import NotificationsScreen from './Notifications/NotificationsScreen';
import DocumentsScreen from './Documents/DocumentsScreen';
import StallScreen from './Stall/StallScreen';

const { width, height } = Dimensions.get('window');

const StallHome = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('Stall'); // Default to Stall tab
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState('stall'); // Changed from 'dashboard' to 'stall'

  const handleLogout = () => {
    navigation.navigate('LoginScreen');
  };

  const handleMenuPress = () => {
    console.log('Menu pressed - opening sidebar');
    setSidebarVisible(true);
  };

  const handleSidebarClose = () => {
    setSidebarVisible(false);
  };

  const handleProfilePress = () => {
    console.log('Profile pressed - show account options');
  };

  const handleMenuItemPress = (itemId) => {
    setCurrentPage(itemId);
    setSidebarVisible(false);
    
    switch (itemId) {
      case 'dashboard':
        console.log('Dashboard selected');
        break;
      case 'stall':
        console.log('Stall selected');
        break;
      case 'reports':
        console.log('Reports selected');
        break;
      case 'raffle':
        console.log('Raffle selected');
        break;
      case 'auction':
        console.log('Auction selected');
        break;
      case 'settings':
        console.log('Settings selected');
        break;
      case 'inbox':
        console.log('Inbox selected');
        break;
      case 'notifications':
        console.log('Notifications selected');
        break;
      case 'logout':
        console.log('Logout selected');
        handleLogout();
        break;
      default:
        console.log('Unknown menu item:', itemId);
    }
  };

  // Get page title for header
  const getPageTitle = () => {
    if (activeTab === 'Documents') {
      return 'Documents';
    }
    
    const titles = {
      dashboard: 'Dashboard',
      stall: 'Stall Management',
      reports: 'Reports',
      raffle: 'Raffle',
      auction: 'Auction',
      settings: 'Settings',
      inbox: 'Inbox',
      notifications: 'Notifications',
    };
    return titles[currentPage] || 'Stall Management'; // Changed default from 'Dashboard' to 'Stall Management'
  };

  // Navbar handlers
  const handleLive = () => {
    console.log('Live pressed');
    setActiveTab('Live');
    // You can add navigation to Live screen if needed
  };

  const handleStall = () => {
    console.log('Stall pressed');
    setActiveTab('Stall');
    setCurrentPage('stall'); // Changed from 'dashboard' to 'stall'
  };

  const handleDocuments = () => {
    console.log('Documents pressed');
    setActiveTab('Documents');
  };

  const handleLogoutFromNav = () => {
    console.log('Logout pressed');
    setActiveTab('Logout');
    handleLogout();
  };

  // Render current screen based on activeTab and currentPage
  const renderCurrentScreen = () => {
    if (activeTab === 'Documents') {
      return <DocumentsScreen />;
    }
    
    if (activeTab === 'Stall') {
      // For Stall tab, render based on currentPage from sidebar
      switch (currentPage) {
        case 'dashboard':
          return <DashboardScreen />; // Dashboard has its own screen
        case 'stall':
          return <StallScreen />; // Stall has its own screen  
        case 'reports':
          return <ReportsScreen />;
        case 'raffle':
          return <RaffleScreen />;
        case 'auction':
          return <AuctionScreen />;
        case 'settings':
          return <SettingsScreen />;
        case 'inbox':
          return <InboxScreen />;
        case 'notifications':
          return <NotificationsScreen />;
        default:
          return <StallScreen />; // Changed default from DashboardScreen to StallScreen
      }
    }

    // Default fallback
    return <StallScreen />; // Changed default from DashboardScreen to StallScreen
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
          activeTab={activeTab}
          onLivePress={handleLive}
          onStallPress={handleStall}
          onDocumentsPress={handleDocuments}
          onLogoutPress={handleLogoutFromNav}
        />

        {/* Sidebar Component */}
        <Sidebar
          isVisible={sidebarVisible}
          onClose={handleSidebarClose}
          onProfilePress={handleProfilePress}
          onMenuItemPress={handleMenuItemPress}
          activeMenuItem={currentPage}
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