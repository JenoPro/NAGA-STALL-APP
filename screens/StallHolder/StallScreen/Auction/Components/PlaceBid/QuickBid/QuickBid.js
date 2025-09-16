import { View, Text, TouchableOpacity } from "react-native";
import { useTheme } from "../../../../Settings/components/ThemeComponents/ThemeContext";
import { QuickBidStyles as styles } from "./QuickBidStyles";

const QuickBid = ({
  bidAmount,
  setBidAmount,
  getMinimumBid,
  minimumIncrement,
  isSubmitting,
  bidError,
  setBidError,
  onQuickBid,
  onOutbid,
  onSetMinimum,
}) => {
  const { theme } = useTheme();
  const quickBidIncrements = [100, 500, 1000];

  // Quick bid functions
  const handleQuickBid = (increment) => {
    if (onQuickBid) {
      onQuickBid(increment);
    } else {
      const currentAmount = parseFloat(bidAmount) || 0;
      const newAmount = currentAmount + increment;
      setBidAmount(newAmount.toString());

      // Clear any existing errors
      if (bidError && setBidError) {
        setBidError("");
      }
    }
  };

  const handleOutbid = () => {
    if (onOutbid) {
      onOutbid();
    } else {
      const minBid = getMinimumBid();
      setBidAmount(minBid.toString());

      if (bidError && setBidError) {
        setBidError("");
      }
    }
  };

  const handleSetMinimum = () => {
    if (onSetMinimum) {
      onSetMinimum();
    } else {
      const minBid = getMinimumBid();
      setBidAmount(minBid.toString());

      if (bidError && setBidError) {
        setBidError("");
      }
    }
  };

  return (
    <View style={styles.quickBidSection}>
      <Text style={styles.quickBidTitle}>Quick Bid</Text>

      {/* Outbid Button */}
      <TouchableOpacity
        style={[styles.outbidButton, isSubmitting && styles.disabledButton]}
        onPress={handleOutbid}
        disabled={isSubmitting}
      >
        <Text
          style={[
            styles.outbidButtonText,
            isSubmitting && styles.disabledButtonText,
          ]}
        >
          Outbid by ₱{minimumIncrement.toLocaleString()}
        </Text>
        <Text
          style={[
            styles.outbidButtonSubtext,
            isSubmitting && styles.disabledButtonSubtext,
          ]}
        >
          ₱{getMinimumBid().toLocaleString()}
        </Text>
      </TouchableOpacity>

      {/* Quick Increment Buttons */}
      <View style={styles.quickIncrementContainer}>
        {quickBidIncrements.map((increment) => (
          <TouchableOpacity
            key={increment}
            style={[
              styles.quickIncrementButton,
              isSubmitting && styles.disabledButton,
            ]}
            onPress={() => handleQuickBid(increment)}
            disabled={isSubmitting}
          >
            <Text
              style={[
                styles.quickIncrementText,
                isSubmitting && styles.disabledButtonText,
              ]}
            >
              +₱{increment.toLocaleString()}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Set Minimum Button */}
      <TouchableOpacity
        style={[styles.setMinimumButton, isSubmitting && styles.disabledButton]}
        onPress={handleSetMinimum}
        disabled={isSubmitting}
      >
        <Text
          style={[
            styles.setMinimumButtonText,
            isSubmitting && styles.disabledButtonText,
          ]}
        >
          Set Minimum Bid
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default QuickBid;
