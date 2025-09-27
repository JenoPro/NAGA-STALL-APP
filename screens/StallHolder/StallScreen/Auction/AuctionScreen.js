import { useState, useMemo, useEffect } from "react";
import { ScrollView, StyleSheet, Dimensions, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import { useTheme } from "../Settings/components/ThemeComponents/ThemeContext";
import AuctionCard from "./Components/AuctionCardComponents/AuctionCard";
import SearchFilterBar from "../Stall/components/SearchFilter/SearchFilterBar";
import AuctionReminderModal from "../Auction/Components/AuctionReminderComponent/AuctionReminderModal";
import { AuctionTimings } from "./Components/shared/constants";

const { width } = Dimensions.get("window");

// static satellite stalls data for auction
const auctionStallsData = [
  {
    id: 2,
    stallNumber: "50",
    price: "2,100",
    priceValue: 2100,
    currentBid: 2400,
    currentBidder: {
      name: "Juan D.",
      avatar: "👨‍💼",
      location: "Manila",
      bidTime: "2 minutes ago",
      totalBids: 12,
    },
    location: "SATELLITE MARKET",
    floor: "2nd Floor / Grocery Section",
    size: "3x1 meters",
    status: "available",
    auctionDate: "September 27, 2025",
    startTime: "1:10 PM",
    image:
      "https://i.pinimg.com/originals/b8/7f/96/b87f9661d0f56d6d88c8e1462e4c68a3.jpg",
    stallDescription:
      "Perfect for small businesses, this stall offers a clean and spacious layout ideal for boutiques, specialty shops, or service providers. With high customer visibility and easy access, it provides an excellent opportunity to showcase your products in a lively commercial environment.",
  },
  {
    id: 4,
    stallNumber: "32",
    price: "2,500",
    priceValue: 2500,
    currentBid: 2800,
    currentBidder: {
      name: "Maria S.",
      avatar: "👩‍💼",
      location: "Quezon City",
      bidTime: "5 minutes ago",
      totalBids: 8,
    },
    location: "SATELLITE MARKET",
    floor: "Ground Floor / Main Section",
    size: "3x3 meters",
    status: "available",
    auctionDate: "September 28, 2025",
    startTime: "2:00 PM",
    image:
      "https://cdn.broadsheet.com.au/sydney/images/2016/08/12/113402-542-cfe6bf07de43630928ce9225de88c1eb.jpg",
    stallDescription:
      "Designed for food entrepreneurs, this stall comes with a practical setup that can easily be customized for kiosks, snack bars, or takeaway counters. Its strategic location guarantees steady foot traffic, making it a great choice for startups or expanding food businesses.",
  },
  {
    id: 6,
    stallNumber: "19",
    price: "2,600",
    priceValue: 2600,
    currentBid: 3100,
    currentBidder: {
      name: "Robert C.",
      avatar: "👨‍🏭",
      location: "Naga City",
      bidTime: "1 minute ago",
      totalBids: 15,
    },
    location: "SATELLITE MARKET",
    floor: "2nd Floor / Electronics Section",
    size: "4x3 meters",
    status: "available",
    auctionDate: "September 29, 2025",
    startTime: "12:00 PM",
    image:
      "https://i.pinimg.com/originals/60/17/ec/6017ec3acc17f3e0d729d882026f92eb.jpg",
    stallDescription:
      "A versatile space suitable for retail, services, or office use. This stall offers a balance of affordability and accessibility, giving entrepreneurs the flexibility to adapt the space to their needs. Ideal for both new and established businesses looking to grow in a community-centered marketplace.",
  },
];

const AuctionScreen = () => {
  const { theme } = useTheme();
  const [showReminder, setShowReminder] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("ALL");
  const [selectedSort, setSelectedSort] = useState("default");

  const [preRegisteredStalls, setPreRegisteredStalls] = useState([]);
  const [lastRefresh, setLastRefresh] = useState(new Date());

  const handlePreRegister = (stallId) => {
    setPreRegisteredStalls((prev) =>
      prev.includes(stallId) ? prev : [...prev, stallId]
    );
  };

  // Auto-refresh every 5 seconds to update auction status
  useEffect(() => {
    const refreshInterval = setInterval(() => {
      setLastRefresh(new Date());
    }, AuctionTimings.AUTO_REFRESH_INTERVAL);

    return () => clearInterval(refreshInterval);
  }, []);

  const auctionFilters = ["ALL", "PRE-REGISTERED"];

  const auctionSortOptions = [
    { label: "Price: Low to High", value: "price_asc" },
    { label: "Price: High to Low", value: "price_desc" },
    { label: "Stall Number", value: "stall_number" },
    { label: "Default", value: "default" },
  ];

  // filter and sort logic
  const filteredAndSortedStalls = useMemo(() => {
    let filtered = [...auctionStallsData];

    // search filter
    if (searchText.trim()) {
      const searchLower = searchText.toLowerCase();
      filtered = filtered.filter(
        (stall) =>
          stall.stallNumber.toLowerCase().includes(searchLower) ||
          stall.location.toLowerCase().includes(searchLower) ||
          stall.floor.toLowerCase().includes(searchLower) ||
          stall.status.toLowerCase().includes(searchLower)
      );
    }

    // status filter
    if (selectedFilter === "PRE-REGISTERED") {
      filtered = filtered.filter((stall) =>
        preRegisteredStalls.includes(stall.id)
      );
    }

    // sort
    if (selectedSort === "price_asc") {
      filtered.sort((a, b) => a.priceValue - b.priceValue);
    } else if (selectedSort === "price_desc") {
      filtered.sort((a, b) => b.priceValue - a.priceValue);
    } else if (selectedSort === "stall_number") {
      filtered.sort(
        (a, b) => parseInt(a.stallNumber) - parseInt(b.stallNumber)
      );
    }

    return filtered;
  }, [searchText, selectedFilter, selectedSort, preRegisteredStalls]);

  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={[styles.container, { backgroundColor: theme.colors.background }]}
      >
        <AuctionReminderModal
          visible={showReminder}
          onClose={() => setShowReminder(false)}
        />

        {/* Header */}
        {!showReminder && (
          <>
            {/* Title Header */}
            <SearchFilterBar
              searchText={searchText}
              onSearchChange={setSearchText}
              selectedFilter={selectedFilter}
              onFilterSelect={setSelectedFilter}
              selectedSort={selectedSort}
              onSortSelect={setSelectedSort}
              searchPlaceholder="Search stalls, floor, or status..."
              filters={auctionFilters}
              sortOptions={auctionSortOptions}
            />
            {/* Results Header */}
            <View
              style={[
                styles.resultsHeader,
                { backgroundColor: theme.colors.surface },
              ]}
            >
              <View style={styles.resultsContent}>
                <Text
                  style={[
                    styles.resultsText,
                    { color: theme.colors.textSecondary },
                  ]}
                >
                  {filteredAndSortedStalls.length}{" "}
                  {filteredAndSortedStalls.length === 1 ? "stall" : "stalls"}{" "}
                  available for auction
                </Text>
                <View style={styles.refreshIndicator}>
                  <Text
                    style={[styles.liveText, { color: theme.colors.primary }]}
                  >
                    Auto-refreshes for updates
                  </Text>
                </View>
              </View>
            </View>

            {/* Stalls List */}
            <ScrollView
              style={styles.scrollView}
              contentContainerStyle={styles.scrollViewContent}
              showsVerticalScrollIndicator={false}
            >
              {/* Auction Cards */}
              {filteredAndSortedStalls.length > 0 ? (
                filteredAndSortedStalls.map((stall) => (
                  <AuctionCard
                    key={stall.id}
                    stall={stall}
                    onPreRegister={handlePreRegister}
                    isPreRegistered={preRegisteredStalls.includes(stall.id)}
                  />
                ))
              ) : (
                <View style={styles.noResults}>
                  <Text style={styles.noResultsText}>No stalls found</Text>
                  <Text style={styles.noResultsSubtext}>
                    Try adjusting your search or filter criteria
                  </Text>
                </View>
              )}
            </ScrollView>
          </>
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleHeader: {
    paddingHorizontal: width * 0.04,
    paddingTop: 15,
    paddingBottom: 10,
  },
  headerTitle: {
    fontSize: width * 0.06,
    fontWeight: "bold",
  },
  resultsHeader: {
    paddingHorizontal: width * 0.04,
    paddingVertical: 12,
  },
  resultsContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  resultsText: {
    fontSize: width * 0.035,
  },
  refreshIndicator: {
    flexDirection: "row",
    alignItems: "center",
  },
  liveText: {
    fontSize: width * 0.032,
    fontWeight: "500",
    fontStyle: "italic",
    opacity: 0.8,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingHorizontal: width * 0.04,
    paddingTop: 15,
    paddingBottom: 10,
  },
  noResults: {
    alignItems: "center",
    paddingVertical: 40,
  },
  noResultsText: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  noResultsSubtext: {
    fontSize: 14,
    textAlign: "center",
  },
});

export default AuctionScreen;
