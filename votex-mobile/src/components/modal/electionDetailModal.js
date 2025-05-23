// ElectionDetailModal.js
import React from 'react';
import { 
  Modal, 
  SafeAreaView, 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  Image 
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import styles from '../../styles/resultsStyles';  // adjust path as needed
import logo from "../../assets/votexmlogo.png";
import usg_logo from "../../assets/usg-logo.png";

const ElectionDetailModal = ({ 
  visible, 
  onClose, 
  selectedElection,
  detailedElectionsData,
  currentTime
}) => {

  if (!selectedElection || !detailedElectionsData) return null;

  // Find detailed data for this election by id
  const detailedElection = detailedElectionsData.find(e => e.id === selectedElection.id);

  if (!detailedElection) {
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={visible}
        onRequestClose={onClose}
      >
        <SafeAreaView style={styles.detailContainer}>
          <Text>No detailed data available</Text>
          <TouchableOpacity onPress={onClose}><Text>Close</Text></TouchableOpacity>
        </SafeAreaView>
      </Modal>
    );
  }

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={visible}
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.detailContainer}>
        {/* Header */}
        <View style={styles.detailHeader}>
          <View style={styles.leftHeader}>
            <TouchableOpacity onPress={onClose} style={styles.backButton}>
              <Feather name="chevron-left" size={24} color="white" />
            </TouchableOpacity>
            <Image source={logo} style={styles.detailLogo} />
          </View>

          <View style={styles.rightHeaderIcons}>
            <Feather name="menu" size={22} color="white" />
          </View>
        </View>

        {/* Timestamp */}
        <View style={styles.detailTimestampContainer}>
          <Text style={styles.detailTimestampLabel}>RESULTS AS OF</Text>
          <Text style={styles.timestampText}>
            {currentTime.toLocaleDateString()} {currentTime.toLocaleTimeString()}
          </Text>
        </View>

        {/* Election Info */}
        <View style={styles.organizationInfoContainer}>
          <View style={styles.orgInfoBox}>
            <Text style={styles.detailOrgName}>{selectedElection.title}</Text>
            <Text style={styles.detailElectionText}> ELECTIONS RESULTS</Text>
            
            <View style={styles.detailLogoContainer}>
              {selectedElection.logo ? (
                <Image source={{ uri: selectedElection.logo }} style={styles.detailLogo} />
              ) : (
                <Image source={usg_logo} style={styles.detailLogo} />
              )}
            </View>
          </View>
        </View>

        {/* Results */}
        <ScrollView style={styles.detailScrollView}>
          {detailedElection.positions.map((position) => {
            const totalPositionVotes = position.candidates.reduce((sum, c) => sum + c.votes, 0);

            return (
              <View key={position.title} style={styles.positionContainer}>
                <View style={styles.positionHeaderBar}>
                  <Text style={styles.positionTitle}>FOR {position.title}:</Text>
                </View>

                {position.candidates.map((candidate, index) => {
                  const percentage = ((candidate.votes / totalPositionVotes) * 100).toFixed(2);
                  let avatarColor;
                  if (index === 0) avatarColor = "#FFB800";  // Yellow
                  else if (index === 1) avatarColor = "#22C55A";  // Green
                  else avatarColor = "#DC143C";  // Red

                  return (
                    <View key={candidate.id} style={styles.detailCandidateRow}>
                      <View style={[styles.detailCandidateAvatar, { backgroundColor: avatarColor || '#ddd' }]}>
                        {candidate.photo ? (
                          <Image source={{ uri: candidate.photo }} style={styles.detailCandidateAvatar} />
                        ) : (
                          <Feather name="user" size={24} color="white" />
                        )
                      }
                        
                      </View>
                      <View style={styles.detailCandidateContent}>
                        <View style={styles.detailCandidateInfo}>
                          <Text style={styles.detailCandidateName}>{candidate.name}</Text>
                          <Text style={styles.detailCandidateParty}>{candidate.party}</Text>
                        </View>
                        <View style={styles.detailVoteBarContainer}>
                          <View 
                            style={[
                              styles.detailVoteBar, 
                              { width: `${percentage}%`, backgroundColor: avatarColor }
                            ]} 
                          />
                        </View>
                        <View style={styles.detailVoteStats}>
                          <Text style={styles.detailVotePercentage}>{percentage}%</Text>
                          <Text style={styles.detailVoteCount}>
                            {candidate.votes.toLocaleString()} votes
                          </Text>
                        </View>
                      </View>
                    </View>
                  );
                })}
              </View>
            );
          })}
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};

export default ElectionDetailModal;
