import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useTheme } from "../../../Settings/components/ThemeComponents/ThemeContext";
import SubmitBid from "./SuccessModal/SuccessBidModal";
import HighestBidder from "./HighestBidder/HighestBidder";
import QuickBid from "./QuickBid/QuickBid";

const PlaceBid = ({
  visible,
  onClose,
  stallNumber,
  auctionDate,
  location,
  startingPrice,
  currentBid,
  minimumIncrement = 100,
  onSubmitBid,
  currentBidder = null,
}) => {
  const { theme } = useTheme();
  const [bidAmount, setBidAmount] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bidError, setBidError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  // Helper function to convert month name to number
  const getMonthNumber = (monthName) => {
    const months = {
      January: 0,
      February: 1,
      March: 2,
      April: 3,
      May: 4,
      June: 5,
      July: 6,
      August: 7,
      September: 8,
      October: 9,
      November: 10,
      December: 11,
    };
    return months[monthName] || 0;
  };

  const isAuctionActive = () => {
    if (!auctionDate) return false;

    const now = new Date();
    let auctionDay;

    try {
      // Try standard date parsing first
      auctionDay = new Date(auctionDate);

      // If parsing fails, try manual parsing for "Month Day, Year" format
      if (isNaN(auctionDay.getTime())) {
        const dateParts = auctionDate.trim().split(" ");
        if (dateParts.length === 3) {
          const month = dateParts[0];
          const day = parseInt(dateParts[1].replace(",", ""));
          const year = parseInt(dateParts[2]);

          if (!isNaN(day) && !isNaN(year)) {
            auctionDay = new Date(year, getMonthNumber(month), day);
          }
        }
      }

      // If still invalid, return false
      if (isNaN(auctionDay.getTime())) {
        return false;
      }
    } catch (error) {
      console.warn("Date parsing error:", error);
      return false;
    }

    // Set time to start of day for accurate comparison
    const auctionStart = new Date(auctionDay);
    auctionStart.setHours(0, 0, 0, 0);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return today >= auctionStart;
  };

  const getMinimumBid = () => {
    return currentBid ? currentBid + minimumIncrement : startingPrice;
  };

  // validation function
  const validateBid = (amount) => {
    const numAmount = parseFloat(amount);
    const minBid = getMinimumBid();

    // Check if amount is provided and is a valid number
    if (!amount || amount.trim() === "") {
      return "Please enter a bid amount";
    }

    if (isNaN(numAmount) || numAmount <= 0) {
      return "Please enter a valid positive number";
    }

    // Check decimal places (max 2)
    if (amount.includes(".") && amount.split(".")[1].length > 2) {
      return "Bid amount can have maximum 2 decimal places";
    }

    // Check minimum bid requirement
    if (numAmount < minBid) {
      return `Bid must be at least ₱${minBid.toLocaleString()}`;
    }

    // Check if bid is too high (reasonable maximum)
    const maxBid = startingPrice * 10; // 10x starting price as max
    if (numAmount > maxBid) {
      return `Bid cannot exceed ₱${maxBid.toLocaleString()}`;
    }

    // Check if increment is too small (must be at least minimum increment)
    if (currentBid && numAmount - currentBid < minimumIncrement) {
      return `Bid increment must be at least ₱${minimumIncrement.toLocaleString()}`;
    }

    return "";
  };

  const handleSubmitBid = async () => {
    const error = validateBid(bidAmount);
    if (error) {
      setBidError(error);
      return;
    }

    // Check if auction is still active before submitting
    if (!isAuctionActive()) {
      setBidError("Auction is not currently active");
      return;
    }

    setIsSubmitting(true);
    setBidError("");

    try {
      const bidData = {
        stallNumber,
        bidAmount: parseFloat(bidAmount),
        timestamp: new Date().toISOString(),
        previousBid: currentBid,
        minimumIncrement,
      };

      await onSubmitBid(bidData);
      setIsSuccess(true);
    } catch (error) {
      console.error("Bid submission error:", error);
      setBidError(error.message || "Failed to submit bid. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle bid amount change with improved formatting
  const handleBidChange = (text) => {
    const cleanedText = text.replace(/[^0-9.]/g, "");

    // Prevent multiple decimal points
    const parts = cleanedText.split(".");
    let formattedText = parts[0];
    if (parts.length > 1) {
      // Keep only first decimal point and limit to 2 decimal places
      formattedText += "." + parts[1].substring(0, 2);
    }

    setBidAmount(formattedText);

    // Clear errors when user starts typing
    if (bidError) {
      setBidError("");
    }
  };

  // Reset modal state when closed
  const handleClose = () => {
    setBidAmount("");
    setBidError("");
    setIsSuccess(false);
    setIsFocused(false);
    onClose();
  };

  // Return to PlaceBid instead of closing completely
  const handleSuccessClose = () => {
    setIsSuccess(false);
    setBidAmount("");
    setBidError("");
    setIsFocused(false);
  };

  // Success view use SubmitBid component
  if (isSuccess) {
    return <SubmitBid visible={true} onClose={handleSuccessClose} />;
  }

  return (
    <Modal
      visible={Boolean(visible)}
      animationType="slide"
      onRequestClose={handleClose}
      statusBarTranslucent={true}
    >
      <View
        style={[
          styles.fullScreenContainer,
          { backgroundColor: theme.colors.background },
        ]}
      >
        {/* Header */}
        <View
          style={[
            styles.header,
            {
              backgroundColor: theme.colors.surface,
              borderBottomColor: theme.colors.border,
            },
          ]}
        >
          <TouchableOpacity onPress={handleClose} style={styles.backButton}>
            <Text
              style={[styles.backButtonText, { color: theme.colors.primary }]}
            >
              Back
            </Text>
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
            Place Your Bid
          </Text>
          <View style={styles.headerSpacer} />
        </View>

        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
        >
          <ScrollView
            style={styles.scrollContainer}
            contentContainerStyle={styles.scrollContentContainer}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="interactive"
          >
            {/* Stall Information Card */}
            <View
              style={[
                styles.stallInfoCard,
                {
                  backgroundColor: theme.colors.card,
                  borderColor: theme.colors.border,
                },
              ]}
            >
              <View style={styles.stallHeader}>
                <View style={styles.stallNumberBadge}>
                  <Text style={styles.stallNumberText}>
                    STALL #{stallNumber}
                  </Text>
                </View>
                <View style={styles.auctionBadge}>
                  <Text style={styles.auctionBadgeText}>AUCTION</Text>
                </View>
              </View>

              <View style={styles.stallDetails}>
                <View style={styles.detailRow}>
                  <Text
                    style={[
                      styles.detailLabel,
                      { color: theme.colors.textSecondary },
                    ]}
                  >
                    Location
                  </Text>
                  <Text
                    style={[styles.detailValue, { color: theme.colors.text }]}
                  >
                    {location}
                  </Text>
                </View>

                <View style={styles.detailRow}>
                  <Text
                    style={[
                      styles.detailLabel,
                      { color: theme.colors.textSecondary },
                    ]}
                  >
                    Starting Price
                  </Text>
                  <Text
                    style={[styles.detailValue, { color: theme.colors.text }]}
                  >
                    ₱{startingPrice?.toLocaleString()}
                  </Text>
                </View>

                <View style={styles.detailRow}>
                  <Text
                    style={[
                      styles.detailLabel,
                      { color: theme.colors.textSecondary },
                    ]}
                  >
                    Auction Date
                  </Text>
                  <Text
                    style={[styles.detailValue, { color: theme.colors.text }]}
                  >
                    {auctionDate}
                  </Text>
                </View>

                <View style={styles.detailRow}>
                  <Text
                    style={[
                      styles.detailLabel,
                      { color: theme.colors.textSecondary },
                    ]}
                  >
                    Status
                  </Text>
                  <Text
                    style={[
                      styles.detailValue,
                      { color: isAuctionActive() ? "#10B981" : "#F59E0B" },
                    ]}
                  >
                    {isAuctionActive() ? "Live Auction" : "Upcoming"}
                  </Text>
                </View>
              </View>
            </View>

            {/* HighestBidder Component */}
            <HighestBidder
              currentBid={currentBid}
              currentBidder={currentBidder}
              showLiveBadge={true}
            />

            {/* Bid Input Section */}
            <View
              style={[
                styles.bidSection,
                {
                  backgroundColor: theme.colors.card,
                  borderColor: theme.colors.border,
                },
              ]}
            >
              <Text
                style={[styles.bidSectionTitle, { color: theme.colors.text }]}
              >
                Your Bid Amount
              </Text>

              {isAuctionActive() ? (
                <>
                  <View
                    style={[
                      styles.bidInputWrapper,
                      {
                        backgroundColor: theme.colors.surface,
                        borderColor: theme.colors.border,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.currencySymbol,
                        { color: theme.colors.textSecondary },
                      ]}
                    >
                      ₱
                    </Text>
                    <TextInput
                      style={[
                        styles.bidInput,
                        { color: theme.colors.text },
                        isFocused && { borderColor: theme.colors.primary },
                        bidError && { borderColor: theme.colors.error },
                      ]}
                      value={bidAmount}
                      onChangeText={handleBidChange}
                      placeholder={getMinimumBid().toLocaleString()}
                      placeholderTextColor={theme.colors.textTertiary}
                      keyboardType="numeric"
                      onFocus={() => setIsFocused(true)}
                      onBlur={() => setIsFocused(false)}
                      editable={!isSubmitting}
                    />
                  </View>

                  <Text
                    style={[
                      styles.minimumBidNote,
                      { color: theme.colors.textSecondary },
                    ]}
                  >
                    Minimum bid: ₱{getMinimumBid().toLocaleString()}
                  </Text>

                  {/* QuickBid Component */}
                  <QuickBid
                    bidAmount={bidAmount}
                    setBidAmount={setBidAmount}
                    getMinimumBid={getMinimumBid}
                    minimumIncrement={minimumIncrement}
                    isSubmitting={isSubmitting}
                    bidError={bidError}
                    setBidError={setBidError}
                  />

                  {bidError && (
                    <Text
                      style={[styles.errorText, { color: theme.colors.error }]}
                    >
                      {bidError}
                    </Text>
                  )}
                </>
              ) : (
                <View
                  style={[
                    styles.auctionNotActiveCard,
                    {
                      backgroundColor: theme.colors.surface,
                      borderColor: theme.colors.border,
                    },
                  ]}
                >
                  <Text style={styles.auctionNotActiveIcon}>⏰</Text>
                  <Text
                    style={[
                      styles.auctionNotActiveTitle,
                      { color: theme.colors.text },
                    ]}
                  >
                    Auction Not Started
                  </Text>
                  <Text
                    style={[
                      styles.auctionNotActiveMessage,
                      { color: theme.colors.textSecondary },
                    ]}
                  >
                    The auction for this stall has not started yet. Come back on{" "}
                    {auctionDate} to place your bid.
                  </Text>
                </View>
              )}
            </View>
          </ScrollView>

          {/* Fixed Bottom Action Buttons */}
          {isAuctionActive() && (
            <View
              style={[
                styles.bottomActions,
                {
                  backgroundColor: theme.colors.surface,
                  borderTopColor: theme.colors.border,
                },
              ]}
            >
              <TouchableOpacity
                style={[
                  styles.cancelButton,
                  { backgroundColor: theme.colors.borderLight },
                ]}
                onPress={handleClose}
                disabled={Boolean(isSubmitting)}
              >
                <Text
                  style={[
                    styles.cancelButtonText,
                    { color: theme.colors.textSecondary },
                  ]}
                >
                  Cancel
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.submitButton,
                  {
                    backgroundColor:
                      !bidAmount || bidError || isSubmitting
                        ? theme.colors.borderLight
                        : theme.colors.primary,
                  },
                  (!bidAmount || bidError || isSubmitting) &&
                    styles.submitButtonDisabled,
                ]}
                onPress={handleSubmitBid}
                disabled={Boolean(!bidAmount || bidError || isSubmitting)}
              >
                <Text
                  style={[
                    styles.submitButtonText,
                    {
                      color:
                        !bidAmount || bidError || isSubmitting
                          ? theme.colors.textTertiary
                          : "#FFFFFF",
                    },
                    (!bidAmount || bidError || isSubmitting) &&
                      styles.submitButtonTextDisabled,
                  ]}
                >
                  {isSubmitting ? "Submitting..." : "Place Bid"}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
};

import { PlaceBidStyles as styles } from "./PlaceBidStyles";

export default PlaceBid;
