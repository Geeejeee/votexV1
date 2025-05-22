import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  ActivityIndicator,
} from "react-native";
import styles from "../styles/votenow";
import votexmlogo from "../assets/votexmlogo.png";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";

const BACKEND_URL =
  Constants?.expoConfig?.extra?.API_BASE_URL ||
  Constants?.manifest?.extra?.API_BASE_URL ||
  "http://127.0.0.1:5000";

const VoteNowScreen = () => {
  const navigation = useNavigation();
  const [elections, setElections] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(UserContext);

  useEffect(() => {
  const fetchElectionData = async () => {
    const token = await AsyncStorage.getItem("token");
    try {
      const electionRes = await axios.get(`${BACKEND_URL}/api/student/get-elections`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const allElections = electionRes.data.elections || [];

      const filtered = allElections.filter((election) => {
        const matchesCollege = election.college?._id === user?.college?._id;
        const matchesDepartment =
          !election.department || election.department?._id === user?.department?._id;
        return matchesCollege && matchesDepartment;
      });

      if (filtered.length === 0) {
        console.warn("No elections found.");
      }

      setElections(filtered);
      console.log("Filtered Elections:", filtered);
    } catch (err) {
      console.error("Error fetching elections:", err);
    } finally {
      setLoading(false);
    }
  };

  if (user) {
    fetchElectionData();
  }
}, [user]);

  return (
    <View style={styles.container}>
      <View style={styles.fixedHeader}>
        <Image source={votexmlogo} style={styles.logo} />
        <Text style={styles.menu}>☰</Text>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>VOTE NOW !</Text>

        {loading ? (
          <ActivityIndicator size="large" color="#000" />
        ) : (
          elections.map((election) => (
            <TouchableOpacity
              key={election._id}
              style={styles.card}
              onPress={() =>
                navigation.navigate("VoteElection", {
                  electionId: election._id,
                  electionTitle: election.title,
                })
              }
            >
              <Text style={styles.cardTitle}>{election.title}</Text>
              <Image
                source={election.logo ? { uri: election.logo } : votexmlogo}
                style={styles.cardLogo}
              />
            </TouchableOpacity>
          ))
        )}

        <TouchableOpacity style={styles.homeBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.homeText}>HOME</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default VoteNowScreen;
