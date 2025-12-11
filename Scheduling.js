import React, { useState, useEffect } from "react";
import { 
  View, Text, TouchableOpacity, StyleSheet, Modal, 
  Platform, ScrollView 
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";

export default function Scheduling() {
  const route = useRoute();
  const navigation = useNavigation();
  const { appliance } = route.params || {}; // receives appliance from Dashboard

  // State management
  const [selectedTechnician, setSelectedTechnician] = useState("Jane Doe");
  const [selectedDate, setSelectedDate] = useState({ day: "We", date: 3 });
  const [selectedSlot, setSelectedSlot] = useState("9:00 am - 10:00 am");
  const [slotStatus, setSlotStatus] = useState("open slot");
  const [modalVisible, setModalVisible] = useState(false);

  // Date and time slot data
  const weekDays = [
    { day: "Mo", date: 1 },
    { day: "Tu", date: 2 },
    { day: "We", date: 3 },
    { day: "Th", date: 4 },
    { day: "Fr", date: 5 },
    { day: "Sa", date: 6 },
    { day: "Su", date: 7 },
  ];

  const timeSlots = [
    { time: "9:00 am - 10:00 am", status: "open slot" },
    { time: "10:00 am - 11:00 am", status: "no conflicts" },
    { time: "2:00 pm - 4:00 pm", status: "no conflicts, fast response" },
    { time: "4:00 pm - 5:00 pm", status: "open slot" },
  ];

  const technicians = ["Jane Doe", "John Smith", "Alice Johnson"];

  const handleSelectSlot = (slot) => {
    setSelectedSlot(slot.time);
    setSlotStatus(slot.status);
  };

  const handleSelectDate = (day, date) => {
    setSelectedDate({ day, date });
    handleSelectSlot(timeSlots[0]); // auto-select first slot
  };

  useEffect(() => {
    handleSelectDate("We", 3); // default selection
  }, []);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backArrow}>←</Text>
          <Text style={styles.headerText}>Scheduling</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {/* Technician Card */}
        <View style={styles.techCard}>
          <View>
            <Text style={styles.techName}>{selectedTechnician}</Text>
            <Text style={styles.techSkill}>Plumbing</Text>
          </View>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Text style={styles.changeTech}>Change Technician</Text>
          </TouchableOpacity>
        </View>

        {/* Calendar Week */}
        <View style={styles.calendar}>
          {weekDays.map((item) => (
            <TouchableOpacity
              key={item.day}
              style={[
                styles.dateItem,
                selectedDate.day === item.day ? styles.dateSelected : null,
              ]}
              onPress={() => handleSelectDate(item.day, item.date)}
            >
              <Text
                style={[
                  styles.dateDay,
                  selectedDate.day === item.day && { color: "#fff" },
                ]}
              >
                {item.day}
              </Text>
              <Text
                style={[
                  styles.dateNum,
                  selectedDate.day === item.day && { color: "#fff" },
                ]}
              >
                {item.date}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Best Slot Suggestion */}
        <View style={styles.suggestionCard}>
          <Text style={styles.suggestionTitle}>Best slot for you:</Text>
          <Text style={styles.suggestionText}>
            {selectedDate.day}, Sep {selectedDate.date} ({selectedSlot})
          </Text>
          <Text style={styles.suggestionSub}>{slotStatus}</Text>
        </View>

        {/* Time Slots */}
        <View style={styles.slotGrid}>
          {timeSlots.map((slot) => (
            <TouchableOpacity
              key={slot.time}
              style={[
                styles.slot,
                selectedSlot === slot.time ? styles.slotSelected : null,
              ]}
              onPress={() => handleSelectSlot(slot)}
            >
              <Text
                style={[
                  styles.slotText,
                  selectedSlot === slot.time && { color: "#166534" },
                ]}
              >
                {slot.time}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Book Button */}
        <TouchableOpacity
          style={styles.bookButton}
          onPress={() =>
            navigation.navigate('CashMethod', {
              technician: selectedTechnician,
              date: selectedDate,
              slot: selectedSlot,
            })
          }
        >
          <Text style={styles.bookButtonText}>Book Schedule</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Technician Modal */}
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Select a Technician</Text>
            {technicians.map((tech) => (
              <TouchableOpacity
                key={tech}
                style={styles.modalItem}
                onPress={() => {
                  setSelectedTechnician(tech);
                  setModalVisible(false);
                }}
              >
                <Text style={styles.modalItemText}>{tech}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.cancelButton}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#e5e7eb" },
  header: {
    padding: 16,
    backgroundColor: "#fff",
    elevation: Platform.OS === "android" ? 3 : 0,
  },
  backButton: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  backArrow: { fontSize: 22, color: "#374151", marginTop: 20, marginBottom: 10},
  headerText: { fontSize: 16, fontWeight: "600", color: "#6b7280" },

  techCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: "#f9fafb",
    borderRadius: 16,
    marginBottom: 16,
  },
  techName: { fontSize: 18, fontWeight: "bold" },
  techSkill: { color: "#6b7280" },
  changeTech: { color: "#3b82f6", fontWeight: "600" },

  calendar: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  dateItem: {
    flex: 1,
    alignItems: "center",
    padding: 8,
    borderRadius: 12,
  },
  dateSelected: { backgroundColor: "#3b82f6" },
  dateDay: { fontSize: 12, color: "#6b7280" },
  dateNum: { fontSize: 14, fontWeight: "bold" },

  suggestionCard: {
    backgroundColor: "#dbeafe",
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
  },
  suggestionTitle: { fontWeight: "600", color: "#1e3a8a" },
  suggestionText: { fontSize: 16, fontWeight: "bold", color: "#2563eb" },
  suggestionSub: { fontSize: 12, color: "#6b7280" },

  slotGrid: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  slot: {
    width: "48%",
    padding: 12,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 12,
    marginBottom: 12,
  },
  slotSelected: { borderColor: "#22c55e", backgroundColor: "#dcfce7" },
  slotText: { fontWeight: "600", color: "#374151" },

  bookButton: {
    backgroundColor: "#22c55e",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 16,
  },
  bookButtonText: { color: "#fff", fontSize: 16, fontWeight: "600" },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)", // ✅ fixed
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    width: "80%",
  },
  modalTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 12 },
  modalItem: {
    padding: 12,
    backgroundColor: "#f3f4f6",
    borderRadius: 12,
    marginBottom: 8,
  },
  modalItemText: { fontSize: 16 },
  cancelButton: { marginTop: 10, alignItems: "center" },
  cancelText: { color: "#3b82f6", fontWeight: "600" },
});
