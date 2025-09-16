import { View, Text } from "react-native";
import { useTheme } from "../../../../Settings/components/ThemeComponents/ThemeContext";
import { HighestBidderStyles as styles } from "./HighestBidderStyles";

const HighestBidder = ({
  currentBid,
  currentBidder = null,
  showLiveBadge = true,
  useFallbackData = true,
}) => {
  const { theme } = useTheme();
  const getFallbackBidder = () => {
    // Static sample data with fixed typo
    const fallbackBidders = [
      {
        name: "Juan D.",
        avatar: "👨‍💼",
        location: "Manila",
        bidTime: "2 minutes ago",
        totalBids: 12,
      },
      {
        name: "Maria S.",
        avatar: "👩‍💼",
        location: "Quezon City",
        bidTime: "5 minutes ago",
        totalBids: 8,
      },
      {
        name: "Robert C.",
        avatar: "👨‍🏭",
        location: "Naga City",
        bidTime: "1 minute ago",
        totalBids: 15,
      },
      {
        name: "Ana L.",
        avatar: "👩‍🔬",
        location: "Pasig",
        bidTime: "3 minutes ago",
        totalBids: 6,
      },
      {
        name: "Carlos M.",
        avatar: "👨‍💻",
        location: "Taguig",
        bidTime: "4 minutes ago",
        totalBids: 10,
      },
      {
        name: "Sofia R.",
        avatar: "👩‍🎨",
        location: "Marikina",
        bidTime: "6 minutes ago",
        totalBids: 9,
      },
    ];

    return fallbackBidders[Math.floor(Math.random() * fallbackBidders.length)];
  };

  // Don't render if no current bid
  if (!currentBid || currentBid <= 0) {
    return null;
  }

  // Use actual bidder data if available, otherwise use fallback (if enabled)
  const bidderData =
    currentBidder || (useFallbackData ? getFallbackBidder() : null);

  // If no bidder data and fallback is disabled, don't show bidder info
  if (!bidderData) {
    return (
      <View
        style={[
          styles.currentBidCard,
          {
            backgroundColor: theme.colors.card,
            borderColor: theme.colors.border,
          },
        ]}
      >
        <View style={styles.currentBidHeader}>
          <Text
            style={[
              styles.currentBidLabel,
              { color: theme.colors.textSecondary },
            ]}
          >
            Current Highest Bid
          </Text>
          {showLiveBadge && (
            <View style={styles.liveBadge}>
              <Text style={styles.liveBadgeText}>LIVE</Text>
            </View>
          )}
        </View>

        <Text
          style={[styles.currentBidAmount, { color: theme.colors.primary }]}
        >
          ₱{currentBid.toLocaleString()}
        </Text>

        <Text
          style={[styles.currentBidNote, { color: theme.colors.textSecondary }]}
        >
          You need to bid higher than this amount to become the leading bidder
        </Text>
      </View>
    );
  }

  return (
    <View
      style={[
        styles.currentBidCard,
        {
          backgroundColor: theme.colors.card,
          borderColor: theme.colors.border,
        },
      ]}
    >
      <View style={styles.currentBidHeader}>
        <Text
          style={[
            styles.currentBidLabel,
            { color: theme.colors.textSecondary },
          ]}
        >
          Current Highest Bid
        </Text>
        {showLiveBadge && (
          <View style={styles.liveBadge}>
            <Text style={styles.liveBadgeText}>LIVE</Text>
          </View>
        )}
      </View>

      <Text style={[styles.currentBidAmount, { color: theme.colors.primary }]}>
        ₱{currentBid.toLocaleString()}
      </Text>

      {/* Bidder Information */}
      <View
        style={[styles.bidderInfo, { backgroundColor: theme.colors.surface }]}
      >
        <View
          style={[
            styles.bidderAvatar,
            { backgroundColor: theme.colors.background },
          ]}
        >
          <Text style={styles.bidderAvatarText}>{bidderData.avatar}</Text>
        </View>
        <View style={styles.bidderDetails}>
          <View style={styles.bidderNameRow}>
            <Text style={[styles.bidderName, { color: theme.colors.text }]}>
              {bidderData.name}
            </Text>
            <Text
              style={[
                styles.bidderLocation,
                { color: theme.colors.textSecondary },
              ]}
            >
              📍 {bidderData.location}
            </Text>
          </View>
          <View style={styles.bidderMetaRow}>
            <Text style={styles.bidderTime}>⏱️ {bidderData.bidTime}</Text>
            <Text
              style={[
                styles.bidderStats,
                { color: theme.colors.textSecondary },
              ]}
            >
              🎯 {bidderData.totalBids} total bids
            </Text>
          </View>
        </View>
      </View>

      <Text
        style={[styles.currentBidNote, { color: theme.colors.textSecondary }]}
      >
        You need to bid higher than this amount to become the leading bidder
      </Text>
    </View>
  );
};

export default HighestBidder;
