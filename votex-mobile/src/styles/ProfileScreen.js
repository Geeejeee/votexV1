import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
  backgroundColor: "#002F6C",
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  height: 80, // enough space including status bar
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  paddingHorizontal: 16,
  zIndex: 99,
},

  scrollContent: {
  paddingHorizontal: 20,
  paddingTop: 120,
  paddingBottom: 60,
},

  logo: {
    height: 90,
    width: 90,
    resizeMode: "contain",
  },
  menuButton: {
    padding: 5,
  },
  menuIcon: {
    color: "white",
    fontSize: 28,
  },
  profileContent: {
    flex: 1,
    alignItems: "center",
    paddingTop: 0,
  },
  profileImageContainer: {
    width: 120,
    height: 120,
    justifyContent: "center",
    alignItems: "center",
  },
  profileImage: {
    width: 100,
    height: 100,
    backgroundColor: "#4CAF50",
    borderRadius: 0,
  },
  changeProfileButton: {
    backgroundColor: "#1a237e",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginTop: 10,
  },
  changeProfileText: {
    color: "white",
    fontSize: 14,
    fontWeight: "500",
  },
  userName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1a237e",
    marginTop: 15,
    textAlign: "center",
  },
  userId: {
    fontSize: 16,
    color: "#666",
    marginTop: 5,
    marginBottom: 20,
  },
  infoCard: {
    backgroundColor: "#1a237e",
    borderRadius: 10,
    width: "85%",
    padding: 20,
  },
  infoRow: {
    marginBottom: 15,
  },
  infoLabel: {
    color: "white",
    fontSize: 14,
    marginBottom: 3,
    fontWeight: "bold",
  },
  infoValue: {
    color: "white",
    fontSize: 16,
  },
  footer: {
    alignItems: "center",
    paddingVertical: 10,
  },
  footerText: {
    color: "#777",
    fontSize: 12,
  },
  profileImage: {
  marginTop: 120,
  width: 120,
  height: 120,
  borderRadius: 60,
  backgroundColor: "#4CAF50",
  alignSelf: 'center',
  marginBottom: 40,
},

  profileImagePlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    width: "90%",
    alignSelf: "center",
  },
  saveBtn: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    width: "90%",
    alignSelf: "center",
  },
  saveText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default styles;
