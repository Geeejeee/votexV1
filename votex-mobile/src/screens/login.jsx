// src/screens/LoginScreen.js
import React, { useState, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, Alert } from "react-native";
import { Feather } from '@expo/vector-icons';
import { Formik } from "formik";
import * as Yup from "yup";
import styles from "../styles/login.js";
import logo from "../assets/votexmlogo.png";
import Constants from "expo-constants";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserContext } from "../context/UserContext";



const API_BASE_URL =
  Constants?.expoConfig?.extra?.API_BASE_URL ||
  Constants?.manifest?.extra?.API_BASE_URL ||
  "http://127.0.0.1:5000"; // optional fallback


const LoginScreen = ({ navigation }) => {
    const [showPassword, setShowPassword] = useState(false);
    const { setUser } = useContext(UserContext);

    const LoginSchema = Yup.object().shape({
        idNumber: Yup.string().required("ID number is required"),
        password: Yup.string().required("Password is required"),
    });

    const handleLogin = async (values) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/mobile-login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        idNumber: values.idNumber,
        password: values.password,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      // ✅ Save token
      if (data.token) {
        await AsyncStorage.setItem("token", data.token);
        console.log("Token saved:", data.token);
      } 

      const profileRes = await fetch(`${API_BASE_URL}/api/student/profile`, {
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        });

        const profileData = await profileRes.json();
        if (profileRes.ok) {
            setUser(profileData.student);
            console.log("User profile loaded:", profileData.student);
          } else {
            console.warn("Failed to load student profile:", profileData.message || profileData.error || profileData);
          }
          console.log("Profile fetch status:", profileRes.status);


      console.log("Login Successful:", data);
      Alert.alert("Success", "Login Successful");
      navigation.navigate("Home");
    } else {
      Alert.alert("Login Failed", data.message || "Invalid credentials");
    }
  } catch (error) {
    console.error("Login Error:", error);
    Alert.alert("Error", "Something went wrong. Please try again.");
  }
};


    return (
        <View style={styles.container}>
            <Image source={logo} style={styles.logo} />

            <Formik
                initialValues={{ idNumber: "", password: "" }}
                validationSchema={LoginSchema}
                onSubmit={(values) => {
                    console.log("Submitting with values:", values);
                    handleLogin(values)}}
            >
                {({ handleChange, handleBlur, handleSubmit, values, touched, errors }) => (
                    <>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter your ID number"
                            placeholderTextColor="#888"
                            onChangeText={handleChange("idNumber")}
                            onBlur={handleBlur("idNumber")}
                            value={values.idNumber}
                        />
                        {touched.idNumber && errors.idNumber && (
                            <Text style={styles.errorText}>{errors.idNumber}</Text>
                        )}

                        <View style={styles.passwordWrapper}>
                            <TextInput
                                style={styles.passwordInput}
                                placeholder="Enter your password"
                                placeholderTextColor="#888"
                                secureTextEntry={!showPassword}
                                onChangeText={handleChange("password")}
                                onBlur={handleBlur("password")}
                                value={values.password}
                            />
                            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                                <Feather name={showPassword ? "eye-off" : "eye"} size={20} color="#444" />
                            </TouchableOpacity>
                        </View>
                        {touched.password && errors.password && (
                            <Text style={styles.errorText}>{errors.password}</Text>
                        )}

                        <TouchableOpacity style={styles.forgotPassword}>
                            <Text style={styles.forgotText}>Forgot Password?</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.loginBtn} onPress={handleSubmit}>
                            <Text style={styles.loginText}>Login</Text>
                        </TouchableOpacity>

                        <View style={styles.footer}>
                            <Text style={styles.footerText}>Don’t have an account? </Text>
                            <TouchableOpacity onPress={() => navigation.navigate("Registration")}>
                                <Text style={styles.footerLink}>Register Now</Text>
                            </TouchableOpacity>
                        </View>
                    </>
                )}
            </Formik>
        </View>
    );
};

export default LoginScreen;
