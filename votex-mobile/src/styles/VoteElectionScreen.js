import { StyleSheet } from "react-native";

export default StyleSheet.create({
  fixedHeader: {
    backgroundColor: "#002F6C",
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
    paddingTop: 40,
    paddingBottom: 100, // optional extra space at bottom
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
    padding: 24,
    minHeight: 140,
    backgroundColor: "#fff",
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#002F6C",
    marginBottom: 60,
    width: "100%",
    height: "15%",
    marginVertical: 10,
    elevation: 6,
  },

  titleContainer: {
    flexDirection: "column", // stack text vertically
    justifyContent: "center",
    alignItems: "flex-start", // or 'center' if you want text centered
  },

  electionTitleTop: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "left",
    color: "#000",
    paddingTop: 20,
    marginBottom: 20,
  },

  electionTitleBottom: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: "#000",
    marginBottom: 8,
  },

  electionLogo: {
    width: 80,
    height: 80,
    resizeMode: "contain",
    marginLeft: -60,
  },

  footerText: {
    textAlign: "center",
    fontSize: 12,
    color: "#999",
    marginTop: 30,
  },
});
