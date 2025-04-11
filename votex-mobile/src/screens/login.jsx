// src/screens/LoginScreen.js
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { Eye, EyeOff } from "lucide-react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import styles from "../styles/login.js";
import logo from "../assets/votexmlogo.png";

const LoginScreen = ({ navigation }) => {
    const [showPassword, setShowPassword] = useState(false);

    const LoginSchema = Yup.object().shape({
        idNumber: Yup.string().required("ID number is required"),
        password: Yup.string().required("Password is required"),
    });

    return (
        <View style={styles.container}>
            <Image source={logo} style={styles.logo} />

            <Formik
                initialValues={{ idNumber: "", password: "" }}
                validationSchema={LoginSchema}
                onSubmit={(values) => {
                    console.log(values);
                    // Handle login logic here
                }}
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
                                {showPassword ? <EyeOff size={20} color="#444" /> : <Eye size={20} color="#444" />}
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
