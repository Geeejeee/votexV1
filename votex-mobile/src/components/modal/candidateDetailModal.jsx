import React from 'react';
import { 
  Modal, View, ScrollView, TouchableOpacity, Text, Image, 
} from 'react-native';
import {styles} from '../../styles/CandidateProfile';


const CandidateDetail = ({ candidate, visible, onClose }) => {
  if (!candidate) return null;

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <ScrollView style={styles.modalScrollView}>
            <View style={styles.profileCard}>
              <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
              
              <Image
                style={styles.avatar}
                source={candidate.photo ? { uri: candidate.photo } : null}
              />
              <View style={styles.profileInfo}>
                <Text style={styles.label}>Name:</Text>
                <Text style={styles.value}>{candidate.name}</Text>

                <Text style={styles.label}>Partylist:</Text>
                <Text style={styles.value}>{candidate.party}</Text>

                <Text style={styles.label}>Running Position:</Text>
                <Text style={styles.value}>{candidate.position}</Text>

                <Text style={styles.label}>Course/Program:</Text>
                <Text style={styles.value}>{candidate.course}</Text>

                <Text style={styles.label}>Year Level:</Text>
                <Text style={styles.value}>{candidate.year}</Text>

                <Text style={styles.label}>Motto:</Text>
                <Text style={styles.value}>{candidate.motto}</Text>
              </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Affiliations:</Text>
                {(Array.isArray(candidate.affiliations) && candidate.affiliations.length > 0) ? (
                    candidate.affiliations.map((item, idx) => (
                    <Text key={idx} style={styles.sectionItem}>• {item}</Text>
                    ))
                ) : (
                    <Text style={styles.sectionItem}>No affiliations listed.</Text>
                )}
                </View>

                <View style={styles.section}>
                <Text style={styles.sectionTitle}>Advocacies:</Text>
                {(Array.isArray(candidate.advocacies) && candidate.advocacies.length > 0) ? (
                    candidate.advocacies.map((item, idx) => (
                    <Text key={idx} style={styles.sectionItem}>• {item}</Text>
                    ))
                ) : (
                    <Text style={styles.sectionItem}>No advocacies listed.</Text>
                )}
                </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default CandidateDetail;

