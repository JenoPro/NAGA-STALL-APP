import React, { useState, useMemo } from "react";
import { ScrollView, StyleSheet, Dimensions, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import AuctionCard from "./Components/AuctionCardComponents/AuctionCard";
import SearchFilterBar from "../Stall/components/SearchFilter/SearchFilterBar";

const { width } = Dimensions.get("window");

// satellite stalls data for auction
const auctionStallsData = [
  {
    id: 2,
    stallNumber: "50",
    price: "2,100",
    priceValue: 2100,
    location: "SATELLITE MARKET",
    floor: "2nd Floor / Grocery Section",
    size: "3x1 meters",
    status: "available",
    auctionDate: "March 15, 2025",
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
    location: "SATELLITE MARKET",
    floor: "Ground Floor / Main Section",
    size: "3x3 meters",
    status: "available",
    auctionDate: "March 20, 2025",
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
    location: "SATELLITE MARKET",
    floor: "2nd Floor / Electronics Section",
    size: "4x3 meters",
    status: "available",
    auctionDate: "March 25, 2025",
    image:
      "https://i.pinimg.com/originals/60/17/ec/6017ec3acc17f3e0d729d882026f92eb.jpg",
    stallDescription:
      "A versatile space suitable for retail, services, or office use. This stall offers a balance of affordability and accessibility, giving entrepreneurs the flexibility to adapt the space to their needs. Ideal for both new and established businesses looking to grow in a community-centered marketplace.",
  },
];

const AuctionScreen = () => {
  const [searchText, setSearchText] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("ALL");
  const [selectedSort, setSelectedSort] = useState("default");

  // filter options specific to auction
  const auctionFilters = ["ALL", "APPLIED", "AVAILABLE"];

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
    if (selectedFilter !== "ALL") {
      filtered = filtered.filter(
        (stall) => stall.status.toUpperCase() === selectedFilter
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
  }, [searchText, selectedFilter, selectedSort]);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        {/* Search and Filter Bar */}
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
        <View style={styles.resultsHeader}>
          <Text style={styles.resultsText}>
            {filteredAndSortedStalls.length}{" "}
            {filteredAndSortedStalls.length === 1 ? "stall" : "stalls"}{" "}
            available for auction
          </Text>
        </View>

        {/* Auction Cards */}
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          {filteredAndSortedStalls.length > 0 ? (
            filteredAndSortedStalls.map((stall) => (
              <AuctionCard key={stall.id} stall={stall} />
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
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  titleHeader: {
    paddingHorizontal: width * 0.04,
    paddingTop: 15,
    paddingBottom: 10,
    backgroundColor: "#FFFFFF",
  },
  headerTitle: {
    fontSize: width * 0.06,
    fontWeight: "bold",
    color: "#1F2937",
  },
  resultsHeader: {
    paddingHorizontal: width * 0.04,
    paddingVertical: 12,
    backgroundColor: "#F9FAFB",
  },
  resultsText: {
    fontSize: width * 0.035,
    color: "#6B7280",
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: width * 0.04,
  },
  noResults: {
    alignItems: "center",
    paddingVertical: 40,
  },
  noResultsText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 8,
  },
  noResultsSubtext: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
  },
});

export default AuctionScreen;
