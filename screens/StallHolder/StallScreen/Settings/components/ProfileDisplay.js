import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { mockUser } from "./mockUser";

const { width, height } = Dimensions.get("window");

const ProfileDisplay = ({ user, onGoBack }) => {
  console.log("ProfileDisplay component rendered with user:", user);

  // Log when component mounts
  React.useEffect(() => {
    console.log("ProfileDisplay component mounted successfully");
    console.log("Profile data loaded and ready to display");
  }, []);

  // Use user data if available, otherwise fall back to mockUser data instead of static "John Doe" data
  const profileData = {
    // Personal Information
    fullName: user?.fullName || mockUser.fullName,
    education: user?.education || mockUser.education,
    age: user?.age || mockUser.age,
    civilStatus: user?.civilStatus || mockUser.civilStatus,
    contactNumber: user?.contactNumber || mockUser.contactNumber,
    mailingAddress: user?.mailingAddress || mockUser.mailingAddress,

    // Spouse Information
    spouseName: user?.spouseName || mockUser.spouseName,
    spouseAge: user?.spouseAge || mockUser.spouseAge,
    spouseEducation: user?.spouseEducation || mockUser.spouseEducation,
    occupation: user?.occupation || mockUser.occupation,
    spouseContact: user?.spouseContact || mockUser.spouseContact,

    // Business Information
    businessCapitalization:
      user?.businessCapitalization || mockUser.businessCapitalization,
    sourceOfCapital: user?.sourceOfCapital || mockUser.sourceOfCapital,
    previousBusiness: user?.previousBusiness || mockUser.previousBusiness,
    applicantRelative: user?.applicantRelative || mockUser.applicantRelative,

    // Other Information
    emailAddress: user?.emailAddress || mockUser.emailAddress,
  };

  const InfoSection = ({ title, children }) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.sectionContent}>{children}</View>
    </View>
  );

  const InfoRow = ({ label, value }) => (
    <View style={styles.infoRow}>
      <Text style={styles.label}>{label}:</Text>
      <Text style={styles.value}>{value || "Not provided"}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={onGoBack}>
        <Ionicons name="arrow-back" size={24} color="#fff" />
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>

      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatarText}>
            {profileData.fullName
              .split(" ")
              .map((name) => name[0])
              .join("")
              .substring(0, 2)}
          </Text>
        </View>
        <Text style={styles.profileName}>{profileData.fullName}</Text>
        <Text style={styles.profileEmail}>{profileData.emailAddress}</Text>
      </View>

      <InfoSection title="Personal Information">
        <InfoRow label="Full Name" value={profileData.fullName} />
        <InfoRow label="Age" value={profileData.age?.toString()} />
        <InfoRow label="Civil Status" value={profileData.civilStatus} />
        <InfoRow label="Education" value={profileData.education} />
        <InfoRow label="Contact Number" value={profileData.contactNumber} />
        <InfoRow label="Mailing Address" value={profileData.mailingAddress} />
      </InfoSection>

      {profileData.civilStatus !== "Single" && (
        <InfoSection title="Spouse Information">
          <InfoRow label="Spouse Name" value={profileData.spouseName} />
          <InfoRow
            label="Spouse Age"
            value={profileData.spouseAge?.toString()}
          />
          <InfoRow
            label="Spouse Education"
            value={profileData.spouseEducation}
          />
          <InfoRow label="Occupation" value={profileData.occupation} />
          <InfoRow label="Spouse Contact" value={profileData.spouseContact} />
        </InfoSection>
      )}

      <InfoSection title="Business Information">
        <InfoRow
          label="Capitalization"
          value={`₱${profileData.businessCapitalization?.toLocaleString()}`}
        />
        <InfoRow
          label="Source of Capital"
          value={profileData.sourceOfCapital}
        />
        <InfoRow
          label="Previous Business"
          value={profileData.previousBusiness}
        />
        <InfoRow
          label="Relative at NCPM"
          value={profileData.applicantRelative}
        />
      </InfoSection>

      <InfoSection title="Documents">
        <InfoRow label="Signature" value="✓ Uploaded" />
        <InfoRow label="House Sketch" value="✓ Uploaded" />
        <InfoRow label="Valid ID" value="✓ Uploaded" />
      </InfoSection>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Application Status: Pending Review
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  backButton: {
    position: "absolute",
    top: height * 0.02,
    left: width * 0.02,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    zIndex: 1,
  },
  backButtonText: {
    color: "#fff",
    fontSize: width * 0.04,
    marginLeft: 4,
    fontWeight: "500",
  },
  header: {
    backgroundColor: "#1f2937",
    alignItems: "center",
    paddingVertical: height * 0.04,
    paddingHorizontal: width * 0.06,
  },
  avatarContainer: {
    width: width * 0.2,
    height: width * 0.2,
    borderRadius: width * 0.1,
    backgroundColor: "#3b82f6",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: height * 0.015,
  },
  avatarText: {
    fontSize: width * 0.08,
    fontWeight: "bold",
    color: "white",
  },
  profileName: {
    fontSize: width * 0.06,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginBottom: height * 0.005,
  },
  profileEmail: {
    fontSize: width * 0.04,
    color: "#9ca3af",
    textAlign: "center",
  },
  section: {
    backgroundColor: "white",
    marginHorizontal: width * 0.04,
    marginTop: height * 0.02,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: width * 0.05,
    fontWeight: "bold",
    color: "#1f2937",
    padding: width * 0.04,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  sectionContent: {
    padding: width * 0.04,
  },
  infoRow: {
    flexDirection: "row",
    marginBottom: height * 0.015,
    alignItems: "flex-start",
  },
  label: {
    fontSize: width * 0.04,
    fontWeight: "600",
    color: "#374151",
    width: "40%",
    marginRight: width * 0.02,
  },
  value: {
    fontSize: width * 0.04,
    color: "#6b7280",
    flex: 1,
    textAlign: "right",
  },
  footer: {
    alignItems: "center",
    paddingVertical: height * 0.03,
    paddingHorizontal: width * 0.06,
  },
  footerText: {
    fontSize: width * 0.035,
    color: "#9ca3af",
    fontStyle: "italic",
  },
});

export default ProfileDisplay;