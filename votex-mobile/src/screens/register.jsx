import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    ScrollView,
} from "react-native";
import { Formik } from "formik";
import { Picker } from "@react-native-picker/picker";
import { Eye, EyeOff } from "lucide-react-native";
import { RegisterSchema } from "../utils/validationSchema";
import styles from "../styles/register.js";
import logo from "../assets/votexmlogo.png";

const RegisterScreen = ({ navigation }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Image source={logo} style={styles.logo} />
            <Text style={styles.registerHeading}>Register</Text>


            <Formik
                initialValues={{
                    idNumber: "",
                    email: "",
                    password: "",
                    confirmPassword: "",
                    firstname: "",
                    lastname: "",
                    college: "",
                    department: "",
                    yearLevel: "",
                    section: "",
                }}
                validationSchema={RegisterSchema}
                onSubmit={(values) => {
                    console.log("Submitted values:", values);
                }}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                    <>
                        <TextInput
                            style={styles.input}
                            placeholder="ID Number"
                            onChangeText={handleChange("idNumber")}
                            onBlur={handleBlur("idNumber")}
                            value={values.idNumber}
                        />
                        {touched.idNumber && errors.idNumber && <Text style={{ color: "red" }}>{errors.idNumber}</Text>}

                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            keyboardType="email-address"
                            onChangeText={handleChange("email")}
                            onBlur={handleBlur("email")}
                            value={values.email}
                        />
                        {touched.email && errors.email && <Text style={{ color: "red" }}>{errors.email}</Text>}

                        <View style={styles.passwordWrapper}>
                            <TextInput
                                style={styles.input}
                                placeholder="Password"
                                secureTextEntry={!showPassword}
                                onChangeText={handleChange("password")}
                                onBlur={handleBlur("password")}
                                value={values.password}
                            />
                            <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </TouchableOpacity>
                        </View>
                        {touched.password && errors.password && <Text style={{ color: "red" }}>{errors.password}</Text>}

                        <View style={styles.passwordWrapper}>
                            <TextInput
                                style={styles.input}
                                placeholder="Confirm Password"
                                secureTextEntry={!showConfirmPassword}
                                onChangeText={handleChange("confirmPassword")}
                                onBlur={handleBlur("confirmPassword")}
                                value={values.confirmPassword}
                            />
                            <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)} style={styles.eyeIcon}>
                                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </TouchableOpacity>
                        </View>
                        {touched.confirmPassword && errors.confirmPassword && (
                            <Text style={{ color: "red" }}>{errors.confirmPassword}</Text>
                        )}

                        <TextInput
                            style={styles.input}
                            placeholder="Firstname"
                            onChangeText={handleChange("firstname")}
                            onBlur={handleBlur("firstname")}
                            value={values.firstname}
                        />
                        {touched.firstname && errors.firstname && <Text style={{ color: "red" }}>{errors.firstname}</Text>}

                        <TextInput
                            style={styles.input}
                            placeholder="Lastname"
                            onChangeText={handleChange("lastname")}
                            onBlur={handleBlur("lastname")}
                            value={values.lastname}
                        />
                        {touched.lastname && errors.lastname && <Text style={{ color: "red" }}>{errors.lastname}</Text>}

                        <Text style={styles.label}>College</Text>
                        <View style={styles.pickerWrapper}>
                            <Picker
                                selectedValue={values.college}
                                onValueChange={handleChange("college")}
                            >
                                <Picker.Item label="Select College" value="" />
                                <Picker.Item label="College of Engineering" value="engineering" />
                                <Picker.Item label="College of Business" value="business" />
                                <Picker.Item label="College of Arts" value="arts" />
                                {/* Add more options as needed */}
                            </Picker>
                        </View>
                        {touched.college && errors.college && <Text style={{ color: "red" }}>{errors.college}</Text>}

                        {/* Department Dropdown */}
                        <Text style={styles.label}>Department</Text>
                        <View style={styles.pickerWrapper}>
                            <Picker
                                selectedValue={values.department}
                                onValueChange={handleChange("department")}
                            >
                                <Picker.Item label="Select Department" value="" />
                                <Picker.Item label="Computer Science" value="cs" />
                                <Picker.Item label="Information Systems" value="is" />
                                <Picker.Item label="Electrical Engineering" value="ee" />
                                {/* Add more options as needed */}
                            </Picker>
                        </View>
                        {touched.department && errors.department && <Text style={{ color: "red" }}>{errors.department}</Text>}

                        {/* Year Level Dropdown */}
                        <Text style={styles.label}>Year Level</Text>
                        <View style={styles.pickerWrapper}>
                            <Picker
                                selectedValue={values.yearLevel}
                                onValueChange={handleChange("yearLevel")}
                            >
                                <Picker.Item label="Select Year Level" value="" />
                                <Picker.Item label="1st Year" value="1" />
                                <Picker.Item label="2nd Year" value="2" />
                                <Picker.Item label="3rd Year" value="3" />
                                <Picker.Item label="4th Year" value="4" />
                            </Picker>
                        </View>
                        {touched.yearLevel && errors.yearLevel && <Text style={{ color: "red" }}>{errors.yearLevel}</Text>}

                        <TextInput
                            style={styles.input}
                            placeholder="Section"
                            onChangeText={handleChange("section")}
                            onBlur={handleBlur("section")}
                            value={values.section}
                        />
                        {touched.section && errors.section && <Text style={{ color: "red" }}>{errors.section}</Text>}

                        <TouchableOpacity style={styles.registerBtn} onPress={handleSubmit}>
                            <Text style={styles.registerText}>Register</Text>
                        </TouchableOpacity>

                        <View style={{ flexDirection: "row", marginTop: 16 }}>
                            <Text style={styles.loginText}>Already have an account? </Text>
                            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                                <Text style={styles.loginLink}>Sign In</Text>
                            </TouchableOpacity>
                        </View>


                    </>
                )}
            </Formik>
        </ScrollView>
    );
};

export default RegisterScreen;