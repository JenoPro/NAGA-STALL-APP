import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import PreRegisterModal from "./PreRegisterModal";

const AuctionCard = ({ stall }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handlePreRegisterPress = () => {
    // console logs upon clicking the pre-register button
    console.log("Pre-register button clicked for stall:", stall.stallNumber);
    console.log("Stall details:", {
      id: stall.id,
      stallNumber: stall.stallNumber,
      location: stall.location,
      floor: stall.floor,
      startingPrice: stall.price,
      status: stall.status,
      stallDescription: stall.stallDescription,
      auctionDate: stall.auctionDate,
    });

    // Show the modal
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

  const getAuctionStatusButton = (status) => {
    return (
      <TouchableOpacity
        style={[styles.statusButton, styles.preRegisterButton]}
        onPress={handlePreRegisterPress}
      >
        <Text style={[styles.statusButtonText, styles.preRegisterButtonText]}>
          PRE-REGISTER FOR AUCTION
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.auctionCard}>
      <View style={styles.cardHeader}>
        <Image source={{ uri: stall.image }} style={styles.stallImage} />
        {/* auction Badge */}
        <View style={styles.auctionBadge}>
          <Text style={styles.auctionBadgeText}>AUCTION</Text>
        </View>
      </View>

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

        {/* starting Price Section */}
        <View style={styles.startingPriceContainer}>
          <Text style={styles.startingPriceLabel}>Starting Price:</Text>
          <Text style={styles.startingPriceText}>{stall.price} Php</Text>
        </View>

        <View style={styles.detailsContainer}>
          <Text style={styles.floorText}>{stall.floor}</Text>
          <Text style={styles.sizeText}>{stall.size}</Text>
        </View>

        {/* stall Description */}
        <View style={styles.stallDescriptionContainer}>
          <Text style={styles.stallDescriptionLabel}>Stall Description:</Text>
          <Text style={styles.descriptionText}>{stall.stallDescription}</Text>
        </View>

        {/* auction Date */}
        <View style={styles.auctionDateContainer}>
          <Text style={styles.auctionDateLabel}>Auction Date:</Text>
          <Text style={styles.auctionDateText}>{stall.auctionDate}</Text>
        </View>

        {getAuctionStatusButton(stall.status)}
      </View>

      {/* Pre-Register Modal */}
      <PreRegisterModal
        visible={modalVisible}
        onClose={handleModalClose}
        stallNumber={stall.stallNumber}
        auctionDate={stall.auctionDate}
        location={stall.location}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  auctionCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "#1E9C00",
  },
  cardHeader: {
    position: "relative",
  },
  stallImage: {
    width: "100%",
    height: 180,
    backgroundColor: "#F3F4F6",
  },
  heartIcon: {
    position: "absolute",
    top: 15,
    right: 15,
    backgroundColor: "#FFFFFF",
    width: 35,
    height: 35,
    borderRadius: 17.5,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  heartText: {
    fontSize: 16,
    color: "#EF4444",
  },
  auctionBadge: {
    position: "absolute",
    top: 15,
    left: 15,
    backgroundColor: "#1E9C00",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  auctionBadgeText: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  cardContent: {
    padding: 20,
  },
  stallInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  stallNumberContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  stallLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#6B7280",
    marginRight: 4,
  },
  stallNumber: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#1F2937",
  },
  locationContainer: {
    backgroundColor: "#002181",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  locationText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  startingPriceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    backgroundColor: "#e6f8ea",
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: "#1E9C00",
  },
  startingPriceLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1E9C00",
  },
  startingPriceText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1E9C00",
  },
  detailsContainer: {
    marginBottom: 15,
  },
  floorText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 2,
  },
  sizeText: {
    fontSize: 14,
    color: "#6B7280",
  },
  stallDescriptionContainer: {
    backgroundColor: "#F0F9FF",
    padding: 10,
    borderRadius: 7,
    marginBottom: 15,
  },
  descriptionText: {
    fontSize: 14,
  },
  stallDescriptionLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#002181",
  },
  auctionDateContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F0F9FF",
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
    borderLeftWidth: 4,
    borderLeftColor: "#0284C7",
  },
  auctionDateLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#0C4A6E",
  },
  auctionDateText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#0369A1",
  },
  statusButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
  },
  statusButtonText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  preRegisterButton: {
    backgroundColor: "#0284C7",
  },
  preRegisterButtonText: {
    color: "#FFFFFF",
  },
});

export default AuctionCard;
