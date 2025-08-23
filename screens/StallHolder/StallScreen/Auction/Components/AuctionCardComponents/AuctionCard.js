import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, } from "react-native";
import PreRegisterModal from "../PreRegisterComponent/PreRegisterModal";

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

import { AuctionCardStyles as styles } from "../AuctionCardComponents/AuctionCardStyle";

export default AuctionCard;
