import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Modal,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width } = Dimensions.get('window');

const SearchFilterBar = ({ 
  onSearch, 
  onFilter, 
  searchValue = '', 
  selectedFilters = [] 
}) => {
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [tempFilters, setTempFilters] = useState(selectedFilters);

  const filterOptions = [
    { id: 'live', label: 'Live Raffles', color: '#dc2626' },
    { id: 'upcoming', label: 'Upcoming', color: '#059669' },
    { id: 'expired', label: 'Expired', color: '#6b7280' },
    { id: 'floor1', label: '1st Floor', color: '#3b82f6' },
    { id: 'floor2', label: '2nd Floor', color: '#8b5cf6' },
    { id: 'grocery', label: 'Grocery Section', color: '#f59e0b' },
    { id: 'electronics', label: 'Electronics', color: '#10b981' },
    { id: 'clothing', label: 'Clothing', color: '#ef4444' },
  ];

  const handleFilterToggle = (filterId) => {
    setTempFilters(prev => 
      prev.includes(filterId) 
        ? prev.filter(id => id !== filterId)
        : [...prev, filterId]
    );
  };

  const applyFilters = () => {
    onFilter(tempFilters);
    setShowFilterModal(false);
  };

  const clearFilters = () => {
    setTempFilters([]);
    onFilter([]);
    setShowFilterModal(false);
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <Icon name="search" size={20} color="#6b7280" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search by stall number or location..."
            value={searchValue}
            onChangeText={onSearch}
            placeholderTextColor="#9ca3af"
          />
        </View>
        
        <TouchableOpacity 
          style={[
            styles.filterButton,
            selectedFilters.length > 0 && styles.filterButtonActive
          ]}
          onPress={() => setShowFilterModal(true)}
        >
          <Icon name="filter-list" size={20} color="#6b7280" />
          {selectedFilters.length > 0 && (
            <View style={styles.filterBadge}>
              <Text style={styles.filterBadgeText}>{selectedFilters.length}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <Modal
        visible={showFilterModal}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setShowFilterModal(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowFilterModal(false)}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Filter Options</Text>
              <TouchableOpacity 
                onPress={() => setShowFilterModal(false)}
                style={styles.closeButton}
              >
                <Icon name="close" size={20} color="#6b7280" />
              </TouchableOpacity>
            </View>

            <FlatList
              data={filterOptions}
              keyExtractor={(item) => item.id}
              style={styles.filterList}
              renderItem={({ item: option }) => (
                <TouchableOpacity
                  style={[
                    styles.filterOption,
                    tempFilters.includes(option.id) && styles.filterOptionSelected
                  ]}
                  onPress={() => handleFilterToggle(option.id)}
                >
                  <View style={[styles.filterColorDot, { backgroundColor: option.color }]} />
                  <Text style={[
                    styles.filterOptionText,
                    tempFilters.includes(option.id) && styles.filterOptionTextSelected
                  ]}>
                    {option.label}
                  </Text>
                  {tempFilters.includes(option.id) && (
                    <Icon name="check" size={20} color="#059669" />
                  )}
                </TouchableOpacity>
              )}
              showsVerticalScrollIndicator={false}
            />

            <View style={styles.modalActions}>
              <TouchableOpacity 
                style={styles.clearButton}
                onPress={clearFilters}
              >
                <Text style={styles.clearButtonText}>Clear All</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.applyButton}
                onPress={applyFilters}
              >
                <Text style={styles.applyButtonText}>Apply Filters</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: width * 0.04,
    paddingVertical: 12,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    alignItems: 'center',
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    borderRadius: 25,
    paddingHorizontal: 16,
    marginRight: 12,
    height: 45,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#374151',
  },
  filterButton: {
    backgroundColor: '#ffffffff',
    borderRadius: 25,
    padding: 12,
    position: 'relative',
    minWidth: 45,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  filterButtonActive: {
    backgroundColor: '#3b82f6',
  },
  filterBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#dc2626',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterBadgeText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingTop: 140,
    paddingRight: width * 0.04,
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    minWidth: width * 0.65,
    maxWidth: width * 0.85,
    maxHeight: '70%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6.84,
    elevation: 8,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1f2937',
  },
  closeButton: {
    padding: 4,
  },
  filterList: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  filterOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 16,
    marginVertical: 2,
    borderRadius: 10,
    backgroundColor: '#f9fafb',
  },
  filterOptionSelected: {
    backgroundColor: '#ecfdf5',
    borderWidth: 1,
    borderColor: '#059669',
  },
  filterColorDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 12,
  },
  filterOptionText: {
    flex: 1,
    fontSize: 16,
    color: '#374151',
  },
  filterOptionTextSelected: {
    color: '#059669',
    fontWeight: '600',
  },
  modalActions: {
    flexDirection: 'row',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  clearButton: {
    flex: 1,
    paddingVertical: 12,
    marginRight: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#d1d5db',
    alignItems: 'center',
  },
  clearButtonText: {
    fontSize: 16,
    color: '#6b7280',
    fontWeight: '600',
  },
  applyButton: {
    flex: 1,
    paddingVertical: 12,
    marginLeft: 8,
    borderRadius: 8,
    backgroundColor: '#3b82f6',
    alignItems: 'center',
  },
  applyButtonText: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: '600',
  },
});

export default SearchFilterBar;