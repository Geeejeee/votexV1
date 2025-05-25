import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import { styles, cardStyles } from '../../styles/CandidateProfile';

const ElectionCard = ({ elections = [], selectedElection, onElectionChange }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  if (!selectedElection) {
    return (
      <View style={styles.electionCard}>
        <Text style={styles.electionTitleTop}>No elections available</Text>
      </View>
    );
  }

  const handleElectionSelect = (election) => {
    setDropdownOpen(false);
    if (onElectionChange) onElectionChange(election);
  };

  return (
    <View style={{ position: 'relative', zIndex: 100 }}>
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.electionCard}
        onPress={() => setDropdownOpen(!dropdownOpen)}
      >
        <View style={styles.titleContainer}>
          <View style={cardStyles.headerRow}>
            <Text style={styles.electionTitleTop}>{selectedElection.title}</Text>
            <Text style={cardStyles.dropdownIcon}>▼</Text>
          </View>
          <Text style={styles.electionTitleBottom}>{selectedElection.description}</Text>
        </View>
        <Image
          source={
            selectedElection.logo
              ? { uri: selectedElection.logo }
              : require('../../assets/votexmlogo.png')
          }
          style={styles.electionLogo}
        />
      </TouchableOpacity>

      {dropdownOpen && (
        <View style={cardStyles.dropdown}>
          {elections.map((election) => (
            <TouchableOpacity
              key={election._id}
              style={[
                cardStyles.dropdownItem,
                selectedElection._id === election._id && cardStyles.selectedItem,
              ]}
              onPress={() => handleElectionSelect(election)}
            >
              <View style={cardStyles.dropdownItemContent}>
                <View style={cardStyles.textContainer}>
                  <Text style={cardStyles.itemTitle}>{election.title}</Text>
                  <Text style={cardStyles.itemSubtitle}>{election.description}</Text>
                </View>
                <Image
                  source={
                    election.logo
                      ? { uri: election.logo }
                      : require('../../assets/votexmlogo.png')
                  }
                  style={cardStyles.itemLogo}
                />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

export default ElectionCard;
