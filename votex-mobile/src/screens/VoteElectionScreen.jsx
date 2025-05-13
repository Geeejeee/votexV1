import React, { useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import styles from '../styles/VoteElectionScreen.js';
import usgLogo from '../assets/usg-logo.png';
import votexmlogo from '../assets/votexmlogo.png';

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
  
  // Confirmation modal state
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [alreadyVotedModalVisible, setAlreadyVotedModalVisible] = useState(false);
  const [candidateToConfirm, setCandidateToConfirm] = useState(null);
  const [positionToUpdate, setPositionToUpdate] = useState(null);
  
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
    // Navigate to home screen
    // navigation.navigate('Home');
    console.log('Navigating to Home');
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
        {/* Election Card */}
        <View style={styles.electionCard}>
          <Text style={styles.electionTitle}>2025 ELECTIONS</Text>
          <Image source={usgLogo} style={styles.electionLogo} />
        </View>

        {/* PRESIDENT */}
        <Text style={styles.positionTitle}>FOR PRESIDENT :</Text>
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
        <Text style={styles.positionTitle}>FOR VICE PRESIDENT :</Text>
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
        <Text style={styles.positionTitle}>FOR SECRETARY :</Text>
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

// Additional styles for the modals
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

// Add to your existing styles.js file
// styles.selectedCard = {
//   borderWidth: 3,
//   borderColor: '#1a237e',
//   opacity: 0.9,
// };

export default VoteElectionScreen;