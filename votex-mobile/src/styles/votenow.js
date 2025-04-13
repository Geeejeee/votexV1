import { StyleSheet } from "react-native";

export default StyleSheet.create({
  fixedHeader: {
    backgroundColor: "#002F6C",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 80, // adjust as needed
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 40,
    paddingHorizontal: 16,
    zIndex: 99,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10, // optional extra space at bottom
  },
  container: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 70,
    paddingBottom: 40,
    flex: 1,
  },
  logo: {
    width: 90,
    height: 90,
    resizeMode: "contain",
  },
  menu: {
    fontSize: 24,
    color: "#fff",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  labelRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: 20,
    flexWrap: "wrap",
    gap: 10, // optional, or use marginRight on labelGroup
  },
  labelGroup: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 30,
  },
  label: {
    fontWeight: "bold",
    marginRight: 5,
  },
  value: {
    backgroundColor: "#E5E5E5",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    marginRight: 10,
  },
  dropdown: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    marginTop: 5,
    position: "absolute", // To position the dropdown beneath the text
    top: 30,
    left: 0,
    width: 120, // Adjust the width as needed
    zIndex: 1, // Ensure dropdown shows on top
  },

  dropdownOption: {
    padding: 10,
    width: 120,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },

  dropdownText: {
    fontSize: 14,
    color: "#333",
  },
  card: {
    borderWidth: 4,
    borderColor: "#002F6C",
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardTitle: {
    width: "75%",
    fontSize: 14,
    fontWeight: "bold",
  },
  cardLogo: {
    width: 80,
    height: 80,
    resizeMode: "contain",
  },
  homeBtn: {
    backgroundColor: "#002F6C",
    padding: 12,
    borderRadius: 6,
    marginTop: 30,
    width: 120,
    alignItems: "center",
    alignSelf: "center",
  },
  homeText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
