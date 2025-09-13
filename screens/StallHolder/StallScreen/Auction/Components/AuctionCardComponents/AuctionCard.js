import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import PreRegisterModal from "../PreRegisterComponent/PreRegisterModal";
import PlaceBid from "../PlaceBid/PlaceBid";

const AuctionCard = ({
  stall,
  onPreRegister,
  isPreRegistered,
  onSubmitBid,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [showPlaceBid, setShowPlaceBid] = useState(false);
  const [countdown, setCountdown] = useState("");

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

  // auction active check with better date parsing
  const isAuctionActive = () => {
    const now = new Date();

    let auctionDay;
    try {
      auctionDay = new Date(stall.auctionDate);

      // If parsing fails, try manual parsing
      if (isNaN(auctionDay.getTime())) {
        const dateParts = stall.auctionDate.split(" ");
        if (dateParts.length === 3) {
          const month = dateParts[0];
          const day = parseInt(dateParts[1].replace(",", ""));
          const year = parseInt(dateParts[2]);
          auctionDay = new Date(year, getMonthNumber(month), day);
        }
      }
    } catch (error) {
      return false;
    }

    // Set auction time to start of day for comparison
    auctionDay.setHours(0, 0, 0, 0);
    now.setHours(0, 0, 0, 0);

    return now >= auctionDay;
  };

  // Calculate countdown to auction
  const calculateCountdown = () => {
    const now = new Date();

    // Use the same date parsing logic as isAuctionActive
    let auctionDay;
    try {
      auctionDay = new Date(stall.auctionDate);

      if (isNaN(auctionDay.getTime())) {
        const dateParts = stall.auctionDate.split(" ");
        if (dateParts.length === 3) {
          const month = dateParts[0];
          const day = parseInt(dateParts[1].replace(",", ""));
          const year = parseInt(dateParts[2]);
          auctionDay = new Date(year, getMonthNumber(month), day);
        }
      }
    } catch (error) {
      return "";
    }

    // If auction has started, return empty string
    if (now >= auctionDay) {
      return "";
    }

    const diff = auctionDay.getTime() - now.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    if (days > 0) {
      return `${days}d ${hours}h ${minutes}m`;
    } else if (hours > 0) {
      return `${hours}h ${minutes}m`;
    } else if (minutes > 0) {
      return `${minutes}m`;
    } else {
      return "Starting soon...";
    }
  };

  useEffect(() => {
    const updateCountdown = () => {
      const newCountdown = calculateCountdown();
      setCountdown(newCountdown);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 30000);

    return () => clearInterval(interval);
  }, [stall.auctionDate]);

  const handlePreRegisterPress = () => {
    onPreRegister(stall.id);
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

  const handlePlaceBidPress = () => {
    setShowPlaceBid(true);
  };

  const handlePlaceBidClose = () => {
    setShowPlaceBid(false);
  };

  const handleSubmitBid = async (bidData) => {
    try {
      if (onSubmitBid) {
        await onSubmitBid(stall.id, bidData);
      }
    } catch (error) {
      console.error("Error submitting bid:", error);
      throw error;
    }
  };

  return (
    <View style={styles.auctionCard}>
      {/* Stall Image + Badge */}
      <View style={styles.cardHeader}>
        <Image source={{ uri: stall.image }} style={styles.stallImage} />
        <View style={styles.auctionBadge}>
          <Text style={styles.auctionBadgeText}>AUCTION</Text>
        </View>
      </View>

      {/* Stall Info */}
      <View style={styles.cardContent}>
        <View style={styles.stallInfo}>
          <View style={styles.stallNumberContainer}>
            <Text style={styles.stallLabel}>STALL#</Text>
            <Text style={styles.stallNumber}>{stall.stallNumber}</Text>
          </View>

          <View style={styles.locationContainer}>
            <Text style={styles.locationText}>{stall.location}</Text>
          </View>
        </View>

        {/* Starting Price */}
        <View style={styles.startingPriceContainer}>
          <Text style={styles.startingPriceLabel}>Starting Price:</Text>
          <Text style={styles.startingPriceText}>{stall.price} Php</Text>
        </View>

        {/* Floor + Size */}
        <View style={styles.detailsContainer}>
          <Text style={styles.floorText}>{stall.floor}</Text>
          <Text style={styles.sizeText}>{stall.size}</Text>
        </View>

        {/* Stall Description */}
        <View style={styles.stallDescriptionContainer}>
          <Text style={styles.stallDescriptionLabel}>Stall Description:</Text>
          <Text style={styles.descriptionText}>{stall.stallDescription}</Text>
        </View>

        {/* Auction Date */}
        <View style={styles.auctionDateContainer}>
          <Text style={styles.auctionDateLabel}>Auction Date:</Text>
          <Text style={styles.auctionDateText}>{stall.auctionDate}</Text>
        </View>

        {/* Pre-Register Button */}
        <TouchableOpacity
          style={[
            styles.statusButton,
            styles.preRegisterButton,
            isPreRegistered ? styles.disabledButton : null,
          ]}
          onPress={handlePreRegisterPress}
          disabled={isPreRegistered}
        >
          <Text style={[styles.statusButtonText, styles.preRegisterButtonText]}>
            {isPreRegistered
              ? "Already pre-registered"
              : "Pre-register for Auction"}
          </Text>
        </TouchableOpacity>

        {/* Place Bid Button - Only show if pre-registered */}
        {isPreRegistered && (
          <TouchableOpacity
            style={[
              styles.statusButton,
              styles.placeBidButton,
              !isAuctionActive() && styles.placeBidButtonDisabled,
            ]}
            onPress={handlePlaceBidPress}
            disabled={!isAuctionActive()}
          >
            <View style={styles.buttonContent}>
              <Text
                style={[
                  styles.statusButtonText,
                  styles.placeBidButtonText,
                  !isAuctionActive() && styles.placeBidButtonTextDisabled,
                ]}
              >
                {isAuctionActive() ? "Place Bid" : "Auction Starts"}
              </Text>
              {!isAuctionActive() && countdown && (
                <Text
                  style={[
                    styles.countdownText,
                    !isAuctionActive() && styles.countdownTextDisabled,
                  ]}
                >
                  {countdown}
                </Text>
              )}
              {!isAuctionActive() && !countdown && (
                <Text
                  style={[
                    styles.countdownText,
                    !isAuctionActive() && styles.countdownTextDisabled,
                  ]}
                >
                  {stall.auctionDate}
                </Text>
              )}
            </View>
          </TouchableOpacity>
        )}
      </View>

      {/* Pre-Register Modal */}
      <PreRegisterModal
        visible={modalVisible}
        onClose={handleModalClose}
        stallNumber={stall.stallNumber}
        auctionDate={stall.auctionDate}
        location={stall.location}
      />

      {/* Place Bid Modal */}
      <PlaceBid
        visible={showPlaceBid}
        onClose={handlePlaceBidClose}
        stallNumber={stall.stallNumber}
        auctionDate={stall.auctionDate}
        location={stall.location}
        startingPrice={
          stall.priceValue || parseInt(stall.price.replace(/,/g, ""))
        }
        currentBid={stall.currentBid}
        currentBidder={stall.currentBidder}
        onSubmitBid={handleSubmitBid}
      />
    </View>
  );
};

import { AuctionCardStyles as styles } from "../AuctionCardComponents/AuctionCardStyle";

export default AuctionCard;
