import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Dimensions,
} from "react-native";

const { width } = Dimensions.get("window");

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

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 25,
    width: width * 0.9,
    maxWidth: 400,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
  },
  iconContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  checkmark: {
    fontSize: 50,
    color: "#1E9C00",
    backgroundColor: "#E8F5E8",
    width: 80,
    height: 80,
    textAlign: "center",
    textAlignVertical: "center",
    borderRadius: 40,
    overflow: "hidden",
  },
  successTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1F2937",
    textAlign: "center",
    marginBottom: 10,
  },
  successMessage: {
    fontSize: 16,
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 20,
    lineHeight: 22,
  },
  detailsContainer: {
    backgroundColor: "#F9FAFB",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 14,
    color: "#6B7280",
    fontWeight: "600",
  },
  detailValue: {
    fontSize: 14,
    color: "#1F2937",
    fontWeight: "bold",
  },
  instructionsContainer: {
    backgroundColor: "#F0F9FF",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: "#0284C7",
  },
  instructionsTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#0C4A6E",
    marginBottom: 10,
  },
  instructionsText: {
    fontSize: 13,
    color: "#0369A1",
    marginBottom: 5,
    lineHeight: 18,
  },
  closeButton: {
    backgroundColor: "#1E9C00",
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: "center",
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
});

export default PreRegisterModal;
