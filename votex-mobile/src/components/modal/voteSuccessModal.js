import { Modal, View, Text, TouchableOpacity } from "react-native";
import confirmStyles from "../../styles/confirmStyles.js";

const VoteSuccessModal = ({ visible, onHome, onVoteAgain }) => {
  if (!visible) return null;

  return (
    <Modal transparent={true} visible={visible} animationType="fade">
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
              <Text style={confirmStyles.successSubtext}>
                Your vote has been recorded successfully.
              </Text>
            </View>
          </View>

          <View style={confirmStyles.buttonContainer}>
            <TouchableOpacity style={confirmStyles.homeButton} onPress={onHome}>
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

export default VoteSuccessModal;
