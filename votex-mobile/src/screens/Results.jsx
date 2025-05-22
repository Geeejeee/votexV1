import React, { useEffect, useState } from 'react';
import { SafeAreaView, StatusBar, ScrollView, Text, View, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import ElectionSummaryCard from '../components/card/electionSummaryCard';
import ElectionDetailModal from '../components/modal/electionDetailModal';
import logo from "../assets/votexmlogo.png";
import styles from '../styles/resultsStyles';
import Constants from 'expo-constants';


const BACKEND_URL =
  Constants?.expoConfig?.extra?.API_BASE_URL ||
  Constants?.manifest?.extra?.API_BASE_URL ||
  "http://127.0.0.1:5000";

const ElectionResultsApp = () => {
  const [electionsData, setElectionsData] = useState([]); // top 1 candidates for summary
  const [detailedElectionsData, setDetailedElectionsData] = useState([]); // top 3 candidates for modal
  const [selectedElection, setSelectedElection] = useState(null);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
  const fetchElections = async () => {
    const token = await AsyncStorage.getItem('token');

    try {
      const electionRes = await axios.get(`${BACKEND_URL}/api/student/get-elections`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const rawElections = electionRes.data.elections;

      const processedElectionsSummary = await Promise.all(
        rawElections.map(async (election) => {
          const positionsRes = await axios.get(`${BACKEND_URL}/api/student/election-positions/${election._id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });

          const positions = positionsRes.data.positions ?? [];

          const formattedPositions = await Promise.all(
            positions.map(async (pos) => {
              try {
                const resultRes = await axios.get(
                  `${BACKEND_URL}/api/student/election-results/${election._id}/${pos.position._id}`,
                  {
                    headers: { Authorization: `Bearer ${token}` },
                  }
                );

                // TOP 1 candidate for summary
                const topCandidate = resultRes.data.topCandidates?.[0];
                if (topCandidate) {
                  return {
                    title: pos.position.name,
                    candidates: [
                      {
                        id: topCandidate._id,
                        name: topCandidate.name,
                        party: topCandidate.party,
                        votes: topCandidate.percent,
                        photo: topCandidate.photo,
                        color: "#FFB800",
                      },
                    ],
                  };
                }
              } catch (err) {
                console.warn(`No results for position ${pos.position.name} in election ${election._id}`, err.message);
                return null;
              }
            })
          );

          return {
            id: election._id,
            title: election.title,
            description: election.description,
            logo: election.logo,
            startDate: election.startDate,
            endDate: election.endDate,
            positions: formattedPositions.filter(Boolean),
          };
        })
      );

      const processedElectionsDetails = await Promise.all(
        rawElections.map(async (election) => {
          const positionsRes = await axios.get(`${BACKEND_URL}/api/student/election-positions/${election._id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });

          const positions = positionsRes.data.positions ?? [];

          const formattedPositions = await Promise.all(
            positions.map(async (pos) => {
              try {
                const resultRes = await axios.get(
                  `${BACKEND_URL}/api/student/election-results/${election._id}/${pos.position._id}`,
                  {
                    headers: { Authorization: `Bearer ${token}` },
                  }
                );

                // TOP 3 candidates for detail modal
                const topCandidates = resultRes.data.topCandidates?.slice(0, 3) ?? [];
                if (topCandidates.length > 0) {
                  return {
                    title: pos.position.name,
                    candidates: topCandidates.map((c, i) => ({
                      id: c._id,
                      name: c.name,
                      party: c.party,
                      votes: c.percent,
                      photo: c.photo,
                      color: i === 0 ? "#FFB800" : i === 1 ? "#C0C0C0" : "#CD7F32",
                    })),
                  };
                }
              } catch (err) {
                console.warn(`No results for position ${pos.position.name} in election ${election._id}`, err.message);
                return null;
              }
            })
          );

          return {
            id: election._id,
            title: election.title,
            description: election.description,
            logo: election.logo,
            startDate: election.startDate,
            endDate: election.endDate,
            positions: formattedPositions.filter(Boolean),
          };
        })
      );

      // Filter out nulls or empty positions if you want
      setElectionsData(processedElectionsSummary.filter(e => e.positions.length > 0));
      setDetailedElectionsData(processedElectionsDetails.filter(e => e.positions.length > 0));
    } catch (err) {
      console.error("Error fetching elections:", err);
    }
  };

  fetchElections();
}, []);

useEffect(() => {
  const intervalId = setInterval(() => {
    setCurrentTime(new Date());
  }, 1000);

  return () => clearInterval(intervalId); // Cleanup on unmount
}, []);

  const getMaxVotes = (elections) => {
    let max = 0;
    elections.forEach(election => {
      election.positions.forEach(pos => {
        pos.candidates.forEach(c => {
          if (c.votes > max) max = c.votes;
        });
      });
    });
    return max;
  };

  const maxVotes = getMaxVotes(electionsData);

  const openElectionDetails = (election) => {
    setSelectedElection(election);
    setDetailModalVisible(true);
  };

  const closeElectionDetails = () => {
    setDetailModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#0D3380" barStyle="light-content" />

      <View style={styles.fixedHeader}>
        <Image source={logo} style={styles.logo} />
        <Text style={styles.menu}>☰</Text>
      </View>

      <View style={styles.timestampContainer}>
          <Text style={styles.timestampText}>
            RESULTS AS OF {currentTime.toLocaleDateString()} {currentTime.toLocaleTimeString()}
          </Text>
        </View>
              <ScrollView style={styles.scrollView}>
        <ElectionSummaryCard
          electionsData={electionsData}
          maxVotes={maxVotes}
          onPressElection={openElectionDetails}
        />
      </ScrollView>

      <ElectionDetailModal
        visible={detailModalVisible}
        onClose={closeElectionDetails}
        selectedElection={selectedElection}
        detailedElectionsData={detailedElectionsData}
        currentTime={currentTime}
      />
    </SafeAreaView>
  );
};

export default ElectionResultsApp;
