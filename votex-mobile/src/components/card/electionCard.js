import React from "react";
import { View, Text, Image } from "react-native"; 
import cardStyles from "../../styles/cardStyles.js";  
import styles from '../../styles/VoteElectionScreen.js';    

const ElectionCard = ({ election }) => {
  if (!election) return null;

  return (
    <View style={{ position: "relative", zIndex: 100 }}>
      <View style={styles.electionCard}>
        <View style={styles.titleContainer}>
          <View style={cardStyles.headerRow}>
            <Text style={styles.electionTitleTop}>{election.title}</Text>
          </View>
          <Text style={styles.electionTitleBottom}>
            {election.description || "2025 ELECTIONS"}
          </Text>
        </View>
        <Image
          source={election.logo ? { uri: election.logo } : require("../../assets/votexmlogo.png")}
          style={styles.electionLogo}
        />
      </View>
    </View>
  );
};

export default ElectionCard;
