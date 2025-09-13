import { StyleSheet, Dimensions, StatusBar } from "react-native";
const { width, height } = Dimensions.get("window");

export const PlaceBidStyles = StyleSheet.create({
  fullScreenContainer: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    paddingTop: StatusBar.currentHeight || 44,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    fontSize: 16,
    color: "#3B82F6",
    fontWeight: "600",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1F2937",
  },
  headerSpacer: {
    width: 60,
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  scrollContentContainer: {
    paddingBottom: 120, // Space for bottom buttons
    flexGrow: 1,
  },

  // Stall Information Card
  stallInfoCard: {
    margin: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 6,
  },
  stallHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  stallNumberBadge: {
    backgroundColor: "#3B82F6",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  stallNumberText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
  },
  auctionBadge: {
    backgroundColor: "#FEF3C7",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  auctionBadgeText: {
    color: "#92400E",
    fontSize: 12,
    fontWeight: "600",
  },
  stallDetails: {
    gap: 16,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 4,
  },
  detailLabel: {
    fontSize: 14,
    color: "#6B7280",
    fontWeight: "600",
    flex: 1,
  },
  detailValue: {
    fontSize: 14,
    color: "#1F2937",
    fontWeight: "bold",
    flex: 1,
    textAlign: "right",
  },

  // Current Bid Card
  currentBidCard: {
    marginHorizontal: 20,
    marginBottom: 20,
    backgroundColor: "#FEF3C7",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    borderLeftWidth: 4,
    borderLeftColor: "#F59E0B",
  },
  currentBidLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#92400E",
    marginBottom: 8,
  },
  currentBidAmount: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#F59E0B",
    marginBottom: 4,
  },
  currentBidNote: {
    fontSize: 12,
    color: "#92400E",
    textAlign: "center",
  },

  // Enhanced Current Bid Section Styles
  currentBidHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
    width: "100%",
  },

  liveBadge: {
    backgroundColor: "#EF4444",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },

  liveBadgeText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "600",
    letterSpacing: 0.5,
  },

  // Bidder Information Styles
  bidderInfo: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8F9FA",
    padding: 12,
    borderRadius: 8,
    marginTop: 12,
    marginBottom: 8,
    borderLeftWidth: 3,
    borderLeftColor: "#10B981",
    width: "100%",
  },

  bidderAvatar: {
    width: 40,
    height: 40,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },

  bidderAvatarText: {
    fontSize: 20,
  },

  bidderDetails: {
    flex: 1,
  },

  bidderNameRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },

  bidderName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1F2937",
  },

  bidderLocation: {
    fontSize: 12,
    color: "#6B7280",
  },

  bidderMetaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  bidderTime: {
    fontSize: 12,
    color: "#10B981",
    fontWeight: "500",
  },

  bidderStats: {
    fontSize: 12,
    color: "#6B7280",
  },

  // Bid Section
  bidSection: {
    marginHorizontal: 20,
    marginBottom: 100,
  },
  bidSectionTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 16,
  },
  bidInputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#D1D5DB",
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  currencySymbol: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1F2937",
    paddingLeft: 16,
    paddingRight: 8,
  },
  bidInput: {
    flex: 1,
    fontSize: 24,
    fontWeight: "600",
    color: "#1F2937",
    paddingVertical: 16,
    paddingRight: 16,
  },
  bidInputFocused: {
    borderColor: "#10B981",
  },
  bidInputError: {
    borderColor: "#EF4444",
  },
  minimumBidNote: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 8,
    fontStyle: "italic",
  },
  errorText: {
    fontSize: 14,
    color: "#EF4444",
    marginTop: 4,
  },

  // Auction Not Active Card
  auctionNotActiveCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 32,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#FDE68A",
    borderStyle: "dashed",
  },
  auctionNotActiveIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  auctionNotActiveTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#92400E",
    marginBottom: 8,
  },
  auctionNotActiveMessage: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 20,
  },

  // Fixed Bottom Actions
  bottomActions: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    gap: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 8,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#6B7280",
  },
  submitButton: {
    flex: 2,
    backgroundColor: "#10B981",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  submitButtonDisabled: {
    backgroundColor: "#D1D5DB",
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  submitButtonTextDisabled: {
    color: "#9CA3AF",
  },

  // Success Modal (keep existing styles for success state)
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 25,
    width: width * 0.9,
    maxWidth: 400,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
  },
  successContainer: {
    alignItems: "center",
  },
  iconContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  checkmark: {
    fontSize: 50,
    color: "#1E9C00",
    backgroundColor: "#E8F5E8",
    width: 80,
    height: 80,
    textAlign: "center",
    textAlignVertical: "center",
    borderRadius: 40,
    overflow: "hidden",
  },
  successTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1F2937",
    textAlign: "center",
    marginBottom: 10,
  },
  successMessage: {
    fontSize: 16,
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 20,
    lineHeight: 22,
  },
  closeButton: {
    backgroundColor: "#1E9C00",
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: "center",
    width: "100%",
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
});
