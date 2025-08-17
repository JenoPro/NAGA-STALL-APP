import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const InboxScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inbox Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: width * 0.06,
  },
  title: {
    fontSize: width * 0.07,
    fontWeight: 'bold',
    color: '#1f2937',
    textAlign: 'center',
  },
});

export default InboxScreen;