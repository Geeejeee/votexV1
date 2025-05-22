import { TouchableOpacity, View, Text, Image } from 'react-native';
import styles from '../../styles/VoteElectionScreen';

const CandidateCard = ({ candidate, position, isSelected, onSelect }) => {
  const backgroundColor = candidate.color || '#ddd';
  const cardStyle = isSelected
    ? [styles.candidateCard, { backgroundColor }, styles.selectedCard]
    : [styles.candidateCard, { backgroundColor }];

  return (
    <TouchableOpacity
      style={cardStyle}
      onPress={() => onSelect(candidate, position)}
    >
      <Image
        source={{ uri: candidate.photo }} // ← expects a URL to the image
        style={styles.candidateAvatar}
      />
      <View style={styles.candidateInfoBox}>
        <Text style={styles.candidateNameBox}>{candidate.name}</Text>
        <Text style={styles.partylistBox}>{candidate.party}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default CandidateCard;
