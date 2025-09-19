import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  Platform,
  Modal,
  StatusBar,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

export default function Dashboard({ navigation }) {
  const [activeTab, setActiveTab] = useState("Home");
  const [searchQuery, setSearchQuery] = useState("");
  const [menuVisible, setMenuVisible] = useState(false);

  const data = [
    { id: "1", title: "Washing Machine", image: require("./assets/washingmachine.png") },
    { id: "2", title: "Refrigerator", image: require("./assets/Ref.png") },
    { id: "3", title: "Air Conditioner", image: require("./assets/Ac.png") },
    { id: "4", title: "TV", image: require("./assets/TV.png") },
  ];

  const styles = Platform.OS === "web" ? stylesWeb : stylesAndroid;

  // 🔹 Logout function
  const handleLogout = () => {
    // Optional: clear any stored user data here
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }], // 👈 make sure "Login" is registered in your navigator
    });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate("Scheduling", { appliance: item })}
    >
      <View style={styles.cardImage}>
        <Image
          source={item.image}
          style={{ width: "60%", height: "60%", resizeMode: "contain" }}
        />
      </View>
      <Text style={styles.cardTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  const menuItems = [
    { label: "Home", icon: "home" },
    { label: "Notifications", icon: "notifications" },
    { label: "Profile", icon: "person" },
    { label: "Logout", icon: "logout" },
  ];

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

      {/* Hamburger Icon */}
      <TouchableOpacity style={styles.menuButton} onPress={() => setMenuVisible(true)}>
        <Icon name="menu" size={30} color="#111" />
      </TouchableOpacity>

      {/* Title */}
      <Text style={styles.title}>SPARKSERV</Text>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Icon name="search" size={24} color="grey" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search appliances..."
          placeholderTextColor="grey"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Appliances Grid */}
      <FlatList
        data={data.filter((item) =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase())
        )}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={{ paddingBottom: 80 }}
      />

      {/* Hamburger Menu Modal */}
      <Modal
        visible={menuVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setMenuVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPressOut={() => setMenuVisible(false)}
        >
          <View style={styles.menuBox}>
            {menuItems.map((item) => (
              <TouchableOpacity
                key={item.label}
                style={styles.menuItem}
                onPress={() => {
                  setActiveTab(item.label);
                  setMenuVisible(false);

                  if (item.label === "Logout") {
                    handleLogout();
                  } else if (item.label === "Notifications") {
                    navigation.navigate("Notify");
                  } else if (item.label === "Home") {
                    navigation.navigate("Dashboard");
                  } else if (item.label === "Profile") {
                    navigation.navigate("Profile");
                  }
                }}
              >
                <Icon
                  name={item.icon}
                  size={24}
                  color={
                    item.label === "Logout"
                      ? "red"
                      : activeTab === item.label
                      ? "#007BFF"
                      : "#333"
                  }
                />
                <Text
                  style={[
                    styles.menuLabel,
                    activeTab === item.label && item.label !== "Logout" && styles.menuLabelActive,
                    item.label === "Logout" && { color: "red", fontWeight: "700" },
                  ]}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

// 🎨 ANDROID STYLES
const stylesAndroid = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#ffffffff", paddingHorizontal: 20, paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 10 : 10 },
  title: { fontSize: 24, fontWeight: "700", marginVertical: 10, color: "#111" },
  menuButton: { alignSelf: "flex-start", marginBottom: 10 },
  searchContainer: {
    flexDirection: "row", alignItems: "center", backgroundColor: "#ffffffff",
    borderRadius: 25, paddingHorizontal: 12, paddingVertical: 8, marginBottom: 20,
    elevation: 3,
  },
  searchInput: { flex: 1, fontSize: 16, color: "#000" },
  card: {
    backgroundColor: "#fff", borderRadius: 16, flex: 1, margin: 8,
    alignItems: "center", justifyContent: "flex-start", height: 180, elevation: 2,
  },
  cardImage: { backgroundColor: "#f7f7f7ff", width: "100%", aspectRatio: 1, justifyContent: "center", alignItems: "center" },
  cardTitle: { paddingVertical: 8, fontSize: 15, fontWeight: "600", textAlign: "center", color: "#333" },
  modalOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.3)", justifyContent: "flex-start" },
  menuBox: { backgroundColor: "#ffffffff", padding: 20, marginTop: Platform.OS === "android" ? StatusBar.currentHeight + 10 : 60, marginRight: 180, borderRadius: 12, alignSelf: "flex-end" },
  menuItem: { flexDirection: "row", alignItems: "center", paddingVertical: 12 },
  menuLabel: { fontSize: 16, marginLeft: 12, color: "#333" },
  menuLabelActive: { color: "#007BFF", fontWeight: "700" },
});

// 🎨 WEB STYLES
const stylesWeb = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f3f3f3ff", paddingHorizontal: 40, maxWidth: 2000, alignSelf: "center", paddingTop: 20 },
  title: { fontSize: 28, fontWeight: "800", color: "#111", marginTop: 10, marginBottom: 10},
  menuButton: { alignSelf: "flex-start", marginBottom: 10 },
  searchContainer: {
    flexDirection: "row", alignItems: "center", backgroundColor: "#fff",
    borderRadius: 25, paddingHorizontal: 16, paddingVertical: 15, marginBottom: 10,
    boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
  },
  searchInput: { flex: 1, fontSize: 18, color: "#000" },
  card: {
    backgroundColor: "#ffffffff", borderRadius: 20, flex: 1, margin: 50, marginBottom: -20, marginRight: -5, borderLeftWidth: 39, borderRightWidth: 39, borderColor: "#ffffffff",
    alignItems: "center", justifyContent: "flex-start", height: 250,
    boxShadow: "0px 4px 12px rgba(0,0,0,0.08)", cursor: "pointer", transition: "transform 0.2s ease-in-out",
  },
  cardImage: { backgroundColor: "#eeebebff", width: "170%", aspectRatio: 1, justifyContent: "center", alignItems: "center"},
  cardTitle: { paddingVertical: 10, fontSize: 16, fontWeight: "700", textAlign: "center", color: "#222" },
  modalOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.3)", justifyContent: "flex-start" },
  menuBox: { backgroundColor: "#fff", padding: 20, marginTop: 60, marginRight: 1000, borderRadius: 12, alignSelf: "flex-end", width: 200 },
  menuItem: { flexDirection: "row", alignItems: "center", paddingVertical: 14 },
  menuLabel: { fontSize: 16, marginLeft: 12, color: "#333" },
  menuLabelActive: { color: "#007BFF", fontWeight: "700" },
});
