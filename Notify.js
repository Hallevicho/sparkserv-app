import React from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Platform, Dimensions } from "react-native";
import { StatusBar } from "expo-status-bar";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function Notify({ navigation }) {
  const technician = "Jane Doe";
  const date = { day: "Wed", date: "3" };
  const slot = "2:00pm - 4:00pm";
  const appliance = "Washing Machine";
  const paymentMethod = "Cash on Delivery";

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Notification</Text>
        <View style={{ width: 20 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.notificationCard}>
          <Text style={styles.dateText}>
            {date ? `${date.day}/Sep ${date.date}` : "N/A"}, {slot || "N/A"}
          </Text>
          <Text style={styles.bookingTitle}>
            Booking with {technician || "Technician"}
          </Text>
          <View style={styles.detailsContainer}>
            <Text style={styles.detailItem}>
              <Text style={styles.detailLabel}>Appliance: </Text>
              <Text>{appliance || "N/A"}</Text>
            </Text>
            <Text style={styles.detailItem}>
              <Text style={styles.detailLabel}>Schedule: </Text>
              <Text>{date ? `${date.day}/Sep ${date.date} (${slot})` : "N/A"}</Text>
            </Text>
            <Text style={styles.detailItem}>
              <Text style={styles.detailLabel}>Payment Method: </Text>
              <Text>{paymentMethod || "N/A"}</Text>
            </Text>
            <Text style={styles.detailItem}>
              <Text style={styles.detailLabel}>Notes: </Text>
              <Text>Please call me 30 minutes before arrival.</Text>
            </Text>
          </View>

          {/* Back Button below Notes */}
          <TouchableOpacity
            onPress={() => navigation.navigate("Dashboard")}
            style={[styles.backButton, { alignSelf: "flex-start", marginTop: 20 }]}
          >
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f4f6",
    width: "100%",
    minHeight: SCREEN_HEIGHT,
  },
  header: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: Platform.OS === "android" ? 40 : 60,
    paddingBottom: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    elevation: 3,
    justifyContent: "space-between",
  },
  backButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: "#3B82F6",
    borderRadius: 8,
  },
  backButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "#111",
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 16,
  },
  notificationCard: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
    marginBottom: 20,
  },
  dateText: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 8,
    lineHeight: 20,
  },
  bookingTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#22c55e",
    marginBottom: 12,
    lineHeight: 24,
  },
  detailsContainer: { marginTop: 8 },
  detailItem: {
    fontSize: 16,
    color: "#374151",
    marginBottom: 8,
    lineHeight: 22,
    flexWrap: "wrap",
  },
  detailLabel: {
    fontWeight: "bold",
    color: "#111",
  },
});
