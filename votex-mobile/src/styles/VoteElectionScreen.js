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
    paddingTop: 150,
    paddingBottom: 60, // optional extra space at bottom
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

  candidateRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    gap: 0,
  },

  candidateCard: {
    flex: 1,
    height: 120,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 5,
    padding: 0,
    paddingTop: 20,
  },

  candidateInfoBox: {
    backgroundColor: "#002F6C", // or white, depending on your theme
    paddingVertical: 6,
    paddingHorizontal: 0,
    paddingVertical: 0,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "60%",
  },

  candidateAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#fff",
    marginBottom: 10,
  },

  candidateNameBox: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
    paddingVertical: 4,
    paddingHorizontal: 0,
    alignSelf: "stretch",
    flexWrap: "wrap",
  },

  partylistBox: {
    color: "#fff",
    fontSize: 10,
    textAlign: "center",
    paddingVertical: 2,
    paddingHorizontal: 0,
    alignSelf: "stretch",
    flexWrap: "wrap",
  },

  positionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },

  electionCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#002F6C",
    marginBottom: 20,
    height: "15%",
  },

  electionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#002F6C",
  },

  electionLogo: {
    width: 80,
    height: 80,
    resizeMode: "contain",
  },

  footerText: {
    textAlign: "center",
    fontSize: 12,
    color: "#999",
    marginTop: 30,
  },
});
