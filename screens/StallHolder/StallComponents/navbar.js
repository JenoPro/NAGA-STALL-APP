import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const Navbar = ({ 
  activeTab = 'Live',
  onLivePress, 
  onStallPress, 
  onDocumentsPress, 
  onLogoutPress 
}) => {
  const navItems = [
    {
      id: 'Stall',
      icon: require('../../../assets/Home-Image/StallIcon.png'),
      label: 'Stall',
      onPress: onStallPress,
    },
    {
      id: 'Documents',
      icon: require('../../../assets/Home-Image/DocumentIcon.png'),
      label: 'Documents',
      onPress: onDocumentsPress,
    },
  ];

  return (
    <View style={styles.bottomNav}>
      {navItems.map((item) => (
        <TouchableOpacity 
          key={item.id}
          style={styles.navItem}
          onPress={item.onPress}
        >
          <Image 
            source={item.icon}
            style={[
              styles.navIcon,
              activeTab === item.id && styles.activeNavIcon
            ]}
            resizeMode="contain"
          />
          <Text style={[
            styles.navText,
            activeTab === item.id && styles.activeNavText
          ]}>
            {item.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    paddingVertical: height * 0.015, // 1.5% of screen height
    paddingHorizontal: width * 0.04, // 4% of screen width
    minHeight: 70,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: height * 0.005, // 0.5% of screen height
    minHeight: 50, // Minimum touch target
  },
  navIcon: {
    width: width * 0.07, // 6% of screen width
    height: width * 0.07,
    maxWidth: 30,
    maxHeight: 30,
    minWidth: 20,
    minHeight: 20,
    marginBottom: 4,
  },
  navText: {
    fontSize: width * 0.03, // 3% of screen width
    maxFontSize: 14,
    minFontSize: 10,
    color: '#6b7280',
    textAlign: 'center',
  },
  activeNavIcon: {
    tintColor: '#3b82f6',
  },
  activeNavText: {
    color: '#3b82f6',
    fontWeight: '600',
  },
});

export default Navbar;