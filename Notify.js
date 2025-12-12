import React from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Platform, Dimensions, StatusBar as RNStatusBar } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function Notify() {
  const route = useRoute();
  const navigation = useNavigation();

  const {
    technician = "Technician",
    date = { day: "N/A", date: "N/A" },
    slot = "N/A",
    appliance = "N/A",
    paymentMethod = "N/A",
  } = route.params || {};

  // 🔹 Fix Android status bar flicker
  if (Platform.OS === "android") {
    RNStatusBar.setBackgroundColor("#f3f4f6", true);
    RNStatusBar.setBarStyle("dark-content", true);
  }

  return (
    <View style={Platform.OS === "web" ? stylesWeb.container : stylesAndroid.container}>
      {/* Header with arrow and title */}
      <View style={Platform.OS === "web" ? stylesWeb.header : stylesAndroid.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={Platform.OS === "web" ? stylesWeb.arrowContainer : stylesAndroid.arrowContainer}
        >
          <Text style={Platform.OS === "web" ? stylesWeb.arrowText : stylesAndroid.arrowText}>←</Text>
        </TouchableOpacity>
        <Text style={Platform.OS === "web" ? stylesWeb.headerTitle : stylesAndroid.headerTitle}>
          My Notification
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={Platform.OS === "web" ? stylesWeb.scrollContainer : stylesAndroid.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={Platform.OS === "web" ? stylesWeb.notificationCard : stylesAndroid.notificationCard}>
          <Text style={Platform.OS === "web" ? stylesWeb.bookingTitle : stylesAndroid.bookingTitle}>
            Booking with {technician}
          </Text>
          <View style={Platform.OS === "web" ? stylesWeb.detailsContainer : stylesAndroid.detailsContainer}>
            <Text style={Platform.OS === "web" ? stylesWeb.detailItem : stylesAndroid.detailItem}>
              <Text style={Platform.OS === "web" ? stylesWeb.detailLabel : stylesAndroid.detailLabel}>Appliance: </Text>
              <Text>{appliance}</Text>
            </Text>
            <Text style={Platform.OS === "web" ? stylesWeb.detailItem : stylesAndroid.detailItem}>
              <Text style={Platform.OS === "web" ? stylesWeb.detailLabel : stylesAndroid.detailLabel}>Schedule: </Text>
              <Text>{date.day && date.date ? `${date.day}/Sep ${date.date} (${slot})` : "N/A"}</Text>
            </Text>
            <Text style={Platform.OS === "web" ? stylesWeb.detailItem : stylesAndroid.detailItem}>
              <Text style={Platform.OS === "web" ? stylesWeb.detailLabel : stylesAndroid.detailLabel}>Payment Method: </Text>
              <Text>{paymentMethod}</Text>
            </Text>
            <Text style={Platform.OS === "web" ? stylesWeb.detailItem : stylesAndroid.detailItem}>
              <Text style={Platform.OS === "web" ? stylesWeb.detailLabel : stylesAndroid.detailLabel}>Notes: </Text>
              <Text>Please call me 30 minutes before arrival.</Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

// Android Styles
const stylesAndroid = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f3f4f6", width: "100%", minHeight: SCREEN_HEIGHT },
  header: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    elevation: 3,
    justifyContent: "center",
    position: "relative",
  },
  arrowContainer: { position: "absolute", left: 16, top: 50 },
  arrowText: { fontSize: 24, fontWeight: "900", color: "#111" },
  headerTitle: { fontSize: 20, fontWeight: "bold", color: "#111" },
  scrollContainer: { flexGrow: 1, padding: 16 },
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
  bookingTitle: { fontSize: 20, fontWeight: "bold", color: "#22c55e", marginBottom: 12, lineHeight: 24 },
  detailsContainer: { marginTop: 8 },
  detailItem: { fontSize: 16, color: "#374151", marginBottom: 8, lineHeight: 22, flexWrap: "wrap" },
  detailLabel: { fontWeight: "bold", color: "#111" },
});

// Web Styles
const stylesWeb = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f3f4f6", width: "100%", minHeight: SCREEN_HEIGHT },
  header: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 40,
    paddingTop: 30,
    paddingBottom: 20,
    backgroundColor: "#fff",
    boxShadow: "0px 3px 6px rgba(0,0,0,0.1)",
    justifyContent: "center",
    position: "relative",
  },
  arrowContainer: { position: "absolute", left: 16, top: 30 },
  arrowText: { fontSize: 24, fontWeight: "900", color: "#111" },
  headerTitle: { fontSize: 28, fontWeight: "bold", color: "#111" },
  scrollContainer: { flexGrow: 1, padding: 16, alignItems: "center" },
  notificationCard: {
    width: 480,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 6,
    marginBottom: 20,
    alignItems: "center",
  },
  bookingTitle: { fontSize: 20, fontWeight: "bold", color: "#22c55e", marginBottom: 12, lineHeight: 24 },
  detailsContainer: { marginTop: 8 },
  detailItem: { fontSize: 16, color: "#374151", marginBottom: 8, lineHeight: 22, flexWrap: "wrap" },
  detailLabel: { fontWeight: "bold", color: "#111" },
});
