import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import ProfileDisplay from "./components/ProfileComponents//ProfileComponents/ProfileDisplay";
import { mockUser } from "./components/ProfileComponents/mockUser";
import ThemeModal from "../Settings/components/ThemeComponents/ThemeModal";
import { useTheme } from "../Settings/components/ThemeComponents/ThemeContext";
import AboutApp from "../Settings/components/AboutComponents/AboutApp";

const { width } = Dimensions.get("window");

const SettingsScreen = ({ user }) => {
  const [showProfile, setShowProfile] = useState(false);
  const [showThemeModal, setShowThemeModal] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const { theme, themeMode, changeTheme } = useTheme();

  // use mockUser if no real user data is provided
  const testUser = user || mockUser;

  useEffect(() => {
    console.log("Original user prop:", user);
    console.log("mockUser:", mockUser);
    console.log("testUser (final):", testUser);
    console.log("testUser type:", typeof testUser);
    console.log("testUser.fullName:", testUser?.fullName);
    console.log(
      "All testUser properties:",
      testUser ? Object.keys(testUser) : "No properties"
    );
  }, [user]);

  useEffect(() => {
    console.log("showProfile state changed:", showProfile);
  }, [showProfile]);

  const handleViewProfile = () => {
    console.log("View Profile button pressed");
    console.log("User data being passed to ProfileDisplay:", testUser);
    setShowProfile(true);
  };

  const handleGoBack = () => {
    console.log("Go back button pressed");
    setShowProfile(false);
  };

  const handleThemePress = () => {
    console.log("Theme button pressed");
    setShowThemeModal(true);
  };

  const handleThemeChange = (newTheme) => {
    console.log("Theme changed to:", newTheme);
    changeTheme(newTheme);
  };

  const handleCloseThemeModal = () => {
    setShowThemeModal(false);
  };

  // Add these new handler functions
  const handleAboutPress = () => {
    console.log("About button pressed");
    setShowAbout(true);
  };

  const handleAboutGoBack = () => {
    console.log("About go back pressed");
    setShowAbout(false);
  };

  // get theme name for display
  const getThemeDisplayName = () => {
    switch (themeMode) {
      case "light":
        return "Light";
      case "dark":
        return "Dark";
      case "system":
        return "System";
      default:
        return "Light";
    }
  };

  // create themed styles
  const themedStyles = createThemedStyles(theme);

  if (showProfile) {
    return <ProfileDisplay user={testUser} onGoBack={handleGoBack} />;
  }

  // Add this conditional rendering for About screen
  if (showAbout) {
    return <AboutApp onGoBack={handleAboutGoBack} />;
  }

  return (
    <>
      <StatusBar
        barStyle={theme.statusBar}
        backgroundColor={theme.colors.surface}
      />
      <ScrollView style={themedStyles.container}>
        {/* Profile Section */}
        <View style={themedStyles.profileCard}>
          <TouchableOpacity
            onPress={handleViewProfile}
            style={themedStyles.profileRow}
          >
            <Ionicons
              name="person-circle-outline"
              size={64}
              color={theme.colors.primary}
            />
            <View style={themedStyles.profileInfo}>
              <Text style={themedStyles.profileName}>
                {testUser?.fullName || "Guest"}
              </Text>
              <Text style={themedStyles.profileSubtitle}>
                {testUser?.stallNumber
                  ? `Stall: ${testUser.stallNumber}`
                  : "View and edit profile"}
              </Text>
            </View>
            <Ionicons
              name="chevron-forward"
              size={24}
              color={theme.colors.textTertiary}
            />
          </TouchableOpacity>
        </View>

        {/* Preferences Section */}
        <View style={themedStyles.section}>
          <Text style={themedStyles.sectionTitle}>Preferences</Text>

          <TouchableOpacity
            style={themedStyles.settingsRow}
            onPress={handleThemePress}
          >
            <MaterialIcons
              name="brush"
              size={24}
              color={theme.colors.primary}
            />
            <View style={themedStyles.settingsTextContainer}>
              <Text style={themedStyles.settingsText}>Theme</Text>
              <Text style={themedStyles.settingsSubtext}>
                {getThemeDisplayName()}
              </Text>
            </View>
            <Ionicons
              name="chevron-forward"
              size={20}
              color={theme.colors.textTertiary}
            />
          </TouchableOpacity>

          <TouchableOpacity style={themedStyles.settingsRow}>
            <Ionicons
              name="lock-closed-outline"
              size={24}
              color={theme.colors.primary}
            />
            <Text style={themedStyles.settingsText}>Privacy</Text>
          </TouchableOpacity>
        </View>

        {/* Rental Section */}
        <View style={themedStyles.section}>
          <Text style={themedStyles.sectionTitle}>Stallholder</Text>

          <TouchableOpacity style={themedStyles.settingsRow}>
            <MaterialIcons
              name="history"
              size={24}
              color={theme.colors.primary}
            />
            <Text style={themedStyles.settingsText}>Rental History</Text>
          </TouchableOpacity>
        </View>

        {/* App Info Section */}
        <View style={themedStyles.section}>
          <Text style={themedStyles.sectionTitle}>App Information</Text>

          {/* Updated About TouchableOpacity with onPress handler */}
          <TouchableOpacity 
            style={themedStyles.settingsRow}
            onPress={handleAboutPress}
          >
            <Ionicons
              name="information-circle-outline"
              size={24}
              color={theme.colors.primary}
            />
            <Text style={themedStyles.settingsText}>About</Text>
          </TouchableOpacity>

          <TouchableOpacity style={themedStyles.settingsRow}>
            <Ionicons
              name="document-text-outline"
              size={24}
              color={theme.colors.primary}
            />
            <Text style={themedStyles.settingsText}>
              Terms & Conditions / Privacy Policy
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Theme Modal */}
      <ThemeModal
        visible={showThemeModal}
        onClose={handleCloseThemeModal}
        currentTheme={themeMode}
        onThemeChange={handleThemeChange}
      />
    </>
  );
};

// function to create themed styles
const createThemedStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    profileCard: {
      backgroundColor: theme.colors.surface,
      padding: 16,
      margin: 16,
      borderRadius: 16,
      shadowColor: theme.colors.shadow,
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.1,
      shadowRadius: 6,
      elevation: 4,
    },
    profileRow: {
      flexDirection: "row",
      alignItems: "center",
    },
    profileInfo: {
      flex: 1,
      marginLeft: 12,
    },
    profileName: {
      fontSize: width * 0.05,
      fontWeight: "bold",
      color: theme.colors.text,
    },
    profileSubtitle: {
      fontSize: width * 0.038,
      color: theme.colors.textSecondary,
      marginTop: 2,
    },
    section: {
      marginTop: 10,
      marginHorizontal: 16,
      backgroundColor: theme.colors.surface,
      borderRadius: 16,
      paddingVertical: 8,
      shadowColor: theme.colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 4,
      elevation: 2,
    },
    sectionTitle: {
      fontSize: width * 0.04,
      fontWeight: "600",
      color: theme.colors.textSecondary,
      marginLeft: 16,
      marginVertical: 8,
    },
    settingsRow: {
      flexDirection: "row",
      alignItems: "center",
      padding: 14,
      paddingLeft: 18,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.borderLight,
    },
    settingsText: {
      fontSize: width * 0.043,
      marginLeft: 12,
      color: theme.colors.text,
      flex: 1,
    },
    settingsTextContainer: {
      flex: 1,
      marginLeft: 12,
    },
    settingsSubtext: {
      fontSize: width * 0.035,
      color: theme.colors.textSecondary,
      marginTop: 2,
    },
  });

export default SettingsScreen;