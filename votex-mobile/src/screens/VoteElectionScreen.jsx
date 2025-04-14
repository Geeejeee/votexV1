import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import styles from '../styles/VoteElectionScreen.js';
import usgLogo from '../assets/usg-logo.png'; // Update path if needed
import votexmlogo from '../assets/votexmlogo.png';

const VoteElectionScreen = () => {
  const route = useRoute();
  const { selectedPresident, selectedVP, selectedSecretary } = route.params || {};

  const renderCandidate = (name, party, color) => (
    <View style={[styles.candidateCard, { backgroundColor: color }]}>
      <View style={styles.candidateAvatar} />

      <View style={styles.candidateInfoBox}>
        <Text style={styles.candidateNameBox}> {name} </Text>
        <Text style={styles.partylistBox}> {party} </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.fixedHeader}>
          <Image source={votexmlogo} style={styles.logo} />
          <Text style={styles.menu}>☰</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Election Card */}
        <View style={styles.electionCard}>
          <Text style={styles.electionTitle}>2025 ELECTIONS</Text>
          <Image source={usgLogo} style={styles.electionLogo} />
        </View>

        {/* PRESIDENT */}
        <Text style={styles.positionTitle}>FOR PRESIDENT :</Text>
        <View style={styles.candidateRow}>
          {renderCandidate('Candidate Name', 'Party A', '#FFC107')}
          {renderCandidate('Candidate Name', 'Party B', '#4CAF50')}
          {renderCandidate('Candidate Name', 'Party C', '#F44336')}
        </View>

        {/* VICE PRESIDENT */}
        <Text style={styles.positionTitle}>FOR VICE PRESIDENT :</Text>
        <View style={styles.candidateRow}>
          {renderCandidate('Candidate Name', 'Party A', '#FFC107')}
          {renderCandidate('Candidate Name', 'Party B', '#4CAF50')}
          {renderCandidate('Candidate Name', 'Party C', '#F44336')}
        </View>

        {/* SECRETARY */}
        <Text style={styles.positionTitle}>FOR SECRETARY :</Text>
        <View style={styles.candidateRow}>
          {renderCandidate('Candidate Name', 'Party A', '#FFC107')}
          {renderCandidate('Candidate Name', 'Party B', '#4CAF50')}
          {renderCandidate('Candidate Name', 'Party C', '#F44336')}
        </View>

      </ScrollView>
    </View>
  );
};

export default VoteElectionScreen;
