import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

// Import components
import SearchFilterBar from './components/SearchFilterBar'; // Updated import
import StallCard from './components/StallCard';

const { width } = Dimensions.get('window');

// Sample stall data
const stallsData = [
  {
    id: 1,
    stallNumber: '01',
    price: '1,500',
    priceValue: 1500, // Added numerical value for sorting
    location: 'NCPM',
    floor: '2nd Floor / Grocery Section',
    size: '3x3 meters',
    status: 'available',
    image: 'https://i.pinimg.com/originals/60/17/ec/6017ec3acc17f3e0d729d882026f92eb.jpg',
  },
  {
    id: 2,
    stallNumber: '50',
    price: '2,500',
    priceValue: 2500,
    location: 'SATELLITE',
    floor: '2nd Floor / Grocery Section',
    size: '3x3 meters',
    status: 'locked',
    image: 'https://i.pinimg.com/originals/b8/7f/96/b87f9661d0f56d6d88c8e1462e4c68a3.jpg',
  },
  {
    id: 3,
    stallNumber: '30',
    price: '2,500',
    priceValue: 2500,
    location: 'NCPM',
    floor: '2nd Floor / Grocery Section',
    size: '3x3 meters',
    status: 'raffle',
    image: 'https://www.willflyforfood.net/wp-content/uploads/2023/05/bangkok-markets-indy-market3.jpg',
  },
  {
    id: 4,
    stallNumber: '32',
    price: '2,500',
    priceValue: 2500,
    location: 'SATELLITE',
    floor: 'Ground Floor / Main Section',
    size: '3x3 meters',
    status: 'applied',
    image: 'https://cdn.broadsheet.com.au/sydney/images/2016/08/12/113402-542-cfe6bf07de43630928ce9225de88c1eb.jpg',
  },
  {
    id: 5,
    stallNumber: '15',
    price: '1,800',
    priceValue: 1800,
    location: 'NCPM',
    floor: 'Ground Floor / Electronics Section',
    size: '4x3 meters',
    status: 'available',
    image: 'https://oldspitalfieldsmarket.com/cms/2017/10/OSM_FP_Stall_sq-1440x1440.jpg',
  },
];

const StallScreen = () => {
  const [selectedFilter, setSelectedFilter] = useState('ALL');
  const [selectedSort, setSelectedSort] = useState('default');
  const [searchText, setSearchText] = useState('');

  const getFilteredAndSortedStalls = () => {
    let filtered = stallsData;
    
    // Apply category filter
    if (selectedFilter !== 'ALL') {
      filtered = filtered.filter(stall => stall.location === selectedFilter);
    }
    
    // Apply search filter
    if (searchText) {
      filtered = filtered.filter(stall => 
        stall.stallNumber.toLowerCase().includes(searchText.toLowerCase()) ||
        stall.floor.toLowerCase().includes(searchText.toLowerCase()) ||
        stall.location.toLowerCase().includes(searchText.toLowerCase())
      );
    }
    
    // Apply price sorting
    if (selectedSort === 'price_asc') {
      filtered = [...filtered].sort((a, b) => a.priceValue - b.priceValue);
    } else if (selectedSort === 'price_desc') {
      filtered = [...filtered].sort((a, b) => b.priceValue - a.priceValue);
    }
    // For 'default', keep original order
    
    return filtered;
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        {/* Combined Search and Filter Bar */}
        <SearchFilterBar 
          searchText={searchText}
          onSearchChange={setSearchText}
          selectedFilter={selectedFilter}
          onFilterSelect={setSelectedFilter}
          selectedSort={selectedSort}
          onSortSelect={setSelectedSort}
        />

        {/* Stall Cards */}
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {getFilteredAndSortedStalls().map((stall) => (
            <StallCard key={stall.id} stall={stall} />
          ))}
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: width * 0.04,
  },
});

export default StallScreen;