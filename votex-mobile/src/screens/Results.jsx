import React, { useState } from 'react';
import { 
  SafeAreaView, 
  StatusBar, 
  Text, 
  View, 
  ScrollView, 
  Image, 
  TouchableOpacity,
  Modal,
  Pressable
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import logo from "../assets/votexmlogo.png";
import citc_logo from "../assets/citc-logo.png";
import site_logo from "../assets/site-logo.png";
import usg_logo from "../assets/usg-logo.png";
import styles from '../styles/Results.js';

// Mock data for elections
const electionsData = [
  {
    id: 1,
    organization: "COLLEGE OF INFORMATION TECHNOLOGY\nAND COMPUTING",
    year: "2025",
    positions: [
      {
        title: "PRESIDENT",
        candidates: [
          { id: 1, name: "CANDIDATE NO. 1", party: "PARTY NAME", votes: 25000, color: "#FFB800" },
          { id: 2, name: "CANDIDATE NO. 2", party: "PARTY NAME", votes: 22500, color: "#FFB800" },
          { id: 3, name: "CANDIDATE NO. 3", party: "PARTY NAME", votes: 18700, color: "#FFB800" }
        ]
      },
      {
        title: "V.PRESIDENT",
        candidates: [
          { id: 1, name: "CANDIDATE NO. 1", party: "PARTY NAME", votes: 23800, color: "#22C55A" },
          { id: 2, name: "CANDIDATE NO. 2", party: "PARTY NAME", votes: 21300, color: "#22C55A" },
          { id: 3, name: "CANDIDATE NO. 3", party: "PARTY NAME", votes: 17200, color: "#22C55A" }
        ]
      },
      {
        title: "SECRETARY",
        candidates: [
          { id: 1, name: "CANDIDATE NO. 1", party: "PARTY NAME", votes: 20050, color: "#DC143C" },
          { id: 2, name: "CANDIDATE NO. 2", party: "PARTY NAME", votes: 18650, color: "#DC143C" },
          { id: 3, name: "CANDIDATE NO. 3", party: "PARTY NAME", votes: 16890, color: "#DC143C" }
        ]
      }
    ]
  },
  {
    id: 2,
    organization: "SOCIETY OF INFORMATION TECHNOLOGY\nENTHUSIASTS",
    year: "2025",
    logo: null,
    positions: [
      {
        title: "PRESIDENT",
        candidates: [
          { id: 1, name: "CANDIDATE NO. 1", party: "PARTY NAME", votes: 25225, color: "#FFB800" },
          { id: 2, name: "CANDIDATE NO. 2", party: "PARTY NAME", votes: 22830, color: "#FFB800" },
          { id: 3, name: "CANDIDATE NO. 3", party: "PARTY NAME", votes: 19400, color: "#FFB800" }
        ]
      },
      {
        title: "V.PRESIDENT",
        candidates: [
          { id: 1, name: "CANDIDATE NO. 1", party: "PARTY NAME", votes: 24100, color: "#22C55A" },
          { id: 2, name: "CANDIDATE NO. 2", party: "PARTY NAME", votes: 21850, color: "#22C55A" },
          { id: 3, name: "CANDIDATE NO. 3", party: "PARTY NAME", votes: 17580, color: "#22C55A" }
        ]
      },
      {
        title: "SECRETARY",
        candidates: [
          { id: 1, name: "CANDIDATE NO. 1", party: "PARTY NAME", votes: 20050, color: "#DC143C" },
          { id: 2, name: "CANDIDATE NO. 2", party: "PARTY NAME", votes: 18650, color: "#DC143C" },
          { id: 3, name: "CANDIDATE NO. 3", party: "PARTY NAME", votes: 16890, color: "#DC143C" }
        ]
      }
    ]
  },
  {
    id: 3,
    organization: "UNIVERSITY STUDENT GOVERNMENT\n",
    year: "2025",
    logo: null,
    positions: [
      {
        title: "PRESIDENT",
        candidates: [
          { id: 1, name: "CANDIDATE NO. 1", party: "PARTY NAME", votes: 25225, color: "#FFB800" },
          { id: 2, name: "CANDIDATE NO. 2", party: "PARTY NAME", votes: 22830, color: "#FFB800" },
          { id: 3, name: "CANDIDATE NO. 3", party: "PARTY NAME", votes: 19400, color: "#FFB800" }
        ]
      },
      {
        title: "V.PRESIDENT",
        candidates: [
          { id: 1, name: "CANDIDATE NO. 1", party: "PARTY NAME", votes: 24100, color: "#22C55A" },
          { id: 2, name: "CANDIDATE NO. 2", party: "PARTY NAME", votes: 21850, color: "#22C55A" },
          { id: 3, name: "CANDIDATE NO. 3", party: "PARTY NAME", votes: 17580, color: "#22C55A" }
        ]
      },
      {
        title: "SECRETARY",
        candidates: [
          { id: 1, name: "CANDIDATE NO. 1", party: "PARTY NAME", votes: 20050, color: "#DC143C" },
          { id: 2, name: "CANDIDATE NO. 2", party: "PARTY NAME", votes: 18650, color: "#DC143C" },
          { id: 3, name: "CANDIDATE NO. 3", party: "PARTY NAME", votes: 16890, color: "#DC143C" }
        ]
      }
    ]
  }
];

// Get the maximum votes across all candidates to calculate percentages
const getMaxVotes = () => {
  let max = 0;
  electionsData.forEach(election => {
    election.positions.forEach(position => {
      position.candidates.forEach(candidate => {
        if (candidate.votes > max) {
          max = candidate.votes;
        }
      });
    });
  });
  return max;
};

const ElectionResultsApp = () => {
  const [selectedElection, setSelectedElection] = useState(null);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const maxVotes = getMaxVotes();

  const openElectionDetails = (election) => {
    setSelectedElection(election);
    setDetailModalVisible(true);
  };

  const closeElectionDetails = () => {
    setDetailModalVisible(false);
  };

  // Render a candidate item
  const CandidateItem = ({ candidate, maxVotes, showPercentage = false }) => {
    const percentage = (candidate.votes / maxVotes) * 100;
    const barWidth = `${Math.max(percentage, 10)}%`; // Ensure bar has a minimum width
    
    return (
      <View style={styles.candidateRow}>
        <View style={[styles.candidateAvatar, { backgroundColor: candidate.color }]}>
          <Feather name="user" size={30} color="#333" />
        </View>
        <View style={styles.candidateInfo}>
          <Text style={styles.candidateName}>{candidate.name}</Text>
          <Text style={styles.candidateParty}>{candidate.party}</Text>
          <View style={styles.voteBarContainer}>
            <View style={[styles.voteBar, { width: barWidth, backgroundColor: candidate.color }]} />
          </View>
          <Text style={styles.voteCount}>
            {candidate.votes.toLocaleString()}
            {showPercentage && ` (${Math.round(percentage)}%)`}
          </Text>
        </View>
      </View>
    );
  };

  // Render the summary screen showing top candidates only
  const renderSummary = () => {
    return (
      <ScrollView style={styles.scrollView}>
        {electionsData.map((election) => (
          <TouchableOpacity 
            key={election.id} 
            style={styles.resultCard}
            onPress={() => openElectionDetails(election)}
            activeOpacity={0.7}
          >
            <View style={styles.electionCard}>
              <View style={styles.organizationHeader}>
                <Text style={styles.organizationName}>{election.organization}</Text>
                <Text style={styles.electionText}>{election.year} ELECTIONS RESULTS</Text>

                <View style={styles.logoContainer}> 
                  {election.id === 1 ? (
                    <Image 
                      source={citc_logo}
                      style={styles.citcLogo}
                    />
                  ) : election.id === 2 ? (
                    <View style={{ alignItems: 'center' }}> 
                      <Image 
                        source={site_logo}
                        style={styles.siteLogo}
                      />
                      <Text style={styles.organizationAcronym}>{election.shortName}</Text>                
                    </View>
                  ) : (
                    <View style={{ alignItems: 'center' }}> 
                      <Image 
                        source={usg_logo}
                        style={styles.usgLogo} // Reuse the same style for consistency
                      />
                      <Text style={styles.organizationAcronym}>{election.shortName}</Text>                
                    </View>
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
      </ScrollView>
    );
  };

  // Render the detail modal showing all candidates for a specific election
  const renderDetailModal = () => {
    if (!selectedElection) return null;

    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={detailModalVisible}
        onRequestClose={closeElectionDetails}
      >
        <SafeAreaView style={styles.detailContainer}>
          {/* Header */}
          <View style={styles.detailHeader}>
            <View style={styles.leftHeader}>
              <TouchableOpacity onPress={closeElectionDetails} style={styles.backButton}>
                <Feather name="chevron-left" size={24} color="white" />
              </TouchableOpacity>
              <Image source={logo} style={styles.detailLogo} />
            </View>
              <View style={styles.rightHeaderIcons}>
                <Feather name="menu" size={22} color="white" />
              </View>
          </View>

          {/* Results Timestamp */}
          <View style={styles.detailTimestampContainer}>
            <Text style={styles.detailTimestampLabel}>RESULTS AS OF</Text>
            <Text style={styles.detailTimestampValue}>01/01/25 10:00:00</Text>
          </View>

          {/* Organization Info */}
          <View style={styles.organizationInfoContainer}>
            <View style={styles.orgInfoBox}>
              <Text style={styles.detailOrgName}>{selectedElection.organization}</Text>
              <Text style={styles.detailElectionText}>{selectedElection.year} ELECTIONS RESULTS</Text>
              
              <View style={styles.detailLogoContainer}>
                {selectedElection.id === 1 ? (
                  <Image 
                    source={citc_logo}
                    style={styles.detailOrgLogo}
                  />
                ) : selectedElection.id === 2 ? (
                  <Image 
                    source={site_logo}
                    style={styles.detailOrgLogo}
                  />
                ) : (
                  <Image 
                    source={usg_logo}
                    style={styles.detailOrgLogo}
                  />
                )}
              </View>
            </View>
          </View>

          <ScrollView style={styles.detailScrollView}>
            {selectedElection.positions.map((position) => (
              <View key={position.title} style={styles.positionContainer}>
                <View style={styles.positionHeaderBar}>
                  <Text style={styles.positionTitle}>FOR {position.title}:</Text>
                </View>
                
                {position.candidates.map((candidate, index) => {
                  // Calculate percentage of votes for this position
                  const totalPositionVotes = position.candidates.reduce((sum, c) => sum + c.votes, 0);
                  const percentage = ((candidate.votes / totalPositionVotes) * 100).toFixed(2);
                  
                  // Determine candidate color based on index
                  let avatarColor;
                  if (index === 0) avatarColor = "#FFB800";  // Yellow
                  else if (index === 1) avatarColor = "#22C55A";  // Green
                  else avatarColor = "#DC143C";  // Red
                  
                  return (
                    <View key={candidate.id} style={styles.detailCandidateRow}>
                      <View style={[styles.detailCandidateAvatar, { backgroundColor: avatarColor }]}>
                        <Feather name="user" size={24} color="white" />
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
                              { 
                                width: `${percentage}%`,
                                backgroundColor: avatarColor
                              }
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
            ))}
          </ScrollView>
        </SafeAreaView>
      </Modal>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
        
      <StatusBar backgroundColor="#0D3380" barStyle="light-content" />
      
      {/* Header */}
      <View style={styles.fixedHeader}>
        <Image source={logo} style={styles.logo} />
        <Text style={styles.menu}>☰</Text>
      </View>

      {/* Results Timestamp */}
      <View style={styles.timestampContainer}>
        <Text style={styles.timestampText}>RESULTS AS OF 01/01/25 10:00:00</Text>
      </View>

      {/* Summary view (main screen) */}
      {renderSummary()}

      {/* Detail modal */}
      {renderDetailModal()}
    </SafeAreaView>
  );
};

export default ElectionResultsApp;