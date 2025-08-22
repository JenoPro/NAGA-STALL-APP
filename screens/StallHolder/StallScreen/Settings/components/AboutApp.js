import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Linking,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "../components/ThemeComponents/ThemeContext";

const { width } = Dimensions.get("window");

const AboutApp = ({ onGoBack }) => {
  const { theme } = useTheme();

  const handleContactPress = (type, contact) => {
    switch (type) {
      case "email":
        Linking.openURL(`mailto:${contact}`);
        break;
      case "phone":
        Linking.openURL(`tel:${contact}`);
        break;
      case "website":
        Linking.openURL(contact);
        break;
      default:
        break;
    }
  };

  const themedStyles = createThemedStyles(theme);

  return (
    <>
      <StatusBar
        barStyle={theme.statusBar}
        backgroundColor={theme.colors.surface}
      />
      <View style={themedStyles.container}>
        {/* Floating Back Button */}
        <TouchableOpacity
          onPress={onGoBack}
          style={themedStyles.floatingBackButton}
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
          <Text style={themedStyles.backButtonText}>Back</Text>
        </TouchableOpacity>

        <ScrollView style={themedStyles.content}>
          {/* App Info Section */}
          <View style={themedStyles.section}>
            <View style={themedStyles.appIconContainer}>
              <MaterialIcons
                name="store"
                size={80}
                color={theme.colors.primary}
              />
            </View>
            <Text style={themedStyles.appName}>
              Market Stall Management System
            </Text>
            <Text style={themedStyles.appVersion}>Version 1.2.0</Text>
            <Text style={themedStyles.appDescription}>
              A comprehensive solution for managing market stall rentals and
              operations. Designed to enhance the process for both stallholders
              and market administrators.
            </Text>
          </View>

          {/* Features Section */}
          <View style={themedStyles.section}>
            <Text style={themedStyles.sectionTitle}>Key Features</Text>
            <View style={themedStyles.featuresList}>
              <View style={themedStyles.featureItem}>
                <Ionicons
                  name="checkmark-circle"
                  size={20}
                  color={theme.colors.primary}
                />
                <Text style={themedStyles.featureText}>
                  Easy stall management and rental process
                </Text>
              </View>
              <View style={themedStyles.featureItem}>
                <Ionicons
                  name="checkmark-circle"
                  size={20}
                  color={theme.colors.primary}
                />
                <Text style={themedStyles.featureText}>
                  Partake for stall rentals for both NCPM and Satellite Markets
                </Text>
              </View>
              <View style={themedStyles.featureItem}>
                <Ionicons
                  name="checkmark-circle"
                  size={20}
                  color={theme.colors.primary}
                />
                <Text style={themedStyles.featureText}>
                  Payment history tracking
                </Text>
              </View>
              <View style={themedStyles.featureItem}>
                <Ionicons
                  name="checkmark-circle"
                  size={20}
                  color={theme.colors.primary}
                />
                <Text style={themedStyles.featureText}>
                  Profile and preferences management
                </Text>
              </View>
              <View style={themedStyles.featureItem}>
                <Ionicons
                  name="checkmark-circle"
                  size={20}
                  color={theme.colors.primary}
                />
                <Text style={themedStyles.featureText}>
                  Dark theme and light theme support
                </Text>
              </View>
            </View>
          </View>

          {/* Contact Section */}
          <View style={themedStyles.section}>
            <Text style={themedStyles.sectionTitle}>Contact & Support</Text>

            <TouchableOpacity
              style={themedStyles.contactItem}
              onPress={() =>
                handleContactPress("email", "DigiStallNagaCity@gmail.com")
              }
            >
              <Ionicons
                name="mail-outline"
                size={24}
                color={theme.colors.primary}
              />
              <View style={themedStyles.contactTextContainer}>
                <Text style={themedStyles.contactLabel}>Email Support</Text>
                <Text style={themedStyles.contactValue}>
                  DigiStallNagaCity@gmail.com
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={themedStyles.contactItem}
              onPress={() => handleContactPress("phone", "+63-911-1233-787")}
            >
              <Ionicons
                name="call-outline"
                size={24}
                color={theme.colors.primary}
              />
              <View style={themedStyles.contactTextContainer}>
                <Text style={themedStyles.contactLabel}>Phone Support</Text>
                <Text style={themedStyles.contactValue}>+63-911-1233-787</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={themedStyles.contactItem}
              onPress={() =>
                handleContactPress(
                  "website",
                  "https://www.DigiStallNagaCity.com"
                )
              }
            >
              <Ionicons
                name="globe-outline"
                size={24}
                color={theme.colors.primary}
              />
              <View style={themedStyles.contactTextContainer}>
                <Text style={themedStyles.contactLabel}>Website</Text>
                <Text style={themedStyles.contactValue}>
                  www.DigiStallNagaCity.com
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Developer Info */}
          <View style={themedStyles.section}>
            <Text style={themedStyles.sectionTitle}>Development Team</Text>
            <Text style={themedStyles.developerText}>
              Developed with ❤️ by the Students of the University of Nueva
              Caceres
            </Text>
            <Text style={themedStyles.locationText}>
              Naga, Bicol Region, Philippines
            </Text>
          </View>

          {/* Legal Section */}
          <View style={themedStyles.section}>
            <Text style={themedStyles.sectionTitle}>Legal</Text>
            <TouchableOpacity style={themedStyles.legalItem}>
              <Text style={themedStyles.legalText}>Privacy Policy</Text>
            </TouchableOpacity>
            <TouchableOpacity style={themedStyles.legalItem}>
              <Text style={themedStyles.legalText}>Terms of Service</Text>
            </TouchableOpacity>
            <TouchableOpacity style={themedStyles.legalItem}>
              <Text style={themedStyles.legalText}>Open Source Licenses</Text>
            </TouchableOpacity>
          </View>

          {/* Copyright */}
          <View style={themedStyles.copyrightSection}>
            <Text style={themedStyles.copyrightText}>
              © 2025 Market Stall Management System (DigiStall). All rights
              reserved.
            </Text>
          </View>
        </ScrollView>
      </View>
    </>
  );
};

const createThemedStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    floatingBackButton: {
      position: "absolute",
      top: width * 0.06,
      left: width * 0.08,
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.3)",
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 20,
      zIndex: 1000,
    },
    backButtonText: {
      color: "#fff",
      fontSize: width * 0.04,
      marginLeft: 4,
      fontWeight: "500",
    },
    content: {
      flex: 1,
    },
    section: {
      backgroundColor: theme.colors.surface,
      marginHorizontal: 16,
      marginVertical: 8,
      borderRadius: 16,
      padding: 16,
      shadowColor: theme.colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    appIconContainer: {
      alignItems: "center",
      marginBottom: 16,
    },
    appName: {
      fontSize: width * 0.06,
      fontWeight: "bold",
      color: theme.colors.text,
      textAlign: "center",
      marginBottom: 4,
    },
    appVersion: {
      fontSize: width * 0.04,
      color: theme.colors.textSecondary,
      textAlign: "center",
      marginBottom: 16,
    },
    appDescription: {
      fontSize: width * 0.04,
      color: theme.colors.text,
      lineHeight: width * 0.06,
      textAlign: "center",
    },
    sectionTitle: {
      fontSize: width * 0.045,
      fontWeight: "600",
      color: theme.colors.text,
      marginBottom: 12,
    },
    featuresList: {
      marginTop: 8,
    },
    featureItem: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 8,
    },
    featureText: {
      fontSize: width * 0.04,
      color: theme.colors.text,
      marginLeft: 12,
      flex: 1,
    },
    contactItem: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.borderLight,
    },
    contactTextContainer: {
      flex: 1,
      marginLeft: 12,
    },
    contactLabel: {
      fontSize: width * 0.04,
      fontWeight: "500",
      color: theme.colors.text,
    },
    contactValue: {
      fontSize: width * 0.035,
      color: theme.colors.textSecondary,
      marginTop: 2,
    },
    developerText: {
      fontSize: width * 0.04,
      color: theme.colors.text,
      textAlign: "center",
      marginBottom: 4,
    },
    locationText: {
      fontSize: width * 0.035,
      color: theme.colors.textSecondary,
      textAlign: "center",
    },
    legalItem: {
      paddingVertical: 8,
    },
    legalText: {
      fontSize: width * 0.04,
      color: theme.colors.primary,
    },
    copyrightSection: {
      paddingHorizontal: 16,
      paddingVertical: 24,
      alignItems: "center",
    },
    copyrightText: {
      fontSize: width * 0.03,
      color: theme.colors.textTertiary,
      textAlign: "center",
    },
  });

export default AboutApp;
