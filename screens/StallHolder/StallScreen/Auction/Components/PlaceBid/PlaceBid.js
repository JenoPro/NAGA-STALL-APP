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
import SubmitBid from "./SuccessBidModal";
import HighestBidder from "./HighestBidder";

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
    const now = new Date();

    let auctionDay;
    try {
      auctionDay = new Date(auctionDate);

      // If parsing fails, try manual parsing
      if (isNaN(auctionDay.getTime())) {
        const dateParts = auctionDate.split(" ");
        if (dateParts.length === 3) {
          const month = dateParts[0];
          const day = parseInt(dateParts[1].replace(",", ""));
          const year = parseInt(dateParts[2]);
          auctionDay = new Date(year, getMonthNumber(month), day);
        }
      }
    } catch (error) {
      return true; // Default to true if parsing fails
    }

    return now >= auctionDay;
  };

  const getMinimumBid = () => {
    return currentBid ? currentBid + minimumIncrement : startingPrice;
  };

  const validateBid = (amount) => {
    const numAmount = parseFloat(amount);
    const minBid = getMinimumBid();

    if (!amount || isNaN(numAmount)) {
      return "Please enter a valid bid amount";
    }

    if (numAmount < minBid) {
      return `Bid must be at least ₱${minBid.toLocaleString()}`;
    }

    return "";
  };

  const handleSubmitBid = async () => {
    const error = validateBid(bidAmount);
    if (error) {
      setBidError(error);
      return;
    }

    setIsSubmitting(true);
    setBidError("");

    try {
      await onSubmitBid({
        stallNumber,
        bidAmount: parseFloat(bidAmount),
        timestamp: new Date().toISOString(),
      });

      setIsSuccess(true);
    } catch (error) {
      setBidError("Failed to submit bid. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle bid amount change
  const handleBidChange = (text) => {
    const cleanedText = text.replace(/[^0-9.]/g, "");
    setBidAmount(cleanedText);

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
      <View style={styles.fullScreenContainer}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleClose} style={styles.backButton}>
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Place Your Bid</Text>
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
            <View style={styles.stallInfoCard}>
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
                  <Text style={styles.detailLabel}>📍 Location</Text>
                  <Text style={styles.detailValue}>{location}</Text>
                </View>

                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>💰 Starting Price</Text>
                  <Text style={styles.detailValue}>
                    ₱{startingPrice?.toLocaleString()}
                  </Text>
                </View>

                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>📅 Auction Date</Text>
                  <Text style={styles.detailValue}>{auctionDate}</Text>
                </View>

                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>⏰ Status</Text>
                  <Text
                    style={[
                      styles.detailValue,
                      { color: isAuctionActive() ? "#10B981" : "#F59E0B" },
                    ]}
                  >
                    {isAuctionActive() ? "🟢 Live Auction" : "⏳ Upcoming"}
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
            <View style={styles.bidSection}>
              <Text style={styles.bidSectionTitle}>Your Bid Amount</Text>

              {isAuctionActive() ? (
                <>
                  <View style={styles.bidInputWrapper}>
                    <Text style={styles.currencySymbol}>₱</Text>
                    <TextInput
                      style={[
                        styles.bidInput,
                        isFocused && styles.bidInputFocused,
                        bidError && styles.bidInputError,
                      ]}
                      value={bidAmount}
                      onChangeText={handleBidChange}
                      placeholder={getMinimumBid().toLocaleString()}
                      keyboardType="numeric"
                      onFocus={() => setIsFocused(true)}
                      onBlur={() => setIsFocused(false)}
                      editable={!isSubmitting}
                    />
                  </View>

                  <Text style={styles.minimumBidNote}>
                    Minimum bid: ₱{getMinimumBid().toLocaleString()}
                  </Text>

                  {bidError && <Text style={styles.errorText}>{bidError}</Text>}
                </>
              ) : (
                <View style={styles.auctionNotActiveCard}>
                  <Text style={styles.auctionNotActiveIcon}>⏰</Text>
                  <Text style={styles.auctionNotActiveTitle}>
                    Auction Not Started
                  </Text>
                  <Text style={styles.auctionNotActiveMessage}>
                    The auction for this stall has not started yet. Come back on{" "}
                    {auctionDate} to place your bid.
                  </Text>
                </View>
              )}
            </View>
          </ScrollView>

          {/* Fixed Bottom Action Buttons */}
          {isAuctionActive() && (
            <View style={styles.bottomActions}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={handleClose}
                disabled={Boolean(isSubmitting)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.submitButton,
                  (!bidAmount || bidError || isSubmitting) &&
                    styles.submitButtonDisabled,
                ]}
                onPress={handleSubmitBid}
                disabled={Boolean(!bidAmount || bidError || isSubmitting)}
              >
                <Text
                  style={[
                    styles.submitButtonText,
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
