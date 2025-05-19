import React, { useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import styles from '../styles/VoteElectionScreen.js';
import votexmlogo from '../assets/votexmlogo.png';

// Card styles
const cardStyles = {
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',  // Changed to space-between for better layout
    width: '100%',
  },
  dropdownIcon: {
    marginLeft: 8,
    color: '#002F6C',
    fontSize: 16,    // Increased size for better visibility
    fontWeight: 'bold',
  },
  dropdown: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#002F6C',
    zIndex: 1000,
    elevation: 5,
    marginTop: 5,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  dropdownItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  selectedItem: {
    backgroundColor: '#F0F8FF',
  },
  dropdownItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textContainer: {
    flex: 1,
    paddingRight: 10,
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
  itemSubtitle: {
    fontSize: 12,
    color: '#333',
    marginTop: 2,
  },
  itemLogo: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  }
};

// Confirmation modal styles
const confirmStyles = {
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 20,
    alignItems: 'center',
  },
  confirmHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  candidatePreview: {
    width: '100%',
    marginBottom: 20,
  },
  avatarPlaceholder: {
    width: '100%',
    height: 150,
    backgroundColor: '#4CAF50',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  candidateNameContainer: {
    width: '100%',
    backgroundColor: '#1a237e',
    padding: 12,
  },
  candidateName: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  candidateParty: {
    color: 'white',
    textAlign: 'center',
    fontSize: 14,
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  cancelButton: {
    backgroundColor: '#9e9e9e',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 4,
  },
  cancelButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  confirmButton: {
    backgroundColor: '#1a237e',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 4,
  },
  confirmButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },

  // Success modal styles
  checkmarkContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmark: {
    color: '#4CAF50',
    fontSize: 30,
    fontWeight: 'bold',
  },
  successMessageContainer: {
    width: '100%',
    backgroundColor: 'white',
    padding: 12,
  },
  successMessage: {
    color: '#4CAF50',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 5,
  },
  successSubtext: {
    color: '#666',
    textAlign: 'center',
    fontSize: 12,
  },
  homeButton: {
    backgroundColor: '#1a237e',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 4,
  },
  homeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  voteAgainButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 4,
  },
  voteAgainButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },

  // Already voted modal styles
  alreadyVotedIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#f44336',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  alreadyVotedHeader: {
    color: '#f44336',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
  },
  alreadyVotedText: {
    color: '#666',
    textAlign: 'center',
    fontSize: 14,
    marginBottom: 20,
  },
};

