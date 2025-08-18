import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

const StallCard = ({ stall }) => {
  const getStatusButton = (status) => {
    switch (status) {
      case 'available':
        return (
          <TouchableOpacity style={[styles.statusButton, styles.availableButton]}>
            <Text style={[styles.statusButtonText, styles.availableButtonText]}>APPLY NOW!</Text>
          </TouchableOpacity>
        );
      case 'locked':
        return (
          <TouchableOpacity style={[styles.statusButton, styles.lockedButton]} disabled>
            <Text style={[styles.statusButtonText, styles.lockedButtonText]}>🔒 LOCK</Text>
          </TouchableOpacity>
        );
      case 'raffle':
        return (
          <TouchableOpacity style={[styles.statusButton, styles.raffleButton]}>
            <Text style={[styles.statusButtonText, styles.raffleButtonText]}>RAFFLE ONGOING</Text>
          </TouchableOpacity>
        );
      case 'applied':
        return (
          <TouchableOpacity style={[styles.statusButton, styles.appliedButton]} disabled>
            <Text style={[styles.statusButtonText, styles.appliedButtonText]}>ALREADY APPLY!</Text>
          </TouchableOpacity>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.stallCard}>
      <View style={styles.cardHeader}>
        <Image source={{ uri: stall.image }} style={styles.stallImage} />
        <TouchableOpacity style={styles.heartIcon}>
          <Text style={styles.heartText}>♥</Text>
        </TouchableOpacity>
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

        <View style={styles.priceContainer}>
          <Text style={styles.priceText}>{stall.price} Php / Monthly</Text>
        </View>

        <View style={styles.detailsContainer}>
          <Text style={styles.floorText}>{stall.floor}</Text>
          <Text style={styles.sizeText}>{stall.size}</Text>
        </View>

        {getStatusButton(stall.status)}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  stallCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    overflow: 'hidden',
  },
  cardHeader: {
    position: 'relative',
  },
  stallImage: {
    width: '100%',
    height: 180,
    backgroundColor: '#F3F4F6',
  },
  heartIcon: {
    position: 'absolute',
    top: 15,
    right: 15,
    backgroundColor: '#FFFFFF',
    width: 35,
    height: 35,
    borderRadius: 17.5,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
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
    color: '#EF4444',
  },
  cardContent: {
    padding: 20,
  },
  stallInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  stallNumberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  stallLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
    marginRight: 4,
  },
  stallNumber: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  locationContainer: {
    backgroundColor: '#002181',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  locationText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  priceContainer: {
    marginBottom: 10,
  },
  priceText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    textAlign: 'right',
  },
  detailsContainer: {
    marginBottom: 15,
  },
  floorText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 2,
  },
  sizeText: {
    fontSize: 14,
    color: '#6B7280',
  },
  statusButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  statusButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  availableButton: {
    backgroundColor: '#002181',
  },
  availableButtonText: {
    color: '#FFFFFF',
  },
  lockedButton: {
    backgroundColor: '#9CA3AF',
  },
  lockedButtonText: {
    color: '#FFFFFF',
  },
  raffleButton: {
    backgroundColor: '#002181',
  },
  raffleButtonText: {
    color: '#FFFFFF',
  },
  appliedButton: {
    backgroundColor: '#9CA3AF',
  },
  appliedButtonText: {
    color: '#FFFFFF',
  },
});

export default StallCard;