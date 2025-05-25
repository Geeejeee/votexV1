import React from 'react';
import { TouchableOpacity, View, Text, Image } from 'react-native';
import { styles } from '../../styles/CandidateProfile';

const CandidateCard = ({ candidate, position, isSelected, onSelect }) => {
  const cardStyle = isSelected
    ? [styles.candidateCard, { backgroundColor: candidate.color }, styles.selectedCard]
    : [styles.candidateCard, { backgroundColor: candidate.color }];

  return (

    <TouchableOpacity
      style={cardStyle}
      onPress={() => onSelect(candidate, position)}
      activeOpacity={0.85}
    >
      <Image
        source={{ uri: candidate.photo }}
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
