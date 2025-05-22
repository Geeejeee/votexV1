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
    marginTop: 35,
    paddingHorizontal: 16,
    zIndex: 99,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 60, // optional extra space at bottom
  },
  container: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 40,
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
    marginTop: 20,
    marginBottom: 20,
    textAlign: "center",
  },
  labelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    marginBottom: 20,
  },
  labelGroup: {
    flexDirection: "column",
    flex: 1,
  },
  label: {
    fontSize: 16,
    color: "#333",
    fontWeight: "bold",
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
