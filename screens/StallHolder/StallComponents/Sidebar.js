import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Animated,
  ScrollView,
  Modal,
  Image,
} from 'react-native';
import { styles } from './css/styles';

const { width, height } = Dimensions.get('window');

const Sidebar = ({ isVisible, onClose, onProfilePress, onMenuItemPress, activeMenuItem = 'dashboard' }) => {
  const slideAnim = useRef(new Animated.Value(-width * 0.85)).current;

  useEffect(() => {
    if (isVisible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 320,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: -width * 0.85,
        duration: 280,
        useNativeDriver: true,
      }).start();
    }
  }, [isVisible]);

  // Professional icon components using SVG-like paths rendered as text
  const SettingsIcon = () => (
    <View style={styles.iconContainer}>
      <View style={styles.settingsIcon}>
        <View style={styles.settingsCenter} />
        <View style={[styles.settingsTooth, { top: -3, left: 6 }]} />
        <View style={[styles.settingsTooth, { top: 6, right: -3, transform: [{ rotate: '90deg' }] }]} />
        <View style={[styles.settingsTooth, { bottom: -3, left: 6, transform: [{ rotate: '180deg' }] }]} />
        <View style={[styles.settingsTooth, { top: 6, left: -3, transform: [{ rotate: '270deg' }] }]} />
      </View>
    </View>
  );

  const menuItems = [
    { 
      id: 'dashboard', 
      title: 'Dashboard', 
      icon: require('../../../assets/dashboard-icon.png'),
      isImage: true
    },
    { 
      id: 'reports', 
      title: 'Reports', 
      icon: require('../../../assets/report-icon.png'),
      isImage: true
    },
    { 
      id: 'raffle', 
      title: 'Raffle', 
      icon: require('../../../assets/raffle-icon.png'),
      isImage: true
    },
    { 
      id: 'auction', 
      title: 'Auction', 
      icon: require('../../../assets/auction-icon.png'),
      isImage: true
    },
    { 
      id: 'settings', 
      title: 'Settings', 
      icon: require('../../../assets/Settings-icon.png'),
      isImage: true
    },
    { 
      id: 'notifications', 
      title: 'Notifications', 
      icon: require('../../../assets/Notifications-icon.png'),
      isImage: true
    },
  ];

  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <TouchableOpacity 
          style={styles.overlay}
          onPress={onClose}
          activeOpacity={1}
        />
        
        <Animated.View 
          style={[
            styles.sidebar,
            { transform: [{ translateX: slideAnim }] }
          ]}
        >
          <ScrollView 
            style={styles.content} 
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ flexGrow: 1 }}
          >
            {/* Header Gradient */}
            <View style={styles.headerGradient}>
              {/* Profile Section */}
              <View style={styles.profileSection}>
                <TouchableOpacity 
                  style={styles.profileContainer}
                  onPress={onProfilePress}
                >
                  <View style={styles.profileImageContainer}>
                    <View style={styles.profileImage}>
                      <Text style={styles.profileInitials}>JD</Text>
                    </View>
                    <View style={styles.statusIndicator} />
                  </View>
                  <View style={styles.profileInfo}>
                    <Text style={styles.profileName}>John Doe</Text>
                    <Text style={styles.profileEmail}>john.doe@example.com</Text>
                    <Text style={styles.profileStatus}>Online</Text>
                  </View>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.addAccountButton}
                  onPress={() => {
                    console.log('Add account pressed');
                  }}
                >
                  <Text style={styles.plusIcon}>+</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Navigation Items */}
            <View style={styles.navigationSection}>
              <Text style={styles.sectionTitle}>NAVIGATION</Text>
              {menuItems.map((item, index) => (
                <TouchableOpacity
                  key={item.id}
                  style={[
                    styles.menuItem,
                    activeMenuItem === item.id && styles.activeMenuItem
                  ]}
                  onPress={() => onMenuItemPress(item.id)}
                  activeOpacity={0.7}
                >
                  <View style={styles.menuIconContainer}>
                    {item.isImage ? (
                      <Image 
                        source={item.icon} 
                        style={styles.menuItemIconImage}
                        resizeMode="contain"
                      />
                    ) : (
                      <Text style={styles.menuItemIcon}>{item.icon}</Text>
                    )}
                  </View>
                  <Text style={[
                    styles.menuItemText,
                    activeMenuItem === item.id && styles.activeMenuItemText
                  ]}>
                    {item.title}
                  </Text>
                  {activeMenuItem === item.id && <View style={styles.activeIndicator} />}
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

          {/* Fixed Bottom Section */}
          <View style={styles.bottomSection}>
            <View style={styles.divider} />
            <TouchableOpacity 
              style={styles.logoutItem}
              onPress={() => onMenuItemPress('logout')}
              activeOpacity={0.7}
            >
              <View style={styles.logoutIconContainer}>
                <View style={styles.logoutIcon}>
                  <View style={styles.logoutArrow} />
                  <View style={styles.logoutDoor} />
                </View>
              </View>
              <Text style={styles.logoutText}>Sign Out</Text>
            </TouchableOpacity>
            
            {/* App Version */}
            <View style={styles.versionContainer}>
              <Text style={styles.versionText}>Version 1.2.0</Text>
            </View>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default Sidebar;