// Improved Election Card Component from the first file
const ElectionCard = ({ onElectionChange }) => {
  // Dropdown state
  const [dropdownOpen, setDropdownOpen] = useState(false);
  
  // Fixed election data structure with consistent properties
  const electionOptions = [
    { 
      id: 'USG',
      title: 'UNIVERSITY STUDENT\nGOVERNMENT', 
      subtitle: '2025 ELECTIONS', 
      logo: require('../assets/usg-logo.png') 
    },
    { 
      id: 'CSC',
      title: 'COLLEGE STUDENT COUNCIL', 
      subtitle: '2025 ELECTIONS', 
      logo: require('../assets/citc-logo.png') // Replace with actual logo
    },
    { 
      id: 'SITE',
      title: 'SOCIETY OF INFORMATION\nTECHNOLOGY ENTHUSIASTS', 
      subtitle: '2025 ELECTIONS', 
      logo: require('../assets/site-logo.png') // Replace with actual logo
    },
  ];
  
  // Initialize with the University Student Government option
  const [selectedElection, setSelectedElection] = useState(electionOptions[0]);

  // Handle dropdown selection
  const handleElectionSelect = (election) => {
    setSelectedElection(election);
    setDropdownOpen(false);
    if (onElectionChange) {
      onElectionChange(election);
    }
  };

  return (
    <View style={{ position: 'relative', zIndex: 100 }}>
      {/* The card showing the selected election */}
      <TouchableOpacity 
        activeOpacity={0.8}
        style={styles.electionCard} 
        onPress={() => setDropdownOpen(!dropdownOpen)}
      >
        <View style={styles.titleContainer}>
          <View style={cardStyles.headerRow}>
            <Text style={styles.electionTitleTop}>{selectedElection.title}</Text>
            <Text style={cardStyles.dropdownIcon}></Text>
          </View>
          <Text style={styles.electionTitleBottom}>{selectedElection.subtitle}</Text>
        </View>
        <Image source={selectedElection.logo} style={styles.electionLogo} />
      </TouchableOpacity>
      
      {/* Dropdown options - only visible when dropdown is open */}
      {dropdownOpen && (
        <View style={cardStyles.dropdown}>
          {electionOptions.map((option) => (
            <TouchableOpacity 
              key={option.id} 
              style={[
                cardStyles.dropdownItem,
                selectedElection.id === option.id && cardStyles.selectedItem
              ]}
              onPress={() => handleElectionSelect(option)}
            >
              <View style={cardStyles.dropdownItemContent}>
                <View style={cardStyles.textContainer}>
                  <Text style={cardStyles.itemTitle}>{option.title}</Text>
                  <Text style={cardStyles.itemSubtitle}>{option.subtitle}</Text>
                </View>
                <Image source={option.logo} style={cardStyles.itemLogo} />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

// Vote Confirmation Modal Component
const VoteConfirmationModal = ({ visible, candidate, onCancel, onConfirm }) => {
  if (!visible || !candidate) return null;

  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="fade"
    >
      <View style={confirmStyles.modalOverlay}>
        <View style={confirmStyles.modalContainer}>
          <Text style={confirmStyles.confirmHeader}>PLEASE CONFIRM YOUR VOTE</Text>

          <View style={confirmStyles.candidatePreview}>
            {/* Avatar placeholder (green background) */}
            <View style={confirmStyles.avatarPlaceholder} />
            
            {/* Candidate info (blue background) */}
            <View style={confirmStyles.candidateNameContainer}>
              <Text style={confirmStyles.candidateName}>{candidate.name}</Text>
              <Text style={confirmStyles.candidateParty}>{candidate.party}</Text>
            </View>
          </View>
          
          <View style={confirmStyles.buttonContainer}>
            <TouchableOpacity 
              style={confirmStyles.cancelButton} 
              onPress={onCancel}
            >
              <Text style={confirmStyles.cancelButtonText}>CANCEL</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={confirmStyles.confirmButton} 
              onPress={onConfirm}
            >
              <Text style={confirmStyles.confirmButtonText}>CONFIRM</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

// Success Dialog Component
const VoteSuccessModal = ({ visible, onHome, onVoteAgain }) => {
  if (!visible) return null;

  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="fade"
    >
      <View style={confirmStyles.modalOverlay}>
        <View style={confirmStyles.modalContainer}>
          {/* Background of the candidate preview (dimmed) */}
          <View style={confirmStyles.candidatePreview}>
            {/* Avatar placeholder with checkmark */}
            <View style={confirmStyles.avatarPlaceholder}>
              {/* Centered checkmark icon */}
              <View style={confirmStyles.checkmarkContainer}>
                <Text style={confirmStyles.checkmark}>✓</Text>
              </View>
            </View>

            {/* Candidate info background (now white) */}
            <View style={confirmStyles.successMessageContainer}>
              <Text style={confirmStyles.successMessage}>VOTE PLACED!</Text>
              <Text style={confirmStyles.successSubtext}>Your vote has been recorded successfully.</Text>
            </View>
          </View>
          
          <View style={confirmStyles.buttonContainer}>
            <TouchableOpacity 
              style={confirmStyles.homeButton} 
              onPress={onHome}
            >
              <Text style={confirmStyles.homeButtonText}>HOME</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={confirmStyles.voteAgainButton} 
              onPress={onVoteAgain}
            >
              <Text style={confirmStyles.voteAgainButtonText}>VOTE AGAIN</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

// Already Voted Modal Component
const AlreadyVotedModal = ({ visible, onClose, onVotingList }) => {
  if (!visible) return null;

  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="fade"
    >
      <View style={confirmStyles.modalOverlay}>
        <View style={confirmStyles.modalContainer}>
          {/* Icon container */}
          <View style={confirmStyles.alreadyVotedIcon}>
            <Text style={confirmStyles.checkmark}>✓</Text>
          </View>

          <Text style={confirmStyles.alreadyVotedHeader}>ALREADY VOTED!</Text>
          <Text style={confirmStyles.alreadyVotedText}>You have already placed a vote for this position. You can vote for candidates in other positions.</Text>
          
          <View style={confirmStyles.buttonContainer}>
            <TouchableOpacity 
              style={confirmStyles.homeButton} 
              onPress={onClose}
            >
              <Text style={confirmStyles.homeButtonText}>DONE</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={confirmStyles.voteAgainButton} 
              onPress={onVotingList}
            >
              <Text style={confirmStyles.voteAgainButtonText}>VOTING LIST</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const VoteElectionScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();

  // State for selected candidates
  const [selectedPresident, setSelectedPresident] = useState(null);
  const [selectedVP, setSelectedVP] = useState(null);
  const [selectedSecretary, setSelectedSecretary] = useState(null);

  // Track currently selected election - initialize with University Student Government
  const [currentElection, setCurrentElection] = useState({
    id: 'usg',
    title: 'UNIVERSITY STUDENT GOVERNMENT', 
    subtitle: '2025 ELECTIONS'
  });

  // Confirmation modal state
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [alreadyVotedModalVisible, setAlreadyVotedModalVisible] = useState(false);
  const [candidateToConfirm, setCandidateToConfirm] = useState(null);
  const [positionToUpdate, setPositionToUpdate] = useState(null);
  
  // Handle election change from the ElectionCard component
  const handleElectionChange = (election) => {
    // Update the current election
    setCurrentElection(election);
    
    // Reset selections when changing elections
    setSelectedPresident(null);
    setSelectedVP(null);
    setSelectedSecretary(null);
    
    console.log(`Changed to ${election.title}`);
  };

  // Example candidate data
  const candidates = {
    president: [
      { id: 'p1', name: 'Candidate Name', party: 'Party A', color: '#FFC107' },
      { id: 'p2', name: 'Candidate Name', party: 'Party B', color: '#4CAF50' },
      { id: 'p3', name: 'Candidate Name', party: 'Party C', color: '#F44336' },
    ],
    vicePresident: [
      { id: 'vp1', name: 'Candidate Name', party: 'Party A', color: '#FFC107' },
      { id: 'vp2', name: 'Candidate Name', party: 'Party B', color: '#4CAF50' },
      { id: 'vp3', name: 'Candidate Name', party: 'Party C', color: '#F44336' },
    ],
    secretary: [
      { id: 's1', name: 'Candidate Name', party: 'Party A', color: '#FFC107' },
      { id: 's2', name: 'Candidate Name', party: 'Party B', color: '#4CAF50' },
      { id: 's3', name: 'Candidate Name', party: 'Party C', color: '#F44336' },
    ]
  };

  // Handle candidate selection
  const handleCandidateSelect = (candidate, position) => {
    // Check if user already voted for this position
    if (
      (position === 'president' && selectedPresident) ||
      (position === 'vicePresident' && selectedVP) ||
      (position === 'secretary' && selectedSecretary)
    ) {
      // Show already voted modal
      setAlreadyVotedModalVisible(true);
      return;
    }

    // If not already voted, proceed with selection
    setCandidateToConfirm(candidate);
    setPositionToUpdate(position);
    setConfirmModalVisible(true);
  };

  // Handle confirmation
  const handleConfirm = () => {
    // Update the appropriate state based on position
    if (positionToUpdate === 'president') {
      setSelectedPresident(candidateToConfirm);
    } else if (positionToUpdate === 'vicePresident') {
      setSelectedVP(candidateToConfirm);
    } else if (positionToUpdate === 'secretary') {
      setSelectedSecretary(candidateToConfirm);
    }

    // Close confirmation modal
    setConfirmModalVisible(false);

    // Show success modal
    setSuccessModalVisible(true);
  };

  // Handle cancellation
  const handleCancel = () => {
    setConfirmModalVisible(false);
    setCandidateToConfirm(null);
    setPositionToUpdate(null);
  };

  // Handle Home button
  const handleGoHome = () => {
    setSuccessModalVisible(false);
    setCandidateToConfirm(null);
    setPositionToUpdate(null);
    navigation.navigate('Home');
  };

  // Handle Vote Again button
  const handleVoteAgain = () => {
    setSuccessModalVisible(false);
    setCandidateToConfirm(null);
    setPositionToUpdate(null);
  };

  // Handle closing the already voted modal
  const handleCloseAlreadyVoted = () => {
    setAlreadyVotedModalVisible(false);
  };

  // Handle voting list button in already voted modal
  const handleViewVotingList = () => {
    setAlreadyVotedModalVisible(false);
    // You can implement navigation to voting list or other action here
    console.log('View voting list');
  };

  // Render a candidate card
  const renderCandidate = (candidate, position, isSelected) => {
    const cardStyle = isSelected
      ? [styles.candidateCard, { backgroundColor: candidate.color }, styles.selectedCard]
      : [styles.candidateCard, { backgroundColor: candidate.color }];

    return (
      <TouchableOpacity 
        key={candidate.id}
        style={cardStyle}
        onPress={() => handleCandidateSelect(candidate, position)}
      >
        <View style={styles.candidateAvatar} />
        <View style={styles.candidateInfoBox}>
          <Text style={styles.candidateNameBox}>{candidate.name}</Text>
          <Text style={styles.partylistBox}>{candidate.party}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.fixedHeader}>
        <Image source={votexmlogo} style={styles.logo} />
        <Text style={styles.menu}>☰</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Election Card - Using the improved component */}
        <ElectionCard onElectionChange={handleElectionChange} />

        {/* PRESIDENT */}
        <Text style={styles.positionTitle}>FOR PRESIDENT : {currentElection.id.toUpperCase()}</Text>
        <View style={styles.candidateRow}>
          {candidates.president.map(candidate => 
            renderCandidate(
              candidate, 
              'president', 
              selectedPresident && selectedPresident.id === candidate.id
            )
          )}
        </View>

        {/* VICE PRESIDENT */}
        <Text style={styles.positionTitle}>FOR VICE PRESIDENT : {currentElection.id.toUpperCase()}</Text>
        <View style={styles.candidateRow}>
          {candidates.vicePresident.map(candidate => 
            renderCandidate(
              candidate, 
              'vicePresident', 
              selectedVP && selectedVP.id === candidate.id
            )
          )}
        </View>

        {/* SECRETARY */}
        <Text style={styles.positionTitle}>FOR SECRETARY : {currentElection.id.toUpperCase()}</Text>
        <View style={styles.candidateRow}>
          {candidates.secretary.map(candidate => 
            renderCandidate(
              candidate, 
              'secretary', 
              selectedSecretary && selectedSecretary.id === candidate.id
            )
          )}
        </View>
      </ScrollView>
      
      {/* Confirmation Modal */}
      <VoteConfirmationModal 
        visible={confirmModalVisible}
        candidate={candidateToConfirm}
        onCancel={handleCancel}
        onConfirm={handleConfirm}
      />
      
      {/* Success Modal */}
      <VoteSuccessModal 
        visible={successModalVisible}
        onHome={handleGoHome}
        onVoteAgain={handleVoteAgain}
      />
      
      {/* Already Voted Modal */}
      <AlreadyVotedModal
        visible={alreadyVotedModalVisible}
        onClose={handleCloseAlreadyVoted}
        onVotingList={handleViewVotingList}
      />
    </View>
  );
};

export default VoteElectionScreen;