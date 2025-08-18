import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Modal } from 'react-native';

const { width } = Dimensions.get('window');

const FilterButtons = ({ selectedFilter, onFilterSelect, selectedSort, onSortSelect }) => {
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  
  const filters = ['ALL', 'NCPM', 'SATELLITE'];
  const sortOptions = [
    { label: 'Price: Low to High', value: 'price_asc' },
    { label: 'Price: High to Low', value: 'price_desc' },
    { label: 'Default', value: 'default' }
  ];

  const toggleFilterDropdown = () => {
    setIsFilterVisible(!isFilterVisible);
  };

  const handleFilterSelect = (filter) => {
    onFilterSelect(filter);
    setIsFilterVisible(false);
  };

  const handleSortSelect = (sortValue) => {
    onSortSelect(sortValue);
    setIsFilterVisible(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.filterButton}
        onPress={toggleFilterDropdown}
      >
        <Text style={styles.filterButtonText}>Filter</Text>
        <Text style={styles.dropdownIcon}>▼</Text>
      </TouchableOpacity>

      <Modal
        visible={isFilterVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsFilterVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setIsFilterVisible(false)}
        >
          <View style={styles.dropdownContainer}>
            <View style={styles.dropdownContent}>
              {/* Category Filters */}
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Category</Text>
                {filters.map((filter) => (
                  <TouchableOpacity
                    key={filter}
                    style={[
                      styles.dropdownItem,
                      selectedFilter === filter && styles.activeDropdownItem
                    ]}
                    onPress={() => handleFilterSelect(filter)}
                  >
                    <Text style={[
                      styles.dropdownItemText,
                      selectedFilter === filter && styles.activeDropdownItemText
                    ]}>
                      {filter}
                    </Text>
                    {selectedFilter === filter && (
                      <Text style={styles.checkMark}>✓</Text>
                    )}
                  </TouchableOpacity>
                ))}
              </View>

              {/* Divider */}
              <View style={styles.divider} />

              {/* Price Sorting */}
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Sort by Price</Text>
                {sortOptions.map((option) => (
                  <TouchableOpacity
                    key={option.value}
                    style={[
                      styles.dropdownItem,
                      selectedSort === option.value && styles.activeDropdownItem
                    ]}
                    onPress={() => handleSortSelect(option.value)}
                  >
                    <Text style={[
                      styles.dropdownItemText,
                      selectedSort === option.value && styles.activeDropdownItemText
                    ]}>
                      {option.label}
                    </Text>
                    {selectedSort === option.value && (
                      <Text style={styles.checkMark}>✓</Text>
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: width * 0.04,
    paddingBottom: 20,
    alignItems: 'flex-end',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    backgroundColor: '#ffffffff',
    boarder: '1px solid #adadadff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  filterButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginRight: 8,
  },
  dropdownIcon: {
    fontSize: 12,
    color: '#374151',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingTop: 80,
    paddingRight: width * 0.04,
  },
  dropdownContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    minWidth: width * 0.6,
    maxWidth: width * 0.8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6.84,
    elevation: 8,
  },
  dropdownContent: {
    paddingVertical: 12,
  },
  sectionContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#002181',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 4,
  },
  activeDropdownItem: {
    backgroundColor: 'rgba(0, 33, 129, 0.1)',
  },
  dropdownItemText: {
    fontSize: 16,
    color: '#374151',
    fontWeight: '500',
  },
  activeDropdownItemText: {
    color: '#002181',
    fontWeight: '600',
  },
  checkMark: {
    fontSize: 16,
    color: '#002181',
    fontWeight: 'bold',
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 8,
  },
});

export default FilterButtons;