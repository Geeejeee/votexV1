import React, { useContext } from "react";
import { View, Text, TouchableOpacity, ScrollView, Image, StyleSheet } from "react-native";
import { UserContext } from "../context/UserContext"; // adjust the path if necessary
import { useNavigation } from "@react-navigation/native";
import styles from "../styles/votenow"; // Create this style file next!
import usgLogo from "../assets/usg-logo.png";
import citcLogo from "../assets/citc-logo.png";
import siteLogo from "../assets/site-logo.png";
import votexmlogo from "../assets/votexmlogo.png";

const VoteNowScreen = () => {
  const navigation = useNavigation();
  const { userDetails } = useContext(UserContext); // Access the UserContext for selected college and department

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

  return (
    <View style={styles.container}>
      <View style={styles.fixedHeader}>
        <Image source={votexmlogo} style={styles.logo} />
        <Text style={styles.menu}>☰</Text>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>VOTE NOW !</Text>

        {/* Displaying College and Department from UserContext */}
        <View style={styles.labelRow}>
          <View style={styles.labelGroup}>
            <Text style={styles.label}>COLLEGE:</Text>
            <Text style={styles.value}>{userDetails?.college || "N/A"}</Text>
          </View>

          <View style={styles.labelGroup}>
            <Text style={styles.label}>DEPARTMENT:</Text>
            <Text style={styles.value}>{userDetails?.department || "N/A"}</Text>
          </View>
        </View>

        {/* Election Cards */}
        {elections.map((election) => (
          <TouchableOpacity
          key={election.id}
          style={styles.card}
          onPress={() => navigation.navigate("VoteElection", {
            electionId: election.id,
            electionTitle: election.title,
          })}
        >
          <Text style={styles.cardTitle}>{election.title}</Text>
          <Image source={election.logo} style={styles.cardLogo} />
        </TouchableOpacity>
        ))}

        {/* Home Button */}
        <TouchableOpacity style={styles.homeBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.homeText}>HOME</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default VoteNowScreen;
