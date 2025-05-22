import { Modal, View, Text, TouchableOpacity } from "react-native";
import confirmStyles from "../../styles/confirmStyles.js";

const AlreadyVotedModal = ({ visible, onClose, onVotingList }) => {
  if (!visible) return null;

  return (
    <Modal transparent={true} visible={visible} animationType="fade">
      <View style={confirmStyles.modalOverlay}>
        <View style={confirmStyles.modalContainer}>
          {/* Icon container */}
          <View style={confirmStyles.alreadyVotedIcon}>
            <Text style={confirmStyles.checkmark}>✓</Text>
          </View>

          <Text style={confirmStyles.alreadyVotedHeader}>ALREADY VOTED!</Text>
          <Text style={confirmStyles.alreadyVotedText}>
            You have already placed a vote for this position. You can vote for candidates in other positions.
          </Text>

          <View style={confirmStyles.buttonContainer}>
            <TouchableOpacity style={confirmStyles.homeButton} onPress={onClose}>
              <Text style={confirmStyles.homeButtonText}>DONE</Text>
            </TouchableOpacity>

            <TouchableOpacity style={confirmStyles.voteAgainButton} onPress={onVotingList}>
              <Text style={confirmStyles.voteAgainButtonText}>VOTING LIST</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AlreadyVotedModal;
