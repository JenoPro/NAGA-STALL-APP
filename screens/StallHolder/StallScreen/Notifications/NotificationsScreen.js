import React, { useState, useEffect } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  SafeAreaView,
  Alert,
  RefreshControl,
} from 'react-native';
import NotificationHeader from './Components/NotificationHeader';
import SearchFilterBar from './Components/SearchFilter/SearchFilterBar';
import NotificationCard from './Components/NotificationCard';
import NotificationEmptyState from './Components/NotificationEmptyState';

const NotificationsScreen = () => {
  // Sample data - replace with your actual data source
  const [allNotifications, setAllNotifications] = useState([
    {
      id: '1',
      type: 'order',
      title: 'Order Completed',
      message: 'Your order #12345 has been completed and is ready for pickup at Food Court Stall A.',
      timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
      isRead: false,
    },
    {
      id: '2',
      type: 'promotion',
      title: 'Special Offer Available',
      message: 'Get 20% off on all items at participating stalls. Valid until tomorrow!',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      isRead: false,
    },
    {
      id: '3',
      type: 'system',
      title: 'App Update Available',
      message: 'A new version of the app is available with improved features and bug fixes.',
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
      isRead: true,
    },
    {
      id: '4',
      type: 'announcement',
      title: 'Mall Hours Extended',
      message: 'Good news! Mall hours have been extended until 11 PM starting this weekend.',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      isRead: true,
    },
    {
      id: '5',
      type: 'order',
      title: 'Payment Received',
      message: 'Payment for order #12344 has been received. Your order is being prepared.',
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      isRead: false,
    },
  ]);

  const [filteredNotifications, setFilteredNotifications] = useState(allNotifications);
  const [searchText, setSearchText] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('ALL');
  const [selectedSort, setSelectedSort] = useState('default');
  const [refreshing, setRefreshing] = useState(false);

  // Filter and search logic
  useEffect(() => {
    let filtered = [...allNotifications];

    // Apply search filter
    if (searchText.trim()) {
      filtered = filtered.filter(notification =>
        notification.title.toLowerCase().includes(searchText.toLowerCase()) ||
        notification.message.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    // Apply category filter
    if (selectedFilter !== 'ALL') {
      filtered = filtered.filter(notification =>
        notification.type.toUpperCase() === selectedFilter
      );
    }

    // Apply sorting
    switch (selectedSort) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        break;
      case 'oldest':
        filtered.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
        break;
      case 'unread':
        filtered.sort((a, b) => {
          if (a.isRead === b.isRead) {
            return new Date(b.timestamp) - new Date(a.timestamp);
          }
          return a.isRead ? 1 : -1;
        });
        break;
      default:
        filtered.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    }

    setFilteredNotifications(filtered);
  }, [allNotifications, searchText, selectedFilter, selectedSort]);

  // Get unread count
  const unreadCount = allNotifications.filter(n => !n.isRead).length;

  // Handlers
  const handleNotificationPress = (notification) => {
    if (!notification.isRead) {
      handleMarkAsRead(notification.id);
    }
    // Add navigation or modal logic here if needed
    console.log('Notification pressed:', notification.title);
  };

  const handleMarkAsRead = (notificationId) => {
    setAllNotifications(prev =>
      prev.map(notification =>
        notification.id === notificationId
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  const handleMarkAllRead = () => {
    setAllNotifications(prev =>
      prev.map(notification => ({ ...notification, isRead: true }))
    );
  };

  const handleDelete = (notificationId) => {
    Alert.alert(
      'Delete Notification',
      'Are you sure you want to delete this notification?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setAllNotifications(prev =>
              prev.filter(notification => notification.id !== notificationId)
            );
          },
        },
      ]
    );
  };

  const handleClearAll = () => {
    Alert.alert(
      'Clear All Notifications',
      'Are you sure you want to clear all notifications? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear All',
          style: 'destructive',
          onPress: () => setAllNotifications([]),
        },
      ]
    );
  };

  const onRefresh = () => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setRefreshing(false);
      // You can add logic to fetch fresh notifications here
    }, 1000);
  };

  const renderHeader = () => (
    <>
      <NotificationHeader
        unreadCount={unreadCount}
        onMarkAllRead={handleMarkAllRead}
        onClearAll={handleClearAll}
      />
      <SearchFilterBar
        searchText={searchText}
        onSearchChange={setSearchText}
        selectedFilter={selectedFilter}
        onFilterSelect={setSelectedFilter}
        selectedSort={selectedSort}
        onSortSelect={setSelectedSort}
        searchPlaceholder="Search notifications..."
        filters={['ALL', 'ORDER', 'SYSTEM', 'PROMOTION', 'ANNOUNCEMENT']}
        sortOptions={[
          { label: 'Newest First', value: 'newest' },
          { label: 'Oldest First', value: 'oldest' },
          { label: 'Unread First', value: 'unread' },
          { label: 'Default', value: 'default' }
        ]}
      />
    </>
  );

  const renderNotificationItem = ({ item }) => (
    <NotificationCard
      notification={item}
      onPress={handleNotificationPress}
      onMarkAsRead={handleMarkAsRead}
      onDelete={handleDelete}
    />
  );

  const renderEmptyState = () => (
    <NotificationEmptyState />
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={filteredNotifications}
        keyExtractor={(item) => item.id}
        renderItem={renderNotificationItem}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmptyState}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#002181']}
            tintColor="#002181"
          />
        }
        showsVerticalScrollIndicator={false}
        style={styles.list}
        contentContainerStyle={filteredNotifications.length === 0 ? styles.emptyContainer : styles.contentContainer}
        stickyHeaderIndices={[0]}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  list: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
  },
});

export default NotificationsScreen;