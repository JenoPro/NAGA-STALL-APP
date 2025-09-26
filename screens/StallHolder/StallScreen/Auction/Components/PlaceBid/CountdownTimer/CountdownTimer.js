import { useEffect, useState, useRef } from "react";
import { View, Text, Animated } from "react-native";
import { useTheme } from "../../../../Settings/components/ThemeComponents/ThemeContext";
import { CountdownTimerStyles as styles } from "./CountdownTimerStyles";

const CountdownTimer = ({
  auctionDurationMinutes = 20,
  onAuctionEnd = null,
  showMilliseconds = false,
  urgentThreshold = 300,
  warningThreshold = 600,
}) => {
  const { theme } = useTheme();

  // Debug logging
  console.log("CountdownTimer received props:", {
    auctionDurationMinutes,
    showMilliseconds,
    urgentThreshold,
    warningThreshold,
  });

  // Initialize with the countdown duration
  const [timeLeft, setTimeLeft] = useState(() => {
    const totalSeconds = auctionDurationMinutes * 60;
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return {
      hours,
      minutes,
      seconds,
      milliseconds: 0,
      total: totalSeconds,
    };
  });
  const [isUrgent, setIsUrgent] = useState(false);
  const [isWarning, setIsWarning] = useState(false);
  const [hasEnded, setHasEnded] = useState(false);

  const urgentPulse = useRef(new Animated.Value(1)).current;
  const warningPulse = useRef(new Animated.Value(1)).current;

  // Simple countdown logic - decrements by 1 second each time
  const decrementTimer = (currentTime) => {
    if (currentTime.total <= 0) {
      return {
        hours: 0,
        minutes: 0,
        seconds: 0,
        milliseconds: 0,
        total: 0,
      };
    }

    const newTotal = currentTime.total - 1;
    const hours = Math.floor(newTotal / 3600);
    const minutes = Math.floor((newTotal % 3600) / 60);
    const seconds = newTotal % 60;

    return {
      hours,
      minutes,
      seconds,
      milliseconds: 0,
      total: newTotal,
    };
  };

  // Update timer every second
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        const newTimeLeft = decrementTimer(prevTime);

        // Check if auction has ended
        if (newTimeLeft.total <= 0) {
          if (!hasEnded) {
            setHasEnded(true);
            if (onAuctionEnd) {
              onAuctionEnd();
            }
          }
        }

        // Update urgency states
        setIsUrgent(newTimeLeft.total <= urgentThreshold);
        setIsWarning(
          newTimeLeft.total <= warningThreshold &&
            newTimeLeft.total > urgentThreshold
        );

        return newTimeLeft;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [urgentThreshold, warningThreshold, onAuctionEnd, hasEnded]);

  // Set initial urgency states
  useEffect(() => {
    const initialTotal = auctionDurationMinutes * 60;
    setIsUrgent(initialTotal <= urgentThreshold);
    setIsWarning(
      initialTotal <= warningThreshold && initialTotal > urgentThreshold
    );
  }, [auctionDurationMinutes, urgentThreshold, warningThreshold]);

  // Urgent animation
  useEffect(() => {
    if (isUrgent && !hasEnded) {
      const animation = Animated.loop(
        Animated.sequence([
          Animated.timing(urgentPulse, {
            toValue: 1.1,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(urgentPulse, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
        ])
      );
      animation.start();
      return () => animation.stop();
    }
  }, [isUrgent, hasEnded]);

  // Warning animation
  useEffect(() => {
    if (isWarning && !hasEnded) {
      const animation = Animated.loop(
        Animated.sequence([
          Animated.timing(warningPulse, {
            toValue: 1.05,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(warningPulse, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
        ])
      );
      animation.start();
      return () => animation.stop();
    }
  }, [isWarning, hasEnded]);

  const formatNumber = (num) => {
    if (typeof num !== "number" || isNaN(num)) {
      return "00";
    }
    return num.toString().padStart(2, "0");
  };

  // Safety check for timeLeft
  const safeTimeLeft = timeLeft || {
    hours: 0,
    minutes: 0,
    seconds: 0,
    milliseconds: 0,
    total: 0,
  };

  const getTimerColor = () => {
    if (hasEnded) return "#6B7280";
    if (isUrgent) return "#EF4444";
    if (isWarning) return "#F59E0B";
    return theme.colors.primary;
  };

  const getBackgroundColor = () => {
    if (hasEnded) return theme.colors.borderLight;
    if (isUrgent) return "#FEE2E2";
    if (isWarning) return "#FEF3C7";
    return theme.colors.primaryLight;
  };

  const getStatusText = () => {
    if (hasEnded) return "AUCTION ENDED";
    if (isUrgent) return "CLOSING SOON!";
    if (isWarning) return "ENDING SOON";
    return "TIME REMAINING";
  };

  const AnimatedContainer = isUrgent
    ? Animated.View
    : isWarning
    ? Animated.View
    : View;
  const animationStyle = isUrgent
    ? { transform: [{ scale: urgentPulse }] }
    : isWarning
    ? { transform: [{ scale: warningPulse }] }
    : {};

  return (
    <AnimatedContainer
      style={[
        styles.container,
        {
          backgroundColor: getBackgroundColor(),
          borderColor: getTimerColor(),
        },
        animationStyle,
      ]}
    >
      {/* Status Header */}
      <View style={styles.statusHeader}>
        <Text style={[styles.statusText, { color: getTimerColor() }]}>
          {getStatusText()}
        </Text>

        {(isUrgent || isWarning) && !hasEnded && (
          <View
            style={[styles.alertBadge, { backgroundColor: getTimerColor() }]}
          >
            <Text style={styles.alertBadgeText}>{isUrgent ? "🔥" : "⚠️"}</Text>
          </View>
        )}
      </View>

      {/* Timer Display */}
      <View style={styles.timerRow}>
        <View style={styles.timeUnit}>
          <Text style={[styles.timeNumber, { color: getTimerColor() }]}>
            {formatNumber(safeTimeLeft.hours)}
          </Text>
          <Text
            style={[styles.timeLabel, { color: theme.colors.textSecondary }]}
          >
            HRS
          </Text>
        </View>

        <Text style={[styles.separator, { color: getTimerColor() }]}>:</Text>

        <View style={styles.timeUnit}>
          <Text style={[styles.timeNumber, { color: getTimerColor() }]}>
            {formatNumber(safeTimeLeft.minutes)}
          </Text>
          <Text
            style={[styles.timeLabel, { color: theme.colors.textSecondary }]}
          >
            MIN
          </Text>
        </View>

        <Text style={[styles.separator, { color: getTimerColor() }]}>:</Text>

        <View style={styles.timeUnit}>
          <Text style={[styles.timeNumber, { color: getTimerColor() }]}>
            {formatNumber(safeTimeLeft.seconds)}
          </Text>
          <Text
            style={[styles.timeLabel, { color: theme.colors.textSecondary }]}
          >
            SEC
          </Text>
        </View>
      </View>

      {/* End Time Info */}
      <Text style={[styles.endTimeText, { color: theme.colors.textTertiary }]}>
        {hasEnded
          ? "Auction has ended"
          : `Auction Duration: ${auctionDurationMinutes} minutes`}
      </Text>
    </AnimatedContainer>
  );
};

export default CountdownTimer;
