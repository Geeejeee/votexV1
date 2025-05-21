import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { ProgressBar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import logo from "../assets/votexmlogo.png";
import styles from "../styles/homepage.js";
import axios from "axios";
import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";



const BACKEND_URL =
  Constants?.expoConfig?.extra?.API_BASE_URL ||
  Constants?.manifest?.extra?.API_BASE_URL ||
  "http://127.0.0.1:5000";

const HomeScreen = () => {
  const navigation = useNavigation();

  const [candidates, setCandidates] = useState([]);
  const [electionInfo, setElectionInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [positions, setPositions] = useState([]);



  useEffect(() => {
    const fetchElectionData = async () => {
        const token = await AsyncStorage.getItem("token");
      try {
        // 1. Get all elections
        const electionRes = await axios.get(`${BACKEND_URL}/api/student/get-elections`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        const elections = electionRes.data.elections || [];
        if (elections.length === 0) {
          console.warn("No elections found.");
          return;
        }
        console.log("Elections:", elections);
        const election = elections[0]; // Pick latest/first/etc.
        const electionId = election._id;

        // 2. Get its associated positions
        const positionRes = await axios.get(`${BACKEND_URL}/api/student/election-positions/${electionId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        const positions = positionRes.data.positions || [];
        if (positions.length === 0) {
          console.warn("No positions found for election.");
          return;
        }

        const positionId = positions[0].position._id;
        setPositions(positions);

        console.log("Positions:", positions);
        // 3. Fetch top candidates for election + position
        const resultRes = await axios.get(`${BACKEND_URL}/api/student/election-results/${electionId}/${positionId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log("Top candidates:", resultRes.data.topCandidates);
        setCandidates(resultRes.data.topCandidates || []);
          console.log("Top candidates response:", resultRes.data);

        setElectionInfo({
          collegeName: election.college?.name || "College",
          electionTitle: election.title,
          date: new Date(election.startDate).toLocaleDateString(),
        });
          
          
          
      } catch (err) {
        console.error("Error fetching election data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchElectionData();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loading}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.fixedHeader}>
        <Image source={logo} style={styles.logo} />
        <Text style={styles.menu}>☰</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Welcome */}
        <Text style={styles.welcome}>WELCOME, USER!</Text>

        {/* Election Info */}
        {electionInfo && (
          <View style={styles.electionCard}>
            <View style={{ flex: 1 }}>
              <Text style={styles.collegeText}>{electionInfo.collegeName}</Text>
              <Text style={styles.electionTitle}>{electionInfo.electionTitle}</Text>
              <Text style={styles.electionDate}>{electionInfo.date}</Text>
            </View>
            <Text style={styles.logoEmoji}>🎯</Text>
          </View>
        )}

        {/* Candidates */}
        <View style={styles.candidateCard}>
          {loading ? (
            <ActivityIndicator size="large" color="#FFD700" />
          ) : candidates.length === 0 ? (
            <Text style={styles.noCandidates}>No candidates found.</Text>
          ) : (
            candidates.map((c) => {
              console.log("Candidate photo URI:", c.photo);  // <-- Add this log here

              return (
                <View key={c.id} style={styles.candidate}>
                  <View style={styles.avatar}>
                    {c.photo ? (
                      <Image source={{ uri: c.photo }} style={styles.avatar} 
                      onError={(e) => console.error("Error loading image:", e.nativeEvent)} />
                    ) : (
                      <Feather name="user" size={35} style={styles.candidateAvatar} />
                    )}
                  </View>
                  <View style={styles.info}>
                    <Text style={styles.candidateName}>{c.name}</Text>
                    <Text style={styles.voteText}>{c.votes} Votes</Text>
                    <ProgressBar
                      progress={c.percent}
                      color="#FFD700"
                      style={styles.progress}
                    />
                    <Text style={styles.percentage}>
                      {(c.percent * 100).toFixed(2)}%
                    </Text>
                  </View>
                </View>
              );
            })
          )}
        </View>


        {/* Vote Now Button */}
        <TouchableOpacity
          style={styles.voteNow}
          onPress={() => navigation.navigate("VoteNow")}
        >
          <MaterialCommunityIcons
            name="fingerprint"
            style={styles.voteLogo}
            size={50}
          />
          <Text style={styles.voteTextBtn}>VOTE NOW!</Text>
        </TouchableOpacity>

        {/* Navigation Buttons */}
        <View style={styles.navButtons}>
          <TouchableOpacity
            style={[styles.navBtn, { backgroundColor: "#32CD32" }]}
            onPress={() => navigation.navigate("Results")}
          >
            <MaterialCommunityIcons
              name="chart-bar"
              style={styles.viewCandidates}
              size={25}
            />
            <Text style={styles.navText}>Results</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.navBtn, { backgroundColor: "#002F6C" }]}
            onPress={() => navigation.navigate("Candidates")}
          >
            <Feather name="users" style={styles.viewCandidates} size={25} />
            <Text style={[styles.navText, { color: "#fff" }]}>Candidates</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.navBtn, { backgroundColor: "#C0392B" }]}
            onPress={() => navigation.navigate("Profile")}
          >
            <Feather name="user" style={styles.viewProf} size={25} />
            <Text style={styles.navText}>View Profile</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Fixed Footer */}
      <View style={styles.footerContainer}>
        <Text style={styles.footer}>2025 © Votex Solutions</Text>
      </View>
    </View>
  );
};

export default HomeScreen;
