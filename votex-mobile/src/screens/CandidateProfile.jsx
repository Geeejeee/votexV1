import React, { useState, useContext, useEffect } from 'react';
import { View, Text, Image, ScrollView, SafeAreaView, FlatList } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import logo from "../assets/votexmlogo.png";
import { styles } from '../styles/CandidateProfile.js';
import ElectionCard from '../components/card/electionCandidateProfileCard.jsx';
import CandidateDetailModal from '../components/modal/candidateDetailModal.jsx';
import CandidateCard from '../components/card/candidateProfileCard.jsx';
import { UserContext } from '../context/UserContext';
import axios from 'axios';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BACKEND_URL =
  Constants?.expoConfig?.extra?.API_BASE_URL ||
  Constants?.manifest?.extra?.API_BASE_URL ||
  "http://127.0.0.1:5000";

const CandidateProfileScreen = () => {
  const { user } = useContext(UserContext);

  const [elections, setElections] = useState([]);
  const [selectedElection, setSelectedElection] = useState(null);
  const [positions, setPositions] = useState([]);
  const [selectedCandidates, setSelectedCandidates] = useState({});
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [activeCandidate, setActiveCandidate] = useState(null);

  // Fetch elections for this user on mount
  useEffect(() => {
    fetchElections();
  }, []);

 const fetchElections = async () => {
  const token = await AsyncStorage.getItem("token");
  try {
    const res = await axios.get(`${BACKEND_URL}/api/student/get-elections`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const allElections = res.data.elections || [];

    // Filter to include only elections that the logged-in user is eligible for
    const filtered = allElections.filter((election) => {
      const matchesCollege = election.college?._id === user?.college?._id;
      const matchesDepartment =
        !election.department || election.department?._id === user?.department?._id;
      return matchesCollege && matchesDepartment;
    });

    setElections(filtered);

    if (filtered.length > 0) {
      setSelectedElection(filtered[0]);
      fetchElectionData(filtered[0]._id);
    } else {
      setSelectedElection(null);
      setPositions([]);
      setSelectedCandidates({});
    }
  } catch (err) {
    console.error("Error fetching elections", err);
  }
};


  const handleElectionChange = (electionOption) => {
    setSelectedElection(electionOption);
    fetchElectionData(electionOption._id);
  };

  const fetchElectionData = async (electionId) => {
    setLoading(true);
    const token = await AsyncStorage.getItem("token");
    try {
      const res = await axios.get(`${BACKEND_URL}/api/student/elections/${electionId}/candidates`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPositions(res.data.positions);

      const voteRes = await axios.get(`${BACKEND_URL}/api/student/elections/${electionId}/votes`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      // Map votes by position to candidate id
      const votesMap = {};
      voteRes.data.votes.forEach((vote) => {
        votesMap[vote.position] = vote.candidate;
      });
      setSelectedCandidates(votesMap);
    } catch (err) {
      console.error("Error fetching election data", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <View style={styles.fixedHeader}>
          <Image source={logo} style={styles.logo} />
          <Text style={styles.menu}>☰</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {!loading && elections.length > 0 && selectedElection && (
          <ElectionCard
            elections={elections}
            selectedElection={selectedElection}
            onElectionChange={handleElectionChange}
          />
        )}

        {!loading && elections.length === 0 && (
          <Text style={{ textAlign: 'center', marginTop: 30 }}>
            No elections available for your account.
          </Text>
        )}

        {positions.map((position) => (
          <View key={position.id} style={{ marginBottom: 20 }}>
            <Text style={styles.positionTitle}>{position.name}</Text>
            
            <FlatList
              data={position.candidates}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingLeft: 10 }}
              renderItem={({ item }) => (
                <CandidateCard
                  candidate={item}
                  position={position}
                  isSelected={selectedCandidates[position._id]?.id === item.id}
                  onSelect={(selectedCandidate, pos) => {
                    setActiveCandidate(selectedCandidate);
                    setShowModal(true);
                  }}
                />
              )}
            />
          </View>
        ))}


        <CandidateDetailModal
          visible={showModal}
          onClose={() => setShowModal(false)}
          candidate={activeCandidate}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default CandidateProfileScreen;
