// src/styles/RegisterStyles.js
import { StyleSheet } from "react-native";

const RegisterStyles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 50,
    backgroundColor: "#f2f4f8",
    flexGrow: 1,
    alignItems: "center",
  },
  logo: {
    width: 260,
    height: 250,
    resizeMode: "contain",
  },
  registerHeading: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#002f6c",
    marginBottom: 20,
    marginTop: -50,
    textAlign: "center",
  },

  input: {
    width: "100%",
    padding: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  passwordWrapper: {
    width: "100%",
    position: "relative",
  },
  eyeIcon: {
    position: "absolute",
    right: 12,
    top: 14,
  },
  registerBtn: {
    width: "100%",
    backgroundColor: "#002f6c",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  registerText: {
    color: "#fff",
    fontWeight: "bold",
  },
  divider: {
    marginVertical: 10,
    color: "#777",
  },

  loginText: {
    fontSize: 14,
    color: "#444",
  },

  loginLink: {
    fontSize: 14,
    color: "#002f6c",
    fontWeight: "bold",
  },

  pickerWrapper: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: "#fff",
  },

  label: {
    alignSelf: "flex-start",
    marginBottom: 4,
    marginTop: 10,
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
  },
});

export default RegisterStyles;
