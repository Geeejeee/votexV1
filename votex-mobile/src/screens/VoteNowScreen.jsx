import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "../styles/votenow"; // Create this style file next!
import usgLogo from "../assets/usg-logo.png";
import citcLogo from "../assets/citc-logo.png";
import siteLogo from "../assets/site-logo.png";
import votexmlogo from "../assets/votexmlogo.png";

const VoteNowScreen = () => {
  const navigation = useNavigation();

  const [showCollegeDropdown, setShowCollegeDropdown] = useState(false); // State to toggle college dropdown
  const [showDepartmentDropdown, setShowDepartmentDropdown] = useState(false); // State to toggle department dropdown
  const [selectedCollege, setSelectedCollege] = useState("CITC"); // State to store selected college
  const [selectedDepartment, setSelectedDepartment] = useState("Information Technology"); // State to store selected department

  const elections = [
    {
      id: 1,
      title: "UNIVERSITY STUDENT GOVERNMENT \n2025 ELECTIONS",
      logo: usgLogo,
    },
    {
      id: 2,
      title: "COLLEGE OF INFORMATION TECHNOLOGY AND COMPUTING \n2025 ELECTIONS",
      logo: citcLogo,
    },
    {
      id: 3,
      title: "SOCIETY OF INFORMATION TECHNOLOGY ENTHUSIASTS \n2025 ELECTIONS",
      logo: siteLogo,
    },
  ];

  const departmentOptions = {
    CITC: ["Information Technology", "Computer Science", "Technology Communication Management"],
    CEA: ["Computer Engineering", "Civil Engineering", "Architecture"],
    CSM: ["Biology", "Physics", "Mathematics"],
    COT: ["Industrial Technology", "Automotive Technology", "Electronics Technology"],
    CSTE: ["Teacher Education", "Science Education", "Educational Technology"],
  }

  const handleSelectCollege = (collegeName) => {
    setSelectedCollege(collegeName);
    setSelectedDepartment(departmentOptions[collegeName][0]); // reset to first department
    setShowCollegeDropdown(false);
    setShowDepartmentDropdown(false); // close dept dropdown too
  };
  

  const handleSelectDepartment = (departmentName) => {
    setSelectedDepartment(departmentName);
    setShowDepartmentDropdown(false); // Close dropdown after selection
  };

  return (
    <View style={styles.container}>
      <View style={styles.fixedHeader}>
        <Image source={votexmlogo} style={styles.logo} />
        <Text style={styles.menu}>☰</Text>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>VOTE NOW !</Text>
        <View style={styles.labelRow}>
          <View style={styles.labelGroup}>
            <Text style={styles.label}>COLLEGE:</Text>
            {/* Clickable CITC Text */}
            <TouchableOpacity onPress={() => setShowCollegeDropdown(!showCollegeDropdown)}>
              <Text style={styles.value}>{selectedCollege}</Text>
            </TouchableOpacity>
            {/* College dropdown options */}
            {showCollegeDropdown && (
              <View style={styles.dropdown}>
                <TouchableOpacity
                  style={styles.dropdownOption}
                  onPress={() => handleSelectCollege("CITC")}
                >
                  <Text style={styles.dropdownText}>CITC</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.dropdownOption}
                  onPress={() => handleSelectCollege("CEA")}
                >
                  <Text style={styles.dropdownText}>CEA</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.dropdownOption}
                  onPress={() => handleSelectCollege("CSM")}
                >
                  <Text style={styles.dropdownText}>CSM</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.dropdownOption}
                  onPress={() => handleSelectCollege("COT")}
                >
                  <Text style={styles.dropdownText}>COT</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.dropdownOption}
                  onPress={() => handleSelectCollege("CSTE")}
                >
                  <Text style={styles.dropdownText}>CSTE</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
          <View style={styles.labelGroup}>
            <Text style={styles.label}>DEPARTMENT:</Text>
            {/* Clickable INFO TECH Text */}
            <TouchableOpacity onPress={() => setShowDepartmentDropdown(!showDepartmentDropdown)}>
              <Text style={styles.value}>{selectedDepartment}</Text>
            </TouchableOpacity>
            {/* Department dropdown options */}
            {showDepartmentDropdown && (
  <View style={styles.dropdown}>
    {departmentOptions[selectedCollege]?.map((dept, index) => (
      <TouchableOpacity
        key={index}
        style={styles.dropdownOption}
        onPress={() => handleSelectDepartment(dept)}
      >
        <Text style={styles.dropdownText}>{dept}</Text>
      </TouchableOpacity>
    ))}
  </View>
)}

          </View>
        </View>

        {elections.map((election) => (
          <TouchableOpacity key={election.id} style={styles.card}>
            <Text style={styles.cardTitle}>{election.title}</Text>
            <Image source={election.logo} style={styles.cardLogo} />
          </TouchableOpacity>
        ))}

        <TouchableOpacity style={styles.homeBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.homeText}>HOME</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default VoteNowScreen;
