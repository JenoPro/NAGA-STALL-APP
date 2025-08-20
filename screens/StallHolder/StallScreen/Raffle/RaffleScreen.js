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
import SearchFilterBar from './Components/SearchFilter/SearchFilterBar';

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
    {
      id: 5,
      stall: '8',
      location: '1st Floor / Food Court\n2x3 meters',
      image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400',
      isLive: false,
      endTime: new Date(Date.now() + 30 * 60 * 1000).toISOString(), // 30 minutes from now
      category: 'food',
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

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(raffle => 
        raffle.stall.toLowerCase().includes(query) ||
        raffle.location.toLowerCase().includes(query)
      );
    }

    // Apply status filters
    if (selectedFilters.length > 0) {
      filtered = filtered.filter(raffle => {
        const now = new Date().getTime();
        const endTime = new Date(raffle.endTime).getTime();
        
        return selectedFilters.some(filter => {
          switch (filter) {
            case 'ongoing':
              // Raffle is live and hasn't ended yet
              return raffle.isLive && endTime > now;
            case 'countdown':
              // Raffle is not live yet but will start (upcoming raffles)
              return !raffle.isLive && endTime > now;
            case 'expired':
              // Raffle has ended
              return endTime < now;
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
    // Navigate to raffle details screen
    // navigation.navigate('RaffleDetails', { raffleId: raffle.id });
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

  const renderEmptyState = () => {
    const hasFilters = searchQuery || selectedFilters.length > 0;
    
    return (
      <View style={styles.emptyState}>
        <Text style={styles.emptyStateTitle}>
          {hasFilters ? 'No raffles found' : 'No raffles available'}
        </Text>
        <Text style={styles.emptyStateText}>
          {hasFilters 
            ? 'Try adjusting your search or filters to find more results'
            : 'Check back later for new raffles to join'
          }
        </Text>
      </View>
    );
  };

  // Fixed: Create header component to avoid virtualized list nesting
  const renderHeader = () => (
    <View>
      <SearchFilterBar
        onSearch={setSearchQuery}
        onFilter={setSelectedFilters}
        searchValue={searchQuery}
        selectedFilters={selectedFilters}
      />
    </View>
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
        ListHeaderComponentStyle={styles.headerStyle}
        stickyHeaderIndices={[0]} // Make the search bar sticky
        removeClippedSubviews={false} // Fix for virtualized list issues
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={10}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  listContent: {
    paddingBottom: 20,
    flexGrow: 1,
  },
  headerStyle: {
    marginBottom: 0,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
  },
  loadingText: {
    fontSize: 16,
    color: '#64748b',
    fontWeight: '500',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: width * 0.1,
    paddingVertical: 60,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyStateText: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 24,
    fontWeight: '400',
  },
});

export default RaffleScreen;