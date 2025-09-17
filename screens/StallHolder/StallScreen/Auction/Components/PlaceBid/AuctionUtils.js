// Helper function to convert month name to number
export const getMonthNumber = (monthName) => {
  const months = {
    January: 0,
    February: 1,
    March: 2,
    April: 3,
    May: 4,
    June: 5,
    July: 6,
    August: 7,
    September: 8,
    October: 9,
    November: 10,
    December: 11,
  };
  return months[monthName] || 0;
};

// Check if auction is currently active
export const isAuctionActive = (auctionDate) => {
  if (!auctionDate) return false;

  const now = new Date();
  let auctionDay;

  try {
    // Try standard date parsing first
    auctionDay = new Date(auctionDate);

    // If parsing fails, try manual parsing for "Month Day, Year" format
    if (isNaN(auctionDay.getTime())) {
      const dateParts = auctionDate.trim().split(" ");
      if (dateParts.length === 3) {
        const month = dateParts[0];
        const day = parseInt(dateParts[1].replace(",", ""));
        const year = parseInt(dateParts[2]);

        if (!isNaN(day) && !isNaN(year)) {
          auctionDay = new Date(year, getMonthNumber(month), day);
        }
      }
    }

    // If still invalid, return false
    if (isNaN(auctionDay.getTime())) {
      return false;
    }
  } catch (error) {
    console.warn("Date parsing error:", error);
    return false;
  }

  // Set time to start of day for accurate comparison
  const auctionStart = new Date(auctionDay);
  auctionStart.setHours(0, 0, 0, 0);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return today >= auctionStart;
};

// Calculate minimum bid amount
export const getMinimumBid = (currentBid, startingPrice, minimumIncrement) => {
  return currentBid ? currentBid + minimumIncrement : startingPrice;
};

// Validate bid amount
export const validateBid = (
  amount,
  currentBid,
  startingPrice,
  minimumIncrement
) => {
  const numAmount = parseFloat(amount);
  const minBid = getMinimumBid(currentBid, startingPrice, minimumIncrement);

  // Check if amount is provided and is a valid number
  if (!amount || amount.trim() === "") {
    return "Please enter a bid amount";
  }

  if (isNaN(numAmount) || numAmount <= 0) {
    return "Please enter a valid positive number";
  }

  // Check decimal places (max 2)
  if (amount.includes(".") && amount.split(".")[1].length > 2) {
    return "Bid amount can have maximum 2 decimal places";
  }

  // Check minimum bid requirement
  if (numAmount < minBid) {
    return `Bid must be at least ₱${minBid.toLocaleString()}`;
  }

  // Check if bid is too high (reasonable maximum)
  const maxBid = startingPrice * 10; // 10x starting price as max
  if (numAmount > maxBid) {
    return `Bid cannot exceed ₱${maxBid.toLocaleString()}`;
  }

  // Check if increment is too small (must be at least minimum increment)
  if (currentBid && numAmount - currentBid < minimumIncrement) {
    return `Bid increment must be at least ₱${minimumIncrement.toLocaleString()}`;
  }

  return "";
};
