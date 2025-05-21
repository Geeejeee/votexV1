import React, { useState } from 'react';
import { 
  SafeAreaView, 
  StatusBar, 
  StyleSheet, 
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0',
  },
  fixedHeader: {
    backgroundColor: "#002F6C",
    top: 0,
    left: 0,
    right: 0,
    height: 80, // adjust as needed
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    zIndex: 99,
  },
  logo: {
    width: 90,
    height: 90,
    resizeMode: "contain",
  },
   menu: {
    fontSize: 24,
    color: "#fff",
  },
  timestampContainer: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: 'center',
    marginTop: 10, 
  },
  timestampText: {
    color: '#0D3380',
    fontWeight: 'bold',
    fontSize: 14,
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  resultCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#0D3380',
  },
  electionCard: {
    backgroundColor: '#0D3380',
    borderRadius: 10,
  },
  organizationHeader: {
    backgroundColor: 'white',
    padding: 16,
    margin: 10,
    borderRadius: 10,
    position: 'relative',
  },
  organizationName: {
    color: '#0D3380',
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'left',
  },
  electionText: {
    color: '#0D3380',
    fontSize: 12,
    textAlign: 'left',
    marginTop: 4,
  },
  logoContainer: {
    position: 'absolute',
    right: 12,
    top: 12,
  },
  citcLogo: {
    width: 40,
    height: 40,
    marginTop: 8,
  },
  siteLogo: {
    width: 60,
    height: 60,
  },
  usgLogo: {
    width: 60,
    height: 60,
    },
  organizationAcronym: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  unofficialText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
    marginTop: 12,
    marginBottom: 20,
    marginLeft: 12,
  },
  candidateContainer: {
    marginVertical: 8,
    paddingHorizontal: 12,
  },
  positionLabelContainer: {
    alignSelf: 'flex-start',
  },
  positionLabel: {
    fontWeight: 'bold',
    fontSize: 14,
    color: 'white',
  },
  candidateRow: {
    flexDirection: 'row',
    marginTop: 8,
    alignItems: 'center',
  },
  candidateAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  candidateInfo: {
    flex: 1,
    marginLeft: 12,
  },
  candidateName: {
    fontWeight: 'bold',
    fontSize: 14,
    color: 'white',
  },
  candidateParty: {
    fontSize: 12,
    color: '#666',
  },
  voteBarContainer: {
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    marginTop: 4,
    overflow: 'hidden',
  },
  voteBar: {
    height: '100%',
    borderRadius: 4,
  },
  voteCount: {
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 2,
    textAlign: 'right',
    color: '#666',
  },
  viewAllContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  viewAllText: {
    color: 'white',
    fontWeight: '600',
    marginRight: 8,
  },
  detailContainer: {
    flex: 1,
    backgroundColor: '#F0F0F0',
  },
  detailHeader: {
    backgroundColor: "#002F6C",
    height: 80,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  leftHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: {
    padding: 8,
  },
  detailLogo: {
    width: 90,
    height: 90,
    resizeMode: "contain",
  },
  rightHeaderIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailTimestampContainer: {
    backgroundColor: 'white',
    paddingVertical: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  detailTimestampLabel: {
    color: '#002F6C',
    fontWeight: 'bold',
    fontSize: 14,
    marginRight: 5,
  },
  detailTimestampValue: {
    color: '#002F6C',
    fontWeight: 'bold',
    fontSize: 14,
  },
  organizationInfoContainer: {
    padding: 15,
  },
  orgInfoBox: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 15,
    borderWidth: 1,
    borderColor: '#002F6C',
    position: 'relative',
  },
  detailOrgName: {
    color: '#002F6C',
    fontWeight: 'bold',
    fontSize: 14,
    maxWidth: '80%',
  },
  detailElectionText: {
    color: '#002F6C',
    fontSize: 12,
    marginTop: 4,
  },
  detailLogoContainer: {
    position: 'absolute',
    right: 15,
    top: 15,
  },
  detailOrgLogo: {
    width: 45,
    height: 45,
    resizeMode: 'contain',
  },
  detailScrollView: {
    flex: 1,
    padding: 15,
  },
  positionContainer: {
    backgroundColor: '#002F6C',
    borderRadius: 8,
    marginBottom: 16,
    overflow: 'hidden',
  },
  positionHeaderBar: {
    padding: 12,
    paddingHorizontal: 15,
  },
  positionTitle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  detailCandidateRow: {
    flexDirection: 'row',
    padding: 10,
    paddingVertical: 12,
  },
  detailCandidateAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  detailCandidateContent: {
    flex: 1,
  },
  detailCandidateInfo: {
    marginBottom: 6,
  },
  detailCandidateName: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  detailCandidateParty: {
    color: '#CCC',
    fontSize: 12,
  },
  detailVoteBarContainer: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 4,
    marginBottom: 4,
    overflow: 'hidden',
  },
  detailVoteBar: {
    height: '100%',
    borderRadius: 4,
  },
  detailVoteStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailVotePercentage: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'white',
  },
  detailVoteCount: {
    fontSize: 12,
    color: '#CCC',
  },
  
});

export default ElectionResultsApp;