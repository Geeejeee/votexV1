
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  Image
} from "react-native";
import confirmStyles from "../../styles/confirmStyles"; // Update this path based on your actual styles

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
            <Image
              source={{ uri: candidate.photo }} // or candidate.logo
              style={confirmStyles.avatarPlaceholder}
            />


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

export default VoteConfirmationModal;
