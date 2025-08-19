import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Dimensions,
  Text,
  RefreshControl,
} from 'react-native';
import RaffleCard from './Components/RaffleCard';
import SearchFilterBar from './Components/SearchFilterBar';

const { width } = Dimensions.get('window');

const RaffleScreen = () => {
  const [raffles, setRaffles] = useState([]);
  const [filteredRaffles, setFilteredRaffles] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  // Sample data - replace with your API call
  const sampleRaffles = [
    {
      id: 1,
      stall: '30',
      location: '2nd Floor / Grocery Section\n3x3 meters',
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400',
      isLive: true,
      endTime: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
      category: 'grocery',
      floor: 'floor2'
    },
    {
      id: 2,
      stall: '50',
      location: '2nd Floor / Grocery Section\n3x3 meters',
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400',
      isLive: false,
      endTime: new Date(Date.now() + 5 * 60 * 60 * 1000).toISOString(),
      category: 'grocery',
      floor: 'floor2'
    },
    {
      id: 3,
      stall: '15',
      location: '1st Floor / Electronics Section\n4x4 meters',
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400',
      isLive: true,
      endTime: new Date(Date.now() + 1 * 60 * 60 * 1000).toISOString(),
      category: 'electronics',
      floor: 'floor1'
    },
    {
      id: 4,
      stall: '25',
      location: '1st Floor / Clothing Section\n3x2 meters',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400',
      isLive: false,
      endTime: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
      category: 'clothing',
      floor: 'floor1'
    },
  ];

  useEffect(() => {
    loadRaffles();
  }, []);

  useEffect(() => {
    filterRaffles();
  }, [raffles, searchQuery, selectedFilters]);

  const loadRaffles = async () => {
    try {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setRaffles(sampleRaffles);
    } catch (error) {
      console.error('Error loading raffles:', error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadRaffles();
    setRefreshing(false);
  };

  const filterRaffles = () => {
    let filtered = [...raffles];

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(raffle => 
        raffle.stall.toLowerCase().includes(query) ||
        raffle.location.toLowerCase().includes(query)
      );
    }

    if (selectedFilters.length > 0) {
      filtered = filtered.filter(raffle => {
        const now = new Date().getTime();
        const endTime = new Date(raffle.endTime).getTime();
        
        return selectedFilters.some(filter => {
          switch (filter) {
            case 'live':
              return raffle.isLive && endTime > now;
            case 'upcoming':
              return !raffle.isLive && endTime > now;
            case 'expired':
              return endTime < now;
            case 'floor1':
              return raffle.floor === 'floor1';
            case 'floor2':
              return raffle.floor === 'floor2';
            case 'grocery':
              return raffle.category === 'grocery';
            case 'electronics':
              return raffle.category === 'electronics';
            case 'clothing':
              return raffle.category === 'clothing';
            default:
              return false;
          }
        });
      });
    }

    setFilteredRaffles(filtered);
  };

  const handleRafflePress = (raffle) => {
    console.log('Pressed raffle:', raffle.stall);
  };

  const renderRaffleCard = ({ item }) => (
    <RaffleCard
      stall={item.stall}
      location={item.location}
      image={item.image}
      isLive={item.isLive}
      endTime={item.endTime}
      onPress={() => handleRafflePress(item)}
    />
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Text style={styles.emptyStateTitle}>No raffles found</Text>
      <Text style={styles.emptyStateText}>
        {searchQuery || selectedFilters.length > 0 
          ? 'Try adjusting your search or filters'
          : 'Check back later for new raffles'
        }
      </Text>
    </View>
  );

  const renderHeader = () => (
    <SearchFilterBar
      onSearch={setSearchQuery}
      onFilter={setSelectedFilters}
      searchValue={searchQuery}
      selectedFilters={selectedFilters}
    />
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading raffles...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredRaffles}
        renderItem={renderRaffleCard}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#3b82f6']}
            tintColor="#3b82f6"
          />
        }
        ListEmptyComponent={renderEmptyState}
        ListHeaderComponent={renderHeader}
        stickyHeaderIndices={[0]} // Make the search bar sticky
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  listContent: {
    paddingBottom: 16,
    flexGrow: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
  },
  loadingText: {
    fontSize: 16,
    color: '#6b7280',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: width * 0.1,
    paddingVertical: 50,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyStateText: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 24,
  },
});

export default RaffleScreen;