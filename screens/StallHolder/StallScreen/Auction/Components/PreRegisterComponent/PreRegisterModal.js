import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
} from "react-native";

const PreRegisterModal = ({
  visible,
  onClose,
  stallNumber,
  auctionDate,
  location,
}) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          {/* Success Icon */}
          <View style={styles.iconContainer}>
            <Text style={styles.checkmark}>✓</Text>
          </View>

          {/* Success Message */}
          <Text style={styles.successTitle}>Pre-Registration Successful!</Text>

          <Text style={styles.successMessage}>
            You have successfully pre-registered for the auction of Stall #
            {stallNumber}.
          </Text>

          {/* Auction Details */}
          <View style={styles.detailsContainer}>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Stall Number:</Text>
              <Text style={styles.detailValue}>#{stallNumber}</Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Location:</Text>
              <Text style={styles.detailValue}>{location}</Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Auction Date:</Text>
              <Text style={styles.detailValue}>{auctionDate}</Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Venue:</Text>
              <Text style={styles.detailValue}> MEPO Office</Text>
            </View>
          </View>

          {/* Instructions */}
          <View style={styles.instructionsContainer}>
            <Text style={styles.instructionsTitle}>Important Notes:</Text>
            <Text style={styles.instructionsText}>
              • Please arrive at the MEPO office 20-30 minutes before the
              auction
            </Text>
            <Text style={styles.instructionsText}>
              • Bring any valid ID for verification
            </Text>
            <Text style={styles.instructionsText}>
              • Bring all the documents required for the auction
            </Text>
          </View>

          {/* Close Button */}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

import { PreRegisterStyles as styles } from "../PreRegisterComponent/PreRegisterStyles";

export default PreRegisterModal;
