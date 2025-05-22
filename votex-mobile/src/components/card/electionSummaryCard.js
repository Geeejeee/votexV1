// ElectionSummaryCard.js
import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import styles from '../../styles/resultsStyles';
import citc_logo from "../../assets/citc-logo.png";
import site_logo from "../../assets/site-logo.png";
import usg_logo from "../../assets/usg-logo.png";

// Candidate item component inside this file
const CandidateItem = ({ candidate, maxVotes, showPercentage = false }) => {
  const safeVotes = candidate.votes ?? 0;
  const safeMaxVotes = maxVotes || 1; // Avoid division by zero
  const percentage = (safeVotes / safeMaxVotes) * 100;
  const barWidth = `${Math.max(percentage, 10)}%`; // Minimum width


  return (
    <View style={styles.candidateRow}>
      <View style={[styles.candidateAvatar, { backgroundColor: candidate.color || '#ddd' }]}>
        {candidate.photo ? (
  <Image source={{ uri: candidate.photo }} style={styles.candidateAvatar} />
) : (
  <Feather name="user" size={30} color="#333" />
)}
      </View>
      <View style={styles.candidateInfo}>
        <Text style={styles.candidateName}>{candidate.name}</Text>
        <Text style={styles.candidateParty}>{candidate.party}</Text>
        <View style={styles.voteBarContainer}>
          <View style={[styles.voteBar, { width: barWidth, backgroundColor: candidate.color || '#ddd' }]} />
        </View>
        <Text style={styles.voteCount}>
          {(candidate.votes ?? 0).toLocaleString()}
          {showPercentage && ` (${Math.round(percentage)}%)`}
        </Text>
      </View>
    </View>
  );
};

const ElectionSummaryCard = ({ electionsData, maxVotes, onPressElection }) => {


  return (
    <>
      {electionsData.map((election) => (
        <TouchableOpacity 
          key={election.id} 
          style={styles.resultCard}
          onPress={() => onPressElection(election)}
          activeOpacity={0.7}
        >
          <View style={styles.electionCard}>
            <View style={styles.organizationHeader}>
              <Text style={styles.organizationName}>{election.title}</Text>
              <Text style={styles.electionText}>{election.year} ELECTIONS RESULTS</Text>
              <View style={styles.logoContainer}>
                {election.logo ? (
                  <Image source={{ uri: election.logo }} style={styles.siteLogo} />
                ) : (
                  <Image source={site_logo} style={styles.siteLogo} />  // fallback logo if none
                )}
              </View>

            </View>

            <Text style={styles.unofficialText}>UNOFFICIAL TOP 1:</Text>

            {election.positions.map((position) => (
              <View key={position.title} style={styles.candidateContainer}>
                <View style={styles.positionLabelContainer}>
                  <Text style={styles.positionLabel}>[ FOR {position.title} ]</Text>
                </View>
                <CandidateItem 
                  candidate={position.candidates[0]} 
                  maxVotes={maxVotes}
                />
              </View>
            ))}

            <View style={styles.viewAllContainer}>
              <Text style={styles.viewAllText}>Tap to view all candidates</Text>
              <Feather name="chevron-right" size={18} color="white" />
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </>
  );
};

export default ElectionSummaryCard;
