import React, { useState } from "react";
import { View, Text, TouchableOpacity, StatusBar, Modal } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

export default function CashMethod({ navigation, route }) {
  const { technician, date, slot, appliance } = route.params;
  const [selectedMethod, setSelectedMethod] = useState("G-cash");
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#f3f4f6", padding: 16 }}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

      <View style={{ width: "100%", maxWidth: 400, backgroundColor: "#fff", borderRadius: 24, padding: 24, shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 5 }}>

        {/* Header */}
        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 24 }}>
          <TouchableOpacity style={{ padding: 8, borderRadius: 50 }} onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={24} color="#111" />
          </TouchableOpacity>
          <Text style={{ flex: 1, textAlign: "center", fontSize: 22, fontWeight: "bold", color: "#111" }}>
            Payment Method
          </Text>
        </View>

        {/* Payment Cards */}
        <View style={{ marginVertical: 16 }}>
          {/* G-cash Card */}
          <TouchableOpacity
            onPress={() => setSelectedMethod("G-cash")}
            style={{
              flexDirection: "row",
              alignItems: "center",
              padding: 16,
              borderRadius: 16,
              borderWidth: 2,
              borderColor: selectedMethod === "G-cash" ? "#3B82F6" : "transparent",
              marginBottom: 16,
            }}
          >
            <View style={{ width: 48, height: 48, borderRadius: 24, backgroundColor: "#fff", justifyContent: "center", alignItems: "center", marginRight: 12 }}>
              <Icon name="account-balance-wallet" size={24} color="#3B82F6" />
            </View>
            <View>
              <Text style={{ fontSize: 16, fontWeight: "600", color: "#111" }}>Pay with G-cash</Text>
              <Text style={{ fontSize: 12, color: "#6B7280" }}>Fast, secure mobile wallet payment.</Text>
            </View>
          </TouchableOpacity>

          {/* Cash On Delivery Card */}
          <TouchableOpacity
            onPress={() => setSelectedMethod("Cash on Delivery")}
            style={{
              flexDirection: "row",
              alignItems: "center",
              padding: 16,
              borderRadius: 16,
              borderWidth: 2,
              borderColor: selectedMethod === "Cash on Delivery" ? "#3B82F6" : "transparent",
            }}
          >
            <View style={{ width: 48, height: 48, borderRadius: 24, backgroundColor: "#fff", justifyContent: "center", alignItems: "center", marginRight: 12 }}>
              <Icon name="payment" size={24} color="#6B7280" />
            </View>
            <View>
              <Text style={{ fontSize: 16, fontWeight: "600", color: "#111" }}>Cash On Delivery</Text>
              <Text style={{ fontSize: 11, color: "#6B7280" }}>Pay directly to Technician after Service</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Proceed Button */}
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={{ backgroundColor: "#22c55e", paddingVertical: 16, borderRadius: 12, alignItems: "center", marginTop: 24 }}
        >
          <Text style={{ color: "#fff", fontSize: 16, fontWeight: "600" }}>Proceed</Text>
        </TouchableOpacity>
      </View>

      {/* Modal */}
      <Modal transparent visible={modalVisible} animationType="fade">
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)" }}>
          <View style={{ backgroundColor: "#fff", padding: 24, borderRadius: 16, width: "80%", alignItems: "center" }}>
            <Text style={{ fontSize: 16, fontWeight: "600", marginBottom: 16, textAlign: "center" }}>
              Proceeding with {selectedMethod} payment method.
            </Text>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(false);
                navigation.navigate("Notify", {
                  technician,
                  date,
                  slot,
                  appliance: appliance || "Unknown Appliance",
                  paymentMethod: selectedMethod,
                });
              }}
              style={{ backgroundColor: "#3B82F6", paddingVertical: 12, paddingHorizontal: 24, borderRadius: 12 }}
            >
              <Text style={{ color: "#fff", fontWeight: "600" }}>Ok</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
