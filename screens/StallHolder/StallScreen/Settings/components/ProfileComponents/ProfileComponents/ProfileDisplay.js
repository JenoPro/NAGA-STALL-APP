import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { mockUser } from "../mockUser";
import EditProfileModal from "../EditComponents/editProfile";
// import { useTheme } from "../ThemeContext"; babalikan kita soon, darkmode.

const ProfileDisplay = ({ user, onGoBack, onUpdateUser }) => {
  console.log("ProfileDisplay component rendered with user:", user);

  // state for controlling edit modal visibility
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [currentUser, setCurrentUser] = useState(user);

  // log when component mounts
  React.useEffect(() => {
    console.log("ProfileDisplay component mounted successfully");
    console.log("Profile data loaded and ready to display");
  }, []);

  // use current user data if available, otherwise fall back to mockUser data
  const profileData = {
    // personal Information
    fullName: currentUser?.fullName || mockUser.fullName,
    education: currentUser?.education || mockUser.education,
    age: currentUser?.age || mockUser.age,
    civilStatus: currentUser?.civilStatus || mockUser.civilStatus,
    contactNumber: currentUser?.contactNumber || mockUser.contactNumber,
    mailingAddress: currentUser?.mailingAddress || mockUser.mailingAddress,

    // spouse Information
    spouseName: currentUser?.spouseName || mockUser.spouseName,
    spouseAge: currentUser?.spouseAge || mockUser.spouseAge,
    spouseEducation: currentUser?.spouseEducation || mockUser.spouseEducation,
    occupation: currentUser?.occupation || mockUser.occupation,
    spouseContact: currentUser?.spouseContact || mockUser.spouseContact,

    // business Information
    businessCapitalization:
      currentUser?.businessCapitalization || mockUser.businessCapitalization,
    sourceOfCapital: currentUser?.sourceOfCapital || mockUser.sourceOfCapital,
    previousBusiness:
      currentUser?.previousBusiness || mockUser.previousBusiness,
    applicantRelative:
      currentUser?.applicantRelative || mockUser.applicantRelative,

    // other Information
    emailAddress: currentUser?.emailAddress || mockUser.emailAddress,
  };

  // handle saving updated profile data
  const handleSaveProfile = (updatedData) => {
    setCurrentUser(updatedData);
    setIsEditModalVisible(false);

  // if the parent component provided an update handler, call it
    if (onUpdateUser) {
      onUpdateUser(updatedData);
    }
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
    <>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Back Button */}
        <TouchableOpacity style={styles.backButton} onPress={onGoBack}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>

        {/* Edit Button */}
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => setIsEditModalVisible(true)}
        >
          <Ionicons name="create-outline" size={24} color="#fff" />
          <Text style={styles.editButtonText}>Edit</Text>
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

        <InfoSection title="Other Information">
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

      {/* Edit Profile Modal */}
      <EditProfileModal
        visible={isEditModalVisible}
        onClose={() => setIsEditModalVisible(false)}
        user={currentUser || mockUser}
        onSave={handleSaveProfile}
      />
    </>
  );
};

import { ProfileStyles as styles } from "./ProfileStyles";
 
export default ProfileDisplay;
