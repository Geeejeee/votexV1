import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
  flex: 1,
  backgroundColor: "#f9f9f9", // optional: clean background
},

  fixedHeader: {
  backgroundColor: "#002F6C",
  height: 80,
  paddingHorizontal: 20,
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
    marginTop: '0%',
},

logo: {
  width: 60,
  height: 60,
  resizeMode: "contain",
},

menu: {
  fontSize: 28,
  color: "#fff",
  paddingRight: 10,
},


  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
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
  flexWrap: "wrap",
  justifyContent: "space-between",
  gap: 10,
},


  candidateCard: {
  width: 140,
  height: 160,
  borderRadius: 10,
  borderWidth: 2,
  borderColor: "#002F6C",
  alignItems: "center",
  justifyContent: "center",
  padding: 10,
  marginRight: 10,
},



candidateInfoBox: {
  backgroundColor: "#002F6C",
  paddingVertical: 6,
  borderRadius: 6,
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
},

  candidateAvatar: {
    width: 80,
    height: 70,
    borderRadius: 10,
    backgroundColor: "#fff",
    marginBottom: 10,
  },

  candidateNameBox: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
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
  minHeight: 120,
  backgroundColor: "#fff",
  borderRadius: 16,
  borderWidth: 2,
  borderColor: "#002F6C",
  marginBottom: 30,
  width: "100%",
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
    marginBottom: 10,
    width: "80%",
    textAlign: "justify",
  },

  electionTitleBottom: {
    fontSize: 15,
    fontWeight: 400,
    textAlign: "center",
    color: "#000",
    marginBottom: 5,
    width: "80%",
    textAlign: "justify",
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
  loadingContainer: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  paddingTop: 0,
},


});
