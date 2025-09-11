import { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import PreRegisterModal from "../PreRegisterComponent/PreRegisterModal";

const AuctionCard = ({ stall, onPreRegister, isPreRegistered }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handlePreRegisterPress = () => {
    console.log("Pre-register button clicked for stall:", stall.stallNumber);
    onPreRegister(stall.id);
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
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
      </View>

      {/* Modal */}
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
