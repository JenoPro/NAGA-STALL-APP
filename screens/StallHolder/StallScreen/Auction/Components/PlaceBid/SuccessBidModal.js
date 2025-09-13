import React, { useEffect } from "react";
import { View, Text, Modal } from "react-native";

const SubmitBid = ({ visible, onClose }) => {
  useEffect(() => {
    if (visible === true) {
      const timer = setTimeout(() => {
        onClose();
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [visible, onClose]);

  return (
    <Modal
      visible={Boolean(visible)}
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

          {/* Success Title */}
          <Text style={styles.successTitle}>Bid Placed Successfully!</Text>

          {/* Success Message */}
          <Text style={styles.successMessage}>
            Your bid has been submitted successfully.
          </Text>
        </View>
      </View>
    </Modal>
  );
};

import { SubmitBidStyles as styles } from "./SuccessBidModalStyles";

export default SubmitBid;
