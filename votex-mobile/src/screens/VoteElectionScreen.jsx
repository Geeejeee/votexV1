import React, { useState, useEffect, useContext } from "react";
import { View, Text, Image, ScrollView, ActivityIndicator, FlatList,Alert } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import styles from "../styles/VoteElectionScreen.js";
import votexmlogo from "../assets/votexmlogo.png";
import VoteConfirmationModal from "../components/modal/voteConfirmationModal.js";
import VoteSuccessModal from "../components/modal/voteSuccessModal.js";
import AlreadyVotedModal from "../components/modal/alreadyVotedModal.js";
import ElectionCard from "../components/card/electionCard.js";
import CandidateCard from "../components/card/candidateCard.js";
import axios from "axios";
import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserContext } from "../context/UserContext";

const BACKEND_URL=
  Constants?.expoConfig?.extra?.API_BASE_URL ||
  Constants?.manifest?.extra?.API_BASE_URL ||
  "http://127.0.0.1:5000";

const VoteElectionScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { electionId } = route.params;
  const { user } = useContext(UserContext);

  const [election, setElection] = useState(null);
  const [loading, setLoading] = useState(true);
  const [positions, setPositions] = useState([]);

  // Unified selection state keyed by positionId
  const [selectedCandidates, setSelectedCandidates] = useState({});

  // Modal states
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [alreadyVotedModalVisible, setAlreadyVotedModalVisible] = useState(false);

  // Candidate & position to confirm in modal
  const [candidateToConfirm, setCandidateToConfirm] = useState(null);
  const [positionToUpdate, setPositionToUpdate] = useState(null);

  useEffect(() => {
  const fetchData = async () => {
    setLoading(true);
    const token = await AsyncStorage.getItem("token");
    try {
      // Fetch election details
      const electionRes = await axios.get(
        `${BACKEND_URL}/api/student/elections/${electionId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setElection(electionRes.data.election);

      // Fetch positions with candidates
      const candidatesRes = await axios.get(
        `${BACKEND_URL}/api/student/elections/${electionId}/candidates`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPositions(candidatesRes.data.positions);

      // Fetch user's existing votes for this election
      const votesRes = await axios.get(
        `${BACKEND_URL}/api/student/elections/${electionId}/votes`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Transform votes to selectedCandidates map { positionId: candidate }
      const votesMap = {};
      votesRes.data.votes.forEach((vote) => {
        votesMap[vote.position] = vote.candidate;
      });
      setSelectedCandidates(votesMap);

    } catch (error) {
      console.error("Failed to fetch election or candidates or votes:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, [electionId]);

  // Handle candidate selection with "already voted" check
  const handleCandidateSelect = (candidate, positionId) => {
    if (selectedCandidates[positionId]) {
      // User already voted for this position
      setAlreadyVotedModalVisible(true);
      return;
    }
    console.log("Candidate to confirm:", candidate);
    console.log("Selected candidate ID:", candidate.id);
    setCandidateToConfirm(candidate);
    setPositionToUpdate(positionId);
    setConfirmModalVisible(true);
  };

  // Confirm vote: update selected candidate state and show success modal
  const handleConfirm = async () => {
    const token = await AsyncStorage.getItem("token");
  if (!election?._id || !positionToUpdate || !candidateToConfirm?.id || !user?._id) {
    console.error("Missing vote data:", {
      election: election?._id,
      position: positionToUpdate,
      candidate: candidateToConfirm?.id,
      student: user?._id,
    });
    Alert.alert("Missing vote data", "One or more fields are undefined. Please try again.");
    return;
  }

  try {
    

    const payload = {
      election: election._id,
      position: positionToUpdate,
      candidate: candidateToConfirm.id,
    };

    console.log("Submitting vote payload:", payload);

    await axios.post(`${BACKEND_URL}/api/student/vote`, 
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );


    setSelectedCandidates((prev) => ({
      ...prev,
      [positionToUpdate]: candidateToConfirm,
    }));

    setConfirmModalVisible(false);
    setSuccessModalVisible(true);
  } catch (error) {
    
      if (error.response?.status === 400 && error.response?.data?.message === "You have already voted for this position.") {
        setConfirmModalVisible(false);
        setAlreadyVotedModalVisible(true);
      } else {
        console.error("Vote submission error:", error.response?.data || error.message);

        Alert.alert("Vote Failed", "There was an error submitting your vote. Please try again.");
      }
  }
};


  // Cancel voting confirmation
  const handleCancel = () => {
    setConfirmModalVisible(false);
    setCandidateToConfirm(null);
    setPositionToUpdate(null);
  };

  // Navigate home and reset modals/states
  const handleGoHome = () => {
    setSuccessModalVisible(false);
    setCandidateToConfirm(null);
    setPositionToUpdate(null);
    navigation.navigate("Home");
  };

  // Close success modal to vote again
  const handleVoteAgain = () => {
    setSuccessModalVisible(false);
    setCandidateToConfirm(null);
    setPositionToUpdate(null);
  };

  // Already voted modal action (placeholder)
  const handleViewVotingList = () => {
    setAlreadyVotedModalVisible(false);
    console.log("View voting list - implement navigation or action");
  };

  return (
    <View style={styles.container}>
      <View style={styles.fixedHeader}>
        <Image source={votexmlogo} style={styles.logo} />
        <Text style={styles.menu}>☰</Text>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#000" />
          <Text style={{ marginTop: 10 }}>Loading election data...</Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <ElectionCard election={election} />

          {positions.length === 0 && (
            <Text style={{ marginTop: 20, fontStyle: "italic" }}>
              No positions or candidates available for this election.
            </Text>
          )}

          {positions.map((position) => (
            <View key={position.id} style={{ marginBottom: 30 }}>
              <Text style={styles.positionTitle}>FOR {position.name.toUpperCase()}</Text>
              <FlatList
                    data={position.candidates}
                    keyExtractor={(item) => item.id.toString()}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => (
                      <CandidateCard
                        candidate={item}
                        position={position.id}
                        isSelected={selectedCandidates[position.id]=== item.id}
                        onSelect={handleCandidateSelect}
                        styles={styles}
                      />
                    )}
                    contentContainerStyle={{ gap: 12, paddingHorizontal: 4 }}
                  />

            </View>
          ))}
        </ScrollView>
      )}

      <VoteConfirmationModal
        visible={confirmModalVisible}
        candidate={candidateToConfirm}
        onCancel={handleCancel}
        onConfirm={handleConfirm}
      />

      <VoteSuccessModal
        visible={successModalVisible}
        onHome={handleGoHome}
        onVoteAgain={handleVoteAgain}
      />

      <AlreadyVotedModal
        visible={alreadyVotedModalVisible}
        onClose={handleGoHome}
        onVotingList={handleViewVotingList}
      />
    </View>
  );
};

export default VoteElectionScreen;
