import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    ScrollView,
    ActivityIndicator,
} from "react-native";
import { Formik } from "formik";
import { Picker } from "@react-native-picker/picker";
import { Eye, EyeOff } from "lucide-react-native";
import { RegisterSchema } from "../utils/validationSchema";
import styles from "../styles/register.js";
import logo from "../assets/votexmlogo.png";
import axios from "axios";
import {API_BASE_URL} from '@env'

const RegisterScreen = ({ navigation }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [colleges, setColleges] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [loadingDepartmentdepartments, setLoadingDepartmentdepartments] = useState(false);

    useEffect(() => {
        const fetchColleges = async () => {
            try {
                const res = await axios.get(`${API_BASE_URL}/api/auth/get-college`);
                
                if (Array.isArray(res.data.colleges)) {
                    setColleges(res.data.colleges);
                    console.log("Fetched colleges:", res.data.colleges);
                } else {
                    console.error("Unexpected response from colleges:", res.data);
                    setColleges([]);
                }
            } catch (err) {
                console.error("Error fetching colleges:", err);
                alert("Failed to load colleges. Please try again.");
                setColleges([]);
            }
        };
    
        fetchColleges();
    }, []);
    

    const fetchDepartments = async (collegeId) => {
        setLoadingDepartmentdepartments(true);
        try {
            const res = await axios.get(`${API_BASE_URL}/api/auth/get-department/${collegeId}`);
            console.log("Departments fetched:", res.data); 
            if (Array.isArray(res.data.departments)) {
                setDepartments(res.data.departments);
            } else {
                console.error("Unexpected response from departments:", res.data);
                setDepartments([]);
            }
        } catch (err) {
            console.error("Error fetching departments:", err);
            setDepartments([]);
        }
        setLoadingDepartmentdepartments(false);
    };
    
    const handleCollegeChange = (collegeId, setFieldValue) => {
        console.log("Picker onValueChange triggered. Selected Value:", collegeId);
        setFieldValue("college", collegeId);
        setFieldValue("department", "");
        setDepartments([]); // Clear departments before fetching new
        if (collegeId) {
            console.log("Fetching departments for college:", collegeId);
            fetchDepartments(collegeId);
     
        }else{
            console.log("No college selected.");
        }
    };
    

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
                onSubmit={async (values) => {
                   

                    console.log("Form values on submit:", values);
                    try {
                        const res = await axios.post(`${API_BASE_URL}/api/auth/register`, values);
                        alert("Registration successful");
                        navigation.navigate("Login");
                    } catch (error) {
                        const message = error.response?.data?.message || "Registration failed. Please try again.";
                        console.error("Registration Error:", message);
                        alert(message);
                    }
                }}
            >
                {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, touched }) => (
                    <>
                        {/* ID Number */}
                        <TextInput
                            style={styles.input}
                            placeholder="ID Number"
                            onChangeText={text => setFieldValue("idNumber", text.trim())}
                            onBlur={handleBlur("idNumber")}
                            value={values.idNumber}
                        />
                        {touched.idNumber && errors.idNumber && <Text style={{ color: "red" }}>{errors.idNumber}</Text>}

                        {/* Email */}
                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            keyboardType="email-address"
                            onChangeText={text => setFieldValue("email", text.trim())}
                            onBlur={handleBlur("email")}
                            value={values.email}
                        />
                        {touched.email && errors.email && <Text style={{ color: "red" }}>{errors.email}</Text>}

                        {/* Password */}
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

                        {/* Confirm Password */}
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

                        {/* Firstname */}
                        <TextInput
                            style={styles.input}
                            placeholder="Firstname"
                            onChangeText={text => setFieldValue("firstname", text.trim())}
                            onBlur={handleBlur("firstname")}
                            value={values.firstname}
                        />
                        {touched.firstname && errors.firstname && <Text style={{ color: "red" }}>{errors.firstname}</Text>}

                        {/* Lastname */}
                        <TextInput
                            style={styles.input}
                            placeholder="Lastname"
                            onChangeText={text => setFieldValue("lastname", text.trim())}
                            onBlur={handleBlur("lastname")}
                            value={values.lastname}
                        />
                        {touched.lastname && errors.lastname && <Text style={{ color: "red" }}>{errors.lastname}</Text>}
                        

                        {/* College Picker */}
                        <Text style={styles.label}>College</Text>
                        <View style={styles.pickerWrapper}>
                        <Picker
                            selectedValue={values.college}
                            
                            onValueChange={(itemValue) => {
                                console.log("Picker onValueChange triggered. Selected Value: ", itemValue);
                                handleCollegeChange(itemValue, setFieldValue)}}
                            
                            style={styles.input}
                        >
                            <Picker.Item label="Select College" value="" key="select-college" />
                            {colleges.map((college) => (
                                <Picker.Item key={college.id} label={college.name} value={college.id} />
                            ))}
                        </Picker>
                        </View>
                        {touched.college && errors.college && <Text style={{ color: "red" }}>{errors.college}</Text>}

                        {/* Department Picker */}
                        <Text style={styles.label}>Department</Text>
                        <View style={styles.pickerWrapper}>
                        {loadingDepartmentdepartments ? (
                            <ActivityIndicator size="small" color="#0000ff" />
                        ) : (
                            
                        <Picker
                            selectedValue={values.department}
                            onValueChange={(itemValue) => {
                                console.log("Department selected:", itemValue); // Log selected department ID
                                setFieldValue("department", itemValue)}}
                            style={styles.input}
                            enabled={departments.length > 0}
                        >
                        <Picker.Item label="Select Department" value="" />
                            {departments.length > 0 ? (
                                departments.map((department) => (
                        <Picker.Item key={department.id} label={department.name} value={department.id} />
                            ))
                        ):(
                                <Picker.Item label="No departments Available" value="" />
                            )}
                        </Picker>
                    
                        )}
                        </View>
                        {touched.department && errors.department && <Text style={{ color: "red" }}>{errors.department}</Text>}

                        {/* Year Level Picker */}
                        <Text style={styles.label}>Year Level</Text>
                        <View style={styles.pickerWrapper}>
                            <Picker
                                selectedValue={values.yearLevel}
                                onValueChange={(val) => setFieldValue("yearLevel", val)}
                            >
                                <Picker.Item label="Select Year Level" value="" />
                                <Picker.Item label="1st Year" value="1st Year" />
                                <Picker.Item label="2nd Year" value="2nd Year" />
                                <Picker.Item label="3rd Year" value="3rd Year" />
                                <Picker.Item label="4th Year" value="4th Year" />
                            </Picker>
                        </View>
                        {touched.yearLevel && errors.yearLevel && <Text style={{ color: "red" }}>{errors.yearLevel}</Text>}

                        {/* Section */}
                        <TextInput
                            style={styles.input}
                            placeholder="Section"
                            onChangeText={text => setFieldValue("section", text.trim())}
                            onBlur={handleBlur("section")}
                            value={values.section}
                        />
                        {touched.section && errors.section && <Text style={{ color: "red" }}>{errors.section}</Text>}

                        {/* Register Button */}
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
